import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GQLGameHistory {
  @Field()
  playerOneId: number;
  
  @Field({nullable: true})
  playerOneName: string;
  
  @Field({nullable: true})
  playerOneImageURL: string;
  
  @Field()
  playerOneScore: number;
  
  @Field()
  playerOneStatus: number;
  
  @Field()
  playerTwoId: number;
  
  @Field({nullable: true})
  playerTwoName: string;
  
  @Field({nullable: true})
  playerTwoImageURL: string;
  
  @Field()
  playerTwoScore: number;
  
  @Field()
  playerTwoStatus: number;
  
  @Field()
  points: number;
  
  @Field()
  level: number;
}
