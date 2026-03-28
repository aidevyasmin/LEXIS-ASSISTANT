const { PrismaClient } = require('@prisma/client');

// ✅ Get DATABASE_URL from environment
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ CRITICAL: DATABASE_URL is not defined in environment variables.');
  console.error('👉 Please set DATABASE_URL in your Vercel Project Settings or .env file.');
}

// ✅ Use globalThis for serverless environments
const globalForPrisma = global;

// ✅ Create Prisma instance
// If dbUrl is missing, we don't pass datasources to prevent constructor validation error.
// Prisma will then try to read from the env variable automatically if it's there.
const prisma =
  globalForPrisma.prisma ||
  (dbUrl 
    ? new PrismaClient({
        datasources: {
          db: {
            url: dbUrl,
          },
        },
        log: ['error'],
      })
    : new PrismaClient({
        log: ['error'],
      })
  );

// ✅ Prevent multiple instances in dev
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;