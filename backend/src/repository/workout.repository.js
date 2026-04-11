const prisma = require("../config/db")

exports.createWorkout = (gymId, userId, logs) => {
    return prisma.workout.create({
        data: {
            userId,
            gymId,
            logs: {
                create: logs.map((log) => ({
                    exerciseId: log.exerciseId,
                    sets: log.sets,
                    reps: log.reps,
                    weight: log.weight,
                })),
            },
        },
        include:{
            logs:true
        }
    })
}

exports.getWorkouts=(userId,gymId)=>{
    return prisma.workout.findMany({
        where:{
            userId,
            gymId
        },
        include:{
            logs:{
                include:{
                    exercise:true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}