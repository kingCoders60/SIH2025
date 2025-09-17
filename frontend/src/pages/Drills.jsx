// Drills.jsx
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import DrillCard from "../components/drills/DrillCard";
import DrillSimulation from "../components/drills/DrillSimulation";
import { mockDrills } from "../data/mockDrills";
import { Target, Clock, Users, Filter, Calendar, Loader } from "lucide-react";

const Drills = () => {
  const { user, updateUserStats } = useAuth();

  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [viewingDrill, setViewingDrill] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

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
      <div className="flex justify-center items-center h-screen text-gray-500">
        <Loader className="animate-spin mr-2" /> Loading drills...
      </div>
    );
  }

  if (selectedDrill) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-7xl max-h-screen overflow-y-auto">
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
      <div className="space-y-6">
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
    <div className="space-y-6">
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="evacuation">Evacuation</option>
            <option value="shelter">Shelter-in-Place</option>
            <option value="fire">Fire Safety</option>
            <option value="medical">Medical Emergency</option>
            <option value="communication">Communication</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Drills Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.stats?.drillsParticipated || 0}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Drills</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeDrills.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Upcoming Drills
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingDrills.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
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
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No drills found
          </h3>
          <p className="text-gray-600">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Drills;
// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthProvider";
// import DrillCard from "../components/drills/DrillCard";
// import DrillSimulation from "../components/drills/DrillSimulation";
// import { mockDrills } from "../data/mockDrills";
// import { Target, Clock, Users, Filter, Calendar } from "lucide-react";

// // All state and hooks must be inside the component function
// const Drills = () => {
//   const { user, updateUserStats } = useAuth();

//   // Correct state declaration for fetching drills from API
//   const [drills, setDrills] = useState([]);

//   const [selectedDrill, setSelectedDrill] = useState(null);
//   const [viewingDrill, setViewingDrill] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterType, setFilterType] = useState("all");

//   useEffect(() => {
//     const fetchDrills = async () => {
//       try {
//         // Correctly use the 'user' variable from the context
//         const res = await axios.get(`/api/drills/user/${user._id}`);
//         // Set the state with fetched data
//         setDrills(res.data);
//       } catch (err) {
//         console.log("Some error has occurred in drill page..", err);
//         // Fallback to mock data if API call fails
//         setDrills(mockDrills);
//       }
//     };
//     // Correctly check if the user object and its _id are available
//     if (user?._id) {
//       fetchDrills();
//     } else {
//       // Use mock data if no user is available
//       setDrills(mockDrills);
//     }
//   }, [user]); // The useEffect dependency should be 'user'

//   const handleJoinDrill = (drill) => {
//     setSelectedDrill(drill);
//   };

//   const handleViewDrill = (drill) => {
//     setViewingDrill(drill);
//   };

//   const handleDrillComplete = (completionData) => {
//     // Update user stats
//     updateUserStats({
//       drillsParticipated: (user?.stats?.drillsParticipated || 0) + 1,
//       totalXP: (user?.stats?.totalXP || 0) + completionData.xpEarned,
//     });

//     // Close drill simulation
//     setSelectedDrill(null);
//   };

//   const filteredDrills = drills.filter((drill) => {
//     const matchesStatus =
//       filterStatus === "all" || drill.status === filterStatus;
//     const matchesType = filterType === "all" || drill.type === filterType;
//     return matchesStatus && matchesType;
//   });

//   const upcomingDrills = filteredDrills.filter(
//     (drill) => drill.status === "upcoming"
//   );
//   const activeDrills = filteredDrills.filter(
//     (drill) => drill.status === "active"
//   );
//   const completedDrills = filteredDrills.filter(
//     (drill) => drill.status === "completed"
//   );

//   // The rest of your JSX remains largely the same
//   if (selectedDrill) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="w-full max-w-7xl max-h-screen overflow-y-auto">
//           <DrillSimulation
//             drill={selectedDrill}
//             onComplete={handleDrillComplete}
//             onClose={() => setSelectedDrill(null)}
//           />
//         </div>
//       </div>
//     );
//   }

