import { UserAccessAuthorizationGuard } from '../../../auth/guards/user-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver,Query, Args} from '@nestjs/graphql';
import { GwChannelService, GwDirectMessageService } from '../../services';
import { GQLChannelModel, GQLDirectMessageModel, GQLMembersModel } from 'apps/gateway/src/models/chat';

@Resolver()
export class ChatQueryResolver {
  constructor(
    private readonly directMessageService: GwDirectMessageService,
    private readonly channelService: GwChannelService
  ) {}

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => GQLDirectMessageModel, { nullable: true })
  async findDirectMessageById(@Args('id') id: number) : Promise<GQLDirectMessageModel> {
    return this.directMessageService.findDirectMessageById(id);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => GQLChannelModel, { nullable: true })
  async findChannelById(@Args('id') id: number) : Promise<GQLChannelModel> {
    const channel = await this.channelService.findChannelById(id);
    return channel;
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Query(() => [GQLMembersModel], { nullable: true })
  async findChannelMembersById(@Args('id') id: number) : Promise<GQLMembersModel[]> {
    const members = await this.channelService.findChannelMembersById(id);
    return members;
  }
}
