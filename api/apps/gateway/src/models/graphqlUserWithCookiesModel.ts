import { ObjectType, Field } from "@nestjs/graphql"
import { GQLUserModel } from "./graphqlAuthUserModel"

@ObjectType()
export class UserWithAccessModel{
    @Field()
    accessToken : string
    @Field()
    user : GQLUserModel
}
