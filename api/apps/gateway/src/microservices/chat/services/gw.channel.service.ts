import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { IMessage } from '@app/common/chat/message.interface';
import { CreateChannelInput, DeleteMessageInput, MemberInput, UpdateChannelInput, UpdateMessageInput } from '../graphql/input/channel.input';
import { IChannel, IMembers } from '@app/common/chat';

@Injectable()
export class GwChannelService {
  constructor(
    @Inject(IRmqSeverName.CHAT)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) { }

  async findChannelById(channelID: number) : Promise<IChannel>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'find-channel-by-id',
        },
        channelID
    );
  }

  async findChannelMembersById(channelID: number) : Promise<IMembers[]>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'find-members-by-id',
        },
        channelID
    );
  }

  async createChannel(payload: CreateChannelInput) : Promise<IChannel> {
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

  async deleteChannel(userID: number, channelID: number) : Promise<Boolean> {
    const payload = {
      user_id: userID,
      channel_id: channelID
    };
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'channel',
            cmd: 'delete',
        },
        payload
    );
  }

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

  // async inviteToGame(payload: GameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'channel',
  //           cmd: 'game-invitation',
  //       },
  //       payload
  //   );
  // }

  // async acceptGameInvitation(payload: AcceptGameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'channel',
  //           cmd: 'accept-game-invitation',
  //       },
  //       payload
  //   );
  // }

  // async rejectGameInvitation(payload: RejectGameInvitationInput) : Promise<Boolean>{
  //   return await this.clientService.sendMessageWithPayload(
  //       this.client,
  //       {
  //           role: 'channel',
  //           cmd: 'reject-game-invitation',
  //       },
  //       payload
  //   );
  // }
}