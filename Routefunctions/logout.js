
const logout = (req,res) =>{
   
    req.session.destroy((err)=>{
        if(err){
          console.log(err);
          return res.json({loggedOut:false});
        }
        res.json({loggedOut:true})
      })
    
}

module.exports = logout;