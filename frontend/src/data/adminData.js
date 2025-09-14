export const analyticsData = {
  userGrowth: [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "Mar", value: 240 },
    { name: "Apr", value: 320 },
    { name: "May", value: 450 },
    { name: "Jun", value: 580 },
  ],
  moduleCompletion: [
    { name: "Earthquake Safety", value: 85 },
    { name: "Fire Safety", value: 72 },
    { name: "Flood Response", value: 68 },
    { name: "First Aid", value: 91 },
    { name: "Emergency Planning", value: 76 },
  ],
  userRoles: [
    { name: "Students", value: 450 },
    { name: "Teachers", value: 45 },
    { name: "Admins", value: 8 },
  ],
  engagementTrends: [
    { name: "Week 1", value: 65 },
    { name: "Week 2", value: 72 },
    { name: "Week 3", value: 68 },
    { name: "Week 4", value: 78 },
    { name: "Week 5", value: 82 },
    { name: "Week 6", value: 85 },
  ],
}

export const systemStats = {
  totalUsers: 503,
  activeUsers: 387,
  totalModules: 24,
  completedSessions: 1247,
  averageScore: 78.5,
  systemUptime: 99.8,
}

export const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    user: "John Doe",
    action: "registered as a student",
    timestamp: "2 minutes ago",
    icon: "👤",
  },
  {
    id: 2,
    type: "module_completion",
    user: "Sarah Johnson",
    action: "completed Earthquake Safety module",
    timestamp: "15 minutes ago",
    icon: "📚",
  },
  {
    id: 3,
    type: "drill_participation",
    user: "Mike Chen",
    action: "participated in fire drill simulation",
    timestamp: "1 hour ago",
    icon: "🚨",
  },
  {
    id: 4,
    type: "badge_earned",
    user: "Emily Rodriguez",
    action: "earned Safety Expert badge",
    timestamp: "2 hours ago",
    icon: "🏆",
  },
  {
    id: 5,
    type: "alert_sent",
    user: "System",
    action: "sent weather warning alert",
    timestamp: "3 hours ago",
    icon: "⚠️",
  },
]
