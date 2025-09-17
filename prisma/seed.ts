
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // This script now ONLY creates a default admin user.
  // All deletion logic has been removed to prevent seeding errors on a fresh database.
  
  const defaultPassword = 'bkpasundan2';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin BK',
      email: 'admin@bkpasundan2.sch.id',
      role: 'guru_bk',
      password: hashedPassword,
      avatarId: `user-avatar-1`
    },
  })
  console.log(`Created admin user with id: ${adminUser.id}`)

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
