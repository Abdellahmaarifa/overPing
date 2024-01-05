import { Resolver,Query, Args, Context} from '@nestjs/graphql';
import { GwProfileService } from '../../services/gw.profile.service';
import { GQLUserProfileModel } from '../models/graphqlUserProfileModel';
import { IUserProfile } from '@app/common/profile/IUserProfile';
<<<<<<< HEAD
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
import { UseGuards } from '@nestjs/common';
=======
import { IAchievement } from '@app/common/profile/IAchievement';
import { GQLAchievement } from '../models/graphqlAchievement';
>>>>>>> 0eded71fae91fa50e7600d8c0d7ca7e2eb319fb9

@Resolver()
export class ProfileQueryResolver {
    constructor(
        private readonly profileService: GwProfileService,
    ) {}

    @Query(() => GQLUserProfileModel ,{ nullable: true })
    async findProfileById(@Args('id') id: number) : Promise<IUserProfile>{
      return await this.profileService.findProfileById(id);
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => GQLUserProfileModel ,{ nullable: true })
    async findProfileByUserId(@Context() cxt , @Args('userId') id: number) : Promise<IUserProfile>{
      const userId = cxt.req.user.id;
      const profile =  await this.profileService.findProfileByUserId(userId, id);
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
