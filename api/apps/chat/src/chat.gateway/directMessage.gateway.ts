import { FriendshipStatus } from '@app/common';
import { IDirectMessage } from '@app/common/chat';
import { Inject, Logger, UseFilters, UseInterceptors, UsePipes, ValidationPipe, forwardRef } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { AddMessageInDMdto, DMMessagesdto } from '../dto';
import { DIRECTMESSAGE } from '../interface';
import { GroupType } from '../interface/group.interface';
import { DirectMessageService } from '../services/directMessage.service';
import { CheckerService } from '../utils/checker.service';
import { HelperService } from '../utils/helper.service';
import { ChatExceptionFilter } from '../chat-global-filter/chat-global-filter';
import { RpcExceptionService } from '@app/common/exception-handling';

let connectedUsers: Map<number, any> = new Map();

@UseFilters(ChatExceptionFilter)
@WebSocketGateway({
  cors: {
    origin: `${process.env.CHAT_FRONT_URL}`,
    credentials: true
  },
  namespace: DIRECTMESSAGE.namespace,
})
export class DirectMessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor( 
    @Inject(forwardRef(() => DirectMessageService))
    private readonly directMessageService: DirectMessageService,
    private readonly prisma: PrismaService,
    private readonly checker: CheckerService,
    private readonly helper: HelperService,
    private readonly rpcExceptionService: RpcExceptionService
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('DirectMessageGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = await this.helper.getUserId(client);
    const id = userId ? await this.helper.findUser(userId) : 0;
    if (userId && id) {
      connectedUsers.set(userId, client);
      this.logger.log(`User connected: ${userId} [${client.id}`);
    }
    else {
      this.logger.warn(`User authentication failed: ${userId} [${client.id}`);
      client.disconnect();
    }
  }
 
  async handleDisconnect(client: Socket) {
    const userId = await this.helper.getUserId(client);
    if (userId) {
      this.logger.warn(`User disconnected: ${client.id}`);
      connectedUsers.delete(userId);
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(DIRECTMESSAGE.sendMessageToUser)
  async sendMessageToUser(client: Socket, data: AddMessageInDMdto) {
    const userId = await this.helper.getUserId(client);
    if (!data.text || !userId || userId !== data.userId)
    {
      this.logger.error({ error : { message: `Permission denied for user [${userId}]` }});
      return this.helper.handleError(`permission denied`);
    }
    const existedRecipient = await this.checker.checkForUser(data.recipientId);
    if (!existedRecipient)
    {
      this.logger.error({ error : { message: `Failed to find user [${userId}]` }});
      return this.helper.handleError(`Failed to find user`);
    }

    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.Blocked, GroupType.DM);
    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.BlockedBy, GroupType.DM);

    const message = await this.directMessageService.addMessage(data);
    const recSocket =  connectedUsers.get(data.recipientId);
    if (recSocket && message) {
      recSocket.emit(DIRECTMESSAGE.recMessageFromUser , message);
      client.emit(DIRECTMESSAGE.recMessageFromUser , message);

      this.sendUpdatedListOfDMs(
        data.userId,
        data.recipientId,
        await this.directMessageService.getUserDirectMessages(data.userId),
        await this.directMessageService.getUserDirectMessages(data.recipientId)
      );
    }
    // else {
    //   // const truncText = data.text?.length > 30 ? data.text?.substring(0, 30) + '...' : data.text;
    //   this.prisma.notifications.create({
    //     data: {
    //       user_id: data.recipientId,
    //       sender_id: data.userId,
    //       group_id: data.groupChatId,
    //       text: data.text ?? null,
    //     }
    //   });
    // }

  }

  @SubscribeMessage(DIRECTMESSAGE.getDMMessages)
  async getMessages(client: Socket, data: DMMessagesdto) {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId ) {
      return;
    }

    await this.helper.findUser(data.userId);

    const messages = await this.prisma.directMessage.findUnique({
      where: {
        id: data.groupChatId,
        OR: [
          { user1_id: data.userId },
          { user2_id: data.userId }
        ]
      },
      select: {
        messages: {
          orderBy: { created_at: 'desc' },
          ...(data.page !== 0) ? {
            skip: ( data.page - 1 ) * 30,
            take: 30,
          } : {},
        },
      }
    });
  
    return messages;
  }

  async sendUpdatedListOfDMs(user1: number, user2: number, updatedList1: IDirectMessage[] | {}, updatedList2: IDirectMessage[] | {}) {
    const client1 = connectedUsers.get(user1);
    const client2 = connectedUsers.get(user2);

    if (client1) {
      client1.emit(DIRECTMESSAGE.recUpdatedDMsList, updatedList1);
    }
    if (client2) {
      client2.emit(DIRECTMESSAGE.recUpdatedDMsList, updatedList2);
    }
  }
}