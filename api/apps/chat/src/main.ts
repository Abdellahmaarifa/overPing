import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.CHAT].queue))

  await app.startAllMicroservices();
  await app.init();

  await app.listen(`${process.env.CHAT_PORT}`);
}
bootstrap();
