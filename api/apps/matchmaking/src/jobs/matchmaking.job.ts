import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, } from '@nestjs/schedule';
import { MatchmakingService } from '../services/matchmaking.service';
import { PoolType } from '../dto/PlayerInterface';


@Injectable()
export class MatchmakingJob {
  constructor(
    private readonly matchmakingService: MatchmakingService,
  ) {
  }


  @Cron(CronExpression.EVERY_SECOND) // Adjust the cron expression as needed
  handleClassicMatchmaking(): void {
    // console.log('[Scheduler]: Classic matchmaking every second');
    this.handleMatchmaking(PoolType.Classic);
  }

  @Cron(CronExpression.EVERY_SECOND) // Adjust the cron expression as needed
  handleSandStormMatchmaking(): void {
    this.handleMatchmaking(PoolType.Sandstorm);
  }

  @Cron(CronExpression.EVERY_SECOND) // Adjust the cron expression as needed
  handleLastPongMatchmaking(): void {
    this.handleMatchmaking(PoolType.LastPong);
  }


  private handleMatchmaking(matchType: PoolType): void {
   this.matchmakingService.findAndStartMatch(matchType);
  }
}

