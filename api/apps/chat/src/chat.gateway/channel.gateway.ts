import { FriendshipStatus } from '@app/common';
import { IChannel, IChannelInfo, IMembersWithInfo, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Inject, Logger, forwardRef } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { AddMessageInChanneldto, ChannelMessagesdto, MemberOfChanneldto } from '../dto';
import { CHANNEL } from '../interface';
import { GroupType } from '../interface/group.interface';
import { ChannelService } from '../services/channel.service';
import { CheckerService } from '../utils/checker.service';
import { HelperService } from '../utils/helper.service';

let connectedChannelUsers: Map<number, any> = new Map();

@WebSocketGateway({
  cors: {
    origin: true,
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

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = await this.helper.getUserId(client);
    if (userId) {
      this.logger.log(`User connected: ${userId} [${client.id}`);
      connectedChannelUsers.set(userId, client);

      const userChannels = await this.channelService.getUserChannels(userId);
      userChannels.forEach((channel) => {
        client.join('channel_' + channel.id);
      })
    }
    else {
      this.logger.log(`User authentication failed: ${userId} [${client.id}`);
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
    const socket = connectedChannelUsers.get(data.userId);
    const userId = await this.helper.getUserId(client);

    if (!userId || userId !== data.userId) {
      this.logger.error({ error : {   message: `Failed to find the user id ${userId}` }});
      return { error : {
          message: `Failed to find the user id ${userId}`
        }};
    }
    if (await this.checker.checkForUser(data.userId) === false
     || await this.checker.checkForChannel(data.channelId, userId) === false) {
      return { error : {
        message: `Invalid user/channel id`
      }};
    }
    const channelName = `channel_` + data.channelId;
    client.join(channelName);
  }

  async leavchannel(userId: number, channelId: number) {
    const channelName = 'channel_' + channelId;
    const client = connectedChannelUsers.get(userId);
    
    client.leave(channelName);
  }

  @SubscribeMessage(CHANNEL.sendMessageInchannel)
  async sendMessageInChannel(client: Socket, data: AddMessageInChanneldto) {
    const userId = await this.helper.getUserId(client);
    if (!data.text || !userId || userId !== data.userId) {
      return;
    }
  
    if (await this.checker.checkForChannel(data.channelId, userId) === false) {
      return;
    }
    
    const muteExpired = await this.checker.isMuted(userId, data.channelId);
    if (!!muteExpired) {
      return { error : {
        message: `Failed: you're muted! go back at ${muteExpired}`
      }};
    }
    
    const message = await this.channelService.addMessage(data);
    if (message) {
      const channelName = `channel_` + data.channelId;
      
      const blockedByUsers = (await this.checker.blockStatus(
        data.userId, 
        0, 
        FriendshipStatus.BlockedBy, 
        GroupType.CHANNEL
      )) as number[];

      blockedByUsers.forEach((user) => { (connectedChannelUsers.get(user)).leave(channelName) });

      this.server.to(channelName).emit(CHANNEL.recMessageFromChannel, message);

      blockedByUsers.forEach((user) => { (connectedChannelUsers.get(user)).join(channelName) });
    
      const updatedList = await this.channelService.getUserChannels(userId);
      console.log(updatedList)
      this.server.to(channelName).emit(CHANNEL.recUpdatedChannelsList, updatedList);
    }
  }

  @SubscribeMessage(CHANNEL.getChannelMessages)
  async getMessages(client: Socket, data: ChannelMessagesdto) : Promise<IMessage[] | any> {
    const userId = await this.helper.getUserId(client);
    if (!userId || !data.channelId || userId !== data.userId) {
      return;
    }
    await this.helper.findUser(data.userId);

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
          ...(data.page !== 0) ? {
            skip: ( data.page - 1 ) * 30,
            take: 30,
          } : {},
        },
      }
    });
    if (!channel) {
      return { error : {
        message: `Failed to find channel: ${data.channelId}`
      }};
      this.rpcExceptionService.throwNotFound()
    }
    return channel.messages || [];
  }


  @SubscribeMessage(CHANNEL.getChannelMembers)
  async getMembers(client: Socket, data: MemberOfChanneldto) : Promise<IMembersWithInfo | any> {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    await this.helper.findUser(data.userId);

    if (await this.checker.isMember(userId, data.channelId) === false) {
      return { error : {
        message: `Failed to find channel: you're not a member`
      }};
    }

    return await this.channelService.getMembers(data.channelId);
  }


  async sendUpdatedChannelInfo(channelId: number, updatedInfo: IChannelInfo) {
    const channelName = `channel_` + channelId;
  
console.log(`>>>>> updatedInfo sent !!!!\n`, updatedInfo);
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
  }

  async sendUpdatedListOfChannels(userId: number, updatedList: IChannel[]) {
    const client = connectedChannelUsers.get(userId);
    if (client) {
      console.log(`(${userId}) updated list:`, updatedList, "\nclient:");
      client.emit(CHANNEL.recUpdatedChannelsList, updatedList);
    }
  }
}
