import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    xp: {
      type: Number,
      default: 0,
    },
    badges: { type: [String], default: [] },
    lastDrillCompleted: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);
export default Score;
