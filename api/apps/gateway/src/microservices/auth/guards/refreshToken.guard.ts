import { Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh-token'){
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (err || !user) {
           // if the access token jwt is invalid this is the error we will be returning.
            //throw new UnauthorizedException('Invalid JWT');
           throw new HttpException({
            status:401
           }, 200) 
        }
        return super.handleRequest(err, user, info, context, status);
    }
}