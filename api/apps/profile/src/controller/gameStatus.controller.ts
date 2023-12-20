import { Controller } from '@nestjs/common';
import { GameStatusService } from '../services/gameStatus.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class UserGameStatusController {
  constructor(
    private readonly gameStatusService : GameStatusService,
  ) {
   
  }


  @MessagePattern({role: 'game', cmd: 'create-match'})
  async createUserGameStatus(data: any){
    this.gameStatusService.createGameMatch(data);
  }

  @EventPattern({role: 'game', cmd: 'game-result'})
  async handleGameResult(payload: any) {
    try {
      const stats = await this.gameStatusService.updateGameStatusAndUserProfile( payload );
      // await this.statistic.updateUserStatistic( payload );
      return stats;
    }
    catch (error) {
      return error;
    }
}

}