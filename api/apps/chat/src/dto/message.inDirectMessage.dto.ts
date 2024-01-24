import { Field } from "@nestjs/graphql"
import { IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

// ADD MESSAGE IN DM
export class AddMessageInDMdto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  recipientId: number

  @Field()
  @IsNumber()
  @IsPositive()
  groupChatId: number

  @Field()
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  text: string

  @Field()
  created_at?: Date | null
}

// UPDATE MESSAGE IN DM
export class UpdateMessageInDMdto {
  userId:      number
  recipientId: number
  groupChatId: number
  messageId:   number
  text:        string
}

// DELETE MESSAGE IN DM
export class DeleteMessageInDMdto {
  userId:      number
  groupChatId: number
  messageId:   number
}

// MESSAGES IN DM
export class DMMessagesdto {
  userId:      number
  groupChatId: number
  page:        number
}