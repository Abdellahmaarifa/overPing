import { Controller, Get } from '@nestjs/common';
import { MatchmakingService } from '../services/matchmaking.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { JoinMatchmakingDto } from '../dto/join-matchmaking.dto'
@Controller()
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}

  @EventPattern({role: 'matchMaking', cmd: 'joinQueue'})
  async joinMatchmakingQueue(joinMatchData: JoinMatchmakingDto) {
    console.log("this is Queue in matchmaking ", joinMatchData);
    this.matchmakingService.joinMatchmakingQueue(joinMatchData);
  }
  
}
