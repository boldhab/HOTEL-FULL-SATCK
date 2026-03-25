const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const prisma = require('../config/prisma');

dotenv.config();

const seedAdmin = async () => {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hashed,
        role: 'ADMIN',
      },
    });

    console.log(`Admin updated for ${email}`);
    return;
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'ADMIN',
    },
  });

  console.log(`Admin created for ${email}`);
};

seedAdmin()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
