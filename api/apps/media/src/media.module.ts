import { Module } from '@nestjs/common';
import { MediaController } from './contorller/media.controller';
import { MediaService } from './services/media.service';
import { RabbitMqModule, RabbitMqService } from '@app/rabbit-mq';
import { ConfigModule } from '@nestjs/config';
import  configuration  from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // Load the configuration module
    }),
    RabbitMqModule
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    RabbitMqService,
  ],
})
export class MediaModule {}
