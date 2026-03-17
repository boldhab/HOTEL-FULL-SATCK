const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Admin User
  const adminEmail = 'admin@hotel.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Hotel Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', admin.email);
  } else {
    console.log('Admin user already exists');
  }

  // Optional: Add some initial rooms
  const roomCount = await prisma.room.count();
  if (roomCount === 0) {
    await prisma.room.createMany({
      data: [
        {
          name: 'Deluxe Ocean View',
          type: 'Deluxe',
          description: 'A beautiful room with a view of the ocean.',
          price: 250,
          capacity: 2,
        },
        {
          name: 'Family Suite',
          type: 'Suite',
          description: 'Spacious suite for the whole family.',
          price: 450,
          capacity: 4,
        },
      ],
    });
    console.log('Initial rooms seeded');
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
