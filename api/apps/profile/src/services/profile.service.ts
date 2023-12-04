import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { UserTitle } from "../interface/title.user.interface";
import { CreateProfileDto } from "../dto/createProfileDto";
import { UserProfile } from "@prisma/client";
import { UpdateProfileDto } from "../dto/updateUserProfileDto";
import { UpdateWalletDto } from "../dto/updateUserWalletDto";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {

  }

  async create(input: CreateProfileDto): Promise<UserProfile> {
    try {
      // Fetch the total number of profiles to calculate the default rank
      const userRank = await this.getLastUserRank();

      // Create a new user profile with the provided data
      const userProfile = await this.prisma.userProfile.create({
        data: {
          user_id: input.userId,
          nickname: `${input.username.replace(/\s/g, '')}${Date.now()}`,
          title: UserTitle.Challenger_10,
          rank: userRank
        },
      });

      const wallet = await this.prisma.wallet.create({
        data: {
          userProfile: { connect: { id: userProfile.id } },
        },
      });

      const updatedUserProfile = await this.prisma.userProfile.update({
        where: { id: userProfile.id },
        data: { wallet: { connect: { id: wallet.id } } },
      });
  
      return updatedUserProfile;
    }
    catch (error) {
      this.handlePrismaError(error);
    }
  }

  private async getLastUserRank(): Promise<number> {
    const lastUserRank = await this.prisma.userProfile.count();
    return lastUserRank + 1;
  }


  async findOne(id: number): Promise<UserProfile> {
    try {
      // Get User-Profile with the provided id
      const userProfile = await this.prisma.userProfile.findUnique({
        where: { id: id },
      });
      return userProfile;
    }
    catch (error) {
      this.handlePrismaError(error);
    }
  }



  async update(id: number, input: UpdateProfileDto): Promise<boolean> {
    try {
      // Save the changes to the database
      await this.prisma.userProfile.update({
        where: { id },
        data: input,
      });
      return true;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
  

 

  async remove(id: number): Promise<boolean> {
    try {
      const existingProfile = await this.prisma.userProfile.findUnique({
        where: { id },
      });
      console.log(existingProfile);
      if (!existingProfile) {
        this.rpcExceptionService.throwNotFound(`Profile of User ID ${id} not found`);
      }

      await this.prisma.userProfile.delete({
        where: {
          id: id
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