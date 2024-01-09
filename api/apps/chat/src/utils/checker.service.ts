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

@Injectable()
export class CheckerService {
  constructor(
    // @Inject(IRmqSeverName.FRIEND)
    // private readonly client: ClientProxy,
    // private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
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
        channelId: channelId,
        userId: userId,
      },
    });
    return !!admin;
  }

  async isMember(userId: number, channelId: number): Promise<boolean> {
    const member = await this.prisma.members.findFirst({
      where: {
        channelId: channelId,
        userId: userId,
      },
    });
    if (!member) {
      return false;
    }
    return await this.isAdmin(userId, channelId);
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

  async isBlocked(userId: number, targetId: number): Promise<boolean> {
    // const blockedMember = await this.prisma.blockedUsers.findFirst({
    //   where: {
    //     OR: [ 
    //       { user_id: userId, blockedUser_id: targetId, },
    //       { user_id: targetId, blockedUser_id: userId, },
    //     ]
    //   },
    // });
    // return !!blockedMember;

    // const friendShip = await this.clientService.sendMessageWithPayload(
    //   this.client,
    //   {
    //       role: 'friend',
    //       cmd: 'getFriendship'
    //   },
    //   {
    //     userId,
    //     friendId: targetId,
    //   }
    // )
    // if (!friendShip || friendShip.status === "BLOCKED") {
    //   return true;
    // }
    return false;
  }

  async isMuted(userId: number, channelId: number): Promise<boolean> {
    const mutedMember = await this.prisma.mutedMembers.findFirst({
      where: {
        channelId: channelId,
        user_id: userId,
      },
    });
    if (mutedMember && mutedMember.expiry <= new Date()) {
      await this.prisma.mutedMembers.deleteMany({
        where: {
          channelId: channelId,
          user_id: userId,
        }
      });
      return false;
    }
    return !!mutedMember;
  }

  async isBanned(userID: number, channelID: number): Promise<boolean> {
    const bannedMember = await this.prisma.bannedMembers.findFirst({
      where: {
        channelId: channelID,
        userId: userID,
      },
    });
    return !!bannedMember;
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
}
