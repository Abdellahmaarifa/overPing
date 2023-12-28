/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/chat/prisma/prisma.service.ts":
/*!********************************************!*\
  !*** ./apps/chat/prisma/prisma.service.ts ***!
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
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/chat/src/chat.module.ts":
/*!**************************************!*\
  !*** ./apps/chat/src/chat.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const exception_handling_1 = __webpack_require__(/*! @app/common/exception-handling */ "./libs/common/src/exception-handling/index.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const directMessage_controller_1 = __webpack_require__(/*! ./controllers/directMessage.controller */ "./apps/chat/src/controllers/directMessage.controller.ts");
const channel_controller_1 = __webpack_require__(/*! ./controllers/channel.controller */ "./apps/chat/src/controllers/channel.controller.ts");
const directMessage_service_1 = __webpack_require__(/*! ./services/directMessage.service */ "./apps/chat/src/services/directMessage.service.ts");
const channel_service_1 = __webpack_require__(/*! ./services/channel.service */ "./apps/chat/src/services/channel.service.ts");
const checkers_service_1 = __webpack_require__(/*! ./services/checkers.service */ "./apps/chat/src/services/checkers.service.ts");
const directMessage_gateway_1 = __webpack_require__(/*! ./gateways/directMessage.gateway */ "./apps/chat/src/gateways/directMessage.gateway.ts");
const notifications_gateway_1 = __webpack_require__(/*! ./gateways/notifications.gateway */ "./apps/chat/src/gateways/notifications.gateway.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.CommonModule,
            rabbit_mq_1.RabbitMqModule,
        ],
        controllers: [
            directMessage_controller_1.DirectMessageController,
            channel_controller_1.ChannelController,
        ],
        providers: [
            prisma_service_1.PrismaService,
            exception_handling_1.RpcExceptionService,
            directMessage_service_1.DirectMessageService,
            channel_service_1.ChannelService,
            checkers_service_1.CheckersService,
            directMessage_gateway_1.DirectMessageGateway,
            notifications_gateway_1.NotificationsGateway,
        ],
    })
], ChatModule);


/***/ }),

/***/ "./apps/chat/src/controllers/channel.controller.ts":
/*!*********************************************************!*\
  !*** ./apps/chat/src/controllers/channel.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const dto_1 = __webpack_require__(/*! ../dto */ "./apps/chat/src/dto/index.ts");
