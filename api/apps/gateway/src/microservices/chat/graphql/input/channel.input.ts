import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsIn, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateChannelInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  channelId: number;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  channelName: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsIn(['public', 'private', 'protected'])
  visibility: string = 'public';

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsOptional()
  @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one digit' })
  password: string;
}

@InputType()
export class UpdateChannelInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  channelId: number;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  channelName: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsIn(['public', 'private', 'protected'])
  visibility: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsOptional()
  @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one digit' })
  password: string;
}

@InputType()
export class UpdateMessageInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  channelId: number;

  @Field()
  @IsNumber()
  messageId: number;

  @Field()
  @IsString()
  text: string;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  channelId: number;

  @Field()
  @IsNumber()
  messageId?: number;
}

@InputType()
export class MemberInput {
  @Field()
  @IsNumber()
  userId: number;
  
  @Field()
  @IsNumber()
  targetId?: number;
  
  @Field()
  @IsNumber()
  channelId: number;

  @Field()
  @IsString()
  password?: string;

  @Field()
  @IsDate()
  @IsOptional()
  muteTimeLimit: Date;
}
