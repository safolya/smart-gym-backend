const maintenanceQueue = require("../queues/maintanence.queue");

async function setupSchedulers() {
    await maintenanceQueue.upsertJobScheduler(
        "expire-subscriptions-daily",
        {
            every: 24 * 60 * 60 * 1000,
        },
        {
            name: "expire-subscriptions",
            data: {},
        }
    );
}

module.exports = setupSchedulers;