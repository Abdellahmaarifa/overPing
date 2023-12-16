/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth/prisma/prisma.service.ts":
/*!********************************************!*\
  !*** ./apps/auth/prisma/prisma.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        try {
            console.log('#################Connecting to the database...####################');
            await this.$connect();
            console.log('################Connected to the database########################');
        }
        catch (e) {
            console.error('##########################Error connecting to the database##################', e);
            throw e;
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/auth/src/auth.module.ts":
/*!**************************************!*\
  !*** ./apps/auth/src/auth.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./controllers/auth.controller */ "./apps/auth/src/controllers/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./services/auth.service */ "./apps/auth/src/services/auth.service.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/auth/prisma/prisma.service.ts");
const user_module_1 = __webpack_require__(/*! ./user.module */ "./apps/auth/src/user.module.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.CommonModule,
            rabbit_mq_1.RabbitMqModule,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({}),
        ],
        controllers: [
            auth_controller_1.AuthController
        ],
        providers: [
            auth_service_1.AuthService,
            prisma_service_1.PrismaService,
            exception_handling_1.RpcExceptionService,
        ],
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth/src/controllers/auth.controller.ts":
/*!******************************************************!*\
  !*** ./apps/auth/src/controllers/auth.controller.ts ***!
  \******************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const auth_service_1 = __webpack_require__(/*! ../services/auth.service */ "./apps/auth/src/services/auth.service.ts");
const dto_1 = __webpack_require__(/*! ../dto */ "./apps/auth/src/dto/index.ts");
const getRefreshUser_dto_1 = __webpack_require__(/*! @app/common/auth/dto/getRefreshUser.dto */ "./libs/common/src/auth/dto/getRefreshUser.dto.ts");
const dto_2 = __webpack_require__(/*! @app/common/auth/dto */ "./libs/common/src/auth/dto/index.ts");
const AccessToken_interface_1 = __webpack_require__(/*! @app/common/auth/interface/AccessToken.interface */ "./libs/common/src/auth/interface/AccessToken.interface.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let AuthController = class AuthController {
    constructor(authService, rpcExceptionService, logger) {
        this.authService = authService;
        this.rpcExceptionService = rpcExceptionService;
        this.logger = logger;
    }
    async signIn(authCredentials) {
        return this.authService.signIn(authCredentials);
    }
    async signUp(userCredentials) {
        this.logger.actionLog("auth", "signUp()", "sing UP", userCredentials);
        return this.authService.signUp(userCredentials);
    }
    async getUserOnRefreshTokenMatch(refreshToken) {
        return this.authService.getUserOnRefreshTokenMatch(refreshToken);
    }
    async logOut(id) {
        return this.authService.logOut(id);
    }
    async refreshAccessToken(payload) {
        const tokens = await this.authService.newRefreshAndAccessToken(payload);
        return { accessToken: tokens.accessToken };
    }
    async checkAccessToken(accessControlDto) {
        const { token, id } = accessControlDto;
        const jwtTokenPayload = await this.authService.verifyToken(token);
        if (jwtTokenPayload.sub !== id) {
            this.rpcExceptionService.throwForbidden('Forbidden resource');
        }
        return true;
    }
    async getRefreshWithJwtAccessToken(payload) {
        const tokens = await this.authService.newRefreshAndAccessToken(payload);
        return tokens;
    }
    async enableTwoFactorAuth(id) {
        return this.authService.enableTwoFactorAuth(id);
    }
    async verifyTwoFactorAuth(twoFActorAuthInput) {
        return this.authService.verifyTwoFactorAuth(twoFActorAuthInput);
    }
    async authenticate_2fa(twoFActorAuthInput) {
        return this.authService.authenticate_2fa(twoFActorAuthInput);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'login' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.SignInCredentialsDto !== "undefined" && dto_1.SignInCredentialsDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'signUp' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.SignUpCredentialsDto !== "undefined" && dto_1.SignUpCredentialsDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'OnRefreshTokenMatch' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof getRefreshUser_dto_1.GetRefreshUserDto !== "undefined" && getRefreshUser_dto_1.GetRefreshUserDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "getUserOnRefreshTokenMatch", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'logOut' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'refresh-accessToken' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof dto_2.JwtPayloadDto !== "undefined" && dto_2.JwtPayloadDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'checkAccess' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof AccessToken_interface_1.IAccessControl !== "undefined" && AccessToken_interface_1.IAccessControl) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "checkAccessToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'getRefreshWithJwtAccessToken' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof dto_2.JwtPayloadDto !== "undefined" && dto_2.JwtPayloadDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthController.prototype, "getRefreshWithJwtAccessToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'enableTwoFactorAuth' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], AuthController.prototype, "enableTwoFactorAuth", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'verifyTwoFactorAuth' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof dto_1.TwoFActorAuthDto !== "undefined" && dto_1.TwoFActorAuthDto) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthController.prototype, "verifyTwoFactorAuth", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'auth', cmd: 'authenticate_2fa' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof dto_1.TwoFActorAuthDto !== "undefined" && dto_1.TwoFActorAuthDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], AuthController.prototype, "authenticate_2fa", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _b : Object, typeof (_c = typeof common_2.LoggerService !== "undefined" && common_2.LoggerService) === "function" ? _c : Object])
], AuthController);


