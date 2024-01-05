import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { RpcException } from "@nestjs/microservices";

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException) {
    throw new RpcException({
      statusCode: exception.getStatus(),
      errorStatus: exception.message,
    });
  }
}