import { Field, ObjectType, ID } from "@nestjs/graphql";


@ObjectType()
export class GQLIUserModel {

    @Field()
    id: Number;

    @Field()
    username: String;

    @Field()
    email: String;

    @Field()
    profileImgUrl: String;
}

