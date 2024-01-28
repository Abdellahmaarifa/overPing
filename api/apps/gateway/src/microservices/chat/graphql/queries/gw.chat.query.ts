import { IChannel, IMembersWithInfo } from '@app/common/chat';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { GwChannelService, GwDirectMessageService, UserCheckService } from '../../services';
import { GQLChannelModel, GQLChannelSearchModel, GQLDirectMessageModel } from '../models';

@Resolver()
@UseGuards(GqlJwtAuthGuard)
export class ChatQueriesResolver {
  constructor(
    private readonly directMessageService: GwDirectMessageService,
    private readonly channelService: GwChannelService,
    private readonly userCheck: UserCheckService,
    ) {}

  /******* Queries to get DIRECT-MESSAGES / CHANNELS of a User *******/

  @Query(() => [GQLDirectMessageModel], { nullable: true })
  async getUserDirectMessages(@Context() ctx,
  @Args('id') id: number): Promise<GQLDirectMessageModel[]> 
  {
    console.log('data sending....');
    await this.userCheck.validationId(id, ctx.req.user.id);
    const dms = await this.directMessageService.getUserDirectMessages(id);
    console.log('dms::::::::', dms);
    return dms;
  }

  @Query(() => [GQLChannelModel], { nullable: true })
  async getUserChannels(@Context() ctx,
    @Args('id') id: number): Promise<GQLChannelModel[]> 
  {
    await this.userCheck.validationId(id, ctx.req.user.id);
    return await this.channelService.getUserChannels(id);
  }


  /****** Queries to find DIRECT-MESSAGES / CHANNELS by user and group ID ******/

  @Query(() => GQLDirectMessageModel, { nullable: true })
  async findDirectMessageById(@Context() ctx,
    @Args('userId') userId: number,
    @Args('groupId') groupId: number): Promise<GQLDirectMessageModel> 
  {
    await this.userCheck.validationId(userId, ctx.req.user.id);
    return await this.directMessageService.findDirectMessageById(userId, groupId);
  }

  @Query(() => GQLChannelModel, { nullable: true })
  async findChannelById(@Context() ctx,
    @Args('userId') userId: number,
    @Args('groupId') groupId: number): Promise<{channel: IChannel, members: IMembersWithInfo}> 
  {
    await this.userCheck.validationId(userId, ctx.req.user.id);
    const channelInfo = await this.channelService.findChannelById(userId, groupId);

    console.log('**************** channel info *************\n', channelInfo, '**********************');
    return channelInfo;
  }

  /*********** Search For channel by Name ***********/

  @Query(() => [GQLChannelSearchModel], { nullable: true })
  async searchForChannel(@Context() ctx,
    @Args('channelName') channelName: string,
    @Args('userId') userId: number): Promise<GQLChannelSearchModel[]> 
  {
    await this.userCheck.validationId(userId, ctx.req.user.id);
    return await this.channelService.searchForChannel(channelName, userId);
  }

}
