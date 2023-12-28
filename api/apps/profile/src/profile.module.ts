import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { RabbitMqModule } from '@app/rabbit-mq';
import { ProfileService } from './services/profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { WalletController } from './controller/wallet.controller';
import { WalletService } from './services/wallet.service';

@Module({
  imports: [
    CommonModule,
    RabbitMqModule,
  ],
  controllers: [
    ProfileController,
    WalletController
  ],
  providers: [
    WalletService,
    ProfileService,
    PrismaService,
    RpcExceptionService,
  ],
})
export class ProfileModule {}
