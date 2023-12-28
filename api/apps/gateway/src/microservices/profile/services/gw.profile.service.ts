import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { CreateProfileInput } from '../graphql/input/createUserProfileInput';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { UpdateProfileInput } from '../graphql/input/updateUserProfileInput';

@Injectable()
export class GwProfileService {
    constructor(
        @Inject(IRmqSeverName.PROFILE)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
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

    async updateUserProfile(id: number,updateInput: UpdateProfileInput) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'update-profile',
            },
            {
                id,
                updateInput
            }
        );
    }

    async findProfileById(PorfileId: number) : Promise<IUserProfile>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'find-Profile',
            },
            PorfileId
        );
    }

    async removeProfile(PorfileId: number) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'profile',
                cmd: 'remove-Profile',
            },
            PorfileId
        );
    }

}