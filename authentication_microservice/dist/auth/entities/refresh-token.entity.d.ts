import { JwtService } from "@nestjs/jwt";
export default class RefreshToken {
    private readonly jwtService;
    id: number;
    userId: number;
    userAgent: string;
    ipAddress: string;
    constructor(jwtService: JwtService, init?: Partial<RefreshToken>);
    sign(): Promise<string>;
}
