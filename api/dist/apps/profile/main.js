/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/profile/prisma/prisma.service.ts":
/*!***********************************************!*\
  !*** ./apps/profile/prisma/prisma.service.ts ***!
  \***********************************************/
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
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/profile/src/controller/profile.controller.ts":
/*!***********************************************************!*\
  !*** ./apps/profile/src/controller/profile.controller.ts ***!
  \***********************************************************/
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const createProfileDto_1 = __webpack_require__(/*! ../dto/createProfileDto */ "./apps/profile/src/dto/createProfileDto.ts");
const profile_service_1 = __webpack_require__(/*! ../services/profile.service */ "./apps/profile/src/services/profile.service.ts");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    getHello(mess) {
        return mess.message;
    }
    async createUserProfile(payload) {
        return await this.profileService.create(payload);
    }
    async updateUserProfile(data) {
        return await this.profileService.update(data.id, data.updateInput);
    }
    async findProfileById(id) {
        return this.profileService.findOne(id);
    }
    async removeProfile(id) {
        return this.profileService.remove(id);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'profile', cmd: 'hello-you' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ProfileController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'profile', cmd: 'create-profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof createProfileDto_1.CreateProfileDto !== "undefined" && createProfileDto_1.CreateProfileDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProfileController.prototype, "createUserProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'profile', cmd: 'update-profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProfileController.prototype, "updateUserProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'profile', cmd: 'find-Profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProfileController.prototype, "findProfileById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'profile', cmd: 'remove-Profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProfileController.prototype, "removeProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object])
], ProfileController);


/***/ }),

/***/ "./apps/profile/src/controller/wallet.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/profile/src/controller/wallet.controller.ts ***!
  \**********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const transfer_funds_dto_1 = __webpack_require__(/*! ../dto/transfer-funds.dto */ "./apps/profile/src/dto/transfer-funds.dto.ts");
const wallet_service_1 = __webpack_require__(/*! ../services/wallet.service */ "./apps/profile/src/services/wallet.service.ts");
const place_bet_dto_1 = __webpack_require__(/*! ../dto/place-bet.dto */ "./apps/profile/src/dto/place-bet.dto.ts");
const resolve_bet_dto_1 = __webpack_require__(/*! ../dto/resolve-bet.dto */ "./apps/profile/src/dto/resolve-bet.dto.ts");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async transferFunds(transferData) {
        return this.walletService.transferFunds(transferData);
    }
    async placeBet(placeBetData) {
        return this.walletService.placeBet(placeBetData);
    }
    async resolveBet(resolveBetData) {
        return this.walletService.resolveBet(resolveBetData);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'wallet', cmd: 'transferFunds' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof transfer_funds_dto_1.TransferFundsDto !== "undefined" && transfer_funds_dto_1.TransferFundsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], WalletController.prototype, "transferFunds", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'wallet', cmd: 'placeBet' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof place_bet_dto_1.PlaceBetDto !== "undefined" && place_bet_dto_1.PlaceBetDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], WalletController.prototype, "placeBet", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'wallet', cmd: 'resolveBet' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof resolve_bet_dto_1.ResolveBetDto !== "undefined" && resolve_bet_dto_1.ResolveBetDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], WalletController.prototype, "resolveBet", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof wallet_service_1.WalletService !== "undefined" && wallet_service_1.WalletService) === "function" ? _a : Object])
], WalletController);


/***/ }),

/***/ "./apps/profile/src/dto/createProfileDto.ts":
/*!**************************************************!*\
  !*** ./apps/profile/src/dto/createProfileDto.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProfileDto = void 0;
class CreateProfileDto {
}
exports.CreateProfileDto = CreateProfileDto;


/***/ }),

/***/ "./apps/profile/src/dto/place-bet.dto.ts":
/*!***********************************************!*\
  !*** ./apps/profile/src/dto/place-bet.dto.ts ***!
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
exports.PlaceBetDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class PlaceBetDto {
}
exports.PlaceBetDto = PlaceBetDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceBetDto.prototype, "walletId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlaceBetDto.prototype, "betAmount", void 0);


/***/ }),

