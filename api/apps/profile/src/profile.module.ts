import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { CommonModule } from '@app/common';
import { RpcExceptionService } from "@app/common/exception-handling";
import { RabbitMqModule } from '@app/rabbit-mq';
import { ProfileService } from './services/profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { WalletController } from './controller/wallet.controller';
import { WalletService } from './services/wallet.service';
import { GameStatusService } from './services/gameStatus.service';
import { UserGameStatusController } from './controller/gameStatus.controller';
import { TitleService, XpService } from './services/xp.service';
import { AchievementService } from './services/achievement.service';
import { RankingService } from './services/rankingSystem.service';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    RabbitMqModule,
  ],
  controllers: [
    ProfileController,
    WalletController,
    UserGameStatusController,
  ],
  providers: [
    RankingService,
    AchievementService,
    XpService,
    TitleService,
    GameStatusService,
    WalletService,
    ProfileService,
    PrismaService,
    RpcExceptionService,
  ],
})
export class ProfileModule {}
