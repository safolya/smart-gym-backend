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

router.post("/",authMiddleware,gymController.createGym);
router.post("/:gymId/join",authMiddleware,gymController.joinGym);
router.post("/:gymId/plans",authMiddleware,gymMiddleware,roleMiddleware("OWNER"),planController.createPlan)
router.post("/:gymId/subscribe/:planId",authMiddleware,subscriptionController.subscription)
router.post("/exercise/:gymId",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER"),exerciseController.exercise)
router.post("/:gymId/workout",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),workoutController.createWorkout)
router.get("/:gymId/workourts",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),workoutController.getWorkouts)

router.post("/:gymId/progress",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.addProgress)

router.get("/:gymId/getProgress",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.getProgress);

router.get("/:gymId/weightTrend",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),progressController.getWeightTrend);

router.get("/:gymId/insights",authMiddleware,gymMiddleware,roleMiddleware("OWNER","TRAINER","MEMBER"),aiController.getInsights);

module.exports=router