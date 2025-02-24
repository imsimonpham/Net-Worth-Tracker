const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'Hanzo1412.',
  port: 5432,
  database: 'perntodo'
})

module.exports = pool;