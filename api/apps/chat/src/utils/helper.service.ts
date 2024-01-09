import { RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CheckerService } from './checker.service';
import { IAdmins, IChannel, IMembers, IVisibility } from '@app/common/chat';
import { ChannelService } from '../services/channel.service';
import { IUser } from '@app/common';

@Injectable()
export class HelperService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
    private readonly checker: CheckerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async hashPassword(password: string) : Promise<string> {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const argon2 = require('argon2');
    const hashedPassword = await argon2.hash(password);
    if (!hashedPassword) {
      this.rpcExceptionService.throwInternalError('Internal error: Enter password again');
    }
    return hashedPassword;
  }
  
  async isPasswordMatched(hashedPassword: string, providedPassword: string ) {
    // const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    const argon2 = require('argon2');
    const isMatch = await argon2.verify(hashedPassword, providedPassword);
    if (!isMatch) {
      this.rpcExceptionService.throwUnauthorised('Invalid password');
    }
    return isMatch;
  }

  async channelNameValidation(channelName: string): Promise<boolean> {
    const existingChannel = await this.prisma.channel.findFirst({
      where: { name: channelName }
    });
    if (existingChannel) {
      this.rpcExceptionService.throwUnauthorised(`Channel name already exist: ${channelName}`);
    }
    return true
  }

  async getUserId(client: Socket) : Promise<number | null> {
    try {
      const session = client.handshake.headers.cookie;
      const token = session?.split('=')[1];
      if (token) {
        const user = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        return user.sub;
      }
    } catch (error) {
      if (error.expiredAt) {
        this.rpcExceptionService.throwUnauthorised(
          'Token has expired, please sign in',
        );
      }
      return null;
    }
  }
  
  async getChannelById(id: number, user_id: number) : Promise<IChannel> {
    const channel = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        admins: true,
        members: true,
        messages: {
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      },
    });
  
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${id}`)
    }
    
    return await this.filterChannelMessages(channel, user_id);
  }
  
  async filterChannelMessages(channel: IChannel, user_id: number) {
    
    let unblockedMemberIds = await Promise.all(
      channel.members.map(async (member) => {
        const memberId = member.userId;
        if (user_id === memberId) {
          return null;
        }
        const isBlocked = await this.checker.isBlocked(user_id, memberId);
        return isBlocked ? null : memberId;
      })
    );
  
    unblockedMemberIds = unblockedMemberIds.filter((id) => id !== null);
    
    channel.messages = channel.messages.filter(
      (message) => unblockedMemberIds.includes(message.sender_id)
      );
      
      return channel;
    }
    
    async ownerLeavedChannel(channelId: number) : Promise<void> {
      const admins = await this.findAdminsById(channelId);
      if (!admins) {
        const members = await this.findMembersById(channelId);
        if (!members) {
          await this.prisma.channel.delete({
            where: { id: channelId }
          });
        } else {
          await this.setOwner(members);
        }
    } else {
      await this.setOwner(admins);
    }
  }
  
  async setOwner(arrayIds: IMembers[] | IAdmins[]) : Promise<void> {
    // IMPLEMENT THIS ?????????????????????????????????????????
  }
  
  
  /******* Check and Get User Information by ID *******/

  async findUser(user_id: number) : Promise<IUser> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'findUserById'
        },
        { id: user_id, user_id }
    );
  }
  
  /******* Get Members/Admins of Channel by ID *******/
  
  async findMembersById(channelID: number) : Promise<IMembers[]> {
    const channelMembers = await this.prisma.members.findMany({
      where: { id: channelID },
      select: { userId: true }
    });
    if (!channelMembers) {
      return null;
    }
    return channelMembers;
  }
  
  async findAdminsById(channelID: number) : Promise<IAdmins[]> {
    const channelAdmins = await this.prisma.admins.findMany({
      where: { id: channelID },
      select: { userId: true }
    });
    if (!channelAdmins) {
      return null;
    }
    return channelAdmins;
  }
}
