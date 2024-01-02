import { InputType, Field } from "@nestjs/graphql";
import { IsNumber, IsString, IsUrl } from "class-validator";

@InputType()
export class UpdateInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  groupChatId: number;

  @Field()
  @IsNumber()
  messageId: number;

  @Field()
  @IsString()
  text: string;
}

@InputType()
export class DeletionInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  groupChatId: number;

  @Field()
  @IsNumber()
  messageId?: number;
}
