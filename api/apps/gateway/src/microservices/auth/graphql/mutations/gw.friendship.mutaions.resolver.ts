import {
    Args,
    Context,
    Mutation,
    Resolver,
  } from '@nestjs/graphql';
import { GwFriendshipService } from '../../services';


@Resolver()
export class GwFriendMutationsResolver {
    constructor(
        private readonly gwFriendshipService: GwFriendshipService
    ){}


  @Mutation((returns) => Boolean )
  async sendFriendRequest(@Args('senderId') senderId: number,@Args('receiverId') receiverId: number): Promise<boolean>{
     return this.gwFriendshipService.sendFriendRequest(senderId, receiverId);
  }

  @Mutation((returns) => Boolean )
  async acceptFriendRequest(@Args('userId') userId: number,@Args('friendId') friendId: number): Promise<boolean>{
     return this.gwFriendshipService.acceptFriendRequest(userId, friendId);
  }

  @Mutation((returns)=> Boolean)
  async blockUser(@Args('userId') userId: number,@Args('blockedUserId') blockedUserId: number): Promise<boolean>{
    return this.gwFriendshipService.blockUser(userId, blockedUserId);
  }


  @Mutation((returns)=> Boolean)
  async unblockUser(@Args('userId') userId: number,@Args('unblockedUserId') unblockedUserId: number): Promise<boolean>{
    return this.gwFriendshipService.unblockUser(userId, unblockedUserId);
  }

  @Mutation((returns)=> Boolean)
  async unfriendUser(@Args('userId')userId: number, @Args('friendId') friendId: number): Promise<boolean>{
    return this.gwFriendshipService.unfriendUser(userId, friendId);
  }

}