import mongoose from 'mongoose';
const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  status: {
    type: String,
    enum: ["incomplete", "complete"],
    default: "incomplete",
  },
  score: { type: Number, default: 0 },
});

const UserProgress = mongoose.model('UserProgress',userProgressSchema);
export default UserProgress;
