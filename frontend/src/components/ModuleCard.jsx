import React from 'react';
import { Link } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  const progressPercentage = module.progress || 0;
  const isCompleted = progressPercentage === 100;

  return (
    <Link to={`/modules/${module.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <span className="text-2xl">{module.icon || '📚'}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.category}</p>
            </div>
          </div>
          {isCompleted && (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{module.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-700 font-medium">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="mr-1">⏱️</span>
              {module.duration || '30 min'}
            </span>
            <span className="flex items-center">
              <span className="mr-1">⭐</span>
              {module.difficulty || 'Beginner'}
            </span>
          </div>
          <div className="text-sm text-blue-600 font-medium">
            {isCompleted ? 'Review' : 'Continue'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
