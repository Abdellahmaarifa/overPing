import { Field, ObjectType, ID } from "@nestjs/graphql";



@ObjectType()
export class Player {
  @Field(() => ID, { nullable: true})
  id: number;

  @Field({ nullable: true})
  bet: number;

  @Field({nullable: true})
  matchType: string;
  
}

@ObjectType()
export class PlayersMatching {
  @Field(() => Player, { nullable: true})
  user1: Player;

  @Field(() => Player, { nullable: true})
  user2: Player;

  @Field()
  matchKey: string;


  // @Field()
  // requestType: string;

}

