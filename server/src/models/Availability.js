import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rawText: String,
  slots: [{
    start: Date,
    end: Date
  }]
}, { timestamps: true });

export default mongoose.model("Availability", availabilitySchema);
