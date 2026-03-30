const { PrismaClient } = require('@prisma/client');

// STRICT Requirement: Prevent crashes due to missing DATABASE_URL
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  const errorMsg = '❌ CRITICAL CONFIGURATION ERROR: DATABASE_URL environment variable is not defined. Please check your Vercel/Local settings.';
  console.error(errorMsg);
  // We don't throw here to allow the process to start, but Prisma will fail on first query with a clear log.
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  log: ['error', 'warn'],
});

// Fallback check on init
prisma.$connect()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    if (err.message.includes('datasource')) {
      console.error('👉 Hint: This is likely due to an invalid or missing DATABASE_URL.');
    }
  });

module.exports = prisma;