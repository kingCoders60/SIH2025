export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const calculateProgress = (completed, total) => {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export const getScoreColor = (score) => {
  if (score >= 90) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}