/***/ }),

/***/ "./apps/auth/src/controllers/user.controller.ts":
/*!******************************************************!*\
  !*** ./apps/auth/src/controllers/user.controller.ts ***!
  \******************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./apps/auth/src/services/user.service.ts");
const dto_1 = __webpack_require__(/*! ../dto */ "./apps/auth/src/dto/index.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let UserController = class UserController {
    constructor(userService, rpcExceptionService) {
        this.userService = userService;
        this.rpcExceptionService = rpcExceptionService;
    }
    async registerUser(userInput) {
        return await this.userService.createUser(userInput);
    }
    async findUserByUsername(username) {
        const user = await this.userService.findUserByUsername(username);
        this.handleUserNotFound(user, `Failed to find user: ${username}`);
        return user;
    }
    async findById(id) {
        const user = await this.userService.findById(id);
        this.handleUserNotFound(user, `Failed to find user: ${id}`);
        return user;
    }
    async findAll() {
        const users = await this.userService.findAll();
        this.handleUsersNotFound(users, 'Failed to query users');
        return users;
    }
    async remove(id) {
        return this.userService.remove(id);
    }
    handleUserNotFound(user, errorMessage) {
        if (!user) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: errorMessage,
            });
        }
    }
    handleUsersNotFound(users, errorMessage) {
        if (!users) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: errorMessage,
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'create-user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.UserCreationDto !== "undefined" && dto_1.UserCreationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'find-user-by-username' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "findUserByUsername", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'findById' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "findById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'findAll' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'delete-user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _b : Object])
], UserController);


/***/ }),

/***/ "./apps/auth/src/dto/auth.signInCredentialsInput.ts":
/*!**********************************************************!*\
  !*** ./apps/auth/src/dto/auth.signInCredentialsInput.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInCredentialsDto = void 0;
class SignInCredentialsDto {
}
exports.SignInCredentialsDto = SignInCredentialsDto;


/***/ }),

/***/ "./apps/auth/src/dto/auth.signUpCredentialsInput.ts":
/*!**********************************************************!*\
  !*** ./apps/auth/src/dto/auth.signUpCredentialsInput.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpCredentialsDto = void 0;
class SignUpCredentialsDto {
}
exports.SignUpCredentialsDto = SignUpCredentialsDto;


/***/ }),

/***/ "./apps/auth/src/dto/auth.twoFactorAuth.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/auth/src/dto/auth.twoFactorAuth.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFActorAuthDto = void 0;
class TwoFActorAuthDto {
}
exports.TwoFActorAuthDto = TwoFActorAuthDto;


/***/ }),

