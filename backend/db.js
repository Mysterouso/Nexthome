const { Pool } = require('pg')

require('dotenv').config()

const connectionString = process.env.DEVELOPMENT_URI

const pool = new Pool({
  connectionString: connectionString,
})

module.exports = {
    uri: process.env.DEVELOPMENT_URI,
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
  }