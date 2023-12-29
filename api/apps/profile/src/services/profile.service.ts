import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { UserTitle } from "../interface/title.user.interface";
import { CreateProfileDto } from "../dto/createProfileDto";
import { UserProfile } from "@prisma/client";
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
    try {
      const existingProfile = await this.prisma.userProfile.findUnique({
        where: { user_id: userId },
      });
      console.log(existingProfile);
      if (!existingProfile) {
        this.rpcExceptionService.throwNotFound(`Profile of User ID ${userId} not found`);
      }

      await this.prisma.userProfile.delete({
        where: {
          user_id: userId
        },
      });
      return true;
    }
    catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: ("Failed to delete profile: Unknown error") + error
      });
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