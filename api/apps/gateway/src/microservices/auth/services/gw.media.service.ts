import { Injectable, Inject } from "@nestjs/common";
import { IRmqSeverName } from "@app/rabbit-mq/interface/rmqServerName";
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';
import { FileUpload } from "graphql-upload";

@Injectable()
export class GWMediaService{
    constructor(
        @Inject(IRmqSeverName.MEDIA)
		private client: ClientProxy,
		private readonly clientService: RabbitMqService,
    ){}

    uploadProfileImg(file: FileUpload){
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'file',
                cmd: 'upload-profile-img'
            },
            file
        )
    }
}