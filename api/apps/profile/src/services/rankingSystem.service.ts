import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { Cron, CronExpression, } from '@nestjs/schedule';


export class PlayerStatsDto {
    wins: number;
    totalMatches: number;
    xp: number;
}


export class UserProfileRankingReturn {
    user_id: number;
    rank: number;
    xp: number;
    gameStatus: {
        matchesWon: number;
        totalMatches: number;
    };
}

@Injectable()
export class RankingService {

    constructor(
        private readonly prisma: PrismaService,
    ) {
        // this.calculateAllplayerRanking();
    }


    @Cron(CronExpression.EVERY_MINUTE)
    async calculateAllplayerRanking() {
        console.log('runing.....')
        const userprofiles = await this.getAllProfiles();

        userprofiles.forEach((player) => {
            player.rank = this.calculatePlayerRanking({
                wins: player.gameStatus.matchesWon,
                totalMatches: player.gameStatus.totalMatches,
                xp: player.xp,
            });
        })

        userprofiles.sort((a, b) => b.rank - a.rank);

        userprofiles.forEach(async (player, index) => {
            await this.updatePlayerDisplayRank(player.user_id, index + 1, player.rank);
        });
    }

    calculateWinRate(wins: number, totalMatches: number): number {
        if (totalMatches === 0) {
            return (0);
        }
        return (wins / totalMatches) * 100;
    }

    calculateXPEfficiency(xp: number, totalMatches: number): number {
        if (totalMatches === 0) {
            return (0);
        }
        return xp / totalMatches;
    }

    calculateWeightedRanking(winRate: number, xpEfficiency: number, winRateWeight: number, xpWeight: number): number {
        return (winRate * winRateWeight + xpEfficiency * xpWeight) / (winRateWeight + xpWeight);
    }

    calculatePlayerRanking(playerStats: PlayerStatsDto): number {
        const winRateWeight = 0.6;
        const xpWeight = 0.4;
        const winRate = this.calculateWinRate(playerStats.wins, playerStats.totalMatches);
        const xpEfficiency = this.calculateXPEfficiency(playerStats.xp, playerStats.totalMatches);

        return this.calculateWeightedRanking(winRate, xpEfficiency, winRateWeight, xpWeight);
    }



    async updatePlayerDisplayRank(userId: number, newDisplayRank: number, newRank): Promise<void> {
        await this.prisma.userProfile.update({
            where: { user_id: userId },
            data: {
                displayRank: newDisplayRank,
                rank: newRank
            },
        });
    }

    async getAllProfiles(): Promise<UserProfileRankingReturn[]> {
        return await this.prisma.userProfile.findMany({
            select: {
                user_id: true,
                rank: true,
                xp: true,
                gameStatus: {
                    select: {
                        matchesWon: true,
                        totalMatches: true,
                    },
                },
            },
        });
    }


}