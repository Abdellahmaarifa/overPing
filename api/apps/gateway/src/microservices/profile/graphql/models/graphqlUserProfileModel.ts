import { Field, ID, ObjectType } from "@nestjs/graphql";
import { GQLGameStatusModel } from './graphqlGameStatus';
import { GQLWalletModel } from './graphqlWallet';
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

    @Field({nullable: true})
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