//   if (viewingDrill) {
//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//           <button
//             onClick={() => setViewingDrill(null)}
//             className="mb-4 text-primary-600 hover:text-primary-700">
//             ← Back to Drills
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {viewingDrill.title}
//           </h1>
//           <p className="text-gray-600 mb-4">{viewingDrill.description}</p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="flex items-center text-sm text-gray-500">
//               <Clock className="h-4 w-4 mr-2" />
//               <span>{viewingDrill.duration}</span>
//             </div>
//             <div className="flex items-center text-sm text-gray-500">
//               <Users className="h-4 w-4 mr-2" />
//               <span>{viewingDrill.participants} participants</span>
//             </div>
//             <div className="flex items-center text-sm text-gray-500">
//               <Target className="h-4 w-4 mr-2" />
//               <span className="capitalize">
//                 {viewingDrill.difficulty} difficulty
//               </span>
//             </div>
//           </div>

//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <h3 className="font-semibold text-blue-900 mb-2">
//               Drill Objectives
//             </h3>
//             <ul className="text-blue-800 text-sm space-y-1">
//               <li>• Practice emergency response procedures</li>
//               <li>• Improve reaction time and decision-making</li>
//               <li>• Build confidence in emergency situations</li>
//               <li>• Learn from realistic scenarios</li>
//             </ul>
//           </div>

//           <button
//             onClick={() => handleJoinDrill(viewingDrill)}
//             disabled={viewingDrill.status === "completed"}
//             className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
//             {viewingDrill.status === "completed"
//               ? "Drill Completed"
//               : "Start Drill Simulation"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Emergency Drills
//             </h1>
//             <p className="text-gray-600">
//               Practice emergency procedures with realistic simulations
//             </p>
//           </div>
//           <div className="flex items-center space-x-4 text-sm text-gray-500">
//             <div className="flex items-center">
//               <Target className="h-4 w-4 mr-1" />
//               <span>{filteredDrills.length} drills</span>
//             </div>
//             <div className="flex items-center">
//               <Users className="h-4 w-4 mr-1" />
//               <span>{user?.stats?.drillsParticipated || 0} completed</span>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-4 w-4 text-gray-500" />
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}>
//               <option value="all">All Status</option>
//               <option value="upcoming">Upcoming</option>
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>

//           <select
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}>
//             <option value="all">All Types</option>
//             <option value="evacuation">Evacuation</option>
//             <option value="shelter">Shelter-in-Place</option>
//             <option value="fire">Fire Safety</option>
//             <option value="medical">Medical Emergency</option>
//             <option value="communication">Communication</option>
//           </select>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">
//                 Drills Completed
//               </p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {user?.stats?.drillsParticipated || 0}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-green-50 border border-green-200">
//               <Target className="h-6 w-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Active Drills</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {activeDrills.length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
//               <Clock className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">
//                 Upcoming Drills
//               </p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {upcomingDrills.length}
//               </p>
//             </div>
//             <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
//               <Calendar className="h-6 w-6 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Average Score</p>
//               <p className="text-2xl font-bold text-gray-900">85%</p>
//             </div>
//             <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
//               <Users className="h-6 w-6 text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Active Drills */}
//       {activeDrills.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Active Drills
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {activeDrills.map((drill) => (
//               <DrillCard
//                 key={drill.id}
//                 drill={drill}
//                 onJoin={handleJoinDrill}
//                 onView={handleViewDrill}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Upcoming Drills */}
//       {upcomingDrills.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Upcoming Drills
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {upcomingDrills.map((drill) => (
//               <DrillCard
//                 key={drill.id}
//                 drill={drill}
//                 onJoin={handleJoinDrill}
//                 onView={handleViewDrill}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Completed Drills */}
//       {completedDrills.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Completed Drills
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {completedDrills.map((drill) => (
//               <DrillCard
//                 key={drill.id}
//                 drill={drill}
//                 onJoin={handleJoinDrill}
//                 onView={handleViewDrill}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {filteredDrills.length === 0 && (
//         <div className="text-center py-12">
//           <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No drills found
//           </h3>
//           <p className="text-gray-600">Try adjusting your filter criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drills;
