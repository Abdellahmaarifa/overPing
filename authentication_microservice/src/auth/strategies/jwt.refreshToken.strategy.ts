
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import RefreshToken from '../entities/refresh-token.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      id : payload.id,
      userId : payload.userId,
      ipAddress : payload.ipAddress,
      userAgent : payload.userAgent,
    };
  }
}
