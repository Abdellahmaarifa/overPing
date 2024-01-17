import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLUser {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastSeen?: Date;

  @Field()
  profileImgUrl: string;
}
