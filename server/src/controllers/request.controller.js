import InterviewRequest from "../models/InterviewRequest.js";
import Availability from "../models/Availability.js";
import Interview from "../models/Interview.js";
import { matchSlots } from "../services/matcher.service.js";
import { parseAvailability } from "../services/aiParser.service.js";

export async function createRequest(req, res) {
  const { interviewerId, availabilityId } = req.body;

  if (!interviewerId || !availabilityId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const availability = await Availability.findById(availabilityId);

  if (
    !availability ||
    availability.userId.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Invalid availability" });
  }

  const request = await InterviewRequest.create({
    candidateId: req.user._id,
    interviewerId,
    availabilityId,
    status: "pending"
  });

  res.status(201).json(request);
}

/**
 * Interviewer fetches pending requests
 */
export async function getRequestsForInterviewer(req, res) {
  const requests = await InterviewRequest.find({
    interviewerId: req.user._id,
    status: "pending"
  })
    .populate("candidateId", "name email")
    .populate("availabilityId")
    .populate("interviewerAvailabilityId");


  res.json(requests);
}

/**
 * Interviewer submits availability AFTER clicking a request
 */
export async function submitInterviewerAvailability(req, res) {
  const { requestId, rawText } = req.body;

  const request = await InterviewRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  if (request.interviewerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // 🔥 AI PARSING HAPPENS HERE
  const slots = await parseAvailability(
    rawText,
    new Date() // reference = NOW
  );

  const availability = await Availability.create({
    userId: req.user._id,
    rawText,
    slots
  });

  request.interviewerAvailabilityId = availability._id;
  await request.save();

  res.json({ message: "Interviewer availability saved" });
}


/**
 * Match slots ONLY after interviewer availability exists
 */
export async function matchRequestSlots(req, res) {
  const { requestId } = req.body;

  const request = await InterviewRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  if (!request.interviewerAvailabilityId) {
    return res.status(400).json({
      message: "Interviewer availability not submitted yet"
    });
  }

  const candidateAvailability = await Availability.findById(
    request.availabilityId
  );

  const interviewerAvailability = await Availability.findById(
    request.interviewerAvailabilityId
  );

  if (!candidateAvailability || !interviewerAvailability) {
    return res.status(404).json({ message: "Availability missing" });
  }

  const proposedSlots = matchSlots(
    candidateAvailability.slots,
    interviewerAvailability.slots
  );

  const interview = await Interview.create({
    candidateId: request.candidateId,
    interviewerId: request.interviewerId,
    proposedSlots,
    status: "proposed"
  });

  request.status = "matched";
  await request.save();

  res.json({
    interviewId: interview._id,
    proposedSlots
  });
}
export async function getRequestsForCandidate(req, res) {
  const requests = await InterviewRequest.find({
    candidateId: req.user._id,
    status: "pending"
  })
    .populate("interviewerId", "name email");

  res.json(requests);
}
