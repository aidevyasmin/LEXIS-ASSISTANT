// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'lexis_db'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/models/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Required for most cloud DBs
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: './src/models/migrations',
      tableName: 'knex_migrations'
    }
  }

};
