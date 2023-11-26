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
const gw_auth_service_1 = __webpack_require__(/*! ./microservices/auth/services/gw.auth.service */ "./apps/gateway/src/microservices/auth/services/gw.auth.service.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const gw_auth_query_resolver_1 = __webpack_require__(/*! ./microservices/auth/graphql/queries/gw.auth.query.resolver */ "./apps/gateway/src/microservices/auth/graphql/queries/gw.auth.query.resolver.ts");
const gw_auth_mutations_resolver_1 = __webpack_require__(/*! ./microservices/auth/graphql/mutations/gw.auth.mutations.resolver */ "./apps/gateway/src/microservices/auth/graphql/mutations/gw.auth.mutations.resolver.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const _42_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/42.strategy */ "./apps/gateway/src/microservices/auth/strategies/42.strategy.ts");
const google_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/google.strategy */ "./apps/gateway/src/microservices/auth/strategies/google.strategy.ts");
const jwt_accessToken_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/jwt.accessToken.strategy */ "./apps/gateway/src/microservices/auth/strategies/jwt.accessToken.strategy.ts");
const gw_auth_controller_1 = __webpack_require__(/*! ./microservices/auth/controllers/gw.auth.controller */ "./apps/gateway/src/microservices/auth/controllers/gw.auth.controller.ts");
const services_1 = __webpack_require__(/*! ./microservices/auth/services */ "./apps/gateway/src/microservices/auth/services/index.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const jwt_refreshToken_strategy_1 = __webpack_require__(/*! ./microservices/auth/strategies/jwt.refreshToken.strategy */ "./apps/gateway/src/microservices/auth/strategies/jwt.refreshToken.strategy.ts");
const user_auth_guard_1 = __webpack_require__(/*! ./microservices/auth/guards/user-auth.guard */ "./apps/gateway/src/microservices/auth/guards/user-auth.guard.ts");
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
                cors: {
                    credentials: true,
                    origin: true
                },
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

/***/ "./apps/gateway/src/microservices/auth/controllers/gw.auth.controller.ts":
/*!*******************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/controllers/gw.auth.controller.ts ***!
  \*******************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const _42_auth_grade_1 = __webpack_require__(/*! ../guards/42.auth.grade */ "./apps/gateway/src/microservices/auth/guards/42.auth.grade.ts");
