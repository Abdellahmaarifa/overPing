import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaService();

async function seed() {
  try {
    // Use path.join to create a cross-platform path
    const filePath = path.join(__dirname, 'achievements.data.json');
    
    // Read data from the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    const achievementsData = JSON.parse(data);

    // Seed Achievements
    for (const achievementData of achievementsData) {
      const existingAchievement = await prisma.achievement.findFirst({
        where: { title: achievementData.title },
      });

      if (!existingAchievement) {
        await prisma.achievement.create({
          data: achievementData,
        });
      } else {
        console.log(`Achievement "${achievementData.title}" already exists. Skipping creation.`);
      }
    }

    console.log('Data seeding completed.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();