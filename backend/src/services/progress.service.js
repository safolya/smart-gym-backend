const progressRepository=require("../repository/progress.repository")

exports.addProgress=async(userId,gymId,data)=>{
    console.log(gymId)
    return await progressRepository.progress(userId,gymId,data);
}

exports.getProgress=async(userId,gymId)=>{
    return await progressRepository.getProgress(userId,gymId);
}

exports.getWeightTrend=async(userId,gymId)=>{
    return await progressRepository.weightTrend(userId,gymId);
}