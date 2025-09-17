
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  const users = [
    { name: 'Vina Senjawati, S.Pd', email: 'bk1@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Drs. H. Ahmad Soleh Muslim', email: 'bk2@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'M. Fakhrizal Aditya, S.Pd', email: 'bk3@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Lisnawati Dewi, S.Pd', email: 'bk4@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Eka Dwi Lestari, S.Ag', email: 'bk5@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Muhammad Zakky Sugis, S.Psi', email: 'bk6@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Yuniarti Krishayani, S.Pd', email: 'bk7@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Kartika Irmadanti, S.Pd', email: 'bk8@smkpasundan2.sch.id', role: 'guru_bk' },
    { name: 'Nazhara Falatansa. D, S.Psi', email: 'bk9@smkpasundan2.sch.id', role: 'guru_bk' }
  ];

  const defaultPassword = 'bkpasundan2';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        role: u.role,
        password: hashedPassword,
        avatarId: `user-avatar-${Math.floor(Math.random() * 4) + 1}`
      },
    })
    console.log(`Upserted user with id: ${user.id}`)
  }

  // Seeding students
  const students = [
    { nis: '11111', name: 'Ahmad Dahlan', class: 'XII-A', major: 'Teknik Komputer', jenjang: 'SMK', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki', avatarId: 'student-avatar-1' },
    { nis: '11112', name: 'Budi Santoso', class: 'XII-B', major: 'Akuntansi', jenjang: 'SMK', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki', avatarId: 'student-avatar-2' },
    { nis: '11113', name: 'Citra Lestari', class: 'XI-A', major: 'Teknik Mesin', jenjang: 'SMK', tahunAjaran: '2023/2024', jenisKelamin: 'Perempuan', avatarId: 'student-avatar-3' },
    { nis: '11114', name: 'Dewi Anggraini', class: 'X-C', major: 'Multimedia', jenjang: 'SMK', tahunAjaran: '2023/2024', jenisKelamin: 'Perempuan', avatarId: 'student-avatar-4' },
    { nis: '11115', name: 'Eko Prasetyo', class: 'XII-C', major: 'Otomotif', jenjang: 'SMK', tahunAjaran: '2023/2024', jenisKelamin: 'Laki-laki', avatarId: 'student-avatar-5' }
  ];

  for (const s of students) {
    const student = await prisma.student.upsert({
      where: { nis: s.nis },
      update: {},
      create: s,
    });
    console.log(`Upserted student with id: ${student.id}`);
  }

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
