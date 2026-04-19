const prisma=require("../config/db")

exports.progress=async(userId,gymId,data)=>{
    console.log(gymId,data)
    const{weight,bodyFat,notes,photo}=data
    return prisma.progressLog.create({
        data:{
            userId,
            gymId,
            weight,
            bodyFat,
            notes,
            photo:{
                create:photo?.map((url) => ({ url })) || [],
            },
        },
        include:{
            photo:true
        }
    })
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