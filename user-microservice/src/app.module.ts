import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user/user/user.service';
import { startListening } from './rabbitmq.listener';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService, UserService],
})
export class AppModule {
  constructor() {
    startListening();
  }
}
