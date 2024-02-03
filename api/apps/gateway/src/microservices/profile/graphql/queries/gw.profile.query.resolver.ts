import { IAchievement } from '@app/common/profile/IAchievement';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { GwProfileService } from '../../services/gw.profile.service';
import { GQLAchievement } from '../models/graphqlAchievement';
import { GQLUserProfileModel } from '../models/graphqlUserProfileModel';

@Resolver()
export class ProfileQueryResolver {
    constructor(
        private readonly profileService: GwProfileService,
    ) {}

    // @Query(() => GQLUserProfileModel ,{ nullable: true })
    // async findProfileById(@Args('id') id: number) : Promise<IUserProfile>{
    //   return await this.profileService.findProfileById(id);
    // }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => GQLUserProfileModel)
    async findProfileByUserId(@Context() cxt , @Args('userId') id: number) : Promise<IUserProfile>{
      console.log("search about profile id: ++++++++++++++++++++++++++++++++++++++++++++++======>", id)
      const userId = cxt.req.user.id;
      const profile = await this.profileService.findProfileByUserId(userId, id);
      return profile;
    }

    @Query(() => [GQLAchievement] ,{ nullable: true })
    async getUserAchievements(@Args('userId') userId: number): Promise<IAchievement[]> {
      return this.profileService.getUserAchievements(userId);
    }

    @Query(() => [GQLAchievement] ,{ nullable: true })
    async getAllAchievements(): Promise<IAchievement[]> {
    return this.profileService.getAllAchievements();
  }
}
