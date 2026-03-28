const knex = require('knex');
const knexfile = require('../../knexfile');

// Use current environment (development/production)
const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

/**
 * DATABASE: CONNECTION POOL
 * Initializing Knex with professional configuration.
 */
const db = knex(config);

/**
 * DATABASE: CONNECTION TEST
 * Function to verify database availability.
 */
const checkConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ PostgreSQL Database: Connection Stable');
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL Database: Connection Failed');
    console.error(error.message);
    return false;
  }
};

module.exports = {
  db,
  checkConnection
};
