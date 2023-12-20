import { InputType, Field } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNumber()
  userId: number;

  @Field()
  @IsString()
  username: string;
}
