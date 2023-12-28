import { IChannel, IMembers, IMessage } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChanneldto,
  DeleteMessageInChanneldto,
  MemberOfChanneldto,
  UpdateChanneldto,
  UpdateMessageInChanneldto } from '../dto';
import { ChannelService } from '../services/channel.service';
import { CheckersService } from '../services/checkers.service';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService : ChannelService,
    private readonly checkers: CheckersService,
  ) {}

  @MessagePattern({role: 'channel', cmd: 'find-channel-by-id'})
  async findDirectMessageById(payload: number) : Promise<IChannel> {
    return await this.channelService.findById(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'find-members-by-id'})
  async findChannelMembersById(payload: number) : Promise<IMembers[]> {
    return await this.channelService.findMembersById(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'create'})
  async createChannel(payload: CreateChanneldto) : Promise<IChannel> {
    return await this.channelService.create(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'update'})
  async updateChannel(payload: UpdateChanneldto) : Promise<IChannel> {
    return await this.channelService.update(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'delete'})
  async deleteChannel(payload: any) : Promise<Boolean> {
    const {userID, channelID} = payload;
    return await this.channelService.delete(userID, channelID);
  }

  @MessagePattern({role: 'channel', cmd: 'update-message'})
  async updateMessageInChannel(payload: UpdateMessageInChanneldto) : Promise<IMessage> {
    return await this.channelService.updateMessage(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'delete-message'})
  async deleteMessageInChannel(payload: DeleteMessageInChanneldto) : Promise<Boolean> {
    return await this.channelService.deleteMessage(payload);
  }
  
  @MessagePattern({role: 'channel', cmd: 'join'})
  async joinChannel(payload: MemberOfChanneldto) : Promise<IChannel> {
    const {userId, channelId, password} = payload;
    const visibility = await this.checkers.channelVisibility(channelId);
    switch (visibility) {
      case 'protected': {
        if (password) {
          return await this.channelService.joinProtectedChannel(userId, channelId, password);
        } else {
          return null;
        }
      }
      case 'public': {
        return await this.channelService.joinPublicChannel(userId, channelId);
      }
      default: {
        return null;
      }
    }
  }

  @MessagePattern({role: 'channel', cmd: 'leave'})
  async leaveChannel(payload: MemberOfChanneldto) : Promise<Boolean> {
    const {userId, channelId} = payload;
    return await this.channelService.leave(userId, channelId);
  }

  @MessagePattern({role: 'channel', cmd: 'add-member'})
  async addMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.addMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'add-admin'})
  async addChannelAdmin(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.addAdmin(payload);
  }
  
  @MessagePattern({role: 'channel', cmd: 'remove-admin'})
  async removeChannelAdmin(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.removeAdmin(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'kickMember'})
  async kickMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.kickMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'banMember'})
  async banMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.banMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'unbanMember'})
  async unbanMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.unbanMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'muteMember'})
  async muteMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.muteMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'unmuteMember'})
  async unmuteMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.unmuteMember(payload);
  }
}
