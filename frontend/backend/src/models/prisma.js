const { PrismaClient } = require('@prisma/client');

// ✅ Get DATABASE_URL from environment
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ CRITICAL: DATABASE_URL is not defined in environment variables.');
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  log: ['error'],
});

module.exports = prisma;