/***/ "./apps/profile/src/dto/resolve-bet.dto.ts":
/*!*************************************************!*\
  !*** ./apps/profile/src/dto/resolve-bet.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResolveBetDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ResolveBetDto {
}
exports.ResolveBetDto = ResolveBetDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResolveBetDto.prototype, "walletId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ResolveBetDto.prototype, "isWinner", void 0);


/***/ }),

/***/ "./apps/profile/src/dto/transfer-funds.dto.ts":
/*!****************************************************!*\
  !*** ./apps/profile/src/dto/transfer-funds.dto.ts ***!
  \****************************************************/
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
exports.TransferFundsDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class TransferFundsDto {
}
exports.TransferFundsDto = TransferFundsDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransferFundsDto.prototype, "senderId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransferFundsDto.prototype, "recipientId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], TransferFundsDto.prototype, "amount", void 0);


/***/ }),

/***/ "./apps/profile/src/interface/title.user.interface.ts":
/*!************************************************************!*\
  !*** ./apps/profile/src/interface/title.user.interface.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTitle = void 0;
var UserTitle;
(function (UserTitle) {
    UserTitle["APEX_VANGUARD_01"] = "Apex Vanguard";
    UserTitle["VIRTUOSO_WARLORD_02"] = "Virtuoso Warlord";
    UserTitle["Maestro_Dominator_03"] = "Maestro Dominator";
    UserTitle["Legend_Conqueror_04"] = "Legend Conqueror";
    UserTitle["Elite_Battlemaster_05"] = "Elite Battlemaster";
    UserTitle["Master_Sentinel_06"] = "Master Sentinel";
    UserTitle["Prodigy_Valor_07"] = "Prodigy Valor";
    UserTitle["Ace_Gladiator_08"] = "Ace Gladiator";
    UserTitle["Veteran_09"] = "Veteran";
    UserTitle["Challenger_10"] = "Challenger";
})(UserTitle || (exports.UserTitle = UserTitle = {}));


/***/ }),

/***/ "./apps/profile/src/profile.module.ts":
/*!********************************************!*\
  !*** ./apps/profile/src/profile.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const profile_controller_1 = __webpack_require__(/*! ./controller/profile.controller */ "./apps/profile/src/controller/profile.controller.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const profile_service_1 = __webpack_require__(/*! ./services/profile.service */ "./apps/profile/src/services/profile.service.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/profile/prisma/prisma.service.ts");
const wallet_controller_1 = __webpack_require__(/*! ./controller/wallet.controller */ "./apps/profile/src/controller/wallet.controller.ts");
const wallet_service_1 = __webpack_require__(/*! ./services/wallet.service */ "./apps/profile/src/services/wallet.service.ts");
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.CommonModule,
            rabbit_mq_1.RabbitMqModule,
        ],
        controllers: [
            profile_controller_1.ProfileController,
            wallet_controller_1.WalletController
        ],
        providers: [
            wallet_service_1.WalletService,
            profile_service_1.ProfileService,
            prisma_service_1.PrismaService,
            exception_handling_1.RpcExceptionService,
        ],
    })
], ProfileModule);


/***/ }),

