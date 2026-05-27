const prisma = require("../config/db")
const notificationQueue = require("../queues/notification.queue");


exports.findPlan = (planId) => {
  return prisma.plan.findUnique({ where: { id: planId } })
}

exports.findActive = async (userId, gymId) => {
  return prisma.subscription.findFirst({
    where: {
      userId,
      gymId,
      status: "ACTIVE"
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

exports.createSubscription = async (data) => {
  const subscription = await prisma.subscription.create({ data });
 console.log(data);
  // const delayMs = data.endDate.getTime() - Date.now();
  const delayMs=30000

  await notificationQueue.add(
    "subscription-expiry-reminder",
    {
      userId: data.userId,
      gymId: data.gymId,
      title: "Membership Expiring Soon",
      message: "Your gym membership will expire soon. Please renew it.",
    },
    {
      delay: delayMs,
    }
  );

  return subscription;
}