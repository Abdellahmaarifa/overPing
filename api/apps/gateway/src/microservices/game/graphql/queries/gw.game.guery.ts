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
  ) {}

  @Query(() => [GQLGameHistory])
  async getUserMatchHistory(@Args('data') data: GameHistoryInput) : Promise<GQLGameHistory[]> {
    return await this.gameService.getUserMatchHistory(data);
  }

  @Query(() => [GQLGameHistory])
  async getFriendshipMatches(@Args('data') data: GameHistoryInput) : Promise<GQLGameHistory[]> {
    return await this.gameService.getFriendshipMatches(data);
  }
}