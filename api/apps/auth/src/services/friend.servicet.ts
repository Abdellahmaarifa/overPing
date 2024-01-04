import { Injectable } from '@nestjs/common';
import { IUser } from '@app/common/auth/interface/auth.user.interface';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import { RpcExceptionService } from '@app/common/exception-handling';
import { User, Prisma } from '@prisma/client';
import { PrismaError } from '@app/common/exception-handling';




@Injectable()
export class FriendshipService {
  constructor(
    private readonly rpcExceptionService: RpcExceptionService,
    private prisma: PrismaService,
  ) {
  }
  
  async sendFriendRequest(senderId: number, receiverId: number): Promise<boolean> {
    const areFriends = await this.areUsersFriends(senderId, receiverId);
    if (areFriends) {
      throw new Error('Users are already friends.');
    }

    const existingRequest = await this.prisma.user.findUnique({ where: { id: receiverId } }).friendRequests({
      where: { id: senderId },
    });

    if (existingRequest.length > 0) {
      throw new Error('Friend request already sent.');
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


  async acceptFriendRequest(userId: number, friendId: number): Promise<void> {
    const existingRequest = await this.prisma.user
    .findUnique({ where: { id: userId } })
    .friendRequests({
      where: { id: friendId },
    });

    if (existingRequest.length === 0) {
      throw new Error('No friend request found.');
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
      throw new Error('Users are not friends.');
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
      throw new Error('Users are already blocked.');
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
    const areBlocked = await this.areUsersBlocked(userId, unblockedUserId);
    if (!areBlocked) {
      throw new Error('Users are not blocked.');
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
                        profileImgUrl: true,
                    }
                },
             } 
        });
    if (!user){
        throw new Error('User not found.');
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
                        profileImgUrl: true,
                    }
                },
            } 
        });
    if (!user){
        throw new Error('User not found.');
    }
    console.log("user: ", user)
    return user.friends;
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
                        profileImgUrl: true,
                    }
                },
            } 
        });
    if (!user){
        throw new Error('User not found.');
    }
    return user.friendRequests;
  }


  async getSuggestedFriends(userId: number, limit: number = 10): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        friends: { none: { id: userId } },
      },
      take: limit,
    });

    return users;
  }
}