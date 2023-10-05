import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserProfile, UserProfileInput } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { user_id: id },
    });
  }

  async createUserProfile(user_id: number, username: string): Promise<UserProfile> {
    const transaction = await this.prisma.$transaction();
    try {
      // Fetch the total number of profiles to calculate the rank
      const totalUsers = await this.prisma.userProfile.count();
      
      // Create a new user profile with the provided data
      const userProfile = await this.prisma.userProfile.create({
        data: {
          user_id,
          username,
          nickname: `${username}_${Date.now()}`,
          rank: totalUsers + 1,
          about: null,
        },
      });
      console.log('User profile created:', userProfile);
      return userProfile;
    }
    catch (error) {
      console.error('Error creating user profile:', error);
      await transaction.$rollback();
    }
    finally {
      await transaction.$commit();
    }
  }

  async updateUserProfile(id: number, input: UserProfileInput) {
    const transaction = await this.prisma.$transaction();
    try {
      const userProfile = await this.prisma.userProfile.findUnique({
        where: { user_id: id },
      });

      if (!userProfile) {
        // Take action when the User-Profile doesn't exist...
      }

      userProfile.nickname = input.nickname ?? userProfile.nickname;
      userProfile.about = input.about ?? userProfile.about;
      // Updating other fields...

      // Save the changes to the database
      const updatedProfile = await this.prisma.user.update({
      where: { user_id: id },
      data:  userProfile,
    });

      console.log('User profile updated:', userProfile);
      return updatedProfile;
    }
    catch (error) {
      console.error('Error updating user profile:', error);
      await transaction.$rollback();
    }
    finally {
      await transaction.$commit();
    }
  }

  async deleteUserProfile(user_id: number): Promise<boolean> {
    const existingProfile = await this.prisma.userProfile.findUnique({
      where: { user_id },
    });

    if (!existingProfile) {
      // Take action when the User-Profile doesn't exist...
      return false;
    }

    await this.prisma.userProfile.delete({
      where: { user_id },
    });
    return true;
  }
}