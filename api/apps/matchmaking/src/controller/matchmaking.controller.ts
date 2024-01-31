import { Controller, Get } from '@nestjs/common';
import { MatchmakingService } from '../services/matchmaking.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { JoinMatchmakingDto, RequestToPlayDto} from '../dto/join-matchmaking.dto'
import { RespondToPlayDto } from '../dto/join-matchmaking.dto'
import { acceptMatchToPlayDto } from '../dto/PlayerInterface';
@Controller()
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}

  @EventPattern({role: 'matchMaking', cmd: 'joinQueue'})
  async joinMatchmakingQueue(joinMatchData: JoinMatchmakingDto) {
    console.log("this is Queue in matchmaking ", joinMatchData);
    this.matchmakingService.joinMatchmakingQueue(joinMatchData);
  }

  @MessagePattern({role: 'matchMaking', cmd: 'requestUserToPlay'})
  async requestUserToPlay(input : {userId: number, joinMatchData: RequestToPlayDto}) : Promise<RespondToPlayDto>{
    console.log("this is Queue in user matching ", input.joinMatchData);
    return this.matchmakingService.requestUserToPlay(input.userId, input.joinMatchData);
  }

  @MessagePattern({role: 'matchMaking', cmd: 'acceptMatchToPlay'})
  acceptMatchToPlay(joinMatchData: acceptMatchToPlayDto){
     this.matchmakingService.acceptMatchToPlay(joinMatchData);
  }

  @MessagePattern({role: 'matchMaking', cmd: 'CancelRequestToPlay'})
  cancelRequestToPlay(joinMatchData: acceptMatchToPlayDto){
     return this.matchmakingService.cancelRequestToPlay(joinMatchData);
  }
  
  @MessagePattern({role: 'matchMaking', cmd: 'removePlayerFromQueue'})
  async removePlayerFromQueue(input: {userId: number, matchType: string}):  Promise<boolean>{
     console.log("try to remove player");
    return this.matchmakingService.removePlayerFromQueue(input.userId, input.matchType);
  }

}
