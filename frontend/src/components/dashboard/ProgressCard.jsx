"use client"

import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const ProgressCard = ({ title, description, progress, status, dueDate, onClick }) => {
  const statusConfig = {
    completed: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    in_progress: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    overdue: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  }

  const config = statusConfig[status] || statusConfig.in_progress
  const StatusIcon = config.icon

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className={`p-2 rounded-lg ${config.bg} ${config.border} border`}>
          <StatusIcon className={`h-5 w-5 ${config.color}`} />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {dueDate && <div className="text-sm text-gray-500">Due: {new Date(dueDate).toLocaleDateString()}</div>}
    </div>
  )
}

export default ProgressCard
