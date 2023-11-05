import { Module } from '@nestjs/common';
import { GatewayService } from './microservices/auth/services/auth.service'; 
import { join } from 'path';
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthQueryResolver } from './microservices/auth/graphql/queries/auth.query.resolver'
import { AuthMutationsResolver } from './microservices/auth/graphql/mutations/auth.mutations.resolver';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './microservices/auth/strategies/42.strategy';
import { GoogleStrategy } from './microservices/auth/strategies/google.strategy';
import { AuthController } from './microservices/auth/controllers/auth.controller';
import { UserService } from './microservices/auth/services';
import { LoggerService } from '@app/common/loger';
@Module({
  imports: [
    PassportModule,
    RabbitMqModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(), './graphql/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
  //   ClientsModule.register([{
  //   name: IRmqSeverName.AUTH,
  //   transport: Transport.RMQ,
  //   options: {
  //     urls:['amqp://boucactus:pass@rabbitmq:5672'],
  //     queue: 'auth_queuetwo',
  //     queueOptions: {
  //       durable: false
  //     }
  //   }
  // }])
  RabbitMqModule.forClientProxy(IRmqSeverName.AUTH)
],
  providers: [
    GatewayService,
    UserService,
    AuthQueryResolver,
    AuthMutationsResolver,
    FortyTwoStrategy,
    GoogleStrategy,
    LoggerService,
  ],
  controllers:[
    AuthController,
  ]
})
export class GatewayModule {}
