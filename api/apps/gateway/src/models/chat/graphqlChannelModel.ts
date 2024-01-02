import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";

@ObjectType()
export class GQLChannelModel {
  @Field(() => ID)
  id: number;

  @Field()
  owner_id: number;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  visibility: string;

  @Field()
  admins: GQLAdminsModel[];

  @Field()
  members: GQLMembersModel[];

  @Field()
  messages: GQLMessageModel[];

  @Field()
  created_at: Date;
  
  @Field()
  updated_at: Date;
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