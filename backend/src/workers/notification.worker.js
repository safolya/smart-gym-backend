const { Worker, connection } = require("../config/bullmq");

const worker = new Worker(
    "notifications",
    async (job) => {
        if (job.name === "subscription-expiry-reminder") {
            const { userId, gymId, subscriptionId } = job.data;

            console.log(
                `Send reminder to user ${userId} for gym ${gymId}, subscription ${subscriptionId}`
            );

            
            return { ok: true };
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
    console.error(`Job failed: ${job?.id}`, err.message);
});