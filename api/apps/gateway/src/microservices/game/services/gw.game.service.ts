import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameHistoryInput } from '../graphql/input/game.input';
import { GQLGameHistory } from '../graphql/models/graphqlGameModel';

@Injectable()
export class GwGameService {
  constructor(
    @Inject(IRmqSeverName.GAME)
    private readonly client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) {}

  async getUserMatchHistory(payload: GameHistoryInput) : Promise<GQLGameHistory[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'game',
          cmd: 'get-user-match-history',
      },
      payload
    );
  }

  async getFriendshipMatches(payload: GameHistoryInput) : Promise<GQLGameHistory[]> {
    return await this.clientService.sendMessageWithPayload(
      this.client,
      {
          role: 'game',
          cmd: 'get-friendship-matches',
      },
      payload
      );
  }
  
}