const knex = require('knex');
const MAX_CONNECTION_POOLSIZE = 150;

// const {
//   DB_NAME = 'agua_manantial',
//   DB_USER = 'postgres',
//   DB_PASS = '12345',
//   DB_HOST = 'localhost',
//   DB_PORT = 5432,
// } = process.env;
const {
  DB_NAME = 'aguamanantial1',
  DB_USER = 'manantial',
  DB_PASS = 'manantial12345',
  DB_HOST = 'database-agua-manantial.coqf1pyunolc.us-east-1.rds.amazonaws.com',
  DB_PORT = 5433,
} = process.env;
const config = {
  client: 'pg',
  connection: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  pool: { min: 1, max: MAX_CONNECTION_POOLSIZE },
  acquireConnectionTimeout: 5000,
};
const Db = knex(config);
module.exports = Db;
