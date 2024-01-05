import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { GwFriendshipService } from '../../services';
import { IUser } from '@app/common';
import { GQLIUserModel } from '../models/gw.friends';
import { FriendshipStatus } from '@app/common';
import { GQLFriendshipStatusModel } from '../models/gql.friendshipStatus';  

@Resolver()
export class FriendshipQueryResolver {
    constructor(
        private readonly gwFriendshipService: GwFriendshipService,
    ) { }

@UseGuards(GqlJwtAuthGuard)
@Query(() => [GQLIUserModel])
  async getBlockedUsers(@Context() cxt ): Promise<IUser[]>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.getBlockedUsers(userId)
}

@UseGuards(GqlJwtAuthGuard)
@Query(() => [GQLIUserModel])
async getUserFriends(@Context() cxt ): Promise<IUser[]>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.getUserFriends(userId)
}

@UseGuards(GqlJwtAuthGuard)
@Query(() => [GQLIUserModel])
async getFriendsRequests(@Context() cxt ): Promise<IUser[]>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.getFriendsRequests(userId);
}

@UseGuards(GqlJwtAuthGuard)
@Query(() => [GQLIUserModel])
async getSuggestedFriends(@Context() cxt , @Args('limit') limit: number): Promise<IUser[]> {
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.getSuggestedFriends(userId, limit);
}

@UseGuards(GqlJwtAuthGuard)
@Query((returns) => GQLFriendshipStatusModel)
async getFriendshipStatus(@Context() cxt , @Args('friendId') friendId: number): Promise<GQLFriendshipStatusModel>{
    const userId = cxt.req.user.id;
    const friendshipStatus = await this.gwFriendshipService.getFriendshipStatus(userId, friendId);
    return {status : friendshipStatus}
    
}
 
}
