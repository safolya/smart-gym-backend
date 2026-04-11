const exerciseRepository=require("../repository/exercise.repository")

exports.exercise=async(gymId,name)=>{
    return await exerciseRepository.createExercise(gymId,name);
}