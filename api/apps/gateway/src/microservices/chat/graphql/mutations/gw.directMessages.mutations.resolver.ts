import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GwDirectMessageService, UserCheckService } from '../../services';
import { DeletionInput, UpdateInput } from '../input/directMessage.input';
import { GQLDirectMessageModel, GQLMessageModel } from '../models';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class directMessageResolver {
  constructor(
    private readonly directMessageService: GwDirectMessageService,
    private readonly userCheck: UserCheckService,
  ) {}

  @Mutation(() => GQLDirectMessageModel)
  async createDirectMessage(@Context() ctx,
  @Args('userID') userID: number, @Args('targetID') targetID: number ) : Promise<GQLDirectMessageModel>
  {
    await this.userCheck.validationId(userID, ctx.req.user.id);
    return this.directMessageService.createDirectMessage( userID, targetID );
  }

  @Mutation(() => Boolean)
  async deleteDirectMessage(@Context() ctx,
  @Args('data') data: DeletionInput) : Promise<Boolean>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.directMessageService.deleteDirectMessage( data );
  }

  @Mutation(() => GQLMessageModel)
  async updateMessageInDM(@Context() ctx,
  @Args('data') data: UpdateInput ) : Promise<GQLMessageModel>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.directMessageService.updateMessageInDM( data );
  }

  @Mutation(() => Boolean)
  async deleteMessageInDM(@Context() ctx,
  @Args('data') data: DeletionInput) : Promise<Boolean>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.directMessageService.deleteMessageInDM( data );
  }
}
