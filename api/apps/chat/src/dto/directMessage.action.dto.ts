import { Field } from "@nestjs/graphql"
import { IsNumber, IsPositive } from "class-validator"

// DELETE DIRECT MESSAGE DTO
export class DeleteDirectMessagedto {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number

  @Field()
  @IsNumber()
  @IsPositive()
  groupChatId: number
}