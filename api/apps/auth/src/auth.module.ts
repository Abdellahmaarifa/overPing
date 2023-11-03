import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RabbitMqModule } from '@app/rabbit-mq';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user.module';


@Module({
  imports: [RabbitMqModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService],
})
export class AuthModule {}
