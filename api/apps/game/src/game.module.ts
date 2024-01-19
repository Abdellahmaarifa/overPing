import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MyWebSocketGateway } from './websocket.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { CommonModule } from '@app/common';
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';

@Module({
  imports: [
    CommonModule,
    RabbitMqModule,
    RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE),],
  controllers: [
    GameController,
  ],
  providers: [
    MyWebSocketGateway,
    GameService,
    PrismaService,
    RabbitMqService,
  ],
})
export class GameModule {}
