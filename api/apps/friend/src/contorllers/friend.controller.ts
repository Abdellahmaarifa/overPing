import { Controller, Get } from '@nestjs/common';
import { FriendService } from '../services/friend.service';
import { MessagePattern } from '@nestjs/microservices';
import { IAuthUser } from '@app/common';
import { FriendshipDTO } from '@app/common/friend/dto/friendshipDto';
@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

 
  @MessagePattern({ role: 'friend', cmd: 'add' })
  async addFriend(data : {userId: number, friendId: number}) : Promise<boolean>{
    return await this.friendService.addFriend(data.userId, data.friendId);
  }

  @MessagePattern({ role: 'friend', cmd: 'getFriendship' })
  async getFriendship(input: {userId: number, friendId: number}) : Promise<FriendshipDTO>{
     return this.friendService.getFriendshipStatus(input.userId, input.friendId);
  }

  @MessagePattern({ role: 'friend', cmd: 'getUserFriends' })
  async getUserFriends(input: {userId: number}) : Promise<IAuthUser>{
     return this.friendService.getUserFriends(input.userId);
  }

  @MessagePattern({ role: 'friend', cmd: 'getFriendshipRequests' })
  async getFriendshipRequests(input: {userId: number}) : Promise<IAuthUser>{
     return this.friendService.getFriendshipRequests(input.userId);
  }

  @MessagePattern({ role: 'friend', cmd: 'getBlockedUsers' })
  async getBlockedUsers(input: {userId: number}) : Promise<IAuthUser>{
     return this.friendService.getBlockedUsers(input.userId);
  }

  @MessagePattern({ role: 'friend', cmd: 'removeFriend' })
  async removeFriend(data : {userId: number, friendId: number}) : Promise<boolean>{
    return await this.friendService.removeFriend(data.userId, data.friendId);
  }

  @MessagePattern({ role: 'friend', cmd: 'acceptFriendship' })
  async acceptFriendship(data : {userId: number, friendId: number}) : Promise<boolean>{
    return await this.friendService.acceptFriendship(data.userId, data.friendId);
  }

  @MessagePattern({ role: 'friend', cmd: 'blockUser' })
  async blockUser(data : {userId: number, friendId: number}) : Promise<boolean>{
    return await this.friendService.blockUser(data.userId, data.friendId);
  }

  @MessagePattern({ role: 'friend', cmd: 'unblockUser' })
  async unblockUser(data : {userId: number, friendId: number}) : Promise<boolean>{
    return await this.friendService.unblockUser(data.userId, data.friendId);
  }
}
