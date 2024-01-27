import { FriendshipStatus, IUser } from '@app/common';
import { IAdmins, IChannel, IMembers } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { hash, verify } from 'argon2';
import * as cookie from 'cookie';
import { Socket } from 'socket.io';
import { ChannelGateway } from '../chat.gateway/channel.gateway';
import { GroupType } from '../interface/group.interface';
import { ChannelService } from '../services/channel.service';
import { CheckerService } from './checker.service';

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
      this.rpcExceptionService.throwInternalError(`Internal failure`);
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
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `Invalid password`,
        });
      }
      this.rpcExceptionService.throwInternalError(`Internal failure`);
    }
  }

  async channelNameValidation(channelName: string): Promise<boolean> {
    const existingChannel = await this.prisma.channel.findFirst({
      where: { name: channelName }
    });
    if (existingChannel) {
      this.rpcExceptionService.throwCatchedException({
        code: 200,
        message: `Channel name already exist`,
      });
    }
    return true
  }

  async getUserId(client: Socket) : Promise<number | null> {
    try {
      const session = client.handshake.headers.cookie;
      
      const cookies = cookie.parse(client.handshake.headers.cookie || '');
      const accessToken = cookies['Access_token'];

      if (accessToken) {
        const user = await this.jwtService.verifyAsync(accessToken, {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        return user.sub;
      }
    } catch (error) {
      if (error.expiredAt) {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `Token has expired, please sign in`,
        });
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
      this.rpcExceptionService.throwCatchedException({
        code: 200,
        message: `Failed to find channel`,
      });
    }
    
    const members = await this.channelService.getMembers(id);
    return {
      ...channel,
      admins: members.admins,
      members: members.members
    };
  }

  async getChannelInfo(channelId: number) : Promise<IChannel> {
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId },
      select: {
        id: true,
        owner_id: true,
        name: true,
        visibility: true,
        latestMessage_at: true,
      }
    });

    return channel;
  }

  async ownerLeavedChannel(channelId: number) : Promise<void> {
    const admins = await this.findAdminsById(channelId);
    if (admins.length === 0) {
      const members = await this.findMembersById(channelId);
      if (members.length === 0) {
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
    const updatedInfo = await this.prisma.channel.update({
      where: { id: channelId },
      data: {
        owner_id: newOwner
      },
      select: {
        name: true,
        owner_id: true,
        description: true,
        visibility: true,
        latestMessage_at: true,
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

    await this.channelGateway.sendUpdatedChannelInfo(channelId, updatedInfo);
  }

  
  /******* Check and Get User Information by ID *******/

  async findUser(user_id: number, throwExc: boolean = true) : Promise<IUser> {
    try {
      const user: IUser = await this.clientService.sendMessageWithPayload(
          this.client,
          {
              role: 'user',
              cmd: 'getUsersInfo'
          },
          [user_id]
      );
      return user![0] || null;
    }
    catch {
      if (throwExc) {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `Failed to find user`,
        });
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

  handleError(errorMsg: string) {
    return {
      error: { message: errorMsg }
    }
  }
}