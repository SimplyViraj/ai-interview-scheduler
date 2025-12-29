import openai from "../config/openai.js";

export async function parseAvailability(text, timezone) {
  const currentDateTime = new Date().toISOString();
  const prompt = `
You are an assistant that extracts interview availability.

Current date and time: ${currentDateTime}
Timezone: ${timezone}

Rules:
- Resolve relative dates (tomorrow, next Monday, next week, etc.)
- Expand recurrences into multiple slots if needed
- Return absolute ISO 8601 timestamps
- Return ONLY a JSON array
- No explanations, no markdown

Format:
[
  { "start": "ISO8601", "end": "ISO8601" }
]

Text:
"${text}"
`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    try {
      return JSON.parse(res.choices[0].message.content);
    } catch (error) {
      console.error("Invalid JSON from AI:", res.choices[0].message.content);
      throw new Error("AI returned invalid JSON");
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to parse availability with AI");
  }
}
