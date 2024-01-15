import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { IMessage } from '@app/common/chat/message.interface';
import { CreateProtectedInput, CreatePublicPrivateInput, DeleteMessageInput, MemberInput, UpdateChannelInput, UpdateMessageInput } from '../graphql/input/channel.input';
import { IChannel, IChannelSearch, IMembersWithInfo } from '@app/common/chat';

@Injectable()
export class GwChannelService {
  constructor(
    @Inject(IRmqSeverName.CHAT)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) { }

  /************** Get Channels of a User **************/

  async getUserChannels(userID: number) : Promise<IChannel[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'channel',
          cmd: 'get-all',
      },
      userID
    );
  }

  /******** Find Channel by user and group ID ********/

  async findChannelById(userID: number, channelID: number) : Promise<{channel: IChannel, members: IMembersWithInfo}>{
    const payload = {
      id: channelID,
      user_id: userID,
    };
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'find-channel-by-id',
        },
        payload
    );
  }

  /*********** Search For channel by Name ***********/

  async searchForChannel(channelName: string, user_id: number) : Promise<IChannelSearch[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'channel',
          cmd: 'search',
      },
      {
        channelName,
        user_id
      }
    );
  }


  /***************** CHANNEL ACTIONS ****************/
  /******* create ******* update ***** delete *******/

  async createChannel(payload: CreatePublicPrivateInput | CreateProtectedInput) : Promise<IChannel> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'create',
        },
        payload
    );
  }

  async updateChannel(payload: UpdateChannelInput) : Promise<IChannel> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'update',
        },
        payload
    );
  }

  async deleteChannel(payload: UpdateChannelInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'delete',
        },
        payload
    );
  }


  /***************** MESSAGES ACTIONS ****************/
  /******* update ********************* delete *******/

  async updateMessageInChannel(payload: UpdateMessageInput) : Promise<IMessage> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'update-message',
        },
        payload
    );
  }

  async deleteMessageInChannel(payload: DeleteMessageInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'delete-message',
        },
        payload
    );
  }


  /**************** CHANNEL MEMBERSHIP ***************/
  /*** join *********** add member *******************/
  /*********** leave *************** remove member ***/

  async joinChannel(payload: MemberInput) : Promise<IChannel> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'join',
        },
        payload
    );
  }

  async leaveChannel(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'leave',
        },
        payload
    );
  }

  async addMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'add-member',
        },
        payload
    );
  }

  async removeMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'remove-member',
        },
        payload
    );
  }


  /************** CHANNEL ADMINISTRATION *************/
  /********* add Admin ******* remove Admine *********/

  async addChannelAdmin(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'add-admin',
        },
        payload
    );
  }

  async removeChannelAdmin(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'remove-admin',
        },
        payload
    );
  }


  /************************* MEMBER ACTIONS *************************/
  /*********** Ban Member ******************* Mute Member ***********/
  /*** Unban Member ********* Kick Member ********* Unmute Member ***/

  async kickMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'kick-member',
        },
        payload
    );
  }

  async banMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'ban-member',
        },
        payload
    );
  }

  async unbanMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'unban-member',
        },
        payload
    );
  }

  async muteMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'mute-member',
        },
        payload
    );
  }

  async unmuteMember(payload: MemberInput) : Promise<Boolean> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'unmute-member',
        },
        payload
    );
  }
}