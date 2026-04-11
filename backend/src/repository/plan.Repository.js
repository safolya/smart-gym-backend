const prisma=require("../config/db")

exports.plan=(gymId,name,price,duration)=>{
    return prisma.plan.create({
        data:{
            gymId,
            name,
            price,
            duration
        }
    })
}