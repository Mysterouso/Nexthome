const { Pool } = require('pg')


require('dotenv').config()

const connectionString = process.env.REACT_DEVELOPMENT_URI

const pool = new Pool({
  connectionString: connectionString,
})

const makeQuery = (parameters,query) => {
  return pool.query(query,parameters)
  .then(res=>res.rows)
  .catch(err=>console.log("Error",err))
}

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
    makeQuery,
    pool
  }