import { Resolver,Query, Args} from '@nestjs/graphql';

import { GQLUserModel } from 'apps/gateway/src/models';
import { AuthCredentialsInput } from '../input';
import { GatewayService, UserService } from '../../services';
import {    UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';

@Resolver()
export class AuthQueryResolver {
    constructor(
	private readonly gatewayService: GatewayService,
	private readonly userService: UserService
    ) {}
    
    
    @Query(() => GQLUserModel)
    async findUserById(@Args('userId') userId: number) : Promise<GQLUserModel>{
	const user = await this.userService.findById(userId);
	return (user);
    }


    @Query(() => [GQLUserModel]) 
    async findAllUsers(): Promise<GQLUserModel[]> {
	const users: GQLUserModel[] = await this.userService.findAll();
	return users;
    }

}
