import { Controller, Get } from '@nestjs/common';

import{ MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import {  CredentialsUserInput, SignUpCredentialsInput } from '../dto';
import { UserWithCookiesModel } from '../models';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../services/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService : AuthService,
    private readonly prisma : PrismaService,
    private readonly userService: UserService
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
    return this.authService.signIn(authCredentials);
  }

  @MessagePattern({ role: 'auth', cmd: 'login'})
  async signUp(userInput: SignUpCredentialsInput): Promise<any>{
    return this.authService.signUp(userInput);
  }
}

