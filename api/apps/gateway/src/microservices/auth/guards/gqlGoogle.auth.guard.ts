import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GoogleGqlGuard extends AuthGuard('google'){
    constructor(){
        super();
    }
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const gqlRes = ctx.getContext().res;
      
        if (gqlReq) {
          const { token } = ctx.getArgs();
          gqlReq.body = { token };
      
          // Ensure that the response object is available in the context
          gqlReq.res = gqlRes;
      
          return gqlReq;
        }
      
        // If not a GraphQL request, return the regular HTTP request
        return context.switchToHttp().getRequest();
      }
      
    
    // handleRequest(err: any, user: any, info: any, context: any, status: any) {
    //     if (err || !user) {
    //        // if the access token jwt is invalid this is the error we will be returning.
    //         throw new UnauthorizedException('Invalid JWT');
    //     }
    //     console.log('the guard is working=========================== ')
    //     return super.handleRequest(err, user, info, context, status);
    // }
}
