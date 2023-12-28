import { Injectable, Inject, BadRequestException, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from "@app/rabbit-mq";
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import { IAuthUser } from '@app/common/auth/interface/auth.user.interface';
import { UserProfileUpdateInput } from '../graphql/input/UserProfileUpdate.input';
import { GwProfileService } from "../../profile/services/gw.profile.service";
@Injectable()
export class UserService {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private readonly client: ClientProxy,
        private readonly clientService: RabbitMqService,
        private readonly profileService: GwProfileService,

    ) { }

    async findOrCreateUser(profile: any): Promise<any> {
        try {
            const user = await this.findUserByUsername(profile.username);
            return user;
        } catch (error) {
            return  await this.createAccount(profile);
        }
    }

    async findUserByUsername(username: string): Promise<IAuthUser> {
        const user = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'find-user-by-username'
            },

            username

        );
        return (user);
    }

    async createUser(user: any) : Promise<IAuthUser> {
        const createUser = this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: "create-user",
            },
            user
        );

        return (createUser);
    }

    async createProfile(user: any, profile: any) {
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: "create-profile",
            },
            { user, profile }
        );
    }
    //create dto for user 
    async createAccount(user: any) {

        const respondUser =  await this.createUser(user);

        const profile = await this.profileService.createUserProfile({
			userId: respondUser.id,
			username: respondUser.username
		})
		const updatedUser = await this.updateUserProfileId({id: respondUser.id, profileId: profile.id })
		respondUser.profileId = updatedUser.profileId;
        return (respondUser)
    }


    async findById(id: number): Promise<IAuthUser> {
        const response = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'findById'
            },
            id
        )
        return (response);//for now
    }

    async findAll() {
        const response = await this.clientService.sendMessageWithoutPayload(
            this.client,
            {
                role: 'user',
                cmd: 'findAll'
            },

        )
        return (response);
    }

    async removeUser(id: number) : Promise<boolean>{
        const response = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'delete-user'
            },
            id
        )
        return (response);
    }

    async updateUserProfileId(userUpdateInput: UserProfileUpdateInput){
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'updateProfileId'
            },
            userUpdateInput
        );
    }

    async getUserByRefreshTokenMatch(refreshToken : GetRefreshUserDto){
		const response = await this.clientService.sendMessageWithPayload(
			this.client,
			{role: 'auth', cmd: 'OnRefreshTokenMatch'},
			refreshToken,
		);
			return response;
	}

}
