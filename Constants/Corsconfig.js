
require('dotenv').config();

var whitelist = [process.env.REACT_CLIENT_URL]

var corsOptions = {
  credentials:true,
  methods:['GET','POST','PATCH','DELETE'],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = corsOptions