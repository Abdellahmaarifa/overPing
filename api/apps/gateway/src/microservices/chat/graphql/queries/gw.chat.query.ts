import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver,Query, Args} from '@nestjs/graphql';
import { GwChannelService, GwDirectMessageService } from '../../services';
import { GQLChannelModel, GQLDirectMessageModel, GQLMembersModel, GQLMessageModel } from 'apps/gateway/src/models/chat';

@Resolver()
export class ChatQueryResolver {
  constructor(
    private readonly directMessageService: GwDirectMessageService,
    private readonly channelService: GwChannelService
  ) {}

  /****** Queries to get DIRECT-MESSAGES / CHANNELS for a user ******/

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


  /****** Query to find CHANNEL MEMBERS by user and group IDs ******/
  
  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLMembersModel], { nullable: true })
  async findChannelMembersById(
    @Args('userId') userId: number,
    @Args('groupId') groupId: number
  ): Promise<GQLMembersModel[]> {
    return await this.channelService.findChannelMembersById(userId, groupId);
  }


  /****** Query to get MESSAGES by user, group IDs -- PAGINATION -- ******/

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLMessageModel], { nullable: true })
  async getDMMessages(
    @Args('userId') userId: number,
    @Args('groupId') groupId: number,
    @Args('page') page: number
  ): Promise<GQLMessageModel[]> {
    return await this.directMessageService.getDMMessages(userId, groupId, page);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLMessageModel], { nullable: true })
  async getChannelMessages(
    @Args('userId') userId: number,
    @Args('groupId') groupId: number,
    @Args('page') page: number
  ): Promise<GQLMessageModel[]> {
    return await this.channelService.getChannelMessages(userId, groupId, page);
  }
}
