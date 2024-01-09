import { Field, ObjectType, ID } from "@nestjs/graphql";


@ObjectType()
export class GQLMessageModel {
  @Field(() => ID)
  id: number;

  @Field()
  sender_id: number;

  @Field({ nullable: true })
  text?: string;

  @Field()
  media_id?: number;

  @Field()
  updated: boolean;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

