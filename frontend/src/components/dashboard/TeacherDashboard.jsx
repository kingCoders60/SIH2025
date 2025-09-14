"use client"

import { useAuth } from "../../context/AuthContext"
import StatCard from "./StatCard"
import QuickActions from "./QuickActions"
import RecentActivity from "./RecentActivity"
import { Users, BookOpen, Target, AlertTriangle } from "lucide-react"

const TeacherDashboard = () => {
  const { user } = useAuth()

  const stats = [
    {
      title: "Students Enrolled",
      value: 28,
      change: "+3 this month",
      changeType: "increase",
      icon: Users,
      color: "primary",
    },
    {
      title: "Active Modules",
      value: 5,
      change: "+1 this week",
      changeType: "increase",
      icon: BookOpen,
      color: "success",
    },
    {
      title: "Drills Conducted",
      value: 12,
      change: "+2 this month",
      changeType: "increase",
      icon: Target,
      color: "warning",
    },
    {
      title: "Pending Alerts",
      value: 3,
      change: "-1 today",
      changeType: "decrease",
      icon: AlertTriangle,
      color: "danger",
    },
  ]

  const studentProgress = [
    { name: "Alice Johnson", progress: 85, status: "excellent", modules: 4 },
    { name: "Bob Smith", progress: 72, status: "good", modules: 3 },
    { name: "Carol Davis", progress: 45, status: "needs_attention", modules: 2 },
    { name: "David Wilson", progress: 91, status: "excellent", modules: 5 },
    { name: "Emma Brown", progress: 38, status: "needs_attention", modules: 2 },
  ]

  const getStatusColor = (status) => {
    const colors = {
      excellent: "text-green-600 bg-green-50",
      good: "text-yellow-600 bg-yellow-50",
      needs_attention: "text-red-600 bg-red-50",
    }
    return colors[status] || "text-gray-600 bg-gray-50"
  }

  const upcomingDrills = [
    {
      title: "Fire Evacuation Drill",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      participants: 25,
      type: "evacuation",
    },
    {
      title: "Earthquake Response Drill",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      participants: 30,
      type: "shelter",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
        <p className="text-green-100">You have 28 students enrolled and 3 pending alerts that need your attention.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Progress Overview</h2>
            <div className="space-y-4">
              {studentProgress.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src="/diverse-user-avatars.png" alt={student.name} className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.modules} modules completed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Students
            </button>
          </div>

          {/* Upcoming Drills */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Drills</h2>
            <div className="space-y-4">
              {upcomingDrills.map((drill, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{drill.title}</h3>
                    <p className="text-sm text-gray-500">
                      {drill.date.toLocaleDateString()} at{" "}
                      {drill.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{drill.participants} participants</p>
                    <span className="text-xs text-gray-500 capitalize">{drill.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions userRole="teacher" />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
