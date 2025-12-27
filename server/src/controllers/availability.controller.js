import Availability from '../models/Availability.js';
import { parseAvailability } from "../services/aiParser.service.js";


export async function submitAvailability(req, res) {
  const { rawText, slots } = req.body;

  let finalSlots = slots;
  if (rawText) {
    finalSlots = await parseAvailability(rawText, req.user.timezone);
  }

  const availability = await Availability.create({
    userId: req.user._id,
    rawText,
    slots: finalSlots
  });

  res.json(availability);
}
