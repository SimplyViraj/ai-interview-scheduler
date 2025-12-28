import openai from "../config/openai.js";

export async function parseAvailability(text, timezone) {
  const currentDateTime = new Date().toISOString();
  const prompt = `
You are an assistant that extracts interview availability.
The current date and time is: ${currentDateTime} (timezone: ${timezone}).

If the user says "tomorrow", "next Monday", or similar,
resolve it relative to the current date and time.
Return absolute ISO 8601 timestamps only.
Provide the availability as a JSON array of objects with "start" and "end" fields.
Return ONLY valid JSON array.
Format:
[
  { "start": "ISO8601", "end": "ISO8601" }
]

Text: "${text}"
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
