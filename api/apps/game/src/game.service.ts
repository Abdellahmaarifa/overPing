import { IUser } from '@app/common';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { IGameData, IGameResult } from './Interfaces/game.interface';

@Injectable()
export class GameService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
  ) {}

  async addResult(result: IGameData) {
    await this.prisma.game.create({
      data: {
        playerOneId: result.playerOneId,
        playerOneScore: result.playerOneScore,
        playerOneStatus : result.playerOneStatus,
        playerTwoId: result.playerTwoId,
        playerTwoScore: result.playerTwoScore,
        playerTwoStatus: result.playerTwoStatus,
        points: result.points,
        level: result.level
      }
    });
  }

  async getUserMatchHistory(userId: number, page: number, limit: number) : Promise<IGameResult[]> {
    const games = await this.prisma.game.findMany({
      where: {
        OR: [
          { playerOneId: userId },
          { playerTwoId: userId }
        ],
        NOT: [
          { playerOneId: 0, playerTwoId: 0 }
        ]
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // console.log(games, userId);

    const playerOneInfo = await this.clientService.sendMessageWithPayload(
      this.client, { role: 'user', cmd: 'getUsersInfo' }, games.map(game => game.playerOneId)
    );
    const playerTwoInfo = await this.clientService.sendMessageWithPayload(
      this.client, { role: 'user', cmd: 'getUsersInfo' }, games.map(game => game.playerTwoId)
    );

    // console.log('***** player1 *****\n', playerOneInfo, '\n**********');
    // console.log('***** player2 *****\n', playerTwoInfo, '\n***********');

    let i = 0;
    const result = Promise.all(games.map(async (game) => {
      return {
        id: game.id,
        player1: {
          ...playerOneInfo[i],
          score: game.playerOneScore,
          status: !!game.playerOneStatus,
        },
        player2: {
          ...playerTwoInfo[i++],
          score: game.playerTwoScore,
          status: !!game.playerTwoStatus,
        },
        points: game.points,
        level: game.level,
        createdAt: game.createdAt,
      };
    }));
    console.log('result:', await result);
    return result
  }

  async getFriendshipMatches(userId: number, page: number, limit: number) : Promise<IGameResult[]> {
    const friends: IUser[] = await this.clientService.sendMessageWithPayload(
      this.client,
      { role: 'user', cmd: 'getUserFriends'},
      {userId},
    );

    const friendIds = friends.map(friend => friend.id);

    const games = await this.prisma.game.findMany({
      where: {
        OR: [
          {
            playerOneId: userId,
            playerTwoId: { in: friendIds },
          },
          {
            playerOneId: { in: friendIds },
            playerTwoId: userId,
          }
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const playerOneInfo = await this.clientService.sendMessageWithPayload(
      this.client, { role: 'user', cmd: 'getUsersInfo' }, games.map(game => game.playerOneId)
    );
    const playerTwoInfo = await this.clientService.sendMessageWithPayload(
      this.client, { role: 'user', cmd: 'getUsersInfo' }, games.map(game => game.playerTwoId)
    );

    // console.log('***** player1 *****\n', playerOneInfo, '\n**********');
    // console.log('***** player2 *****\n', playerTwoInfo, '\n***********');

    let i = 0;
    const result = Promise.all(games.map(async (game) => {
      return {
        id: game.id,
        player1: {
          ...playerOneInfo[i],
          score: game.playerOneScore,
          status: !!game.playerOneStatus,
        },
        player2: {
          ...playerTwoInfo[i++],
          score: game.playerTwoScore,
          status: !!game.playerTwoStatus,
        },
        points: game.points,
        level: game.level,
        createdAt: game.createdAt,
      };
    }));
    console.log('result:', await result);
    return result
  }
}
