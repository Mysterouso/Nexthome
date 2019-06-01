
const register = (db,bcrypt,req,res) =>{

    const saltRounds = 10;
    const { name,email,password } = req.body
    const newUserQuery = "INSERT INTO user_details(name,email,password,created_at) VALUES ($1,$2,$3,$4) RETURNING *;";
    const checkAvailableQuery = "SELECT * FROM user_details WHERE email = $1;";
  
  
    if(!name|!email|!password)  return res.status(400).json("Invalid form submission");
    
    req.session.user = {}
    // Check if email is available
    db.makeQuery([email],checkAvailableQuery)
    .then(data=>{
      if(data.length>0){
        res.json('This email is not available')
        return Promise.reject('This email is not available');
       }
     else{ 
       // If so, continue registration
       return bcrypt.hash(password,saltRounds)
     }
    })  
    .then(hash => db.makeQuery([ name, email, hash, new Date()], newUserQuery))
    .then(item=>{
      req.session.user.id=item[0].id; 
      req.session.user.secret_id=item[0].secret_id
      res.json({
        user:{
          id:item[0].id, 
          name:item[0].name, 
          email:item[0].email
        }
      });
    })
    .catch(err=>console.log(err))
  
}

module.exports = register;