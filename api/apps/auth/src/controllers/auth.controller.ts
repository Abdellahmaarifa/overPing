import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { SignInCredentialsDto, SignUpCredentialsDto, TwoFActorAuthDto } from '../dto';
import { AuthResponseDto } from '@app/common/auth/dto/AuthResponseDto';
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import { JwtPayloadDto } from '@app/common/auth/dto';
import { IAccessControl } from '@app/common/auth/interface/AccessToken.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { IJwtPayload } from '../interface/jwt.payload.interface';
import { LoggerService } from '@app/common';
import { UserService } from '../services/user.service';


@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly rpcExceptionService: RpcExceptionService,
        private readonly logger: LoggerService,
    ) {}

    @MessagePattern({ role: 'auth', cmd: 'login' })
    async signIn(authCredentials: SignInCredentialsDto): Promise<AuthResponseDto> {
        return this.authService.signIn(authCredentials);
    }
    
    @MessagePattern({ role: 'auth', cmd: 'signUp' })
    async signUp(userCredentials: SignUpCredentialsDto): Promise<AuthResponseDto> {
        this.logger.actionLog("auth", "signUp()", "sing UP", userCredentials);
        return this.authService.signUp(userCredentials);
    }

    @MessagePattern({ role: 'auth', cmd: 'OnRefreshTokenMatch' })
    async getUserOnRefreshTokenMatch(refreshToken: GetRefreshUserDto): Promise<any> {
        return this.authService.getUserOnRefreshTokenMatch(refreshToken);
    }

    @MessagePattern({role: 'auth', cmd: 'logOut'})
	async logOut(id: number) : Promise<boolean>{
        return this.authService.logOut(id);
    }

    @MessagePattern({ role: 'auth', cmd: 'refresh-accessToken' })
    async refreshAccessToken(payload: JwtPayloadDto): Promise<any> {
        const tokens = await this.authService.newRefreshAndAccessToken(payload);
        return { accessToken: tokens.accessToken };
    }

    @MessagePattern({ role: 'auth', cmd: 'checkAccess' })
    async checkAccessToken(accessControlDto: IAccessControl): Promise<boolean> {
        const { token, id } = accessControlDto;
        const jwtTokenPayload: IJwtPayload = await this.authService.verifyToken(token);
        if (jwtTokenPayload.sub !== id) {
            this.rpcExceptionService.throwForbidden('Forbidden resource');
        }
        return true;
    }

    @MessagePattern({ role: 'auth', cmd: 'getRefreshWithJwtAccessToken' })
    async getRefreshWithJwtAccessToken(payload: JwtPayloadDto): Promise<any> {
        const tokens = await this.authService.newRefreshAndAccessToken(payload);
        this.authService.updateRefreshToken(payload.id,tokens.refreshToken);
        return tokens;
    }

    @MessagePattern({ role: 'auth', cmd: 'getTwoFacatorAccessToken' })
    async getTwoFacatorAccessToken(payload: JwtPayloadDto): Promise<any> {
        const token = await this.authService.newTwoFactorAccessToken(payload);
        
        return token;
    }

    @MessagePattern({ role: 'auth', cmd: 'enableTwoFactorAuth'})
    async enableTwoFactorAuth(id: number): Promise<string>{
        return this.authService.enableTwoFactorAuth(id);
    }

    @MessagePattern({ role: 'auth', cmd: 'verifyTwoFactorAuth'})
    async verifyTwoFactorAuth(twoFActorAuthInput: TwoFActorAuthDto) : Promise<boolean>{
        return this.authService.verifyTwoFactorAuth(twoFActorAuthInput);
    }

    @MessagePattern({ role: 'auth', cmd: 'authenticate_2fa'})
    async authenticate_2fa(twoFActorAuthInput: TwoFActorAuthDto) : Promise<AuthResponseDto>{
        return this.authService.authenticate_2fa(twoFActorAuthInput);
    }
}
