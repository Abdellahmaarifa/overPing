import {
  Catch,
  HttpException,
  ArgumentsHost,
  Logger,
} from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

// @Catch()
// export class ChatExceptionFilter extends BaseWsExceptionFilter {

//   catch(exception: WsException | HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToWs();
//     console.log('\n\n\nctx:', ctx, '\n\n\n');
//     console.log('\n\n\nexception:', exception, '\n\n\n');
//     const client = ctx.getClient() as Socket;


//     if (!client || typeof client.emit !== 'function') {
//       Logger.error(
//         'Invalid client',
//         null,
//         'ChatExceptionFilter',
//       );
//       return;
//     }
//       // const error = exception instanceof WsException ? exception.getError() : exception!.getResponse();
      
//     let error;
//     if (exception instanceof WsException) {
//       error = exception.getError();
//     } else if (exception instanceof HttpException) {
//       error = exception.getResponse();
//     } else {
//       error = 'Internal Server Error';
//     }
    
//     const details = error instanceof Object ? { ...error } : { message: error };

//     const pattern = ctx.getPattern() ? ctx.getPattern() : 'unkown';
    
//     let errorMessage = '';
//     if (Array.isArray((details as any).message)) {
//         errorMessage = (details as any).message.join(', ');
//     } else {
//         errorMessage = (details as any).message;
//     }

//     const response = {
//       statusCode: (details as any).statusCode,
//       timestamp: new Date(),
//       message: errorMessage,
//     }
    
//     Logger.error(
//       `Event ${pattern}`,
//       JSON.stringify(response),
//       "ChatExceptionFilter",
//     );

//     client.emit('error', {...response, pattern});
//   }
// }



@Catch()
export class ChatExceptionFilter extends BaseWsExceptionFilter {

  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    console.log('\n\n\nctx:', ctx, '\n\n\n');
    console.log('\n\n\nexception:', exception, '\n\n\n');
    const client = ctx.getClient() as Socket;

    if (!client || typeof client.emit !== 'function') {
      Logger.error(
        'Invalid client or client does not have emit function',
        null,
        'ChatExceptionFilter',
      );
      return;
    }

    try {
      let error;
      if (exception instanceof WsException) {
        error = exception.getError();
      } else if (exception instanceof HttpException) {
        error = exception.getResponse();
      } else {
        error = 'Internal Server Error';
      }

      const details = error instanceof Object ? { ...error } : { message: error };
      const pattern = ctx.getPattern() ? ctx.getPattern() : 'unknown';
      let errorMessage = '';

      if (Array.isArray((details as any).message)) {
        errorMessage = (details as any).message.join(', ');
      } else {
        errorMessage = (details as any).message;
      }

      const response = {
        statusCode: (details as any).statusCode || 500,
        timestamp: new Date(),
        message: errorMessage,
      };

      Logger.error(
        `Event ${pattern}`,
        JSON.stringify(response),
        "ChatExceptionFilter",
      );

      client.emit('error', { ...response, pattern });
    } catch (error) {
      Logger.error(
        'Error occurred while handling exception:',
        error.stack,
        'ChatExceptionFilter',
      );
    }
  }
}
