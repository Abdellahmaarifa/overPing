import { RpcExceptionService } from '@app/common/exception-handling';
import { FriendshipDTO } from '@app/common/friend/dto/friendshipDto';
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
export class CheckersService {
  constructor(
    @Inject(IRmqSeverName.FRIEND)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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
    return !!member;
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

    const friendShip: FriendshipDTO = await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'friend',
          cmd: 'getFriendship'
      },
      {
        userId,
        friendId: targetId,
      }
    )
    if (!friendShip || friendShip.status === "BLOCKED") {
      return true;
    }
    return false;
  }

  async isMuted(userId: number, channelId: number): Promise<boolean> {
    const mutedMember = await this.prisma.mutedMembers.findFirst({
      where: {
        channel_id: channelId,
        mutedMember_id: userId,
      },
    });
    if (mutedMember && mutedMember.expiry <= new Date()) {
      await this.prisma.mutedMembers.deleteMany({
        where: {
          channel_id: channelId,
          mutedMember_id: userId,
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

  async channelVisibility(channelID: number) : Promise<string> {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelID,
      },
      select: { visibility: true },
    });

    return channel?.visibility || null;
  }

  async hashPassword(password: string) : Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async isPasswordMatched(hashedPassword: string, providedPassword: string ) {
    const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    return isMatch;
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
      // if (error.expiredAt) {
      //   this.rpcExceptionService.throwUnauthorised(
      //     'Token has expired, please sign in',
      //   );
      // }
      return null;
    }
  }
}
