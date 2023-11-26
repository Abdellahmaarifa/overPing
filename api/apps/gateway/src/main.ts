import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common'
// import { ErrorFilter } from './filters';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    app.use(cookieParser());
      // Enable CORS for all routes
      app.enableCors({
        origin: true,
        credentials: true,
      });

      // app.useGlobalPipes(
      //   new ValidationPipe({skipMissingProperties: true,})
      // );
      //  app.useGlobalFilters(new ErrorFilter());
    await app.listen(5500);
}
bootstrap();
