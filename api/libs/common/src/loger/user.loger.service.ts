import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserLoggerService {
  private readonly logger = new Logger('UserLoggerService');

  logUserCreated(userId: any) {
    this.logger.log(`User created with ID: ${userId}`);
  }

  logUserDeleted(userId: any) {
    this.logger.log(`User deleted with ID: ${userId}`);
  }
  logUserFound(userId: any){
    this.logger.log(`User found with ID: ${userId}`);
  }
}

