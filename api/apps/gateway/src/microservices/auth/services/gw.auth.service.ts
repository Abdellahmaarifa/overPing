import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import {
	AuthCredentialsInput,
	UserCreationInput,
	TwoFActorAuthInput
} from '../graphql/input';
import { JwtPayloadDto } from '@app/common/auth/dto';
import { AuthResponseDto } from '@app/common';
import { PromiseOrValue } from 'graphql/jsutils/PromiseOrValue';

@Injectable()
export class GatewayService {
	constructor(
		@Inject(IRmqSeverName.AUTH)
		private client: ClientProxy,
		private readonly clientService: RabbitMqService,
	) { }


	async signIn(authCredentials: AuthCredentialsInput): Promise<AuthResponseDto> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'login' },
			authCredentials
		);
	}

	async signUp(userInput: UserCreationInput): Promise<AuthResponseDto> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'signUp' },
			userInput,
		);
	}

	async logOut(id: number): Promise<boolean> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'logOut' },
			id,
		);
	}

	async refresh(payload: JwtPayloadDto): Promise<string> {
		const response = await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'refresh-accessToken' },
			payload,
		);
		return response;

	}

	async getRefreshWithJwtAccessToken(payload: JwtPayloadDto) {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: "auth",
				cmd: "getRefreshWithJwtAccessToken"
			},
			payload
		)
	}

	async enableTwoFactorAuth(id: number): Promise<string> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: 'auth',
				cmd: 'enableTwoFactorAuth'
			},
			id
		);
	}
	async verifyTwoFactorAuth(twoFActorAuthInput: TwoFActorAuthInput): Promise<boolean> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: 'auth',
				cmd: 'verifyTwoFactorAuth'
			},
			twoFActorAuthInput
		);
	}
	async authenticate_2fa(twoFActorAuthInput: TwoFActorAuthInput): Promise<AuthResponseDto> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: 'auth',
				cmd: 'authenticate_2fa'
			},
			twoFActorAuthInput
		);
	}
}
