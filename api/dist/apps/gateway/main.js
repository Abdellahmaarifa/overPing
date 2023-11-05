/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/gateway/src/gateway.module.ts":
/*!********************************************!*\
  !*** ./apps/gateway/src/gateway.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./microservices/auth/services/auth.service */ "./apps/gateway/src/microservices/auth/services/auth.service.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const auth_query_resolver_1 = __webpack_require__(/*! ./microservices/auth/graphql/queries/auth.query.resolver */ "./apps/gateway/src/microservices/auth/graphql/queries/auth.query.resolver.ts");
const auth_mutations_resolver_1 = __webpack_require__(/*! ./microservices/auth/graphql/mutations/auth.mutations.resolver */ "./apps/gateway/src/microservices/auth/graphql/mutations/auth.mutations.resolver.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const _42_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/42.strategy */ "./apps/gateway/src/microservices/auth/strategies/42.strategy.ts");
const google_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/google.strategy */ "./apps/gateway/src/microservices/auth/strategies/google.strategy.ts");
const auth_controller_1 = __webpack_require__(/*! ./microservices/auth/controllers/auth.controller */ "./apps/gateway/src/microservices/auth/controllers/auth.controller.ts");
const services_1 = __webpack_require__(/*! ./microservices/auth/services */ "./apps/gateway/src/microservices/auth/services/index.ts");
const loger_1 = __webpack_require__(/*! @app/common/loger */ "./libs/common/src/loger/index.ts");
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
            auth_service_1.GatewayService,
            services_1.UserService,
            auth_query_resolver_1.AuthQueryResolver,
            auth_mutations_resolver_1.AuthMutationsResolver,
            _42_strategy_1.FortyTwoStrategy,
            google_strategy_1.GoogleStrategy,
            loger_1.LoggerService,
        ],
        controllers: [
            auth_controller_1.AuthController,
        ]
    })
], GatewayModule);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/controllers/auth.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/controllers/auth.controller.ts ***!
  \****************************************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const _42_auth_grade_1 = __webpack_require__(/*! ../guards/42.auth.grade */ "./apps/gateway/src/microservices/auth/guards/42.auth.grade.ts");
const google_auth_grad_1 = __webpack_require__(/*! ../guards/google.auth.grad */ "./apps/gateway/src/microservices/auth/guards/google.auth.grad.ts");
const services_1 = __webpack_require__(/*! ../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async hello() {
        return await this.userService.findUserByUsername("some");
    }
    async redirectToFortyTwoAuth() { }
    async fortyTwoAuthCallback(req, ip, res) {
        return res.send(req.user);
    }
    async redirectToGoogleAuth() { }
    async GoogleoAuthCallback(req, ip, res) {
        console.log("req--------> ", req);
        return res.send(req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hello", null);
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
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/input/auth.credentials.input.ts":
/*!*************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/input/auth.credentials.input.ts ***!
  \*************************************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
let AuthCredentialsInput = class AuthCredentialsInput {
};
exports.AuthCredentialsInput = AuthCredentialsInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], AuthCredentialsInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], AuthCredentialsInput.prototype, "password", void 0);
exports.AuthCredentialsInput = AuthCredentialsInput = __decorate([
    (0, graphql_1.InputType)()
], AuthCredentialsInput);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/input/index.ts":
/*!********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/input/index.ts ***!
  \********************************************************************/
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
__exportStar(__webpack_require__(/*! ./auth.credentials.input */ "./apps/gateway/src/microservices/auth/graphql/input/auth.credentials.input.ts"), exports);
__exportStar(__webpack_require__(/*! ./user.creation.input */ "./apps/gateway/src/microservices/auth/graphql/input/user.creation.input.ts"), exports);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/input/user.creation.input.ts":
/*!**********************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/input/user.creation.input.ts ***!
  \**********************************************************************************/
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
exports.UserCreationIput = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
let UserCreationIput = class UserCreationIput {
};
exports.UserCreationIput = UserCreationIput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreationIput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserCreationIput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], UserCreationIput.prototype, "password", void 0);
exports.UserCreationIput = UserCreationIput = __decorate([
    (0, graphql_1.InputType)()
], UserCreationIput);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/mutations/auth.mutations.resolver.ts":
/*!******************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/mutations/auth.mutations.resolver.ts ***!
  \******************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMutationsResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! apps/gateway/src/microservices/auth/services/auth.service */ "./apps/gateway/src/microservices/auth/services/auth.service.ts");
