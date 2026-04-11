const planService=require("../services/plan.service")


exports.createPlan=async(req,res)=>{
  try {
    const plan=await planService.createPlan(req.params.gymId,req.body);
    res.status(201).json({
        message:"Plan Created Succesfully",
        plan
    })
  } catch (error) {
    console.log(error.meessage);
    res.status(400).json({
        message:"Internal Server Error"
    })
  }
}