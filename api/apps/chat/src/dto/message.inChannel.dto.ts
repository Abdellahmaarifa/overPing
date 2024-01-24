import { Field } from "@nestjs/graphql"
import { IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

// ADD MESSAGE IN CHANNEL
export class AddMessageInChanneldto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  channelId: number

  @Field()
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  text: string
}

// UPDATE MESSAGE IN CHANNEL
export class UpdateMessageInChanneldto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  channelId: number

  @Field()
  @IsNumber()
  @IsPositive()
  messageId: number

  @Field()
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  text: string
}

// DELETE MESSAGE IN CHANNEL
export class DeleteMessageInChanneldto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  channelID: number

  @Field()
  @IsNumber()
  @IsPositive()
  messageId: number
}

// MESSAGES IN CHANNEL
export class ChannelMessagesdto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  channelId: number

  @Field()
  @IsNumber()
  @IsPositive()
  page: number
}