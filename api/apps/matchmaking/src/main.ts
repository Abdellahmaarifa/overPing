import { NestFactory } from '@nestjs/core';
import { MatchmakingModule } from './matchmaking.module';
import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';

async function bootstrap() {
  const app = await NestFactory.create(MatchmakingModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  const matchMakingRmqOptions = rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.MATCH_MAKING].queue);
  app.connectMicroservice(matchMakingRmqOptions);

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
