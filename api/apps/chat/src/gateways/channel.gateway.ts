import { ClientAccessAuthorizationGuard } from '../guards/client.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer,
  OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInChanneldto } from '../dto';
import { CheckersService } from '../services/checkers.service';
import { ChannelService } from '../services/channel.service';

@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_URL}`,
    credentials: true
  },
  namespace: 'chat-channels',
})
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly channelService: ChannelService,
    private readonly checkers: CheckersService,
  ) {}
  @WebSocketServer() server: Server;

  private connectedUsers: Map<number, any> = new Map();
  private logger: Logger = new Logger('ChannelGateway');

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
      
      const userChannels = await this.channelService.getUserChannels(userId);
      userChannels.forEach((channelId) => {
        client.join(channelId.toString())
      });
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

      const userChannels = await this.channelService.getUserChannels(userId);
      userChannels.forEach((channelId) => {
        client.leave(channelId.toString())
      });
    }
  }

  @UseGuards(ClientAccessAuthorizationGuard)
  @SubscribeMessage('sendMessageToUser')
  async sendMessageToUser(client: Socket, data: AddMessageInChanneldto) {
    const userId = await this.checkers.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    
    const existingChannel = await this.channelService.checkForChannel(data.channelId);
    if (!existingChannel || !this.checkers.isMember(userId, data.channelId)) {
      return;
    }
    
    if (this.checkers.isMuted(data.userId, data.channelId)) {
      return;
    }

    const message = this.channelService.addMessage(data);
    if (message) {
      const channel = await this.channelService.findById(data.channelId);
      client.to(channel.id.toString()).emit('recMessageFromChannel', message);
    }
  }
}
