// controllers/gamification.controller.js
import Progress from "../models/progress.model.js";

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.id });
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserProgress = async (req, res) => {
  try {
    const { xpGain, badgeEarned, streak } = req.body;
    const progress = await Progress.findOne({ userId: req.params.id });

    if (!progress)
      return res.status(404).json({ error: "User progress not found" });

    progress.xp += xpGain || 0;
    progress.dailyStreak = streak || progress.dailyStreak;
    if (badgeEarned && !progress.earnedBadges.includes(badgeEarned)) {
      progress.earnedBadges.push(badgeEarned);
    }

    progress.level = Math.floor(progress.xp / 1000) + 1;
    progress.lastUpdated = new Date();

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
