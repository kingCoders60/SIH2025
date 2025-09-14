import { Trophy, Award, Star, Shield, Target, Zap } from "lucide-react"

const BadgeCard = ({ badge, earned = false, progress = 0 }) => {
  const getBadgeIcon = (type) => {
    const icons = {
      completion: Trophy,
      streak: Zap,
      perfect: Star,
      safety: Shield,
      participation: Award,
      mastery: Target,
    }
    const Icon = icons[type] || Trophy
    return <Icon className="w-8 h-8" />
  }

  const getBadgeColor = (rarity) => {
    const colors = {
      common: "from-gray-400 to-gray-600",
      rare: "from-blue-400 to-blue-600",
      epic: "from-purple-400 to-purple-600",
      legendary: "from-yellow-400 to-yellow-600",
    }
    return colors[rarity] || colors.common
  }

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        earned
          ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg"
          : "border-gray-200 bg-gray-50 opacity-60"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`p-3 rounded-full bg-gradient-to-br ${getBadgeColor(badge.rarity)} ${
            earned ? "text-white" : "text-gray-400"
          }`}
        >
          {getBadgeIcon(badge.type)}
        </div>

        <div>
          <h3 className={`font-semibold ${earned ? "text-gray-900" : "text-gray-500"}`}>{badge.name}</h3>
          <p className={`text-sm ${earned ? "text-gray-600" : "text-gray-400"}`}>{badge.description}</p>
        </div>

        {!earned && progress > 0 && (
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {earned && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
            <Trophy className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}

export default BadgeCard
