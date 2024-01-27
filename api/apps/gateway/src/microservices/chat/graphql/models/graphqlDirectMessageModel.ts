import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";
import { GQLUser } from "./graphqlUserModel";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLDirectMessageModel {
  @Field(() => ID, {nullable: true})
  id: number;

  @Field(() => GQLUser, {nullable: true})
  user1: GQLUser;

  @Field(() => GQLUser, {nullable: true})
  user2: GQLUser;

  @Field(() => [GQLMessageModel], { nullable: true })
  @IsOptional()
  messages?: GQLMessageModel[];

  @Field({nullable: true})
  @IsOptional()
  latestMessage_at?: string;

  @Field({nullable: true})
  created_at: string;
}
