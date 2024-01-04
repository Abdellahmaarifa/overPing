import {
    Args,
    Context,
    Mutation,
    Resolver,
  } from '@nestjs/graphql';
import { GwFriendshipService } from '../../services';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';

@Resolver()
export class GwFriendMutationsResolver {
    constructor(
        private readonly gwFriendshipService: GwFriendshipService
    ){}


  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => Boolean )
  async sendFriendRequest(@Context() cxt ,@Args('receiverId') receiverId: number): Promise<boolean>{
    const senderId = cxt.req.user.id; 
    return this.gwFriendshipService.sendFriendRequest(senderId, receiverId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => Boolean )
  async acceptFriendRequest(@Context() cxt ,@Args('friendId') friendId: number): Promise<boolean>{
    const userId = cxt.req.user.id; 
    return this.gwFriendshipService.acceptFriendRequest(userId, friendId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns)=> Boolean)
  async blockUser(@Context() cxt ,@Args('blockedUserId') blockedUserId: number): Promise<boolean>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.blockUser(userId, blockedUserId);
  }


  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns)=> Boolean)
  async unblockUser(@Context() cxt ,@Args('unblockedUserId') unblockedUserId: number): Promise<boolean>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.unblockUser(userId, unblockedUserId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns)=> Boolean)
  async unfriendUser(@Context() cxt , @Args('friendId') friendId: number): Promise<boolean>{
    const userId = cxt.req.user.id;
    return this.gwFriendshipService.unfriendUser(userId, friendId);
  }

}