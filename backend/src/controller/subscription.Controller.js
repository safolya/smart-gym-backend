const subscriptionServices=require("../services/subscription.service")

exports.subscription=async(req,res)=>{
    try {
        const { gymId, planId } = req.params;
        const userId = req.user.id;

        const subscription = await subscriptionServices.subscription(userId, gymId, planId);
        res.status(201).json(subscription);

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error occurred while subscribing to the plan" });
    }
}