import { Controller} from '@nestjs/common';

import{ MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { CredentialsUserInput } from '../dto'
import { IAuthUser } from '../interface';
import { IRespondMessagePattern } from '@app/rabbit-mq'
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}


  @MessagePattern({role: 'user', cmd:'create-user'})
  async registerUser(userInput: CredentialsUserInput): Promise<IRespondMessagePattern>{
      console.log("auth==========> starting teh create of the user user:", userInput);
      const user = await this.userService.createUser(userInput);
      if (user)
          console.log('auth==========> the user was created: ', user);
     
      return ({
        data: {user},
        message: 'user created successful'
      });
  }

  //TODO change the uername to dto 
  @MessagePattern({role: 'user', cmd: 'find-user-by-username'})
  async findUserbyUsername(username: string): Promise<IAuthUser | null>{
    console.log("auth==========> starting teh finding of the user user:", username);
    const user = await this.userService.findUserByUsername(username);
    if (user)
     console.log("auth==========> user found with username :", user.username);
    else
     console.log("auth==========> user was not found with username :", user);

    return (user);
  }

  @MessagePattern({role: 'profile', cmd:'create-profile'})
  async registerProfile(profile: any){
    return  ({
      email: "ayoub.se@gmail.com",
      displayName: "Boucatus"
    })
  }
}

