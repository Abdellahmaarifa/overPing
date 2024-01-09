import { IAdmins, IChannel, IChannelSearch, IMembers, IMessage, IVisibility } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Injectable } from '@nestjs/common';
import { AddMessageInChanneldto, CreateChanneldto,
         DeleteMessageInChanneldto, MemberOfChanneldto,
         UpdateChanneldto, UpdateMessageInChanneldto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckerService } from '../utils/checker.service';
import { HelperService } from '../utils/helper.service';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: HelperService,
    private readonly checker: CheckerService,
    private readonly rpcExceptionService: RpcExceptionService,
    ) {}

  /******** Find Channel by user and group ID ********/

  async findById(id: number, user_id: number) : Promise<IChannel> {
    await this.helper.findUser(user_id);

    if (await this.checker.isMember(user_id, id) === false) {
      this.rpcExceptionService.throwUnauthorised(`Failed to find channel: you're not a member`);
    }
    const channels = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        admins: true,
        members: true,
        // messages: {
        //   orderBy: { created_at: 'desc' },
        //   take: 30,
        // },
      },
    });
  
    if (!channels) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${id}`)
    }

    return await this.helper.filterChannelMessages(channels, user_id);
  }

  /************** Get Channels of a User **************/

  async getUserChannels(userId: number) : Promise<IChannel[]> {
    await this.helper.findUser(userId);

    const linkedChannels = await this.prisma.members.findMany({
      where: { userId },
      select: { channelId: true }
    });

    const channelIds = linkedChannels.map((member) => member.channelId);

    const userChannels = await this.prisma.channel.findMany({
      where: {
        id: { in: channelIds },
      },
      include: {
        admins: true,
        members: true,
        messages: true
      }
    });
  
    return userChannels;
  }

  /*********** Search For channel by Name ***********/

  async search(channelName: string) : Promise<IChannelSearch[]> {
    const channels = await this.prisma.channel.findMany({
      where: {
        name : { contains: channelName },
        NOT: { visibility: IVisibility.PRIVATE },
      },
      select: {
        id: true,
        name: true,
        visibility: true,
      }
    });
    return channels;
  }

  /***************** CHANNEL ACTIONS ****************/
  /******* create ******* update ***** delete *******/

  async create(data: CreateChanneldto) : Promise<IChannel> {
    await this.helper.findUser(data.userId);

    const isValid = await this.helper.channelNameValidation(data.channelName);
    if (isValid) {
      const description = "Our community is built on the fundamental principle of shared learning. As you explore the world of web and mobile development, we want to provide you with a platform to discover new things, learn new tricks, and unlock your full potential.";
      let hashedPassword: string = null;
      if (data.visibility === IVisibility.PROTECTED) {
        hashedPassword = await this.helper.hashPassword( data.password );
      }

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
          // messages: {
          //   orderBy: { created_at: 'desc' },
          //   take: 30,
          // },
        }
      });
    }
    else {
      this.rpcExceptionService.throwInternalError('Failed to create channel: check the provided visibility requirement');
    }
  }

  async update(data: UpdateChanneldto) : Promise<IChannel> {
    await this.helper.findUser(data.userId);
    
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
    });
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${data.channelId}`);
    }

    let hashedPassword = channel.password;
    if (data.visibility === IVisibility.PROTECTED) {
      if (this.helper.isPasswordMatched(hashedPassword, data.oldPassword)) {
        hashedPassword = await this.helper.hashPassword(data.newPassword);
      } else {
        this.rpcExceptionService.throwUnauthorised(`Invalide password: check the old password you provided`);
      }
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
        password: hashedPassword || channel.password,
      },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
        // messages: {
        //   orderBy: { created_at: 'desc' },
        //   take: 30,
        // },
      }
    });
  }

  async delete(userID: number, channelID: number) : Promise<Boolean> {
    await this.helper.findUser(userID);

    if (await this.checker.isOwner(userID, channelID) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelID,
        owner_id: userID
      },
    });
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${channelID}`);
    }
    await this.prisma.channel.delete({
      where: { id: channelID },
    });
    return true;
  }

  /***************** MESSAGES ACTIONS ****************/
  /******* update ******* add ********* delete *******/
  
  async addMessage(data: AddMessageInChanneldto) : Promise<IMessage> {
    return await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        text: data.text ?? null,
        channel: { connect: { id: data.channelId } }
      }
    });
  }

  async updateMessage(data: UpdateMessageInChanneldto) : Promise<IMessage> {
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
  
  /**************** CHANNEL MEMBERSHIP ***************/
  /*** join *********** add member *******************/
  /*********** leave *************** remove member ***/

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
    return await this.helper.getChannelById(channelID, userID);
  }

  async joinProtectedChannel(userID: number, channelID: number, password: string) : Promise<IChannel> {
    const channel = await this.prisma.channel.findFirst({
      where: {
        id: channelID,
      }
    });
    if (!channel) {
      return null;
    }
    const isMatched = await this.helper.isPasswordMatched(channel.password, password);

    await this.prisma.members.create({
      data: {
        userId: userID,
        channel: { connect: { id: channelID } },
      }
    });
    return await this.helper.getChannelById(channelID, userID);
  }

  async addMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (await this.checker.isMember(data.userId, data.channelId) === false
     || await this.checker.isBanned(data.targetId, data.channelId) === true) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }
    if (await this.checker.channelVisibility(data.channelId) === IVisibility.PRIVATE
     && await this.checker.isAdmin(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }

    await this.prisma.members.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    return true;
  }

  async leave(userID: number, channelID: number) : Promise<Boolean> {
    await this.prisma.members.deleteMany({
      where: {
        userId: userID,
        channelId: channelID,
      },
    });
    if (await this.checker.isOwner(userID, channelID) === true) {
      await this.helper.ownerLeavedChannel(channelID);
    }
    return true;
  }
  
  /************** CHANNEL ADMINISTRATION *************/
  /********* add Admin ******* remove Admine *********/
  
  async addAdmin(data: MemberOfChanneldto) : Promise<Boolean> {
    if (await this.checker.isOwner(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }
    await this.prisma.admins.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    await this.prisma.members.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    return true;
  }
  
  async removeAdmin(data: MemberOfChanneldto) : Promise<Boolean> {
    if (await this.checker.isOwner(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }
    await this.prisma.admins.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });
    await this.prisma.members.create({
      data: {
        userId: data.targetId,
        channel: { connect: { id: data.channelId } },
      }
    });
    return true;
  }

  /************************* MEMBER ACTIONS *************************/
  /*********** Ban Member ******************* Mute Member ***********/
  /*** Unban Member ********* Kick Member ********* Unmute Member ***/

  async kickMember(data: MemberOfChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId);

    if (await this.checker.authorized(data.userId, data.targetId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
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
    await this.helper.findUser(data.userId);

    if (await this.checker.authorized(data.userId, data.targetId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
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
    if (await this.checker.isAdmin(data.userId, data.channelId) === false) {
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
    if (!this.checker.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    const muteDuration = data.muteTimeLimit?.getTime() || 3600 * 1000;
    await this.prisma.mutedMembers.create({
      data: {
        channelId: data.channelId,
        user_id: data.targetId,
        expiry: new Date( Date.now() + muteDuration ),
      }
    });
    return true;
  }

  async unmuteMember(data: MemberOfChanneldto) : Promise<Boolean> {
    if (!this.checker.isAdmin(data.userId, data.channelId)) {
      return false;
    }
    await this.prisma.mutedMembers.deleteMany({
      where: {
        channelId: data.channelId,
        user_id: data.targetId,
      }
    });
    return true;
  }
}

