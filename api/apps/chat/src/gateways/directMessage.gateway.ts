import { ClientAccessAuthorizationGuard } from '../guards/client.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer,
  OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInDMdto } from '../dto';
import { DirectMessageService } from '../services/directMessage.service';
import { CheckersService } from '../services/checkers.service';
import { PrismaService } from 'apps/chat/prisma/prisma.service';

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
    private readonly checkers: CheckersService,
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
    const userId = await this.checkers.getUserId(client);
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
    const userId = await this.checkers.getUserId(client);
    if (userId) {
      this.logger.log(`User disconnected: ${client.id}`);
      this.connectedUsers.delete(userId);
    }
  }

  @UseGuards(ClientAccessAuthorizationGuard)
  @SubscribeMessage('sendMessageToUser')
  async sendMessageToUser(client: Socket, data: AddMessageInDMdto) {  
    const userId = await this.checkers.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    
    const existedRecipient = await this.directMessageService.checkForUser(data.recipientId);
    if (!existedRecipient) {
      return;
    }
    
    const isBlocked = await this.checkers.isBlocked(data.userId, data.recipientId);
    if (isBlocked) {
      return
    }

    const message = this.directMessageService.addMessage(data);
    if (message) {
      const socket = this.connectedUsers.get(data.recipientId);
      if (socket) {
        socket.emit('recMessageFromUser', message);
      }
      else {
        const truncText = data.text?.length > 30 ? data.text?.substring(0, 30) + '...' : data.text;
        this.prisma.notifications.create({
          data: {
            user_id: data.recipientId,
            sender_id: data.userId,
            text: truncText ?? null,
          }
        });
      }
    }
  }
}