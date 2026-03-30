const { PrismaClient } = require('@prisma/client');

// Force-read from process.env with potential fallback logic for Vercel
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ CRITICAL VERCEL ERROR: DATABASE_URL is missing from process.env');
  console.log('Available Env Keys:', Object.keys(process.env).filter(k => !k.includes('TOKEN') && !k.includes('KEY')));
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  log: ['error', 'warn'],
});

// Test connection on initialization if in production (Vercel)
if (process.env.VERCEL) {
  prisma.$connect()
    .then(() => console.log('✅ Prisma connected successfully to Neon DB'))
    .catch(err => console.error('❌ Prisma connection failed on Vercel:', err.message));
}

module.exports = prisma;