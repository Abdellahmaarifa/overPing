import { Injectable } from '@nestjs/common';
import { SignUpCredentialsInput } from '../dto'
import { UserService } from './user.service';
import { IAuthUser } from '../interface';
import { LoggerService } from '@app/common';
import { AuthResponseDto } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import * as argon2 from 'argon2';
import * as argon2 from 'argon2'
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto'
import { RpcExceptionService } from '@app/common/exception-handling';
import { IAccessControl } from '@app/common/auth/interface/AccessToken.interface';
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly loger: LoggerService,
		private jwtService: JwtService,
		private configService: ConfigService,
		private readonly rpcExceptionService: RpcExceptionService,

	) { }

	async signIn(
		authCredentials: SignUpCredentialsInput
	): Promise<AuthResponseDto> {
		let user: IAuthUser = await this.userService.validateUser(authCredentials);
		// console.log("auth =========> the user is validateUser: ", user);
		this.loger.actionLog("auth.controller", "signIn()", "the user validated exist", user);
		if (!user) {
			this.loger.actionLog("auth.controller", "signIn()", "the user error validated ", user);
			return new AuthResponseDto('', '', null, 'error accessing the user');
		}
		const refreshAndAccessToken = await this.newRefreshAndAccessToken(user.id, user.username);
		this.updateRefreshToken(user.id, refreshAndAccessToken.refreshToken);
		this.loger.actionLog("auth", "signIN", "check tokens", {
			hash: (await this.userService.findById(user.id)).refreshToken,
			refersh: refreshAndAccessToken.refreshToken
		});
		return new AuthResponseDto(
			refreshAndAccessToken.accessToken,
			refreshAndAccessToken.refreshToken,
			user,
			null,
		);
	}

	async signUp(
		authCredentials: SignUpCredentialsInput
	): Promise<AuthResponseDto> {
		const user = await this.userService.findUserByUsername(authCredentials.username);
		if (user) {
			this.loger.actionLog("auth.service", "signUp()", "the user alredy exist", user);
			this.rpcExceptionService.throwForbidden("Username already in use. Try a different one.");
		}
		const usercreated = await this.userService.createUser(authCredentials);
		this.loger.actionLog("auth.service", "signUp()/craeteUser", "the user created", usercreated);
		const refreshAndAccessToken = await this.newRefreshAndAccessToken(usercreated.id, usercreated.username);
		this.updateRefreshToken(usercreated.id, refreshAndAccessToken.refreshToken);
		return new AuthResponseDto(
			refreshAndAccessToken.accessToken,
			refreshAndAccessToken.refreshToken,
			usercreated,
			null
		);
	}



	async newRefreshAndAccessToken(userId: number, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
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



	async getUserOnRefreshTokenMatch(refreshTokenOject: GetRefreshUserDto): Promise<IAuthUser> {
		const user = await this.userService.findById(refreshTokenOject.id);
		if (!user || !user.refreshToken)
			throw 'Access Denied';
		this.loger.actionLog("auth", "getuseronrefresh", "user found", user);
		this.loger.actionLog("auth", "getUserOnrefersh", "refreshTokenObject", refreshTokenOject);
		const refreshTokenMatches = await argon2.verify(
			user.refreshToken,
			refreshTokenOject.refreshToken,
		);

		if (!refreshTokenMatches) throw 'Access Denied';
		console.log("refreshTokenMatches");
		return (user);
		// const tokens = await this.newRefreshAndAccessToken(user.id, user.username);
		// this.updateRefreshToken(user.id, tokens.refreshToken);
		// return tokens;
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

	
	async test(): Promise<any> {
		const user = await this.userService.findAll();
		this.loger.actionLog("auth", "find by  Id", "findById", user);
		return (user);
	}

}
