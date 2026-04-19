const progressService=require("../services/progress.service")

exports.addProgress=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {gymId}=req.params;
        console.log(gymId);
        const data=await progressService.addProgress(userId,gymId,req.body);
        res.status(200).json({
            message:"Succesfull",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error:error.message,
            message:"Something went wrong"
        })
    }
}

exports.getProgress=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {gymId}=req.params;
        const data=await progressService.getProgress(userId,gymId);
        res.status(200).json({  
            message:"Succesfull",
            data
        })
    }   
        catch (error) {
        console.log(error); 
        res.status(400).json({
            error:error.message,
            message:"Something went wrong"
        })
    }
}

exports.getWeightTrend=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {gymId}=req.params;
        const data=await progressService.getWeightTrend(userId,gymId);
         res.status(200).json({  
            message:"Succesfull",
            data
        })
    } catch (error) {
        console.log(error); 
        res.status(400).json({
            error:error.message,
            message:"Something went wrong"
        })
    }
    

}