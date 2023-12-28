import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GwChannelService } from '../../services';
import {
  CreateChannelInput,
  DeleteMessageInput,
  MemberInput,
  UpdateChannelInput,
  UpdateMessageInput
} from '../input/channel.input';
import { GQLChannelModel, GQLMessageModel } from 'apps/gateway/src/models/chat';

@Resolver()
export class ChatResolver {
  constructor(private readonly channelService: GwChannelService) {}

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async createChannel(@Args('data') data: CreateChannelInput) : Promise<GQLChannelModel> {
    return this.channelService.createChannel( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async updateChannel(@Args('data') data: UpdateChannelInput) : Promise<GQLChannelModel> {
    return this.channelService.updateChannel( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteChannel(@Args('userID') userID: number, @Args('channelID') channelID: number) : Promise<Boolean> {
    return this.channelService.deleteChannel( userID, channelID );
  }
  
  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLMessageModel)
  async updateMessageInChannel(@Args('data') data: UpdateMessageInput) : Promise<GQLMessageModel> {
    return this.channelService.updateMessageInChannel( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteMessageInChannel(@Args('data') data: DeleteMessageInput) : Promise<Boolean> {
    return this.channelService.deleteMessageInChannel( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async joinChannel(@Args('data') data: MemberInput) : Promise<GQLChannelModel> {
    return this.channelService.joinChannel( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async leaveChannel(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.leaveChannel( data );
  }


  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async addMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.addMember( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.removeMember(data);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async addChannelAdmin(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.addChannelAdmin( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeChannelAdmin(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.removeChannelAdmin( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async kickMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.kickMember( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async banMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.banMember( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async unbanMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.unbanMember( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async muteMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.muteMember( data );
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async unmuteMember(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.unmuteMember( data );
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