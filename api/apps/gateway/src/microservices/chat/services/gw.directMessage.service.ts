import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { DeletionInput, UpdateInput } from '../graphql/input/directMessage.input';
import { IDirectMessage, IMessage } from '@app/common/chat';

@Injectable()
export class GwDirectMessageService {
  constructor(
    @Inject(IRmqSeverName.CHAT)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) { }

  async findDirectMessageById(directMessageID: number) : Promise<IDirectMessage> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'find-by-id',
        },
        directMessageID
    );
  }

  async createDirectMessage(userID: number, targetID: number) : Promise<IDirectMessage>{
    const payload = {
      user_id: userID,
      target_id: targetID
    };
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'create',
        },
        payload
    );
  }
      
  async deleteDirectMessage(payload: DeletionInput) : Promise<Boolean>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'delete',
        },
        payload
    );
  }

  async updateMessageInDM(payload: UpdateInput) : Promise<IMessage>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'update-message',
        },
        payload
    );
  }

  async deleteMessageInDM(payload: DeletionInput) : Promise<Boolean>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'delete-message',
        },
        payload
    );
  }

  async blockUser(userID: number, targetID: number) : Promise<Boolean>{
    const payload = {
      user_id: userID,
      target_id: targetID
    };
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'block-user',
        },
        payload
    );
  }

  async unblockUser(userID: number, targetID: number) : Promise<Boolean>{
    const payload = {
      user_id: userID,
      target_id: targetID
    };
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'unblock-user',
        },
        payload
    );
  }

  // async inviteToGame(payload: GameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'direct-message',
  //           cmd: 'game-invitation',
  //       },
  //       payload
  //   );
  // }

  // async acceptGameInvitation(payload: AcceptGameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'direct-message',
  //           cmd: 'accept-game-invitation',
  //       },
  //       payload
  //   );
  // }

  // async rejectGameInvitation(payload: RejectGameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'direct-message',
  //           cmd: 'reject-game-invitation',
  //       },
  //       payload
  //   );
  // }
}