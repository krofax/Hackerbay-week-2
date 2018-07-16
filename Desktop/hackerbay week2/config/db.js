require('dotenv').config();

import pg from 'pg';

const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  max: process.env.DB_MAX_CONNECTIONS || 20,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
};

const pool = new pg.Pool(dbConfig);

pool.on('error', function(err) {
  console.log(`idle client error, ${err.message}, ${err.stack}`);
});

module.exports = {
  pool,
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
