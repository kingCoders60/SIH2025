import mongoose from "mongoose";
const AlertSchema = new mongoose.Schema({
  type: String,
  severity: String,
  region: String,
  message: String,
  source: String,
  timestamp: Date,
  status: { type: String, default: "Active" },
});
AlertSchema.index({ region: 1 });
AlertSchema.index({ severity: 1 });
const Alert = mongoose.model("Alert", AlertSchema);
export default Alert;
