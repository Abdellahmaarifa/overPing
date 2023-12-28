import {
    Resolver,
    Mutation,
    Args,
    Context,
} from '@nestjs/graphql';
import { GwProfileService } from '../../services/gw.profile.service';
import { CreateProfileInput } from '../input/createUserProfileInput';
import { GQLUserProfileModel } from '../models/graphqlUserProfileModel';
import { UpdateProfileInput } from '../input/updateUserProfileInput';
@Resolver()
export class UserProifleMutationsResolver {
    constructor(
        private readonly profileService: GwProfileService,
    ) { }

    @Mutation(() => GQLUserProfileModel)
    async createProfile(@Args('profileCredentials') profileCredentials: CreateProfileInput): Promise<GQLUserProfileModel> {
        return this.profileService.createUserProfile(profileCredentials);
    }

    @Mutation(()=> Boolean)
    async removeUserProfile(@Args('id') id: number) : Promise<boolean>{
        return this.profileService.removeProfile(id);
    }

    @Mutation(()=> Boolean)
    async UpdateUserProfile(@Args('id') id: number, @Args('UpdateProfileInput') updateInput : UpdateProfileInput) : Promise<boolean>{
        return this.profileService.updateUserProfile(id, updateInput);
    }


}
