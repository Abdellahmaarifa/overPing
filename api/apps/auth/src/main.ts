import { NestFactory} from '@nestjs/core';
// import { Transport } from "@nestjs/microservices"
import { AuthModule } from './auth.module';
import { RabbitMqService } from '@app/rabbit-mq';
// import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rmqService.getOptions('auth_queuetwo'))
  await app.startAllMicroservices();
  

}
bootstrap();
