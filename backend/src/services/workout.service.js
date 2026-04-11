
const workoutRepository=require("../repository/workout.repository")

exports.createWorkout=async(gymId,userId,logs)=>{
    return await workoutRepository.createWorkout(gymId,userId,logs);
}

exports.getWorkouts=async(userId,gymId)=>{
    return await workoutRepository.getWorkouts(userId,gymId);
}