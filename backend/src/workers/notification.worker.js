
require("dotenv").config();

const { Worker, connection } = require("../config/bullmq");
const notificationService = require("../services/notification.service");
const worker = new Worker(
    "notifications",
    async (job) => {
        if (job.name === "subscription-expiry-reminder") {
            const { userId, gymId, title, message } = job.data;

            await notificationService.createNotification({
                userId,
                gymId,
                title,
                message,
                type:"SUBSCRIPTION"
            })

            
            return { success:true };
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(` Notification Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
    console.error(`Notification Job failed: ${job?.id}`, err.message);
});