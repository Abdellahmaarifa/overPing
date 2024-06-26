import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './controllers/user.controller'
import { JwtAccessTokenStrategy } from 'apps/gateway/src/microservices/auth/strategies/jwt.accessToken.strategy';
import { RpcExceptionService } from '@app/common/exception-handling';
import { FriendshipController } from './controllers/friend.controller';
import { FriendshipService } from './services/friend.servicet';
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';

@Module({
    imports: [
      RabbitMqModule,
      RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE),
    ],
  providers: [
      UserService,
      PrismaService,
      RpcExceptionService,
      FriendshipService,
      
  ],
  controllers: [
      UserController,
      FriendshipController,
  ],
  exports:[
      UserService,
      FriendshipService,
  ]
})
export class UserModule {}
