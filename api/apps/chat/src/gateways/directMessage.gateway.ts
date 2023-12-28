import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInDMdto } from '../dto';
import { DirectMessageService } from '../services/directMessage.service';
import { CheckersService } from '../services/checkers.service';
import { PrismaService } from 'apps/auth/prisma/prisma.service';

@WebSocketGateway({
  cors: true,
  namespace: 'chat-directMessages',
})
export class DirectMessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor( 
    private readonly prisma: PrismaService,
    private readonly directMessageService: DirectMessageService,
    private readonly checkers: CheckersService,
  ) {}
  @WebSocketServer() server: Server;

  private connectedUsers: Map<number, Socket> = new Map();
  private logger: Logger = new Logger('DirectMessageGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`User connected: ${client.id}`);
    this.connectedUsers.set(parseInt(client.id), client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User disconnected: ${client.id}`);
    this.connectedUsers.delete(parseInt(client.id));
  }

  @SubscribeMessage('sendMessageToUser')
  sendMessageToUser(data: AddMessageInDMdto) {
    if (this.checkers.isBlocked(data.userId, data.recipientId)) {
      return;
    }
    const message = this.directMessageService.addMessage(data);
    if (message) {
      const socket = this.connectedUsers.get(data.recipientId);
      if (socket) {
        socket.emit('message', message);
      }
      else {
        this.prisma.notifications.create({
          data: {
            user_id: data.recipientId,
            sender_id: data.userId,
            text: data.text ?? null,
            media_id: data.mediaId ?? 0,
          }
        });
      }
    }
  }
}