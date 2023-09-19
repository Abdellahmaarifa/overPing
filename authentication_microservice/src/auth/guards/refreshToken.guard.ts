import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh'){
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (err || !user) {
           // if the access token jwt is invalid this is the error we will be returning.
            throw new UnauthorizedException('Invalid JWT');
        }
        return super.handleRequest(err, user, info, context, status);
    }
}