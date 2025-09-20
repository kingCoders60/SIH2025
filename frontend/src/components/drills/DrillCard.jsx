"use client"

import { useState } from "react"
import { Target, Clock, Users, MapPin, ChevronRight, Play, CheckCircle } from "lucide-react"

const DrillCard = ({ drill, onJoin, onView }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    }
    return colors[status] || colors.upcoming
  }

  const getTypeIcon = (type) => {
    const icons = {
      evacuation: "🚪",
      shelter: "🏠",
      fire: "🔥",
      medical: "🏥",
      communication: "📡",
    }
    return icons[type] || "🎯"
  }

  const canJoin = drill.status === "upcoming" || drill.status === "active"

  return (
    <div
      className={`bg-card rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? "shadow-lg transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drill Header */}
      <div className="relative h-48 bg-gradient-to-br from-green-500 to-green-600">
        <img
          src={drill.image || `/placeholder.svg?height=200&width=400&query=${drill.title} drill simulation`}
          alt={drill.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(drill.status)}`}>
            {drill.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-card bg-opacity-90 rounded-full p-2">
            <Target className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card bg-opacity-95 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getTypeIcon(drill.type)}</span>
                <span className="font-medium text-gray-800">{drill.type} Drill</span>
              </div>
              {drill.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>
          </div>
        </div>
      </div>

      {/* Drill Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{drill.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{drill.description}</p>

        {/* Drill Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {drill.scheduledTime
                ? `${new Date(drill.scheduledTime).toLocaleDateString()} at ${new Date(drill.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : `Duration: ${drill.duration}`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{drill.participants} participants</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{drill.location}</span>
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Difficulty</span>
            <span className="font-medium text-gray-900 capitalize">{drill.difficulty}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${
                drill.difficulty === "easy"
                  ? "bg-green-500 w-1/3"
                  : drill.difficulty === "medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-red-500 w-full"
              }`}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(drill)}
            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center"
          >
            <span>View Details</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
          <button
            onClick={() => canJoin && onJoin(drill)}
            disabled={!canJoin}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
              canJoin ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Play className="h-4 w-4 mr-1" />
            <span>{drill.completed ? "Completed" : canJoin ? "Join Drill" : "Unavailable"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DrillCard
