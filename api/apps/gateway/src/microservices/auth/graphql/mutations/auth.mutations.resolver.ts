import { 
    Resolver,
    Mutation ,
    Args,
    Context,
} from '@nestjs/graphql';
import { 
  HttpCode,
  UseGuards
 } from '@nestjs/common';
import { GatewayService } from 'apps/gateway/src/microservices/auth/services/auth.service';
import { AuthCredentialsInput, UserCreationIput } from '../input';
import { UserWithAccessModel } from 'apps/gateway/src/models';

@Resolver()
export class AuthMutationsResolver {
    constructor(private readonly gatewayService: GatewayService) {}

// @HttpCode(200)
// @Mutation((returns) => UserWithAccessModel)
// async singnUp(
//   @Context() Context,
//   @Args('auth')
// ){}



@HttpCode(200)
@Mutation((returns) => UserWithAccessModel)
  async signIn(
    @Context() context,
    @Args('authCredentials')  authCredentialsInput : AuthCredentialsInput,) : Promise<UserWithAccessModel>{
    const response = await this.gatewayService.signIn(authCredentialsInput);
    context.res.cookie('refresh_token', [...response.refreshToken], {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      });
    return (response);
  }


@Mutation((returns) => UserWithAccessModel)
  async singUp(
    @Context() ctx,
    @Args('userCreationIput') userCreationIput :  UserCreationIput): Promise<UserWithAccessModel>{
      const response = await this.gatewayService.signUp(userCreationIput);
      ctx.res.cookie('refresh_token', [...response.refreshToken], {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      });
      return (response);
    }
  
  @Mutation((returns)=> String)
  async hello(): Promise<String>{
    return await this.gatewayService.hello();
  }
}
