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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../database/users/users.service/users.service");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.refreshTokens = [];
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findByUserName(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user, values) {
        const refreshAndAccessToken = await this.newRefreshAndAccessToken(user, values);
        return ({
            user: user,
            refreshToken: refreshAndAccessToken.refreshToken,
            accesstoken: refreshAndAccessToken.accessToken,
        });
    }
    async newRefreshAndAccessToken(user, values) {
        const refreshObject = new refresh_token_entity_1.default(this.jwtService, {
            id: this.refreshTokens.length === 0
                ? 0
                : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
            ...values,
            userId: user.id,
        });
        this.refreshTokens.push(refreshObject);
        const payload = { username: user.username, sub: user.id };
        const access_secret = process.env.ACCESS_SECRET;
        return {
            refreshToken: await refreshObject.sign(),
            accessToken: await this.jwtService.signAsync(payload, { secret: access_secret, expiresIn: '1h' }),
        };
    }
    findRefreshTokenById(idToFind) {
        return this.refreshTokens.find(token => token.id === idToFind);
    }
    async refresh(refreshToken) {
        const token = this.findRefreshTokenById(refreshToken.id);
        const user = await this.usersService.findOne(token.userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid Jwt User');
        }
        const payload = { username: user.username, sub: user.id };
        const access_secret = process.env.ACCESS_SECRET;
        let accessToken = await this.jwtService.signAsync(payload, { secret: access_secret, expiresIn: '1h' });
        return accessToken;
    }
    printRefreshTokens() {
        this.refreshTokens.forEach((token, index) => {
            console.log(`Refresh Token ${index + 1}:`, token);
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map