import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GwDirectMessageService } from '../../services';
import { DeletionInput, UpdateInput } from '../input/directMessage.input';
import { GQLDirectMessageModel, GQLMessageModel } from 'apps/gateway/src/models/chat';

@Resolver()
export class ChatResolver {
  constructor(private readonly directMessageService: GwDirectMessageService) {}
    
  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLDirectMessageModel)
  async createDirectMessage( @Args('userID') userID: number, @Args('targetID') targetID: number ) : Promise<GQLDirectMessageModel> {
    return this.directMessageService.createDirectMessage( userID, targetID );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteDirectMessage(@Args('data') data: DeletionInput) : Promise<Boolean> {
    return this.directMessageService.deleteDirectMessage( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLMessageModel)
  async updateMessageInDM( @Args('data') data: UpdateInput ) : Promise<GQLMessageModel> {
    return this.directMessageService.updateMessageInDM( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteMessageInDM(@Args('data') data: DeletionInput) : Promise<Boolean> {
    return this.directMessageService.deleteMessageInDM( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async blockUser( @Args('userID') userID: number, @Args('targetID') targetID: number ) : Promise<Boolean>{
    return this.directMessageService.blockUser( userID, targetID );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async unblockUser( @Args('userID') userID: number, @Args('targetID') targetID: number ) : Promise<Boolean>{
    return this.directMessageService.unblockUser( userID, targetID );
  }

  /******* DOES THIS NEED TO BE IN THE GAME SERVICE ??? *****************/
  // @UseGuards(UserAccessAuthorizationGuard)
  // @Mutation(() => Boolean)
  // async inviteToGame(@Args('data') data: GameInvitationInput) {
  //   return this.directMessageService.inviteToGame( data );
  // }

  // @UseGuards(UserAccessAuthorizationGuard)
  // @Mutation(() => Boolean)
  // async acceptGameInvitation(@Args('data') data: AcceptGameInvitationInput) {
  //   return this.directMessageService.acceptGameInvitation( data );
  // }

  // @UseGuards(UserAccessAuthorizationGuard)
  // @Mutation(() => Boolean)
  // async rejectGameInvitation(@Args('data') data: RejectGameInvitationInput) {
  //   return this.directMessageService.rejectGameInvitation( data );
  // }
}
