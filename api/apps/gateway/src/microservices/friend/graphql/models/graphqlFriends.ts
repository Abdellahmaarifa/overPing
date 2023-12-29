import { Field, ObjectType, ID } from "@nestjs/graphql";
import { FriendshipStatusType } from "../../../../../../../libs/common/src/friend/dto/friendshipStatus";
import { IAuthUser } from "@app/common";
import { GQLUserModel } from '../../../../models'

@ObjectType()
export class GQLFriendsModel {

    @Field(type => [GQLUserModel])
    friends: GQLUserModel[]; 
}