/***/ "./apps/auth/src/dto/index.ts":
/*!************************************!*\
  !*** ./apps/auth/src/dto/index.ts ***!
  \************************************/
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
__exportStar(__webpack_require__(/*! ./auth.signUpCredentialsInput */ "./apps/auth/src/dto/auth.signUpCredentialsInput.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth.signInCredentialsInput */ "./apps/auth/src/dto/auth.signInCredentialsInput.ts"), exports);
__exportStar(__webpack_require__(/*! ./user.UserCreation.dto */ "./apps/auth/src/dto/user.UserCreation.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./user.creationResponse.dto */ "./apps/auth/src/dto/user.creationResponse.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth.twoFactorAuth.dto */ "./apps/auth/src/dto/auth.twoFactorAuth.dto.ts"), exports);


/***/ }),

/***/ "./apps/auth/src/dto/user.UserCreation.dto.ts":
/*!****************************************************!*\
  !*** ./apps/auth/src/dto/user.UserCreation.dto.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCreationDto = void 0;
class UserCreationDto {
}
exports.UserCreationDto = UserCreationDto;


/***/ }),

/***/ "./apps/auth/src/dto/user.creationResponse.dto.ts":
/*!********************************************************!*\
  !*** ./apps/auth/src/dto/user.creationResponse.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCreationResponsd = void 0;
class UserCreationResponsd {
}
exports.UserCreationResponsd = UserCreationResponsd;


/***/ }),

/***/ "./apps/auth/src/services/auth.service.ts":
/*!************************************************!*\
  !*** ./apps/auth/src/services/auth.service.ts ***!
  \************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/auth/src/services/user.service.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const argon2 = __webpack_require__(/*! argon2 */ "argon2");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const speakeasy = __webpack_require__(/*! speakeasy */ "speakeasy");
const QRCode = __webpack_require__(/*! qrcode */ "qrcode");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const exception_handling_2 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, rpcExceptionService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.rpcExceptionService = rpcExceptionService;
    }
    async signIn(authCredentials) {
        let user = await this.userService.validateUser(authCredentials);
        const refreshAndAccessToken = await this.newRefreshAndAccessToken({
            id: user.id,
            username: user.username
        });
        this.updateRefreshToken(user.id, refreshAndAccessToken.refreshToken);
        return new common_2.AuthResponseDto(refreshAndAccessToken.accessToken, refreshAndAccessToken.refreshToken, user);
    }
    async signUp(authCredentials) {
        const usercreated = await this.userService.createUser(authCredentials);
        const refreshAndAccessToken = await this.newRefreshAndAccessToken({
            id: usercreated.id,
            username: usercreated.username
        });
        this.updateRefreshToken(usercreated.id, refreshAndAccessToken.refreshToken);
        return new common_2.AuthResponseDto(refreshAndAccessToken.accessToken, refreshAndAccessToken.refreshToken, usercreated);
    }
    async newRefreshAndAccessToken(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: payload.id,
                username: payload.username,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync({
                sub: payload.id,
                username: payload.username,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);
    }
    async logOut(id) {
        this.updateRefreshToken(id, "");
        return (true);
    }
    async getUserOnRefreshTokenMatch(refreshTokenOject) {
        const user = await this.userService.findById(refreshTokenOject.id);
        if (!user || !user.refreshToken)
            throw 'Access Denied';
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshTokenOject.refreshToken);
        if (!refreshTokenMatches)
            throw 'Access Denied';
        console.log("refreshTokenMatches");
        return (user);
    }
    async verifyToken(token) {
        try {
            const res = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
            });
            return res;
        }
        catch (error) {
            if (error.expiredAt) {
                this.rpcExceptionService.throwUnauthorised('Token has expired, please sign in');
            }
            return false;
        }
    }
    async enableTwoFactorAuth(id) {
        const user = await this.userService.findById(id);
        if (!user) {
            this.rpcExceptionService.throwUnauthorised("User not found");
        }
        let secret = speakeasy.generateSecret({
            name: user.username,
            issuer: "overPing"
        });
        this.userService.update2FA(id, secret.base32);
        return this.generateQrCodeDataURL(secret.otpauth_url);
    }
    async verifyTwoFactorAuth(twoFActorAuthInput) {
        const user = await this.userService.findById(twoFActorAuthInput.id);
        const isVerified = this.verifyTwoFactor(user.twoFactorSecret, twoFActorAuthInput.code);
        if (isVerified) {
            this.userService.toggle2FAStatus(user.id, true);
        }
        else {
            this.userService.toggle2FAStatus(user.id, false);
            this.userService.update2FA(user.id, '');
        }
        return isVerified;
    }
    async authenticate_2fa(twoFActorAuthInput) {
        const user = await this.userService.findById(twoFActorAuthInput.id);
        if (!user.twoStepVerificationEnabled) {
            this.rpcExceptionService.throwBadRequest("twoStepVerification not enabled");
        }
        const isVerified = this.verifyTwoFactor(user.twoFactorSecret, twoFActorAuthInput.code);
        if (!isVerified) {
            this.rpcExceptionService.throwForbidden("Invalid code. Please try again with a different code.");
        }
        const refreshAndAccessToken = await this.newRefreshAndAccessToken({
            id: user.id,
            username: user.username
        });
        this.updateRefreshToken(user.id, refreshAndAccessToken.refreshToken);
        return new common_2.AuthResponseDto(refreshAndAccessToken.accessToken, refreshAndAccessToken.refreshToken, user);
    }
    verifyTwoFactor(secret, code) {
        const isVerified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: code,
        });
        return isVerified;
    }
    async generateQrCodeDataURL(otpAuthUrl) {
        return QRCode.toDataURL(otpAuthUrl);
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            const prismaError = new exception_handling_2.PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
            prismaError.handlePrismaError();
        }
        else {
            throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _d : Object])
], AuthService);


