import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JoinMatchmakingInput } from '../graphql/inputs/joinMatchmakingInput';



@Injectable()
export class GwMatchMakingService{
    constructor(
        @Inject(IRmqSeverName.MATCH_MAKING)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
    ){}

    getHello(){
        return this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'hello',
            },
            {
                message: "hello server",
            }
        );
    }

    joinMatchmakingQueue(joinMatchData: JoinMatchmakingInput){
        this.clientService.emitMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'joinQueue',
            },
                joinMatchData
        );
    }
}