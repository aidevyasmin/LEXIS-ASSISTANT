import dotenv from 'dotenv';
dotenv.config();

console.log("🔥 ENV CHECK:", process.env.DATABASE_URL);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = require('../backend/src/app.js');

export default app;