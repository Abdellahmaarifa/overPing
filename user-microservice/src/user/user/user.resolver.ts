import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserProfile, UserProfileInput } from '../entity/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation('createUserProfile')
  // async createUserProfile(
  //   @Args('user_id') user_id: number, 
  //   @Args('username') username: string
  // ): Promise<UserProfile> {
  //   return this.userService.createUserProfile(user_id, username);
  // }

  @Mutation('updateUserProfile')
  async updateUserProfile(
    @Args('user_id') user_id: number, 
    @Args('input') input: UserProfileInput
  ): Promise<UserProfile> {
    return this.userService.updateUserProfile(user_id, input);
  }

  // @Mutation('deleteUserProfile')
  // async deleteUserProfile(@Args('user_id') user_id: number): Promise<UserProfile> {
  //   return this.userService.deleteUserProfile(user_id);
  // }
}