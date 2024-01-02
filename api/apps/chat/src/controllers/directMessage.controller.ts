import { IDirectMessage, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteDirectMessagedto,
  DeleteMessageInDMdto,
  UpdateMessageInDMdto } from '../dto';
import { DirectMessageService } from '../services/directMessage.service';

@Controller()
export class DirectMessageController {
  constructor(
    private readonly directMessageService : DirectMessageService,
  ) {}

  @MessagePattern({role: 'direct-message', cmd: 'find-by-id'})
  async findDirectMessageById(payload: number) : Promise<IDirectMessage> {
    return await this.directMessageService.findById(payload);
  }

  @MessagePattern({role: 'direct-message', cmd: 'create'})
  async createDirectMessage(payload: any) : Promise<IDirectMessage> {
  const {userID, targetID} = payload;
    return await this.directMessageService.create(userID, targetID);
  }

  @MessagePattern({role: 'direct-message', cmd: 'delete'})
  async deleteDirectMessage(payload: DeleteDirectMessagedto) : Promise<Boolean> {
    return await this.directMessageService.delete(payload);
  }

  @MessagePattern({role: 'direct-message', cmd: 'update-message'})
  async updateMessageInDM(payload: UpdateMessageInDMdto) : Promise<IMessage> {
    return await this.directMessageService.updateMessage(payload);
  }

  @MessagePattern({role: 'direct-message', cmd: 'delete-message'})
  async deleteMessageInDM(payload: DeleteMessageInDMdto) : Promise<Boolean> {
    return await this.directMessageService.deleteMessage(payload);
  }

  @MessagePattern({role: 'direct-message', cmd: 'block-user'})
  async blockUser(payload: any) : Promise<Boolean> {
    const {userID, targetID} = payload;
    return await this.directMessageService.blockUser(userID, targetID);
  }

  @MessagePattern({role: 'direct-message', cmd: 'unblock-user'})
  async unblockUser(payload: any) : Promise<Boolean> {
    const {userID, targetID} = payload;
    return await this.directMessageService.unblockUser(userID, targetID);
  }
}
