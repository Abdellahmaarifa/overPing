import { Injectable, Inject } from '@nestjs/common';
import { Prisma, FriendshipStatus } from '@prisma/client';
import { PrismaService } from 'apps/friend/prisma/prisma.service';
import { RpcExceptionService } from '@app/common/exception-handling';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { ClientProxy } from '@nestjs/microservices';
import { FriendshipDTO } from '@app/common/friend/dto/friendshipDto';

@Injectable()
export class FriendService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async getFriendshipStatus(
    userId: number,
    friendId: number,
  ): Promise<FriendshipDTO> {
    try {
      const friendship = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { userA: userId, userB: friendId },
            { userA: friendId, userB: userId },
          ],
        },
      });

      if (!friendship) {
        return null;
      }

      return friendship;
    } catch (error) {
      console.log('error:', error);
    }
  }

  async getUserFriends(userId: number) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        status: FriendshipStatus.FRIEND,
        OR: [{ userA: userId }, { userB: userId }],
      },
    });

    const friendIds = friendships.map((friendship) =>
      friendship.userA === userId ? friendship.userB : friendship.userA,
    );

    const friends = this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'user',
        cmd: 'findUsersByIds',
      },
      friendIds,
    );
    return friends;
  }

  async getFriendshipRequests(userId: number) {
    const requests = await this.prisma.friendship.findMany({
      where: {
        userB: userId,
        status: 'PENDING',
      },
    });

    const requesterIds = requests.map((request) => request.userA);
    const requesters = this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'user',
        cmd: 'findUsersByIds',
      },
      requesterIds,
    );

    return requesters;
  }

  async getBlockedUsers(userId: number) {
    const blockedFriendships = await this.prisma.friendship.findMany({
      where: {
        status: FriendshipStatus.BLOCKED,
        blocker: userId,
      },
    });
    const filteredBlockedUserIds = blockedFriendships.map((blocked) =>
      blocked.userA === userId ? blocked.userB : blocked.userA,
    );
    const blockedUsers = this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'user',
        cmd: 'findUsersByIds',
      },
      filteredBlockedUserIds,
    );

    return blockedUsers;
  }

  /*
  async getSuggestedUsers(userId: number, limit: number = 10): Promise<User[]> {
    const existingFriends = await this.prisma.friendship.findMany({
      where: {
        status: FriendshipStatus.ACCEPTED,
        OR: [
          { userA: userId },
          { userB: userId },
        ],
      },
    });

    const existingFriendIds = existingFriends.flatMap((friendship) => [
      friendship.userA,
      friendship.userB,
    ]);

    const excludedUserIds = [...existingFriendIds, userId];

    const suggestedUsers = await this.prisma.user.findMany({
      where: {
        id: {
          notIn: excludedUserIds,
        },
      },
      take: limit,
    });

    return suggestedUsers;
  }
*/

  //=============the actions ======================

  async addFriend(userId: number, friendId: number): Promise<boolean> {

    const existingRequest = await this.checkExistingFriendship(
      userId,
      friendId,
    );
    if (existingRequest) {
      this.rpcExceptionService.throwBadRequest(
        'Friendship request already exists.',
      );
    }


    const newRequest = await this.prisma.friendship.create({
      data: {
        userA: userId,
        userB: friendId,
        status: 'PENDING',
      },
    });
    // } catch (error) {
    //   this.rpcExceptionService.throwBadRequest(
    //     'Friendship request error.',
    //   );
    // }

    return true;
  }

  async removeFriend(userId: number, friendId: number): Promise<boolean> {
    try {
      const friend = await this.getFriendship(userId, friendId, 'FRIEND');
      await this.prisma.friendship.delete({
        where: {
          id: friend.id,
        },
      });
      return true;
    } catch (error) {
      this.rpcExceptionService.throwBadRequest('error remove friend.' + error);
    }

    return true;
  }

  async acceptFriendship(userId: number, friendId: number) {
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [{ userA: friendId, userB: userId, status: 'PENDING' }],
      },
    });
    if (!existingFriendship) {
      this.rpcExceptionService.throwBadRequest(
        `No request from this id ${friendId}`,
      );
    }

    if (existingFriendship && existingFriendship.userB === userId) {
      await this.prisma.friendship.update({
        where: { id: existingFriendship.id },
        data: {
          status: 'FRIEND',
        },
      });
      return true;
    }
    this.rpcExceptionService.throwBadRequest(
      `This ${friendId} user already rquest a friendship`,
    );
  }

  async blockUser(userId: number, friendId: number) {
    const existingFriendship = await this.getFriendship(
      userId,
      friendId,
      'FRIEND',
    );
    try {
      const blockedFriendship = await this.prisma.friendship.update({
        where: { id: existingFriendship.id },
        data: {
          status: 'BLOCKED',
          blocker: userId,
        },
      });

      return true;
    } catch (error) {
      console.error('Error blocking user:', error);
      this.rpcExceptionService.throwBadRequest('Error blocking user');
    }
  }

  async unblockUser(userId: number, friendId: number) {
    const existingFriendship = await this.getFriendship(
      userId,
      friendId,
      'BLOCKED',
    );
    if (userId != existingFriendship.blocker) {
      this.rpcExceptionService.throwBadRequest(`User ${userId} blocked you`);
    }

    const blockedFriendship = await this.prisma.friendship.update({
      where: { id: existingFriendship.id },
      data: {
        status: 'FRIEND',
        blocker: null,
      },
    });

    return true;
  }

  private async checkExistingFriendship(
    userId: number,
    friendId: number,
  ): Promise<boolean> {
    const existingRequest = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userA: userId, userB: friendId },
          { userA: friendId, userB: userId },
        ],
      },
    });
    if (existingRequest) {
      return true;
    }
    console.log('here the end');
    return false;
  }

  private async getFriendship(
    userId: number,
    friendId: number,
    status: FriendshipStatus,
  ) {
    const friend = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userA: userId, userB: friendId, status: status },
          { userA: friendId, userB: userId, status: status },
        ],
      },
    });
    if (!friend) {
      this.rpcExceptionService.throwBadRequest(
        `Friendship with status ${status} does not exist.`,
      );
    }
    return friend;
  }

//===========================================
async getSuggestedUsers(userId: number): Promise<number[]> {
  const userFriends = await this.prisma.friendship.findMany({
    where: {
      status: 'FRIEND',
      OR: [
        { userA: userId },
        { userB: userId },
      ],
    },
  });

  const userFriendIds = userFriends.flatMap((friendship) => {
    if (friendship.userA === userId) {
      return friendship.userB;
    } else {
      return friendship.userA;
    }
  });

  // Get friends of friends
  const suggestedUsers = await this.prisma.friendship.findMany({
    where: {
      status: 'FRIEND',
      OR: [
        { userA: { in: userFriendIds } },
        { userB: { in: userFriendIds } },
      ],
      NOT: [
        { OR: [{ userA: userId }, { userB: userId }] },
      ],
    },
  });

  // Extract unique user IDs from friends of friends
  const suggestedUserIds = [...new Set(
    suggestedUsers.flatMap((friendship) => [friendship.userA, friendship.userB])
  )];

  return suggestedUserIds;
}

}
