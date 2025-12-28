import InterviewRequest from "../models/InterviewRequest.js";
import Availability from "../models/Availability.js";
import { matchSlots } from "../services/matcher.service.js";

export async function createRequest(req, res) {
  const { interviewerId, availabilityId } = req.body;

  if (!interviewerId || !availabilityId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Ensure availability belongs to candidate
  const availability = await Availability.findById(availabilityId);
  if (!availability || availability.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Invalid availability" });
  }

  const request = await InterviewRequest.create({
    candidateId: req.user._id,
    interviewerId,
    availabilityId
  });

  res.status(201).json(request);
}

export async function getRequestsForInterviewer(req, res) {
  const requests = await InterviewRequest.find({
    interviewerId: req.user._id,
    status: "pending"
  })
    .populate("candidateId", "name email")
    .populate("availabilityId");

  res.json(requests);
}

export async function markRequestMatched(req, res) {
  const { requestId } = req.body;

  const request = await InterviewRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "matched";
  await request.save();

  res.json({ message: "Request marked as matched" });
}

export async function matchRequestSlots(req, res) {
  const { requestId } = req.body;

  const request = await InterviewRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const candidateAvailability = await Availability.findById(
    request.availabilityId
  );

  const interviewerAvailability = await Availability.findOne({
    userId: request.interviewerId
  });

  if (!candidateAvailability || !interviewerAvailability) {
    return res.status(404).json({ message: "Availability missing" });
  }

  const proposedSlots = matchSlots(
    candidateAvailability.slots,
    interviewerAvailability.slots
  );

  res.json({
    requestId,
    proposedSlots
  });
}
