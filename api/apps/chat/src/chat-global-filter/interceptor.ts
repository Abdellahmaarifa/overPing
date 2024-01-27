import { RpcExceptionService } from '@app/common/exception-handling';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  constructor (
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return of(this.rpcExceptionService.throwCatchedException({
      code: 200,
      message: `Failed to fetch data`
    }));
  }
}