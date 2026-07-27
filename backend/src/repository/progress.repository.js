const prisma=require("../config/db")
const redis=require("../config/redis")

exports.progress=async(userId,gymId,data)=>{
    console.log(gymId,data)
    const{weight,bodyFat,notes,photo}=data
    const result=await prisma.progressLog.create({
        data:{
            userId,
            gymId,
            weight,
            bodyFat,
            notes,
            photo:
            photo
            ?
            {
                create:[
                {
                    url:photo.url,
                    publicId:photo.publicId
                }
                ]
            }
            :
            undefined
        },
        include:{
            photo:true
        }
    })
    await redis.del(`progress:${userId}:${gymId}`);
    return result;
}

exports.getProgress=async(userId,gymId)=>{
    return prisma.progressLog.findMany({
        where:{     
            userId,
            gymId
        },
        include:{

            photo:true
        },
        orderBy:{
            createdAt:"asc"
        }
    })
}   

exports.weightTrend=async(userId,gymId)=>{
    const logs= await prisma.progressLog.findMany({
        where:{
            userId,
            gymId,
        },
        orderBy:{createdAt:"asc"}
    });

    return logs.map(log => ({
    date: log.createdAt,
    weight: log.weight,
  }));
}