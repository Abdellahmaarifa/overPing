import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRmqSeverName } from './interface/rmqServerName';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_SERVICES } from '@app/rabbit-mq/constent/rabbit-constent'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static forClientProxy(service: IRmqSeverName): DynamicModule {
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.registerAsync({
          clients: [
            {
              name: service,
              imports: [ConfigModule.forRoot({ envFilePath: './.env' })],
              useFactory: async (configService: ConfigService) => {
                const username =  configService.get<string>('RABBIT_MQ_USERNAME');
                const password =  configService.get<string>('RABBIT_MQ_PASSWORD');
                const host =  configService.get<string>('RABBITMQ_MQ_HOST');

                return {
                  transport: Transport.RMQ,
                  options: {
                    urls: [`amqp://${username}:${password}@${host}`],
                    queue: RABBIT_SERVICES[service].queue,
                    queueOptions: {
                            durable: false
                    }
                  },
                };
              },
              inject: [ConfigService],
            },
          ],
        }),
      ],
      exports: [ClientsModule],
    };
  }
}
