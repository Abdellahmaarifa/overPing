
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { LoggerService } from '@app/common';
import { Request } from 'express';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
	      private readonly userService: UserService,
        private readonly loger: LoggerService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieToken = request?.cookies?.Access_token;
          if (cookieToken) {
            console.log("access:", cookieToken)
            this.loger.actionLog("gateway", "access strategy", "get Access cookies", cookieToken);
            return cookieToken;
          }
        },
        (request: Request) => {
          const authorizationHeader = request.headers['authorization'];
          if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const headerToken = authorizationHeader.split(' ')[1];
            this.loger.actionLog("gateway", "access strategy", "get header", headerToken);
            return headerToken;
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    this.loger.actionLog("gateway", "jwt", "is jwt validate", payload);
    
      const user = await this.userService.findById(payload.sub);
    // return { userId: payload.sub, username: payload.username };
      return (user);
  }
}
