// models/progress.model.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  completedModules: { type: Number, default: 0 },
  perfectQuizzes: { type: Number, default: 0 },
  drillsCompleted: { type: Number, default: 0 },
  dailyStreak: { type: Number, default: 0 },
  earnedBadges: [{ type: String }],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
