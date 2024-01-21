import { IVisibility } from "@app/common/chat";
import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, IsDate, IsIn, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateChannelInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  channelName: string;

  @Field({nullable: true})
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  description?: string;

  @Field()
  @IsString()
  @IsIn([IVisibility.PUBLIC, IVisibility.PRIVATE, IVisibility.PROTECTED])
  visibility: string = 'public';

  @Field({nullable: true})
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(30)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)/, {message: 'Password must contain both letters and at least one digit'})
  password?: string;
}

@InputType()
export class UpdateChannelInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsNumber()
  channelId: number;

  @Field({nullable: true})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  channelName?: string;

  @Field({nullable: true})
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  description?: string;

  @Field()
  @IsString()
  @IsIn([IVisibility.PUBLIC, IVisibility.PRIVATE, IVisibility.PROTECTED])
  visibility: string;

  @Field({nullable: true})
  @IsString()
  oldPassword?: string;

  @Field({nullable: true})
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(30)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)/, {message: 'Password must contain both letters and at least one digit'})
  newPassword?: string;
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
  @MaxLength(255)
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
  messageId: number;
}

@InputType()
export class MemberInput {
  @Field()
  @IsNumber()
  userId: number;
  
  @Field()
  @IsNumber()
  channelId: number;
  
  @Field({nullable: true})
  password?: string;
}

@InputType()
export class ActionToMemberInput extends MemberInput {
  @Field()
  @IsNumber()
  targetId: number;  
  
  @Field({nullable: true})
  @IsDate()
  muteTimeLimit?: Date;
}