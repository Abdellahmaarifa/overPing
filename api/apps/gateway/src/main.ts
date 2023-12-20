import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common'
// import { ErrorFilter } from './filters';
import { RabbitMqService } from '@app/rabbit-mq';
import { RABBIT_SERVICES, } from '@app/rabbit-mq/constent/rabbit-constent'
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';


async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.use(cookieParser());
  // Enable CORS for all routes
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  
  app.connectMicroservice(rmqService.getOptions(RABBIT_SERVICES[IRmqSeverName.GATEWAY].queue))
  await app.startAllMicroservices();
  // app.useGlobalPipes(
  //   new ValidationPipe({skipMissingProperties: true,})
  // );
  //  app.useGlobalFilters(new ErrorFilter());
  await app.listen(5500);
}
bootstrap();
