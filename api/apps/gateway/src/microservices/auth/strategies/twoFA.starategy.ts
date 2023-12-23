
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { LoggerService } from '@app/common';
import { Request } from 'express';

@Injectable()
export class TWOFATokenStrategy extends PassportStrategy(Strategy, 'tfa') {
    constructor(
	      private readonly userService: UserService,
        private readonly loger: LoggerService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieToken = request?.cookies?.twoFactorAuth;
          if (cookieToken) {
            this.loger.actionLog("gateway", "TwoFA strategy", "get cookies", cookieToken);
            return cookieToken;
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.Jwt_TWOFA_SECRET,
    });
  }

  async validate(payload: any) {
    const user = {
        userId : payload.sub
    }
      return user;
  }
}
