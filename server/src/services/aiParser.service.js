import openai from "../config/openai.js";

export async function parseAvailability(text, timezone) {
  const prompt = `
You are an assistant that extracts interview availability.

Return ONLY valid JSON array.
Format:
[
  { "start": "ISO8601", "end": "ISO8601" }
]

Timezone: ${timezone}
Text: "${text}"
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(res.choices[0].message.content);
}
