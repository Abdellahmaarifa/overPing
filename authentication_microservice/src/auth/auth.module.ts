
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.starategy';
import { JwtAccessTokenStrategy } from './strategies/jwt.accessToken.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refreshToken.strategy';
import { UsersModule } from 'src/database/users/users.module/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FortyTwoGuard } from './guards/42.auth.grade';
import { FortyTwoStrategy } from './strategies/42.strategy';
import { GoogleStrategy } from './strategies/google.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    FortyTwoStrategy,
    GoogleStrategy,],
  exports: [AuthService],
})
export class AuthModule {}