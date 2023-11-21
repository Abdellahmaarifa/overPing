import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { AuthCredentialsInput, UserCreationInput } from '../graphql/input';
import {GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import {GetAccessTokenDto} from '@app/common/auth/dto/getAccessTokenDto';

@Injectable()
export class GatewayService {
    constructor(
	@Inject(IRmqSeverName.AUTH)
	private client: ClientProxy,
	private readonly clientService: RabbitMqService,
    ){}


    async signIn(authCredentials: AuthCredentialsInput): Promise<any>{
	const response = await this.clientService.sendMessageWithPayload(
	    this.client,
	    {role: 'auth', cmd: 'login'},
	    authCredentials
	);
	return (response);
    }
    
    async signUp(userInput: UserCreationInput): Promise<any>{
	return await this.clientService.sendMessageWithPayload(
	    this.client,
	    {role: 'auth', cmd: 'singUp'},
	    userInput,
	);
    }

    async refresh(payload: GetAccessTokenDto): Promise<string>{
	const response = await this.clientService.sendMessageWithPayload(
	    this.client,
	    {role: 'auth', cmd: 'refresh-accessToken'},
	    payload,
	);
		return response;
	
    }

    async getRefreshWithJwtAccessToken(payload: GetAccessTokenDto){
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: "auth",
				cmd: "getRefreshWithJwtAccessToken"
			},
			payload
		)
	}
}
