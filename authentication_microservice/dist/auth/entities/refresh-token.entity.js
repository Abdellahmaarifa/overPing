"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RefreshToken {
    constructor(jwtService, init) {
        this.jwtService = jwtService;
        Object.assign(this, init);
    }
    async sign() {
        const payload = { ...this };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '7d',
        });
        return refreshToken;
    }
}
exports.default = RefreshToken;
//# sourceMappingURL=refresh-token.entity.js.map