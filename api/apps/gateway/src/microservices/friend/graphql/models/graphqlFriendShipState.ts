import { Field, ObjectType, ID } from "@nestjs/graphql";



@ObjectType()
export class GQLFriendShipeStatus {
    @Field(() => ID)
    id: number;
    @Field(() => ID)
    userA: number;
    @Field(() => ID)
    userB: number;
    @Field(() => ID, { nullable: true })
    blocker: number | null;

    @Field(() => String)
    status: FriendshipStatusType;
}

export type FriendshipStatusType = "FRIEND" | "PENDING" | "REJECTED" | "BLOCKED";