/***/ }),

/***/ "./apps/auth/src/services/user.service.ts":
/*!************************************************!*\
  !*** ./apps/auth/src/services/user.service.ts ***!
  \************************************************/
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
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/auth/prisma/prisma.service */ "./apps/auth/prisma/prisma.service.ts");
const argon2 = __webpack_require__(/*! argon2 */ "argon2");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const exception_handling_2 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let UserService = class UserService {
    constructor(rpcExceptionService, prisma) {
        this.rpcExceptionService = rpcExceptionService;
        this.prisma = prisma;
    }
    async validateUser(userCredentials) {
        let userFound = await this.findUserByUsername(userCredentials.username);
        if (!userFound) {
            this.rpcExceptionService.throwNotFound("User not found. Check the provided username.");
        }
        const isPasswordValid = await argon2.verify(userFound.password, userCredentials.password);
        if (!isPasswordValid)
            this.rpcExceptionService.throwForbidden("Invalid username or password.");
        if (userFound.twoStepVerificationEnabled) {
            this.rpcExceptionService.throwUnauthorised("Two-factor authentication is required. Please provide the 2FA code.");
        }
        return (userFound);
    }
    async createUser({ password, username, googleId, fortyTwoId }) {
        try {
            console.log("the error: ", password, username);
            const hashedPassword = password ? await argon2.hash(password) : undefined;
            const currentDate = new Date();
            return this.prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    googleId,
                    fortyTwoId,
                    twoFactorSecret: "",
                    twoStepVerificationEnabled: false,
                    createdAt: currentDate,
                    updatedAt: currentDate,
                },
                select: {
                    id: true,
                    username: true,
                    googleId: true,
                    fortyTwoId: true,
                    twoStepVerificationEnabled: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async findUserByUsername(username) {
        try {
            const user = await (this.prisma.user.findUnique({
                where: { username }
            }));
            return (user);
        }
        catch (error) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: ("Failed to find user: Unknown error") + error
            });
        }
    }
    async findById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });
            return (user);
        }
        catch (error) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: ("Failed to find user: Unknown error")
            });
        }
    }
    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: false,
                googleId: true,
                fortyTwoId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async remove(id) {
        try {
            const userToDelete = await this.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!userToDelete) {
                this.rpcExceptionService.throwBadRequest(`User with ID ${id} not found.`);
            }
            await this.prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return (true);
        }
        catch (error) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: (`Failed to delete user: ${id}`)
            });
        }
    }
    async updateRefreshToken(userId, refreshToken) {
        return this.prisma.user.update({
            data: {
                refreshToken: refreshToken,
            },
            where: { id: userId },
        });
    }
    async update2FA(id, secret) {
        return this.prisma.user.update({
            where: { id },
            data: {
                twoFactorSecret: secret
            }
        });
    }
    async toggle2FAStatus(id, state) {
        return this.prisma.user.update({
            where: { id },
            data: {
                twoStepVerificationEnabled: state
            }
        });
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            const prismaError = new exception_handling_2.PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
            prismaError.handlePrismaError();
        }
        else {
            throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], UserService);


