import { IUser } from '@app/common/auth/interface/auth.user.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { FriendshipStatus } from '@app/common/friend/dto/friendshipStatus';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/auth/prisma/prisma.service';



@Injectable()
export class FriendshipService {
  constructor(
    private readonly rpcExceptionService: RpcExceptionService,
    private prisma: PrismaService,
  ) {
  }
  
  async sendFriendRequest(senderId: number, receiverId: number): Promise<boolean> {
    const areFriends = await this.areUsersFriends(senderId, receiverId);
    const areBlocked = await this.areUsersBlocked(receiverId, senderId);

    if (areBlocked){
      throw this.rpcExceptionService.throwBadRequest('the user blocked you');
    }
    if (areFriends) {
      throw this.rpcExceptionService.throwBadRequest('Users are already friends.');
    }

    const existingRequest = await this.prisma.user.findUnique({ where: { id: receiverId } }).friendRequests({
      where: { id: senderId },
    });

    if (existingRequest.length > 0) {
      throw this.rpcExceptionService.throwBadRequest('Friend request already sent.');
    }

    await this.prisma.user.update({
      where: { id: receiverId },
      data: {
        friendRequests: {
          connect: [{ id: senderId }],
        },
      },
    });
    return true;
  }


  // cancel friends
  async cancelFriendRequest(userId: number, requester: number): Promise<boolean> {
    const areFriends = await this.areUsersFriends(userId, requester);
    if (areFriends) {
      throw this.rpcExceptionService.throwBadRequest('Users are already friends.');
    }

    const existingRequest = await this.prisma.user
    .findUnique({ where: { id: userId } })
    .friendRequests({
      where: { id: requester },
    });

    if ((existingRequest.length === 0)) {
      throw this.rpcExceptionService.throwBadRequest("No friend request found.");
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        friendRequests: {
          disconnect: [{ id: requester }],
        },
        pendingFriends: {
            disconnect: [{ id: requester }],
        },
      },
    });
    
    return true;
  }

  ///=====================end ==========


  async acceptFriendRequest(userId: number, friendId: number): Promise<void> {
    const existingRequest = await this.prisma.user
    .findUnique({ where: { id: userId } })
    .friendRequests({
      where: { id: friendId },
    });

    if (existingRequest.length === 0) {
      throw this.rpcExceptionService.throwBadRequest('No friend request found.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: [{ id: friendId }],
        },
        friendRequests: {
          disconnect: [{ id: friendId }],
        },
      },
    });
  }


  async unfriendUser(userId: number, friendId: number): Promise<void> {
    const areFriends = await this.areUsersFriends(userId, friendId);
    if (!areFriends) {
      throw this.rpcExceptionService.throwBadRequest('Users are not friends.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: [{ id: friendId }],
        },
      },
    });

     await this.prisma.user.update({
        where: { id: friendId },
        data: {
          friendOf: {
            disconnect: [{ id: userId }],
          },
        },
      });

      ////sdfsdfdsfdsfsdf


    await this.prisma.user.update({
      where: { id: friendId },
      data: {
        friends: {
          disconnect: [{ id: userId }],
        },
      },
    });

     await this.prisma.user.update({
        where: { id: userId },
        data: {
          friendOf: {
            disconnect: [{ id: friendId }],
          },
        },
      });
  }


  async areUsersFriends(userId: number, friendId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
             where: { id: userId },
             include: { 
                friends: true ,
                friendOf: true,
            },
    });
    return user.friends.some((friend) => friend.id === friendId)
           || user.friendOf.some((friend) => friend.id === friendId);
  }


  // action of blocking and unblocking user

  async blockUser(userId: number, blockedUserId: number): Promise<void> {
    const areBlocked = await this.areUsersBlocked(userId, blockedUserId);
    if (areBlocked) {
      throw this.rpcExceptionService.throwBadRequest('Users are already blocked.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        blocks: {
          connect: [{ id: blockedUserId }],
        },
      },
    });
  }

  async unblockUser(userId: number, unblockedUserId: number): Promise<void> {
    // console.log("=================================> unblockUer", userId, " .  ", unblockedUserId);
    const areBlocked = await this.areUsersBlocked(userId, unblockedUserId);
    if (!areBlocked) {
      throw this.rpcExceptionService.throwBadRequest('Users are not blocked.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        blocks: {
          disconnect: [{ id: unblockedUserId }],
        },
      },
    });
  }

  async areUsersBlocked(userId: number, blockedUserId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { blocks: true },
    });
  
    return user.blocks.some((blockedUser) => blockedUser.id === blockedUserId);
  }
  


  private async hasSentFriendRequest(senderId: number, receiverId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique(
    { 
        where: { id: senderId },
        include: {friendRequests: true}
    });
    return user.friendRequests.some((request) => request.id === receiverId);
  }


  // get user data of friendship

  async getBlockedUsers(userId: number): Promise<IUser[]>{
    const user = await this.prisma.user.findUnique(
        { 
            where: { id: userId },
            include: { 
                blocks: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        lastSeen: true,
                        profileImgUrl: true,
                    }
                },
             } 
        });
    if (!user){
      throw this.rpcExceptionService.throwBadRequest('User not found.');
    }
    return user.blocks;
  }

  async getUserFriends(userId: number): Promise<IUser[]>{
    const user = await this.prisma.user.findUnique(
        { 
            where: { id: userId },
            include: { 
                friends: 
                {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        lastSeen: true,
                        profileImgUrl: true,
                    }
                },
                friendOf: {
                  select: {
                      id: true,
                      username: true,
                      email: true,
                      lastSeen: true,
                      profileImgUrl: true,
                  }
              },
            } 
        });
    if (!user){
      throw this.rpcExceptionService.throwBadRequest('User not found.');
    }
    const allFriends = user.friends.concat(user.friendOf);
    return allFriends;
  }

  async getFriendsRequests(userId: number): Promise<IUser[]>{
    const user = await this.prisma.user.findUnique(
        { 
            where: { id: userId },
            include: { 
                friendRequests:
                {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        lastSeen: true,
                        profileImgUrl: true,
                    }
                },
            } 
        });
    if (!user){
      throw this.rpcExceptionService.throwBadRequest('User not found.');
    }
    return user.friendRequests;
  }


  async getSuggestedFriends(userId: number, limit: number = 10): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        friends: { none: { id: userId } },
        blocks: {  none: { id: userId, },},
        friendOf: { none: {id: userId }},
        blockedBy: { none: {id: userId}}
      },
      take: limit,
    });

    return users;
  }



  /// frindship status 


  async getFriendshipStatus(userId: number, friendId: number): Promise<FriendshipStatus> {

    const existingRequest = await this.prisma.user
    .findUnique({ where: { id: userId } })
    .friendRequests({
      where: { id: friendId },
    });
    const areFriends = await this.areUsersFriends(userId, friendId);

    if (areFriends) {
      return FriendshipStatus.Friends;
    }
    const hasSentRequest = await this.hasSentFriendRequest(userId, friendId);

    if (hasSentRequest) {
      return FriendshipStatus.RequestSent;
    }
    const hasReceivedRequest = await this.hasSentFriendRequest(friendId, userId);

    if (hasReceivedRequest) {
      return FriendshipStatus.RequestReceived;
    }
    const hasBlocked = await this.areUsersBlocked(userId, friendId);
    
    if (hasBlocked){
      return FriendshipStatus.Blocked
    }
    const hasBlockedBy = await this.areUsersBlocked(friendId, userId);

    if (hasBlockedBy){
      return FriendshipStatus.BlockedBy
    }

    return FriendshipStatus.NotFriends;
  }

  async getUserBlocksList(userId: number, status: FriendshipStatus): Promise<number[] | null> {
    switch (status) {
      case FriendshipStatus.BlockedBy: {
        const users = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { blockedBy: { select: { id: true }} },
        });
        return users.blockedBy.map((user) => user.id);
      }
      case FriendshipStatus.Blocked: {
        const users = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { blocks: { select: { id: true }} },
        });
        return users.blocks.map((user) => user.id);
      }
      default: {
        return null;
      }
    }
  }
}



