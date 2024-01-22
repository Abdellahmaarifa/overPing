import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IErrorDescription } from './error.interface';
@Injectable()
export class RpcExceptionService {

    throwNotFound(customErrorMessage?: string): RpcException {
        throw new RpcException({
            statusCode: 404,
            errorStatus: customErrorMessage || 'Not Found',
        });
    }

    throwBadRequest(customErrorMessage?: string): RpcException {
        throw new RpcException({
            statusCode: 400,
            errorStatus: customErrorMessage || 'Bad Request',
        });
    }

    throwForbidden(customErrorMessage?: string): RpcException {
        throw new RpcException({
            statusCode: 403,
            errorStatus: customErrorMessage || 'Forbidden',
        });
    }

    throwUnauthorised(customErrorMessage?: string): RpcException {
        throw new RpcException({
          statusCode: 401,
          errorStatus: customErrorMessage || 'Unauthorised',
        });
    }

    throwInternalError(customErrorMessage?: string): RpcException {
        throw new RpcException({
          statusCode: 500,
          errorStatus: customErrorMessage || 'Internal Server Error',
        });
    }

    throwCatchedException(error: IErrorDescription): RpcException {
        throw new RpcException({
          statusCode: error.code,
          errorStatus: error.message,
        });
    }
}