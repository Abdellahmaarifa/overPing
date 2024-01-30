import { Injectable, Inject,HttpException,HttpStatus } from '@nestjs/common';
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
import { GwProfileService } from 'apps/gateway/src/microservices/profile/services/gw.profile.service';
import { UserService } from './gw.user.service';
import { FileUpload } from 'graphql-upload';
import { GWMediaService } from '../../media/services/gw.media.service';

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
		let respond: AuthResponseDto;
		try {
			respond = await this.clientService.sendMessageWithPayload(
			  this.client,
			  { role: 'auth', cmd: 'signUp' },
			  userInput,
			);
		
			const { id, username } = respond.user;
		
			await this.profileService.createUserProfile({ userId: id, username });
			await this.mediaService.updateAvatarImg(id, file);
		
			return respond;
		  } catch (error) {
			if (respond && respond.user && respond.user.id) {
			  this.userService.removeAccount(respond.user.id);
		
			  if (respond.user.id) {
				this.profileService.removeProfile(respond.user.id);
			  }
			}
		
			throw new HttpException(
			  error.message || 'An internal server error occurred',
			  error.statusCode
			);
		  }
	}

	async logOut(id: number): Promise<boolean> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'logOut' },
			id,
		);
	}

	async refresh(payload: JwtPayloadDto): Promise<{
		Access_token: string
	}> {
		const response = await this.clientService.sendMessageWithPayload(
			this.client,
			{ role: 'auth', cmd: 'refresh-accessToken' },
			payload,
		);
		return {
			Access_token: response.accessToken
		};

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
	async getTwoFacatorAccessToken(payload: JwtPayloadDto) {
		const token = await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: "auth",
				cmd: "getTwoFacatorAccessToken"
			},
			payload
		)
		return token;
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

	async disableTwoFactor(userId: number): Promise<boolean> {
		return await this.clientService.sendMessageWithPayload(
			this.client,
			{
				role: 'auth',
				cmd: 'disableTwoFactor'
			},
			userId
		);
	}

}
