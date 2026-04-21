 exports.analyzeConsistency=(workout)=>{
      if (workout.length < 3) {
    return {
      insight: "Low workout consistency",
      recommendation: "Increase training frequency",
    };
  }

  return {
    insight: "Good workout consistency",
    recommendation: "Maintain routine",
  };
 }