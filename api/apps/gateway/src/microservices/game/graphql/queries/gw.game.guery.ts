import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { UserCheckService } from '../../../chat/services';
import { GwGameService } from '../../services/gw.game.service';
import { GameHistoryInput } from '../input/game.input';
import { GQLGameHistory } from '../models/graphqlGameModel';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class GameQueriesResolver {
  constructor(
    private readonly gameService: GwGameService,
    private readonly userCheck: UserCheckService,
  ) {}

  @Query(() => [GQLGameHistory])
  async getUserMatchHistory(@Context() ctx,
  @Args('data') data: GameHistoryInput) : Promise<GQLGameHistory[]>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    const history = await this.gameService.getUserMatchHistory(data);
    console.log('***-*** History:', history);
    return history;
  }

  @Query(() => [GQLGameHistory])
  async getFriendshipMatches(@Context() ctx,
  @Args('data') data: GameHistoryInput) : Promise<GQLGameHistory[]>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return await this.gameService.getFriendshipMatches(data);
  }
}