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
import { 
  AuthCredentialsInput,
  UserCreationInput,
  TwoFActorAuthInput
 } from '../input';
import { UserWithAccessModel , GQLUserModel} from 'apps/gateway/src/models';
import { LoggerService, AuthResponseDto } from '@app/common';
import { GqlCurrentUser } from '../decortor/gql.user.decorator';
import { GqlJwtRefreshGuard } from '../../guards/gql.refreshToken.guard';
import { JwtPayloadDto } from '@app/common/auth/dto/JwtPayloadDto';
import { UserAccessAuthorizationGuard } from '../../guards/user-auth.guard';
import { FileUpload , GraphQLUpload} from 'graphql-upload';


@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: GatewayService,
    private readonly userService: UserService,
    private readonly loger: LoggerService) { }

   

  @Mutation((returns) => GQLUserModel)
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,): Promise<GQLUserModel> {
    const response= await this.authService.signIn(authCredentialsInput);
    const { res } = context;

    res.cookie('Refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    
    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return (response.user);
  }


  @Mutation((returns) => GQLUserModel)
  async signUp(
    @Context() ctx,
    @Args('userCreationInput') userCreationInput: UserCreationInput,
    @Args('profileImage', { type: () => GraphQLUpload, nullable: true }) file?: FileUpload): Promise<GQLUserModel> {
    console.log("signUp action activated");
    const response = await this.authService.signUp(userCreationInput, file);
    const {res} = ctx;
    res.cookie('Refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    
    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return (response.user);
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

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => String)
  async enableTwoFactorAuth(@Args('id') id: number): Promise<string>{
    return this.authService.enableTwoFactorAuth(id);
  }

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async verifyTwoFactorAuth(@Args('id') id: number, @Args('code') code : string): Promise<boolean>{
    const twoFActorAuthInput : TwoFActorAuthInput = {
      id,
      code
    }
    return this.authService.verifyTwoFactorAuth(twoFActorAuthInput);
  }
  
  @Mutation(() => GQLUserModel)
  async authenticate_2fa(@Context() context, @Args('id') id: number, @Args('code') code: string): Promise<GQLUserModel>{
    const twoFActorAuthInput : TwoFActorAuthInput = {
      id,
      code,
    }
    const response =  await this.authService.authenticate_2fa(twoFActorAuthInput);
    const { res } = context;
    res.cookie('Refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    return (response.user);
  }
}
