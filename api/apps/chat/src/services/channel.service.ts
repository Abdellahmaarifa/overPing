import { IChannel, IMembers, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Injectable } from '@nestjs/common';
import { AddMessageInChanneldto, CreateChanneldto,
         DeleteMessageInChanneldto, MemberOfChanneldto,
         UpdateChanneldto, UpdateMessageInChanneldto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckersService } from './checkers.service';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly checkers: CheckersService
    ) {}

  async findById(channelID: number) : Promise<any> {
    return await this.prisma.channel.findUnique({
      where: { id: channelID },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
        messages: { orderBy: { created_at: 'asc' } },
      }
    });
  }

  async getUserChannels(userId: number) : Promise<number[]> {
    const channels = await this.prisma.members.findMany({
      where: { userId },
      select: { channelId: true },
    });
    return channels.map((member) => member.channelId);
  } 

  async findMembersById(channelID: number) : Promise<IMembers[]> {
    const channelMembers = await this.prisma.members.findMany({
      where: { id: channelID },
      select: { userId: true }
    });
    return channelMembers;
  }

  async checkForChannel(id: number) : Promise<Boolean> {
    try {
      const existedChannel = await this.prisma.channel.findUnique({
        where: { id }
      });
      return !!!existedChannel;
    }
    catch (error) {
      console.log(`Failed to find channel: ${id}`)
      return false;
    }
  }

  async create(data: CreateChanneldto) : Promise<any> {
    // if (data.visibility != 'public'
    //  && data.visibility != 'private'
    //  && data.visibility != 'protected') {
    //   data.visibility = 'public';
    // }
    // if (data.visibility == 'protected' && !data.password) {
    //   return null;
    // } else if (data.visibility == 'public' || data.visibility == 'private') {
    //   data.password = null;
    // }
    const description = "Our community is built on the fundamental principle of shared learning. As you explore the world of web and mobile development, we want to provide you with a platform to discover new things, learn new tricks, and unlock your full potential.";
    const hashedPassword = await this.checkers.hashPassword( data.password );

    return this.prisma.channel.create({
      data: {
        owner_id: data.userId,
        name: data.channelName,
        description: data.description ?? description,
        visibility: data.visibility,
        password: hashedPassword,
        admins: { create: [{userId: data.userId}] },
        members: { create: [{userId: data.userId}] },
      },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
        messages: { orderBy: { created_at: 'asc' } },
      }
    });
  }

  async update(data: UpdateChanneldto) : Promise<any> {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
    });
    if (!channel) {
      return null;
    }
    return await this.prisma.channel.update({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
      data: {
        name: data.channelName ?? channel.name,
        description: data.description ?? channel.description,
        visibility: data.visibility ?? channel.visibility,
        password: data.password ?? channel.password,
      },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
        messages: { orderBy: { created_at: 'asc' } },
      }
    });
  }

  async delete(userID: number, channelID: number) : Promise<Boolean> {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelID,
        owner_id: userID
      },
    });
    if (!channel) {
      return false;
    }
    await this.prisma.channel.delete({
      where: { id: channelID },
    });
    return true;
  }

  async addMessage(data: AddMessageInChanneldto) : Promise<any> {
    return await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        text: data.text ?? null,
        channel: { connect: { id: data.channelId } }
      }
    });
  }

  async updateMessage(data: UpdateMessageInChanneldto) : Promise<any> {
    const message = await this.prisma.messages.findUnique({
      where: {
        id: data.messageId,
        sender_id: data.userId
      },
    });
    if (!message) {
      return null;
    }
    return await this.prisma.messages.update({
      where: {
        id: data.messageId,
        sender_id: data.userId
      },
      data: {
        text: data.text,
        updated: true
      }
    });
  }

  async deleteMessage(data: DeleteMessageInChanneldto) : Promise<Boolean> {
    const message = await this.prisma.messages.findUnique({
      where: {
        id: data.channelID,
        sender_id: data.userId
      },
    });
    if (!message) {
      return false;
    }
    await this.prisma.messages.delete({
      where: {
        id: data.messageId,
        sender_id: data.userId
      },
    });
    return true;
  }
  
  async joinPublicChannel(userID: number, channelID: number) : Promise<IChannel> {
    const channel = await this.prisma.channel.findFirst({
      where: {
        id: channelID,
      }
    });
    if (!channel) {
      return null;
    }
    await this.prisma.members.create({
      data: {
        userId: userID,
        channel: { connect: { id: channelID } },
      }
    });
    return await this.findById(channelID);
  }

  async joinProtectedChannel(userID: number, channelID: number, password: string) : Promise<IChannel> {
    const channel = await this.prisma.channel.findFirst({
      where: {
        id: channelID,
      }
    });
    const isMatched = await this.checkers.isPasswordMatched(channel.password, password);
    if (!channel || !isMatched) {
      return null;
    }
    await this.prisma.members.create({
      data: {
        userId: userID,
        channel: { connect: { id: channelID } },
      }
    });
    return await this.findById(channelID);
  }

  async leave(userID: number, channelID: number) : Promise<Boolean> {
    await this.prisma.members.deleteMany({
      where: {
        userId: userID,
        channelId: channelID,
      },
    });
    return true;
  }

  async addAdmin(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isOwner(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.admins.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    return true;
  }
  
  async removeAdmin(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isOwner(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.admins.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    return true;
  }

  async addMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isMember(data.userId, data.channelId)
      || this.checkers.isBanned(data.targetId, data.channelId)) {
      return false;
    }
    await this.prisma.members.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    return true;
  }

  async kickMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.members.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    return true;
  }

  async banMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.members.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    await this.prisma.bannedMembers.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    return true;
  }

  async unbanMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.bannedMembers.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    return true;
  }

  async muteMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    const muteDuration = data.muteTimeLimit?.getTime() || 3600 * 1000;
    await this.prisma.mutedMembers.create({
      data: {
        channel_id: data.channelId,
        mutedMember_id: data.targetId,
        expiry: new Date( Date.now() + muteDuration ),
      }
    });
    return true;
  }

  async unmuteMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checkers.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.mutedMembers.deleteMany({
      where: {
        channel_id: data.channelId,
        mutedMember_id: data.targetId,
      }
    });
    return true;
  }
}

