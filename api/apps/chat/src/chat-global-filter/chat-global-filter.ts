import {
  Catch,
  HttpException,
  ArgumentsHost,
  Logger,
} from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Catch()
export class ChatExceptionFilter extends BaseWsExceptionFilter {

  catch(exception: WsException | HttpException, host: ArgumentsHost) {

      const ctx = host.switchToWs();
      const client = ctx.getClient() as Socket;
      const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
      const details = error instanceof Object ? { ...error } : { message: error };

      const pattern = ctx.getPattern() ? ctx.getPattern() : 'unkown';
      
      let errorMessage = '';
      if (Array.isArray((details as any).message)) {
          errorMessage = (details as any).message.join(', ');
      } else {
          errorMessage = (details as any).message;
      }

      const response = {
        statusCode: (details as any).statusCode,
        timestamp: new Date(),
        message: errorMessage,
      }
      
      Logger.error(
        `Event ${pattern}`,
        JSON.stringify(response),
        "ChatExceptionFilter",
      );
  
      client.emit('error', {...response, pattern});
  }
}