const { PrismaClient } = require('@prisma/client');

// Direct access to environment variable is most reliable on Vercel
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
  // Optimize for serverless: only log errors in production
  log: ['error'],
});

module.exports = prisma;