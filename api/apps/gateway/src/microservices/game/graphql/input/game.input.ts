import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsPositive } from "class-validator";

@InputType()
export class GameHistoryInput {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  page: number;

  @Field()
  @IsNumber()
  @IsPositive()
  limit: number;
}