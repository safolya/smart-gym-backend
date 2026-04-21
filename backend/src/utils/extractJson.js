
exports.extractJSON = (aIInsights) => {
    try {
        const start = aIInsights.indexOf("{");
        const end = aIInsights.lastIndexOf("}") + 1;

        if (start === -1 || end === -1) return null;

        return JSON.parse(aIInsights.slice(start, end));
    } catch (err) {
        return null;
    }
}