const input_1 = __webpack_require__(/*! ../input */ "./apps/gateway/src/microservices/auth/graphql/input/index.ts");
const models_1 = __webpack_require__(/*! apps/gateway/src/models */ "./apps/gateway/src/models/index.ts");
const loger_1 = __webpack_require__(/*! @app/common/loger */ "./libs/common/src/loger/index.ts");
let AuthMutationsResolver = class AuthMutationsResolver {
    constructor(gatewayService, loger) {
        this.gatewayService = gatewayService;
        this.loger = loger;
    }
    async signIn(context, authCredentialsInput) {
        this.loger.actionLog("gateWay", "mutation/signIn()", "the user starting the signIn action", "nothing");
        const response = await this.gatewayService.signIn(authCredentialsInput);
        context.res.cookie('refresh_token', [...response.refreshToken], {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response);
    }
    async singUp(ctx, userCreationIput) {
        console.log("gateway======> starting the singup", userCreationIput);
        const response = await this.gatewayService.signUp(userCreationIput);
        ctx.res.cookie('refresh_token', [...response.refreshToken], {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        console.log("gateway======>>the response for the mutation : ", response);
        return (response);
    }
    async hello() {
        return await this.gatewayService.hello();
    }
};
exports.AuthMutationsResolver = AuthMutationsResolver;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, graphql_1.Mutation)((returns) => models_1.UserWithAccessModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('authCredentials')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof input_1.AuthCredentialsInput !== "undefined" && input_1.AuthCredentialsInput) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthMutationsResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => models_1.UserWithAccessModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('userCreationIput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof input_1.UserCreationIput !== "undefined" && input_1.UserCreationIput) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthMutationsResolver.prototype, "singUp", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthMutationsResolver.prototype, "hello", null);
exports.AuthMutationsResolver = AuthMutationsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.GatewayService !== "undefined" && auth_service_1.GatewayService) === "function" ? _a : Object, typeof (_b = typeof loger_1.LoggerService !== "undefined" && loger_1.LoggerService) === "function" ? _b : Object])
], AuthMutationsResolver);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/queries/auth.query.resolver.ts":
/*!************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/queries/auth.query.resolver.ts ***!
  \************************************************************************************/
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
exports.AuthQueryResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const services_1 = __webpack_require__(/*! ../../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
let AuthQueryResolver = class AuthQueryResolver {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async hello() {
        const result = 'string';
        return (result);
    }
};
exports.AuthQueryResolver = AuthQueryResolver;
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthQueryResolver.prototype, "hello", null);
exports.AuthQueryResolver = AuthQueryResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.GatewayService !== "undefined" && services_1.GatewayService) === "function" ? _a : Object])
], AuthQueryResolver);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/guards/42.auth.grade.ts":
/*!*********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/guards/42.auth.grade.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FortyTwoGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
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

/***/ "./apps/gateway/src/microservices/auth/guards/google.auth.grad.ts":
/*!************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/guards/google.auth.grad.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
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

/***/ "./apps/gateway/src/microservices/auth/services/auth.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/services/auth.service.ts ***!
  \**********************************************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/gateway/src/microservices/auth/services/user.service.ts");
let GatewayService = class GatewayService {
    constructor(client, clientService, userService) {
        this.client = client;
        this.clientService = clientService;
        this.userService = userService;
    }
    async signIn(authCredentials) {
        const response = await this.clientService.sendMessageWithPayload(this.client, { role: 'auth', cmd: 'login' }, authCredentials);
        return (response);
    }
    async hello() {
        return await this.clientService.sendMessageWithPayload(this.client, {
            role: "hello",
            cmd: "greeting"
        }, "hello world");
    }
    async signUp(userInput) {
        console.log("gateWay======> strating the cerate the acount: ", userInput);
        const user = await this.userService.createAccount(userInput);
        console.log("gateWay=====> the a account was created : ", user);
        return {
            user: user.user,
            acessToken: 'some thing should move from here ',
            refreshToken: "some thing should move from here",
        };
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], GatewayService);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/services/index.ts":
/*!***************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/services/index.ts ***!
  \***************************************************************/
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
__exportStar(__webpack_require__(/*! ./auth.service */ "./apps/gateway/src/microservices/auth/services/auth.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./user.service */ "./apps/gateway/src/microservices/auth/services/user.service.ts"), exports);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/services/user.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/services/user.service.ts ***!
  \**********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
let UserService = class UserService {
    constructor(client, clientService) {
        this.client = client;
        this.clientService = clientService;
    }
    async findOrCreateUser(profile) {
        console.log("gateway =======> starting to find the username: ", profile.username);
        const user = await this.findUserByUsername(profile.username);
        if (user) {
            console.log("gateway====> findOrcreateUser: user found", user);
            return user;
        }
        console.log("gateway====> findOrcreateUser: user was not found", user);
        const account = await this.createAccount(profile);
        console.log("gateway====> findorcreateuser account created : ", account);
        if (!account) {
            console.log("gateway====> findorcreateuser account was not created : ", account);
            throw new Error("Error creating account");
        }
        return account;
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object])
], UserService);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/strategies/42.strategy.ts":
/*!***********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/strategies/42.strategy.ts ***!
  \***********************************************************************/
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
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_42_1 = __webpack_require__(/*! passport-42 */ "passport-42");
const services_1 = __webpack_require__(/*! ../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
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

/***/ "./apps/gateway/src/microservices/auth/strategies/google.strategy.ts":
/*!***************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/strategies/google.strategy.ts ***!
  \***************************************************************************/
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
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/gateway/src/microservices/auth/services/user.service.ts");
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
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),

/***/ "./apps/gateway/src/models/graphqlAuthUserModel.ts":
/*!*********************************************************!*\
  !*** ./apps/gateway/src/models/graphqlAuthUserModel.ts ***!
  \*********************************************************/
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
exports.GQLUserModel = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let GQLUserModel = class GQLUserModel {
};
exports.GQLUserModel = GQLUserModel;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], GQLUserModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], GQLUserModel.prototype, "username", void 0);
exports.GQLUserModel = GQLUserModel = __decorate([
    (0, graphql_1.ObjectType)()
], GQLUserModel);


