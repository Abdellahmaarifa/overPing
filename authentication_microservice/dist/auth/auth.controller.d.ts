import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, user: LoginDto, ip: string): Promise<{
        user: any;
        refreshToken: string;
        accesstoken: string;
    }>;
    redirectToFortyTwoAuth(): Promise<void>;
    fortyTwoAuthCallback(req: any, ip: string, res: any): Promise<any>;
    redirectToGoogleAuth(): Promise<void>;
    GoogleoAuthCallback(req: any, ip: string, res: any): Promise<any>;
    getProfile(req: any): string;
    refresh(req: any): Promise<string>;
}
