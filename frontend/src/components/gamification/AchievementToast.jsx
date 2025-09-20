"use client"

import { useEffect, useState } from "react"
import { Trophy, X, Star } from "lucide-react"

const AchievementToast = ({ achievement, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-card bg-opacity-20 rounded-full p-2">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4" />
              <p className="font-semibold text-sm">Achievement Unlocked!</p>
            </div>
            <h3 className="font-bold text-lg">{achievement.name}</h3>
            <p className="text-sm opacity-90">{achievement.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs bg-card bg-opacity-20 px-2 py-1 rounded-full">+{achievement.xpReward} XP</span>
              <span className="text-xs bg-card bg-opacity-20 px-2 py-1 rounded-full">{achievement.rarity}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AchievementToast
