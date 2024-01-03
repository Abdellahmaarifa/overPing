import { Resolver, Query, Args, Context } from '@nestjs/graphql';

import { GQLUserModel } from 'apps/gateway/src/models';
import { AuthCredentialsInput } from '../input';
import { GatewayService, UserService } from '../../services';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { AccessTokenGuard } from '../../guards/accessToken.guard';



@Resolver()
export class AuthQueryResolver {
    constructor(
        private readonly gatewayService: GatewayService,
        private readonly userService: UserService
    ) { }


    @Query(() => String)
    async helloT(): Promise<string> {
        return "hello world from server";
    }

    @Query(() => GQLUserModel)
    async findUserById(@Args('userId') userId: number): Promise<GQLUserModel> {
        const user = await this.userService.findById(userId);
        return (user);
    }


    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLUserModel])
    async findAllUsers(@Context() ctx, @Args('pageNumber') pageNumber: number): Promise<GQLUserModel[]> {
        const userId = ctx.req.user.id;
        const users: GQLUserModel[] = await this.userService.findAllUsers(userId, pageNumber);
        return users;
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => GQLUserModel)
    async getUser(@Context() { req }): Promise<GQLUserModel> {
        const user = req.user;
        return user;
    }

}
