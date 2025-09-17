"use client";

import { useAuth } from "../../context/AuthContext";
import StatCard from "./StatCard";
import ProgressCard from "./ProgressCard";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import { BookOpen, Target, Award, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Modules Completed",
      value: user?.stats?.modulesCompleted || 3,
      change: "+2 this week",
      changeType: "increase",
      icon: BookOpen,
      color: "primary",
    },
    {
      title: "Drills Participated",
      value: user?.stats?.drillsParticipated || 5,
      change: "+1 this week",
      changeType: "increase",
      icon: Target,
      color: "success",
    },
    {
      title: "Total XP",
      value: user?.stats?.totalXP || 450,
      change: "+120 this week",
      changeType: "increase",
      icon: TrendingUp,
      color: "warning",
    },
    {
      title: "Badges Earned",
      value: user?.stats?.badges?.length || 2,
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100">
          You're currently Level {user?.stats?.level || 1} with{" "}
          {user?.stats?.totalXP || 450} XP. Keep learning to level up!
        </p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((user?.stats?.totalXP || 450) % 500) / 5}%`,
            }}></div>
        </div>
        <p className="text-sm text-primary-100 mt-2">
          {500 - ((user?.stats?.totalXP || 450) % 500)} XP to next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentModules.map((module, index) => (
                <ProgressCard
                  key={index}
                  {...module}
                  onClick={() =>
                    console.log(`Navigate to module: ${module.title}`)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions userRole="student" />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
