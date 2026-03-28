import dotenv from 'dotenv';
dotenv.config();

// Static import is much more reliable for Vercel's bundler
import app from '../frontend/backend/src/app.js';

export default async (req, res) => {
  // Direct health check to verify the API is alive
  if (req.url === '/api/health-check') {
    return res.status(200).json({ status: 'API is Live on Vercel' });
  }

  try {
    // Vercel sometimes wraps the export in a default object
    const finalApp = app.default || app;
    
    if (typeof finalApp !== 'function') {
      return res.status(500).json({
        message: 'Backend initialization error',
        details: `App is a ${typeof finalApp} instead of a function`
      });
    }

    return finalApp(req, res);
  } catch (error) {
    console.error('CRITICAL VERCEL RUNTIME ERROR:', error);
    return res.status(500).json({
      message: 'API Runtime Error',
      error: error.message
    });
  }
};
