import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { IUser } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { GQLUserModel } from 'apps/gateway/src/models';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { GatewayService, UserService } from '../../services';
import { UserStatusService } from '../../services/gw.userStatus.service';
import { GQLIUserModel } from '../models/gw.friends';


@Resolver()
export class AuthQueryResolver {
    constructor(
        private readonly gatewayService: GatewayService,
        private readonly userService: UserService,
        private readonly userStatusService: UserStatusService,
    ) { }


    @Query(() => String)
    async helloT(): Promise<string> {
        return "hello world from server";
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => GQLIUserModel)
    async findUserById(@Context() cxt ,@Args('id') id: number): Promise<GQLIUserModel> {
        const userId = cxt.req.user.id;
        const user = await this.userService.findUserById(userId, id);
        return (user);
    }


    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLIUserModel])
    async findPagesOfUsers(@Context() ctx, @Args('pageNumber') pageNumber: number, @Args('pageSize') pageSize: number): Promise<GQLIUserModel[]> {
        const userId = ctx.req.user.id;
        const users = await this.userService.findPagesOfUsers(userId, pageNumber, pageSize);
        return users;
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLIUserModel])
    async findAllUsers(@Context() ctx): Promise<GQLIUserModel[]> {
        const userId = ctx.req.user.id;
        const users = await this.userService.findAllUsers(userId);
        return users;
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => GQLUserModel)
    async getUser(@Context() { req }): Promise<GQLUserModel> {
        const user = req.user;
        return user;
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLIUserModel])
    async getOnlineUsers(
        @Context() { req },
         @Args('pageNumber') pageNumber : number,
          @Args('limit') limit: number
    ): Promise<IUser[]> {
        const userId = req.user.id;
        return await this.userStatusService.getOnlineUsers(pageNumber, limit)
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLIUserModel])
    async getOnlineFriends(
        @Context() { req },
         @Args('pageNumber') pageNumber: number,
          @Args('limit') limit: number
    ): Promise<IUser[]> {
        const userId = req.user.id;
        return await this.userStatusService.getOnlineFriends(userId, pageNumber, limit)

    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLIUserModel])
    async searchUser(
        @Context() { req },
         @Args('pageNumber') pageNumber: number,
          @Args('limit') limit: number,
          @Args('username') username: string,
    ): Promise<IUser[]> {
        const userId = req.user.id;
        return await this.userService.searchUser(userId, pageNumber, limit, username);

    }

}
