const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const bcrypt = require('bcrypt');
const db = require('./db')
const session = require ('express-session')
const pgSession = require('connect-pg-simple')(session)
const helmet = require('helmet');
const morgan = require('morgan');

const commentRouter = require('./Routes/Comments')

const signin = require('./Routefunctions/signin')
const register = require('./Routefunctions/register')


var whitelist = ['http://localhost:3000']
var corsOptions = {
  credentials:true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express()

//Middlewares
app.use(helmet())
app.use(cors(corsOptions))
// app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
  store: new pgSession({
   pool:db.pool
  }),
  secret: process.env.REACT_JWT_TOKEN,
  cookie:{
    maxAge:(1000 * 60 * 60 * 2),
    secure: false,
    httpOnly: true},
  resave: true,
  saveUninitialized: false,
  rolling: true
}))
app.use(morgan('combined'));
// Routes
app.use('/comments',commentRouter);


app.get('/', (req,res)=>{
  req.session.id="This is from session"
  console.log('This is what we\'re dealing with ',req.session)
  res.status(200).json("Do you work?")
})

app.post('/signin',(req,res)=>signin(db,bcrypt,req,res))

app.post('/register',(req,res)=>register(db,bcrypt,req,res))


app.get('/session',(req,res)=>{
  
  if( !req.session.user || !Object.keys(req.session.user).length ) return res.json({isLoggedIn:false});
  
  const findEmailQuery = "SELECT * FROM user_details WHERE id = $1;";

  db.makeQuery([req.session.user.id],findEmailQuery)
  .then(item=>{ 
      res.json({
        isLoggedIn:true,
        user:{
          id:item[0].id, 
          name:item[0].name, 
          email:item[0].email
        }
      });
  })
  
})

app.get('/logout',(req,res)=>{
  
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      return res.json({loggedOut:false});
    }
    res.json({loggedOut:true})
  })

})


  
app.listen(5000,()=>console.log('Listening on port 5000'))












