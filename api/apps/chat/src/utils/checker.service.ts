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
import { FriendshipStatus } from '@app/common';
import { GroupType } from '../interface/group.interface';
import { IChannel, IVisibility } from '@app/common/chat';
import { UpdateChanneldto } from '../dto';
import { HelperService } from './helper.service';

@Injectable()
export class CheckerService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => HelperService))
    private readonly helper: HelperService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async isOwner(userId: number, channelId: number): Promise<boolean> {
    const owner = await this.prisma.channel.findFirst({
      where: {
        id: channelId,
        owner_id: userId,
      },
    });
    return !!owner;
  }

  async isAdmin(userId: number, channelId: number): Promise<boolean> {
    const admin = await this.prisma.admins.findFirst({
      where: {
        channelId,
        userId,
      },
    });
    return !!admin;
  }

  async isMember(userId: number, channelId: number): Promise<boolean> {
    const member = await this.prisma.members.findFirst({
      where: {
        channelId,
        userId,
      },
    });
    if (!member) {
      return await this.isAdmin(userId, channelId);
    }
    return true;
  }

  async authorized(userId: number, targetId: number, channelId: number): Promise<boolean> {
    const isTargetChannelOwner = await this.prisma.channel.findFirst({
      where: {
        id: channelId,
        owner_id: targetId,
      },
    });
    if (isTargetChannelOwner) {
      return false;
    }
    return await this.isAdmin(userId, channelId);
  }

  async blockStatus(userId: number, targetId: number, status: FriendshipStatus, group: GroupType): Promise<number[] | boolean | null> {
    const users = await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'user',
          cmd: 'getUserBlocksList'
        },
        {
          userId,
          status,
        }
        )
    if (group === GroupType.DM && users?.includes(targetId)) {
      if (status === FriendshipStatus.BlockedBy) {
        this.rpcExceptionService.throwBadRequest(`Failed: The user has blocked you!`);
      } else if (status === FriendshipStatus.Blocked) {
        this.rpcExceptionService.throwBadRequest(`Failed: you blocked the user!`);
      }
    }
    else if (group === GroupType.CHANNEL && users) {
      return users
    }
    else {
      return !!users.includes(targetId);
    }
    return null;
  }

  async isMuted(user_id: number, channelId: number) {
    const mutedMember = await this.prisma.mutedMembers.findFirst({
      where: {
        channelId,
        user_id,
      },
    });
    if (mutedMember && mutedMember.expiry <= new Date()) {
      await this.prisma.mutedMembers.deleteMany({
        where: {
          channelId,
          user_id,
        }
      });
      return;
    }
    else if (mutedMember) {
      this.rpcExceptionService.throwBadRequest(`failed: you are MUTED!`);
    }
  }

  async isBanned(userId: number, channelId: number) {
    const bannedMember = await this.prisma.bannedMembers.findFirst({
      where: {
        channelId,
        userId,
      },
    });
    if (bannedMember) {
    this.rpcExceptionService.throwBadRequest(`failed: You are BANNED!`);
    }
  }

  async checkForUser(id: number) : Promise<Boolean> {
    const existedUser = await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'user',
          cmd: 'findById'
      },
      id
    )
    return !!!existedUser;
  }

  async checkForChannel(id: number) : Promise<Boolean> {
    const existedChannel = await this.prisma.channel.findUnique({
      where: { id }
    });
    return !!!existedChannel;
  }

  async channelVisibility(channelID: number) : Promise<string> {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelID,
      },
      select: { visibility: true },
    });

    return channel?.visibility || null;
  }

  async isEmpty(str: string): Promise<Boolean> {
    return str === '' || str === null || str === undefined;
  }

  async checkPasswordAndChannelVisibility(channel: any, data: UpdateChanneldto) : Promise<string | null> {

    if ((channel.visibility === IVisibility.PUBLIC || channel.visibility === IVisibility.PRIVATE)
      && data.visibility === IVisibility.PROTECTED)
    {
      // PASSWORD REQUIRED TO SET IT IN CHANNEL
      if (data.newPassword) {
        return await this.helper.hashPassword(data.newPassword);
      } else {
        this.rpcExceptionService.throwBadRequest(`The update authorization requires a PASSWORD!`);
      }
    }
    else if (channel.visibility === IVisibility.PROTECTED
      && (data.visibility === IVisibility.PUBLIC || data.visibility === IVisibility.PRIVATE))
    {
      // PASSWORD REQUIRED TO AUTHORIZED THE UPDATE
      if (data.password && await this.helper.isPasswordMatched(channel.password, data.password) === true) {
        return null;
      } else {
        this.rpcExceptionService.throwBadRequest(`The update authorization requires a PASSWORD!`);
      }
    }
    else if (channel.visibility === IVisibility.PROTECTED && data.visibility === IVisibility.PROTECTED && data.newPassword)
    {
      // TO UPDATE PASSWORD ( NEW/OLD PASSWORDS ARE REQUIRED )
      if (data.oldPassword && await this.helper.isPasswordMatched(channel.password, data.oldPassword) === true) {
        return await this.helper.hashPassword(data.newPassword);
      } else {
        this.rpcExceptionService.throwBadRequest(`The update authorization requires the OLD PASSWORD!`);
      }
    }

    // KEEP THE CURRENT STATE
    return channel.password;
  }
}
