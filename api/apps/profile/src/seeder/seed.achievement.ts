import { Logger } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import * as fs from 'fs/promises';

const prisma = new PrismaService();

export async function seedAchievements() {
  const logger: Logger = new Logger(`Achievement's Seed`);
  
  try {
    await prisma.$connect();

    const filePath = '/usr/src/app/apps/profile/src/seeder/achievements.data.json';

    const data = await fs.readFile(filePath, 'utf-8');
    const achievementsData = JSON.parse(data);

    let seedCounter = 0;
    for (const achievementData of achievementsData) {
      try {
        const existingAchievement = await prisma.achievement.findFirst({
          where: { title: achievementData.title },
        });
        if (!existingAchievement) {
          await prisma.achievement.create({
            data: achievementData,
          });
        } else {
          await prisma.achievement.updateMany({
            where: { title: achievementData.title },
            data: achievementData,
          });
          logger.log(`"${achievementData.title}" updated...`)
        }
        seedCounter++;
      }
      catch (error) {
        logger.error(`Error seeding "${achievementData.title}"`);
        // logger.error(`************************\n${error}\n************************`);
      }
    }
    if (seedCounter === 0) {
      logger.error('FAILD TO SEED ACHIEVEMENTS')
    } else {
      logger.log('DATA SEEDING COMPLETED.');
    }
  }
  catch (error) {
    logger.error('Error while seeding:', error);
  }
  finally {
    await prisma.$disconnect();
  }
}