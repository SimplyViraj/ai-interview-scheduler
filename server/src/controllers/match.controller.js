import Availability from "../models/Availability.js";
import Interview from "../models/Interview.js";
import { matchSlots } from "../services/matcher.service.js";

export async function matchInterview(req, res) {
  const { candidateId, interviewerId } = req.body;

  if (!candidateId || !interviewerId) {
    return res.status(400).json({
      message: "candidateId and interviewerId are required"
    });
  }

  // Fetch availability
  const candidateAvailability = await Availability.findOne({ userId: candidateId });
  const interviewerAvailability = await Availability.findOne({ userId: interviewerId });

  if (!candidateAvailability || !interviewerAvailability) {
    return res.status(404).json({
      message: "Availability not found for one or both users"
    });
  }

  // Match slots
  const proposedSlots = matchSlots(
    candidateAvailability.slots,
    interviewerAvailability.slots
  );

  if (proposedSlots.length === 0) {
    return res.json({
      message: "No overlapping availability found",
      proposedSlots: []
    });
  }

  // Save interview proposal
  const interview = await Interview.create({
    candidateId,
    interviewerId,
    proposedSlots
  });

  res.json({
    interviewId: interview._id,
    proposedSlots
  });
}
