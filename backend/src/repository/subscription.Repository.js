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

exports.createSubscription =async (data) => {
  const subscription = prisma.subscription.create({ data });

  const delayMs = data.endDate.getTime() - Date.now();

  await notificationQueue.add(
    "subscription-expiry-reminder",
    {
      userId,
      gymId,
      subscriptionId: subscription.id,
    },
    {
      delay: delayMs,
    }
  );

  return subscription;
}