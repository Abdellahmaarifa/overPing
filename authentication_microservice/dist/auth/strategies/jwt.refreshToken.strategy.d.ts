import { Strategy } from 'passport-jwt';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        userId: any;
        ipAddress: any;
        userAgent: any;
    }>;
}
export {};
