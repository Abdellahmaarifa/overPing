import { Controller } from '@nestjs/common';
import { GameService } from './game.service';
import { MessagePattern } from '@nestjs/microservices';
import { IGameData } from './Interfaces/game.interface';


@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @MessagePattern({role: 'game', cmd: 'get-user-match-history'})
  async getUserMatchHistory(payload: any) : Promise<IGameData[]> {
    const {userId, page, limit} = payload;
    return this.gameService.getUserMatchHistory(userId, page, limit);
  }

  @MessagePattern({role: 'game', cmd: 'get-friendship-matches'})
  async getFriendshipMatches(payload: any) : Promise<IGameData[]> {
    const {userId, page, limit} = payload;
    return this.gameService.getFriendshipMatches(userId, page, limit);
  }
}