import { Injectable, Inject, BadRequestException, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from "@app/rabbit-mq";
import {GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import { IAuthUser, IUser } from '@app/common/auth/interface/auth.user.interface';
import { GwProfileService } from "../../profile/services/gw.profile.service";
@Injectable()
export class UserService {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private readonly client: ClientProxy,
        @Inject(IRmqSeverName.FRIEND)
        private readonly friendClient: ClientProxy,
        private readonly clientService: RabbitMqService,
        private readonly profileService: GwProfileService,

    ) { }

    async findOrCreateUser(profile: any): Promise<IAuthUser> {
        try {
            const user = await this.findUserByUsername(profile.username);
            console.log("user is not found in this (createUser)", user);
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

    async findUserById(userId: number, id: number): Promise<IAuthUser> {
        const response = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'findUserById'
            },
            {
                id,
                userId,
            }
        )
        return (response);//for now
    }

    async findAllUsers(userId: number) :Promise <IUser[]>{
        const users = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'findAllUsers'
            },
            {
                userId,
            }
        )
        return users
    }

    async findPagesOfUsers(userId: number, pageNumber: number, pageSize: number) :Promise <IUser[]>{
        const users = await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'findPagesOfUsers'
            },
            {
                userId,
                pageSize,
                pageNumber
            }
        )
        return users
    }

    async deleteUser(id: number, password: string): Promise<boolean> {
      const response = await this.clientService.sendMessageWithPayload(
        this.client,
        {
          role: 'user',
          cmd: 'delete-user',
        },
        {
          id,
          password,
        },
      );
      return response;
    }

    async removeAccount(userId: number) {
        this.clientService.emitMessageWithPayload(
          this.client,
          {
            role: 'user',
            cmd: 'delete-account',
          },
          userId
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

    async updateUser(userid: number , data:{
        profileImgUrl? : string;
        email?: string;
        showUpdateWin?: boolean;
    }) : Promise<boolean>{
       return  this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'update'
            },
            {
                id: userid,
                data
            }
        )
    }




}
