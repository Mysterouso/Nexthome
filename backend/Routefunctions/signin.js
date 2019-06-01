
const signin = (db,bcrypt,req,res) =>{

  const { email,password } = req.body;
  const findEmailQuery = "SELECT * FROM user_details WHERE email = $1;";
  const parameters = [email];

  if(!email|!password)  return res.json("Invalid form submission");
  
  if(!req.session.user) req.session.user = {};

  db.makeQuery(parameters,findEmailQuery)
  .then(data=>{
    if(data.length==0){
       res.json('Invalid email or password')
       return Promise.reject('Invalid email or password');
      }
    else{ 
      return bcrypt.compare(password,data[0].password);
    }
  })
  .then(isValid=>{
    if(isValid){
      return db.makeQuery(parameters,findEmailQuery)
    }
    else{
      res.json('Invalid email or password')
    }
  })
  .then(item=>{
    if(item){
      req.session.user.id=item[0].id; 
      req.session.user.secret_id=item[0].secret_id;
      res.json({
        user:{
          id:item[0].id, 
          name:item[0].name, 
          email:item[0].email
        }
      });
    } 
  })
  .catch(err=>console.log(err))
}


module.exports = signin;