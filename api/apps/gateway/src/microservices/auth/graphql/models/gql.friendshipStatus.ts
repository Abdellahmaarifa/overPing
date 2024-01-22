import { Field, ObjectType, ID, } from "@nestjs/graphql";
import { friendshipStatusType } from "@app/common";



@ObjectType()
export class GQLFriendshipStatusModel {
    @Field(() => String)
    status: friendshipStatusType;
}


