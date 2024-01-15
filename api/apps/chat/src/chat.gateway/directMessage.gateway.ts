import { ClientAccessAuthorizationGuard } from '../guards/client.guard';
import { Logger, UseGuards } from '@nestjs/common';
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

@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_URL}`,
    credentials: true
  },
  namespace: 'chat-directMessages',
})
export class DirectMessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor( 
    private readonly directMessageService: DirectMessageService,
    private readonly prisma: PrismaService,
    private readonly checker: CheckerService,
    private readonly helper: HelperService
  ) {}
  @WebSocketServer() server: Server;

  private connectedUsers: Map<number, any> = new Map();
  private logger: Logger = new Logger('DirectMessageGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  @UseGuards(ClientAccessAuthorizationGuard)
  async handleConnection(client: Socket, ...args: any[]) {
    const user = args[0]?.req?.user; // TEST IT IF IT WORKS ?????
    const userId = await this.helper.getUserId(client);

    if (user || userId) {
      this.logger.log(`User connected: ${client.id}`);
      this.connectedUsers.set(((user)? user.id : userId), client.id);
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
      this.connectedUsers.delete(userId);
    }
  }

  @SubscribeMessage('sendMessageToUser')
  async sendMessageToUser(client: Socket, data: AddMessageInDMdto) {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    
    const existedRecipient = await this.checker.checkForUser(data.recipientId);
    if (!existedRecipient) {
      console.log(`Recipient doesn't exist!`);
      return;
    }

    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.Blocked, GroupType.DM);
    await this.checker.blockStatus(data.userId, data.recipientId, FriendshipStatus.BlockedBy, GroupType.DM);

    const socket = this.connectedUsers.get(data.recipientId);
    if (socket) {
      const message = this.directMessageService.addMessage(data);
      if (message) {
        socket.emit('recMessageFromUser', message);
      }
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

  @SubscribeMessage('getDMMessages')
  async getMessages(client: Socket, data: DMMessagesdto) {
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    await this.helper.findUser(data.userId, true);

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
          skip: ( data.page - 1 ) * 30,
          take: 30,
        },
      }
    });
  }
}
