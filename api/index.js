import dotenv from 'dotenv';
dotenv.config();

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (req, res) => {
  try {
    // Explicitly find the file from the project root
    const appPath = join(__dirname, '../frontend/backend/src/app.js');
    console.log('--- Attempting to load app from path:', appPath);
    
    const app = require(appPath);
    
    if (typeof app !== 'function') {
      throw new Error(`The backend app was not exported correctly as a function. Received: ${typeof app}`);
    }

    return app(req, res);
  } catch (error) {
    console.error('CRITICAL API ERROR IN VERCEL FUNCTION:', error);
    return res.status(500).json({
      message: 'API failed to start on Vercel server',
      details: error.message,
      path_attempted: join(__dirname, '../frontend/backend/src/app.js')
    });
  }
};
