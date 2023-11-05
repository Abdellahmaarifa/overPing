import { Controller, Get } from '@nestjs/common';

import{ MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { SignUpCredentialsInput } from '../dto';
import { UserWithCookiesModel } from '../models';
import { PrismaService } from '../../prisma/prisma.service';
import { LoggerService} from '@app/common/loger';

@Controller()
export class AuthController {
  constructor(
      private readonly authService : AuthService,
      private readonly loger: LoggerService,
  ){}
    
  // @MessagePattern({ role: 'user', cmd: 'greeting'})
  // getGreetingMessage(name: string): SuccessResponseModel {
  //   let num : SuccessResponseModel = {
  //     response : `${name}this is the message as successResponse model`
  //   }
  //   return num;
  // }

  // @MessagePattern({cmd: 'greeting-async'})
  // async getGreetingMessageAysnc(name: string): Promise<string> {
  //   return `Hello ${name} Async`;
  // }

  // @EventPattern('book-created')
  // async handleBookCreatedEvent(data: Record<string, unknown>) {
  //   console.log(data);
  // }


  @MessagePattern({ role: 'auth', cmd:'login'})
  async signIn(authCredentials : SignUpCredentialsInput): Promise<UserWithCookiesModel | String> {
      this.loger.actionLog("auth","signIn()","the user starting the signIn action", authCredentials);
      return this.authService.signIn(authCredentials);
  }

  @MessagePattern({ role: 'auth', cmd: 'singUp'})
  async signUp(userInput: SignUpCredentialsInput): Promise<any>{
      console.log("auth=========> starting singUp the user :",userInput);
    return this.authService.signUp(userInput);
  }
}

