import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class GQLWalletModel {
    @Field(() => ID)
    id: number;

    @Field()
    balance: number;
    
    @Field()
    user_id: number;

    @Field()
    betAmount?: number;
}