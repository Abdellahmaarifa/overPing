import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqModule } from '@app/rabbit-mq';
import { DirectMessageController } from './controllers/directMessage.controller';
import { ChannelController } from './controllers/channel.controller';
import { DirectMessageService } from './services/directMessage.service';
import { ChannelService } from './services/channel.service';
import { CheckersService } from './services/checkers.service';
import { DirectMessageGateway } from './gateways/directMessage.gateway';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { ChannelGateway } from './gateways/channel.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { ClientAccessAuthorizationGuard } from './guards/client.guard';

@Module({
  imports: [
    CommonModule,
    RabbitMqModule,
    RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
    RabbitMqModule.forClientProxy(IRmqSeverName.MEDIA),
    RabbitMqModule.forClientProxy(IRmqSeverName.FRIEND),
  ],
  controllers: [
    DirectMessageController,
    ChannelController,
  ],
  providers: [
    PrismaService,
    RpcExceptionService,
    DirectMessageService,
    ChannelService,
    CheckersService,
    DirectMessageGateway,
    ChannelGateway,
    NotificationsGateway,
    ClientAccessAuthorizationGuard
  ],
})
export class ChatModule {}
