import {
    Resolver,
    Mutation,
    Args,
    Context,
} from '@nestjs/graphql';
import { GwFriendService } from '../../services/gw.friend.service';

@Resolver()
export class FriendMutationsResolver {
    constructor(
        private readonly friendService: GwFriendService,
    ) { }
    @Mutation(() => Boolean)
    async addFriend(@Args('userId') userId: number, @Args('friendId') friendId: number) : Promise<boolean>{
        return this.friendService.addFriend(userId, friendId);
    }

    @Mutation(() => Boolean)
    async removeFriend(@Args('userId') userId: number, @Args('friendId') friendId: number) : Promise<boolean>{
        return this.friendService.removeFriend(userId, friendId);
    }

    @Mutation(() => Boolean)
    async acceptFriendship(@Args('userId') userId: number, @Args('friendId') friendId: number) : Promise<boolean>{
        return this.friendService.acceptFriendship(userId, friendId);
    }

    @Mutation(() => Boolean)
    async blockUser(@Args('userId') userId: number, @Args('friendId') friendId: number) : Promise<boolean>{
        return this.friendService.blockUser(userId, friendId);
    }

    @Mutation(() => Boolean)
    async unblockUser(@Args('userId') userId: number, @Args('friendId') friendId: number) : Promise<boolean>{
        return this.friendService.unblockUser(userId, friendId);
    }
    
}
