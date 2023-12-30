// connection-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; 

export function logger(req: Request, res: Response, next: NextFunction) 
{
  //console.log(`Request...---------------------`, req.socket, "-------------------------");
  console.log(`add Request...`, req.socket.remoteAddress, req.socket.remotePort);
  next();
};
