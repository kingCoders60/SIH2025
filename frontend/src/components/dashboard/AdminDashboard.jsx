"use client";

import { useAuth } from "../../context/AuthProvider";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";
import { Users, BookOpen, Target, AlertTriangle, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import RegionReportChart from "../RegionReportChart"; // ✅ Chart component

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: 1247,
      change: "+12% this month",
      changeType: "increase",
      icon: Users,
      color: "primary",
    },
    {
      title: "Active Modules",
      value: 24,
      change: "+3 this month",
      changeType: "increase",
      icon: BookOpen,
      color: "success",
    },
    {
      title: "Drills Completed",
      value: 156,
      change: "+8% this week",
      changeType: "increase",
      icon: Target,
      color: "warning",
    },
    {
      title: "System Alerts",
      value: 7,
      change: "-2 today",
      changeType: "decrease",
      icon: AlertTriangle,
      color: "danger",
    },
  ];

  const drillParticipationData = [
    { month: "Jan", participation: 65 },
    { month: "Feb", participation: 72 },
    { month: "Mar", participation: 68 },
    { month: "Apr", participation: 78 },
    { month: "May", participation: 85 },
    { month: "Jun", participation: 82 },
  ];

  const preparednessData = [
    { region: "North", score: 85 },
    { region: "South", score: 78 },
    { region: "East", score: 92 },
    { region: "West", score: 74 },
    { region: "Central", score: 88 },
  ];

  const recentSystemActivity = [
    {
      id: 1,
      type: "user_registration",
      title: "15 new users registered",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      type: "drill_completed",
      title: "Fire drill completed in North region",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      type: "module_updated",
      title: "Earthquake module content updated",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-300">
          System overview and management tools. Monitor platform performance and
          user engagement.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drill Participation Chart */}
        <div className="bg-card rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Drill Participation Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={drillParticipationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="participation"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Preparedness Scores by Region */}
        <div className="bg-card rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preparedness Scores by Region
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={preparednessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Region Report Chart */}
        <RegionReportChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Activity */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent System Activity
            </h2>
            <div className="space-y-4">
              {recentSystemActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
                    <Activity className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                      {new Date(activity.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
              View System Logs
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions userRole="admin" />

          {/* System Health */}
          <div className="bg-card rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="text-sm font-medium text-green-600">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm font-medium text-green-600">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response</span>
                <span className="text-sm font-medium text-green-600">Fast</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm font-medium text-yellow-600">
                  78% Used
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
