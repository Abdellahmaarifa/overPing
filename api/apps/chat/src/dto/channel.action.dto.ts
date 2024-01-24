import { IVisibility } from "@app/common/chat"
import { Field, InputType, Int } from "@nestjs/graphql"
import { IsAlphanumeric, IsIn, IsNumber, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator"

// CREATE CHANNEL DTO
@InputType()
export class CreateChanneldto {
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

// UPDATE CHANNEL DTO
@InputType()
export class UpdateChanneldto {
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
export class DeleteChannelInput {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  channelId: number;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;
}