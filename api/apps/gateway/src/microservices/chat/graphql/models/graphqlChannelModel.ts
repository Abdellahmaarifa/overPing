import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLAdminsModel {
  @Field()
  id: number;
  
  @Field()
  username?: string;
  
  @Field()
  email?: string;
  
  @Field()
  lastSeen?: Date;
  
  @Field()
  profileImgUrl?: string;
}

@ObjectType()
export class GQLMembersModel {
  @Field()
  id: number;
  
  @Field()
  username?: string;
  
  @Field()
  email?: string;
  
  @Field()
  lastSeen?: Date;
  
  @Field()
  profileImgUrl?: string;
}

@ObjectType()
export class GQLChannelModel {
  @Field(() => ID)
  id: number;

  @Field()
  @IsOptional()
  owner_id: number;

  @Field()
  name: string;

  @Field()
  @IsOptional()
  description?: string;

  @Field()
  visibility: string;

  @Field(() => [GQLAdminsModel])
  @IsOptional()
  admins?: GQLAdminsModel[];

  @Field(() => [GQLMembersModel])
  @IsOptional()
  members?: GQLMembersModel[];

  @Field(() => [GQLMessageModel])
  @IsOptional()
  messages?: GQLMessageModel[];

  @Field()
  @IsOptional()
  created_at?: string;

  @Field()
  @IsOptional()
  updated_at?: string;
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