import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RabbitMqModule, RabbitMqService } from '@app/rabbit-mq';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
@Module({
    imports: [
	CommonModule,
	RabbitMqModule,
	UserModule,
	JwtModule.register({}),
    ],
    controllers: [
	AuthController
    ],
    providers: [
	AuthService,
	PrismaService,
	RpcExceptionService,
    ],
})
export class AuthModule {}
