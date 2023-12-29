import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { FriendshipStatusType } from '../../../../../../libs/common/src/friend/dto/friendshipStatus';
import { IAuthUser } from '@app/common';
import { FriendshipDTO } from '@app/common/friend/dto/friendshipDto';





@Injectable()
export class GwFriendService {
    constructor(
        @Inject(IRmqSeverName.FRIEND)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
    ) { }
    
  async addFriend(userId: number, friendId: number) : Promise<boolean>{
     return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'friend',
            cmd: 'add'
        },
        {
            userId,
            friendId
        }
     )
  }

  async getFriendship(userId: number, friendId: number) : Promise<FriendshipDTO>{
    const status =  await this.clientService.sendMessageWithPayload(
       this.client,
       {
           role: 'friend',
           cmd: 'getFriendship'
       },
       {
           userId,
           friendId
       }
    )

    return status;
 }

 async getUserFriends(userId: number): Promise<IAuthUser[]>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'friend',
            cmd: 'getUserFriends'
        },
        {
            userId
        }
    );
 }

 async getFriendshipRequests(userId: number): Promise<IAuthUser[]>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'friend',
            cmd: 'getFriendshipRequests'
        },
        {
            userId
        }
    );
 }

 async getBlockedUsers(userId: number): Promise<IAuthUser[]>{
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'friend',
            cmd: 'getBlockedUsers'
        },
        {
            userId
        }
    );
 }
/////////=============action ====================
async removeFriend(userId: number, friendId: number) : Promise<boolean>{
    return await this.clientService.sendMessageWithPayload(
       this.client,
       {
           role: 'friend',
           cmd: 'removeFriend'
       },
       {
           userId,
           friendId
       }
    )
 }

 async acceptFriendship(userId: number, friendId: number) : Promise<boolean>{
    return await this.clientService.sendMessageWithPayload(
       this.client,
       {
           role: 'friend',
           cmd: 'acceptFriendship'
       },
       {
           userId,
           friendId
       }
    )
 }

 async blockUser(userId: number, friendId: number) : Promise<boolean>{
    return await this.clientService.sendMessageWithPayload(
       this.client,
       {
           role: 'friend',
           cmd: 'blockUser'
       },
       {
           userId,
           friendId
       }
    )
 }

 async unblockUser(userId: number, friendId: number) : Promise<boolean>{
    return await this.clientService.sendMessageWithPayload(
       this.client,
       {
           role: 'friend',
           cmd: 'unblockUser'
       },
       {
           userId,
           friendId
       }
    )
 }




}