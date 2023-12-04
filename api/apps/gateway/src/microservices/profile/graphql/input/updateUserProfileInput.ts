import { InputType, Field } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class UpdateProfileInput {
    @Field({ nullable: true })
    @IsString()
    nickname?: string

    @Field({ nullable: true })
    @IsString()
    about?: string
  }