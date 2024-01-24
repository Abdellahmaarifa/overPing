import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ChatExceptionFilter } from './chat-global-filter/chat-global-filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  app.enableCors({
    origin: `${process.env.CHAT_FRONT_URL}`,
    credentials: true,
  });

  app.useGlobalFilters(new ChatExceptionFilter());
  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.CHAT].queue))

  await app.startAllMicroservices();
  await app.init();
  app.useGlobalPipes(
    new ValidationPipe({skipMissingProperties: true,})
  );

  await app.listen(`${process.env.CHAT_PORT}`);
}
bootstrap();
