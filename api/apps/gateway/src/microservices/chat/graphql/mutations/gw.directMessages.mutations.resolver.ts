import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GwDirectMessageService } from '../../services';
import { DeletionInput, UpdateInput } from '../input/directMessage.input';
import { GQLDirectMessageModel, GQLMessageModel } from '../models';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class directMessageResolver {
  constructor(private readonly directMessageService: GwDirectMessageService) {}
    
  @Mutation(() => GQLDirectMessageModel)
  async createDirectMessage( @Args('userID') userID: number, @Args('targetID') targetID: number ) : Promise<GQLDirectMessageModel> {
    return this.directMessageService.createDirectMessage( userID, targetID );
  }

  @Mutation(() => Boolean)
  async deleteDirectMessage(@Args('data') data: DeletionInput) : Promise<Boolean> {
    return this.directMessageService.deleteDirectMessage( data );
  }

  @Mutation(() => GQLMessageModel)
  async updateMessageInDM( @Args('data') data: UpdateInput ) : Promise<GQLMessageModel> {
    return this.directMessageService.updateMessageInDM( data );
  }

  @Mutation(() => Boolean)
  async deleteMessageInDM(@Args('data') data: DeletionInput) : Promise<Boolean> {
    return this.directMessageService.deleteMessageInDM( data );
  }
}
