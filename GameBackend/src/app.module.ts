import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyWebSocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController ],
  providers: [MyWebSocketGateway, AppService,],
})
export class AppModule {}
