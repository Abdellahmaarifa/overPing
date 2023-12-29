import { Module } from '@nestjs/common';
import { FriendController } from './contorllers/friend.controller';
import { FriendService } from './services/friend.service';
import { RabbitMqModule, RabbitMqService } from '@app/rabbit-mq';
import { PrismaService } from '../prisma/prisma.service';
import { RpcExceptionService } from "@app/common/exception-handling";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
@Module({
  imports: [
    RabbitMqModule,
    RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
  ],
  controllers: [FriendController],
  providers: [
    FriendService,
    RabbitMqService,
    PrismaService,
    RpcExceptionService
    ],
})
export class FriendModule {}
