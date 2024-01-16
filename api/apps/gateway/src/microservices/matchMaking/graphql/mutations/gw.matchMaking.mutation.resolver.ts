import {
    Resolver,
    Mutation,
    Args,
    Context,
    Subscription,
} from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
import { GwMatchMakingService } from '../../services/gw.matchMaking.service';
import { JoinMatchmakingInput, RequestToPlayInput } from '../inputs/joinMatchmakingInput';
import { PlayersMatching } from '../../models/playerMathing';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { RespondToPlay } from '../../models/respondRequestToPlayDto';
import { AcceptRequestInput, CancelRequestInput } from '../inputs/acceptRequestInput';

@Resolver()
export class MatchMakingMutationsResolver {
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSubEngine,
        private readonly gwMatchMakingService: GwMatchMakingService,
    ) { }

    @Subscription((returns) => PlayersMatching, {
        resolve: (payload: PlayersMatching) => payload,
      })
      matchWaitingList(@Args('userId') userId: number) {
        return this.pubSub.asyncIterator(`waitingList${userId}`);
      }
      
      @Mutation((returns) =>  Boolean, { nullable: true })
      async joinMatchmakingQueue(@Args('JoinMatchmakingInput') joinMatchData: JoinMatchmakingInput) {
        this.gwMatchMakingService.joinMatchmakingQueue(joinMatchData);
      }

      @UseGuards(GqlJwtAuthGuard)
      @Mutation((returns) =>  Boolean, { nullable: true })
        async sendRequestToPlay(@Context() cxt,  @Args('JoinMatchmakingInput') joinMatchData: RequestToPlayInput) {
          const userId = cxt.req.user.id;
          const isRequestSent =  await this.gwMatchMakingService.requestUserToPlay(userId, joinMatchData);
          if (isRequestSent){
            const respondData: RespondToPlay = {
              playerId: isRequestSent.userId,
              matchType: isRequestSent.matchType
            }
            console.log("this is respondData ", respondData);
            this.pubSub.publish(`getRequestToPlay${isRequestSent.recipientId}`, respondData);
          }
          return !! isRequestSent;
      }

      @UseGuards(GqlJwtAuthGuard)
      @Mutation((returns) =>  Boolean, { nullable: true })
      async acceptMatchToPlay(@Context() cxt, @Args('AcceptRequestInput') acceptMatchData: AcceptRequestInput) {
        const userId = cxt.req.user.id;
         this.gwMatchMakingService.acceptMatchToPlay(userId, acceptMatchData);
        return true;
      }

      @UseGuards(GqlJwtAuthGuard)
      @Mutation((returns) =>  Boolean, { nullable: true })
      async cancelRequestToPlay(@Context() cxt, @Args('CancelRequestInput') acceptMatchData: CancelRequestInput) {
        const userId = cxt.req.user.id;
        return this.gwMatchMakingService.cancelRequestToPlay(userId, acceptMatchData);
      }
      
      @Subscription((returns) => RespondToPlay, {
        resolve: (payload: RespondToPlay) => payload,
      })
      async notification(@Args('userId') userId: number) {
        // const userId = cxt.req.user.id;
        return  this.pubSub.asyncIterator(`getRequestToPlay${userId}`);
      }
      
}
