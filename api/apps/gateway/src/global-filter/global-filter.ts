import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";

export interface errorFormat{
  statusCode: number,
  timestamp: string,
  error: string,
  path: string,
  method?: string,
  type?: any
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }
    // const mess = (() : string | null => {
    //     if (typeof exception.getResponse() === "string")
    //       return null;
    //     const obj : any = exception.getResponse();
    //     return obj.message.toString();
    // })();
    const message = (exception.getResponse() as any)?.message as string || null;
    // const gqlMessage = (exception.getResponse() as any).extensions?.originalError?.message as string || null;
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      error:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? message || exception.message || null
          : "Internal server error",
    };

    // This is for rest  error log
    if (request) {
      const error = {
        ...errorResponse,
        path: request.url,
        method: request.method,
      };

      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(error),
        "ExceptionFilter",
      );

      response.status(status).json(errorResponse);
    } else {
      // This is for gql error log
      const error  = {
        ...errorResponse,
        type: info.parentType,
        path: info.fieldName,
      };

      Logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(error),
        "ExceptionFilter",
      );
      throw new GraphqlException(error.error, error.statusCode);

    }
  }
}

export class GraphqlException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super({ message, statusCode }, statusCode);
  }
}