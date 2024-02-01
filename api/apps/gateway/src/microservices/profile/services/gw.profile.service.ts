import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { CreateProfileInput } from '../graphql/input/createUserProfileInput';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { UpdateProfileInput } from '../graphql/input/updateUserProfileInput';
import { GwFriendshipService } from '../../auth/services/gw.friendship.service';
import { FriendshipStatus } from '@app/common/friend/dto/friendshipStatus';
import { IAchievement } from '@app/common/profile/IAchievement';

@Injectable()
export class GwProfileService {
    constructor(
        @Inject(IRmqSeverName.PROFILE)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
        private readonly friendshipService: GwFriendshipService
    ) { }

  

    async createUserProfile(userInfo: CreateProfileInput) : Promise<IUserProfile>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'create-profile',
            },
            userInfo
        );
    }

    async updateUserProfile(userId: number,updateInput: UpdateProfileInput) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'update-profile',
            },
            {
                userId,
                updateInput
            }
        );
    }

    async findProfileById(userId: number) : Promise<IUserProfile>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'find-Profile',
            },
            userId
        );
    }

    async findProfileByUserId(userId: number, id: number) : Promise<IUserProfile>{
        const isUserblocked = await this.friendshipService.getFriendshipStatus(userId, id);
        if (isUserblocked === FriendshipStatus.BlockedBy){
            throw new HttpException( "premission deine", 404)
        }
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'find-profile-by-userId',
            },
            id
        );
    }

    async getUserAchievements(userId: number): Promise<IAchievement[]> {
      return await this.clientService.sendMessageWithPayload(
        this.client,
        {
          role: 'profile',
          cmd: 'get-user-achievements'
        },
        userId
      );
    }

    async getAllAchievements(): Promise<IAchievement[]> {
      return await this.clientService.sendMessageWithoutPayload(
        this.client,    
        {
          role: 'profile',
          cmd: 'get-all-achievements'
        },
      );
    }

    async removeProfile(userId: number) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'remove-Profile',
            },
            userId
        );
    }

}