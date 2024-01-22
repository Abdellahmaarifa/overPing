import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from '@app/common/auth/interface/auth.user.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { FriendshipService } from '../services/friend.servicet';
import { FriendshipStatus } from '@app/common/friend/dto/friendshipStatus';

@Controller()
export class FriendshipController {
  constructor(
    private readonly friendService: FriendshipService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  @MessagePattern({ role: 'user', cmd: 'request-friendship' })
  async sendFriendRequest(input : {senderId: number, receiverId: number}): Promise<boolean> {
    return await this.friendService.sendFriendRequest(input.senderId, input.receiverId);
  }

  @MessagePattern({ role: 'user', cmd: 'cancel-request-friendship' })
  async cancelFriendRequest(input : {userId: number, requester: number}): Promise<boolean> {
    return await this.friendService.cancelFriendRequest(input.userId, input.requester);
  }

  @MessagePattern({ role: 'user', cmd: 'unfriend-user' })
  async unfriendUser(input: { userId: number, friendId: number}): Promise<boolean>{
     await this.friendService.unfriendUser(input.userId, input.friendId);
     return true;
  }

  @MessagePattern({ role: 'user', cmd: 'accept-friendship' })
  async acceptFriendRequest(input : {userId: number, friendId: number}): Promise<boolean> {
     await this.friendService.acceptFriendRequest(input.userId, input.friendId);
     return true;
  }

  @MessagePattern({ role: 'user', cmd: 'block-user'})
  async blockUser(input : {userId: number, blockedUserId: number}): Promise<boolean>{
    await this.friendService.blockUser(input.userId, input.blockedUserId);
    return true;
  }

  @MessagePattern({ role: 'user', cmd: 'unblock-user'})
  async unblockUser(input: {userId: number, unblockedUserId: number}): Promise<boolean>{
    await this.friendService.unblockUser(input.userId, input.unblockedUserId);
    return true;
  }

  // get data 

  @MessagePattern({ role: 'user', cmd: 'getBlockedUsers'})
  async getBlockedUsers(input: {userId: number}): Promise<IUser[]>{
    return await this.friendService.getBlockedUsers(input.userId);
  }

  @MessagePattern({ role: 'user', cmd: 'getUserFriends'})
  async getUserFriends(input: {userId: number}): Promise<IUser[]>{
    return await this.friendService.getUserFriends(input.userId);
  }

  @MessagePattern({ role: 'user', cmd: 'getFriendsRequests'})
  async getFriendsRequests(input: {userId: number}): Promise<IUser[]>{
    return await this.friendService.getFriendsRequests(input.userId);
  }
  
  @MessagePattern({ role: 'user', cmd: 'getSuggestedFriends'})
  async getSuggestedFriends(input: {userId: number, limit: number }): Promise<IUser[]> {
    return await this.friendService.getSuggestedFriends(input.userId, input.limit);
  }

  @MessagePattern({ role: 'user', cmd: 'getFrienshipStatus'})
  async getFriendshipStatus({userId, friendId}): Promise<FriendshipStatus>{
    return await this.friendService.getFriendshipStatus(userId, friendId);
  }

  @MessagePattern({ role: "user", cmd: "getUserBlocksList" })
  async getUserBlocksList(input: {userId: number, status: FriendshipStatus}): Promise<number[] | null> {
    return await this.friendService.getUserBlocksList(input.userId, input.status);
  }
}