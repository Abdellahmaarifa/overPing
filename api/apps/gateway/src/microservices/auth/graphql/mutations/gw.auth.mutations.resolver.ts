import {
  Resolver,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import {
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { GatewayService, UserService } from '../../services';
import { AuthCredentialsInput, UserCreationInput } from '../input';
import { UserWithAccessModel } from 'apps/gateway/src/models';
import { LoggerService, AuthResponseDto } from '@app/common';
import { GqlCurrentUser } from '../decortor/gql.user.decorator';
import { GqlJwtRefreshGuard } from '../../guards/gql.refreshToken.guard';
import { JwtPayloadDto } from '@app/common/auth/dto/JwtPayloadDto';
import { UserAccessAuthorizationGuard } from '../../guards/user-auth.guard';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';


@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: GatewayService,
    private readonly userService: UserService,
    private readonly loger: LoggerService) { }

  @HttpCode(200)
  @Mutation((returns) => UserWithAccessModel)
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,): Promise<UserWithAccessModel> {
    const response= await this.authService.signIn(authCredentialsInput);
  
    const refreshToken = response.refreshToken;
    context.res.cookie('Refresh_token', refreshToken, {
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
    const response: AuthResponseDto = await this.authService.signUp(userCreationInput);
    ctx.res.cookie('Refresh_token', [...response.refreshToken], {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return (response);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async logOut(@Args("id") id: number) : Promise<boolean>{
     return this.authService.logOut(id);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async removeUser(@Args("id") id: number): Promise<boolean> {
    return this.userService.removeUser(id);
  }

  @UseGuards(GqlJwtRefreshGuard)
  @Mutation(() => String)
  async refresh(@GqlCurrentUser() user: any): Promise<any> {
    const payload: JwtPayloadDto = {
      id: user.id,
      username: user.username
    }
    const result = await this.authService.refresh(payload);
    return (result);
  }

}
