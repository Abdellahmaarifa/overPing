
import { IsNumber, IsPositive } from 'class-validator';

export class  PlaceBetDto {
  @IsNumber()
  walletId: number;

  @IsNumber()
  @IsPositive()
  betAmount: number;
}
