import { Field, ObjectType, ID } from "@nestjs/graphql";

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
    created_at: Date

    @Field()
    updated_at: Date
}