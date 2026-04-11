const gymService=require("../services/gym.service")

exports.createGym=async(req,res)=>{
  try {
    const data=await gymService.createGym(req.user.id,req.body);
    res.status(201).json({
        message:"Gym Created Successfully",
        data
    })
  } catch (error) {
    console.log(error.messgae)
    res.status(400).json({
        messgae:"Internal Server Error"
    })
  }
}



exports.joinGym=async(req,res)=>{
  try {

    const data=await gymService.joinGym(req.user.id,req.params.gymId);

    res.status(201).json({
      message:"Memeber added Successfully",
      data
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
        messgae:"Internal Server Error"
    })
  }
}