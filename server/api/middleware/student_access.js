const checkAuth= require('./check_auth')
module.exports=(req, res, next)=>{
    try
    {
        if(req.userData.role_type=="student")
             next();
    }
    catch(error)
    {
     return res.status(401).json(
         {
             message:"Only student can access this route"
         }
     )
    }
 
}