/***/ }),

/***/ "./apps/gateway/src/models/graphqlUserWithCookiesModel.ts":
/*!****************************************************************!*\
  !*** ./apps/gateway/src/models/graphqlUserWithCookiesModel.ts ***!
  \****************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const graphqlAuthUserModel_1 = __webpack_require__(/*! ./graphqlAuthUserModel */ "./apps/gateway/src/models/graphqlAuthUserModel.ts");
let UserWithAccessModel = class UserWithAccessModel {
};
exports.UserWithAccessModel = UserWithAccessModel;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserWithAccessModel.prototype, "acessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof graphqlAuthUserModel_1.GQLUserModel !== "undefined" && graphqlAuthUserModel_1.GQLUserModel) === "function" ? _a : Object)
], UserWithAccessModel.prototype, "user", void 0);
exports.UserWithAccessModel = UserWithAccessModel = __decorate([
    (0, graphql_1.ObjectType)()
], UserWithAccessModel);


/***/ }),

/***/ "./apps/gateway/src/models/index.ts":
/*!******************************************!*\
  !*** ./apps/gateway/src/models/index.ts ***!
  \******************************************/
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
__exportStar(__webpack_require__(/*! ./graphqlAuthUserModel */ "./apps/gateway/src/models/graphqlAuthUserModel.ts"), exports);
__exportStar(__webpack_require__(/*! ./graphqlUserWithCookiesModel */ "./apps/gateway/src/models/graphqlUserWithCookiesModel.ts"), exports);


/***/ }),

/***/ "./libs/common/src/loger/index.ts":
/*!****************************************!*\
  !*** ./libs/common/src/loger/index.ts ***!
  \****************************************/
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
__exportStar(__webpack_require__(/*! ./user.loger.service */ "./libs/common/src/loger/user.loger.service.ts"), exports);


/***/ }),

/***/ "./libs/common/src/loger/user.loger.service.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/loger/user.loger.service.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LoggerService = class LoggerService {
    constructor() { }
    actionLog(serviceName, functionName, action, data) {
        const resetColor = "\x1b[0m";
        const redColor = "\x1b[31m";
        const lightRed = "\x1b[91m";
        const brightBlue = "\x1b[94m";
        const brightMagenta = "\x1b[95m";
        const brightCyan = "\x1b[96m";
        console.log(`${brightBlue}[${serviceName}]${resetColor} - ${brightCyan}[${functionName}]${resetColor} - ${brightMagenta}${action}:${resetColor} ${lightRed}${data}${resetColor}`);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);


/***/ }),

/***/ "./libs/rabbit-mq/src/index.ts":
/*!*************************************!*\
  !*** ./libs/rabbit-mq/src/index.ts ***!
  \*************************************/
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
__exportStar(__webpack_require__(/*! ./rabbit-mq.module */ "./libs/rabbit-mq/src/rabbit-mq.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./rabbit-mq.service */ "./libs/rabbit-mq/src/rabbit-mq.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./interface/message-pattren.interface */ "./libs/rabbit-mq/src/interface/message-pattren.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./interface/respond-message-pattren.interface */ "./libs/rabbit-mq/src/interface/respond-message-pattren.interface.ts"), exports);


/***/ }),

/***/ "./libs/rabbit-mq/src/interface/message-pattren.interface.ts":
/*!*******************************************************************!*\
  !*** ./libs/rabbit-mq/src/interface/message-pattren.interface.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/rabbit-mq/src/interface/respond-message-pattren.interface.ts":
/*!***************************************************************************!*\
  !*** ./libs/rabbit-mq/src/interface/respond-message-pattren.interface.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/rabbit-mq/src/interface/rmqServerName.ts":
/*!*******************************************************!*\
  !*** ./libs/rabbit-mq/src/interface/rmqServerName.ts ***!
  \*******************************************************/
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

/***/ "./libs/rabbit-mq/src/rabbit-mq.module.ts":
/*!************************************************!*\
  !*** ./libs/rabbit-mq/src/rabbit-mq.module.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rabbit_mq_service_1 = __webpack_require__(/*! ./rabbit-mq.service */ "./libs/rabbit-mq/src/rabbit-mq.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
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

/***/ "./libs/rabbit-mq/src/rabbit-mq.service.ts":
/*!*************************************************!*\
  !*** ./libs/rabbit-mq/src/rabbit-mq.service.ts ***!
  \*************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-42":
/*!******************************!*\
  !*** external "passport-42" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("passport-42");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
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
/*!**********************************!*\
  !*** ./apps/gateway/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const gateway_module_1 = __webpack_require__(/*! ./gateway.module */ "./apps/gateway/src/gateway.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    await app.listen(5500);
}
bootstrap();

})();

/******/ })()
;