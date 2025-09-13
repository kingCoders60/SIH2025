import React from 'react';
import { useAuth } from '../context/AuthContext';

const XPTracker = ({ size = 'default' }) => {
  const { user } = useAuth();
  
  const xp = user?.xp || 0;
  const level = user?.level || 1;
  
  // Calculate XP needed for next level (simple formula: level * 1000)
  const xpForCurrentLevel = (level - 1) * 1000;
  const xpForNextLevel = level * 1000;
  const xpProgress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  const sizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  };

  const containerClasses = {
    small: 'p-2',
    default: 'p-3',
    large: 'p-4'
  };

  return (
    <div className={`bg-white rounded-lg shadow ${containerClasses[size]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⭐</span>
          <div>
            <div className={`font-semibold text-gray-900 ${sizeClasses[size]}`}>
              Level {level}
            </div>
            <div className={`text-gray-600 ${sizeClasses[size]}`}>
              {xp.toLocaleString()} XP
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-gray-500 ${sizeClasses[size]}`}>
            {xpForNextLevel - xp} XP to next level
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(xpProgress, 100)}%` }}
        ></div>
      </div>
      
      {size !== 'small' && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {xp - xpForCurrentLevel} / {xpForNextLevel - xpForCurrentLevel} XP
        </div>
      )}
    </div>
  );
};

export default XPTracker;
