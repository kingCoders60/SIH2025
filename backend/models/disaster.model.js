import mongoose from "mongoose";
const disasterSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    region: {
      type: String,
    },
  },
  { timestamps: true }
);
const Disaster = mongoose.model("Disaster", disasterSchema);
export default Disaster;
