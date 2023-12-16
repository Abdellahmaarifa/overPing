/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/matchmaking/src/controller/matchmaking.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/matchmaking/src/controller/matchmaking.controller.ts ***!
  \*******************************************************************/
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
exports.MatchmakingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const matchmaking_service_1 = __webpack_require__(/*! ../services/matchmaking.service */ "./apps/matchmaking/src/services/matchmaking.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const join_matchmaking_dto_1 = __webpack_require__(/*! ../dto/join-matchmaking.dto */ "./apps/matchmaking/src/dto/join-matchmaking.dto.ts");
let MatchmakingController = class MatchmakingController {
    constructor(matchmakingService) {
        this.matchmakingService = matchmakingService;
    }
    async joinMatchmakingQueue(joinMatchData) {
        console.log("this is Queue in matchmaking ", joinMatchData);
        this.matchmakingService.joinMatchmakingQueue(joinMatchData);
    }
};
exports.MatchmakingController = MatchmakingController;
__decorate([
    (0, microservices_1.EventPattern)({ role: 'matchMaking', cmd: 'joinQueue' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof join_matchmaking_dto_1.JoinMatchmakingDto !== "undefined" && join_matchmaking_dto_1.JoinMatchmakingDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], MatchmakingController.prototype, "joinMatchmakingQueue", null);
exports.MatchmakingController = MatchmakingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof matchmaking_service_1.MatchmakingService !== "undefined" && matchmaking_service_1.MatchmakingService) === "function" ? _a : Object])
], MatchmakingController);


/***/ }),

/***/ "./apps/matchmaking/src/dto/PlayerInterface.ts":
/*!*****************************************************!*\
  !*** ./apps/matchmaking/src/dto/PlayerInterface.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PoolType = void 0;
var PoolType;
(function (PoolType) {
    PoolType["Classic"] = "classic";
    PoolType["Sandstorm"] = "sandstorm";
    PoolType["LastPong"] = "lastPong";
})(PoolType || (exports.PoolType = PoolType = {}));


/***/ }),

/***/ "./apps/matchmaking/src/dto/join-matchmaking.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/matchmaking/src/dto/join-matchmaking.dto.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinMatchmakingDto = void 0;
class JoinMatchmakingDto {
}
exports.JoinMatchmakingDto = JoinMatchmakingDto;


/***/ }),

/***/ "./apps/matchmaking/src/jobs/matchmaking.job.ts":
/*!******************************************************!*\
  !*** ./apps/matchmaking/src/jobs/matchmaking.job.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchmakingJob = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const matchmaking_service_1 = __webpack_require__(/*! ../services/matchmaking.service */ "./apps/matchmaking/src/services/matchmaking.service.ts");
const PlayerInterface_1 = __webpack_require__(/*! ../dto/PlayerInterface */ "./apps/matchmaking/src/dto/PlayerInterface.ts");
let MatchmakingJob = class MatchmakingJob {
    constructor(matchmakingService) {
        this.matchmakingService = matchmakingService;
    }
    handleClassicMatchmaking() {
        this.handleMatchmaking(PlayerInterface_1.PoolType.Classic);
    }
    handleSandStormMatchmaking() {
        console.log('[Scheduler]: SandStorm matchmaking every second');
        this.handleMatchmaking(PlayerInterface_1.PoolType.Sandstorm);
    }
    handleLastPongMatchmaking() {
        console.log('[Scheduler]: LastPong matchmaking every second');
        this.handleMatchmaking(PlayerInterface_1.PoolType.LastPong);
    }
    handleMatchmaking(matchType) {
        this.matchmakingService.findAndStartMatch(matchType);
    }
};
exports.MatchmakingJob = MatchmakingJob;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_SECOND),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatchmakingJob.prototype, "handleClassicMatchmaking", null);
exports.MatchmakingJob = MatchmakingJob = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof matchmaking_service_1.MatchmakingService !== "undefined" && matchmaking_service_1.MatchmakingService) === "function" ? _a : Object])
], MatchmakingJob);


/***/ }),

/***/ "./apps/matchmaking/src/matchmaking.module.ts":
/*!****************************************************!*\
  !*** ./apps/matchmaking/src/matchmaking.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchmakingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const matchmaking_controller_1 = __webpack_require__(/*! ./controller/matchmaking.controller */ "./apps/matchmaking/src/controller/matchmaking.controller.ts");
