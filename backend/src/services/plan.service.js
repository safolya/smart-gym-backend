const planRepository=require('../repository/plan.Repository')

exports.createPlan=async(gymId,{name,price,duration})=>{
   return await planRepository.plan(gymId,name,price,duration)
}