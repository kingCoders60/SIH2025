"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import ModuleCard from "../components/modules/ModuleCard"
import ModuleViewer from "../components/modules/ModuleViewer"
import { mockModules } from "../data/mockModules"
import { Search, BookOpen, Clock, Star } from "lucide-react"

const Modules = () => {
  const { user, updateUserStats } = useAuth()
  const [selectedModule, setSelectedModule] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [filterRegion, setFilterRegion] = useState("all")

  const handleModuleStart = (module) => {
    setSelectedModule(module)
  }

  const handleModuleComplete = (completionData) => {
    // Update user stats
    updateUserStats({
      modulesCompleted: (user?.stats?.modulesCompleted || 0) + 1,
      totalXP: (user?.stats?.totalXP || 0) + completionData.xpEarned,
    })

    // Close module viewer
    setSelectedModule(null)
  }

  const filteredModules = mockModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = filterDifficulty === "all" || module.difficulty === filterDifficulty
    const matchesRegion = filterRegion === "all" || module.regions.includes(filterRegion)

    return matchesSearch && matchesDifficulty && matchesRegion
  })

  if (selectedModule) {
    return (
      <ModuleViewer module={selectedModule} onClose={() => setSelectedModule(null)} onComplete={handleModuleComplete} />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Education Modules</h1>
            <p className="text-gray-600">Interactive learning modules tailored for {user?.region} region disasters</p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{filteredModules.length} modules</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {filteredModules.reduce((total, module) => total + Number.parseInt(module.duration), 0)} min total
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Modules</p>
              <p className="text-2xl font-bold text-gray-900">{user?.stats?.modulesCompleted || 0}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Learning Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.floor(((user?.stats?.modulesCompleted || 0) * 45) / 60)}h{" "}
                {((user?.stats?.modulesCompleted || 0) * 45) % 60}m
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <ModuleCard key={module.id} module={module} onStart={handleModuleStart} />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Modules
