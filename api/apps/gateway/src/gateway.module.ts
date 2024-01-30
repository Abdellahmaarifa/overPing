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
import { UserService, GwFriendshipService } from './microservices/auth/services';
import { LoggerService } from '@app/common';
import { JwtRefreshTokenStrategy } from './microservices/auth/strategies/jwt.refreshToken.strategy';
import { UserAccessAuthorizationGuard } from './microservices/auth/guards/user-auth.guard';
import { GwProfileService } from './microservices/profile/services/gw.profile.service';
import { ProfileQueryResolver } from './microservices/profile/graphql/queries/gw.profile.query.resolver';
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
import { GwChannelService } from "./microservices/chat/services";
import { GwDirectMessageService } from "./microservices/chat/services";
import { GwFriendMutationsResolver } from './microservices/auth/graphql/mutations/gw.friendship.mutaions.resolver';
import { FriendshipQueryResolver } from './microservices/auth/graphql/queries/gw.friend.query.resolver';
import { UserStatusService } from './microservices/auth/services/gw.userStatus.service';
import { ChannelResolver } from "./microservices/chat/graphql/mutations/gw.channels.mutations.resolver";
import { directMessageResolver } from "./microservices/chat/graphql/mutations/gw.directMessages.mutations.resolver";
import { ChatQueriesResolver } from "./microservices/chat/graphql/queries/gw.chat.query";
import { formatError } from "./global-filter/gqlFilter";
import { UserCheckService } from "./microservices/chat/services/userCheck.service";
import { GwGameService } from "./microservices/game/services/gw.game.service";
import { GameQueriesResolver } from "./microservices/game/graphql/queries/gw.game.guery";

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
      },
      playground : true,
      installSubscriptionHandlers: true, // This enables WebSocket subscriptions
      subscriptions: {
    'graphql-ws': {
      path: '/graphql',
    },
  },
      formatError: formatError,
    }),
  RabbitMqModule.forClientProxy(IRmqSeverName.AUTH),
  RabbitMqModule.forClientProxy(IRmqSeverName.PROFILE),
  RabbitMqModule.forClientProxy(IRmqSeverName.MATCH_MAKING),
  RabbitMqModule.forClientProxy(IRmqSeverName.CHAT),
  RabbitMqModule.forClientProxy(IRmqSeverName.MEDIA),
  RabbitMqModule.forClientProxy(IRmqSeverName.FRIEND),
  RabbitMqModule.forClientProxy(IRmqSeverName.GAME),
],
  providers: [{
    provide: 'PUB_SUB',
    useValue: new PubSub(),
    },
    //user status service
      UserStatusService,
    // end of suer status 
    //friend
    FriendshipQueryResolver,
    GwFriendshipService,
    GwFriendMutationsResolver,
    //end of friend
    //chat 
    UserCheckService,
    GwDirectMessageService,
    GwChannelService,
    directMessageResolver,
    ChannelResolver,
    ChatQueriesResolver,
    //end of chat
    // GwFriendService,
    GWMediaService,
    GwMatchMakingService, 
    GatewayService,
    UserService,
    GwProfileService,
    GwWalletService,
    MatchMakingQueryResolver,
    MatchMakingMutationsResolver,
    // FriendMutationsResolver,
    ProfileQueryResolver,
    MediaMutationsResolver,
    UserProifleMutationsResolver,
    WalletMutationsResolver,
    AuthQueryResolver,
    // FriendQueryResolver,
    AuthMutationsResolver,
    TWOFATokenStrategy,
    FortyTwoStrategy,
    GoogleStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LoggerService,
    UserAccessAuthorizationGuard,
    // game status service
    GameQueriesResolver,
    GwGameService,
    // end of game
  ],
  controllers:[
    MeidaController,
    AuthController,
    GwMatchmakingController,
  ]
})
export class GatewayModule {
  configure(consumer: any) {
    consumer.apply(graphqlUploadExpress({ maxFileSize: 500000000000, maxFiles: 3 })).forRoutes('graphql');
    // consumer.apply(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 3 })).forRoutes('graphql');
  }
}
