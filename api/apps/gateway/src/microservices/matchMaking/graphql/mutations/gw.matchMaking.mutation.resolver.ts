import {
    Resolver,
    Mutation,
    Args,
    Context,
    Subscription,
} from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { GwMatchMakingService } from '../../services/gw.matchMaking.service';
import { JoinMatchmakingInput } from '../inputs/joinMatchmakingInput';

@ObjectType()
export class PingPongPayload {
  @Field()
  user1Id: number
    @Field()
    user2Id: number
    @Field()
    matchKey: string
}

@Resolver()
export class MatchMakingMutationsResolver {
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSubEngine,
        private readonly gwMatchMakingService: GwMatchMakingService,
    ) { }

    @Subscription((returns) => PingPongPayload, {
        resolve: (payload: PingPongPayload) => payload,
      })
      matchWaitingList(@Args('userId') userId: number) {
        return this.pubSub.asyncIterator(`waitingList${userId}`);
      }
      
      @Mutation((returns) =>  Boolean, { nullable: true })
      async joinMatchmakingQueue(@Args('JoinMatchmakingInput') joinMatchData: JoinMatchmakingInput) {
        this.gwMatchMakingService.joinMatchmakingQueue(joinMatchData);
      }
}
