const gymRepository=require("../repository/gym.repository")


exports.createGym=async(userId,{name,location})=>{
    return await gymRepository.create(userId,name,location)
}


exports.joinGym=async({userId,gymId})=>{
    return await gymRepository.addMember(userId,gymId);
}