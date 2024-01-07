import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { IUser } from '@app/common';
import { FriendshipStatus } from '@app/common/friend/dto/friendshipStatus';


@Injectable()
export class GwFriendshipService {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
    ) { }

   async sendFriendRequest(senderId: number, receiverId: number): Promise<boolean> {
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'request-friendship'
            },
            {
                senderId,
                receiverId
            }
        )
   }


   async cancelFriendRequest(userId: number, requester: number): Promise<boolean> {
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'cancel-request-friendship'
        },
        {
            userId,
            requester
        }
    )
}


   async acceptFriendRequest(userId: number, friendId: number): Promise<boolean> {
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'accept-friendship'
        },
        {
            userId,
            friendId
        }
    )
    }

    async blockUser(userId: number, blockedUserId: number): Promise<boolean>{
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'block-user'
            },
            {
                userId,
                blockedUserId
            }
        )
    }


    async unblockUser(userId: number, unblockedUserId: number): Promise<boolean>{
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'unblock-user'
            },
            {
                userId,
                unblockedUserId
            }
        )
    }

  async unfriendUser(userId: number, friendId: number): Promise<boolean>{
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'unfriend-user'
        },
        {
            userId,
            friendId
        }
    )
  }

  /// get friends

  async getBlockedUsers(userId: number): Promise<IUser[]>{
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'getBlockedUsers'
        },
        {
            userId,
        }
    )
}

async getUserFriends(userId: number): Promise<IUser[]>{
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'getUserFriends'
        },
        {
            userId,
        }
    )
}

async getFriendsRequests(userId: number): Promise<IUser[]>{
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'getFriendsRequests'
            },
            {
                userId,
            }
        )
    }

async getSuggestedFriends(userId: number, limit: number ): Promise<IUser[]> {
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'getSuggestedFriends'
        },
        {
            userId,
            limit
        }
    )  
}

  async getFriendshipStatus(userId: number, friendId: number): Promise<FriendshipStatus> {
    return await this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'user',
            cmd: 'getFrienshipStatus'
        },
        {
            userId,
            friendId
        }
    )
}

}