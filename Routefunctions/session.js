
const session = (db,req,res) => {
  
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
}

module.exports = session