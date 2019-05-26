const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const bcrypt = require('bcrypt');
const db = require('./db')


const saltRounds = 10;


const app = express()

app.use(cors())


app.use(express.urlencoded({extended:false}))
app.use(express.json())

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


const getCommentsQuery = "SELECT comment_id,slug,comment,date,user_details.name FROM user_comments INNER JOIN user_details on user_id = id WHERE slug = $1 ORDER BY DATE DESC;"


const getComments = (parameters,query=getCommentsQuery) => {
  return db.query(query,parameters)
  .then(res=>res.rows)
  .catch(err=>console.log("Error",err))
}

app.get('/', (req,res)=>{
    console.log(req.headers)
    res.status(200).send('hi')
})

app.post('/signin',(req,res)=>{
  
  const { email,password } = req.body

  const findEmailQuery = "SELECT * FROM user_details WHERE email = $1;"
  const parameters = [email]

  getComments(parameters,findEmailQuery)
  .then(rows=>bcrypt.compare(password,rows[0].password))
  .then(isValid=>{
    if(isValid){
      return getComments(parameters,findEmailQuery)
    }
    else{
      return res.status(400).json('Invalid username or password')
    }
  })
  .then(item=>res.json(item[0]))

  
})

app.post('/register',(req,res)=>{

  const { name,email,password } = req.body

  if(!name|!email|!password)  return res.status(400).json("Invalid form submission");
  
  const newUserQuery = "INSERT INTO user_details(name,email,password,created_at) VALUES ($1,$2,$3,$4) RETURNING *;";
  

  bcrypt.hash(password,saltRounds)
  .then(hash =>{
    const parameters = [ name, email, hash, new Date()]
    return getComments(parameters,newUserQuery)
  })
  .then(item=>res.json(item))

})

app.get('/comments/:slug',(req,res)=>{
  
  const parameters = [req.params.slug]
  
  getComments(parameters)
  .then(resp=>res.json(resp))

})

app.post('/comments', (req,res)=>{

    const { slug, comment} = req.body;
    const createCommentQuery = "WITH COMMENT AS (INSERT INTO user_comments(user_id,slug,comment,date) VALUES (3,$1,$2,$3) RETURNING *) SELECT comment_id,slug,comment,date,user_details.name FROM COMMENT INNER JOIN user_details on id=user_id;";
    const parameters = [slug,comment, new Date()]
   
    getComments(parameters,createCommentQuery)
    .then(resp=>res.json(resp))
})



app.listen(5000,()=>console.log('Listening on port 5000'))