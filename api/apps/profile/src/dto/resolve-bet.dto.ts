import { IsNumber, IsBoolean } from 'class-validator';

export class ResolveBetDto {
  @IsNumber()
  userId: number;

  @IsBoolean()
  isWinner: boolean;
}