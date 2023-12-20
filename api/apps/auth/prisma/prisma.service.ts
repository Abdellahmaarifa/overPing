import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // await this.$connect();
    try {
      console.log('#################Connecting to the database...####################');
      await this.$connect();
      console.log('################Connected to the database########################');
    } catch (e) {
      console.error('##########################Error connecting to the database##################', e);
      throw e; // Rethrow the error to ensure the application stops if the connection fails
    }
  }
}
