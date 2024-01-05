import { Injectable, Inject, BadRequestException, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from "@app/rabbit-mq";
import {GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import { IAuthUser, IUser } from '@app/common/auth/interface/auth.user.interface';
import { GwProfileService } from "../../profile/services/gw.profile.service";


@Injectable()
export class UserStatusService {
    constructor(
        @Inject(IRmqSeverName.AUTH)
        private readonly client: ClientProxy,
        @Inject(IRmqSeverName.FRIEND)
        private readonly friendClient: ClientProxy,
        private readonly clientService: RabbitMqService,
        private readonly profileService: GwProfileService,

    ) {}


    async updateUserStatus(userId, time) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: "user",
                cmd: "update-user-status"
            },
            {
                userId,
                time,
            }
        )
    }

    async getOnlineUsers(pageNumber, limit) : Promise<IUser[]>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: "user",
                cmd: "getOnlineUsers"
            },
            {
                pageNumber,
                limit
            }
        )
    }

    async getOnlineFriends(userId, pageNumber, limit) : Promise<IUser[]>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: "user",
                cmd: "getOnlineFriends"
            },
            {
                userId,
                pageNumber,
                limit
            }
        )
    }

}
