import { Injectable } from "@nestjs/common";
import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { MatchResultDto } from "../dto/matchResult.input";
import { TitleService, XpService } from "./xp.service";
import { AchievementService } from "./achievement.service";
import { WalletService } from "./wallet.service";

@Injectable()
export class GameStatusService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly rpcExceptionService: RpcExceptionService,
        private readonly xpService: XpService,
        private readonly titleService: TitleService,
        private readonly achievementService: AchievementService,
        private readonly walletService: WalletService,
    ) {}

    async updateGameStatusAndUserProfile(input: MatchResultDto) {

        const userProfile = await this.prisma.userProfile.findUnique({
            where: { user_id: input.user_id },
            include: {
                gameStatus: {
                    include: {
                        statistics: true,
                    }
                }
            }
        });
        if (!userProfile){
            this.rpcExceptionService.throwBadRequest('profile user not found');
        }
        // // Update the GameStats
        await this.setUserGameUpdates(input, userProfile);



        try {
            const { id, user_id, statistics, ...gameStatus } = userProfile.gameStatus;
            const update = await this.prisma.userProfile.update({
                where: { user_id: userProfile.user_id },
                data: {
                    xp: userProfile.xp,
                    title: userProfile.title,
                    gameStatus: {
                        update: {
                            ...gameStatus,
                            statistics: this.updateUserStatistics(input, statistics),
                        },
                    },
                },
                include: {
                    gameStatus: {
                        include: {
                            statistics: true,
                        }
                    }
                }
            })

            this.achievementService.checkForAchievements(input, update.gameStatus.statistics, update.gameStatus);
        } catch (error) {
            console.log("error:", error);
        }

    }


    private async setUserGameUpdates(input: any, userProfile: any) {
        if (input.is_winner) {
            this.handleWinnerUpdates(userProfile, input);
            this.walletService.resolveBet({userId: input.user_id,isWinner: true});
        } else {
            this.handleLoserUpdates(userProfile);
            this.walletService.resolveBet({userId: input.user_id,isWinner: false})
        }

    }

    private handleWinnerUpdates(userProfile: any, input: any) {
        const { gameStatus } = userProfile;

        gameStatus.totalMatches++;
        gameStatus.matchesWon++;
        this.updateWinStreak(gameStatus);
        userProfile.xp += this.xpService.calculateXp(input.bet, input.matchMode);
        userProfile.title = this.titleService.getUserTitle(userProfile.xp, userProfile.title);
    }

    private handleLoserUpdates(userProfile: any) {
        const { gameStatus } = userProfile;

        // /*********** Should be removed if it subtracted before ************/
        gameStatus.totalMatches++;
        gameStatus.matchesLoss++;
        this.resetWinStreak(gameStatus);
    }

    private updateWinStreak(stats: any) {
        stats.win_streak++;
        stats.best_win_streak = Math.max(stats.best_win_streak, stats.win_streak);
    }

    private resetWinStreak(stats: any) {
        stats.win_streak = 0;
    }


    private updateUserStatistics(input: MatchResultDto, statistics: any) {
        return {
            update: {
                strict_shot_goals: { increment: input.strict_shot_goals },
                rebounded_goals: { increment: input.rebounded_goals },
                starts_collected: { increment: input.starts_collected },
                clean_sheets: { increment: input.score_against ? 0 : 1 },
                successive_clean_sheets: this.handleSuccessiveCleanSheets(input, statistics),
            },
        };
    }
    

    private handleSuccessiveCleanSheets(input: any, data: any): number {
        if (input.score_against === 0) {
            return data.successive_clean_sheets + (input.score_against ? 0 : 1);
        }
        else {
            return 0;
        }
    }


}
