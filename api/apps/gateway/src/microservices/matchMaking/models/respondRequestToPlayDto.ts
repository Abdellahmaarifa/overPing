import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class RespondToPlay{

    @Field()
    readonly playerId: number

    @Field()
    readonly matchType: string
}