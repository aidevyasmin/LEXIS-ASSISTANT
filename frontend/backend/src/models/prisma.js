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
  // Ensure we don't spam connections in serverless environments
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Test connection only once to avoid performance hits
if (process.env.NODE_ENV !== 'production') {
  prisma.$connect()
    .then(() => console.log('✅ Connected to database successfully'))
    .catch((err) => console.error('❌ Database connection error:', err));
}

module.exports = prisma;