const google_auth_grad_1 = __webpack_require__(/*! ../guards/google.auth.grad */ "./apps/gateway/src/microservices/auth/guards/google.auth.grad.ts");
const gw_auth_service_1 = __webpack_require__(/*! ../services/gw.auth.service */ "./apps/gateway/src/microservices/auth/services/gw.auth.service.ts");
const refreshToken_guard_1 = __webpack_require__(/*! ../guards/refreshToken.guard */ "./apps/gateway/src/microservices/auth/guards/refreshToken.guard.ts");
let AuthController = class AuthController {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async redirectToFortyTwoAuth() { }
    async fortyTwoAuthCallback(req, res) {
        const user = req.user;
        const token = await this.gatewayService.getRefreshWithJwtAccessToken({ id: req.user.id, username: req.user.username });
        res.cookie('Refresh_token', token.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('Access_token', token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.redirect(`http://localhost:3000/userinfo?user=${encodeURIComponent(JSON.stringify(user))}`);
    }
    async redirectToGoogleAuth() { }
    async GoogleoAuthCallback(req, res) {
        const user = req.user;
        const token = await this.gatewayService.getRefreshWithJwtAccessToken({ id: req.user.id, username: req.user.username });
        res.cookie('Refresh_token', token.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('Access_token', token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
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
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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

/***/ "./apps/gateway/src/microservices/auth/graphql/decortor/gql.user.decorator.ts":
/*!************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/decortor/gql.user.decorator.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlCurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
exports.GqlCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/input/auth.2FACredentials.input.ts":
/*!****************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/input/auth.2FACredentials.input.ts ***!
  \****************************************************************************************/
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
exports.TwoFActorAuthInput = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
let TwoFActorAuthInput = class TwoFActorAuthInput {
};
exports.TwoFActorAuthInput = TwoFActorAuthInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TwoFActorAuthInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], TwoFActorAuthInput.prototype, "code", void 0);
exports.TwoFActorAuthInput = TwoFActorAuthInput = __decorate([
    (0, graphql_1.InputType)()
], TwoFActorAuthInput);


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
__exportStar(__webpack_require__(/*! ./auth.2FACredentials.input */ "./apps/gateway/src/microservices/auth/graphql/input/auth.2FACredentials.input.ts"), exports);


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
exports.UserCreationInput = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/gateway/src/microservices/auth/graphql/mutations/gw.auth.mutations.resolver.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/mutations/gw.auth.mutations.resolver.ts ***!
  \*********************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMutationsResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const services_1 = __webpack_require__(/*! ../../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
const input_1 = __webpack_require__(/*! ../input */ "./apps/gateway/src/microservices/auth/graphql/input/index.ts");
const models_1 = __webpack_require__(/*! apps/gateway/src/models */ "./apps/gateway/src/models/index.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const gql_user_decorator_1 = __webpack_require__(/*! ../decortor/gql.user.decorator */ "./apps/gateway/src/microservices/auth/graphql/decortor/gql.user.decorator.ts");
const gql_refreshToken_guard_1 = __webpack_require__(/*! ../../guards/gql.refreshToken.guard */ "./apps/gateway/src/microservices/auth/guards/gql.refreshToken.guard.ts");
const user_auth_guard_1 = __webpack_require__(/*! ../../guards/user-auth.guard */ "./apps/gateway/src/microservices/auth/guards/user-auth.guard.ts");
let AuthMutationsResolver = class AuthMutationsResolver {
    constructor(authService, userService, loger) {
        this.authService = authService;
        this.userService = userService;
        this.loger = loger;
    }
    async signIn(context, authCredentialsInput) {
        const response = await this.authService.signIn(authCredentialsInput);
        const { res } = context;
        res.cookie('Refresh_token', response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('Access_token', response.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response.user);
    }
    async signUp(ctx, userCreationInput) {
        const response = await this.authService.signUp(userCreationInput);
        const { res } = ctx;
        res.cookie('Refresh_token', response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('Access_token', response.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response.user);
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
    async enableTwoFactorAuth(id) {
        return this.authService.enableTwoFactorAuth(id);
    }
    async verifyTwoFactorAuth(id, code) {
        const twoFActorAuthInput = {
            id,
            code
        };
        return this.authService.verifyTwoFactorAuth(twoFActorAuthInput);
    }
    async authenticate_2fa(context, id, code) {
        const twoFActorAuthInput = {
            id,
            code,
        };
        const response = await this.authService.authenticate_2fa(twoFActorAuthInput);
        const { res } = context;
        res.cookie('Refresh_token', response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('Access_token', response.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return (response.user);
    }
};
exports.AuthMutationsResolver = AuthMutationsResolver;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, graphql_1.Mutation)((returns) => models_1.GQLUserModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('authCredentials')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof input_1.AuthCredentialsInput !== "undefined" && input_1.AuthCredentialsInput) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthMutationsResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => models_1.GQLUserModel),
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
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAccessAuthorizationGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthMutationsResolver.prototype, "enableTwoFactorAuth", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAccessAuthorizationGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthMutationsResolver.prototype, "verifyTwoFactorAuth", null);
__decorate([
    (0, graphql_1.Mutation)(() => models_1.GQLUserModel),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('id')),
    __param(2, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AuthMutationsResolver.prototype, "authenticate_2fa", null);
exports.AuthMutationsResolver = AuthMutationsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.GatewayService !== "undefined" && services_1.GatewayService) === "function" ? _a : Object, typeof (_b = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _b : Object, typeof (_c = typeof common_2.LoggerService !== "undefined" && common_2.LoggerService) === "function" ? _c : Object])
], AuthMutationsResolver);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/graphql/queries/gw.auth.query.resolver.ts":
/*!***************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/graphql/queries/gw.auth.query.resolver.ts ***!
  \***************************************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const models_1 = __webpack_require__(/*! apps/gateway/src/models */ "./apps/gateway/src/models/index.ts");
const services_1 = __webpack_require__(/*! ../../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
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

/***/ "./apps/gateway/src/microservices/auth/guards/gql.refreshToken.guard.ts":
/*!******************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/guards/gql.refreshToken.guard.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlJwtRefreshGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
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

/***/ "./apps/gateway/src/microservices/auth/guards/refreshToken.guard.ts":
/*!**************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/guards/refreshToken.guard.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
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

/***/ "./apps/gateway/src/microservices/auth/guards/user-auth.guard.ts":
/*!***********************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/guards/user-auth.guard.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAccessAuthorizationGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
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
        let authorizationHeader = req.headers['authorization'];
        let jwt;
        if (!authorizationHeader) {
            const cookies = req.cookies;
            jwt = cookies['Access_token'];
            if (!jwt) {
                throw new common_1.UnauthorizedException('Missing token in Authorization header and cookies');
            }
        }
        else if (!authorizationHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Invalid Authorization header format');
        }
        else {
            jwt = authorizationHeader.split('Bearer ')[1];
        }
        if (!jwt) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        const id = parseInt(req.params.id, 10) || parseInt(context.getArgs()[1].id, 10);
        if (!id) {
            throw new common_1.BadRequestException('Missing user ID');
        }
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

/***/ "./apps/gateway/src/microservices/auth/services/gw.auth.service.ts":
/*!*************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/services/gw.auth.service.ts ***!
  \*************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
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
    async enableTwoFactorAuth(id) {
        return await this.clientService.sendMessageWithPayload(this.client, {
            role: 'auth',
            cmd: 'enableTwoFactorAuth'
        }, id);
    }
    async verifyTwoFactorAuth(twoFActorAuthInput) {
        return await this.clientService.sendMessageWithPayload(this.client, {
            role: 'auth',
            cmd: 'verifyTwoFactorAuth'
        }, twoFActorAuthInput);
    }
    async authenticate_2fa(twoFActorAuthInput) {
        return await this.clientService.sendMessageWithPayload(this.client, {
            role: 'auth',
            cmd: 'authenticate_2fa'
        }, twoFActorAuthInput);
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _b : Object])
], GatewayService);


/***/ }),

/***/ "./apps/gateway/src/microservices/auth/services/gw.user.service.ts":
/*!*************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/services/gw.user.service.ts ***!
  \*************************************************************************/
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
        try {
            const user = await this.findUserByUsername(profile.username);
            return user;
        }
        catch (error) {
            return await this.createAccount(profile);
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
        return await this.createUser(user);
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
__exportStar(__webpack_require__(/*! ./gw.auth.service */ "./apps/gateway/src/microservices/auth/services/gw.auth.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./gw.user.service */ "./apps/gateway/src/microservices/auth/services/gw.user.service.ts"), exports);


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
const gw_user_service_1 = __webpack_require__(/*! ../services/gw.user.service */ "./apps/gateway/src/microservices/auth/services/gw.user.service.ts");
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

/***/ "./apps/gateway/src/microservices/auth/strategies/jwt.accessToken.strategy.ts":
/*!************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/strategies/jwt.accessToken.strategy.ts ***!
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
exports.JwtAccessTokenStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const services_1 = __webpack_require__(/*! ../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
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

/***/ "./apps/gateway/src/microservices/auth/strategies/jwt.refreshToken.strategy.ts":
/*!*************************************************************************************!*\
  !*** ./apps/gateway/src/microservices/auth/strategies/jwt.refreshToken.strategy.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const services_1 = __webpack_require__(/*! ../services */ "./apps/gateway/src/microservices/auth/services/index.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GQLUserModel = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], GQLUserModel.prototype, "twoStepVerificationEnabled", void 0);
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
], UserWithAccessModel.prototype, "accessToken", void 0);
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

/***/ "./libs/common/src/auth/dto/AuthResponseDto.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/auth/dto/AuthResponseDto.ts ***!
  \*****************************************************/
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

/***/ "./libs/common/src/auth/interface/auth.user.interface.ts":
/*!***************************************************************!*\
  !*** ./libs/common/src/auth/interface/auth.user.interface.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAuthUser = void 0;
class IAuthUser {
}
exports.IAuthUser = IAuthUser;


/***/ }),

/***/ "./libs/common/src/common.module.ts":
/*!******************************************!*\
  !*** ./libs/common/src/common.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_service_1 = __webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts");
const user_loger_service_1 = __webpack_require__(/*! ./user.loger.service */ "./libs/common/src/user.loger.service.ts");
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

/***/ "./libs/common/src/common.service.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/common.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
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
__exportStar(__webpack_require__(/*! ./common.module */ "./libs/common/src/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./success-response.model */ "./libs/common/src/success-response.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/dto/AuthResponseDto */ "./libs/common/src/auth/dto/AuthResponseDto.ts"), exports);
__exportStar(__webpack_require__(/*! ./user.loger.service */ "./libs/common/src/user.loger.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/interface/auth.user.interface */ "./libs/common/src/auth/interface/auth.user.interface.ts"), exports);


/***/ }),

/***/ "./libs/common/src/success-response.model.ts":
/*!***************************************************!*\
  !*** ./libs/common/src/success-response.model.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessResponseModel = void 0;
class SuccessResponseModel {
}
exports.SuccessResponseModel = SuccessResponseModel;


/***/ }),

/***/ "./libs/common/src/user.loger.service.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/user.loger.service.ts ***!
  \***********************************************/
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
        console.log(`${brightBlue}[${serviceName}]${resetColor} - ${brightCyan}[${functionName}]${resetColor} - ${brightMagenta}${action}:${resetColor} ${lightRed}`, data, `${resetColor}`);
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

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

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

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

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
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(5500);
}
bootstrap();

})();

/******/ })()
;