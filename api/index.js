import dotenv from 'dotenv';
dotenv.config();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../frontend/backend/src/app.js');

export default (req, res) => {
  return app(req, res);
};
