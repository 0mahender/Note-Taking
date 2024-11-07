const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded=jwt.verify(token,"jerry")
            if(decoded){
             
            

               req.body.userId=decoded.userId
               req.body.user=decoded.user
                next()
            }
            else{
                res.json({msg:'Not authorized!'})
            }
        } catch (error) {
            res.json({msg:error.message})
        }
    }else{
        res.json({msg:"Please Login!"})
    }
}
module.exports={
    auth
}