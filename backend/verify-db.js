const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connection_test`;
    console.log('✅ Database connection successful:', result);
    
    const userCount = await prisma.user.count();
    console.log('📊 Current User count:', userCount);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
