const router = require("express").Router();
const gymController=require("../controller/gym.controller")
const authMiddleware=require("../middleware/auth.middleware");
const gymMiddleware = require("../middleware/gym.middleware");
const roleMiddleware=require("../middleware/role.middleware")
const planController=require("../controller/plan.Controller")
const subscriptionController=require("../controller/subscription.Controller")
const exerciseController=require("../controller/exercise.controller")
const workoutController=require("../controller/workout.controller");
const progressController=require("../controller/progress.controller")
const aiController=require("../controller/ai.controller")  
const notificationController=require("../controller/notification.controller")

/**
 * @route POST /api/gym/ - Create a new gym (Owner only)
 * @description Creates a new gym with the provided details. The user creating the gym will be assigned the role of "OWNER".
 * @access Private (Requires authentication)
 */
router.post("/",authMiddleware,gymController.createGym);

/**
 * @route POST /api/gym/:gymId/join - Join a gym (Member only)
 * @description Allows a user to join a gym as a member. The user will be assigned the role of "MEMBER" in the gym.
 * @access Private (Requires authentication)
 */
router.post("/:gymId/join",authMiddleware,gymController.joinGym);

/**
 * @route POST /api/gym/:gymId/plans - Create a new plan (Owner only)
 * @description Creates a new plan for the specified gym. Only users with the "OWNER" role can create plans.
 * @access Private (Requires authentication)
 */
router.post("/:gymId/plans",authMiddleware,gymMiddleware,roleMiddleware("OWNER"),planController.createPlan)

/**
 * @route POST /api/gym/:gymId/subscribe/:planId - Subscribe to a plan (Member only)
 * @description Allows a user to subscribe to a plan. Only users with the "MEMBER" role can subscribe.
 * @access Private (Requires authentication)
 */
router.post("/:gymId/subscribe/:planId",authMiddleware,subscriptionController.subscription)

/**
 * @route POST /api/gym/:gymId/exercise - Add a new exercise (Owner and Trainer only)
 * @description Adds a new exercise to the specified gym. Only users with the "OWNER" or "TRAINER" role can add exercises.
 * @access Private (Requires authentication)
 */

router.post("/exercise/:gymId",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER"),exerciseController.exercise)

/**
 * @route POST /api/gym/:gymId/workout - Create a new workout (Owner, Trainer, and Member)
 * @description Creates a new workout for the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can create workouts.
 * @access Private (Requires authentication)
 */

router.post("/:gymId/workout",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),workoutController.createWorkout)

/**
 * @route GET /api/gym/:gymId/workourts - Get all workouts for a gym (Owner, Trainer, and Member)
 * @description Gets all workouts for the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can view workouts.
 * @access Private (Requires authentication)
 */

router.get("/:gymId/workourts",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),workoutController.getWorkouts)

/**
 * @route POST /api/gym/:gymId/progress - Add progress for a user (Owner, Trainer, and Member)
 * @description Adds progress for a user in the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can add progress.
 * @access Private (Requires authentication)
 */

router.post("/:gymId/progress",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.addProgress)

/**
 * @route GET /api/gym/:gymId/getProgress - Get progress for a user (Owner, Trainer, and Member)
 * @description Gets progress for a user in the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can view progress.
 * @access Private (Requires authentication)
 */

router.get("/:gymId/getProgress",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.getProgress);

/**
 * @route GET /api/gym/:gymId/weightTrend - Get weight trend for a user (Owner, Trainer, and Member)
 * @description Gets the weight trend for a user in the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can view the weight trend.
 * @access Private (Requires authentication)
 */

router.get("/:gymId/weightTrend",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.getWeightTrend);

/**
 * @route GET /api/gym/:gymId/insights - Get insights for a gym (Owner, Trainer, and Member)
 * @description Gets insights for the specified gym. Only users with the "OWNER", "TRAINER", or "MEMBER" role can view insights.
 * @access Private (Requires authentication)
 */

router.get("/:gymId/insights",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),aiController.getInsights);

/**
 * @route GET /api/gym/notifications - Get notifications for the authenticated user
 * @description Gets all notifications for the authenticated user. Only authenticated users can access their notifications.
 * @access Private (Requires authentication)
 */
router.get("/me", authMiddleware, notificationController.getNotifications);

/**
 * @route PATCH /api/gym/notifications/:notificationId/read - Mark a notification as read
 * @description Marks a specific notification as read for the authenticated user. Only the owner of the notification can mark it as read.
 * @access Private (Requires authentication)
 */

router.patch(
  "/:notificationId/read",
  authMiddleware,
  notificationController.markAsRead
);


module.exports=router