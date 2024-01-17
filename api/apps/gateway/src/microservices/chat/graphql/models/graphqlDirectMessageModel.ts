import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";
import { GQLUser } from "./graphqlUserModel";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLDirectMessageModel {
  @Field(() => ID)
  id: number;

  @Field(() => GQLUser)
  user1: GQLUser;

  @Field(() => GQLUser)
  user2: GQLUser;

  @Field(() => [GQLMessageModel], { nullable: true })
  @IsOptional()
  messages?: GQLMessageModel[];

  @Field()
  created_at: string;
}
