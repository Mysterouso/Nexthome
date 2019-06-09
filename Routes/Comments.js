const express = require('express')
const db = require('../db')



const cApp = express.Router()

cApp.get('/:slug',(req,res)=>{
    
    const commentQuery = "SELECT comment_id,slug,comment,date,edited,user_details.name,user_details.id FROM user_comments INNER JOIN user_details on user_id = id WHERE slug = $1 ORDER BY DATE DESC;"
    const parameters = [req.params.slug]
    
    db.makeQuery(parameters,commentQuery)
    .then(resp=>res.json(resp))
  })
  
cApp.post('/', (req,res)=>{

    if(!req.body.userID) req.body.userID = 3;
    // May possible add abilit to edit/delete comment for anonymous later on
    // if(!req.session.user){ 
    //   req.session.anon={}
    //   uuid = uuidv1()
    //   req.session.anon.id = uuid
    // }
    // else uuid = null;
   const { userID,slug, comment} = req.body;

    const createCommentQuery = "WITH COMMENT AS (INSERT INTO user_comments(user_id,slug,comment,date) VALUES ($1,$2,$3,$4) RETURNING *) SELECT comment_id,slug,comment,date,user_details.name,user_details.id FROM COMMENT INNER JOIN user_details on id=user_id;";
    const parameters = [userID,slug,comment, new Date()]
    
    db.makeQuery(parameters,createCommentQuery)
    .then(resp=>res.json(resp))
})

cApp.delete('/:comment_id',(req,res)=>{
  const comment_id = req.params.comment_id
  const { id, secret_id } = req.session.user

  const checkMatchQuery = "SELECT * FROM user_comments INNER JOIN user_details on user_id = id WHERE comment_id = $1 ORDER BY DATE DESC;"
  const deleteCommentQuery = "DELETE FROM user_comments WHERE comment_id = $1"
  const parameters = [comment_id]

  db.makeQuery(parameters,checkMatchQuery)
  .then(data=>{
    if(data[0].id===id && data[0].secret_id===secret_id){
      //Delete comment here
      return db.makeQuery(parameters,deleteCommentQuery)
    } 
    else{
      res.status(401).send()
      return Promise.reject('Unauthorized')
    }
  })
  .then(response=>{res.status(204).send()})
})

cApp.patch('/:comment_id',(req,res)=>{
  
  const comment_id = req.params.comment_id;
  const { comment,date } = req.body;
  const { id, secret_id } = req.session.user;

  const checkMatchQuery = "SELECT * FROM user_comments INNER JOIN user_details on user_id = id WHERE comment_id = $1 ORDER BY DATE DESC;"
  const parameters = [comment_id]
  const updateCommentQuery = "UPDATE user_comments SET comment = $1, date = $2, edited = $3 WHERE comment_id = $4;"
  const updateParameters = [comment,date,true,comment_id]

  db.makeQuery(parameters,checkMatchQuery)
  .then(data=>{
    if(data[0].id===id && data[0].secret_id===secret_id){
      return db.makeQuery(updateParameters,updateCommentQuery)
    } 
    else{
      res.status(401).send()
      return Promise.reject('Unauthorized')
    }
  })
  .then(response=>res.status(204).send())
  .catch(err=>console.log(err))
})


module.exports = cApp