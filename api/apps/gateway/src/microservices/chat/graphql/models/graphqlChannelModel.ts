import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLChannelModel {
  @Field(() => ID)
  id: number;

  @Field()
  owner_id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  visibility: string;

  @Field(() => [GQLAdminsModel])
  admins: GQLAdminsModel[];

  @Field(() => [GQLMembersModel])
  members: GQLMembersModel[];

  @Field(() => [GQLMessageModel], { nullable: true })
  messages?: GQLMessageModel[];

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

@ObjectType()
export class GQLAdminsModel {
  @Field()
  userId: number;
}

@ObjectType()
export class GQLMembersModel {
  @Field()
  userId: number;
}


@ObjectType()
export class GQLChannelSearchModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  visibility: string;
}