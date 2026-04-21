const {getUserData}=require("../utils/getUserData")
const {ruleLogic}=require("../utils/ruleLogic")
const {prepareData}=require("../utils/prepareData")
const {aiInsights}=require("../aiInsights/aiInsights")
const {extractJSON}=require("../utils/extractJson")
const {validateAIOutput}=require("../utils/validateOutput")
const {mergeInsights}=require("../utils/mergeInsights")

exports.getInsights=async(gymId,userId)=>{

    //get progress and workout data from user
    const data=await getUserData(gymId,userId);
    console.log("User data:", data);

    //using data create rule based logic
    const ruleData=await ruleLogic(data);
    console.log("Rule data:", ruleData)
    
    //using data prepare a data for ai recommendation
    const aiData=await prepareData(data);
    console.log("AI data:", aiData);

    //using aiData generating ai insights
    const aIInsights=await aiInsights(aiData);
    console.log("AI insights:", aIInsights);

    const parsed = extractJSON(aIInsights);
    console.log("parsed result:",parsed)

    let finalAI = null;

    if (validateAIOutput(parsed)) {
        finalAI = parsed;
    }

    console.log("final result:",finalAI);

    const mergeData=await mergeInsights(ruleData,finalAI)
    console.log("mergeInsights:",mergeData);

    return {ruleData,aiInsights: mergeData || {
    insights: [],
    recommendations: []
  }};
}