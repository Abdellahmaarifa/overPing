import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UserService } from '../services';
import { GetRefreshUserDto } from '@app/common/auth/dto/getRefreshUser.dto'
import { LoggerService } from '@app/common';


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly loger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          this.loger.actionLog("gateway", "refresh starategy ", "get cookies", request?.cookies?.Refresh_token);
          return request?.cookies?.Refresh_token;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshTokenObject: GetRefreshUserDto = {
      id: payload.sub,
      refreshToken: request.cookies?.Refresh_token,
    };
    this.loger.actionLog("gateway", "refresh starategy ", "get the payload", refreshTokenObject);
    return this.userService.getUserByRefreshTokenMatch(refreshTokenObject);

  }
}
