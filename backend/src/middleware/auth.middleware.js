const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}