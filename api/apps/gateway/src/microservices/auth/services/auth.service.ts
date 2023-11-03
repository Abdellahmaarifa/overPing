import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { AuthCredentialsInput, UserCreationIput } from '../graphql/input';
import { UserService } from './user.service';


@Injectable()
export class GatewayService {
  constructor(
    @Inject(IRmqSeverName.AUTH)
    private client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly userService: UserService,
  ){}

  // async getHello(){
  //   return await this.clientService.sendMessageWithPayload(
  //     this.client,
  //     {role: 'user', cmd:'greeting'},
  //     'hello world ',
  //   )
  // }

  // async getHelloAsync() {
  //   const message = await this.client.send({cmd: 'greeting-async'}, 'Progressive Coder');
  //   return message;
  // }

  // async publishEvent() {
  //  console.log( this.client.emit('book-created', {'bookName': 'The Way Of Kings', 'author': 'Brandon Sanderson'}))
  // }

  async signIn(authCredentials: AuthCredentialsInput): Promise<any>{
    const response = await this.clientService.sendMessageWithPayload(
      this.client,
      {role: 'auth', cmd: 'login'},
      authCredentials
    );
      return (response);
  }
  async hello(): Promise<any>{
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: "hello",
        cmd: "greeting"
      },
      "hello world"
    )
  }
  async signUp(userInput: UserCreationIput){
    const user = await this.userService.createAccount(userInput);
    const response = {
      user, 
      acessToken: 'some thing should move from here ',
      refreshToken: "some thing should move from here",
    }
    return (response);
  }
}
