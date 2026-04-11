const exerciseService=require("../services/exercise.service")


exports.exercise=async(req,res)=>{
   try {
    const {gymId}=req.params;
    const data=await exerciseService.exercise(gymId,req.body.name);
    res.status(201).json({
        message:"Exercise Created Successfully",
        data
    })
    
   } catch (error) {
    res.status(501).json({
        error:error.message,
        message:"Something Went wrong"
    })
   }
}