const channel_service_1 = __webpack_require__(/*! ../services/channel.service */ "./apps/chat/src/services/channel.service.ts");
const checkers_service_1 = __webpack_require__(/*! ../services/checkers.service */ "./apps/chat/src/services/checkers.service.ts");
let ChannelController = class ChannelController {
    constructor(channelService, checkers) {
        this.channelService = channelService;
        this.checkers = checkers;
    }
    async findDirectMessageById(payload) {
        return await this.channelService.findById(payload);
    }
    async findChannelMembersById(payload) {
        return await this.channelService.findMembersById(payload);
    }
    async createChannel(payload) {
        return await this.channelService.create(payload);
    }
    async updateChannel(payload) {
        return await this.channelService.update(payload);
    }
    async deleteChannel(payload) {
        const { userID, channelID } = payload;
        return await this.channelService.delete(userID, channelID);
    }
    async updateMessageInChannel(payload) {
        return await this.channelService.updateMessage(payload);
    }
    async deleteMessageInChannel(payload) {
        return await this.channelService.deleteMessage(payload);
    }
    async joinChannel(payload) {
        const { userId, channelId, password } = payload;
        const visibility = await this.checkers.channelVisibility(channelId);
        switch (visibility) {
            case 'protected': {
                if (password) {
                    return await this.channelService.joinProtectedChannel(userId, channelId, password);
                }
                else {
                    return null;
                }
            }
            case 'public': {
                return await this.channelService.joinPublicChannel(userId, channelId);
            }
            default: {
                return null;
            }
        }
    }
    async leaveChannel(payload) {
        const { userId, channelId } = payload;
        return await this.channelService.leave(userId, channelId);
    }
    async addMember(payload) {
        return await this.channelService.addMember(payload);
    }
    async addChannelAdmin(payload) {
        return await this.channelService.addAdmin(payload);
    }
    async removeChannelAdmin(payload) {
        return await this.channelService.removeAdmin(payload);
    }
    async kickMember(payload) {
        return await this.channelService.kickMember(payload);
    }
    async banMember(payload) {
        return await this.channelService.banMember(payload);
    }
    async unbanMember(payload) {
        return await this.channelService.unbanMember(payload);
    }
    async muteMember(payload) {
        return await this.channelService.muteMember(payload);
    }
    async unmuteMember(payload) {
        return await this.channelService.unmuteMember(payload);
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'find-channel-by-id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ChannelController.prototype, "findDirectMessageById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'find-members-by-id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ChannelController.prototype, "findChannelMembersById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'create' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateChanneldto !== "undefined" && dto_1.CreateChanneldto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'update' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof dto_1.UpdateChanneldto !== "undefined" && dto_1.UpdateChanneldto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ChannelController.prototype, "updateChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'delete' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ChannelController.prototype, "deleteChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'update-message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof dto_1.UpdateMessageInChanneldto !== "undefined" && dto_1.UpdateMessageInChanneldto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ChannelController.prototype, "updateMessageInChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'delete-message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof dto_1.DeleteMessageInChanneldto !== "undefined" && dto_1.DeleteMessageInChanneldto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ChannelController.prototype, "deleteMessageInChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'join' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ChannelController.prototype, "joinChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'leave' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ChannelController.prototype, "leaveChannel", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'add-member' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], ChannelController.prototype, "addMember", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'add-admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], ChannelController.prototype, "addChannelAdmin", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'remove-admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ChannelController.prototype, "removeChannelAdmin", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'kickMember' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _z : Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], ChannelController.prototype, "kickMember", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'banMember' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _1 : Object]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], ChannelController.prototype, "banMember", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'unbanMember' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], ChannelController.prototype, "unbanMember", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'muteMember' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_5 = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _5 : Object]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], ChannelController.prototype, "muteMember", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'channel', cmd: 'unmuteMember' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_7 = typeof dto_1.MemberOfChanneldto !== "undefined" && dto_1.MemberOfChanneldto) === "function" ? _7 : Object]),
    __metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], ChannelController.prototype, "unmuteMember", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof channel_service_1.ChannelService !== "undefined" && channel_service_1.ChannelService) === "function" ? _a : Object, typeof (_b = typeof checkers_service_1.CheckersService !== "undefined" && checkers_service_1.CheckersService) === "function" ? _b : Object])
], ChannelController);


/***/ }),

/***/ "./apps/chat/src/controllers/directMessage.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/chat/src/controllers/directMessage.controller.ts ***!
  \***************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectMessageController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const dto_1 = __webpack_require__(/*! ../dto */ "./apps/chat/src/dto/index.ts");
const directMessage_service_1 = __webpack_require__(/*! ../services/directMessage.service */ "./apps/chat/src/services/directMessage.service.ts");
let DirectMessageController = class DirectMessageController {
    constructor(directMessageService) {
        this.directMessageService = directMessageService;
    }
    async findDirectMessageById(payload) {
        return await this.directMessageService.findById(payload);
    }
    async createDirectMessage(payload) {
        const { userID, targetID } = payload;
        return await this.directMessageService.create(userID, targetID);
    }
    async deleteDirectMessage(payload) {
        return await this.directMessageService.delete(payload);
    }
    async updateMessageInDM(payload) {
        return await this.directMessageService.updateMessage(payload);
    }
    async deleteMessageInDM(payload) {
        return await this.directMessageService.deleteMessage(payload);
    }
    async blockUser(payload) {
        const { userID, targetID } = payload;
        return await this.directMessageService.blockUser(userID, targetID);
    }
    async unblockUser(payload) {
        const { userID, targetID } = payload;
        return await this.directMessageService.unblockUser(userID, targetID);
    }
};
exports.DirectMessageController = DirectMessageController;
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'find-by-id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DirectMessageController.prototype, "findDirectMessageById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'create' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DirectMessageController.prototype, "createDirectMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'delete' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.DeleteDirectMessagedto !== "undefined" && dto_1.DeleteDirectMessagedto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], DirectMessageController.prototype, "deleteDirectMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'update-message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.UpdateMessageInDMdto !== "undefined" && dto_1.UpdateMessageInDMdto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], DirectMessageController.prototype, "updateMessageInDM", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'delete-message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof dto_1.DeleteMessageInDMdto !== "undefined" && dto_1.DeleteMessageInDMdto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], DirectMessageController.prototype, "deleteMessageInDM", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'block-user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], DirectMessageController.prototype, "blockUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'direct-message', cmd: 'unblock-user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], DirectMessageController.prototype, "unblockUser", null);
exports.DirectMessageController = DirectMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof directMessage_service_1.DirectMessageService !== "undefined" && directMessage_service_1.DirectMessageService) === "function" ? _a : Object])
], DirectMessageController);


