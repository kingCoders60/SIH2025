import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  disasterType: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, enum: ["low", "moderate", "high"], required: true },
  notes: String,
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
