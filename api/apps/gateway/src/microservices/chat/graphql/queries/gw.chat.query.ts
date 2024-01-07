import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver,Query, Args} from '@nestjs/graphql';
import { GwChannelService, GwDirectMessageService } from '../../services';
import { GQLChannelModel, GQLChannelSearchModel, GQLDirectMessageModel, GQLMembersModel } from 'apps/gateway/src/models/chat';

@Resolver()
export class ChatQueriesResolver {
  constructor(
    private readonly directMessageService: GwDirectMessageService,
    private readonly channelService: GwChannelService
  ) {}

  /******* Queries to get DIRECT-MESSAGES / CHANNELS of a User *******/

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLDirectMessageModel], { nullable: true })
  async getUserDirectMessages(@Args('id') id: number): Promise<GQLDirectMessageModel[]> {
    return await this.directMessageService.getUserDirectMessages(id);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLChannelModel], { nullable: true })
  async getUserChannels(@Args('id') id: number): Promise<GQLChannelModel[]> {
    return await this.channelService.getUserChannels(id);
  }


  /****** Queries to find DIRECT-MESSAGES / CHANNELS by user and group ID ******/

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => GQLDirectMessageModel, { nullable: true })
  async findDirectMessageById(
    @Args('userId') userId: number,
    @Args('groupId') groupId: number
  ): Promise<GQLDirectMessageModel> {
    return await this.directMessageService.findDirectMessageById(userId, groupId);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => GQLChannelModel, { nullable: true })
  async findChannelById(
    @Args('userId') userId: number,
    @Args('groupId') groupId: number
  ): Promise<GQLChannelModel> {
    return await this.channelService.findChannelById(userId, groupId);
  }

  /*********** Search For channel by Name ***********/

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLChannelSearchModel], { nullable: true })
  async searchForChannel(
    @Args('channelName') channelName: string
  ): Promise<GQLChannelSearchModel[]> {
    return await this.channelService.searchForChannel(channelName);
  }

}
