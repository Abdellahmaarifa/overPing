/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(3);
const gw_auth_service_1 = __webpack_require__(4);
const path_1 = __webpack_require__(13);
const rabbit_mq_1 = __webpack_require__(7);
const rmqServerName_1 = __webpack_require__(6);
const graphql_1 = __webpack_require__(14);
const apollo_1 = __webpack_require__(15);
const gw_auth_query_resolver_1 = __webpack_require__(16);
const gw_auth_mutations_resolver_1 = __webpack_require__(22);
const passport_1 = __webpack_require__(36);
const _42_strategy_1 = __webpack_require__(38);
const google_strategy_1 = __webpack_require__(40);
const jwt_accessToken_strategy_1 = __webpack_require__(42);
const gw_auth_controller_1 = __webpack_require__(44);
const services_1 = __webpack_require__(20);
const common_2 = __webpack_require__(27);
const jwt_refreshToken_strategy_1 = __webpack_require__(48);
const user_auth_guard_1 = __webpack_require__(37);
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            rabbit_mq_1.RabbitMqModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), './graphql/schema.gql'),
                context: ({ req, res }) => ({ req, res }),
                playground: true,
            }),
            rabbit_mq_1.RabbitMqModule.forClientProxy(rmqServerName_1.IRmqSeverName.AUTH)
        ],
        providers: [
            gw_auth_service_1.GatewayService,
            services_1.UserService,
            gw_auth_query_resolver_1.AuthQueryResolver,
            gw_auth_mutations_resolver_1.AuthMutationsResolver,
            _42_strategy_1.FortyTwoStrategy,
            google_strategy_1.GoogleStrategy,
            jwt_accessToken_strategy_1.JwtAccessTokenStrategy,
            jwt_refreshToken_strategy_1.JwtRefreshTokenStrategy,
            common_2.LoggerService,
            user_auth_guard_1.UserAccessAuthorizationGuard,
        ],
        controllers: [
            gw_auth_controller_1.AuthController,
        ]
    })
], GatewayModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(5);
const rmqServerName_1 = __webpack_require__(6);
const rabbit_mq_1 = __webpack_require__(7);
let GatewayService = class GatewayService {
    constructor(client, clientService) {
        this.client = client;
        this.clientService = clientService;
    }
    async signIn(authCredentials) {
        return await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'login' }, authCredentials);
    }
    async signUp(userInput) {
        return await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'signUp' }, userInput);
    }
    async logOut(id) {
        return await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'logOut' }, id);
    }
    async refresh(payload) {
        const response = await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'refresh-accessToken' }, payload);
        return response;
    }
    async getRefreshWithJwtAccessToken(payload) {
        return await this.clientService.sendMessageWithPayload(this.client, {
            role: "auth",
            cmd: "getRefreshWithJwtAccessToken"
        }, payload);
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object])
], GatewayService);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IRmqSeverName = void 0;
var IRmqSeverName;
(function (IRmqSeverName) {
    IRmqSeverName["USER"] = "USER_SERVICE";
    IRmqSeverName["AUTH"] = "AUTH_SERVICE";
    IRmqSeverName["GATEWAY"] = "GATEWAY_SERVOCE";
})(IRmqSeverName || (exports.IRmqSeverName = IRmqSeverName = {}));


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RabbitMqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RabbitMqModule = void 0;
const common_1 = __webpack_require__(3);
const rabbit_mq_service_1 = __webpack_require__(9);
const config_1 = __webpack_require__(10);
const microservices_1 = __webpack_require__(5);
let RabbitMqModule = RabbitMqModule_1 = class RabbitMqModule {
    static forClientProxy(service) {
        return {
            module: RabbitMqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync({
                    clients: [
                        {
                            name: service,
                            imports: [config_1.ConfigModule.forRoot({ envFilePath: './.env' })],
                            useFactory: async (configService) => {
                                const username = configService.get('RABBIT_MQ_USERNAME');
                                const password = configService.get('RABBIT_MQ_PASSWORD');
                                const host = configService.get('RABBITMQ_MQ_HOST');
                                return {
                                    transport: microservices_1.Transport.RMQ,
                                    options: {
                                        urls: [`amqp://${username}:${password}@${host}`],
                                        queue: 'auth_queuetwo',
                                        queueOptions: {
                                            durable: false
                                        }
                                    },
                                };
                            },
                            inject: [config_1.ConfigService],
                        },
                    ],
                }),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
exports.RabbitMqModule = RabbitMqModule;
exports.RabbitMqModule = RabbitMqModule = RabbitMqModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
        ],
        providers: [rabbit_mq_service_1.RabbitMqService],
        exports: [rabbit_mq_service_1.RabbitMqService],
    })
], RabbitMqModule);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RabbitMqService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(5);
const config_1 = __webpack_require__(10);
let RabbitMqService = class RabbitMqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(serviceQueue, noAck = false) {
        const USER = this.configService.get('RABBIT_MQ_USERNAME');
        const PASSWORD = this.configService.get('RABBIT_MQ_PASSWORD');
        const HOST = this.configService.get('RABBITMQ_MQ_HOST');
        const rmqUrl = `amqp://${USER}:${PASSWORD}@${HOST}`;
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [rmqUrl],
                queue: serviceQueue,
                queueOptions: {
                    durable: false
                }
            }
        };
    }
    async sendMessageWithPayload(client, messagePattern, payload) {
        try {
            return await client.send(messagePattern, payload).toPromise();
        }
        catch (error) {
            console.log("the error of the httpException comming from ther service{ ", error, "}");
            throw new common_1.HttpException(error.errorStatus, error.statusCode);
        }
    }
    async sendMessageWithoutPayload(client, messagePattern) {
        try {
            return await client.send(messagePattern, {}).toPromise();
        }
        catch (error) {
            throw new common_1.HttpException(error.errorStatus, error.statusCode);
        }
    }
    async emitMessageWithPayload(client, event, payload) {
        try {
            await client.emit(event, payload).toPromise();
        }
        catch (error) {
            throw new common_1.HttpException(error.errorStatus, error.statusCode);
        }
    }
};
exports.RabbitMqService = RabbitMqService;
exports.RabbitMqService = RabbitMqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RabbitMqService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthQueryResolver = void 0;
const graphql_1 = __webpack_require__(14);
const models_1 = __webpack_require__(17);
const services_1 = __webpack_require__(20);
let AuthQueryResolver = class AuthQueryResolver {
    constructor(gatewayService, userService) {
        this.gatewayService = gatewayService;
        this.userService = userService;
    }
    async findById(id) {
        const user = await this.userService.findById(id);
        return (user);
    }
    async findAll() {
        const users = await this.userService.findAll();
        return users;
    }
};
exports.AuthQueryResolver = AuthQueryResolver;
__decorate([
    (0, graphql_1.Query)(() => models_1.GQLUserModel),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthQueryResolver.prototype, "findById", null);
__decorate([
    (0, graphql_1.Query)(() => [models_1.GQLUserModel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthQueryResolver.prototype, "findAll", null);
exports.AuthQueryResolver = AuthQueryResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.GatewayService !== "undefined" && services_1.GatewayService) === "function" ? _a : Object, typeof (_b = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _b : Object])
], AuthQueryResolver);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GQLUserModel = void 0;
const graphql_1 = __webpack_require__(14);
let GQLUserModel = class GQLUserModel {
};
exports.GQLUserModel = GQLUserModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], GQLUserModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GQLUserModel.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GQLUserModel.prototype, "googleId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GQLUserModel.prototype, "fortyTwoId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], GQLUserModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GQLUserModel.prototype, "updatedAt", void 0);
exports.GQLUserModel = GQLUserModel = __decorate([
    (0, graphql_1.ObjectType)()
], GQLUserModel);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserWithAccessModel = void 0;
const graphql_1 = __webpack_require__(14);
const graphqlAuthUserModel_1 = __webpack_require__(18);
let UserWithAccessModel = class UserWithAccessModel {
};
exports.UserWithAccessModel = UserWithAccessModel;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserWithAccessModel.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof graphqlAuthUserModel_1.GQLUserModel !== "undefined" && graphqlAuthUserModel_1.GQLUserModel) === "function" ? _a : Object)
], UserWithAccessModel.prototype, "user", void 0);
exports.UserWithAccessModel = UserWithAccessModel = __decorate([
    (0, graphql_1.ObjectType)()
], UserWithAccessModel);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4), exports);
__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(5);
const rmqServerName_1 = __webpack_require__(6);
const rabbit_mq_1 = __webpack_require__(7);
let UserService = class UserService {
    constructor(client, clientService) {
        this.client = client;
        this.clientService = clientService;
    }
    async findOrCreateUser(profile) {
        console.log("gateway =======> starting to find the username: ", profile.username);
        try {
            const user = await this.findUserByUsername(profile.username);
            if (user) {
                console.log("gateway====> findOrcreateUser: user found", user);
                return user;
            }
        }
        catch (error) {
            const account = await this.createAccount(profile);
            console.log("gateway====> findorcreateuser account created : ", account);
            if (!account) {
                console.log("gateway====> findorcreateuser account was not created : ", account);
                throw new Error("Error creating account");
            }
            return account;
        }
    }
    async findUserByUsername(username) {
        const user = await this.clientService.sendMessageWithPayload(this.client, {
            role: 'user',
            cmd: 'find-user-by-username'
        }, username);
        return (user);
    }
    async createUser(user) {
        const createUser = this.clientService.sendMessageWithPayload(this.client, {
            role: 'user',
            cmd: "create-user",
        }, user);
        return (createUser);
    }
    async createProfile(user, profile) {
        return this.clientService.sendMessageWithPayload(this.client, {
            role: 'user',
            cmd: "create-profile",
        }, { user, profile });
    }
    async createAccount(user) {
        const userResponse = await this.createUser(user);
        console.log("gateway====> createAccount: userCreated :", userResponse.data);
        if (!userResponse.data) {
            console.log("gateway====> createAccount: userCreated  was not created:", userResponse.data);
            if (userResponse.message) {
                throw new common_1.BadRequestException(`Failed to create user: ${userResponse.message}`);
            }
            else {
                throw new common_1.BadRequestException("Can't create the user");
            }
        }
        return userResponse.data;
    }
    async findById(id) {
        const response = await this.clientService.sendMessageWithPayload(this.client, {
            role: 'user',
            cmd: 'findById'
        }, id);
        return (response);
    }
    async findAll() {
        const response = await this.clientService.sendMessageWithoutPayload(this.client, {
            role: 'user',
            cmd: 'findAll'
        });
        return (response);
    }
    async removeUser(id) {
        const response = await this.clientService.sendMessageWithPayload(this.client, {
            role: 'user',
            cmd: 'delete-user'
        }, id);
        return (response);
    }
    async getUserByRefreshTokenMatch(refreshToken) {
        const response = await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'OnRefreshTokenMatch' }, refreshToken);
        return response;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object])
], UserService);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMutationsResolver = void 0;
const graphql_1 = __webpack_require__(14);
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(20);
const input_1 = __webpack_require__(23);
const models_1 = __webpack_require__(17);
const common_2 = __webpack_require__(27);
const gql_user_decorator_1 = __webpack_require__(34);
const gql_refreshToken_guard_1 = __webpack_require__(35);
const user_auth_guard_1 = __webpack_require__(37);
let AuthMutationsResolver = class AuthMutationsResolver {
    constructor(authService, userService, loger) {
        this.authService = authService;
        this.userService = userService;
        this.loger = loger;
    }
    async signIn(context, authCredentialsInput) {
        const response = await this.authService.signIn(authCredentialsInput);
        const refreshToken = response.refreshToken;
        context.res.cookie('Refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response);
    }
    async signUp(ctx, userCreationInput) {
        const response = await this.authService.signUp(userCreationInput);
        ctx.res.cookie('Refresh_token', [...response.refreshToken], {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response);
    }
    async logOut(id) {
        return this.authService.logOut(id);
    }
    async removeUser(id) {
        return this.userService.removeUser(id);
    }
    async refresh(user) {
        const payload = {
            id: user.id,
            username: user.username
        };
        const result = await this.authService.refresh(payload);
        return (result);
    }
};
exports.AuthMutationsResolver = AuthMutationsResolver;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, graphql_1.Mutation)((returns) => models_1.UserWithAccessModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('authCredentials')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof input_1.AuthCredentialsInput !== "undefined" && input_1.AuthCredentialsInput) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthMutationsResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => models_1.UserWithAccessModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('userCreationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof input_1.UserCreationInput !== "undefined" && input_1.UserCreationInput) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthMutationsResolver.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAccessAuthorizationGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthMutationsResolver.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAccessAuthorizationGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthMutationsResolver.prototype, "removeUser", null);
__decorate([
    (0, common_1.UseGuards)(gql_refreshToken_guard_1.GqlJwtRefreshGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, gql_user_decorator_1.GqlCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthMutationsResolver.prototype, "refresh", null);
exports.AuthMutationsResolver = AuthMutationsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.GatewayService !== "undefined" && services_1.GatewayService) === "function" ? _a : Object, typeof (_b = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _b : Object, typeof (_c = typeof common_2.LoggerService !== "undefined" && common_2.LoggerService) === "function" ? _c : Object])
], AuthMutationsResolver);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthCredentialsInput = void 0;
const graphql_1 = __webpack_require__(14);
const class_validator_1 = __webpack_require__(25);
let AuthCredentialsInput = class AuthCredentialsInput {
};
exports.AuthCredentialsInput = AuthCredentialsInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], AuthCredentialsInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], AuthCredentialsInput.prototype, "password", void 0);
exports.AuthCredentialsInput = AuthCredentialsInput = __decorate([
    (0, graphql_1.InputType)()
], AuthCredentialsInput);


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCreationInput = void 0;
const graphql_1 = __webpack_require__(14);
const class_validator_1 = __webpack_require__(25);
let UserCreationInput = class UserCreationInput {
};
exports.UserCreationInput = UserCreationInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreationInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreationInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], UserCreationInput.prototype, "password", void 0);
exports.UserCreationInput = UserCreationInput = __decorate([
    (0, graphql_1.InputType)()
], UserCreationInput);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(29), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const common_service_1 = __webpack_require__(29);
const user_loger_service_1 = __webpack_require__(30);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [
            common_service_1.CommonService,
            user_loger_service_1.LoggerService,
        ],
        exports: [
            common_service_1.CommonService,
            user_loger_service_1.LoggerService,
        ],
    })
], CommonModule);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(3);
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(3);
let LoggerService = class LoggerService {
    constructor() { }
    actionLog(serviceName, functionName, action, data) {
        const resetColor = "\x1b[0m";
        const redColor = "\x1b[31m";
        const lightRed = "\x1b[91m";
        const brightBlue = "\x1b[94m";
        const brightMagenta = "\x1b[95m";
        const brightCyan = "\x1b[96m";
        console.log(`${brightBlue}[${serviceName}]${resetColor} - ${brightCyan}[${functionName}]${resetColor} - ${brightMagenta}${action}:${resetColor} ${lightRed}`, data, `${resetColor}`);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessResponseModel = void 0;
class SuccessResponseModel {
}
exports.SuccessResponseModel = SuccessResponseModel;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResponseDto = void 0;
class AuthResponseDto {
    constructor(accessToken, refreshToken, user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}
exports.AuthResponseDto = AuthResponseDto;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAuthUser = void 0;
class IAuthUser {
}
exports.IAuthUser = IAuthUser;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlCurrentUser = void 0;
const common_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(14);
exports.GqlCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlJwtRefreshGuard = void 0;
const common_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(14);
const passport_1 = __webpack_require__(36);
let GqlJwtRefreshGuard = class GqlJwtRefreshGuard extends (0, passport_1.AuthGuard)('jwt-refresh-token') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
exports.GqlJwtRefreshGuard = GqlJwtRefreshGuard;
exports.GqlJwtRefreshGuard = GqlJwtRefreshGuard = __decorate([
    (0, common_1.Injectable)()
], GqlJwtRefreshGuard);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAccessAuthorizationGuard = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(5);
const rabbit_mq_1 = __webpack_require__(7);
const rmqServerName_1 = __webpack_require__(6);
let UserAccessAuthorizationGuard = class UserAccessAuthorizationGuard {
    constructor(authClient, clientService) {
        this.authClient = authClient;
        this.clientService = clientService;
    }
    async canActivate(context) {
        let req;
        req = context.getArgs()[context.getArgs().length - 2].req;
        if (!req) {
            req = context.switchToHttp().getRequest();
        }
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Invalid or missing Authorization header');
        }
        const jwt = authorizationHeader.split('Bearer ')[1];
        if (!jwt)
            throw new common_1.UnauthorizedException('User not authenticated');
        const id = parseInt(req.params.id, 10) || parseInt(context.getArgs()[1].id, 10);
        if (!id)
            throw new common_1.BadRequestException('Missing user ID');
        const accessControlObject = {
            token: jwt,
            id,
        };
        return this.clientService.sendMessageWithPayload(this.authClient, { role: 'auth', cmd: 'checkAccess' }, accessControlObject);
    }
};
exports.UserAccessAuthorizationGuard = UserAccessAuthorizationGuard;
exports.UserAccessAuthorizationGuard = UserAccessAuthorizationGuard = __decorate([
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object])
], UserAccessAuthorizationGuard);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FortyTwoStrategy = void 0;
const passport_1 = __webpack_require__(36);
const common_1 = __webpack_require__(3);
const passport_42_1 = __webpack_require__(39);
const services_1 = __webpack_require__(20);
let FortyTwoStrategy = class FortyTwoStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(userService) {
        super({
            clientID: process.env.FORTYTWO_APP_ID,
            clientSecret: process.env.FROTYTWO_APP_SECRET,
            callbackURL: 'http://localhost:5500/auth/42/fortytwo-callback/',
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile) {
        const user = {
            fortyTwoId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            emails: profile.emails,
        };
        const account = await this.userService.findOrCreateUser(user);
        return (account);
    }
};
exports.FortyTwoStrategy = FortyTwoStrategy;
exports.FortyTwoStrategy = FortyTwoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _a : Object])
], FortyTwoStrategy);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("passport-42");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const passport_1 = __webpack_require__(36);
const common_1 = __webpack_require__(3);
const passport_google_oauth20_1 = __webpack_require__(41);
const gw_user_service_1 = __webpack_require__(21);
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userService) {
        super({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: ['profile', 'email'],
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile) {
        const email = profile.emails[0].value;
        const username = email.split('@')[0];
        const userAccount = {
            googleId: profile.id,
            username: username,
            displayName: profile.displayName,
            emails: profile.emails,
        };
        console.log("gateway=======> prepare for the validate the user: the input is ", userAccount);
        const account = await this.userService.findOrCreateUser(userAccount);
        return (account);
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof gw_user_service_1.UserService !== "undefined" && gw_user_service_1.UserService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessTokenStrategy = void 0;
const passport_jwt_1 = __webpack_require__(43);
const passport_1 = __webpack_require__(36);
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(20);
const common_2 = __webpack_require__(27);
let JwtAccessTokenStrategy = class JwtAccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(userService, loger) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
        this.userService = userService;
        this.loger = loger;
    }
    async validate(payload) {
        this.loger.actionLog("gateway", "jwt", "is jwt validate", payload);
        const user = await this.userService.findById(payload.sub);
        return (user);
    }
};
exports.JwtAccessTokenStrategy = JwtAccessTokenStrategy;
exports.JwtAccessTokenStrategy = JwtAccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _a : Object, typeof (_b = typeof common_2.LoggerService !== "undefined" && common_2.LoggerService) === "function" ? _b : Object])
], JwtAccessTokenStrategy);


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const _42_auth_grade_1 = __webpack_require__(45);
const google_auth_grad_1 = __webpack_require__(46);
const gw_auth_service_1 = __webpack_require__(4);
const refreshToken_guard_1 = __webpack_require__(47);
let AuthController = class AuthController {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async redirectToFortyTwoAuth() { }
    async fortyTwoAuthCallback(req, ip, res) {
        return res.send(req.user);
    }
    async redirectToGoogleAuth() { }
    async GoogleoAuthCallback(req, ip, res) {
        const user = req.user;
        const token = await this.gatewayService.getRefreshWithJwtAccessToken({ id: req.user.id, username: req.user.username });
        console.log("the token", token);
        const access_token = token.accessToken;
        const refresh_token = token.refreshToken;
        res.setHeader('Set-Cookie', `access_token="${access_token}"; Path=/; HttpOnly`);
        res.setHeader('Set-Cookie', `refresh_token="${refresh_token}"; Path=/; HttpOnly`);
        res.redirect(`http://localhost:3000/userinfo?user=${encodeURIComponent(JSON.stringify(user))}`);
    }
    async refresh(req) {
        const payload = {
            id: req.user.id,
            username: req.user.username
        };
        const result = await this.gatewayService.refresh(payload);
        console.log("gateway ===========> result: [", result, "]");
        return (result);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(_42_auth_grade_1.FortyTwoGuard),
    (0, common_1.Get)('42'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToFortyTwoAuth", null);
__decorate([
    (0, common_1.UseGuards)(_42_auth_grade_1.FortyTwoGuard),
    (0, common_1.Get)('42/fortytwo-callback'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fortyTwoAuthCallback", null);
__decorate([
    (0, common_1.UseGuards)(google_auth_grad_1.GoogleGuard),
    (0, common_1.Get)('google'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToGoogleAuth", null);
__decorate([
    (0, common_1.UseGuards)(google_auth_grad_1.GoogleGuard),
    (0, common_1.Get)('google/google-callback'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "GoogleoAuthCallback", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof gw_auth_service_1.GatewayService !== "undefined" && gw_auth_service_1.GatewayService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FortyTwoGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(36);
let FortyTwoGuard = class FortyTwoGuard extends (0, passport_1.AuthGuard)('42') {
    handleRequest(err, user, info, context, status) {
        if (err || !user) {
            throw new common_1.UnauthorizedException('Invalid JWT');
        }
        return super.handleRequest(err, user, info, context, status);
    }
};
exports.FortyTwoGuard = FortyTwoGuard;
exports.FortyTwoGuard = FortyTwoGuard = __decorate([
    (0, common_1.Injectable)()
], FortyTwoGuard);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(36);
let GoogleGuard = class GoogleGuard extends (0, passport_1.AuthGuard)('google') {
    handleRequest(err, user, info, context, status) {
        if (err || !user) {
            throw new common_1.UnauthorizedException(err, 'Invalid JWT');
        }
        console.log('the guard is working=========================== ');
        return super.handleRequest(err, user, info, context, status);
    }
};
exports.GoogleGuard = GoogleGuard;
exports.GoogleGuard = GoogleGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleGuard);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(36);
let RefreshTokenGuard = class RefreshTokenGuard extends (0, passport_1.AuthGuard)('jwt-refresh-token') {
    handleRequest(err, user, info, context, status) {
        if (err || !user) {
            throw new common_1.UnauthorizedException('Invalid JWT');
        }
        return super.handleRequest(err, user, info, context, status);
    }
};
exports.RefreshTokenGuard = RefreshTokenGuard;
exports.RefreshTokenGuard = RefreshTokenGuard = __decorate([
    (0, common_1.Injectable)()
], RefreshTokenGuard);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = __webpack_require__(43);
const passport_1 = __webpack_require__(36);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(10);
const services_1 = __webpack_require__(20);
const common_2 = __webpack_require__(27);
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(configService, userService, loger) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    this.loger.actionLog("gateway", "refresh starategy ", "get cookies", request?.cookies?.Refresh_token);
                    return request?.cookies?.Refresh_token;
                },
            ]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.userService = userService;
        this.loger = loger;
    }
    async validate(request, payload) {
        const refreshTokenObject = {
            id: payload.sub,
            refreshToken: request.cookies?.Refresh_token,
        };
        this.loger.actionLog("gateway", "refresh starategy ", "get the payload", refreshTokenObject);
        return this.userService.getUserByRefreshTokenMatch(refreshTokenObject);
    }
};
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _b : Object, typeof (_c = typeof common_2.LoggerService !== "undefined" && common_2.LoggerService) === "function" ? _c : Object])
], JwtRefreshTokenStrategy);


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const gateway_module_1 = __webpack_require__(2);
const cookieParser = __webpack_require__(49);
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    app.use(cookieParser());
    app.enableCors({
        origin: "http://localhost:3000",
    });
    await app.listen(5500);
}
bootstrap();

})();

/******/ })()
;