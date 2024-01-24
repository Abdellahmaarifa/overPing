import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { Context } from '@nestjs/graphql'
import { GwGameService } from '../../services/gw.game.service';
import { GQLGameHistory } from '../models/graphqlGameModel';
import { GameHistoryInput } from '../input/game.input';
import { UserCheckService } from '../../../chat/services';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class GameQueriesResolver {
  constructor(
    private readonly gameService: GwGameService,
    private readonly userCheck: UserCheckService,
  ) {}

  @Query(() => GQLGameHistory, {nullable: true})
  async getUserMatchHistory(@Context() ctx,
  @Args('userId') data: GameHistoryInput) : Promise<GQLGameHistory[]>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.gameService.getUserMatchHistory(data);
  }

  @Query(() => GQLGameHistory, {nullable: true})
  async getFriendshipMatches(@Context() ctx,
  @Args('userId') data: GameHistoryInput) : Promise<GQLGameHistory[]>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.gameService.getFriendshipMatches(data);
  }
}