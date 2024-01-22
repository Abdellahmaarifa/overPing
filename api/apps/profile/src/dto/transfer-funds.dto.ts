import { IsNumber, IsPositive } from 'class-validator';

export class TransferFundsDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  recipientId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}