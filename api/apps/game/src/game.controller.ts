import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IGameData, IGameResult } from './Interfaces/game.interface';
import { GameService } from './game.service';


@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @MessagePattern({role: 'game', cmd: 'get-user-match-history'})
  async getUserMatchHistory(payload: any) : Promise<IGameResult[]> {
    const {userId, page, limit} = payload;
    return await this.gameService.getUserMatchHistory(userId, page, limit);
  }

  @MessagePattern({role: 'game', cmd: 'get-friendship-matches'})
  async getFriendshipMatches(payload: any) : Promise<IGameResult[]> {
    const {userId, page, limit} = payload;
    return await this.gameService.getFriendshipMatches(userId, page, limit);
  }
}