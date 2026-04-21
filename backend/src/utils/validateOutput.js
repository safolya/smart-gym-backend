

exports.validateAIOutput =(data) => {
     if (!data) return false;

  if (!Array.isArray(data.insights)) return false;
  if (!Array.isArray(data.recommendations)) return false;

  return true;
}