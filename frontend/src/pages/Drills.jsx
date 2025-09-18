// Drills.jsx
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import DrillCard from "../components/drills/DrillCard";
import DrillSimulation from "../components/drills/DrillSimulation";
import { mockDrills } from "../data/mockDrills";
import { Target, Clock, Users, Filter, Calendar, Loader, AlertCircle, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Interactive icon component
const InteractiveIcon = ({ icon: Icon, color, text, onClick, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center ${className} cursor-pointer group`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg ${color} border transition-colors duration-200 group-hover:border-opacity-70`}>
        <Icon className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110`} />
      </div>
      {text && (
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-600">{text.label}</p>
          <p className="text-2xl font-bold text-gray-900">{text.value}</p>
        </div>
      )}
    </motion.div>
  );
};

const Drills = () => {
  const { user, updateUserStats } = useAuth();

  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [viewingDrill, setViewingDrill] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const handleJoinDrill = (drill) => {
    setSelectedDrill(drill);
  };

  const handleViewDrill = (drill) => {
    setViewingDrill(drill);
  };

  const handleDrillComplete = (completionData) => {
    // Update user stats
    updateUserStats({
      drillsParticipated: (user?.stats?.drillsParticipated || 0) + 1,
      totalXP: (user?.stats?.totalXP || 0) + completionData.xpEarned,
    });

    // Close drill simulation
    setSelectedDrill(null);
  };

  useEffect(() => {
    const fetchDrills = async () => {
      try {
        const res = await axios.get(`/api/drills/user/${user._id}`);
        setDrills(res.data);
      } catch (err) {
        console.error("Failed to fetch drills from API. Using mock data.", err);
        setDrills(mockDrills);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchDrills();
    } else {
      setDrills(mockDrills);
      setLoading(false);
    }
  }, [user]);

  // Only run filter logic when data is not loading
  const filteredDrills = loading
    ? []
    : drills.filter((drill) => {
        const matchesStatus =
          filterStatus === "all" || drill.status === filterStatus;
        const matchesType = filterType === "all" || drill.type === filterType;
        return matchesStatus && matchesType;
      });

  const upcomingDrills = filteredDrills.filter(
    (drill) => drill.status === "upcoming"
  );
  const activeDrills = filteredDrills.filter(
    (drill) => drill.status === "active"
  );
  const completedDrills = filteredDrills.filter(
    (drill) => drill.status === "completed"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-gray-500">
        <Loader className="animate-spin mr-2" /> Loading drills...
      </div>
    );
  }

  if (selectedDrill) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-7xl max-h-screen overflow-y-auto bg-white">
          <DrillSimulation
            drill={selectedDrill}
            onComplete={handleDrillComplete}
            onClose={() => setSelectedDrill(null)}
          />
        </div>
      </div>
    );
  }

  if (viewingDrill) {
    return (
      <div className="space-y-6 min-h-screen bg-white px-4 py-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <button
            onClick={() => setViewingDrill(null)}
            className="mb-4 text-primary-600 hover:text-primary-700">
            ← Back to Drills
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {viewingDrill.title}
          </h1>
          <p className="text-gray-600 mb-4">{viewingDrill.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{viewingDrill.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>{viewingDrill.participants} participants</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="h-4 w-4 mr-2" />
              <span className="capitalize">
                {viewingDrill.difficulty} difficulty
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Drill Objectives
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Practice emergency response procedures</li>
              <li>• Improve reaction time and decision-making</li>
              <li>• Build confidence in emergency situations</li>
              <li>• Learn from realistic scenarios</li>
            </ul>
          </div>

          <button
            onClick={() => handleJoinDrill(viewingDrill)}
            disabled={viewingDrill.status === "completed"}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {viewingDrill.status === "completed"
              ? "Drill Completed"
              : "Start Drill Simulation"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen bg-white px-4 py-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Emergency Drills
            </h1>
            <p className="text-gray-600">
              Practice emergency procedures with realistic simulations
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              <span>{filteredDrills.length} drills</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{user?.stats?.drillsParticipated || 0} completed</span>
            </div>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Filter className="h-4 w-4 text-gray-500" />
            </motion.div>
            <motion.select
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 hover:border-primary-400"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </motion.select>
          </div>
          <motion.select
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 hover:border-primary-400"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="evacuation">Evacuation</option>
            <option value="shelter">Shelter-in-Place</option>
            <option value="fire">Fire Safety</option>
            <option value="medical">Medical Emergency</option>
            <option value="communication">Communication</option>
          </motion.select>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <InteractiveIcon
            icon={Award}
            color="bg-green-50 border-green-200"
            text={{
              label: "Drills Completed",
              value: user?.stats?.drillsParticipated || 0
            }}
            onClick={() => setFilterStatus("completed")}
            className="text-green-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <InteractiveIcon
            icon={Clock}
            color="bg-blue-50 border-blue-200"
            text={{
              label: "Active Drills",
              value: activeDrills.length
            }}
            onClick={() => setFilterStatus("active")}
            className="text-blue-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <InteractiveIcon
            icon={Calendar}
            color="bg-yellow-50 border-yellow-200"
            text={{
              label: "Upcoming Drills",
              value: upcomingDrills.length
            }}
            onClick={() => setFilterStatus("upcoming")}
            className="text-yellow-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <InteractiveIcon
            icon={Shield}
            color="bg-purple-50 border-purple-200"
            text={{
              label: "Average Score",
              value: "85%"
            }}
            className="text-purple-600"
          />
        </div>
      </motion.div>
      {activeDrills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Active Drills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDrills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                onJoin={handleJoinDrill}
                onView={handleViewDrill}
              />
            ))}
          </div>
        </div>
      )}
      {upcomingDrills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upcoming Drills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingDrills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                onJoin={handleJoinDrill}
                onView={handleViewDrill}
              />
            ))}
          </div>
        </div>
      )}
      {completedDrills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completed Drills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedDrills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                onJoin={handleJoinDrill}
                onView={handleViewDrill}
              />
            ))}
          </div>
        </div>
      )}
      {filteredDrills.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          </motion.div>
          <motion.h3 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-lg font-medium text-gray-900 mb-2"
          >
            No drills found
          </motion.h3>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Try adjusting your filter criteria
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default Drills;
