import { Injectable } from '@nestjs/common';
import { JoinMatchmakingDto } from '../dto/join-matchmaking.dto'
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PoolService } from './pool.service';
import { Player, PoolType } from '../dto/PlayerInterface';
import { addPath } from 'graphql/jsutils/Path';

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
        playerPoolType = PoolType.Classic;
        break;
      case "lastPong":
        playerPoolType = PoolType.Classic;
    }

    const player: Player = {
      id: joinMatchData.userId,
      rank: profile.rank,
      xp: profile.xp,
      bet: profile.wallet.betAmount,
      type: playerPoolType,
      matched: false,
      timePlayerJoin: new Date()
    }

    this.PoolService.addPlayer(player);
    this.findAndStartMatch(PoolType.Classic);
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

}
