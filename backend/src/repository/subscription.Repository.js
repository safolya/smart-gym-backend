const prisma=require("../config/db")


exports.findPlan=(planId)=>{
    return prisma.plan.findUnique({where:{id:planId}})
}

exports.findActive=async(userId,gymId)=>{
    return prisma.subscription.findFirst({
        where:{
            userId,
            gymId,
            status:"ACTIVE"
        }
    })
}

exports.findMembership = (userId, gymId) => {
  return prisma.membership.findFirst({
    where: { userId, gymId },
  });
};

exports.createMembership = (userId, gymId) => {
  return prisma.membership.create({
    data: {
      userId,
      gymId,
      role: "MEMBER",
    },
  });
};

exports.createSubscription=(data)=>{
    return prisma.subscription.create({data});
}