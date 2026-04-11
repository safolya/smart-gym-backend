const prisma=require("../config/db")

exports.createExercise=(gymId,name)=>{
    return prisma.exercise.create({
        data:{
            name,
            gymId
        }
    })
}