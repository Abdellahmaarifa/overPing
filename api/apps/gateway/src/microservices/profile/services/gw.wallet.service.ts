import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { TransferFundsInput } from '../graphql/input/transferFundsInput';
import { ResolveBetInput } from '../graphql/input/resolveBetInput';
import { PlaceBetInput } from '../graphql/input/placeBetInput';


@Injectable()
export class GwWalletService {
    constructor(
        @Inject(IRmqSeverName.PROFILE)
        private client: ClientProxy,
        private readonly clientService: RabbitMqService,
    ) { }

    async transferFunds(transferInput : TransferFundsInput) : Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role:'wallet',
                cmd:'transferFunds',
            },
            transferInput
        );
    }

    async placeBet( placeBetInput : PlaceBetInput): Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role:'wallet',
                cmd:'placeBet',
            },
            placeBetInput
        );
    }

    async resolveBet(resolveBetInput: ResolveBetInput): Promise<boolean>{
        return await this.clientService.sendMessageWithPayload(
            this.client,
            {
                role:'wallet',
                cmd:'resolveBet',
            },
            resolveBetInput
        );
     }

}