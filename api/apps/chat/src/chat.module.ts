import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { RabbitMqModule } from '@app/rabbit-mq';
import { DirectMessageController } from './controllers/directMessage.controller';
import { ChannelController } from './controllers/channel.controller';
import { DirectMessageService } from './services/directMessage.service';
import { ChannelService } from './services/channel.service';
import { CheckersService } from './services/checkers.service';
import { DirectMessageGateway } from './gateways/directMessage.gateway';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    CommonModule,
    RabbitMqModule,
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
    NotificationsGateway,
  ],
})
export class ChatModule {}
