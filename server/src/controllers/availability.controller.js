import Availability from "../models/Availability.js";
import { parseAvailability } from "../services/aiParser.service.js";

export async function submitAvailability(req, res) {
  const { userId, rawText, slots, timezone } = req.body;

  let finalSlots = slots;

  if (rawText) {
    finalSlots = await parseAvailability(rawText, timezone);
  }

  const availability = await Availability.create({
    userId,
    rawText,
    slots: finalSlots
  });

  res.json(availability);
}
