import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";

@ObjectType()
export class GQLDirectMessageModel {
  @Field(() => ID)
  id: number;

  @Field()
  user1_id: number;

  @Field()
  user2_id: number;

  @Field(() => [GQLMessageModel], { nullable: true })
  messages?: GQLMessageModel[];

  @Field()
  created_at: string;
}
