"use client"
import { AlertTriangle, Info, CheckCircle, XCircle, Clock, MapPin } from "lucide-react"

const AlertCard = ({ alert, onDismiss }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-6 h-6" />
      case "high":
        return <AlertTriangle className="w-6 h-6" />
      case "medium":
        return <Info className="w-6 h-6" />
      case "low":
        return <CheckCircle className="w-6 h-6" />
      default:
        return <Info className="w-6 h-6" />
    }
  }

  const getAlertColors = (severity) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50 border-red-200",
          icon: "text-red-600",
          title: "text-red-900",
          text: "text-red-800",
          badge: "bg-red-100 text-red-800",
        }
      case "high":
        return {
          bg: "bg-orange-50 border-orange-200",
          icon: "text-orange-600",
          title: "text-orange-900",
          text: "text-orange-800",
          badge: "bg-orange-100 text-orange-800",
        }
      case "medium":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: "text-yellow-600",
          title: "text-yellow-900",
          text: "text-yellow-800",
          badge: "bg-yellow-100 text-yellow-800",
        }
      case "low":
        return {
          bg: "bg-green-50 border-green-200",
          icon: "text-green-600",
          title: "text-green-900",
          text: "text-green-800",
          badge: "bg-green-100 text-green-800",
        }
      default:
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: "text-blue-600",
          title: "text-blue-900",
          text: "text-blue-800",
          badge: "bg-blue-100 text-blue-800",
        }
    }
  }

  const colors = getAlertColors(alert.severity)
  const timeAgo = new Date(alert.timestamp).toLocaleString()

  return (
    <div className={`rounded-lg border-2 p-6 ${colors.bg} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 ${colors.icon}`}>{getAlertIcon(alert.severity)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${colors.title}`}>{alert.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
              {alert.severity.toUpperCase()}
            </span>
          </div>

          <p className={`${colors.text} mb-4`}>{alert.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-1 ${colors.text}`}>
                <Clock className="w-4 h-4" />
                <span>{timeAgo}</span>
              </div>
              {alert.location && (
                <div className={`flex items-center space-x-1 ${colors.text}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{alert.location}</span>
                </div>
              )}
            </div>

            {alert.dismissible && onDismiss && (
              <button
                onClick={() => onDismiss(alert.id)}
                className={`text-sm font-medium ${colors.text} hover:underline`}
              >
                Dismiss
              </button>
            )}
          </div>

          {alert.actions && alert.actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {alert.actions.map((action, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${colors.badge} hover:opacity-80 transition-opacity`}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AlertCard
