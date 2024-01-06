import { Injectable } from '@nestjs/common';
import { IAuthUser, IUser } from '@app/common/auth/interface/auth.user.interface';
import { UserCreationDto } from '../dto';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import * as argon2 from 'argon2';
import { SignInCredentialsDto } from '../dto';
import { RpcExceptionService } from '@app/common/exception-handling';
import { UpdateProfileDto } from '../dto/user.updateProfileId.dto';
import { User, Prisma } from '@prisma/client';
import { PrismaError } from '@app/common/exception-handling';
import { UpdateUserDto } from '../dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly rpcExceptionService: RpcExceptionService,
    private prisma: PrismaService,
  ) {}

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

    if (userFound.twoStepVerificationEnabled) {
      return null;
      // this.rpcExceptionService.throwUnauthorised("Two-factor authentication is required. Please provide the 2FA code.")
    }
    return userFound;
  }

  async createUser({
    password,
    username,
    googleId,
    fortyTwoId,
    email,
  }: UserCreationDto): Promise<IAuthUser> {
    try {
      const exists = await this.isUserExist(username);
      if (exists) {
        throw this.rpcExceptionService.throwBadRequest(`Resource already exists`);
      }
      console.log('the error: ', password, username);
      const hashedPassword = password ? await argon2.hash(password) : undefined;

      return this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          googleId,
          fortyTwoId,
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

  async findUserByUsername(username: string): Promise<User> {
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

  async findUserById(userId: number, id: number) : Promise<IUser> {
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

  async findAllUsers( userId: number ): Promise<IUser[]> {
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
  }


  async findPagesOfUsers(
    pageNumber: number = 1,
    pageSize: number = 10,
    userId: number
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
      console.log('error', error);

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
        'An unexpected error occurred',
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
    console.log("check if user")
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
    console.log('friends id: ', friendIds);
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
      },
    });
    console.log('friends: ', friends);
    return friends;
  }


  async getOnlineFriends( userId, pageNumber, limit ): Promise<IUser[]> {
    const exists = await this.isUserExistById(userId);
    if (!exists) {
      this.rpcExceptionService.throwBadRequest(
        `User with ID ${userId} not found.`,
      );
    }

    const friends = await this.prisma.user.findMany({
      where: {
        friends: {
          some: {
            id: userId,
            lastSeen: {
              gte: new Date(new Date().getTime() - 5 * 60 * 1000), 
            },
          },
        },
      },
      take: limit,
      skip: (pageNumber - 1) * limit,
    });

    return friends; 
  }


  async getOnlineUsers( pageNumber, limit ): Promise<IUser[]> {
    const onlineUsers = await this.prisma.user.findMany({
      where: {
        lastSeen: {
          gte: new Date(new Date().getTime() - 5 * 60 * 1000), //last 5 minutes 
        },
      },
      take: limit,
      skip: (pageNumber - 1) * limit,
    });

    return onlineUsers;
  }


  async updateUserStatus(userId: number , time : number) : Promise<boolean>{
    const exists = await this.isUserExistById(userId);
    if (!exists) {
      this.rpcExceptionService.throwBadRequest(
        `User with ID ${userId} not found.`,
      );
    }
    const user = await this.prisma.user.update({
      where: { id: userId },
      data:{
        lastSeen: new Date(time)
      }
    });

    if (!user) {
      return false;
    }
    return true;
  }
}
