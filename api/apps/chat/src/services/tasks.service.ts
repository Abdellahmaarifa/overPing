import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'apps/chat/prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Interval(60000) // Run every 1 minute
  async handleMutedMembers() {
    try {
      this.logger.log('Updating muted members status...');

      const mutedMembers = await this.prisma.mutedMembers.findMany();
      if (mutedMembers.length === 0) {
        this.logger.warn('No muted members found.');
        return;
      }
      const now = new Date();
      for (const mutedMember of mutedMembers) {
        if (mutedMember.expiry < now) {
          await this.prisma.mutedMembers.delete({
            where: {
              id: mutedMember.id,
            },
          });
          const userTable = await this.prisma.channel.findFirst({
            where: {
              id: mutedMember.channelId,
              admins: { some: { userId: mutedMember.user_id }, }
            }
          }) ? 'Admins' : 'Members';

          await this.prisma[userTable].updateMany({
            where: {
                userId: mutedMember.user_id,
                channelId: mutedMember.channelId,
              },
            data: {
              muteStatus: false,
            },
          });
          
          this.logger.warn(`Member ${mutedMember.user_id} unmuted.`);
        }
      };
    }
    catch (error) {
      this.logger.error(`Error updating muted members status: ${error.message}`);
    }
  }
}