import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GQLWalletModel } from './graphqlWallet';
import { GQLGameStatusModel } from './graphqlGameStatus';
@ObjectType()
export class GQLUserProfileModel {
    @Field(() => ID)
    id: number

    @Field()
    user_id: number

    @Field()
    nickname: string

    @Field()
    title: string

    @Field()
    xp: number

    @Field()
    rank: number

    @Field()
    displayRank: number

    @Field()
    about: string

    @Field()
    bgImageUrl: string

    @Field()
    wallet: GQLWalletModel

    @Field()
    gameStatus: GQLGameStatusModel

}