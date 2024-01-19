import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLMessageModel } from "./graphqlMessageModel";
import { IsOptional } from "class-validator";

@ObjectType()
export class GQLAdminsModel {
  @Field()
  id: number;
  
  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  nickname?: string;
  
  @Field({nullable: true})
  email?: string;
  
  @Field({nullable: true})
  lastSeen?: string;
  
  @Field({nullable: true})
  profileImgUrl?: string;
}

@ObjectType()
export class GQLMembersModel {
  @Field()
  id: number;
  
  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  nickname?: string;
  
  @Field({nullable: true})
  email?: string;
  
  @Field({nullable: true})
  lastSeen?: string;
  
  @Field({nullable: true})
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

  @Field({nullable: true})
  @IsOptional()
  description?: string;

  @Field()
  visibility: string;

  @Field(() => [GQLAdminsModel], {nullable: true})
  @IsOptional()
  admins?: GQLAdminsModel[];

  @Field(() => [GQLMembersModel], {nullable: true})
  @IsOptional()
  members?: GQLMembersModel[];

  @Field(() => [GQLMessageModel], {nullable: true})
  @IsOptional()
  messages?: GQLMessageModel[];

  @Field({nullable: true})
  @IsOptional()
  created_at?: string;

  @Field({nullable: true})
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