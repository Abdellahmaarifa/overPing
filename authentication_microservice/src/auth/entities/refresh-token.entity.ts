import { JwtService } from "@nestjs/jwt";

export default class RefreshToken{
    id: number;
    userId: number;
    userAgent: string;
    ipAddress: string;

    constructor(
        private readonly jwtService: JwtService,
        init?: Partial<RefreshToken>){
        Object.assign(this, init);
    }
    async sign(): Promise<string>{
        const payload = { ...this };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '7d',
        });
        return refreshToken;
    }
}
