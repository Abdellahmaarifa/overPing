import { Resolver,Query, Args} from '@nestjs/graphql';
import { GwProfileService } from '../../services/gw.profile.service';
import { GQLUserProfileModel } from '../models/graphqlUserProfileModel';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { IAchievement } from '@app/common/profile/IAchievement';
import { GQLAchievement } from '../models/graphqlAchievement';

@Resolver()
export class ProfileQueryResolver {
    constructor(
        private readonly profileService: GwProfileService,
    ) {}

    @Query(() => GQLUserProfileModel ,{ nullable: true })
    async findProfileById(@Args('id') id: number) : Promise<IUserProfile>{
      return await this.profileService.findProfileById(id);
    }

    @Query(() => GQLUserProfileModel ,{ nullable: true })
    async findProfileByUserId(@Args('userId') userId: number) : Promise<IUserProfile>{
      const profile =  await this.profileService.findProfileByUserId(userId);
      console.log(profile);
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
