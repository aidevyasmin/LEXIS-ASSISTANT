const { PrismaClient } = require('@prisma/client');

// ✅ Ensure DATABASE_URL exists
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  throw new Error('DATABASE_URL is missing');
}

// ✅ Use globalThis for serverless environments
const globalForPrisma = global;

// ✅ Create Prisma instance
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error'], // optional: add 'query' for debugging
  });

// ✅ Prevent multiple instances in dev
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;