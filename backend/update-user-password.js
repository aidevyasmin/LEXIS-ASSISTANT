const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'ynisar514@gmail.com';
  const password = '123456';

  console.log(`Updating password for user: ${email}`);

  // Generate hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log(`Generated hash: ${hash}`);

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { passwordHash: hash },
    });
    console.log('User updated successfully:', user.email);
  } catch (error) {
    if (error.code === 'P2025') {
      console.error('Error: User not found in database.');
      
      // If user doesn't exist, maybe we should create them?
      // For now, let's just log it.
    } else {
      console.error('An unexpected error occurred:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