const matchmaking_service_1 = __webpack_require__(/*! ./services/matchmaking.service */ "./apps/matchmaking/src/services/matchmaking.service.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const matchmaking_job_1 = __webpack_require__(/*! ./jobs/matchmaking.job */ "./apps/matchmaking/src/jobs/matchmaking.job.ts");
const rabbit_mq_2 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const pool_service_1 = __webpack_require__(/*! ./services/pool.service */ "./apps/matchmaking/src/services/pool.service.ts");
let MatchmakingModule = class MatchmakingModule {
};
exports.MatchmakingModule = MatchmakingModule;
exports.MatchmakingModule = MatchmakingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            common_2.CommonModule,
            rabbit_mq_1.RabbitMqModule,
            rabbit_mq_1.RabbitMqModule.forClientProxy(rmqServerName_1.IRmqSeverName.GATEWAY),
            rabbit_mq_1.RabbitMqModule.forClientProxy(rmqServerName_1.IRmqSeverName.AUTH),
            rabbit_mq_1.RabbitMqModule.forClientProxy(rmqServerName_1.IRmqSeverName.PROFILE)
        ],
        controllers: [matchmaking_controller_1.MatchmakingController],
        providers: [
            matchmaking_service_1.MatchmakingService,
            matchmaking_job_1.MatchmakingJob,
            matchmaking_service_1.MatchmakingService,
            rabbit_mq_2.RabbitMqService,
            pool_service_1.PoolService,
        ],
        exports: [pool_service_1.PoolService],
    })
], MatchmakingModule);


/***/ }),

/***/ "./apps/matchmaking/src/services/matchmaking.service.ts":
/*!**************************************************************!*\
  !*** ./apps/matchmaking/src/services/matchmaking.service.ts ***!
  \**************************************************************/
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchmakingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const pool_service_1 = __webpack_require__(/*! ./pool.service */ "./apps/matchmaking/src/services/pool.service.ts");
const PlayerInterface_1 = __webpack_require__(/*! ../dto/PlayerInterface */ "./apps/matchmaking/src/dto/PlayerInterface.ts");
let MatchmakingService = class MatchmakingService {
    constructor(authClient, profileClient, gatewayClient, clientService, PoolService) {
        this.authClient = authClient;
        this.profileClient = profileClient;
        this.gatewayClient = gatewayClient;
        this.clientService = clientService;
        this.PoolService = PoolService;
    }
    async joinMatchmakingQueue(joinMatchData) {
        const user = await this.clientService.sendMessageWithPayload(this.authClient, {
            role: 'user',
            cmd: 'findById',
        }, joinMatchData.userId);
        const profile = await this.clientService.sendMessageWithPayload(this.profileClient, {
            role: 'profile',
            cmd: 'find-Profile',
        }, user.profileId);
        let playerPoolType;
        switch (joinMatchData.matchType) {
            case "classic":
                playerPoolType = PlayerInterface_1.PoolType.Classic;
                break;
            case "sandstorm":
                playerPoolType = PlayerInterface_1.PoolType.Classic;
                break;
            case "lastPong":
                playerPoolType = PlayerInterface_1.PoolType.Classic;
        }
        const player = {
            id: user.id,
            rank: profile.rank,
            xp: profile.xp,
            bet: profile.wallet.betAmount,
            type: playerPoolType,
            matched: false,
            timePlayerJoin: new Date()
        };
        this.PoolService.addPlayer(player);
        this.findAndStartMatch(PlayerInterface_1.PoolType.Classic);
    }
    async findAndStartMatch(matchType) {
        const matchResult = this.PoolService.matchPlayers(matchType);
        if (matchResult) {
            const [player1, player2] = matchResult;
            const matched = {
                user1Id: player1.id,
                user2Id: player2.id,
                matchKey: this.generateMatchKey(20),
            };
            this.clientService.sendMessageWithPayload(this.gatewayClient, {
                role: 'gateway',
                cmd: 'matchFound',
            }, matched);
        }
    }
    generateMatchKey(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters.charAt(randomIndex);
        }
        return key;
    }
};
exports.MatchmakingService = MatchmakingService;
exports.MatchmakingService = MatchmakingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(rmqServerName_1.IRmqSeverName.AUTH)),
    __param(1, (0, common_2.Inject)(rmqServerName_1.IRmqSeverName.PROFILE)),
    __param(2, (0, common_2.Inject)(rmqServerName_1.IRmqSeverName.GATEWAY)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object, typeof (_d = typeof rabbit_mq_1.RabbitMqService !== "undefined" && rabbit_mq_1.RabbitMqService) === "function" ? _d : Object, typeof (_e = typeof pool_service_1.PoolService !== "undefined" && pool_service_1.PoolService) === "function" ? _e : Object])
], MatchmakingService);


/***/ }),

