import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GwChannelService } from '../../services';
import {
  ActionToMemberInput,
  CreateChannelInput,
  DeleteChannelInput,
  DeleteMessageInput,
  MemberInput,
  UpdateChannelInput,
  UpdateMessageInput,
} from '../input/channel.input';
import { GQLChannelModel, GQLMessageModel } from '../models';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { Context } from '@nestjs/graphql'
import { UserCheckService } from '../../services/userCheck.service';


@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class ChannelResolver {
  constructor(
    private readonly channelService: GwChannelService,
    private readonly userCheck: UserCheckService,
  ) {}
  @Mutation(() => GQLChannelModel)
  async createChannel(@Context() ctx,
  @Args('data') data: CreateChannelInput) : Promise<GQLChannelModel>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.createChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async updateChannel(@Context() ctx,
  @Args('data') data: UpdateChannelInput) : Promise<GQLChannelModel>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.updateChannel( data );
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Context() ctx,
    @Args('data') data: DeleteChannelInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.deleteChannel( data );
  }
  
  @Mutation(() => GQLMessageModel)
  async updateMessageInChannel(@Context() ctx,
  @Args('data') data: UpdateMessageInput) : Promise<GQLMessageModel>
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.updateMessageInChannel( data );
  }

  @Mutation(() => Boolean)
  async deleteMessageInChannel(@Context() ctx,
  @Args('data') data: DeleteMessageInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.deleteMessageInChannel( data );
  }

  @Mutation(() => GQLChannelModel)
  async joinChannel(@Context() ctx,
  @Args('data') data: MemberInput) : Promise<GQLChannelModel> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.joinChannel( data );
  }

  @Mutation(() => Boolean)
  async leaveChannel(@Context() ctx,
  @Args('data') data: MemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.leaveChannel( data );
  }


  @Mutation(() => Boolean)
  async addMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.addMember( data );
  }

  @Mutation(() => Boolean)
  async addAdmin(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.addChannelAdmin( data );
  }

  @Mutation(() => Boolean)
  async removeAdmin(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.removeChannelAdmin( data );
  }

  @Mutation(() => Boolean)
  async kickMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.kickMember( data );
  }

  @Mutation(() => Boolean)
  async banMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.banMember( data );
  }

  @Mutation(() => Boolean)
  async unbanMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.unbanMember( data );
  }

  @Mutation(() => Boolean)
  async muteMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.muteMember( data );
  }

  @Mutation(() => Boolean)
  async unmuteMember(@Context() ctx,
    @Args('data') data: ActionToMemberInput) : Promise<Boolean> 
  {
    await this.userCheck.validationId(data.userId, ctx.req.user.id);
    return this.channelService.unmuteMember( data );
  }
}