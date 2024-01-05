import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class GQLAchievement {
    @Field(() => ID)
    id: number

    @Field()
    title: string

    @Field()
    requirement: string

    @Field()
    description: string

    @Field()
    imageURL: string
}