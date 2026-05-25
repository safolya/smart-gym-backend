const progressRepository = require("../repository/progress.repository")
const redis = require("../config/redis")

exports.addProgress = async (userId, gymId, data) => {
    console.log(gymId)
    return await progressRepository.progress(userId, gymId, data);
}

exports.getProgress = async (userId, gymId) => {

    // Unique cache key
    const cacheKey = `progress:${userId}:${gymId}`;

    // 1. Check Redis
    const cachedData = await redis.get(cacheKey);

    // 2. Return cached data if exists
    if (cachedData) {
        console.log("Cache hit");

        return JSON.parse(cachedData);
    }

    console.log("Database hit");

    const data = await progressRepository.getProgress(
    userId,
    gymId
  );

  // 4. Save in Redis for 1 hour
  await redis.set(
    cacheKey,
    JSON.stringify(data),
    "EX",
    3600
  );


  return data;

}

exports.getWeightTrend = async (userId, gymId) => {
    return await progressRepository.weightTrend(userId, gymId);
}