import { InputType, Field } from "@nestjs/graphql";
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class  PlaceBetInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  betAmount: number;
}
