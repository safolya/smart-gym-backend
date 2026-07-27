const progressRepository = require("../repository/progress.repository")
const redis = require("../config/redis");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.addProgress = async (userId, gymId, data, file) => {
    console.log(gymId)

    const uploadPhoto = null;

    if (file) {
        uploadPhoto = await uploadToCloudinary(file.buffer, "smart-gym/progress");
    }
    const progress = await progressRepository.progress(
        userId, gymId,
        {
            ...data,
            photo: uploadPhoto ?
                {
                    url:
                        uploadPhoto.secure_url,

                    publicId:
                        uploadPhoto.public_id
                }
                :
                null

        }
    )
    await redis.del(
        `progress:${userId}:${gymId}`
    );
    return progress;
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