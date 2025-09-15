import Score from "../models/score.model.js";

export const getUserScore = async (req, res) => {
  try {
    const score = await Score.findOne({ userId: req.params.userId });
    if (!score) return res.status(404).json({ message: "Score not found" });
    res.json(score);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching score", error: err.message });
  }
};

export const addXP = async (req, res) => {
  try {
    const { userId, xp } = req.body;
    const score = await Score.findOneAndUpdate(
      { userId },
      { $inc: { xp }, lastDrillCompleted: new Date() },
      { new: true, upsert: true }
    );
    res.json(score);
  } catch (err) {
    res.status(500).json({ message: "Error updating XP", error: err.message });
  }
};

export const assignBadge = async (req, res) => {
  try {
    const { userId, badge } = req.body;
    const score = await Score.findOneAndUpdate(
      { userId },
      { $addToSet: { badges: badge } },
      { new: true, upsert: true }
    );
    res.json(score);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning badge", error: err.message });
  }
};
