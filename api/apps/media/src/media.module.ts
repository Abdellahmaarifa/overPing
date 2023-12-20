import { Module } from '@nestjs/common';
import { MediaController } from './contorller/media.controller';
import { MediaService } from './services/media.service';
import { RabbitMqModule, RabbitMqService } from '@app/rabbit-mq';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [RabbitMqModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    RabbitMqService,
    PrismaService
  ],
})
export class MediaModule {}
