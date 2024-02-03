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
import {HttpException} from "@nestjs/common";
import { UpdateUserInput } from '../input/userUpdate.input';
import { GqlJwtAuthGuard } from '../../guards/gql.accessToken.guard';
import { UserStatusService } from '../../services/gw.userStatus.service';

@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: GatewayService,
    private readonly userService: UserService,
    private readonly userStatusService: UserStatusService,
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
        // secure: true,
        sameSite: 'Strict',
      });
      throw new HttpException("Two-factor", 401);
    }
    
    this.userStatusService.updateUserStatus(response.user.id, Date().toString());
    res.cookie('Refresh_token', response.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'Strict',
    });
    
    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      // secure: true,
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
      // secure: true,
      sameSite: 'Strict',
    });
    
    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      // secure: true,
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

  @UseGuards(UserAccessAuthorizationGuard)
  @Mutation(() => Boolean)
  async deleteAccount(@Args("id") id: number,@Args("password") password: string): Promise<boolean> {
    const isUserDeleted = this.userService.deleteUser(id, password);
    // const isPorfileDeleted = this.profileService.
    return (isUserDeleted)
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
    const response =  await this.authService.authenticate_2fa(twoFActorAuthInput);
    const { res } = context;
    res.cookie('Refresh_token', response.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'Strict',
    });

    res.cookie('Access_token', response.accessToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'Strict',
    });

    return (response.user);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async disableTwoFactor(@Context() ctx ): Promise<boolean>{
    const { id} = ctx.req.user;
    return this.authService.disableTwoFactor(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation ( () => Boolean)
  async updateUser(@Context() cxt, @Args('userUpdateInput') updateInput: UpdateUserInput ): Promise<boolean>{
      const {id} = cxt.req.user;

      return this.userService.updateUser(id, updateInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation ( () => Boolean)
  async updateUserStatus(@Context() cxt, @Args('currentTime') currentTime: string ): Promise<boolean>{
      const {id} = cxt.req.user;
      return this.userStatusService.updateUserStatus(id, currentTime);
  }

}
