const workoutService=require("../services/workout.service")


exports.createWorkout=async(req,res)=>{
    try {
        const {gymId}=req.params;
        const userId=req.user.id;
        const {logs}=req.body;
        const data=await workoutService.createWorkout(gymId,userId,logs);
        res.status(201).json({
            message:"Successfull creating workout",
            data
        })
    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:"Something went wrong"
        })
    }
}


exports.getWorkouts=async(req,res)=>{
    try {
        const {userId}=req.user.id;
        const {gymId}=req.params
        const data=await workoutService.getWorkouts(userId,gymId);
        res.status(200).json({
            message:"Wokouts Fetch done",
            data
        })
    } catch (error) {
        res.status(400).json({
            error:error.message,
            messagge:"Something Went Wrong"
        })
    }
}