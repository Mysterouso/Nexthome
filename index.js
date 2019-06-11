const express = require('express')
const path = require('path');
const fetch = require('node-fetch')
const cors = require('cors')
const bcrypt = require('bcrypt');
const db = require('./db')
const session = require ('express-session')
const pgSession = require('connect-pg-simple')(session)
const helmet = require('helmet');
const morgan = require('morgan');

const createSchema = require('./schema')

const commentRouter = require('./Routes/Comments')

const signin = require('./Routefunctions/signin')
const register = require('./Routefunctions/register')
const renewSession = require('./Routefunctions/session')
const logout = require('./Routefunctions/logout')

const { fields, url } = require('./Constants/API');
const corsOptions= require('./Constants/Corsconfig');
const sessionConfig = require('./Constants/Sessionconfig');

const environment = process.env.NODE_ENV || 'development';

const app = express()

//Middlewares
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(session({ 
  store: new pgSession({pool:db.pool}),
  ...sessionConfig
}))
app.use(morgan('combined'));

function headers(req,res,next){
  console.log('THESE ARE THE HEADERS ',req.headers)
  next()
}

app.use(headers)

// Routed routes
app.use('/api/comments',commentRouter);


//Routes
app.post('/api',(req,res)=>{

  let body;

  if(req.body.search) body = (`search "${req.body.search}"; fields ${fields} limit 25;`);
  else if(req.body.slug) body= `fields ${fields} where slug = "${req.body.slug}";`;

  fetch(url,{
    method:'POST',
    body,
    headers: {
      'user-key': process.env.REACT_APP_API_KEY
    }
  })
  .then(resp=>resp.json())
  .then(response=>res.json(response))
  .catch(err=>res.status(400).json(err))
})

app.post('/api/signin',(req,res)=>signin(db,bcrypt,req,res))

app.post('/api/register',(req,res)=>register(db,bcrypt,req,res))

app.get('/api/session',(req,res)=>renewSession(db,req,res))

app.get('/api/logout',(req,res)=>logout(req,res))

const PORT = process.env.PORT || 5000

if(environment !== "development"){
  app.use(express.static(path.join(__dirname, 'Client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'Client','build', 'index.html'));
  });
}

  
app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT}`)
  createSchema().catch(e=>console.error(e.stack))
})












