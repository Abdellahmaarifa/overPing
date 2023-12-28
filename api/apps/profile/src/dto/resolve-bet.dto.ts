import { IsNumber, IsBoolean } from 'class-validator';

export class ResolveBetDto {
  @IsNumber()
  walletId: number;

  @IsBoolean()
  isWinner: boolean;
}