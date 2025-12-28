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
    interviewerAvailabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability"
    },

    status: {
      type: String,
      enum: ["pending", "matched"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("InterviewRequest", interviewRequestSchema);
