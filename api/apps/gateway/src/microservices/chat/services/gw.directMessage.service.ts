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

  /*********** Get DIRECT-MESSAGES of User ***********/

  async getUserDirectMessages(userID: number) : Promise<IDirectMessage[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'direct-message',
          cmd: 'get-all',
      },
      userID
    );
  }

  /**** Find DIRECT-MESSAGE by user and group ID *****/

  async findDirectMessageById(userID: number, groupID: number) : Promise<IDirectMessage> {
    const payload = {
      id: groupID,
      user_id: userID,
    };    
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'direct-message',
            cmd: 'find-by-id',
        },
        payload
    );
  }


  /************** DIRECT MESSAGE ACTIONS ************/
  /******* create ******************** delete *******/

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


  /***************** MESSAGES ACTIONS ****************/
  /******* update ********************* delete *******/

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
}