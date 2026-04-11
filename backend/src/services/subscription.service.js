const subscriptionRepository = require("../repository/subscription.Repository")

exports.subscription = async (userId, gymId, planId) => {
    const existing = await subscriptionRepository.findActive(userId, gymId);

    if (existing) {
        throw new Error("Already have active subscription");
    }

    const plan = await subscriptionRepository.findPlan(planId)

    if (!plan) {
        throw new Error("No Plan found")
    }

    if (plan.gymId !== gymId) {
        throw new Error("Invalid Plan for this gym");
    }

    let membership = await subscriptionRepository.findMembership(
        userId,
        gymId
    );

    if (!membership) {
        membership = await subscriptionRepository.createMembership(
            userId,
            gymId
        );
    }



    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.duration);

    return await subscriptionRepository.createSubscription({
        userId,
        gymId,
        planId,
        startDate,
        endDate,
        status: "ACTIVE"
    });

}