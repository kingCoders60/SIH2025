"use client"

import { BookOpen, Target, AlertTriangle, Users, Award, Settings } from "lucide-react"

const QuickActions = ({ userRole }) => {
  const getActionsForRole = (role) => {
    const commonActions = [
      { icon: BookOpen, label: "Browse Modules", href: "/modules", color: "bg-blue-500" },
      { icon: Target, label: "Join Drill", href: "/drills", color: "bg-green-500" },
      { icon: AlertTriangle, label: "Emergency Alerts", href: "/alerts", color: "bg-red-500" },
    ]

    const roleSpecificActions = {
      student: [
        { icon: Award, label: "View Badges", href: "/profile", color: "bg-yellow-500" },
        { icon: Users, label: "Leaderboard", href: "/leaderboard", color: "bg-purple-500" },
      ],
      teacher: [
        { icon: Users, label: "My Students", href: "/students", color: "bg-indigo-500" },
        { icon: Settings, label: "Create Drill", href: "/drills/create", color: "bg-gray-500" },
      ],
      admin: [
        { icon: Settings, label: "Admin Panel", href: "/admin", color: "bg-gray-800" },
        { icon: Users, label: "User Management", href: "/admin/users", color: "bg-indigo-500" },
      ],
    }

    return [...commonActions, ...(roleSpecificActions[role] || [])]
  }

  const actions = getActionsForRole(userRole)

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => (window.location.href = action.href)}
            >
              <div className={`p-3 rounded-full ${action.color} mb-2`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
