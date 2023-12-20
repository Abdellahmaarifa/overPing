import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './controllers/user.controller'
import { JwtAccessTokenStrategy } from 'apps/gateway/src/microservices/auth/strategies/jwt.accessToken.strategy';
import { RpcExceptionService } from '@app/common/exception-handling';
@Module({
  providers: [
      UserService,
      PrismaService,
      RpcExceptionService,
      
  ],
  controllers: [
      UserController
  ],
  exports:[
      UserService
  ]
})
export class UserModule {}