/***/ }),

/***/ "./apps/chat/src/dto/channel.action.dto.ts":
/*!*************************************************!*\
  !*** ./apps/chat/src/dto/channel.action.dto.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateChanneldto = exports.CreateChanneldto = void 0;
class CreateChanneldto {
}
exports.CreateChanneldto = CreateChanneldto;
class UpdateChanneldto {
}
exports.UpdateChanneldto = UpdateChanneldto;


/***/ }),

/***/ "./apps/chat/src/dto/directMessage.action.dto.ts":
/*!*******************************************************!*\
  !*** ./apps/chat/src/dto/directMessage.action.dto.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteDirectMessagedto = void 0;
class DeleteDirectMessagedto {
}
exports.DeleteDirectMessagedto = DeleteDirectMessagedto;


/***/ }),

/***/ "./apps/chat/src/dto/index.ts":
/*!************************************!*\
  !*** ./apps/chat/src/dto/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./channel.action.dto */ "./apps/chat/src/dto/channel.action.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./directMessage.action.dto */ "./apps/chat/src/dto/directMessage.action.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./message.inChannel.dto */ "./apps/chat/src/dto/message.inChannel.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./message.inDirectMessage.dto */ "./apps/chat/src/dto/message.inDirectMessage.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./member.channel.dto */ "./apps/chat/src/dto/member.channel.dto.ts"), exports);


/***/ }),

/***/ "./apps/chat/src/dto/member.channel.dto.ts":
/*!*************************************************!*\
  !*** ./apps/chat/src/dto/member.channel.dto.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberOfChanneldto = void 0;
class MemberOfChanneldto {
}
exports.MemberOfChanneldto = MemberOfChanneldto;


/***/ }),

/***/ "./apps/chat/src/dto/message.inChannel.dto.ts":
/*!****************************************************!*\
  !*** ./apps/chat/src/dto/message.inChannel.dto.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteMessageInChanneldto = exports.UpdateMessageInChanneldto = exports.AddMessageInChanneldto = void 0;
class AddMessageInChanneldto {
}
exports.AddMessageInChanneldto = AddMessageInChanneldto;
class UpdateMessageInChanneldto {
}
exports.UpdateMessageInChanneldto = UpdateMessageInChanneldto;
class DeleteMessageInChanneldto {
}
exports.DeleteMessageInChanneldto = DeleteMessageInChanneldto;


/***/ }),

/***/ "./apps/chat/src/dto/message.inDirectMessage.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/chat/src/dto/message.inDirectMessage.dto.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteMessageInDMdto = exports.UpdateMessageInDMdto = exports.AddMessageInDMdto = void 0;
class AddMessageInDMdto {
}
exports.AddMessageInDMdto = AddMessageInDMdto;
class UpdateMessageInDMdto {
}
exports.UpdateMessageInDMdto = UpdateMessageInDMdto;
class DeleteMessageInDMdto {
}
exports.DeleteMessageInDMdto = DeleteMessageInDMdto;


/***/ }),

/***/ "./apps/chat/src/gateways/directMessage.gateway.ts":
/*!*********************************************************!*\
  !*** ./apps/chat/src/gateways/directMessage.gateway.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectMessageGateway = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const dto_1 = __webpack_require__(/*! ../dto */ "./apps/chat/src/dto/index.ts");
