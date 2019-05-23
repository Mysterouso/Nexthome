const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

require('dotenv').config()

const { Pool } = require('pg')
const connectionString = process.env.DEVELOPMENT_URI

const pool = new Pool({
  connectionString: connectionString,
})



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



const fakeComments = [
    {
        name:"hi",
        date: new Date(),
        comment:"Makes no sense"
    },
    {
        name:"bye",
        date: new Date(),
        comment:"Peacefully kept"
    },
    {
        name:"hoho",
        date:new Date(),
        comment:"Brigading the last of us"
    }

]

const getCommentsQuery = "SELECT comment_id,slug,comment,date,user_details.name FROM user_comments INNER JOIN user_details on user_id = id WHERE slug = $1 ORDER BY DATE DESC;"


const getComments = (parameters,query=getCommentsQuery) => {
  return pool.query(query,parameters)
  .then(res=>res.rows)
  .catch(err=>console.log("Error",err))
}

app.get('/', (req,res)=>{
    console.log(req.headers)
    res.status(200).send('hi')
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