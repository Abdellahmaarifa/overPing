import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { SignUpCredentialsInput } from '../dto';
import { LoggerService } from '@app/common';
import { AuthResponseDto } from '@app/common/auth/dto/AuthResponseDto';
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto';
import { GetAccessTokenDto } from '@app/common/auth/dto/getAccessTokenDto';
import { IAccessControl } from '@app/common/auth/interface/AccessToken.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { IJwtPayload } from '../interface/jwt.payload.interface';
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly loger: LoggerService,
        private readonly rpcExceptionService : RpcExceptionService,
    ) { }

    @MessagePattern({ role: 'auth', cmd: 'login' })
    async signIn(authCredentials: SignUpCredentialsInput): Promise<AuthResponseDto> {
        this.loger.actionLog("auth", "signIn()", "the user starting the signIn action", authCredentials);
        return this.authService.signIn(authCredentials);
    }

    @MessagePattern({ role: 'auth', cmd: 'singUp' })
    async signUp(userInput: SignUpCredentialsInput): Promise<AuthResponseDto> {
        this.loger.actionLog("auth", "signUp()", "the user starting the signUp action", userInput);

        return this.authService.signUp(userInput);
    }

    @MessagePattern({ role: 'auth', cmd: 'OnRefreshTokenMatch' })
    async getUserOnRefreshTokenMatch(refreshToken: GetRefreshUserDto): Promise<any> {
        this.loger.actionLog("auth", "refreshTH", "get new accessToken", refreshToken);
        return this.authService.getUserOnRefreshTokenMatch(refreshToken);
        // reutrn (null)
    }
    @MessagePattern({ role: 'auth', cmd: 'refresh-accessToken' })
    async refreshAccessToken(payload: GetAccessTokenDto): Promise<any> {
        const tokens = await this.authService.newRefreshAndAccessToken(payload.id, payload.username);
        return ({
            accessToken: (tokens.accessToken)
        });
    }

    @MessagePattern({ role: 'auth', cmd: 'checkAccess' })
    async checkAccessToken(accessControlDto: IAccessControl): Promise<boolean> {
        const { token, id } = accessControlDto;
        const jwtTokenPayload: IJwtPayload = await this.authService.verifyToken(
            token,
        );
        this.loger.actionLog("auth", "checkAccess", "check the user id ", jwtTokenPayload)
        console.log(id)
        if (jwtTokenPayload.sub !== id)
            this.rpcExceptionService.throwForbidden('Forbidden resource');

        return true;
    }

    @MessagePattern({role: 'auth', cmd: 'getRefreshWithJwtAccessToken'})
    async getRefreshWithJwtAccessToken(payload: GetAccessTokenDto){
        const tokens = await this.authService.newRefreshAndAccessToken(payload.id, payload.username);
        this.loger.actionLog("auth", "getRrefeshWithjwt", "get tokens", tokens);
        return (tokens);
    }

}

