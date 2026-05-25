const prisma=require("../config/db")

exports.createNotification = (data) => {
  return prisma.notification.create({
    data,
  });
};

exports.getNotificationsForUser=async(userId)=>{
    return prisma.notification.findMany({
        where:{userId},
        orderBy:{createdAt:"desc"}
    })
}

exports.markNotificationRead=async(notificationId,userId)=>{
    return prisma.notification.updateMany({
        where:{
            id:notificationId,
            userId
        },
        data:{
            isRead:true
        }
    })
}