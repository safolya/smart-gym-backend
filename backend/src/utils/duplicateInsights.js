
exports.deduplicateInsights=(insights)=>{
      const seen = new Set();

  return insights.filter(i => {
    const key = i.type + i.message.toLowerCase();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}