"use client"

import { useState } from "react"
import { BookOpen, Clock, Users, Star, ChevronRight, CheckCircle } from "lucide-react"

const ModuleCard = ({ module, onStart }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    }
    return colors[difficulty] || colors.beginner
  }

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-primary-500"
  }

  return (
    <div
      className={`bg-card rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? "shadow-lg transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onStart(module)}
    >
      {/* Module Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-600">
        <img
          src={module.image || `/placeholder.svg?height=200&width=400&query=${module.title}`}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
            {module.difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-card bg-opacity-90 rounded-full p-2">
            <BookOpen className="h-5 w-5 text-primary-600" />
          </div>
        </div>
        {module.progress > 0 && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-card bg-opacity-90 rounded-full p-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{module.progress}% Complete</span>
                {module.progress === 100 && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(module.progress)}`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{module.title}</h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{module.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{module.description}</p>

        {/* Module Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{module.enrolled} enrolled</span>
          </div>
        </div>

        {/* Region Relevance */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Relevant for regions:</p>
          <div className="flex flex-wrap gap-1">
            {module.regions.map((region) => (
              <span key={region} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {region}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
            module.progress === 100
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : module.progress > 0
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          <span>
            {module.progress === 100 ? "Review Module" : module.progress > 0 ? "Continue Learning" : "Start Module"}
          </span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default ModuleCard
