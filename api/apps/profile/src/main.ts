import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { RabbitMqService } from '@app/rabbit-mq';
import {RABBIT_SERVICES, } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


async function bootstrap() {

  const app = await NestFactory.create(ProfileModule);

  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.PROFILE].queue))

  await app.startAllMicroservices();
  
}
bootstrap();
