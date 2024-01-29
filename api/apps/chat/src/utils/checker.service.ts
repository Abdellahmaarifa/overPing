import { FriendshipStatus } from '@app/common';
import { IVisibility } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable, UseFilters, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { UpdateChanneldto } from '../dto';
import { GroupType } from '../interface/group.interface';
import { HelperService } from './helper.service';
import { ChatExceptionFilter } from '../chat-global-filter/chat-global-filter';

@UseFilters(ChatExceptionFilter)
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
    if (isTargetChannelOwner && isTargetChannelOwner.owner_id !== userId) {
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
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `Failed: The user has blocked you!`,
        });
      } else if (status === FriendshipStatus.Blocked) {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `Failed: you blocked the user!`,
        });
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

  async isMuted(user_id: number, channelId: number) : Promise<string | null> {
    const mutedMember = await this.prisma.mutedMembers.findFirst({
      where: {
        channelId,
        user_id,
      },
    });
    if (!mutedMember) {
      return null;
    }
    else if (mutedMember && mutedMember.expiry < new Date()) {
      await this.prisma.mutedMembers.deleteMany({
        where: {
          channelId,
          user_id,
        }
      });
      return;
    }
    return mutedMember.expiry.toISOString();
  }

  async isBanned(userId: number, channelId: number, throwEx: boolean = true) : Promise<boolean> {
    const bannedMember = await this.prisma.bannedMembers.findFirst({
      where: {
        channelId,
        userId,
      },
    });
    if (bannedMember) {
      if (throwEx) {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `failed: You are BANNED!`,
        });
      }
      return true;
    }
    return false;
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
    return !!existedUser;
  }

  async checkForChannel(id: number, userId: number) : Promise<Boolean> {
    const existedChannel = await this.prisma.channel.findUnique({
      where: {
        id, 
        OR: [
          { admins: { some: { userId } } },
          { members: { some: { userId } } },
        ]
      }
    });
    return !!existedChannel;
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
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `The update authorization requires a PASSWORD!`,
        });
      }
    }
    else if (channel.visibility === IVisibility.PROTECTED
      && (data.visibility === IVisibility.PUBLIC || data.visibility === IVisibility.PRIVATE))
    {
      // PASSWORD REQUIRED TO AUTHORIZED THE UPDATE
      if (data.newPassword && await this.helper.isPasswordMatched(channel.password, data.newPassword) === true) {
        return null;
      } else {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `The update authorization requires a PASSWORD!`,
        });
      }
    }
    else if (channel.visibility === IVisibility.PROTECTED && data.visibility === IVisibility.PROTECTED && data.newPassword)
    {
      // TO UPDATE PASSWORD ( NEW/OLD PASSWORDS ARE REQUIRED )
      if (data.oldPassword && await this.helper.isPasswordMatched(channel.password, data.oldPassword) === true) {
        return await this.helper.hashPassword(data.newPassword);
      } else {
        this.rpcExceptionService.throwCatchedException({
          code: 200,
          message: `The update authorization requires the OLD PASSWORD!`,
        });
      }
    }

    // KEEP THE CURRENT STATE
    return channel.password;
  }
}