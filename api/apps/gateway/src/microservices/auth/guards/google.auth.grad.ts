import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class GoogleGuard extends AuthGuard('google'){
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (err || !user) {
           // if the access token jwt is invalid this is the error we will be returning.
            throw new UnauthorizedException(err,'Invalid JWT');
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
