import {
  IAuthUser,
  IUser,
} from '@app/common/auth/interface/auth.user.interface';
import { PrismaError, RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import * as argon2 from 'argon2';
import { SignInCredentialsDto, UserCreationDto } from '../dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    @Inject(IRmqSeverName.PROFILE)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly rpcExceptionService: RpcExceptionService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) { }

  async validateUser(
    userCredentials: SignInCredentialsDto,
  ): Promise<IAuthUser | null> {
    let userFound = await this.findUserByUsername(userCredentials.username);
    if (!userFound) {
      this.rpcExceptionService.throwNotFound(
        'User not found. Check the provided username.',
      );
    }
    const isPasswordValid = await argon2.verify(
      userFound.password,
      userCredentials.password,
    );
    if (!isPasswordValid)
      this.rpcExceptionService.throwForbidden('Invalid username or password.');
    return userFound;
  }

  async createUser({
    password,
    username,
    googleId,
    fortyTwoId,
    email,
    imgUrl,
  }: UserCreationDto): Promise<IAuthUser> {
    const exists = await this.isUserExist(username);
    if (exists) {
      throw this.rpcExceptionService.throwBadRequest(
        `Resource already exists`,
      );
    }
    try {
      const hashedPassword = password ? await argon2.hash(password) : undefined;
      let img = imgUrl ? imgUrl : this.configService.get<string>('DEFAULT_AVATAR_IMG_URL');//http://localhost:5500/image/avatar/defaultAvatar.jpg";
      return this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          googleId,
          fortyTwoId,
          profileImgUrl: img,
          twoFactorSecret: '',
          twoStepVerificationEnabled: false,
        },
        select: {
          id: true,
          email: true,
          username: true,
          profileImgUrl: true,
          googleId: true,
          fortyTwoId: true,
          lastSeen: true,
          twoStepVerificationEnabled: true,
          createdAt: true,
          updatedAt: true,
          showUpdateWin: true,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
  async searchUser(pageNumber =1, limit, username): Promise<IUser[]>{
      const skip = (pageNumber - 1) * limit;
      const users = await this.prisma.user.findMany({
        where : {
            username: {
              startsWith : username
            }
          },
          select: {
            id: true,
            username: true,
            profileImgUrl: true,
            email: true,
            lastSeen: true,
          },
          skip,
          take: limit,
        })
      return users;
  }


  async findUserByUsername(username: string){
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });
      return user;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findUserById(userId: number, id: number): Promise<IUser> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          blocks: {
            none: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          lastSeen: true,
          profileImgUrl: true,
        },
      });
      return user;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAllUsers(userId: number): Promise<IUser[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          id: {
            not: userId,
          },
          blocks: {
            none: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          lastSeen: true,
          profileImgUrl: true,
        },
      });
      return users;
    }  catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findPagesOfUsers(
    pageNumber: number = 1,
    pageSize: number = 10,
    userId: number,
  ): Promise<IUser[]> {
    const skip = (pageNumber - 1) * pageSize;
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        blocks: {
          none: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: false,
        lastSeen: true,
        profileImgUrl: true,
      },
      skip,
      take: pageSize,
    });
    return users;
  }

  async remove(id: number, password: string): Promise<boolean> {
    console.log("\n\ntrying to delete user from remove function\n")
    try {
      const userToDelete = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!userToDelete) {
        this.rpcExceptionService.throwBadRequest(
          `User with ID ${id} not found.`,
        );
      }

      //check the password if the user

      const isPasswordValid = await argon2.verify(
        userToDelete.password,

        password,
      );

      if (!isPasswordValid) {
        this.rpcExceptionService.throwBadRequest('wrong password');
      }

      // Delete the user if it exists

      await this.prisma.user.delete({
        where: {
          id: userToDelete.id,
        },
      });

      return true;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    console.log("\n\ntrying to delete user from deleteUser function\n\n");
    try {
      const userToDelete = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userToDelete) {
        this.rpcExceptionService.throwBadRequest(
          `User with ID ${userId} not found.`,
        );
      }

      // Delete the user if it exists

      await this.prisma.user.delete({
        where: {
          id: userToDelete.id,
        },
      });

      return true;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }


  async updateRefreshToken(userId: number, refreshToken: string) {
    return this.prisma.user.update({
      data: {
        refreshToken: refreshToken,
      },
      where: { id: userId },
    });
  }

  async update2FA(id: number, secret: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        twoFactorSecret: secret,
      },
    });
  }

  async toggle2FAStatus(id: number, state: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: {
        twoStepVerificationEnabled: state,
      },
    });
  }

  private handlePrismaError(error: any): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = new PrismaError(
        error,
        this.rpcExceptionService,
      );
      prismaError.handlePrismaError();
    } else {
      throw this.rpcExceptionService.throwInternalError(
        'An unexpected error occurred',
      );
    }
  }

  private async isUserExist(username: string): Promise<boolean> {
    const exists = !!(await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    }));
    return exists;
  }
  private async isUserExistById(id: number): Promise<boolean> {
    const exists = !!(await this.prisma.user.findFirst({
      where: {
        id,
      },
    }));
    return exists;
  }

  async updateUser(userId: number, input: UpdateUserDto): Promise<boolean> {
    const exists = await this.isUserExistById(userId);
    if (!exists) {
      this.rpcExceptionService.throwBadRequest(
        `User with ID ${userId} not found.`,
      );
    }
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: input,
    });

    if (!user) {
      return false;
    }
    return true;
  }

  async findUserByIds(friendIds: number[]): Promise<IAuthUser[]> {
    const friends = await this.prisma.user.findMany({
      where: {
        id: {
          in: friendIds,
        },
      },
      select: {
        id: true,
        username: true,
        profileImgUrl: true,
        email: true,
      },
    });
    return friends;
  }

  async getOnlineFriends(
    userId: number,
    pageNumber: number,
    limit: number,
  ): Promise<IUser[]> {
    const exists = await this.isUserExistById(userId);
    if (!exists) {
      this.rpcExceptionService.throwBadRequest(
        `User with ID ${userId} not found.`,
      );
    }
    const currentTime = new Date();
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);
    const offset = (pageNumber - 1) * limit;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          where: {
            lastSeen: { gte: fiveMinutesAgo },
          },
          take: limit,
          skip: offset,
        },
        friendOf: {
          where: {
            lastSeen: { gte: fiveMinutesAgo },
          },
          take: limit,
          skip: offset,
        },
      },
    });

    const onlineFriends = user.friends;

    const onlineUsers = onlineFriends.concat(user.friendOf);
    return onlineUsers;
  }

  async getOnlineUsers(pageNumber, limit): Promise<IUser[]> {
    const offset = (pageNumber - 1) * limit;
    const onlineUsers = await this.prisma.user.findMany({
      where: {
        lastSeen: {
          gte: new Date(new Date().getTime() - 5 * 60 * 1000), //last 5 minutes
        },
      },
      take: limit,
      skip: offset,
    });

    return onlineUsers;
  }

  async updateUserStatus(userId: number, time: string): Promise<boolean> {
    const exists = await this.isUserExistById(userId);
    if (!exists) {
      this.rpcExceptionService.throwBadRequest(
        `User with ID ${userId} not found.`,
      );
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastSeen: new Date(),
      },
    });

    if (!user) {
      return false;
    }
    return true;
  }

  async getUsersInfo(users: number[]): Promise<IUser[]> {
    if (users.length === 0) {
      return [];
    }
    try {
      const usersInfo: IUser[] = await this.prisma.user.findMany({
        where: {
          id: { in: users },
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          lastSeen: true,
          profileImgUrl: true,
        },
      })
      if (!usersInfo || usersInfo.length === 0) {
        console.log("\n\n\ncached exception from user\n\n\n")
        this.rpcExceptionService.throwCatchedException({
          code: 404,
          message: 'User(s) not found'
        });
      }
      const usersIds = usersInfo.map((user) => user.id);
      
      const usersNickname = (await this.clientService.sendMessageWithPayload(
        this.client,
        { role: 'profile', cmd: 'get-users-nickname' },
        usersIds,
      ));
        
      usersInfo.forEach((user) => {
        const nickname = usersNickname.find((u) => u.user_id === user.id);
        user.nickname = nickname.nickname;
      });
        
      const sortedUsersInfo = usersInfo.sort((a, b) => users.indexOf(a.id) - users.indexOf(b.id));
      
      return sortedUsersInfo;
    } catch (error) {
    this.handlePrismaError(error);
    }
  }
} 
