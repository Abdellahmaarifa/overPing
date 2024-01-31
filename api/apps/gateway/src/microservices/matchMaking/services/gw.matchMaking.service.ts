import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JoinMatchmakingInput, RequestToPlayInput } from '../graphql/inputs/joinMatchmakingInput';
import { RespondToPlay } from '../models/respondRequestToPlayDto';
import { AcceptRequestInput, CancelRequestInput } from '../graphql/inputs/acceptRequestInput';

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

    async requestUserToPlay(userId: number, joinMatchData: RequestToPlayInput): Promise<any>{
        const request =  await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'requestUserToPlay',
            },
            {
                userId,
                joinMatchData
            }
        );

        return request;
    }

    async acceptMatchToPlay(userId: number, acceptData: AcceptRequestInput){
        await this.clientService.emitMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'acceptMatchToPlay',
            },
            {
                senderId : acceptData.senderId,
                recipientId: userId,
                matchType: acceptData.matchType
            }
        );
    }


    async cancelRequestToPlay(userId: number, acceptData: CancelRequestInput){
       return await this.clientService.emitMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'CancelRequestToPlay',
            },
            {
                senderId : acceptData.senderId,
                recipientId: userId,
                matchType: acceptData.matchType
            }
        );
    }
    
    async removePlayerFromQueue(userId: number, matchType: string){
       return await this.clientService.emitMessageWithPayload(
            this.client,
            {
                role: 'matchMaking',
                cmd: 'removePlayerFromQueue',
            },
            {
                userId,
                matchType
            }
        );
    }
}