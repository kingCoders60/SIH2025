import React, { useState, useEffect } from 'react';
import { gamificationAPI } from '../services/api';

const BadgeDisplay = ({ limit = null, showTitle = true }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockBadges = [
        {
          id: '1',
          name: 'First Steps',
          description: 'Complete your first module',
          icon: '👶',
          earned: true,
          earnedDate: '2024-01-15',
          rarity: 'common'
        },
        {
          id: '2',
          name: 'Fire Safety Expert',
          description: 'Complete all fire safety modules',
          icon: '🔥',
          earned: true,
          earnedDate: '2024-01-20',
          rarity: 'rare'
        },
        {
          id: '3',
          name: 'Quiz Master',
          description: 'Score 100% on 5 quizzes',
          icon: '🧠',
          earned: true,
          earnedDate: '2024-01-25',
          rarity: 'epic'
        },
        {
          id: '4',
          name: 'Drill Commander',
          description: 'Complete 10 virtual drills',
          icon: '🎯',
          earned: false,
          earnedDate: null,
          rarity: 'legendary'
        },
        {
          id: '5',
          name: 'Speed Learner',
          description: 'Complete a module in under 20 minutes',
          icon: '⚡',
          earned: true,
          earnedDate: '2024-02-01',
          rarity: 'rare'
        },
        {
          id: '6',
          name: 'Perfect Score',
          description: 'Get 100% on all quizzes in a module',
          icon: '💯',
          earned: false,
          earnedDate: null,
          rarity: 'epic'
        }
      ];
      setBadges(mockBadges);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  const displayBadges = limit ? badges.slice(0, limit) : badges;
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        {showTitle && <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges</h3>}
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Badges</h3>
          <div className="text-sm text-gray-600">
            {earnedBadges.length} / {totalBadges} earned
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayBadges.map(badge => (
          <div
            key={badge.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
              badge.earned 
                ? getRarityColor(badge.rarity) 
                : 'border-gray-200 bg-gray-100 opacity-50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {badge.name}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {badge.description}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                badge.earned 
                  ? 'bg-white text-gray-700' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {getRarityText(badge.rarity)}
              </div>
            </div>
            
            {badge.earned && (
              <div className="absolute top-2 right-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {limit && badges.length > limit && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Badges ({badges.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
