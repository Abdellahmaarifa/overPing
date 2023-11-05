import { Injectable } from '@nestjs/common';
import { UserWithCookiesModel } from '../models';
import { SignUpCredentialsInput } from '../dto'
import { UserService } from './user.service';
import { IAuthUser } from '../interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    ){}

  async signIn(
    authCredentials : SignUpCredentialsInput
  ):Promise<UserWithCookiesModel | String>{
    try {
      let user : IAuthUser = await this.userService.validateUser(authCredentials);
	console.log("auth========> the user is validateUser: ", user);
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
    console.log("auth========> the user is found: ", user);
      if (user){
	  console.log("auth=======> the user is already exsit");
	  return {
	      data: null,
	      message: "user is already exist"
	  };
      }
    //todo hash the password
    const usercreated =  await this.userService.createUser(authCredentials);
      console.log("auth======>: singUp : was created :", usercreated); 
   
      return ({
	  data:usercreated,
	  message: " user create successful",
      });
 }
}
