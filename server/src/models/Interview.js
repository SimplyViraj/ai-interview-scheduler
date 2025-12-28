import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  candidateId: mongoose.Schema.Types.ObjectId,
  interviewerId: mongoose.Schema.Types.ObjectId,
  proposedSlots: [{
    start: Date,
    end: Date,
    score: Number
  }],
  confirmedSlot: {
  start: Date,
  end: Date
},

  status: { type: String, default: "proposed" }
}, { timestamps: true });

export default mongoose.model("Interview", interviewSchema);
