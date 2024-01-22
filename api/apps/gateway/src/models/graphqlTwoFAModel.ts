import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class TwoFAModel{
    @Field()
    twoFA : boolean
}

