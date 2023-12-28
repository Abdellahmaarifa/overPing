import { IsNumber, IsBoolean } from 'class-validator';
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ResolveBetInput {
  @Field()
  @IsNumber()
  walletId: number;

  @Field()
  @IsBoolean()
  isWinner: boolean;
}