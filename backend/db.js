const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'simon_database_user',
  password: 'NunnHAAIQqYu9y6N3lcpK1hzSR8Cn5cR',
  port: 5432,
  database: 'simon_database'
})

module.exports = pool;