/***/ "./apps/profile/src/services/profile.service.ts":
/*!******************************************************!*\
  !*** ./apps/profile/src/services/profile.service.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileService = void 0;
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/profile/prisma/prisma.service */ "./apps/profile/prisma/prisma.service.ts");
const title_user_interface_1 = __webpack_require__(/*! ../interface/title.user.interface */ "./apps/profile/src/interface/title.user.interface.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let ProfileService = class ProfileService {
    constructor(prisma, rpcExceptionService) {
        this.prisma = prisma;
        this.rpcExceptionService = rpcExceptionService;
    }
    async create(input) {
        try {
            const userRank = await this.getLastUserRank();
            const userProfile = await this.prisma.userProfile.create({
                data: {
                    user_id: input.userId,
                    nickname: `${input.username.replace(/\s/g, '')}${Date.now()}`,
                    title: title_user_interface_1.UserTitle.Challenger_10,
                    rank: userRank
                },
            });
            const wallet = await this.prisma.wallet.create({
                data: {
                    userProfile: { connect: { id: userProfile.id } },
                },
            });
            const updatedUserProfile = await this.prisma.userProfile.update({
                where: { id: userProfile.id },
                data: { wallet: { connect: { id: wallet.id } } },
            });
            return updatedUserProfile;
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async getLastUserRank() {
        const lastUserRank = await this.prisma.userProfile.count();
        return lastUserRank + 1;
    }
    async findOne(id) {
        try {
            const userProfile = await this.prisma.userProfile.findUnique({
                where: { id: id },
            });
            return userProfile;
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async update(id, input) {
        try {
            await this.prisma.userProfile.update({
                where: { id },
                data: input,
            });
            return true;
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async remove(id) {
        try {
            const existingProfile = await this.prisma.userProfile.findUnique({
                where: { id },
            });
            console.log(existingProfile);
            if (!existingProfile) {
                this.rpcExceptionService.throwNotFound(`Profile of User ID ${id} not found`);
            }
            await this.prisma.userProfile.delete({
                where: {
                    id: id
                },
            });
            return true;
        }
        catch (error) {
            this.rpcExceptionService.throwCatchedException({
                code: 500,
                message: ("Failed to delete profile: Unknown error") + error
            });
        }
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            const prismaError = new exception_handling_1.PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
            prismaError.handlePrismaError();
        }
        else {
            throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _b : Object])
], ProfileService);


/***/ }),

/***/ "./apps/profile/src/services/wallet.service.ts":
/*!*****************************************************!*\
  !*** ./apps/profile/src/services/wallet.service.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/profile/prisma/prisma.service */ "./apps/profile/prisma/prisma.service.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
let WalletService = class WalletService {
    constructor(prisma, rpcExceptionService) {
        this.prisma = prisma;
        this.rpcExceptionService = rpcExceptionService;
    }
    async transferFunds(data) {
        await this.prisma.$transaction(async () => {
            await this.updateWalletBalance(data.senderId, -data.amount);
            await this.updateWalletBalance(data.recipientId, data.amount);
        });
        return true;
    }
    async updateWalletBalance(walletId, amount) {
        try {
            await this.prisma.wallet.update({
                where: { id: walletId },
                data: { balance: { increment: amount } },
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async placeBet(placeBetData) {
        try {
            await this.prisma.wallet.update({
                where: { id: placeBetData.walletId },
                data: { betAmount: { increment: placeBetData.betAmount } },
            });
            return true;
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async resolveBet(resolveBetData) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { id: resolveBetData.walletId },
            });
            if (wallet?.betAmount && wallet.betAmount > 0) {
                const amountWonOrLost = resolveBetData.isWinner ? wallet.betAmount : -wallet.betAmount;
                await this.prisma.$transaction(async (prisma) => {
                    await prisma.wallet.update({
                        where: { id: resolveBetData.walletId },
                        data: { balance: { increment: amountWonOrLost }, betAmount: 0 },
                    });
                });
                return (true);
            }
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            const prismaError = new exception_handling_1.PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
            prismaError.handlePrismaError();
        }
        else {
            throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
        }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof exception_handling_1.RpcExceptionService !== "undefined" && exception_handling_1.RpcExceptionService) === "function" ? _b : Object])
], WalletService);


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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

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
  !*** ./apps/profile/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const profile_module_1 = __webpack_require__(/*! ./profile.module */ "./apps/profile/src/profile.module.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rabbit_constent_1 = __webpack_require__(/*! @app/rabbit-mq/constent/rabbit-constent */ "./libs/rabbit-mq/src/constent/rabbit-constent.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(profile_module_1.ProfileModule);
    const rmqService = app.get(rabbit_mq_1.RabbitMqService);
    app.connectMicroservice(rmqService.getOptions(rabbit_constent_1.RABBIT_SERVICES[rmqServerName_1.IRmqSeverName.PROFILE].queue));
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;