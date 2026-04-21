const aiService=require("../services/ai.service")
exports.getInsights=async(req,res)=>{
    try {
        const{gymId}=req.params;
        const userId=req.user.id;
        const data=await aiService.getInsights(gymId,userId);
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}