import { Controller } from '@nestjs/common';
import { GameStatusService } from '../services/gameStatus.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserGameStatusController {
  constructor(
    private readonly gameStatusService : GameStatusService,
  ) {
   
  }


  @MessagePattern({role: 'game', cmd: 'game-result'})
  async handleGameResult(payload: any) {
    console.log("the reslute: ", payload);
    try {
      const stats = await this.gameStatusService.updateGameStatusAndUserProfile( payload );
      // await this.statistic.updateUserStatistic( payload );
      console.log("HEEEEERE: ", stats);
      return stats;
    }
    catch (error) {
      return error;
    }
  }

}