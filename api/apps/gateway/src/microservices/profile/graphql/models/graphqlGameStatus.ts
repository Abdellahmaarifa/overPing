import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class GQLGameStatusModel {
  @Field()
  matchesLoss: number;
  @Field()
  matchesWon: number;
  @Field()
  totalMatches: number;
  @Field()
  win_streak: number;
  @Field()
  best_win_streak: number;
}
