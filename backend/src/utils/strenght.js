
exports.analyzeStrength=(workout)=>{
  let totalWeight = 0;

  workout.forEach(w =>
    w.logs.forEach(l => {
      totalWeight += l.weight;
    })
  );

  if (totalWeight < 500) {
    return {
      insight: "Low training intensity",
      recommendation: "Increase weights gradually",
    };
  }

  return {
    insight: "Good training intensity",
    recommendation: "Continue progressive overload",
  };
}