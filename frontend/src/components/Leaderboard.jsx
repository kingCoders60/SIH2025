import React, { useState, useEffect } from 'react';
import { gamificationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('global');
  const [timeframe, setTimeframe] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, timeframe]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockLeaderboard = [
        {
          id: '1',
          name: 'Sarah Johnson',
          xp: 2850,
          level: 8,
          avatar: 'SJ',
          role: 'student',
          region: 'North',
          class: 'Class A',
          badges: 12,
          modulesCompleted: 8,
          drillsCompleted: 15
        },
        {
          id: '2',
          name: 'Mike Chen',
          xp: 2720,
          level: 7,
          avatar: 'MC',
          role: 'student',
          region: 'South',
          class: 'Class B',
          badges: 10,
          modulesCompleted: 7,
          drillsCompleted: 12
        },
        {
          id: '3',
          name: 'Emma Davis',
          xp: 2650,
          level: 7,
          avatar: 'ED',
          role: 'student',
          region: 'East',
          class: 'Class A',
          badges: 9,
          modulesCompleted: 6,
          drillsCompleted: 14
        },
        {
          id: '4',
          name: 'Alex Rodriguez',
          xp: 2580,
          level: 6,
          avatar: 'AR',
          role: 'student',
          region: 'West',
          class: 'Class C',
          badges: 8,
          modulesCompleted: 5,
          drillsCompleted: 11
        },
        {
          id: '5',
          name: 'Lisa Wang',
          xp: 2450,
          level: 6,
          avatar: 'LW',
          role: 'student',
          region: 'North',
          class: 'Class B',
          badges: 7,
          modulesCompleted: 4,
          drillsCompleted: 10
        }
      ];
      setLeaderboard(mockLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-100 border-yellow-300';
      case 1: return 'bg-gray-100 border-gray-300';
      case 2: return 'bg-orange-100 border-orange-300';
      default: return 'bg-white border-gray-200';
    }
  };

  const currentUserRank = leaderboard.findIndex(entry => entry.id === user?.id) + 1;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you rank against other users</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="global">Global</option>
            <option value="class">Class</option>
            <option value="region">Region</option>
            <option value="role">Role</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe:</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* Current User Rank */}
      {currentUserRank > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Your Rank</h3>
              <p className="text-blue-800">
                You are ranked #{currentUserRank} with {user?.xp || 0} XP
              </p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              #{currentUserRank}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Performers
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-6 border-l-4 ${getRankColor(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-gray-700 w-8">
                      {getRankIcon(index)}
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {entry.avatar}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {entry.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Level {entry.level}</span>
                      <span>•</span>
                      <span>{entry.role}</span>
                      <span>•</span>
                      <span>{entry.region}</span>
                      {entry.class && (
                        <>
                          <span>•</span>
                          <span>{entry.class}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {entry.xp.toLocaleString()} XP
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.badges} badges • {entry.modulesCompleted} modules • {entry.drillsCompleted} drills
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Participants</h3>
          <div className="text-3xl font-bold text-blue-600">{leaderboard.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average XP</h3>
          <div className="text-3xl font-bold text-green-600">
            {Math.round(leaderboard.reduce((sum, entry) => sum + entry.xp, 0) / leaderboard.length).toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Level</h3>
          <div className="text-3xl font-bold text-purple-600">
            {Math.max(...leaderboard.map(entry => entry.level))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
