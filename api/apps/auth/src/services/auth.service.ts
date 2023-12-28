import { Injectable } from '@nestjs/common';
import { SignInCredentialsDto, SignUpCredentialsDto, TwoFActorAuthDto } from '../dto'
import { UserService } from './user.service';
import { IAuthUser } from '@app/common/auth/interface/auth.user.interface';
import { AuthResponseDto } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2'
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto'
import { RpcExceptionService } from '@app/common/exception-handling';
import { JwtPayloadDto } from '@app/common/auth/dto';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService,
		private readonly rpcExceptionService: RpcExceptionService,

	) { }

	async signIn(
		authCredentials: SignInCredentialsDto
	): Promise<AuthResponseDto> {
		let user: IAuthUser = await this.userService.validateUser(authCredentials);

		const refreshAndAccessToken = await this.newRefreshAndAccessToken({
			id: user.id,
			username: user.username
		});
		this.updateRefreshToken(user.id, refreshAndAccessToken.refreshToken);
		return new AuthResponseDto(
			refreshAndAccessToken.accessToken,
			refreshAndAccessToken.refreshToken,
			user
		);
	}

	async signUp(
		authCredentials: SignUpCredentialsDto
	): Promise<AuthResponseDto> {
		const user = await this.userService.findUserByUsername(authCredentials.username);
		if (user) {
			this.rpcExceptionService.throwForbidden("Username already in use. Try a different one.");
		}
		const usercreated = await this.userService.createUser(authCredentials);
		const refreshAndAccessToken = await this.newRefreshAndAccessToken(
			{
				id: usercreated.id,
				username: usercreated.username
			});
		this.updateRefreshToken(usercreated.id, refreshAndAccessToken.refreshToken);
		return new AuthResponseDto(
			refreshAndAccessToken.accessToken,
			refreshAndAccessToken.refreshToken,
			usercreated
		);
	}

	async newRefreshAndAccessToken(payload: JwtPayloadDto) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: payload.id,
					username: payload.username,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{
					sub: payload.id,
					username: payload.username,
				},
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '7d',
				},
			),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}
	hashData(data: string) {
		return argon2.hash(data);
	}

	async updateRefreshToken(userId: number, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken);
		await this.userService.updateRefreshToken(userId, hashedRefreshToken);
	}


	async logOut(id: number): Promise<boolean> {
		this.updateRefreshToken(id, "");
		return (true);
	}

	async getUserOnRefreshTokenMatch(refreshTokenOject: GetRefreshUserDto): Promise<IAuthUser> {
		const user = await this.userService.findById(refreshTokenOject.id);
		if (!user || !user.refreshToken)
			throw 'Access Denied';
		const refreshTokenMatches = await argon2.verify(
			user.refreshToken,
			refreshTokenOject.refreshToken,
		);

		if (!refreshTokenMatches) throw 'Access Denied';
		console.log("refreshTokenMatches");
		return (user);
	}

	async verifyToken(token: string): Promise<any> {
		try {
			const res = await this.jwtService.verify(token, {
				secret: this.configService.get('JWT_ACCESS_SECRET'),
			});
			return res;
		} catch (error) {
			if (error.expiredAt) {
				this.rpcExceptionService.throwUnauthorised(
					'Token has expired, please sign in',
				);
			}
			return false;
		}
	}

	async enableTwoFactorAuth(id: number): Promise<string> {
		const user = await this.userService.findById(id);
		if (!user){
			this.rpcExceptionService.throwUnauthorised("User not found");
		}
		let secret = speakeasy.generateSecret({
			name: user.username,
			issuer: "overPing"
		});
		this.userService.update2FA(id, secret.base32);
		return this.generateQrCodeDataURL(secret.otpauth_url);
	}

	async verifyTwoFactorAuth(twoFActorAuthInput: TwoFActorAuthDto): Promise<boolean> {
		const user = await this.userService.findById(twoFActorAuthInput.id);
		const isVerified = this.verifyTwoFactor(
			user.twoFactorSecret,
			twoFActorAuthInput.code
		);
		if (isVerified){
			this.userService.toggle2FAStatus(user.id, true);
		}else{
			this.userService.toggle2FAStatus(user.id, false);
			this.userService.update2FA(user.id, '');	
		}
		return isVerified;
	}

	async authenticate_2fa(twoFActorAuthInput: TwoFActorAuthDto): Promise<AuthResponseDto>{
		const user = await this.userService.findById(twoFActorAuthInput.id);
		if (!user.twoStepVerificationEnabled){
			this.rpcExceptionService.throwBadRequest("twoStepVerification not enabled");
		}
		
		const isVerified = this.verifyTwoFactor(
			user.twoFactorSecret,
			twoFActorAuthInput.code
		);
		if (!isVerified){
			this.rpcExceptionService.throwForbidden("Invalid code. Please try again with a different code.");
		}
		const refreshAndAccessToken = await this.newRefreshAndAccessToken({
			id: user.id,
			username: user.username
		});
		this.updateRefreshToken(user.id, refreshAndAccessToken.refreshToken);
		return new AuthResponseDto(
			refreshAndAccessToken.accessToken,
			refreshAndAccessToken.refreshToken,
			user
		);
	}

	private verifyTwoFactor(secret: string, code) {

		const isVerified = speakeasy.totp.verify({
			secret: secret,
			encoding: 'base32',
			token: code,
		});
		return isVerified;
	}

	private async generateQrCodeDataURL(otpAuthUrl: string) {
		return QRCode.toDataURL(otpAuthUrl);
	}


}
