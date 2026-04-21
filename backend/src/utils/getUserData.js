const prisma=require("../config/db")

exports.getUserData=async(gymId,userId)=>{
    const progress=await prisma.progressLog.findMany({
        where:{
            userId,
            gymId
        },
        orderBy:{createdAt:"asc"}
    })

    const workout=await prisma.workout.findMany({
        where:{
            userId,
            gymId
        },
        include:{
            logs:{
                include:{exercise:true}
            }
        }
    })

    return {progress,workout}
}