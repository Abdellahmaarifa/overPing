import { Resolver, Mutation, Query, Args} from '@nestjs/graphql';
import { HttpCode } from '@nestjs/common';
import { GQLUserModel } from 'apps/gateway/src/models';
import { AuthCredentialsInput } from '../input';
import { GatewayService } from '../../services';
@Resolver()
export class AuthQueryResolver {
    constructor(private readonly gatewayService: GatewayService) {}
    
@Query(() => String)
  async hello(): Promise<any> {
    // const result =  await this.gatewayService.getHello();
    const result = 'string'
    return (result)
  }
// @HttpCode(200)
// @Mutation((returns) => GQLUserModel)
//   async signIn( @Args('authCredentials')  authCredentialsInput : AuthCredentialsInput,) : Promise<any>{
//     return await this.gatewayService.signIn(authCredentialsInput);
//   }
}
