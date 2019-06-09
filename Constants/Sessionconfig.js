

const sessionconfig = {
                        secret: process.env.REACT_JWT_TOKEN,
                        cookie:{
                        maxAge:(1000 * 60 * 60 * 2),
                        secure: false,
                        httpOnly: true},
                        resave: true,
                        saveUninitialized: false,
                        rolling: true
                    }

module.exports = sessionconfig;