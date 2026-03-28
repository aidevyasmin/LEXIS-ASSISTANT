import dotenv from 'dotenv';
dotenv.config();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async (req, res) => {
  try {
    // We import this inside the handler so initialization errors are caught
    const app = require('../frontend/backend/src/app.js');
    return app(req, res);
  } catch (error) {
    console.error('CRITICAL API INITIALIZATION ERROR:', error);
    return res.status(500).json({
      message: 'API failed to initialize on Vercel',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      path: req.url
    });
  }
};
