"use client"
import { useAuth } from "../context/AuthContext"
import StudentDashboard from "../components/dashboard/StudentDashboard"
import TeacherDashboard from "../components/dashboard/TeacherDashboard"
import AdminDashboard from "../components/dashboard/AdminDashboard"

const Dashboard = () => {
  const { user } = useAuth()

  const renderDashboard = () => {
    switch (user?.role?.toLowerCase()) {
      case "student":
        return <StudentDashboard />
      case "teacher":
        return <TeacherDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <StudentDashboard />
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderDashboard()}</div>
}

export default Dashboard
