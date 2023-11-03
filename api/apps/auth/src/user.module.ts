import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoggerService } from '../../../libs/common/src/loger/user.loger.service'
import { UserController } from './controllers/user.controller'

@Module({
  providers: [
    UserService,
    PrismaService,
    UserLoggerService],
    controllers: [UserController],
  exports:[UserService, UserLoggerService]
})
export class UserModule {}
