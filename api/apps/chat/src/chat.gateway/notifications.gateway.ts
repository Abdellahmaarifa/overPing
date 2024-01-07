import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'apps/chat/prisma/prisma.service';

@WebSocketGateway({
  cors: true,
  namespace: 'notifications',
})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor( 
    private readonly prisma: PrismaService,
  ) {}
  @WebSocketServer() server: Server;

  private connectedUsers: Map<number, Socket> = new Map();
  private logger: Logger = new Logger('NotificationsGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`User connected: ${client.id}`);
    this.connectedUsers.set(parseInt(client.id), client);
    this.sendPendingMessages(parseInt(client.id));
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User disconnected: ${client.id}`);
    this.connectedUsers.delete(parseInt(client.id));
  }

  async sendPendingMessages(userId: number) {
    const pendingMessages = await this.prisma.notifications.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    const socket = this.connectedUsers.get(userId);
    for (const pendingMessage of pendingMessages) {
      if (socket) {
        const message = {
          sender_id: pendingMessage.sender_id,
          recipient_id: pendingMessage.user_id,
          text: pendingMessage.text,
          created_at: pendingMessage.created_at
        }
        socket.emit('message', message);
      }
    }

    await this.prisma.notifications.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }
}