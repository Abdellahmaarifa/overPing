import { Module } from '@nestjs/common';
import { UsersModule } from './database/users/users.module/users.module';
import { UsersService } from './database/users/users.service/users.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
})
export class AppModule {}
