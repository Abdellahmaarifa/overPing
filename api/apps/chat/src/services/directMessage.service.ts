import { IDirectMessage, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Inject, Injectable } from '@nestjs/common';
import { AddMessageInDMdto, DeleteDirectMessagedto,
         DeleteMessageInDMdto, UpdateMessageInDMdto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckerService } from '../utils/checker.service';
import { HelperService } from '../utils/helper.service';
import { FriendshipStatus, IUser } from '@app/common';
import { GroupType } from '../interface/group.interface';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';

@Injectable()
export class DirectMessageService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly prisma: PrismaService,
    private readonly checker: CheckerService,
    private readonly helper: HelperService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async findById(id: number, user_id: number) : Promise<IDirectMessage> {
    await this.helper.findUser(user_id, true);

    const directMessage = await this.prisma.directMessage.findUnique({
      where: {
        id,
        OR: [
          { user1_id: user_id },
          { user2_id: user_id },
        ]
      },
      include: {
        messages: {
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      } 
    });
    if (!directMessage) {
      this.rpcExceptionService.throwNotFound(`Failed to find direct message: ${id}`);
    }

    const user1 = await this.helper.findUser(user_id, false);
    let user2: IUser;
    if (user1.id === directMessage.user1_id) {
      user2 = await this.helper.findUser(directMessage.user2_id, false);
    } else {
      user2 = await this.helper.findUser(directMessage.user1_id, false);
    }

    return {
      id: directMessage.id,
      user1,
      user2,
      messages: directMessage.messages,
      created_at: directMessage.created_at,
    };
  }

  async findByUsers(id1: number, id2: number) : Promise<IDirectMessage | null> {
    const directMessage = await this.prisma.directMessage.findFirst({
      where: {
        OR: [
          { user1_id: id1, user2_id: id2 },
          { user2_id: id1, user1_id: id2 },
        ]
      },
      include: {
        messages: {
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      } 
    });
    if (!directMessage) {
      return null;
    }

    const user1 = await this.helper.findUser(id1, false);
    let user2: IUser;
    if (user1.id === directMessage.user1_id) {
      user2 = await this.helper.findUser(directMessage.user2_id, false);
    } else {
      user2 = await this.helper.findUser(directMessage.user1_id, false);
    }

    return {
      id: directMessage.id,
      user1,
      user2,
      messages: directMessage.messages,
      created_at: directMessage.created_at,
    };
  }

  async getUserDirectMessages(user_id: number) : Promise<IDirectMessage[]> {
    await this.helper.findUser(user_id, true);

    const directMessages = await this.prisma.directMessage.findMany({
      where: {
        OR: [
          { user1_id: user_id },
          { user2_id: user_id },
        ]
      },
      orderBy: { latestMessage_at: 'desc' },
      include: {
        messages: {
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      }
    });
    if (!directMessages || directMessages.length === 0) {
      return [];
    }

    const user1: IUser = await this.helper.findUser(user_id, false);
    const user2: IUser[] = await this.clientService.sendMessageWithPayload(
      this.client, { role: 'user', cmd: 'getUsersInfo' }, directMessages.map((dm) => {
        if (user1.id === dm.user1_id) {
          return dm.user2_id ;
        } else {
          return dm.user1_id;
        }
      })
    );
    let i = 0;
    return Promise.all(directMessages.map(async (dm) => {
      return {
        id: dm.id,
        user1,
        user2: user2[i++],
        // messages: dm.messages,
        created_at: dm.created_at,
      };
    }));
  }

  async create(userID: number, targetID: number) : Promise<any> {
    if (userID === targetID) {
      this.rpcExceptionService.throwBadRequest(`Failed: You can't create a direct message with yourself!`);
    }
    await this.helper.findUser(userID, true);
    await this.helper.findUser(targetID, true);

    const directMessage = await this.findByUsers(userID, targetID);
    
    if (directMessage) {
      return directMessage;
    }

    await this.checker.blockStatus(userID, targetID, FriendshipStatus.Blocked, GroupType.DM);
    await this.checker.blockStatus(userID, targetID, FriendshipStatus.BlockedBy, GroupType.DM);

    const createdDirectMessage = await this.prisma.directMessage.create({
      data: {
        user1_id: userID,
        user2_id: targetID
      },
      include: {
        messages: {
          orderBy: { created_at: 'desc' },
          take: 30,
        },
      }
    });

    if (!createdDirectMessage) {
      this.rpcExceptionService.throwBadRequest(`Failed to create direct message`);
    }

    const user1 = await this.helper.findUser(userID, false);
    let user2: IUser;
    if (user1.id === createdDirectMessage.user1_id) {
      user2 = await this.helper.findUser(createdDirectMessage.user2_id, false);
    } else {
      user2 = await this.helper.findUser(createdDirectMessage.user1_id, false);
    }

    return {
      id: createdDirectMessage.id,
      user1,
      user2,
      messages: createdDirectMessage.messages,
      created_at: createdDirectMessage.created_at,
    };
  }

  async delete(data: DeleteDirectMessagedto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);
    return false;
  }

  async addMessage(data: AddMessageInDMdto) : Promise<any> {
    const message = await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        text: data.text ?? null,
        dm: { connect: { id: data.groupChatId } },
        created_at: data.created_at || new Date(),
      }
    });
    if (!message) {
      return null;
    }
    await this.prisma.directMessage.update({
      where: {
        id: data.groupChatId
      },
      data: {
        latestMessage_at: new Date(),
      }
    });
    return message;
  }

  async updateMessage(data: UpdateMessageInDMdto) : Promise<any> {
    await this.helper.findUser(data.userId, true);

    this.checker.blockStatus(data.userId, data.groupChatId, FriendshipStatus.Blocked, GroupType.DM);
    this.checker.blockStatus(data.userId, data.groupChatId, FriendshipStatus.BlockedBy, GroupType.DM);

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

  async deleteMessage(data: DeleteMessageInDMdto) : Promise<Boolean> {
    await this.helper.findUser(data.userId, true);

    const message = await this.prisma.messages.findUnique({
      where: {
        id: data.messageId,
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
      }
    });
    return true;
  }
}
