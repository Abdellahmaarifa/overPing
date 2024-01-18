import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GwChannelService } from '../../services';
import {
  ActionToMemberInput,
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
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class ChannelResolver {
  constructor(private readonly channelService: GwChannelService) {}

  @Mutation(() => GQLChannelModel)
  async createPublicPrivateChannel(
    @Args('data', {type: () => CreatePublicPrivateInput}) data: CreatePublicPrivateInput ) : Promise<GQLChannelModel> {
    return await this.channelService.createChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async createProtectedChannel(
    @Args('data', {type: () => CreateProtectedInput}) data: CreateProtectedInput ) : Promise<GQLChannelModel> {
    return this.channelService.createChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async updatePublicPrivateChannel(@Args('data') data: updatePublicPrivateInput) : Promise<GQLChannelModel> {
    return this.channelService.updateChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async updateProtectedChannel(@Args('data') data: updateProtectedInput) : Promise<GQLChannelModel> {
    return this.channelService.updateChannel( data );
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.deleteChannel( data );
  }
  
  @Mutation(() => GQLMessageModel)
  async updateMessageInChannel(@Args('data') data: UpdateMessageInput) : Promise<GQLMessageModel> {
    return this.channelService.updateMessageInChannel( data );
  }

  @Mutation(() => Boolean)
  async deleteMessageInChannel(@Args('data') data: DeleteMessageInput) : Promise<Boolean>  {
    return this.channelService.deleteMessageInChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async joinChannel(@Args('data') data: MemberInput) : Promise<GQLChannelModel> {
    return this.channelService.joinChannel( data );
  }

  @Mutation(() => Boolean)
  async leaveChannel(@Args('data') data: MemberInput) : Promise<Boolean> {
    return this.channelService.leaveChannel( data );
  }


  @Mutation(() => Boolean)
  async addMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.addMember( data );
  }

  @Mutation(() => Boolean)
  async removeMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.removeMember(data);
  }

  @Mutation(() => Boolean)
  async addAdmin(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.addChannelAdmin( data );
  }

  @Mutation(() => Boolean)
  async removeAdmin(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.removeChannelAdmin( data );
  }

  @Mutation(() => Boolean)
  async kickMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.kickMember( data );
  }

  @Mutation(() => Boolean)
  async banMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.banMember( data );
  }

  @Mutation(() => Boolean)
  async unbanMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.unbanMember( data );
  }

  @Mutation(() => Boolean)
  async muteMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.muteMember( data );
  }

  @Mutation(() => Boolean)
  async unmuteMember(@Args('data') data: ActionToMemberInput) : Promise<Boolean> {
    return this.channelService.unmuteMember( data );
  }
}