export const badges = [
  {
    id: "first_module",
    name: "First Steps",
    description: "Complete your first disaster preparedness module",
    type: "completion",
    rarity: "common",
    xpReward: 50,
    requirement: { type: "modules_completed", value: 1 },
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Score 100% on 5 different quizzes",
    type: "perfect",
    rarity: "rare",
    xpReward: 200,
    requirement: { type: "perfect_quizzes", value: 5 },
  },
  {
    id: "safety_expert",
    name: "Safety Expert",
    description: "Complete all earthquake safety modules",
    type: "mastery",
    rarity: "epic",
    xpReward: 500,
    requirement: { type: "category_mastery", value: "earthquake" },
  },
  {
    id: "drill_participant",
    name: "Drill Participant",
    description: "Participate in your first emergency drill",
    type: "participation",
    rarity: "common",
    xpReward: 75,
    requirement: { type: "drills_completed", value: 1 },
  },
  {
    id: "streak_warrior",
    name: "Streak Warrior",
    description: "Maintain a 7-day learning streak",
    type: "streak",
    rarity: "rare",
    xpReward: 300,
    requirement: { type: "daily_streak", value: 7 },
  },
  {
    id: "community_helper",
    name: "Community Helper",
    description: "Help 10 other users in the community forum",
    type: "participation",
    rarity: "epic",
    xpReward: 400,
    requirement: { type: "forum_helps", value: 10 },
  },
  {
    id: "disaster_ready",
    name: "Disaster Ready",
    description: "Complete modules for all disaster types",
    type: "mastery",
    rarity: "legendary",
    xpReward: 1000,
    requirement: { type: "all_categories", value: true },
  },
]

export const achievements = [
  {
    id: "speed_learner",
    name: "Speed Learner",
    description: "Complete a module in under 10 minutes",
    xpReward: 100,
    rarity: "rare",
  },
  {
    id: "perfect_week",
    name: "Perfect Week",
    description: "Score 100% on all quizzes for a week",
    xpReward: 250,
    rarity: "epic",
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Complete a lesson before 8 AM",
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Complete a lesson after 10 PM",
    xpReward: 50,
    rarity: "common",
  },
]

export const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    level: 15,
    xp: 12450,
    completedModules: 28,
    badges: 12,
    recentGain: 150,
    region: "California",
  },
  {
    id: 2,
    name: "Mike Chen",
    level: 14,
    xp: 11800,
    completedModules: 25,
    badges: 10,
    recentGain: 200,
    region: "Texas",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    level: 13,
    xp: 10950,
    completedModules: 22,
    badges: 9,
    recentGain: 75,
    region: "Florida",
  },
  {
    id: 4,
    name: "David Kim",
    level: 12,
    xp: 9800,
    completedModules: 20,
    badges: 8,
    recentGain: 100,
    region: "New York",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    level: 11,
    xp: 8900,
    completedModules: 18,
    badges: 7,
    recentGain: 50,
    region: "Washington",
  },
]

export const xpRewards = {
  module_completion: 100,
  quiz_perfect: 50,
  quiz_pass: 25,
  drill_participation: 75,
  daily_login: 10,
  streak_bonus: 25,
  forum_post: 15,
  forum_help: 30,
}

export const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750]

export const calculateLevel = (xp) => {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i]) {
      return i
    }
  }
  return 0
}

export const getXPToNextLevel = (level) => {
  return levelThresholds[level + 1] - levelThresholds[level] || 1000
}
