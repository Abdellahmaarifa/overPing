import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { RabbitMqService } from '@app/rabbit-mq';
import { IGameData } from 'apps/game/src/Interfaces/game.interface';
import { GameHistoryInput } from '../graphql/input/game.input';

@Injectable()
export class GwGameService {
  constructor(
    @Inject(IRmqSeverName.GAME)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) {}

  async getUserMatchHistory(payload: GameHistoryInput) : Promise<IGameData[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'game',
          cmd: 'get-user-match-history',
      },
      payload
    );
  }

  async getFriendshipMatches(payload: GameHistoryInput) : Promise<IGameData[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'game',
          cmd: 'get-user-match-history',
      },
      payload
    );
  }

}