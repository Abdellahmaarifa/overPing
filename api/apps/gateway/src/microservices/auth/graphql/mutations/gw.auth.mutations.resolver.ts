import { LoggerService } from '@app/common';
import { JwtPayloadDto } from '@app/common/auth/dto/JwtPayloadDto';
import {
  UseGuards
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { GQLUserModel } from 'apps/gateway/src/models';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GqlJwtRefreshGuard } from '../../guards/gql.refreshToken.guard';
import { GQTwoFAGuard } from '../../guards/gql.twoFa.grade';
import { UserAccessAuthorizationGuard } from '../../guards/user-auth.guard';
import { GatewayService, UserService } from '../../services';
import { GqlCurrentUser } from '../decortor/gql.user.decorator';
import {
  AuthCredentialsInput,
  TwoFActorAuthInput,
  UserCreationInput
} from '../input';
import { TwoFAModel } from 'apps/gateway/src/models/graphqlTwoFAModel';
import {HttpException} from "@nestjs/common";

@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: GatewayService,
    private readonly userService: UserService,
    private readonly loger: LoggerService) { }

   

  @Mutation((returns) => GQLUserModel )
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,): Promise<GQLUserModel> {
    const response= await this.authService.signIn(authCredentialsInput);
    const { res } = context;

    if (response.twoFactorAuth){
      res.cookie('twoFactorAuth', response.twoFactorAuth, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
      });
      throw new HttpException("Two-factor", 401);
    }

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
  async logOut(
    @Args("id") id: number,
    @Context() ctx,
  ) : Promise<boolean>{
    const {res } = ctx;
    res.clearCookie("Access_token")
    res.clearCookie("Refresh_token")
     return this.authService.logOut(id);
  }

  // @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteAccount(@Args("id") id: number,@Args("password") password: string): Promise<boolean> {
    return this.userService.removeAccount(id, password);
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
  
  @UseGuards(GQTwoFAGuard)
  @Mutation(() => GQLUserModel)
  async authenticate_2fa(@Context() context, @Args('code') code: string): Promise<GQLUserModel>{
    const { req } = context;
    const twoFActorAuthInput : TwoFActorAuthInput = {
      id: req.user.userId,
      code,
    }
    console.log("the data of auth2: ", twoFActorAuthInput);
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
