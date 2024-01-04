import { Resolver,Query, Args, UseGuards, Context} from '@nestjs/graphql';
import { GwProfileService } from '../../services/gw.profile.service';
import { GQLUserProfileModel } from '../models/graphqlUserProfileModel';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { GqlJwtAuthGuard } from '../../../auth/guards/gql.accessToken.guard';
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
      console.log(profile);
      return profile;
    }

}
