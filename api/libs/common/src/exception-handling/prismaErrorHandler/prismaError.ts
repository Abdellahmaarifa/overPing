import { Prisma } from '@prisma/client';
import { RpcExceptionService } from '@app/common/exception-handling';

export class PrismaError extends Error {
  meta: { code: string; error: string };

  constructor(
    error: Prisma.PrismaClientKnownRequestError,
    customMessage: string,
    private readonly rpcExceptionService: RpcExceptionService
  ) {
    super(customMessage);
    Object.setPrototypeOf(this, PrismaError.prototype);


    this.meta = {
        code: error.code,
        error: error.message,
      };
  }

  handlePrismaError(): void {
    switch (this.meta.code) {
      case 'P2002':
        throw this.rpcExceptionService.throwBadRequest(`Resource already exists`);
      case 'P2025':
        throw this.rpcExceptionService.throwForbidden(`Permission denied`);
      case 'P2020':
        throw this.rpcExceptionService.throwNotFound(`Resource not found`);
      case 'P2045':
        throw this.rpcExceptionService.throwForbidden(`Conflict in resource state`);
      default:
        throw this.rpcExceptionService.throwInternalError('An unexpected Prisma error occurred');
    }
  }
}
