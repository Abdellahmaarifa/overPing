import { IDirectMessage, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Injectable } from '@nestjs/common';
import { AddMessageInDMdto, DeleteDirectMessagedto,
         DeleteMessageInDMdto, UpdateMessageInDMdto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckersService } from './checkers.service';

@Injectable()
export class DirectMessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly checkers: CheckersService
  ) {}

  async findById(directMessageID: number) : Promise<IDirectMessage> {
    return await this.prisma.directMessage.findUnique({
      where: { id: directMessageID },
      include: {
        messages: { orderBy: { createdAt: 'asc' } }
      } 
    });
  }

  async create(userID: number, targetID: number) : Promise<IDirectMessage> {
    if (this.checkers.isBlocked(userID, targetID)) {
      return null;
    }
    return await this.prisma.directMessage.create({
      data: {
        user1_id: userID,
        user2_id: targetID
      },
      include: {
        messages: { orderBy: { createdAt: 'asc' } }
      }
    });
  }

  async delete(data: DeleteDirectMessagedto) : Promise<Boolean> {
    return false;
  }

  async addMessage(data: AddMessageInDMdto) : Promise<IMessage> {
    return await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        recipient_id: data.recipientId,
        text: data.text ?? null,
        media_id: data.mediaId ?? 0,
        dm: { connect: { id: data.groupChatId } }
      }
    });
  }

  async updateMessage(data: UpdateMessageInDMdto) : Promise<IMessage> {
    const message = await this.prisma.messages.findUnique({
      where: {
        id: data.messageId,
        sender_id: data.userId
      },
    });
    if (!message && this.checkers.isBlocked(data.userId, data.groupChatId)) {
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

  async blockUser(userID: number, targetID: number) : Promise<Boolean> {
    await this.prisma.blockedUsers.create({
      data: {
        user_id: userID,
        blockedUser_id: targetID,
      }
    });
    return true;
  }

  async unblockUser(userID: number, targetID: number) : Promise<Boolean> {
    await this.prisma.blockedUsers.deleteMany({
      where: {
        user_id: userID,
        blockedUser_id: targetID,
      },
    });
    return true;
  }
}
