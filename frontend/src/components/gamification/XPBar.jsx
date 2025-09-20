import { Star, TrendingUp } from "lucide-react";

const XPBar = ({
  currentXP = 0,
  level = 1,
  xpToNextLevel = 1000,
  recentGain = 0,
}) => {
  const safeXP = typeof currentXP === "number" ? currentXP : 0;
  const safeLevel = typeof level === "number" ? level : 1;
  const safeXPToNext =
    typeof xpToNextLevel === "number" && xpToNextLevel > 0
      ? xpToNextLevel
      : 1000;

  const progress = (safeXP % safeXPToNext) / safeXPToNext;
  const totalXPForLevel = safeLevel * safeXPToNext;
  const xpThisLevel = safeXP % safeXPToNext;
  const xpRemaining = safeXPToNext - xpThisLevel;

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-2">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Level {safeLevel}</h3>
            <p className="text-sm text-gray-600">
              {safeXP.toLocaleString()} XP
            </p>
          </div>
        </div>

        {recentGain > 0 && (
          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+{recentGain} XP</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress to Level {safeLevel + 1}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress * 100}%` }}>
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse rounded-full" />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {xpThisLevel} / {safeXPToNext} XP
          </span>
          <span>{xpRemaining} XP to next level</span>
        </div>
      </div>
    </div>
  );
};

export default XPBar;
