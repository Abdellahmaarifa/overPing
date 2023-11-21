import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors'; // Import cors

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    app.use(cookieParser());
      // Enable CORS for all routes
      app.enableCors({
        origin: "http://localhost:3000",
      });
    await app.listen(5500);
}
bootstrap();
