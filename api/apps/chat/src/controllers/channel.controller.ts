import { IChannel, IChannelSearch, IMessage, IVisibility } from '@app/common/chat';
import { RpcExceptionService } from '@app/common/exception-handling';
import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateChanneldto,
  DeleteMessageInChanneldto,
  MemberOfChanneldto,
  UpdateChanneldto,
  UpdateMessageInChanneldto
} from '../dto';
import { ChannelService } from '../services/channel.service';
import { CheckerService } from '../utils/checker.service';
import { ChatExceptionFilter } from '../chat-global-filter/chat-global-filter';
import { HelperService } from '../utils/helper.service';

@UseFilters(ChatExceptionFilter)
@Controller()
export class ChannelController {
  constructor(
    private readonly channelService : ChannelService,
    private readonly helper: HelperService,
    private readonly checker: CheckerService,
    private readonly rpcExceptionService: RpcExceptionService
  ) {}

  /******** Find Channel by user and group ID ********/

  @MessagePattern({role: 'channel', cmd: 'find-channel-by-id'})
  async findChannelById(payload: any) : Promise<IChannel> { // {channel: IChannel, members: IMembersWithInfo}
    const {id, user_id} = payload;
    return await this.channelService.findById(id, user_id);
  }

  /*********** Search For channel by Name ***********/

  @MessagePattern({role: 'channel', cmd: 'search'})
  async searchForChannel(payload: any) : Promise<IChannelSearch[]> {
    const {channelName, user_id} = payload;
    return await this.channelService.search(channelName, user_id);
  }

  /************* Get Channels of a User *************/

  @MessagePattern({role: 'channel', cmd: 'get-all'})
  async getUserChannels(user_id: any) : Promise<IChannel[]> {
    return await this.channelService.getUserChannels(user_id);
  }


  /***************** CHANNEL ACTIONS ****************/
  /******* create ******* update ***** delete *******/

  @MessagePattern({role: 'channel', cmd: 'create'})
  async createChannel(payload: CreateChanneldto) : Promise<IChannel> {
    return await this.channelService.create(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'update'})
  async updateChannel(payload: UpdateChanneldto) : Promise<IChannel> {
    return await this.channelService.update(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'delete'})
  async deleteChannel(payload: UpdateChanneldto) : Promise<Boolean> {
    return await this.channelService.delete(payload);
  }

  /***************** MESSAGES ACTIONS ****************/
  /******* update ********************* delete *******/

  @MessagePattern({role: 'channel', cmd: 'update-message'})
  async updateMessageInChannel(payload: UpdateMessageInChanneldto) : Promise<IMessage> {
    return await this.channelService.updateMessage(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'delete-message'})
  async deleteMessageInChannel(payload: DeleteMessageInChanneldto) : Promise<Boolean> {
    return await this.channelService.deleteMessage(payload);
  }
  
  /**************** CHANNEL MEMBERSHIP ***************/
  /*** join *********** add member *******************/
  /*********** leave *************** remove member ***/

  @MessagePattern({role: 'channel', cmd: 'join'})
  async joinChannel(payload: MemberOfChanneldto) : Promise<IChannel> {
    const {userId, channelId, password} = payload;
    
    const visibility = await this.checker.channelVisibility(channelId);
    
    if (!visibility) {
      this.rpcExceptionService.throwCatchedException({
        code: 400,
        message: `Failed to find channel`,
      });
    }

    switch (visibility) {
      case IVisibility.PROTECTED: {
        if (password) {
          return await this.channelService.joinProtectedChannel(userId, channelId, password);
        } else {
          this.rpcExceptionService.throwCatchedException({
            code: 400,
            message: `Failed to join Protected Channel: password required`,
          });
        }
      }
      case IVisibility.PUBLIC: {
        return await this.channelService.joinPublicChannel(userId, channelId);
      }
      default: {
        this.rpcExceptionService.throwCatchedException({
          code: 400,
          message: `You're not allowed to join the channel !!! PRIVATE !!!`,
        });
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

  /************** CHANNEL ADMINISTRATION *************/
  /********* add Admin ******* remove Admine *********/

  @MessagePattern({role: 'channel', cmd: 'add-admin'})
  async addAdmin(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.addAdmin(payload);
  }
  
  @MessagePattern({role: 'channel', cmd: 'remove-admin'})
  async removeAdmin(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.removeAdmin(payload);
  }


  /************************* MEMBER ACTIONS *************************/
  /*********** Ban Member ******************* Mute Member ***********/
  /*** Unban Member ********* Kick Member ********* Unmute Member ***/

  @MessagePattern({role: 'channel', cmd: 'kick-member'})
  async kickMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.kickMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'ban-member'})
  async banMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.banMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'unban-member'})
  async unbanMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.unbanMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'mute-member'})
  async muteMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.muteMember(payload);
  }

  @MessagePattern({role: 'channel', cmd: 'unmute-member'})
  async unmuteMember(payload: MemberOfChanneldto) : Promise<Boolean> {
    return await this.channelService.unmuteMember(payload);
  }

  @MessagePattern({role: 'user', cmd: 'delete-chat-history'})
  async deleteChatHistory(userId: any) : Promise<void> {
    await this.helper.removeUserData(userId);
  }
}
