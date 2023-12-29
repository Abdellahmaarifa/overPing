import { NestFactory } from '@nestjs/core';
import { FriendModule } from './friend.module';
import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


async function bootstrap() {
  const app = await NestFactory.create(FriendModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  const mediaRmqOptions = rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.FRIEND].queue);
  app.connectMicroservice(mediaRmqOptions);

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
