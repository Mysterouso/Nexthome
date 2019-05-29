const express = require('express')
const db = require('../db')



const cApp = express.Router()

cApp.get('/:slug',(req,res)=>{
  
    
    const commentQuery = "SELECT comment_id,slug,comment,date,user_details.name FROM user_comments INNER JOIN user_details on user_id = id WHERE slug = $1 ORDER BY DATE DESC;"
    const parameters = [req.params.slug]
    
    db.makeQuery(parameters,commentQuery)
    .then(resp=>res.json(resp))
  
  })
  
cApp.post('/', (req,res)=>{

    if(!req.body.userID) req.body.userID = 3;

    const { userID,slug, comment} = req.body;

    const createCommentQuery = "WITH COMMENT AS (INSERT INTO user_comments(user_id,slug,comment,date) VALUES ($1,$2,$3,$4) RETURNING *) SELECT comment_id,slug,comment,date,user_details.name FROM COMMENT INNER JOIN user_details on id=user_id;";
    const parameters = [userID,slug,comment, new Date()]
    
    db.makeQuery(parameters,createCommentQuery)
    .then(resp=>res.json(resp))
})

module.exports = cApp