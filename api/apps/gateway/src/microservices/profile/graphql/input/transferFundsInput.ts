import { IsNumber, IsPositive } from 'class-validator';
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class TransferFundsInput {
  @Field()
  @IsNumber()
  senderId: number;

  @Field()
  @IsNumber()
  recipientId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  amount: number;
}