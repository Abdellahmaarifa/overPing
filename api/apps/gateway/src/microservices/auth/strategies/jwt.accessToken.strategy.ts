
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { LoggerService } from '@app/common';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
	      private readonly userService: UserService,
        private readonly loger: LoggerService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
