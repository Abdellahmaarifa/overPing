import { UseGuards } from '@nestjs/common';
import { Resolver,Query, Args, Context} from '@nestjs/graphql';
import { GwChannelService, GwDirectMessageService, UserCheckService } from '../../services';
import { GQLChannelModel, GQLChannelSearchModel, GQLDirectMessageModel } from '../models';
import { IChannel, IMembersWithInfo } from '@app/common/chat';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';

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
    await this.userCheck.validationId(id, ctx.req.user.id);
    return await this.directMessageService.getUserDirectMessages(id);
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
    return await this.channelService.findChannelById(userId, groupId);
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