const directMessage_service_1 = __webpack_require__(/*! ../services/directMessage.service */ "./apps/chat/src/services/directMessage.service.ts");
const checkers_service_1 = __webpack_require__(/*! ../services/checkers.service */ "./apps/chat/src/services/checkers.service.ts");
const prisma_service_1 = __webpack_require__(/*! apps/chat/prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
let DirectMessageGateway = class DirectMessageGateway {
    constructor(prisma, directMessageService, checkers) {
        this.prisma = prisma;
        this.directMessageService = directMessageService;
        this.checkers = checkers;
        this.connectedUsers = new Map();
        this.logger = new common_1.Logger('DirectMessageGateway');
    }
    afterInit(server) {
        this.logger.log('WebSocket initialized');
    }
    handleConnection(client, ...args) {
        this.logger.log(`User connected: ${client.id}`);
        this.connectedUsers.set(parseInt(client.id), client);
    }
    handleDisconnect(client) {
        this.logger.log(`User disconnected: ${client.id}`);
        this.connectedUsers.delete(parseInt(client.id));
    }
    sendMessageToUser(data) {
        if (this.checkers.isBlocked(data.userId, data.recipientId)) {
            return;
        }
        const message = this.directMessageService.addMessage(data);
        if (message) {
            const socket = this.connectedUsers.get(data.recipientId);
            if (socket) {
                socket.emit('message', message);
            }
            else {
                this.prisma.notifications.create({
                    data: {
                        user_id: data.recipientId,
                        sender_id: data.userId,
                        text: data.text ?? null,
                        media_id: data.mediaId ?? 0,
                    }
                });
            }
        }
    }
};
exports.DirectMessageGateway = DirectMessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_d = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _d : Object)
], DirectMessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessageToUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.AddMessageInDMdto !== "undefined" && dto_1.AddMessageInDMdto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], DirectMessageGateway.prototype, "sendMessageToUser", null);
exports.DirectMessageGateway = DirectMessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
        namespace: 'chat-directMessages',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof directMessage_service_1.DirectMessageService !== "undefined" && directMessage_service_1.DirectMessageService) === "function" ? _b : Object, typeof (_c = typeof checkers_service_1.CheckersService !== "undefined" && checkers_service_1.CheckersService) === "function" ? _c : Object])
], DirectMessageGateway);


/***/ }),

/***/ "./apps/chat/src/gateways/notifications.gateway.ts":
/*!*********************************************************!*\
  !*** ./apps/chat/src/gateways/notifications.gateway.ts ***!
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
exports.NotificationsGateway = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const prisma_service_1 = __webpack_require__(/*! apps/chat/prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
let NotificationsGateway = class NotificationsGateway {
    constructor(prisma) {
        this.prisma = prisma;
        this.connectedUsers = new Map();
        this.logger = new common_1.Logger('NotificationsGateway');
    }
    afterInit(server) {
        this.logger.log('WebSocket initialized');
    }
    handleConnection(client, ...args) {
        this.logger.log(`User connected: ${client.id}`);
        this.connectedUsers.set(parseInt(client.id), client);
        this.sendPendingMessages(parseInt(client.id));
    }
    handleDisconnect(client) {
        this.logger.log(`User disconnected: ${client.id}`);
        this.connectedUsers.delete(parseInt(client.id));
    }
    async sendPendingMessages(userId) {
        const pendingMessages = await this.prisma.notifications.findMany({
            where: {
                user_id: userId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        const socket = this.connectedUsers.get(userId);
        for (const pendingMessage of pendingMessages) {
            if (socket) {
                const message = {
                    sender_id: pendingMessage.sender_id,
                    recipient_id: pendingMessage.user_id,
                    text: pendingMessage.text,
                    media_id: pendingMessage.media_id,
                    createdAt: pendingMessage.createdAt
                };
                socket.emit('message', message);
            }
        }
        await this.prisma.notifications.deleteMany({
            where: {
                user_id: userId,
            },
        });
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], NotificationsGateway.prototype, "server", void 0);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true,
        namespace: 'notifications',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], NotificationsGateway);


/***/ }),

