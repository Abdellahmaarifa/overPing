import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MyWebSocketGateway } from './websocket.gateway';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    GameController,
  ],
  providers: [
    MyWebSocketGateway,
    GameService,
    PrismaService,
  ],
})
export class AppModule {}
