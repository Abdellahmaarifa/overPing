import {
  Resolver,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import {
  HttpCode,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { GatewayService, UserService } from '../../services';
import { AuthCredentialsInput, UserCreationInput } from '../input';
import { UserWithAccessModel } from 'apps/gateway/src/models';
import { LoggerService, AuthResponseDto } from '@app/common';
import { GQLUserModel } from 'apps/gateway/src/models';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { GqlCurrentUser } from '../decortor/gql.user.decorator';
import { GqlJwtRefreshGuard } from '../../guards/gql.refreshToken.guard';
import { Cookies } from 'apps/gateway/src/decortor/cookies.decorator';
import { GetAccessTokenDto } from '@app/common/auth/dto/getAccessTokenDto';
import { UserAccessAuthorizationGuard } from '../../guards/user-auth.guard';


@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly gatewayService: GatewayService,
    private readonly userService: UserService,
    private readonly loger: LoggerService) { }

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
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,): Promise<UserWithAccessModel> {

    this.loger.actionLog("gateWay", "mutation/signIn()", "the user starting the signIn action", authCredentialsInput);
    const response = await this.gatewayService.signIn(authCredentialsInput);
    if (response.error) {
      throw response.error;
    }
    const refreshTokenStr = response.refreshToken;
    console.log("copy refresh : ", response);
    context.res.cookie('Refresh_token', refreshTokenStr, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return (response);
  }


  @Mutation((returns) => UserWithAccessModel)
  async signUp(
    @Context() ctx,
    @Args('userCreationInput') userCreationInput: UserCreationInput): Promise<UserWithAccessModel> {
    console.log("gateway======> starting the singup", userCreationInput);
    this.loger.actionLog("gateWay", "mutation/signUp()", "the user starting the signUp action", userCreationInput);
    const response: AuthResponseDto = await this.gatewayService.signUp(userCreationInput);

    if (response.error) {
      throw response.error
    }

    ctx.res.cookie('Refresh_token', [...response.refreshToken], {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    console.log("gateway======>>the response for the mutation : ", response);
    return (response);
  }
  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeUser(@Args("id") id: number): Promise<boolean> {
    console.log("args id : ", id, "current user: ");
    return this.userService.removeUser(id);
  }

  @UseGuards(GqlJwtRefreshGuard)
  @Mutation(() => String)
  async refresh(@GqlCurrentUser() user: any): Promise<any> {
    const payload: GetAccessTokenDto = {
      id: user.id,
      username: user.username
    }
    const result = await this.gatewayService.refresh(payload);
    console.log("gateway ===========> result: [", result, "]");
    return (result);
  }
}
