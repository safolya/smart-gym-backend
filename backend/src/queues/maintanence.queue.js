const { Queue, connection } = require("../config/bullmq");

const maintenanceQueue = new Queue("maintenance", { connection });

module.exports = maintenanceQueue;