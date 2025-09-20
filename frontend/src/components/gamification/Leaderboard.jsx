"use client"

import { useState } from "react"
import { Trophy, Medal, Crown, TrendingUp, Users } from "lucide-react"

const Leaderboard = ({ users, currentUserId, timeframe = "weekly" }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</span>
    }
  }

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300"
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300"
      case 3:
        return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
      default:
        return "bg-card border-gray-200"
    }
  }

  const timeframes = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "allTime", label: "All Time" },
  ]

  return (
    <div className="bg-card rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{users.length} participants</span>
          </div>
        </div>

        <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTimeframe === tf.value
                  ? "bg-card text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {users.map((user, index) => {
            const rank = index + 1
            const isCurrentUser = user.id === currentUserId

            return (
              <div
                key={user.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${getRankBg(
                  rank,
                )} ${isCurrentUser ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
              >
                <div className="flex-shrink-0">{getRankIcon(rank)}</div>

                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className={`font-semibold truncate ${isCurrentUser ? "text-blue-600" : "text-gray-900"}`}>
                      {user.name}
                      {isCurrentUser && <span className="text-sm text-blue-500 ml-1">(You)</span>}
                    </p>
                    <span className="text-sm text-gray-500">Level {user.level}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{user.xp.toLocaleString()} XP</span>
                    <span className="text-sm text-gray-600">{user.completedModules} modules</span>
                    <span className="text-sm text-gray-600">{user.badges} badges</span>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  {user.recentGain > 0 && (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{user.recentGain}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {rank === 1 ? "Champion" : rank <= 3 ? "Top 3" : `#${rank}`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
