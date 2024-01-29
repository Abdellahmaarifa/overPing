import {  Module } from '@nestjs/common';
import { MatchmakingController } from './controller/matchmaking.controller';
import { MatchmakingService } from './services/matchmaking.service';
import { CommonModule } from '@app/common';
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { MatchmakingJob } from './jobs/matchmaking.job';
import { RabbitMqService } from '@app/rabbit-mq';
import { ScheduleModule } from '@nestjs/schedule';
import { PoolService} from './services/pool.service';
import { RpcExceptionService } from '@app/common/exception-handling';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    RabbitMqModule,

    RabbitMqModule.forClientProxy(IRmqSeverName.GATEWAY),
    RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
    RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE)
  ],
  controllers: [MatchmakingController],
  providers: [
    MatchmakingService,
    MatchmakingJob,
    MatchmakingService,
    RabbitMqService,
    PoolService,
    RpcExceptionService,
  ],
  exports: [PoolService],
})
export class MatchmakingModule {}
