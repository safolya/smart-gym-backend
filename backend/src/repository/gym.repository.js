const prisma=require("../config/db")

exports.create=(userId,name,location)=>{
    return prisma.gym.create({
        data:{
            name,
            location,
            ownerId:userId,
            members:{
                create:{
                    userId:userId,
                    role:"OWNER"
                }
            }
        },
        include:{
            members:true
        }
    })
}


exports.addMember=(userId,gymId)=>{
    return prisma.membership.create(
        {
            data:{
                userId:userId,
                gymId:gymId,
                role:"MEMBER"
            }
        }
    )
}