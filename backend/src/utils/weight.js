
exports.analyzeWeight=(progress)=>{
   if (progress.length < 2) return null;

  const first = progress[0].weight;
  const last = progress[progress.length - 1].weight;

  if (last === first) {
    return {
      insight: "Weight is stagnant",
      recommendation: "Adjust calorie intake",
    };
  }

  if (last > first) {
    return {
      insight: "Weight is increasing",
      recommendation: "Monitor fat gain",
    };
  }

  return {
    insight: "Weight is decreasing",
    recommendation: "Ensure muscle retention",
  };
}