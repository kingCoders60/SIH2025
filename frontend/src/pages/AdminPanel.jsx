"use client"

import { useState } from "react"
import AnalyticsChart from "../components/admin/AnalyticsChart"
import UserManagement from "../components/admin/UserManagement"
import { analyticsData, systemStats, recentActivity } from "../data/adminData"
import { Users, BookOpen, TrendingUp, Activity, Settings, BarChart3, PieChart, Clock, Shield } from "lucide-react"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "system", label: "System Settings", icon: Settings },
  ]

  const statCards = [
    {
      title: "Total Users",
      value: systemStats.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Users",
      value: systemStats.activeUsers.toLocaleString(),
      change: "+8%",
      changeType: "positive",
      icon: Activity,
      color: "green",
    },
    {
      title: "Completed Sessions",
      value: systemStats.completedSessions.toLocaleString(),
      change: "+23%",
      changeType: "positive",
      icon: BookOpen,
      color: "purple",
    },
    {
      title: "Average Score",
      value: `${systemStats.averageScore}%`,
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      color: "orange",
    },
  ]

  const getStatColor = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Platform management and analytics dashboard</p>
        </div>

        {/* System Status Banner */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">System Status: Operational</h3>
              <p className="text-sm text-green-700">
                Uptime: {systemStats.systemUptime}% | All services running normally
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <span
                            className={`text-sm font-medium ${
                              stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${getStatColor(stat.color)} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart type="line" data={analyticsData.userGrowth} title="User Growth Trend" color="#3B82F6" />
              <AnalyticsChart type="pie" data={analyticsData.userRoles} title="User Distribution" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <UserManagement />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                type="bar"
                data={analyticsData.moduleCompletion}
                title="Module Completion Rates"
                color="#10B981"
              />
              <AnalyticsChart
                type="line"
                data={analyticsData.engagementTrends}
                title="User Engagement Trends"
                color="#8B5CF6"
              />
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === "system" && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Settings</h2>
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Panel</h3>
              <p className="text-gray-600">System configuration options will be available here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
