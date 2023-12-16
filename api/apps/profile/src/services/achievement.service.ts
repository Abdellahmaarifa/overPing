import { Injectable } from "@nestjs/common";
import { RpcExceptionService } from "@app/common/exception-handling";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "apps/profile/prisma/prisma.service";

@Injectable()
export class AchievementService {
  constructor (
    private rpcExceptionService: RpcExceptionService,
    private prisma: PrismaService,
  ) {}

  async checkForAchievements(current_game: any, total_games: any, stats: any) {
    this.Wand_Wielder(total_games);
    this.Bouncing_Broomstick(current_game);
    this.Borderline_Maestro(total_games);
    this.Rebound_Ruler(total_games);
    this.Sorcerers_Apprentice(stats);
    this.Starstruck(total_games);
    this.Clean_Sheet_Connoisseur(total_games);
    this.Successive_Shutouts(total_games);
    // this.Tournament_Triumph(total_games);
    // this.Tournament_Trailblazer(current_game);
  }

  /********** Check For achievements **********/
  async Wand_Wielder(total_games: any) {
    if (total_games.rebounded_goals >= 100) {
      this.addAchievementToUserProfile(total_games.user_id, "Wand Wielder");
    }
  }

  async Bouncing_Broomstick(current_game: any) {
    if (current_game.strict_shot_goals >= 5) {
      this.addAchievementToUserProfile(current_game.user_id, "Bouncing Broomstick");
    }
  }

  async Borderline_Maestro(total_games: any) {
    if (total_games.strict_shot_goals >= 50) {
      this.addAchievementToUserProfile(total_games.user_id, "Borderline Maestro");
    }
  }

  async Rebound_Ruler(total_games: any) {
    if (total_games.rebounded_goals >= 25) {
      this.addAchievementToUserProfile(total_games.user_id, "Rebound Ruler");
    }
  }

  
  async Sorcerers_Apprentice(stats: any) {
    if (stats.best_win_streak >= 10) {
      this.addAchievementToUserProfile(stats.user_id, "Sorcerer's Apprentice");
    }
  }

  async Starstruck(total_games: any) {
    if (total_games.starts_collected >= 100) {
      this.addAchievementToUserProfile(total_games.user_id, "Starstruck");
    }
  }

  async Clean_Sheet_Connoisseur(total_games: any) {
    if (total_games.clean_sheets >= 20) {
      this.addAchievementToUserProfile(total_games.user_id, "Clean Sheet Connoisseur");
    }
  }

  async Successive_Shutouts(total_games: any) {
    if (total_games.successive_clean_sheets >= 5) {
      this.addAchievementToUserProfile(total_games.user_id, "Successive Shutouts");
    }
  }

  async Tournament_Triumph(total_games: any) {
    // if (total_games.best_tournaments_win_streak >= 3) {
    //   this.addAchievementToUserProfile(total_games.user_id, "Tournament Triumph");
    // }
  }

  async Tournament_Trailblazer(current_game: any) {
  //   if (false) {
  //     this.addAchievementToUserProfile(current_game.user_id, "Tournament Trailblazer");
  //   }
  }

  /*** Add an Achievement to a User Profile ***/
  async addAchievementToUserProfile(user_id: number, achievement_title: string) {
    const achievement_id = await this.getAchievementID(achievement_title);
    if (achievement_id !== null) {
      this.setAchievement(user_id, Number(achievement_id));
    }
  }

  /*** Get the Achievement ID based on the title ***/
  async getAchievementID(achievementTitle: string) : Promise<number|null> {
    const achievementId = await this.prisma.achievement.findFirst({
      where: {
        title: achievementTitle,
      },
      select: {
        id: true,
      },
    })
    .then((result) => (result ? result.id : null));

    if (achievementId !== null) {
      console.log(`Achievement ID for '${achievementTitle}': ${achievementId}`);
    } else {
      console.log(`Achievement with title '${achievementTitle}' not found.`);
    }
    return achievementId;
  }

  async setAchievement(user_id: number, achievement_id: number) {
    try {
      // Check if the user already has the achievement
      const userHasAchievement = await this.prisma.userProfileToAchievement.findFirst({
        where: {
          userProfileId: user_id,
          achievementId: achievement_id,
        },
      });

      if (!userHasAchievement) {
        // Add the achievement to the user profile
        await this.prisma.userProfileToAchievement.create({
          data: {
            userProfileId: user_id,
            achievementId: achievement_id,
          },
        });
        console.log('Achievement added to the user profile.');
      } else {
        console.log('User already has the achievement.');
      }
    }
    catch (error) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: "Failed to add the achievement to user profile: Anknown error"
      });
    }
  }

}

/*
****** current_game *******
user_id
score_for
score_against
is_winner
strict_shot_goals
rebounded_goals
starts_collected
matchMode

******* game_stats ********
games_won
games_played
tournaments_played
tournaments_won
win_streak
best_win_streak

******* total_games *********
strict_shot_goals
rebounded_goals
starts_collected
clean_sheets
successive_clean_sheets
*/

/*
[    Title        |            Requirement                          ]
|-----------------|-------------------------------------------------|
|  Wand Wielder   |  Score 100 goals using only magical ricochets   |
|-----------------|-------------------------------------------------|
|    Bouncing     |  Score 5 points in a single match without       |
|   Broomstick    |  letting the ball touch the boarders            |
|-----------------|-------------------------------------------------|
|    Borderline   |  Score 50 strict shot goals without letting     |
|     Maestro     |  the ball touch the boarders                    |
|-----------------|-------------------------------------------------|
|     Rebound     |  Achieve 25 rebounded goals, mastering the art  |
|      Ruler      |  of utilizing boarders to your advantage        |
|-----------------|-------------------------------------------------|
|   Sorcerer's    |  Play 10 matches without losing a single one    |
|   Apprentice    |                                                 |
|-----------------|-------------------------------------------------|
|   Starstruck    |  Collect 100 stars in total across              |
|                 |  all games played                               |
|-----------------|-------------------------------------------------|
|   Clean Sheet   |  Achieve 20 clean sheets in total               |
|   Connoisseur   |                                                 |
|-----------------|-------------------------------------------------|
|   Successive    |  Achieve 5 successive clean sheets in a row     |
|    Shutouts     |                                                 |
|-----------------|-------------------------------------------------|
|                                                                   |
|      *** The achievements below doesn't accessible yet ***        |
|                                                                   |
|-----------------|-------------------------------------------------|
|   Tournament    |  Win a tournament without conceding a single    |
|   Trailblazer   |  point                                          |
|-----------------|-------------------------------------------------|
|    Tournament   |  Win 3 tournaments in a row                     |
|     Triumph     |                                                 |
[-------------------------------------------------------------------]
*/