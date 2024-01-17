import { IChannel, IChannelSearch, IMembersWithInfo, IMessage, IVisibility } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddMessageInChanneldto, CreateChanneldto,
         DeleteMessageInChanneldto, MemberOfChanneldto,
         UpdateChanneldto, UpdateMessageInChanneldto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckerService } from '../utils/checker.service';
import { HelperService } from '../utils/helper.service';
import { FriendshipStatus, IUser } from '@app/common';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';
import { GroupType } from '../interface/group.interface';
import { ChannelGateway } from '../chat.gateway/channel.gateway';

@Injectable()
export class ChannelService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => HelperService))
    private readonly helper: HelperService,
    @Inject(forwardRef(() => ChannelGateway))
    private readonly channelGateway: ChannelGateway,
    @Inject(forwardRef(() => CheckerService))
    private readonly checker: CheckerService,
    private readonly rpcExceptionService: RpcExceptionService,
    ) {}

  /******** Find Channel by user and group ID ********/

  async findById(id: number, user_id: number) : Promise<IChannel> {
    await this.helper.findUser(user_id, true);

    if (await this.checker.isMember(user_id, id) === false) {
      this.rpcExceptionService.throwUnauthorised(`Failed to find channel: you're not a member`);
    }

    const blockedUsers = (await this.checker.blockStatus(
      user_id,
      0,
      FriendshipStatus.Blocked,
      GroupType.CHANNEL
    )) as number[];

    const channel = await this.prisma.channel.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { created_at: 'desc' },
          where: {
            NOT: { sender_id: { in: blockedUsers } }
          },
          take: 30,
        },
      },
    });
  
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${id}`)
    }

    const members = await this.getMembers(id);
    // return await this.helper.filterChannelMessages(channel, user_id);
    return {
      ...channel,
      admins: members.admins,
      members: members.members
    };
  }

  /************** Get Channels of a User **************/

  async getUserChannels(userId: number) : Promise<IChannel[]> {
    await this.helper.findUser(userId, true);

    const linkedChannels = await this.prisma.channel.findMany({
      where: {
        OR: [
          { members: { some: { userId } } },
          { admins: { some: { userId } } },
        ]
      },
      orderBy: { updated_at: 'asc' },
      select: { id: true },
    });

    const channelIds = linkedChannels.map((member) => member.id);

    const userChannels = await this.prisma.channel.findMany({
      where: {
        id: { in: channelIds },
      },
      select: {
        id: true,
        owner_id: true,
        name: true,
        visibility: true,
        messages: true,
      }
    });

    return userChannels;
  }

  /*********** Search For channel by Name ***********/

  async search(channelName: string, userId: number) : Promise<IChannelSearch[]> {
    const channels = await this.prisma.channel.findMany({
      where: {
        name : { contains: channelName },
        OR: [
          { visibility: IVisibility.PUBLIC },
          { visibility: IVisibility.PROTECTED },
          {
            AND: [
              { visibility: IVisibility.PRIVATE },
              { OR: [
                { admins: { some: { userId } } },
                { members: { some: { userId } } },
              ]}
            ]
          }
        ]
      },
      select: {
        id: true,
        name: true,
        visibility: true,
      }
    });
    let searchResult = await Promise.all(
      channels.map(async (channel) => {
        return {
          id: channel.id,
          name: channel.name,
          visibility: channel.visibility,
          joined: await this.checker.isMember(userId, channel.id),
        }
      })
    );
    return searchResult;
  }

  /************* Get Members of Channel *************/

  async getMembers(channelId: number) : Promise<IMembersWithInfo> {
    const users = await this.prisma.channel.findUnique({
      where: { id: channelId },
      select: {
        owner_id: true,
        admins: {
          orderBy: { created_at: 'desc' },
          select: { userId: true }
        },
        members: {
          orderBy: { created_at: 'desc' },
          select: { userId: true }
        },
      }
    });

    return {
      owner: await this.clientService.sendMessageWithPayload(
              this.client, { role: 'user', cmd: 'getUsersInfo' }, [users.owner_id]
            ),
      admins: await this.clientService.sendMessageWithPayload(
              this.client, { role: 'user', cmd: 'getUsersInfo' }, users.admins.map((admin) => admin.userId)
            ),
      members: await this.clientService.sendMessageWithPayload(
              this.client, { role: 'user', cmd: 'getUsersInfo' }, users.members.map((member) => member.userId)
            ),
    }
  }

  /***************** CHANNEL ACTIONS ****************/
  /******* create ******* update ***** delete *******/

  async create(data: CreateChanneldto) : Promise<IChannel> {
    await this.helper.findUser(data.userId, true);

    await this.helper.channelNameValidation(data.channelName);
    
    const description = "Our community is built on the fundamental principle of shared learning. As you explore the world of web and mobile development, we want to provide you with a platform to discover new things, learn new tricks, and unlock your full potential.";
    let hashedPassword: string = null;
    if (data.visibility === IVisibility.PROTECTED) {
      if (!data.password) {
        this.rpcExceptionService.throwBadRequest(`Failure: password not provided`);
      }
      hashedPassword = await this.helper.hashPassword(data.password);
    }

    const createdChannel = await this.prisma.channel.create({
      data: {
        owner_id: data.userId,
        name: data.channelName,
        description: data.description ?? description,
        visibility: data.visibility,
        password: hashedPassword,
        admins: { create: [{userId: data.userId}] },
      },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
        messages: true,
      }
    });

    const members = await this.getMembers(createdChannel.id);

    return {
      ...createdChannel,
      admins: members.admins,
      members: members.members,
    };
  }

  async update(data: UpdateChanneldto) : Promise<IChannel> {
    await this.helper.findUser(data.userId, true);
    
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
    });
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${data.channelId}`);
    }

    const hashedPassword = await this.checker.checkPasswordAndChannelVisibility(channel, data);
    
    const updatedChannel = await this.prisma.channel.update({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
      data: {
        name: data.channelName ?? channel.name,
        description: data.description ?? channel.description,
        visibility: data.visibility ?? channel.visibility,
        password: hashedPassword,
      },
      include: {
        admins: { select: { userId: true } },
        members: { select: { userId: true } },
      }
    });

    await this.channelGateway.sendUpdatedChannelInfo(data.channelId, {
      name: data.channelName || channel.name,
      description: data.description || channel.description,
      visibility: data.visibility || channel.visibility,
    });

    const members = await this.getMembers(data.channelId);

    return {
      ...updatedChannel,
      ...members,
    };
  }

  async delete(data: UpdateChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);

    if (await this.checker.isOwner(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
        owner_id: data.userId
      },
    });
    if (!channel) {
      this.rpcExceptionService.throwNotFound(`Failed to find channel: ${data.channelId}`);
    }
    else if (channel.visibility === IVisibility.PROTECTED && !data.password) {
      this.rpcExceptionService.throwUnauthorised(`This action requires a PASSWORD!`)
    }
    else if (channel.visibility === IVisibility.PROTECTED && data.password) {
      await this.helper.isPasswordMatched(channel.password, data.password);
    }

    await this.prisma.channel.delete({
      where: { id: data.channelId },
    });

    return true;
  }

  /***************** MESSAGES ACTIONS ****************/
  /******* update ******* add ********* delete *******/
  
  async addMessage(data: AddMessageInChanneldto) : Promise<IMessage> {
    const message = await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        text: data.text ?? null,
        channel: { connect: { id: data.channelId } }
      }
    });
    await this.prisma.channel.update({
      where: { id: data.channelId },
      data: { updated_at: new Date() }
    });
    return message;
  }

  async updateMessage(data: UpdateMessageInChanneldto) : Promise<IMessage> {
    await this.helper.findUser(data.userId, true);

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
    await this.helper.findUser(data.userId, true);

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
    await this.helper.findUser(userID, true);
    await this.checker.isBanned(userID, channelID);

    if (await this.checker.isMember(userID, channelID)) {
      this.rpcExceptionService.throwBadRequest(`You are already a Member`);
    }

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
    await this.helper.findUser(userID, true);
    await this.checker.isBanned(userID, channelID);

    if (await this.checker.isMember(userID, channelID)) {
      this.rpcExceptionService.throwBadRequest(`You are already a Member`);
    }

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
  
    await this.channelGateway.sendUpdatedListOfMembers(channelID, await this.getMembers(channelID));
  
    return await this.helper.getChannelById(channelID, userID);
  }

  async addMember(data: MemberOfChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);
    await this.helper.findUser(data.targetId, true);
    await this.checker.isBanned(data.targetId, data.channelId);

    if (await this.checker.isMember(data.targetId, data.channelId)) {
      this.rpcExceptionService.throwBadRequest(`The user is already a Member`);
    }

    if (await this.checker.isMember(data.userId, data.channelId) === false) {
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

    await this.channelGateway.sendUpdatedListOfMembers(data.channelId, await this.getMembers(data.channelId));

    return true;
  }

  async leave(userID: number, channelID: number) : Promise<Boolean> {
    if (await this.checker.isAdmin(userID, channelID) == true) {
      await this.prisma.admins.deleteMany({
        where: {
          userId: userID,
          channelId: channelID,
        },
      });
    } else if (await this.checker.isMember(userID, channelID) == true) {
      await this.prisma.members.deleteMany({
        where: {
          userId: userID,
          channelId: channelID,
        },
      });
    }

    if (await this.checker.isOwner(userID, channelID) === true) {
      await this.helper.ownerLeavedChannel(channelID);
    }

    await this.channelGateway.sendUpdatedListOfMembers(channelID, await this.getMembers(channelID));
    return true;
  }

  /************** CHANNEL ADMINISTRATION *************/
  /********* add Admin ******* remove Admine *********/

  async addAdmin(data: MemberOfChanneldto) : Promise<Boolean> {
    if (await this.checker.isOwner(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }
    else if (await this.checker.isAdmin(data.targetId, data.channelId)) {
      this.rpcExceptionService.throwBadRequest(`The user is already an Admin`);
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

    await this.channelGateway.sendUpdatedListOfMembers(data.channelId, await this.getMembers(data.channelId));

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

    await this.channelGateway.sendUpdatedListOfMembers(data.channelId, await this.getMembers(data.channelId));

    return true;
  }

  /************************* MEMBER ACTIONS *************************/
  /*********** Ban Member ******************* Mute Member ***********/
  /*** Unban Member ********* Kick Member ********* Unmute Member ***/

  async kickMember(data: MemberOfChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);

    if (await this.checker.authorized(data.userId, data.targetId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
    }
    await this.prisma.members.deleteMany({
      where: {
        userId: data.targetId,
        channelId: data.channelId,
      },
    });

    await this.channelGateway.sendUpdatedListOfMembers(data.channelId, await this.getMembers(data.channelId));

    return true;
  }

  async banMember(data: MemberOfChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);

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

    await this.channelGateway.sendUpdatedListOfMembers(data.channelId, await this.getMembers(data.channelId));

    return true;
  }

  async unbanMember(data: MemberOfChanneldto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);

    if (await this.checker.isAdmin(data.userId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
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
    await this.helper.findUser(data.userId, true);

    if (await this.checker.authorized(data.userId, data.targetId, data.channelId) === false) {
      this.rpcExceptionService.throwUnauthorised(`You're not allowed to make this action!`);
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
    await this.helper.findUser(data.userId, true);

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
