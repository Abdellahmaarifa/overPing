import { Resolver,Query, Args} from '@nestjs/graphql';
import { GwFriendService } from '../../services/gw.friend.service';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { GQLFriendShipeStatus } from '../models/graphqlFriendShipState';
import { GQLFriendsModel } from '../models/graphqlFriends';


@Resolver()
export class    FriendQueryResolver {
    constructor(
        private readonly friendService: GwFriendService,
    ) {}

    @Query(() => GQLFriendShipeStatus, { nullable: true})
    async getFriendship(@Args('userId') userId: number ,@Args('friendId') friendId: number): Promise<GQLFriendShipeStatus | null>{
       return await this.friendService.getFriendship(userId, friendId);
    }

    @Query(() => GQLFriendsModel)
    async getUserFriends(@Args('userId') userId: number): Promise<GQLFriendsModel>{
      const friends = await this.friendService.getUserFriends(userId);
      return { friends }
    }

    @Query(() => GQLFriendsModel)
    async getFriendshipRequests(@Args('userId') userId: number): Promise<GQLFriendsModel>{
      const requests = await this.friendService.getFriendshipRequests(userId);
      return { friends: requests }
    }

    @Query(() => GQLFriendsModel)
    async getBlockedUsers(@Args('userId') userId: number): Promise<GQLFriendsModel>{
      const blockedUsers = await this.friendService.getBlockedUsers(userId);
      return { friends: blockedUsers }
    }

}