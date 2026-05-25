const { Queue, Worker, QueueEvents } = require("bullmq");

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
};

module.exports = { Queue, Worker, QueueEvents, connection };