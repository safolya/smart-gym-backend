const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.aiInsights = async (data) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are a fitness backend system.

Analyze this data:
${JSON.stringify(data)}

STRICT RULES:
- Do NOT guess missing data
- Do NOT assume units (kg/lbs)
- Keep responses SHORT
- Return ONLY JSON
- No extra text

Format EXACTLY like this:

{
  "insights": [
    {
      "type": "string",
      "message": "string",
      "severity": "low | medium | high"
    }
  ],
  "recommendations": [
    {
      "action": "string",
      "message": "string"
    }
  ]
}
`

;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return null;
  }
}

