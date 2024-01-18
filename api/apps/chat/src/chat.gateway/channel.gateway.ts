import { ClientAccessAuthorizationGuard } from '../guards/client.guard';
import { Inject, Logger, UseGuards, forwardRef } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer,
  OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInChanneldto, ChannelMessagesdto, MemberOfChanneldto } from '../dto';
import { CheckerService } from '../utils/checker.service';
import { ChannelService } from '../services/channel.service';
import { HelperService } from '../utils/helper.service';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { RpcExceptionService } from '@app/common/exception-handling';
import { GroupType } from '../interface/group.interface';
import { FriendshipStatus } from '@app/common';
import { IChannelInfo, IMembersWithInfo, IMessage } from '@app/common/chat';
import { CHANNEL } from '../interface';

let connectedChannelUsers: Map<number, any> = new Map();

@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_URL}`,
    credentials: true
  },
  namespace: CHANNEL.namespace,
})
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => ChannelService))
    private readonly channelService: ChannelService,
    @Inject(forwardRef(() => HelperService))
    private readonly helper: HelperService,
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => CheckerService))
    private readonly checker: CheckerService,
    private readonly rpcExceptionService: RpcExceptionService
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChannelGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  @UseGuards(ClientAccessAuthorizationGuard)
  async handleConnection(client: Socket, ...args: any[]) {
    const user = args[0]?.req?.user; // TEST IT IF IT WORKS ?????
    const userId = await this.helper.getUserId(client);
    if (user || userId) {
      this.logger.log(`User connected: ${client.id}`);
      connectedChannelUsers.set(((user)? user.id : userId), client.id);
    }
    else {
      this.logger.log(`User authentication failed: ${client.id}`);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = await this.helper.getUserId(client);
    if (userId) {
      this.logger.log(`User disconnected: ${client.id}`);
      connectedChannelUsers.delete(userId);

      const userChannels = await this.channelService.getUserChannels(userId);
      userChannels.forEach((channelId) => {
        client.leave('channel_' + channelId)
      });
    }
  }

  @SubscribeMessage(CHANNEL.join_channel)
  async joinChannel(client: Socket, data: MemberOfChanneldto) {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      this.rpcExceptionService.throwBadRequest(`Failed to find the user id ${userId}`);
    }
    if (await this.checker.checkForUser(data.userId) === false
     || await this.checker.checkForChannel(data.channelId) === false) {
      this.rpcExceptionService.throwBadRequest(`Invalid user/channel id`);
    }
    const channelName = `channel_` + data.channelId;
    client.join(channelName);
  }

  @SubscribeMessage(CHANNEL.sendMessageInchannel)
  async sendMessageToUser(client: Socket, data: AddMessageInChanneldto) {
    const userId = await this.helper.getUserId(client);
    if (!data.text || !userId || userId !== data.userId) {
      return;
    }
    
    const existingChannel = await this.checker.checkForChannel(data.channelId);
    if (!existingChannel || !this.checker.isMember(userId, data.channelId)) {
      return;
    }
    
    if (this.checker.isMuted(data.userId, data.channelId)) {
      return;
    }

    const message = this.channelService.addMessage(data);
    if (message) {
      const channelName = `channel_` + data.channelId;

      const blockedByUsers = (await this.checker.blockStatus(
        data.userId, 
        0, 
        FriendshipStatus.BlockedBy, 
        GroupType.CHANNEL
      )) as number[];

      blockedByUsers.forEach((user) => { (connectedChannelUsers.get(user)).leave(channelName) });

      client.to(channelName).emit(CHANNEL.recMessageFromChannel, {
        channelId: data.channelId,
        message
      });

      blockedByUsers.forEach((user) => { (connectedChannelUsers.get(user)).join(channelName) });
    }
  }

  @SubscribeMessage(CHANNEL.getChannelMessages)
  async getMessages(client: Socket, data: ChannelMessagesdto) : Promise<IMessage[]> {
    // const userId = await this.helper.getUserId(client);
    // if (!userId || userId !== data.userId) {
    //   return;
    // }
    // await this.helper.findUser(data.userId, true);

    const blockedUsers = (await this.checker.blockStatus(
      data.userId, 
      0, 
      FriendshipStatus.Blocked, 
      GroupType.CHANNEL
    )) as number[];

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
        OR: [
          {admins: { some: { userId: data.userId } }},
          {members: { some: { userId: data.userId } }},
        ]
      },
      select: {
        messages: {
          where: {
            NOT: { sender_id: { in: blockedUsers } }
          },
          orderBy: { created_at: 'desc' },
          skip: ( data.page - 1 ) * 30,
          take: 30,
        },
      }
    });
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${data.channelId}`)
    }
    return channel.messages || [];
  }


  @SubscribeMessage(CHANNEL.getChannelMembers)
  async getMembers(client: Socket, data: MemberOfChanneldto) : Promise<IMembersWithInfo> {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    await this.helper.findUser(data.userId, true);

    if (await this.checker.isMember(userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`Failed to find channel: you're not a member`);
    }

    return await this.channelService.getMembers(data.channelId);
  }


  async sendUpdatedChannelInfo(channelId: number, updatedInfo: IChannelInfo) {
    const channelName = `channel_` + channelId;
  
    this.server.to(channelName).emit(CHANNEL.recUpdatedChannelInfo, {
      channelId,
      updatedInfo
    });
  }

  async sendUpdatedListOfMembers(channelId: number, updatedList: IMembersWithInfo) {
    const channelName = `channel_` + channelId;

    this.server.to(channelName).emit(CHANNEL.recUpdatedListOfMembers, {
      channelId,
      updatedList
    });

    return updatedList;
  }

}
