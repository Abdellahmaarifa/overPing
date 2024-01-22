
import { IsNumber, IsPositive } from 'class-validator';

export class  PlaceBetDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsPositive()
  betAmount: number;
}
