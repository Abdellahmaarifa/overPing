import { Resolver, Query, Args, Context } from '@nestjs/graphql';

import { GQLUserModel } from 'apps/gateway/src/models';
import { AuthCredentialsInput } from '../input';
import { GatewayService, UserService } from '../../services';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import { GQLIUserModel } from '../models/gw.friends';
import { UserStatusService } from '../../services/gw.userStatus.service';
import { IUser } from '@app/common';


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
    @Query(() => GQLUserModel)
    async findUserById(@Context() cxt ,@Args('id') id: number): Promise<GQLUserModel> {
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
    @Query(() => [GQLUserModel])
    async getOnlineUsers(
        @Context() { req },
         @Args('pageNumber') pageNumber : number,
          @Args('limit') limit: number
    ): Promise<IUser[]> {
        const userId = req.user.id;
        return await this.userStatusService.getOnlineUsers(pageNumber, limit)
    }

    @UseGuards(GqlJwtAuthGuard)
    @Query(() => [GQLUserModel])
    async getOnlineFriends(
        @Context() { req },
         @Args('pageNumber') pageNumber: number,
          @Args('limit') limit: number
    ): Promise<IUser[]> {
        const userId = req.user.id;
        return await this.userStatusService.getOnlineFriends(userId, pageNumber, limit)

    }

}