/***/ }),

/***/ "./apps/auth/src/user.module.ts":
/*!**************************************!*\
  !*** ./apps/auth/src/user.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./services/user.service */ "./apps/auth/src/services/user.service.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/auth/prisma/prisma.service.ts");
const user_controller_1 = __webpack_require__(/*! ./controllers/user.controller */ "./apps/auth/src/controllers/user.controller.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        providers: [
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            exception_handling_1.RpcExceptionService,
        ],
        controllers: [
            user_controller_1.UserController
        ],
        exports: [
            user_service_1.UserService
        ]
    })
], UserModule);


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

/***/ "./libs/common/src/auth/dto/JwtPayloadDto.ts":
/*!***************************************************!*\
  !*** ./libs/common/src/auth/dto/JwtPayloadDto.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtPayloadDto = void 0;
class JwtPayloadDto {
}
exports.JwtPayloadDto = JwtPayloadDto;


/***/ }),

/***/ "./libs/common/src/auth/dto/getRefreshUser.dto.ts":
/*!********************************************************!*\
  !*** ./libs/common/src/auth/dto/getRefreshUser.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRefreshUserDto = void 0;
class GetRefreshUserDto {
}
exports.GetRefreshUserDto = GetRefreshUserDto;


/***/ }),

/***/ "./libs/common/src/auth/dto/index.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/auth/dto/index.ts ***!
  \*******************************************/
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
__exportStar(__webpack_require__(/*! ./JwtPayloadDto */ "./libs/common/src/auth/dto/JwtPayloadDto.ts"), exports);


/***/ }),

/***/ "./libs/common/src/auth/interface/AccessToken.interface.ts":
/*!*****************************************************************!*\
  !*** ./libs/common/src/auth/interface/AccessToken.interface.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAccessControl = void 0;
class IAccessControl {
}
exports.IAccessControl = IAccessControl;


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

/***/ "./libs/common/src/exception-handling/index.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/exception-handling/index.ts ***!
  \*****************************************************/
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
__exportStar(__webpack_require__(/*! ./rpc-exception-handler.service */ "./libs/common/src/exception-handling/rpc-exception-handler.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./prismaErrorHandler/prismaError */ "./libs/common/src/exception-handling/prismaErrorHandler/prismaError.ts"), exports);


/***/ }),

/***/ "./libs/common/src/exception-handling/prismaErrorHandler/prismaError.ts":
/*!******************************************************************************!*\
  !*** ./libs/common/src/exception-handling/prismaErrorHandler/prismaError.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaError = void 0;
class PrismaError extends Error {
    constructor(error, customMessage, rpcExceptionService) {
        super(customMessage);
        this.rpcExceptionService = rpcExceptionService;
        Object.setPrototypeOf(this, PrismaError.prototype);
        this.meta = {
            code: error.code,
            error: error.message,
        };
    }
    handlePrismaError() {
        switch (this.meta.code) {
            case 'P2002':
                throw this.rpcExceptionService.throwBadRequest(`Resource already exists`);
            case 'P2025':
                throw this.rpcExceptionService.throwForbidden(`Permission denied`);
            case 'P2020':
                throw this.rpcExceptionService.throwNotFound(`Resource not found`);
            case 'P2045':
                throw this.rpcExceptionService.throwForbidden(`Conflict in resource state`);
            default:
                throw this.rpcExceptionService.throwInternalError('An unexpected Prisma error occurred');
        }
    }
}
exports.PrismaError = PrismaError;


/***/ }),

