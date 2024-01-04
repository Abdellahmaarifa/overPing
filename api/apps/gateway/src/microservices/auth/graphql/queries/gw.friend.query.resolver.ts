import { Resolver, Query, Args, Context } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { GwFriendService } from '../../../friend/services/gw.friend.service';
import { GwFriendshipService } from '../../services';
import { IUser } from '@app/common';
import { GQLIUserModel } from '../models/gw.friends';



@Resolver()
export class FriendshipQueryResolver {
    constructor(
        private readonly gwFriendshipService: GwFriendshipService,
    ) { }
    
@Query(() => [GQLIUserModel])
  async getBlockedUsers(@Args('userId')userId: number): Promise<IUser[]>{
    return this.gwFriendshipService.getBlockedUsers(userId)
}

@Query(() => [GQLIUserModel])
async getUserFriends(@Args('userId') userId: number): Promise<IUser[]>{
    return this.gwFriendshipService.getUserFriends(userId)
}
@Query(() => [GQLIUserModel])
async getFriendsRequests(@Args('userId')userId: number): Promise<IUser[]>{
    return this.gwFriendshipService.getFriendsRequests(userId);
}

@Query(() => [GQLIUserModel])
async getSuggestedFriends(@Args('userId') userId: number, @Args('limit') limit: number): Promise<IUser[]> {
    return this.gwFriendshipService.getSuggestedFriends(userId, limit);
}

 
}