/***/ "./apps/matchmaking/src/services/pool.service.ts":
/*!*******************************************************!*\
  !*** ./apps/matchmaking/src/services/pool.service.ts ***!
  \*******************************************************/
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
exports.PoolService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const PlayerInterface_1 = __webpack_require__(/*! ../dto/PlayerInterface */ "./apps/matchmaking/src/dto/PlayerInterface.ts");
let PoolService = class PoolService {
    constructor() {
        this.playersByPool = {
            [PlayerInterface_1.PoolType.Classic]: [],
            [PlayerInterface_1.PoolType.Sandstorm]: [],
            [PlayerInterface_1.PoolType.LastPong]: [],
        };
    }
    addPlayer(player) {
        if (this.isPlayerInPool(player)) {
            console.log(`Player ${player.id} is already in the pool: ${player.type}`);
            return;
        }
        player.matched = false;
        this.playersByPool[player.type].push(player);
        console.log("player add to the Pool : ", player.type, " ", player.id);
    }
    isPlayerInPool(player) {
        const players = this.playersByPool[player.type];
        return players.some(existingPlayer => existingPlayer.id === player.id);
    }
    removePlayer(playerId, type) {
        const players = this.playersByPool[type];
        const index = players.findIndex((player) => player.id === playerId);
        if (index !== -1) {
            players.splice(index, 1);
            console.log(`Player ${playerId} removed from pool: ${type}`);
        }
        else {
            console.error(`Player with ID ${playerId} not found in pool: ${type}`);
        }
    }
    matchPlayers(type) {
        console.log("******************************************************");
        console.log(`Matching players for pool: ${type}`);
        const players = this.playersByPool[type];
        if (players.length < 2) {
            console.log(`Insufficient players in pool: ${type}`);
            return null;
        }
        console.log(`Total players in pool ${type}: ${players.length}`);
        const weightedSkills = players.map(player => ({
            player,
            weightedSkill: this.calculateWeightedAverage(player.rank, player.xp)
        }));
        weightedSkills.sort((a, b) => a.weightedSkill - b.weightedSkill);
        const averageSkill = weightedSkills.reduce((sum, player) => sum + player.weightedSkill, 0) / weightedSkills.length;
        const gapThreshold = this.calculateDynamicThreshold(averageSkill);
        const playerTimeOut = 30 * 1000;
        for (let i = 0; i < weightedSkills.length; i++) {
            const current = weightedSkills[i];
            let minDiff = Infinity;
            let bestMatch = undefined;
            for (let j = i + 1; j < weightedSkills.length; j++) {
                const next = weightedSkills[j];
                if (current.player.bet === next.player.bet) {
                    const currentDiff = Math.abs(current.weightedSkill - next.weightedSkill);
                    if (currentDiff < minDiff) {
                        minDiff = currentDiff;
                        bestMatch = next;
                    }
                }
            }
            const currentTime = new Date().getTime();
            const playerTime = current.player.timePlayerJoin.getTime();
            if (bestMatch != undefined && currentTime - playerTime >= playerTimeOut) {
                console.log(`Match found due to player timeout: ${current.player.id} vs ${bestMatch.player.id} type ${bestMatch.player.type}`);
                this.removePlayer(bestMatch.player.id, bestMatch.player.type);
                this.removePlayer(current.player.id, current.player.type);
                return [current.player, bestMatch.player];
            }
            if (bestMatch != undefined && minDiff < gapThreshold) {
                console.log(`Match found based on skill proximity: ${current.player.id} vs ${bestMatch.player.id}`);
                this.removePlayer(current.player.id, current.player.type);
                this.removePlayer(bestMatch.player.id, bestMatch.player.type);
                return [current.player, bestMatch.player];
            }
        }
        console.log('No suitable match found.');
        return null;
    }
    calculateDynamicThreshold(averageSkill) {
        const multiplier = 0.5;
        return averageSkill * multiplier;
    }
    calculateWeightedAverage(rank, xp) {
        const rankWeight = 0.7;
        const xpWeight = 0.3;
        return (rank * rankWeight) + (xp * xpWeight);
    }
};
exports.PoolService = PoolService;
exports.PoolService = PoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PoolService);


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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

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
/*!**************************************!*\
  !*** ./apps/matchmaking/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const matchmaking_module_1 = __webpack_require__(/*! ./matchmaking.module */ "./apps/matchmaking/src/matchmaking.module.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rabbit_constent_1 = __webpack_require__(/*! @app/rabbit-mq/constent/rabbit-constent */ "./libs/rabbit-mq/src/constent/rabbit-constent.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(matchmaking_module_1.MatchmakingModule);
    const rmqService = app.get(rabbit_mq_1.RabbitMqService);
    const matchMakingRmqOptions = rmqService.getOptions(rabbit_constent_1.RABBIT_SERVICES[rmqServerName_1.IRmqSeverName.MATCH_MAKING].queue);
    app.connectMicroservice(matchMakingRmqOptions);
    await app.startAllMicroservices();
    await app.init();
}
bootstrap();

})();

/******/ })()
;