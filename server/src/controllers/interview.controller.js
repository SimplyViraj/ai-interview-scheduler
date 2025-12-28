import Interview from "../models/Interview.js";

export async function getMyInterviews(req, res) {
  const userId = req.user._id;

  const interviews = await Interview.find({
    $or: [
      { candidateId: userId },
      { interviewerId: userId }
    ]
  })
    .populate("candidateId", "name email")
    .populate("interviewerId", "name email")
    .sort({ createdAt: -1 });

  res.json(interviews);
}
