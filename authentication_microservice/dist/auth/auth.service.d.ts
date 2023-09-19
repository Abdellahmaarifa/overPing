import { UsersService } from 'src/database/users/users.service/users.service';
import { JwtService } from '@nestjs/jwt';
import RefreshToken from './entities/refresh-token.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private refreshTokens;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        user: any;
        refreshToken: string;
        accesstoken: string;
    }>;
    private newRefreshAndAccessToken;
    findRefreshTokenById(idToFind: number): RefreshToken | undefined;
    refresh(refreshToken: any): Promise<string | undefined>;
    printRefreshTokens(): void;
}
