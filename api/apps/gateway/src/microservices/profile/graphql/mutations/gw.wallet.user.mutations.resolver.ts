import {
    Resolver,
    Mutation,
    Args,
    Context,
} from '@nestjs/graphql';
import { GwWalletService } from '../../services/gw.wallet.service';
import { TransferFundsInput } from '../input/transferFundsInput';
import { PlaceBetInput } from '../input/placeBetInput';
import { ResolveBetInput } from '../input/resolveBetInput';

@Resolver()
export class WalletMutationsResolver {
    constructor(
        private readonly walletService: GwWalletService,
    ) { }

   

    /// wallet user resolver 

    @Mutation(()=> Boolean, { nullable: true })
    async transferFunds(@Args('transferFundsInput') transferInput : TransferFundsInput) : Promise<boolean>{
        return this.walletService.transferFunds(transferInput);
    }

    @Mutation(()=> Boolean, { nullable: true })
    async placeBet(@Args('transferFundsInput') placeBetInput : PlaceBetInput): Promise<boolean>{
        console.log("place bet called");
        return this.walletService.placeBet(placeBetInput);
    }
    @Mutation(()=> Boolean, { nullable: true })
    async resolveBet(@Args('resolveBetInput') resolveBetInput: ResolveBetInput): Promise<boolean>{
        return this.walletService.resolveBet(resolveBetInput);
     }
}
