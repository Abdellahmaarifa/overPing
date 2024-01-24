import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';


async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  // app.useGlobalFilters(new ChatExceptionFilter());
  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.CHAT].queue))

  
  app.enableCors({
    origin: true,
    // origin: ["http://localhost:5173"],
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.init();
  app.useGlobalPipes(
    new ValidationPipe({skipMissingProperties: true,})
  );

  await app.listen(`${process.env.CHAT_PORT}`);
}
bootstrap();
