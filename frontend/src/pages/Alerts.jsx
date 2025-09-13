import React from 'react';

const Alerts = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Emergency Alerts</h1>
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">High Priority Alert</h3>
              <p className="text-sm text-red-700">Fire drill scheduled for tomorrow at 10:00 AM</p>
              <p className="text-xs text-red-600 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Medium Priority Alert</h3>
              <p className="text-sm text-yellow-700">New earthquake preparedness module available</p>
              <p className="text-xs text-yellow-600 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Information Alert</h3>
              <p className="text-sm text-blue-700">System maintenance scheduled for this weekend</p>
              <p className="text-xs text-blue-600 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
