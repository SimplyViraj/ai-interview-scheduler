import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",              // 🔥 REQUIRED
      required: true
    },
    interviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",              // 🔥 REQUIRED
      required: true
    },
    proposedSlots: [
      {
        start: Date,
        end: Date,
        score: Number
      }
    ],
    confirmedSlot: {
      start: Date,
      end: Date
    },
    status: {
      type: String,
      enum: ["proposed", "confirmed"],
      default: "proposed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
