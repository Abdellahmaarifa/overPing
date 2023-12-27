import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
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
import { MatchMakingQueryResolver } from './microservices/matchMaking/graphql/queries/gw.matchMaking.query.resolver';
import { GwMatchMakingService } from './microservices/matchMaking/services/gw.matchMaking.service';
import { PubSub } from 'graphql-subscriptions';
import { MatchMakingMutationsResolver } from './microservices/matchMaking/graphql/mutations/gw.matchMaking.mutation.resolver';
import { GwMatchmakingController } from './microservices/matchMaking/controller/gw.matchmaking.controller';
import { graphqlUploadExpress } from 'graphql-upload';
import { GWMediaService } from './microservices/media/services/gw.media.service';
import { TWOFATokenStrategy } from "./microservices/auth/strategies/twoFA.starategy";
import { MeidaController } from './microservices/media/controllers/gw.media.controller';
import { MediaMutationsResolver } from './microservices/media/graphql/mutations/gw.media.mutation';









@Module({
  imports: [
    PassportModule,
    RabbitMqModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(), './graphql/schema.gql'),
      uploads: false,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true
      //   origin: ["http://localhost:5173"],
      },
      playground: true,
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql'
        },
      }
    
    }),
  RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
  RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE),
  RabbitMqModule.forClientProxy(IRmqSeverName.MATCH_MAKING),
  RabbitMqModule.forClientProxy(IRmqSeverName.MEDIA),
],
  providers: [{
    provide: 'PUB_SUB',
    useValue: new PubSub(),
    },
    
    GWMediaService,
    GwMatchMakingService, 
    GatewayService,
    UserService,
    GwProfileService,
    GwWalletService,
    MatchMakingQueryResolver,
    MatchMakingMutationsResolver,
    ProfileQueryResolver,
    MediaMutationsResolver,
    UserProifleMutationsResolver,
    WalletMutationsResolver,
    AuthQueryResolver,
    AuthMutationsResolver,
    TWOFATokenStrategy,
    FortyTwoStrategy,
    GoogleStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LoggerService,
    UserAccessAuthorizationGuard,
  ],
  controllers:[
    MeidaController,
    AuthController,
    GwMatchmakingController,
  ]
})
export class GatewayModule {
  configure(consumer: any) {
    consumer.apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })).forRoutes('graphql');
  }
}
