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
import { GwProfileService } from 'apps/gateway/src/microservices/profile/services/gw.profile.service';
import { UserService } from './gw.user.service';
import { FileUpload } from 'graphql-upload';
import { GWMediaService } from './gw.media.service';

@Injectable()
export class GatewayService {
	constructor(
		@Inject(IRmqSeverName.AUTH)
		private client: ClientProxy,
		private readonly clientService: RabbitMqService,
		private readonly profileService: GwProfileService,
		private readonly userService: UserService,
		private readonly mediaService: GWMediaService,

	) { }


	async signIn(authCredentials: AuthCredentialsInput): Promise<AuthResponseDto> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'login' },
			authCredentials
		);
	}

	async signUp(userInput: UserCreationInput, file: FileUpload): Promise<AuthResponseDto> {
		const respond = await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'signUp' },
			userInput,
		);
		this.profileService.createUserProfile({
			userId: respond.user.id,
			username: respond.user.username
		})
		// this.mediaService.uploadProfileImg(file);
		
		return (respond);
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
