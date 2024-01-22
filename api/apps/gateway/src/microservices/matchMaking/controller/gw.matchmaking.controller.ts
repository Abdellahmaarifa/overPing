import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { matchDataInput } from '../graphql/inputs/matchDataInput';

@Controller()
export class GwMatchmakingController {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) { }


  @MessagePattern({ role: 'gateway', cmd: 'matchFound' })
  async matchnotify(matchData: matchDataInput) {
    console.log('atest:', matchData);
    if (matchData == null) {
      console.log('match not found');
    }
    console.log("found match forun matchmaking coming form", matchData)
    if (matchData.user1){
      this.pubSub.publish(`waitingList${matchData.user1.id}`, matchData);
    }
    if (Object.keys(matchData.user2).length !== 0){
      console.log('match data sent...', matchData);
      this.pubSub.publish(`waitingList${matchData.user2.id}`, matchData); 
    }
    // this.pubSub.publish('pingPong', payload)
  }

  @MessagePattern({ role: 'gateway', cmd: 'matchDirc' })
  async matchnotifyDrict(matchData: matchDataInput) {
    console.log('atest:', matchData);
    if (matchData == null) {
      console.log('match not found');
    }
    console.log("found match forun matchmaking coming form", matchData)
    if (matchData.user1){
      this.pubSub.publish(`waitingListDirc${matchData.user1.id}`, matchData);
    }
    if (Object.keys(matchData.user2).length !== 0){
      console.log('match data sent...', matchData);
      this.pubSub.publish(`waitingListDirc${matchData.user2.id}`, matchData); 
    }
    // this.pubSub.publish('pingPong', payload)
  }

}