/***/ "./apps/chat/src/services/channel.service.ts":
/*!***************************************************!*\
  !*** ./apps/chat/src/services/channel.service.ts ***!
  \***************************************************/
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
exports.ChannelService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/chat/prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
const checkers_service_1 = __webpack_require__(/*! ./checkers.service */ "./apps/chat/src/services/checkers.service.ts");
let ChannelService = class ChannelService {
    constructor(prisma, checkers) {
        this.prisma = prisma;
        this.checkers = checkers;
    }
    async findById(channelID) {
        return await this.prisma.channel.findUnique({
            where: { id: channelID },
            include: {
                admins: { select: { userId: true } },
                members: { select: { userId: true } },
                messages: { orderBy: { createdAt: 'asc' } },
            }
        });
    }
    async findMembersById(channelID) {
        const channelMembers = await this.prisma.members.findMany({
            where: { id: channelID },
            select: { userId: true }
        });
        return channelMembers;
    }
    async create(data) {
        const description = "Our community is built on the fundamental principle of shared learning. As you explore the world of web and mobile development, we want to provide you with a platform to discover new things, learn new tricks, and unlock your full potential.";
        const hashedPassword = await this.checkers.hashPassword(data.password);
        return this.prisma.channel.create({
            data: {
                owner_id: data.userId,
                name: data.channelName,
                description: data.description ?? description,
                visibility: data.visibility,
                password: hashedPassword,
                admins: { create: [{ userId: data.userId }] },
                members: { create: [{ userId: data.userId }] },
            },
            include: {
                admins: { select: { userId: true } },
                members: { select: { userId: true } },
                messages: { orderBy: { createdAt: 'asc' } },
            }
        });
    }
    async update(data) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: data.channelId,
                owner_id: data.userId
            },
        });
        if (!channel) {
            return null;
        }
        return await this.prisma.channel.update({
            where: {
                id: data.channelId,
                owner_id: data.userId
            },
            data: {
                name: data.channelName ?? channel.name,
                description: data.description ?? channel.description,
                visibility: data.visibility ?? channel.visibility,
                password: data.password ?? channel.password,
            },
            include: {
                admins: { select: { userId: true } },
                members: { select: { userId: true } },
                messages: { orderBy: { createdAt: 'asc' } },
            }
        });
    }
    async delete(userID, channelID) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: channelID,
                owner_id: userID
            },
        });
        if (!channel) {
            return false;
        }
        await this.prisma.channel.delete({
            where: { id: channelID },
        });
        return true;
    }
    async addMessage(data) {
        return await this.prisma.messages.create({
            data: {
                sender_id: data.userId,
                recipient_id: 0,
                text: data.text ?? null,
                media_id: data.mediaId ?? 0,
                channel: { connect: { id: data.channelId } }
            }
        });
    }
    async updateMessage(data) {
        const message = await this.prisma.messages.findUnique({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
        });
        if (!message) {
            return null;
        }
        return await this.prisma.messages.update({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
            data: {
                text: data.text,
                updated: true
            }
        });
    }
    async deleteMessage(data) {
        const message = await this.prisma.messages.findUnique({
            where: {
                id: data.channelID,
                sender_id: data.userId
            },
        });
        if (!message) {
            return false;
        }
        await this.prisma.messages.delete({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
        });
        return true;
    }
    async joinPublicChannel(userID, channelID) {
        const channel = await this.prisma.channel.findFirst({
            where: {
                id: channelID,
            }
        });
        if (!channel) {
            return null;
        }
        await this.prisma.members.create({
            data: {
                userId: userID,
                channel: { connect: { id: channelID } },
            }
        });
        return await this.findById(channelID);
    }
    async joinProtectedChannel(userID, channelID, password) {
        const channel = await this.prisma.channel.findFirst({
            where: {
                id: channelID,
            }
        });
        const isMatched = await this.checkers.isPasswordMatched(channel.password, password);
        if (!channel || !isMatched) {
            return null;
        }
        await this.prisma.members.create({
            data: {
                userId: userID,
                channel: { connect: { id: channelID } },
            }
        });
        return await this.findById(channelID);
    }
    async leave(userID, channelID) {
        await this.prisma.members.deleteMany({
            where: {
                userId: userID,
                channelId: channelID,
            },
        });
        return true;
    }
    async addAdmin(data) {
        if (!this.checkers.isOwner(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.admins.create({
            data: {
                userId: data.targetId,
                channel: { connect: { id: data.channelId } },
            }
        });
        return true;
    }
    async removeAdmin(data) {
        if (!this.checkers.isOwner(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.admins.deleteMany({
            where: {
                userId: data.targetId,
                channelId: data.channelId,
            },
        });
        return true;
    }
    async addMember(data) {
        if (!this.checkers.isMember(data.userId, data.channelId)
            || this.checkers.isBanned(data.targetId, data.channelId)) {
            return false;
        }
        await this.prisma.members.create({
            data: {
                userId: data.targetId,
                channel: { connect: { id: data.channelId } },
            }
        });
        return true;
    }
    async kickMember(data) {
        if (!this.checkers.isAdmin(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.members.deleteMany({
            where: {
                userId: data.targetId,
                channelId: data.channelId,
            },
        });
        return true;
    }
    async banMember(data) {
        if (!this.checkers.isAdmin(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.members.deleteMany({
            where: {
                userId: data.targetId,
                channelId: data.channelId,
            },
        });
        await this.prisma.bannedMembers.create({
            data: {
                userId: data.targetId,
                channel: { connect: { id: data.channelId } },
            }
        });
        return true;
    }
    async unbanMember(data) {
        if (!this.checkers.isAdmin(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.bannedMembers.deleteMany({
            where: {
                userId: data.targetId,
                channelId: data.channelId,
            },
        });
        return true;
    }
    async muteMember(data) {
        if (!this.checkers.isAdmin(data.userId, data.channelId)) {
            return false;
        }
        const muteDuration = data.muteTimeLimit?.getTime() || 3600 * 1000;
        await this.prisma.mutedMembers.create({
            data: {
                channel_id: data.channelId,
                mutedMember_id: data.targetId,
                expiry: new Date(Date.now() + muteDuration),
            }
        });
        return true;
    }
    async unmuteMember(data) {
        if (!this.checkers.isAdmin(data.userId, data.channelId)) {
            return false;
        }
        await this.prisma.mutedMembers.deleteMany({
            where: {
                channel_id: data.channelId,
                mutedMember_id: data.targetId,
            }
        });
        return true;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof checkers_service_1.CheckersService !== "undefined" && checkers_service_1.CheckersService) === "function" ? _b : Object])
], ChannelService);


/***/ }),

/***/ "./apps/chat/src/services/checkers.service.ts":
/*!****************************************************!*\
  !*** ./apps/chat/src/services/checkers.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/chat/prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let CheckersService = class CheckersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async isOwner(userId, channelId) {
        const owner = await this.prisma.channel.findFirst({
            where: {
                id: channelId,
                owner_id: userId,
            },
        });
        return !!owner;
    }
    async isAdmin(userId, channelId) {
        const admin = await this.prisma.admins.findFirst({
            where: {
                channelId: channelId,
                userId: userId,
            },
        });
        return !!admin;
    }
    async isMember(userId, channelId) {
        const member = await this.prisma.members.findFirst({
            where: {
                channelId: channelId,
                userId: userId,
            },
        });
        return !!member;
    }
    async authorized(userId, targetId, channelId) {
        const isTargetChannelOwner = await this.prisma.channel.findFirst({
            where: {
                id: channelId,
                owner_id: targetId,
            },
        });
        if (isTargetChannelOwner) {
            return false;
        }
        return await this.isAdmin(userId, channelId);
    }
    async isBlocked(userId, targetId) {
        const blockedMember = await this.prisma.blockedUsers.findFirst({
            where: {
                OR: [
                    { user_id: userId, blockedUser_id: targetId, },
                    { user_id: targetId, blockedUser_id: userId, },
                ]
            },
        });
        return !!blockedMember;
    }
    async isMuted(userId, channelId) {
        const mutedMember = await this.prisma.mutedMembers.findFirst({
            where: {
                channel_id: channelId,
                mutedMember_id: userId,
            },
        });
        if (mutedMember && mutedMember.expiry <= new Date()) {
            await this.prisma.mutedMembers.deleteMany({
                where: {
                    channel_id: channelId,
                    mutedMember_id: userId,
                }
            });
            return false;
        }
        return !!mutedMember;
    }
    async isBanned(userID, channelID) {
        const bannedMember = await this.prisma.bannedMembers.findFirst({
            where: {
                channelId: channelID,
                userId: userID,
            },
        });
        return !!bannedMember;
    }
    async channelVisibility(channelID) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: channelID,
            },
            select: { visibility: true },
        });
        return channel?.visibility || null;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async isPasswordMatched(hashedPassword, providedPassword) {
        const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
        return isMatch;
    }
};
exports.CheckersService = CheckersService;
exports.CheckersService = CheckersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CheckersService);


/***/ }),

/***/ "./apps/chat/src/services/directMessage.service.ts":
/*!*********************************************************!*\
  !*** ./apps/chat/src/services/directMessage.service.ts ***!
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
exports.DirectMessageService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! apps/chat/prisma/prisma.service */ "./apps/chat/prisma/prisma.service.ts");
const checkers_service_1 = __webpack_require__(/*! ./checkers.service */ "./apps/chat/src/services/checkers.service.ts");
let DirectMessageService = class DirectMessageService {
    constructor(prisma, checkers) {
        this.prisma = prisma;
        this.checkers = checkers;
    }
    async findById(directMessageID) {
        return await this.prisma.directMessage.findUnique({
            where: { id: directMessageID },
            include: {
                messages: { orderBy: { createdAt: 'asc' } }
            }
        });
    }
    async create(userID, targetID) {
        if (this.checkers.isBlocked(userID, targetID)) {
            return null;
        }
        return await this.prisma.directMessage.create({
            data: {
                user1_id: userID,
                user2_id: targetID
            },
            include: {
                messages: { orderBy: { createdAt: 'asc' } }
            }
        });
    }
    async delete(data) {
        return false;
    }
    async addMessage(data) {
        return await this.prisma.messages.create({
            data: {
                sender_id: data.userId,
                recipient_id: data.recipientId,
                text: data.text ?? null,
                media_id: data.mediaId ?? 0,
                dm: { connect: { id: data.groupChatId } }
            }
        });
    }
    async updateMessage(data) {
        const message = await this.prisma.messages.findUnique({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
        });
        if (!message && this.checkers.isBlocked(data.userId, data.groupChatId)) {
            return null;
        }
        return await this.prisma.messages.update({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
            data: {
                text: data.text,
                updated: true
            }
        });
    }
    async deleteMessage(data) {
        const message = await this.prisma.messages.findUnique({
            where: {
                id: data.messageId,
                sender_id: data.userId
            },
        });
        if (!message) {
            return false;
        }
        await this.prisma.messages.delete({
            where: {
                id: data.messageId,
                sender_id: data.userId
            }
        });
        return true;
    }
    async blockUser(userID, targetID) {
        await this.prisma.blockedUsers.create({
            data: {
                user_id: userID,
                blockedUser_id: targetID,
            }
        });
        return true;
    }
    async unblockUser(userID, targetID) {
        await this.prisma.blockedUsers.deleteMany({
            where: {
                user_id: userID,
                blockedUser_id: targetID,
            },
        });
        return true;
    }
};
exports.DirectMessageService = DirectMessageService;
exports.DirectMessageService = DirectMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof checkers_service_1.CheckersService !== "undefined" && checkers_service_1.CheckersService) === "function" ? _b : Object])
], DirectMessageService);


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
    },
    [rmqServerName_1.IRmqSeverName.MATCH_MAKING]: {
        queue: 'match_making_queue'
    },
    [rmqServerName_1.IRmqSeverName.CHAT]: {
        queue: 'chat_queue'
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
    IRmqSeverName["CHAT"] = "CHAT_SERVICE";
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

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

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
  !*** ./apps/chat/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const chat_module_1 = __webpack_require__(/*! ./chat.module */ "./apps/chat/src/chat.module.ts");
const rabbit_mq_1 = __webpack_require__(/*! @app/rabbit-mq */ "./libs/rabbit-mq/src/index.ts");
const rabbit_constent_1 = __webpack_require__(/*! @app/rabbit-mq/constent/rabbit-constent */ "./libs/rabbit-mq/src/constent/rabbit-constent.ts");
const rmqServerName_1 = __webpack_require__(/*! @app/rabbit-mq/interface/rmqServerName */ "./libs/rabbit-mq/src/interface/rmqServerName.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(chat_module_1.ChatModule);
    const rmqService = app.get(rabbit_mq_1.RabbitMqService);
    app.connectMicroservice(rmqService.getOptions(rabbit_constent_1.RABBIT_SERVICES[rmqServerName_1.IRmqSeverName.CHAT].queue));
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;