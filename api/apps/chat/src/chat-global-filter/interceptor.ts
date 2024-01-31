// import { RpcExceptionService } from '@app/common/exception-handling';
// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { map, Observable, of } from 'rxjs';

// @Injectable()
// export class FormatResponseInterceptor implements NestInterceptor {
//   constructor (
//     private readonly rpcExceptionService: RpcExceptionService,
//   ) {}
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return of(this.rpcExceptionService.throwCatchedException({
//       code: 400,
//       message: `Failed to fetch data`
//     }));
//   }

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const request = context.switchToHttp().getRequest();
        const errorSource = {
          path: request.url,
          timestamp: new Date().toISOString()
        };
        const enhancedError = { ...error, errorSource };
        return throwError(enhancedError);
      }),
    );
  }
}