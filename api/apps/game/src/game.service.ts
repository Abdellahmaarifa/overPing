import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IGameData } from './Interfaces/game.interface';

@Injectable()
export class GameService {
  constructor(
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

  async getFriendshipMatches(userId: number, friendIds: number[], page: number, limit: number) : Promise<IGameData[]> {
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
