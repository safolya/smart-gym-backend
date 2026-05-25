const { Worker, connection } = require("../config/bullmq");
const prisma = require("../config/db");

const worker = new Worker(
    "maintenance",
    async (job) => {
        if (job.name === "expire-subscriptions") {
            await prisma.subscription.updateMany({
                where: {
                    status: "ACTIVE",
                    endDate: { lt: new Date() },
                },
                data: {
                    status: "EXPIRED",
                },
            });

            return { ok: true };
        }
    },
    { connection }
);