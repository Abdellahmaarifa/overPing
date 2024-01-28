import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GQLUserInfo {
  @Field({nullable: true})
  id: number;

  @Field({nullable: true})
  username?: string;

  @Field({nullable: true})
  profileImgUrl?: string;

  @Field({nullable: true})
  score: number;

  @Field()
  status: boolean;
}

@ObjectType()
export class GQLGameHistory {
  @Field({nullable: true})
  id: number

  @Field({nullable: true})
  player1?: GQLUserInfo;
  
  @Field({nullable: true})
  player2?: GQLUserInfo;
  
  @Field({nullable: true})
  points: number;
  
  @Field({nullable: true})
  level: number;

  @Field({nullable: true})
  createdAt: string;
}
