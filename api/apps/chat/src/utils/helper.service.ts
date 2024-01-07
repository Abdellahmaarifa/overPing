import { RpcExceptionService } from '@app/common/exception-handling';
import { RabbitMqService } from '@app/rabbit-mq';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'apps/chat/prisma/prisma.service';
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CheckerService } from './checker.service';

@Injectable()
export class HelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly checker: CheckerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async hashPassword(password: string) : Promise<string> {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const argon2 = require('argon2');
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }
  
  async isPasswordMatched(hashedPassword: string, providedPassword: string ) {
    // const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    const argon2 = require('argon2');
    const isMatch = await argon2.verify(hashedPassword, providedPassword);
    return isMatch;
  }

  async channelSecurityValidation(visibility: string, password: string): Promise<boolean> {
    const emptyPassword = await this.checker.isEmpty(password);
    if (visibility === 'protected' && emptyPassword) {
      return false;
    } else if (visibility !== 'protected' && !emptyPassword) {
      return false;
    }
    return true
  }

  async getUserId(client: Socket) : Promise<number | null> {
    try {
      const session = client.handshake.headers.cookie;
      const token = session?.split('=')[1];
      if (token) {
        const user = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        return user.sub;
      }
    } catch (error) {
      if (error.expiredAt) {
        this.rpcExceptionService.throwUnauthorised(
          'Token has expired, please sign in',
        );
      }
      return null;
    }
  }
}
