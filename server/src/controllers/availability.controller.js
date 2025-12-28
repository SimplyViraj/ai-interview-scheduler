import Availability from '../models/Availability.js';
import { parseAvailability } from "../services/aiParser.service.js";


export async function submitAvailability(req, res) {
  const { rawText, slots } = req.body;


  let finalSlots = slots;
  if (rawText) {
    try {
      finalSlots = await parseAvailability(rawText, req.user.timezone);
      console.log("[AVAILABILITY] Parsed for user:", req.user._id, "timezone:", req.user.timezone, "rawText:", rawText, "slots:", finalSlots);
    } catch (error) {
      console.error("AI parsing failed:", error);
      return res.status(400).json({ message: "Failed to parse availability text. Please try manual entry." });
    }
  }

  const availability = await Availability.create({
    userId: req.user._id,
    rawText,
    slots: finalSlots
  });

  res.json(availability);
}
