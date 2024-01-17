import { RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CheckerService } from './checker.service';
import { IAdmins, IChannel, IMembers } from '@app/common/chat';
import { FriendshipStatus, IUser } from '@app/common';
import { GroupType } from '../interface/group.interface';
import { ChannelGateway } from '../chat.gateway/channel.gateway';
import { hash, verify } from 'argon2';
import { ChannelService } from '../services/channel.service';

// const argon2 = require('argon2');

@Injectable()
export class HelperService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => CheckerService))
    private readonly checker: CheckerService,
    @Inject(forwardRef(() => ChannelService))
    private readonly channelService: ChannelService,
    private readonly channelGateway: ChannelGateway,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async hashPassword(password: string) : Promise<string> {
    try {
      // const salt = await bcrypt.genSalt();
      // const hashedPassword = await bcrypt.hash(password, salt);

      const hashedPassword = await hash(password);

      return hashedPassword;
    }
    catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: `Internal failure0`,
      });
    }
  }
  
  async isPasswordMatched(hashedPassword: string, providedPassword: string ) {
    try {
      // const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
      
      const isMatch = await verify(hashedPassword, providedPassword);
      if (!isMatch) {
        throw 'Invalid password';
      }
      return isMatch;
    }
    catch (error) {
      if (error === 'Invalid password') {
        this.rpcExceptionService.throwUnauthorised('Invalid password');
      }
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: `Internal failure1`,
      });
    }
  }

  async channelNameValidation(channelName: string): Promise<boolean> {
    try {
      const existingChannel = await this.prisma.channel.findFirst({
        where: { name: channelName }
      });
      if (existingChannel) {
        this.rpcExceptionService.throwBadRequest(`Channel name already exist: ${channelName}`);
      }
      return true
    } catch {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: `Internal failure2`,
      });
    }
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

    const blockedUsers = (await this.checker.blockStatus(user_id, 0, FriendshipStatus.Blocked, GroupType.CHANNEL)) as number[];

    const channel = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        messages: {
          where: {
            NOT: { sender_id: { in: blockedUsers } }
          },
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      },
    });
  
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${id}`)
    }
    
    const members = await this.channelService.getMembers(id);
    // return await this.helper.filterChannelMessages(channel, user_id);
    return {
      ...channel,
      admins: members.admins,
      members: members.members
    };
  }
  
  // async filterChannelMessages(channel: IChannel, user_id: number) {
    
  //   let unblockedMemberIds = await Promise.all(
  //     channel.members.map(async (member) => {
  //       const memberId = member.userId;
  //       if (user_id === memberId) {
  //         return null;
  //       }
  //       const blockStatus = await this.checker.blockStatus(user_id, memberId, FriendshipStatus.Blocked, GroupType.ELSE);
  //       return blockStatus ? null : memberId;
  //     })
  //   );
  
  //   unblockedMemberIds = unblockedMemberIds.filter((id) => id !== null);
    
  //   channel.messages = channel.messages.filter(
  //     (message) => unblockedMemberIds.includes(message.sender_id)
  //   );
      
  //   return channel;
  // }
    
    async ownerLeavedChannel(channelId: number) : Promise<void> {
    const admins = await this.findAdminsById(channelId);
    if (!admins?.length) {
      const members = await this.findMembersById(channelId);
      if (!members?.length) {
        await this.prisma.channel.delete({
          where: { id: channelId }
        });
      } else {
        await this.setOwner(channelId, members[0].id, "isMember");
      }
    } else {
      await this.setOwner(channelId, admins[0].id, "isAdmin");
    }
  }
  
  async setOwner(channelId: number, newOwner: number, oldStatus: string) : Promise<void> {
    await this.prisma.channel.update({
      where: { id: channelId },
      data: {
        owner_id: newOwner
      }
    });
    if (oldStatus === "isMember") {
      await this.prisma.admins.create({
        data: {
          userId: newOwner,
          channel: { connect: { id: channelId } },
        }
      });
      await this.prisma.members.deleteMany({
        where: {
          userId: newOwner,
          channelId: channelId,
        },
      });
    }

    // await this.channelGateway.sendUpdatedChannelInfo(channelId, {
    //   owner_id: newOwner,
    // });
  }

  
  /******* Check and Get User Information by ID *******/

  async findUser(user_id: number, throwStatus: boolean) : Promise<IUser> {
    try {
      const user = await this.clientService.sendMessageWithPayload(
          this.client,
          {
              role: 'user',
              cmd: 'findById'
          },
          user_id
      );
      return user;
    }
    catch {
      if (throwStatus) {
        this.rpcExceptionService.throwBadRequest(`Failed to find user: ${user_id}`);
      }
      return null;
    }
  }
  
  /******* Get Members/Admins of Channel by ID *******/
  
  async findMembersById(channelID: number) : Promise<IMembers[]> {
    const channelMembers = await this.prisma.members.findMany({
      where: { channelId: channelID },
      select: { userId: true },
      orderBy: { created_at: "asc" },
    });
    if (!channelMembers) {
      return null;
    }
    return channelMembers.map((member) => ({
      id: member.userId,
    }));
  }

  async findAdminsById(channelID: number) : Promise<IAdmins[]> {
    const channelAdmins = await this.prisma.admins.findMany({
      where: { channelId: channelID },
      select: { userId: true },
      orderBy: { created_at: "asc" },
    });
    if (!channelAdmins) {
      return null;
    }
    return channelAdmins.map((admin) => ({
      id: admin.userId,
    }));
  }
}
