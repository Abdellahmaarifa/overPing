/*
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
*/

import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlExecutionContext, GqlArgumentsHost } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private;

  readonly logger = new Logger(HttpExceptionFilter.name);

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);
    const res = ctx.getContext().res;
    const status = exception.getStatus();

    // Add a return statement here

    return res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: 'hoe',
    });
  }
}
