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
import { GwProfileService } from './microservices/profile/services/gw.profile.service';
import { ProfileQueryResolver } from './microservices/profile/graphql/queries/gw.profile.guery.resolver';
import { UserProifleMutationsResolver } from './microservices/profile/graphql/mutations/gw.profile.mutations.resolver';
import { WalletMutationsResolver } from './microservices/profile/graphql/mutations/gw.wallet.user.mutations.resolver';
import { GwWalletService } from './microservices/profile/services/gw.wallet.service';




@Module({
  imports: [
    PassportModule,
    RabbitMqModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(), './graphql/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true
      },
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
  RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
  RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE)
],
  providers: [
    GatewayService,
    UserService,
    GwProfileService,
    GwWalletService,
    ProfileQueryResolver,
    UserProifleMutationsResolver,
    WalletMutationsResolver,
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
export class GatewayModule {
}
