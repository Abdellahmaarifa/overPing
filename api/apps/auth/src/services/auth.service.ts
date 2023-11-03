import { Injectable } from '@nestjs/common';
import { UserWithCookiesModel } from '../models';
import { SignUpCredentialsInput } from '../dto'
import { UserService } from './user.service';
import { IAuthUser } from '../interface';
import { UserLoggerService } from '@app/common/loger'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userLoggerService: UserLoggerService,
    ){}

  async signIn(
    authCredentials : SignUpCredentialsInput
  ):Promise<UserWithCookiesModel | String>{
    try {
      let user : IAuthUser = await this.userService.validateUser(authCredentials);
      if (!user){
        return ("the user not found");
      }
      
      return {
        acessToken: 'you_token',
        refreshToken: 'your_refresh_token',
        user: user,
      }
    } catch (error) {
      // Handle errors appropriately
      console.error('------------------Error during sign-in:', error);
      throw error;
    }
  }

  async signUp(
    authCredentials : SignUpCredentialsInput
  ): Promise<any>{
    const user = await this.userService.findUserByUsername(authCredentials.username);
    if (user){
      return "user already exsit";
    }
    //todo hash the password
    const usercreated =  await this.userService.createUser(authCredentials);
    this.userLoggerService.logUserCreated(usercreated.id.toString());
    return (usercreated);
 }
}
