import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { DirectMessageGateway } from './chat.gateway/directMessage.gateway';
import { ChannelController } from './controllers/channel.controller';
import { DirectMessageController } from './controllers/directMessage.controller';
import { ChannelGateway } from './chat.gateway/channel.gateway';
import { ChannelService } from './services/channel.service';
import { DirectMessageService } from './services/directMessage.service';
import { TasksService } from './services/tasks.service';
import { CheckerService } from './utils/checker.service';
import { HelperService } from './utils/helper.service';

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
  ],
})
export class ChatModule {}
