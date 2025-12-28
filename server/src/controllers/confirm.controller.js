import Interview from "../models/Interview.js";
import User from "../models/User.js";
import { sendInvite } from "../services/email.service.js";

export async function confirmInterview(req, res) {
  const { interviewId, slotIndex } = req.body;

  if (slotIndex === undefined) {
    return res.status(400).json({ message: "slotIndex required" });
  }

  const interview = await Interview.findById(interviewId);

  if (!interview) {
    return res.status(404).json({ message: "Interview not found" });
  }

  const slot = interview.proposedSlots[slotIndex];
  if (!slot) {
    return res.status(400).json({ message: "Invalid slot index" });
  }

  interview.confirmedSlot = slot;
  interview.status = "confirmed";
  await interview.save();

  // Fetch users
  const candidate = await User.findById(interview.candidateId);
  const interviewer = await User.findById(interview.interviewerId);

  // Send calendar invite to both
  await sendInvite(candidate.email, slot);
  await sendInvite(interviewer.email, slot);

  res.json({
    message: "Interview confirmed and invites sent",
    confirmedSlot: slot
  });
}
