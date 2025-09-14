import { TrendingUp, TrendingDown } from "lucide-react"

const StatCard = ({ title, value, change, changeType, icon: Icon, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary-50 text-primary-600 border-primary-200",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    danger: "bg-red-50 text-red-600 border-red-200",
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

export default StatCard
