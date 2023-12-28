import { Field, ObjectType, ID } from "@nestjs/graphql";
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

    @Field()
    about: string

    @Field()
    wallet: GQLWalletModel

    @Field()
    created_at: Date

    @Field()
    updated_at: Date
}