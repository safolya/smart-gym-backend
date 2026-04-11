const prisma=require("../config/db")

module.exports=async(req,res,next)=>{
  const {gymId}=req.params;

  const membership=await prisma.membership.findFirst({
    where:{
        userId:req.user.id,
        gymId:gymId
    }
  })
  if(!membership){
    return res.status(401).json({
        message:"Not a part of this gym"
    })
  }
  req.membership=membership;

  next();
}