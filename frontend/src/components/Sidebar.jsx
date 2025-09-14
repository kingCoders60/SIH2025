"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LayoutDashboard, BookOpen, Target, AlertTriangle, Settings, Trophy } from "lucide-react"

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["student", "teacher", "admin"] },
    { name: "Modules", href: "/modules", icon: BookOpen, roles: ["student", "teacher", "admin"] },
    { name: "Drills", href: "/drills", icon: Target, roles: ["student", "teacher", "admin"] },
    { name: "Gamification", href: "/gamification", icon: Trophy, roles: ["student", "teacher", "admin"] },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle, roles: ["student", "teacher", "admin"] },
    { name: "Admin Panel", href: "/admin", icon: Settings, roles: ["admin"] },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(user?.role?.toLowerCase()))

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-100 text-primary-700 border-r-2 border-primary-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
