
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const defaultPassword = 'bkpasundan2';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Create a default admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bkpasundan2.sch.id' },
    update: {},
    create: {
      name: 'Admin BK',
      email: 'admin@bkpasundan2.sch.id',
      password: hashedPassword,
      avatarId: 'user-avatar-4',
    },
  });

  console.log(`Created admin user with id: ${adminUser.id}`);
  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
