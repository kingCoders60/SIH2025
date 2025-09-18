"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import BadgeCard from "../components/gamification/BadgeCard";
import XPBar from "../components/gamification/XPBar";
import Leaderboard from "../components/gamification/Leaderboard";
import AchievementToast from "../components/gamification/AchievementToast";
import {
  badges,
  leaderboardData,
  calculateLevel,
  getXPToNextLevel,
} from "../data/gamificationData";
import { Trophy, Award, Target, TrendingUp, Star } from "lucide-react";

const Gamification = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAchievement, setShowAchievement] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`/api/gamification/${user._id}/progress`);
        setUserProgress(res.data);
      } catch (err) {
        console.error("Error fetching progress:", err.message);
      }
    };

    if (user?._id) fetchProgress();
  }, [user]);

  if (!userProgress) return <div>Loading progress...</div>;

  const level = userProgress.level;
  const xpToNextLevel = getXPToNextLevel(level);

  const checkBadgeProgress = (badge) => {
    const req = badge.requirement;
    switch (req.type) {
      case "modules_completed":
        return Math.min(userProgress.completedModules / req.value, 1);
      case "perfect_quizzes":
        return Math.min(userProgress.perfectQuizzes / req.value, 1);
      case "drills_completed":
        return Math.min(userProgress.drillsCompleted / req.value, 1);
      case "daily_streak":
        return Math.min(userProgress.dailyStreak / req.value, 1);
      default:
        return 0;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "badges", label: "Badges", icon: Award },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "achievements", label: "Achievements", icon: Star },
  ];

  const stats = [
    {
      label: "Total XP",
      value:
        typeof userProgress.xp === "number"
          ? userProgress.xp.toLocaleString()
          : "0",
      icon: Star,
      color: "blue",
    },
    {
      label: "Current Level",
      value: level ?? "N/A",
      icon: Trophy,
      color: "yellow",
    },
    {
      label: "Badges Earned",
      value: userProgress.earnedBadges?.length ?? 0,
      icon: Award,
      color: "purple",
    },
    {
      label: "Global Rank",
      value: "#47", // static or mock value
      icon: Target,
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gamification Hub
          </h1>
          <p className="text-gray-600">
            Track your progress, earn badges, and compete with others!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}>
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: "from-blue-500 to-blue-600",
                  yellow: "from-yellow-500 to-yellow-600",
                  purple: "from-purple-500 to-purple-600",
                  green: "from-green-500 to-green-600",
                };

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${
                          colorClasses[stat.color]
                        } text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* XP Progress */}
            <XPBar
              currentXP={userProgress.xp}
              level={level}
              xpToNextLevel={xpToNextLevel}
              recentGain={userProgress.recentGain || 0}
            />

            {/* Recent Badges */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.slice(0, 4).map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    earned={
                      Array.isArray(userProgress.earnedBadges) &&
                      userProgress.earnedBadges.includes(badge.id)
                    }
                    progress={checkBadgeProgress(badge)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Badge Collection
                </h2>
                <div className="text-sm text-gray-600">
                  {userProgress.earnedBadges.length} of {badges.length} earned
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    earned={userProgress.earnedBadges.includes(badge.id)}
                    progress={checkBadgeProgress(badge)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <Leaderboard users={leaderboardData} currentUserId={user?._id} />
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Achievements
            </h2>
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coming Soon!
              </h3>
              <p className="text-gray-600">
                Achievement tracking will be available in the next update.
              </p>
            </div>
          </div>
        )}

        {/* Achievement Toast */}
        {showAchievement && (
          <AchievementToast
            achievement={showAchievement}
            onClose={() => setShowAchievement(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Gamification;
