import { Injectable, Inject,BadRequestException, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from "@app/rabbit-mq";
import { UserLoggerService } from "@app/common/loger";

@Injectable()
export class UserService {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private readonly client: ClientProxy,
        private readonly clientService: RabbitMqService,

    ) {}

    async findOrCreateUser(profile: any): Promise<any> {
        console.log("gateway =======> starting to find the username: ", profile.username)
        const user = await this.findUserByUsername(profile.username);
        if (user) {
           console.log("gateway====> findOrcreateUser: user found", user);
           return user;
        }
        console.log("gateway====> findOrcreateUser: user was not found", user);
        const account = await this.createAccount(profile);
        console.log("gateway====> findorcreateuser account created : ", account);
        if (!account) {
            console.log("gateway====> findorcreateuser account was not created : ", account);
            throw new Error("Error creating account");
        }
        return account;
    }

    async findUserByUsername(username: string): Promise<any>{
       const user= await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'user',
                cmd: 'find-user-by-username'
            },
            
            username
            
        );
        return (user);
    }

    async createUser(user: any) {
        const createUser =  this.clientService.sendMessageWithPayload(
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
        
        const userResponse = await this.createUser(user);
        console.log("gateway====> createAccount: userCreated :", userResponse.user);

        if (!userResponse.data) {
            console.log("gateway====> createAccount: userCreated  was not created:", userResponse.data);
            if (userResponse.message) {
                throw new BadRequestException(`Failed to create user: ${userResponse.message}`);
            } else {
                throw new BadRequestException("Can't create the user");
            }
        }

        // const ProfileResponse = await this.createProfile(userResponse.user, profile);

    //     if (!ProfileResponse.profile) {
    //         if (ProfileResponse.message){
    //             throw new Error(`Failed to create user: ${ProfileResponse.message}`);
    //         } else {
    //             throw new Error("Can't create the user");
    //         }
    // }
        return userResponse.data;
        // return { user: userResponse.user, profile: ProfileResponse.profile };
    }
}
