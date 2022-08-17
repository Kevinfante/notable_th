const Pool = require("pg").Pool

// current machine does not have pass for postgres user
// in different scenario, would use dotenv to hide env varaibles

const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'notable'
})

module.exports = pool;