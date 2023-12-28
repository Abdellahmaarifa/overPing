import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { matchDataInput } from '../graphql/inputs/matchDataInput';

@Controller()
export class GwMatchmakingController {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}


  @MessagePattern({role: 'gateway', cmd: 'matchFound'})
  async matchnotify(matchData: matchDataInput) {
    console.log("found match forun matchmaking coming form", matchData)
        this.pubSub.publish(`waitingList${matchData.user1Id}`, matchData);
        this.pubSub.publish(`waitingList${matchData.user2Id}`, matchData);

        // this.pubSub.publish('pingPong', payload)
  }
  
}
