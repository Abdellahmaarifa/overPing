import { Inject, Logger, UseGuards, forwardRef } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer,
  OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInDMdto, DMMessagesdto } from '../dto';
import { DirectMessageService } from '../services/directMessage.service';
import { CheckerService } from '../utils/checker.service';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { HelperService } from '../utils/helper.service';
import { FriendshipStatus } from '@app/common';
import { GroupType } from '../interface/group.interface';
import { DIRECTMESSAGE } from '../interface';
import { IDirectMessage } from '@app/common/chat';

let connectedUsers: Map<number, any> = new Map();

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
    private readonly helper: HelperService
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('DirectMessageGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = await this.helper.getUserId(client);
    if (userId) {
      this.logger.log(`User connected: ${userId} [${client.id}`);
      connectedUsers.set(userId, client.id);
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
      connectedUsers.delete(userId);
    }
  }

  @SubscribeMessage(DIRECTMESSAGE.sendMessageToUser)
  async sendMessageToUser(client: Socket, data: AddMessageInDMdto) {
    // this.logger.log(`User connected: ${userId} [${client.id}]`);
    console.log(`******* data *******\n`, data);
    const userId = await this.helper.getUserId(client);
    if (!data.text || !userId || userId !== data.userId) {
      return;
    }
    const existedRecipient = await this.checker.checkForUser(data.recipientId);
    if (!existedRecipient) {
      console.log(`Recipient doesn't exist!`);
      return;
    }

    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.Blocked, GroupType.DM);
    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.BlockedBy, GroupType.DM);

    const message = await this.directMessageService.addMessage(data);
    const recSocketId =  connectedUsers.get(data.recipientId);
    if (recSocketId && message) {
      this.server.sockets.sockets[recSocketId].emit(DIRECTMESSAGE.recMessageFromUser , message);
      client.emit(DIRECTMESSAGE.recMessageFromUser , message);
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
    try {
      const userId = await this.helper.getUserId(client);
      if (!userId || userId !== data.userId) {
        return;
      }
      await this.helper.findUser(data.userId);
  
      return await this.prisma.directMessage.findUnique({
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
    }
    catch (error) {
      console.log(error);
    }
  }

  async sendUpdatedListOfDMs(user1: number, user2: number, updatedList1: IDirectMessage[], updatedList2: IDirectMessage[]) {
    const client1 = this.server.sockets.sockets[connectedUsers.get(user1)];
    const client2 = this.server.sockets.sockets[connectedUsers.get(user2)];
    if (client1) {
      client1.emit(DIRECTMESSAGE.recUpdatedDMsList, updatedList1);
    }
    if (client2) {
      client2.emit(DIRECTMESSAGE.recUpdatedDMsList, updatedList2);
    }
  }
}