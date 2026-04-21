
exports.prepareData=(data)=>{
     return {
    weightTrend: data.progress.map(p => p.weight),
    workoutCount: data.workout.length,
    topExercises: [...new Set(
    data.workout.flatMap(w => w.logs.map(l => l.exercise.name))
  )].slice(0, 5)
  };
}