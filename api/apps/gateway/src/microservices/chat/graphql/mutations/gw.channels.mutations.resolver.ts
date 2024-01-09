import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GwChannelService } from '../../services';
import {
  CreateProtectedInput,
  CreatePublicPrivateInput,
  DeleteMessageInput,
  MemberInput,
  UpdateChannelInput,
  UpdateMessageInput,
  updateProtectedInput,
  updatePublicPrivateInput
} from '../input/channel.input';
import { GQLChannelModel, GQLMessageModel } from '../models';

@Resolver()
export class ChannelResolver {
  constructor(private readonly channelService: GwChannelService) {}

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async createPublicPrivateChannel(
    @Args('data', {type: () => CreatePublicPrivateInput}) data: CreatePublicPrivateInput ) {
    return this.channelService.createChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async createProtectedChannel(
    @Args('data', {type: () => CreateProtectedInput}) data: CreateProtectedInput ) {
    return this.channelService.createChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async updatePublicPrivateChannel(@Args('data') data: updatePublicPrivateInput) {
    return this.channelService.updateChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async updateProtectedChannel(@Args('data') data: updateProtectedInput) {
    return this.channelService.updateChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteChannel(@Args('userID') userID: number, @Args('channelID') channelID: number) {
    return this.channelService.deleteChannel( userID, channelID );
  }
  
  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLMessageModel)
  async updateMessageInChannel(@Args('data') data: UpdateMessageInput) {
    return this.channelService.updateMessageInChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteMessageInChannel(@Args('data') data: DeleteMessageInput) {
    return this.channelService.deleteMessageInChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => GQLChannelModel)
  async joinChannel(@Args('data') data: MemberInput) {
    return this.channelService.joinChannel( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async leaveChannel(@Args('data') data: MemberInput) {
    return this.channelService.leaveChannel( data );
  }


  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async addMember(@Args('data') data: MemberInput) {
    return this.channelService.addMember( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeMember(@Args('data') data: MemberInput) {
    return this.channelService.removeMember(data);
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async addChannelAdmin(@Args('data') data: MemberInput) {
    return this.channelService.addChannelAdmin( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeChannelAdmin(@Args('data') data: MemberInput) {
    return this.channelService.removeChannelAdmin( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async kickMember(@Args('data') data: MemberInput) {
    return this.channelService.kickMember( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async banMember(@Args('data') data: MemberInput) {
    return this.channelService.banMember( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async unbanMember(@Args('data') data: MemberInput) {
    return this.channelService.unbanMember( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async muteMember(@Args('data') data: MemberInput) {
    return this.channelService.muteMember( data );
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async unmuteMember(@Args('data') data: MemberInput) {
    return this.channelService.unmuteMember( data );
  }
}