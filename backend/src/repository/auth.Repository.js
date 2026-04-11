const prisma = require("../config/db")

exports.createUser=(data)=>{
    return prisma.user.create({
        data
    })
};


exports.findByEmail=(email)=>{
    return prisma.user.findUnique({
        where:{
            email:email
        }
    })
}