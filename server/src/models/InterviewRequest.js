import mongoose from "mongoose";

const interviewRequestSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    interviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    availabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "matched", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("InterviewRequest", interviewRequestSchema);
