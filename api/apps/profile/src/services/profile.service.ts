import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { UserTitle } from "../interface/title.user.interface";
import { CreateProfileDto } from "../dto/createProfileDto";
import { Achievement, UserProfile, UserProfileToAchievement } from "@prisma/client";
import { UpdateProfileDto } from "../dto/updateUserProfileDto";
import { UpdateWalletDto } from "../dto/updateUserWalletDto";
import { Prisma } from "@prisma/client";
import { IUserProfile } from "@app/common/profile/IUserProfile";

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {
  }

  async create(input: CreateProfileDto): Promise<UserProfile> {
    try {

      // Create a new user profile with the provided data
      const userProfile = await this.prisma.userProfile.create({
        data: {
          user_id: input.userId,
          nickname: `${input.username.replace(/\s/g, '')}${Date.now()}`,
          title: UserTitle.Challenger_10,
          wallet: { create: {} },
          gameStatus: {
            create: {
              statistics: { create: {} }
            }
          }
        },
        include: {
          gameStatus: {
            include: {
              statistics: true,
            },
          },
          wallet: true,
        },
      });

      return userProfile;
    }
    catch (error) {
      this.handlePrismaError(error);
    }
  }



  async findOne(id: number): Promise<IUserProfile> {
    try {
      // Get User-Profile with the provided id
      const userProfile = await this.prisma.userProfile.findUnique({
        where: { id: id },
        include: {
          wallet: true,
          gameStatus: true,
        },
      });
      return userProfile;
    }
    catch (error) {
      this.handlePrismaError(error);
    }
  }


  async findOneByUserId(userId: number): Promise<IUserProfile> {
    try {
      // Get User-Profile with the provided  user id
      const userProfile = await this.prisma.userProfile.findUnique({
        where: { user_id: userId },
        include: {
          wallet: true,
          gameStatus: true,
        },
      });
      return userProfile;
    }
    catch (error) {
      this.handlePrismaError(error);
    }
  }

  
  
  async getUserAchievements(userId: number): Promise<Achievement[]> {
    try {
      const achievementIds = await this.prisma.userProfileToAchievement.findMany({
          where: {
            userProfileId: userId,
          },
          include: { achievement: true },
        }).then(
          (userProfileToAchievements: UserProfileToAchievement[]) =>
          userProfileToAchievements.map((dt) => dt.achievementId)
        );
      if (!achievementIds) {
        this.rpcExceptionService.throwNotFound(`No achievements for User ID ${userId}`);
      }
      return await this.prisma.achievement.findMany({
        where: {
          id: { in: achievementIds },
        }
      }); 
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async getAllAchievements(): Promise<Achievement[]> {
    try {
      return this.prisma.achievement.findMany();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
  
  
  
  async update(userId: number, input: UpdateProfileDto): Promise<boolean> {
    try {
      // Save the changes to the database
      await this.prisma.userProfile.update({
        where: { user_id: userId },
        data: input,
      });
      return true;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(userId: number): Promise<boolean> {
    const existingProfile = await this.prisma.userProfile.findUnique({
      where: { user_id: userId },
    });
    console.log("profile to delete : ",existingProfile);
    if (!existingProfile) {
      this.rpcExceptionService.throwNotFound(`Profile of User ID ${userId} not found`);
    }
    try {

      await this.prisma.$transaction([
        this.prisma.wallet.delete({
          where: { user_id: userId },
        }),
        this.prisma.statistics.delete({
          where: { user_id: userId}
        }),
        this.prisma.gameStatus.delete({
          where: { user_id: userId },
        }),
        this.prisma.userProfile.delete({
          where: { user_id: userId },
        }),
        this.prisma.userProfileToAchievement.deleteMany({
          where: { userProfileId: userId },
        }),
      ]);
      return true;
    }
    catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: ("Failed to delete profile: Unknown error")
      });
    }
  }

  async getUsersNickname(userIds: number[]): Promise<{ user_id: number, nickname: string }[]> {
    try {
      if (userIds.length === 0) {
        return [];
      }
      const users = await this.prisma.userProfile.findMany({
        where: {
          user_id: { in: userIds },
        },
        select: {
          user_id: true,
          nickname: true,
        },
      });
      return users;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = new PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
      prismaError.handlePrismaError();
    } else {
      throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
    }
  }

}