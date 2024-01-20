import { NestFactory} from '@nestjs/core';
import { GameModule } from './game.module'
import { RabbitMqService } from '@app/rabbit-mq';
import {RABBIT_SERVICES, } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { IoAdapter } from '@nestjs/platform-socket.io'; 
import { logger } from './connection-logger.middleware';
// import { MicroserviceOptions } from '@nestjs/microservices';
// import { Transport } from "@nestjs/microservices"


async function bootstrap() 
{
  const app = await NestFactory.create(GameModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.GAME].queue));
  //app.useStaticAssets(join(__dirname, '..', 'static'));
  app.use(logger);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.startAllMicroservices(); 
  await app.listen(4055);
}

bootstrap();