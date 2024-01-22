import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqModule } from '@app/rabbit-mq';
import { DirectMessageController } from './controllers/directMessage.controller';
import { ChannelController } from './controllers/channel.controller';
import { DirectMessageService } from './services/directMessage.service';
import { ChannelService } from './services/channel.service';
import { CheckerService } from './utils/checker.service';
import { DirectMessageGateway } from './chat.gateway/directMessage.gateway';
import { NotificationsGateway } from './chat.gateway/notifications.gateway';
import { ChannelGateway } from './chat.gateway/channel.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { ClientAccessAuthorizationGuard } from './guards/client.guard';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from './utils/helper.service';
import { TasksService } from './services/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    RabbitMqModule,
    RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
  ],
  controllers: [
    DirectMessageController,
    ChannelController,
  ],
  providers: [
    TasksService,
    JwtService,
    PrismaService,
    RpcExceptionService,
    DirectMessageService,
    HelperService,
    CheckerService,
    ChannelService,
    DirectMessageGateway,
    ChannelGateway,
    // NotificationsGateway,
    ClientAccessAuthorizationGuard,
  ],
})
export class ChatModule {}
