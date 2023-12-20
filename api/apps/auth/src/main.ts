import { NestFactory} from '@nestjs/core';
// import { Transport } from "@nestjs/microservices"
import { AuthModule } from './auth.module';
import { RabbitMqService } from '@app/rabbit-mq';
// import { MicroserviceOptions } from '@nestjs/microservices';
import {RABBIT_SERVICES, } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


async function bootstrap() {

  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.AUTH].queue));
  await app.startAllMicroservices();
}
bootstrap();
