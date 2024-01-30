import { Controller } from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
import { TransferFundsDto } from '../dto/transfer-funds.dto';
import { WalletService } from '../services/wallet.service';
import { PlaceBetDto } from '../dto/place-bet.dto';
import { ResolveBetDto } from '../dto/resolve-bet.dto';

@Controller()
export class WalletController {
  constructor(
    private readonly walletService : WalletService,
  ) {}

  @MessagePattern({ role: 'wallet', cmd: 'transferFunds'})
  async transferFunds(transferData: TransferFundsDto): Promise<boolean>{
     return this.walletService.transferFunds(transferData);
  }

  @MessagePattern({ role: 'wallet', cmd: 'placeBet'})
  async placeBet(placeBetData: PlaceBetDto):Promise<boolean>{
   console.log("place bet ", placeBetData);
     return this.walletService.placeBet(placeBetData);
  }

  @MessagePattern({ role: 'wallet', cmd: 'resolveBet'})
  async resolveBet(resolveBetData: ResolveBetDto): Promise<boolean>{
     return this.walletService.resolveBet(resolveBetData);
  }

}
