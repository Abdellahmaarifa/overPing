import { Injectable } from '@nestjs/common';
import { JoinMatchmakingDto } from '../dto/join-matchmaking.dto'
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PoolService } from './pool.service';
import { Player, PlayerRequestDto, PoolType, acceptMatchToPlayDto } from '../dto/PlayerInterface';
import { RequestToPlayDto,  } from '../dto/join-matchmaking.dto';
import { RespondToPlayDto } from '../dto/join-matchmaking.dto';
import { RpcExceptionService } from '@app/common/exception-handling';
@Injectable()
export class MatchmakingService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private authClient: ClientProxy,
    @Inject(IRmqSeverName.PROFILE)
    private profileClient: ClientProxy,
    @Inject(IRmqSeverName.GATEWAY)
    private gatewayClient: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly PoolService: PoolService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {
  }
  async joinMatchmakingQueue(joinMatchData: JoinMatchmakingDto) {
    const profile = await this.clientService.sendMessageWithPayload(
      this.profileClient,
      {
        role: 'profile',
        cmd: 'find-profile-by-userId',
      },
      joinMatchData.userId
    )

    let playerPoolType;
    switch (joinMatchData.matchType) {
      case "classic":
        playerPoolType = PoolType.Classic;
        break;
      case "sandstorm":
        playerPoolType = PoolType.Sandstorm;
        break;
      case "lastPong":
        playerPoolType = PoolType.LastPong;
    }

    if (profile.wallet.betAmount <= 0){
      console.log("need more bets");
      return
    };
    const player: Player = {
      id: joinMatchData.userId,
      rank: profile.rank,
      xp: profile.xp,
      bet: profile.wallet.betAmount,
      type: playerPoolType,
      matched: false,
      timePlayerJoin: new Date()
    }
    console.log("\n\n player:", player);
    this.PoolService.addPlayer(player);
    this.findAndStartMatch(player.type);
  }


  async findAndStartMatch(matchType: PoolType) { 
    const matchResult = this.PoolService.matchPlayers(matchType);

    if (matchResult) {
      const [player1, player2] = matchResult;
      let matched;
      if (player1 && !player2) {
        matched = {
          user1:{
            id: player1.id,
            bet: player1.bet,
            matchType: player1.type,
          },
          user2: {},
          matchKey: "null",
          matchType: 'random'
        }
      } else {
        matched = {
          user1:{
            id: player1.id,
            bet: player1.bet,
            matchType: player1.type,
          },
          user2:{
            id: player2.id,
            bet: player2.bet,
            matchType: player2.type,
          },
          matchKey: this.generateMatchKey(20),
          requestType: 'random'
        }
      }
      console.log('match is found ', matched)
      this.clientService.sendMessageWithPayload(
        this.gatewayClient,
        {
          role: 'gateway',
          cmd: 'matchFound',
        },
        matched,
      );
    }
  }

  private generateMatchKey(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }

    return key;
  }


  async requestUserToPlay(userId: number, userRequest: RequestToPlayDto): Promise<RespondToPlayDto>{
   
    const request: PlayerRequestDto = {
      id: userId,
      recipientId: userRequest.recipientId,
      matched: false,
      type: this.stringToEnum(userRequest.matchType),
      timePlayerJoin: new Date()
    }
    console.log("this is request to play ", request);
    const requestToPush = this.PoolService.addRequestToQueue(request);
    return requestToPush;
  }

  async acceptMatchToPlay(user: acceptMatchToPlayDto) : Promise<void>{
    const player = await this.PoolService.getPlayerRequest(user.senderId,user.recipientId, this.stringToEnum(user.matchType));
    if (!player){
      return null;
    }
    console.log("this is player in accept match to play ", player);
    this.PoolService.removePlayerRequest(player.id, player.type);
   const matched = {
      user1:{
        id: player.id,
        bet: null,
        matchType: player.type,
      },
      user2:{
        id: player.recipientId,
        bet: null,
        matchType: player.type,
      },
      matchKey: this.generateMatchKey(20),
      requestType: 'friend'
    }
    this.clientService.sendMessageWithPayload(
      this.gatewayClient,
      {
        role: 'gateway',
        cmd: 'matchDirc',
      },
      matched,
    );
    
  }
  
  async cancelRequestToPlay(user: acceptMatchToPlayDto):  Promise<boolean>{
    const player = await this.PoolService.getPlayerRequest(user.senderId,user.recipientId, this.stringToEnum(user.matchType));
    if (!player){
      return null;
    }
    console.log("this is player in cancel match to play ", player);
    this.PoolService.removePlayerRequest(player.id, player.type);
    /*

     this.clientService.sendMessageWithPayload(
      this.gatewayClient,
      {
        role: 'gateway',
        cmd: 'matchFound',
      },
       ????,
    );
    */
    return true;
  }

  private stringToEnum(value: string): PoolType | undefined {
    for (const key in PoolType) {
      if (PoolType[key as keyof typeof PoolType] === value) {
        return PoolType[key as keyof typeof PoolType];
      }
    }
    return undefined;
  }
}
