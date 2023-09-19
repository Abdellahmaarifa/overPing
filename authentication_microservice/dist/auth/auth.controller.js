"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const accessToken_guard_1 = require("./guards/accessToken.guard");
const local_auth_grade_1 = require("./guards/local.auth.grade");
const _42_auth_grade_1 = require("./guards/42.auth.grade");
const auth_service_1 = require("./auth.service");
const refreshToken_guard_1 = require("./guards/refreshToken.guard");
const loginDto_1 = require("./dto/loginDto");
const google_auth_grad_1 = require("./guards/google.auth.grad");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, user, ip) {
        return this.authService.login(user, {
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        });
    }
    async redirectToFortyTwoAuth() { }
    async fortyTwoAuthCallback(req, ip, res) {
        const result = await this.authService.login(req.user, {
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        });
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.send({
            user: result.user,
            accessToken: result.accesstoken,
        });
    }
    async redirectToGoogleAuth() { }
    async GoogleoAuthCallback(req, ip, res) {
        const result = await this.authService.login(req.user, {
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        });
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.send({
            user: result.user,
            accessToken: result.accesstoken,
        });
    }
    getProfile(req) {
        return ("req.user");
    }
    async refresh(req) {
        return this.authService.refresh(req.user);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_grade_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, loginDto_1.LoginDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
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
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map