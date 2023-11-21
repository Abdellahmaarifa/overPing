import { Module } from '@nestjs/common';
import { GatewayService } from './microservices/auth/services/gw.auth.service'; 
import { join } from 'path';
import { RabbitMqModule } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthQueryResolver } from './microservices/auth/graphql/queries/gw.auth.query.resolver'
import { AuthMutationsResolver } from './microservices/auth/graphql/mutations/gw.auth.mutations.resolver';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './microservices/auth/strategies/42.strategy';
import { GoogleStrategy } from './microservices/auth/strategies/google.strategy';
import { JwtAccessTokenStrategy } from './microservices/auth/strategies/jwt.accessToken.strategy';
import { AuthController } from './microservices/auth/controllers/gw.auth.controller';
import { UserService } from './microservices/auth/services';
import { LoggerService } from '@app/common';
import { JwtRefreshTokenStrategy } from './microservices/auth/strategies/jwt.refreshToken.strategy';
import { UserAccessAuthorizationGuard } from './microservices/auth/guards/user-auth.guard';
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
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LoggerService,
    UserAccessAuthorizationGuard,
  ],
  controllers:[
    AuthController,
  ]
})
export class GatewayModule {}
