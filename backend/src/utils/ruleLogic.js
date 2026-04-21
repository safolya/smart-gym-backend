const {analyzeWeight}=require("../utils/weight")
const {analyzeConsistency}=require("../utils/consistency")
const {analyzeStrength}=require("../utils/strenght")

exports.ruleLogic = async (data) => {
    const insights = [];
    const recommendations = [];

    const weight = analyzeWeight(data.progress);
    const consistency = analyzeConsistency(data.workout);
    const strength = analyzeStrength(data.workout);

    [weight, consistency, strength].forEach(result => {
        if (result) {
            insights.push(result.insight);
            recommendations.push(result.recommendation);
        }
    });

    return { insights, recommendations };
}