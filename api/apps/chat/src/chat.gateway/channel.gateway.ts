import { ClientAccessAuthorizationGuard } from '../guards/client.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer,
  OnGatewayInit, OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageInChanneldto } from '../dto';
import { CheckerService } from '../utils/checker.service';
import { ChannelService } from '../services/channel.service';
import { HelperService } from '../utils/helper.service';

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
    private readonly checker: CheckerService,
    private readonly helper: HelperService
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
    const userId = await this.helper.getUserId(client);
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
    const userId = await this.helper.getUserId(client);
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
    const userId = await this.helper.getUserId(client);
    if (!userId || userId !== data.userId) {
      return;
    }
    
    const existingChannel = await this.channelService.checkForChannel(data.channelId);
    if (!existingChannel || !this.checker.isMember(userId, data.channelId)) {
      return;
    }
    
    if (this.checker.isMuted(data.userId, data.channelId)) {
      return;
    }

    const message = this.channelService.addMessage(data);
    if (message) {
      const channel = await this.channelService.findById(data.channelId, userId);
      client.to(channel.id.toString()).emit('recMessageFromChannel', message);
    }
  }  
}



// - Create Event to find CHANNEL MEMBERS by group IDs

// - Create Event to get MESSAGES by user, group IDs -- PAGINATION -- 

// - Emit Events to update stats of Owner, Admins, Members and Channel Information
