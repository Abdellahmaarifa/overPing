import { IVisibility } from "@app/common/chat";
import { Optional } from "@nestjs/common";
import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsIn, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
class CreationChannelInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  channelName: string;

  @Field({nullable: true})
  description: string;
}

@InputType()
export class CreatePublicPrivateInput extends CreationChannelInput {

  @Field(() => String)
  @IsString()
  @IsIn([IVisibility.PUBLIC, IVisibility.PRIVATE])
  visibility: string;
}

@InputType()
export class CreateProtectedInput extends CreationChannelInput {

  @Field(() => String)
  @IsString()
  @IsIn([IVisibility.PROTECTED])
  visibility: string;
  
  @Field()
  @IsString()
  @MinLength(4, {message: 'Sets the minimum length of the password to 4 characters.'})
  @MaxLength(30, {message: 'Sets the maximum length of the password to 30 characters.'})
  @Matches(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/, { message: 'Password must contain at least one digit' })
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

  @Field({nullable: true})
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  channelName?: string;

  @Field({nullable: true})
  @IsOptional()
  description?: string;
}

@InputType()
export class updatePublicPrivateInput extends UpdateChannelInput {

  @Field(() => String)
  @IsString()
  @IsIn([IVisibility.PUBLIC, IVisibility.PRIVATE])
  visibility: string;
}

@InputType()
export class updateProtectedInput extends UpdateChannelInput {

  @Field(() => String)
  @IsString()
  @IsIn([IVisibility.PROTECTED])
  visibility: string;

  @Field()
  @IsString()
  oldPassword: string
  
  @Field()
  @IsString()
  @MinLength(4, {message: 'Sets the minimum length of the password to 4 characters.'})
  @MaxLength(30, {message: 'Sets the maximum length of the password to 30 characters.'})
  @Matches(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/, { message: 'Password must contain at least one digit' })
  newPassword: string;
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
  messageId: number;
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
