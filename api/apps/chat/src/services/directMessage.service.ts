import { IDirectMessage, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Inject, Injectable } from '@nestjs/common';
import { AddMessageInDMdto, DeleteDirectMessagedto,
         DeleteMessageInDMdto, UpdateMessageInDMdto } from '../dto';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { CheckerService } from '../utils/checker.service';
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
    private readonly checker: CheckerService
  ) {}

  async findById(directMessageID: number) : Promise<IDirectMessage> {
    return await this.prisma.directMessage.findUnique({
      where: { id: directMessageID },
      include: {
        messages: { orderBy: { created_at: 'asc' } }
      } 
    });
  }

  async checkForUser(id: number) : Promise<Boolean> {
    try {
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
    catch (error) {
      console.log(`Failed to find user: ${id}`)
      return false;
    }
  }

  async create(userID: number, targetID: number) : Promise<any> {
    if (this.checker.isBlocked(userID, targetID)) {
      return null;
    }
    return await this.prisma.directMessage.create({
      data: {
        user1_id: userID,
        user2_id: targetID
      },
      include: {
        messages: { orderBy: { created_at: 'asc' } }
      }
    });
  }

  async delete(data: DeleteDirectMessagedto) : Promise<Boolean> {
    return false;
  }

  async addMessage(data: AddMessageInDMdto) : Promise<any> {
    return await this.prisma.messages.create({
      data: {
        sender_id: data.userId,
        text: data.text ?? null,
        dm: { connect: { id: data.groupChatId } }
      }
    });
  }

  async updateMessage(data: UpdateMessageInDMdto) : Promise<any> {
    const message = await this.prisma.messages.findUnique({
      where: {
        id: data.messageId,
        sender_id: data.userId
      },
    });
    if (!message && this.checker.isBlocked(data.userId, data.groupChatId)) {
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
}