/***/ "./libs/common/src/exception-handling/rpc-exception-handler.service.ts":
/*!*****************************************************************************!*\
  !*** ./libs/common/src/exception-handling/rpc-exception-handler.service.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RpcExceptionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let RpcExceptionService = class RpcExceptionService {
    throwNotFound(customErrorMessage) {
        throw new microservices_1.RpcException({
            statusCode: 404,
            errorStatus: customErrorMessage || 'Not Found',
        });
    }
    throwBadRequest(customErrorMessage) {
        throw new microservices_1.RpcException({
            statusCode: 400,
            errorStatus: customErrorMessage || 'Bad Request',
        });
    }
    throwForbidden(customErrorMessage) {
        throw new microservices_1.RpcException({
            statusCode: 403,
            errorStatus: customErrorMessage || 'Forbidden',
        });
    }
    throwUnauthorised(customErrorMessage) {
        throw new microservices_1.RpcException({
            statusCode: 401,
            errorStatus: customErrorMessage || 'Unauthorised',
        });
    }
    throwInternalError(customErrorMessage) {
        throw new microservices_1.RpcException({
            statusCode: 500,
            errorStatus: customErrorMessage || 'Internal Server Error',
        });
    }
    throwCatchedException(error) {
        throw new microservices_1.RpcException({
            statusCode: error.code,
            errorStatus: error.message,
        });
    }
};
exports.RpcExceptionService = RpcExceptionService;
exports.RpcExceptionService = RpcExceptionService = __decorate([
    (0, common_1.Injectable)()
], RpcExceptionService);


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

/***/ "./libs/rabbit-mq/src/constent/rabbit-constent.ts":
/*!********************************************************!*\
  !*** ./libs/rabbit-mq/src/constent/rabbit-constent.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RABBIT_SERVICES = void 0;
const rmqServerName_1 = __webpack_require__(/*! ../interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
exports.RABBIT_SERVICES = {
    [rmqServerName_1.IRmqSeverName.PROFILE]: {
        queue: 'profile_queue'
    },
    [rmqServerName_1.IRmqSeverName.AUTH]: {
        queue: 'auth_queue'
    },
    [rmqServerName_1.IRmqSeverName.GATEWAY]: {
        queue: 'gateway_queue'
    },
    [rmqServerName_1.IRmqSeverName.MATCH_MAKING]: {
        queue: 'match_making_queue'
    }
};


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
    IRmqSeverName["PROFILE"] = "PROFILE_SERVICE";
    IRmqSeverName["AUTH"] = "AUTH_SERVICE";
    IRmqSeverName["GATEWAY"] = "GATEWAY_SERVICE";
    IRmqSeverName["MATCH_MAKING"] = "MATCH_MAKING";
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
const rabbit_constent_1 = __webpack_require__(/*! @app/rabbit-mq/constent/rabbit-constent */ "./libs/rabbit-mq/src/constent/rabbit-constent.ts");
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
                                        queue: rabbit_constent_1.RABBIT_SERVICES[service].queue,
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

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),

/***/ "qrcode":
/*!*************************!*\
  !*** external "qrcode" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("qrcode");

/***/ }),

/***/ "speakeasy":
/*!****************************!*\
  !*** external "speakeasy" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("speakeasy");

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
/*!*******************************!*\
  !*** ./apps/auth/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_module_1 = __webpack_require__(/*! ./auth.module */ "./apps/auth/src/auth.module.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rabbit_constent_1 = __webpack_require__(/*! @app/rabbit-mq/constent/rabbit-constent */ "./libs/rabbit-mq/src/constent/rabbit-constent.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(auth_module_1.AuthModule);
    const rmqService = app.get(rabbit_mq_1.RabbitMqService);
    app.connectMicroservice(rmqService.getOptions(rabbit_constent_1.RABBIT_SERVICES[rmqServerName_1.IRmqSeverName.AUTH].queue));
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;