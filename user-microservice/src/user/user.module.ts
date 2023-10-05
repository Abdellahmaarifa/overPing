import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';

@Module({
  providers: [UserService, UserResolver]
})
export class UserModule {}
