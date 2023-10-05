import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserProfile } from '../entity/user.entity';

@Injectable()
export class HelpersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserXPAndRank(user_id: number, xpEarned: number): Promise<UserProfile> {
    const transaction = await this.prisma.$transaction();
    try {
      // Update XP points
      const updatedProfile = await this.prisma.userProfile.update({
        where: { user_id },
        data: {
          xp: {
            increment: xpEarned,
          },
        },
      });
  
      // Recalculate rank based on updated XP
      const usersRankedByXP = await this.prisma.userProfile.findMany({
        orderBy: { xp: 'desc' },
      });
  
      const updatedRank = usersRankedByXP.findIndex((user: UserProfile) => user.user_id === user_id) + 1;
  
      // Update the user's rank
      const finalProfile = await this.prisma.userProfile.update({
        where: { user_id },
        data: {
          rank: updatedRank,
        },
      });
  
      console.log('User XP and rank updated:', finalProfile);
      return finalProfile;
    }
    catch (error) {
      console.error('Error updating user XP and rank:', error);
      await transaction.$rollback();
    }
    finally {
      
    }
  }

}