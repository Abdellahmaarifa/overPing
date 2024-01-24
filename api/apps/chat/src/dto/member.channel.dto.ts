import { Field } from "@nestjs/graphql";
import { IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class MemberOfChanneldto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  targetId?: number

  @Field()
  @IsNumber()
  @IsPositive()
  channelId: number

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password?: string

  @Field()
  @IsNumber()
  @IsPositive()
  muteTimeLimit?: number
}