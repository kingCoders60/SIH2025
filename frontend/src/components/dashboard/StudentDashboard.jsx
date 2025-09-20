"use client";

import { useAuth } from "../../context/AuthProvider";
import StatCard from "./StatCard";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import { BookOpen, Target, Award, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();

  // Define fallback values for user stats to prevent errors
  const userStats = user?.stats || {
    modulesCompleted: 3,
    drillsParticipated: 5,
    totalXP: 450,
    badges: [1, 2],
    level: 1,
  };

  const stats = [
    {
      title: "Modules Completed",
      value: userStats.modulesCompleted,
      change: "+2 this week",
      changeType: "increase",
      icon: BookOpen,
      color: "primary",
    },
    {
      title: "Drills Participated",
      value: userStats.drillsParticipated,
      change: "+1 this week",
      changeType: "increase",
      icon: Target,
      color: "success",
    },
    {
      title: "Total XP",
      value: userStats.totalXP,
      change: "+120 this week",
      changeType: "increase",
      icon: TrendingUp,
      color: "warning",
    },
    {
      title: "Badges Earned",
      value: userStats.badges?.length,
      change: "+1 this month",
      changeType: "increase",
      icon: Award,
      color: "danger",
    },
  ];

  const currentModules = [
    {
      title: "Flood Safety Preparedness",
      description:
        "Learn essential flood safety measures and evacuation procedures",
      progress: 65,
      status: "in_progress",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Fire Emergency Response",
      description:
        "Master fire safety protocols and emergency response techniques",
      progress: 100,
      status: "completed",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Earthquake Preparedness",
      description:
        "Understand earthquake safety measures and survival techniques",
      progress: 30,
      status: "in_progress",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Calculate progress to the next level
  const xpForNextLevel = 500;
  const xpIntoCurrentLevel = userStats.totalXP % xpForNextLevel;
  const progressPercentage = (xpIntoCurrentLevel / xpForNextLevel) * 100;
  const xpRemaining = xpForNextLevel - xpIntoCurrentLevel;

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-xl p-6 md:p-8 text-black">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 ">
          Welcome back, {user?.name || "Student"}!
        </h1>
        <p className="text-primary-100 text-lg">
          You're currently Level {userStats.level} with {userStats.totalXP} XP.
          Keep learning to level up!
        </p>
        <div className="mt-4 bg-card bg-opacity-30 rounded-full h-3">
          <div
            className="bg-card h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="text-sm text-primary-100 mt-2">
          {xpRemaining} XP to next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Current Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Current Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentModules.map((module, index) => (
                <ProgressCard
                  key={index}
                  {...module}
                  onClick={() => console.log(`Maps to module: ${module.title}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar for Quick Actions and Recent Activity */}
        <div className="space-y-6">
          <QuickActions userRole="student" />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
