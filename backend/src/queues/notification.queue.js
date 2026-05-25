const { Queue, connection } = require("../config/bullmq");

const notificationQueue = new Queue("notifications", { connection });

module.exports = notificationQueue;