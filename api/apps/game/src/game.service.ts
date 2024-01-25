import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IGameData } from './Interfaces/game.interface';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';
import { IUser } from '@app/common';

@Injectable()
export class GameService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly userClient: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
  ) {}

  async addResult(result: IGameData) {
    await this.prisma.game.create({
      data: {
        playerOneId: result.playerOneId,
        playerOneName: result.playerOneName,
        playerOneImageURL: result.playerOneImageURL,
        playerOneScore: result.playerOneScore,
        playerOneStatus : result.playerOneStatus,
        playerTwoId: result.playerTwoId,
        playerTwoName: result.playerTwoName,
        playerTwoImageURL: result.playerTwoImageURL,
        playerTwoScore: result.playerTwoScore,
        playerTwoStatus: result.playerTwoStatus,
        points: result.points,
        level: result.level
      }
    });
  }

  async getUserMatchHistory(userId: number, page: number, limit: number) : Promise<IGameData[]> {
    return await this.prisma.game.findMany({
      where: {
        OR: [
          { playerOneId: userId },
          { playerTwoId: userId }
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getFriendshipMatches(userId: number, page: number, limit: number) : Promise<IGameData[]> {
    const friends: IUser[] = await this.clientService.sendMessageWithPayload(
      this.userClient,
      { role: 'user', cmd: 'getUserFriends'},
      userId,
    );

    const friendIds = friends.map(friend => friend.id);

    return await this.prisma.game.findMany({
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
  }
}
