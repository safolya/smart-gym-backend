const {deduplicateInsights}=require("./duplicateInsights")
exports.mergeInsights=(ruleData,aiData)=>{

  const normalizeAction = (str) =>
    str.toLowerCase().replace(/\s+/g, "_");

  const ruleInsights = ruleData.insights.map(i => ({
    type: "general",
    message: i,
    severity: "medium",
    source: "rule"
  }));

  const ruleRecommendations = ruleData.recommendations.map(r => ({
    action: normalizeAction(r),
    message: r,
    source: "rule"
  }));

  const aiInsights = aiData.insights.map(i => ({
    ...i,
    type: i.type || "general",
    source: "ai"
  }));

  const aiRecommendations = aiData.recommendations.map(r => ({
    action: normalizeAction(r.action),
    message: r.message,
    source: "ai"
  }));

  const insights = deduplicateInsights([
    ...ruleInsights,
    ...aiInsights
  ]);

  const recommendations = [
    ...ruleRecommendations,
    ...aiRecommendations
  ];

  return { insights, recommendations };
}