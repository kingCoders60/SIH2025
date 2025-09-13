import React from 'react';
import { useAuth } from '../context/AuthContext';
import XPTracker from '../components/XPTracker';
import BadgeDisplay from '../components/BadgeDisplay';

const Dashboard = () => {
  const { user } = useAuth();

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <XPTracker size="large" />
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Modules Completed</h3>
          <p className="text-3xl font-bold text-purple-600">8/12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drills Completed</h3>
          <p className="text-3xl font-bold text-orange-600">5</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BadgeDisplay limit={3} showTitle={true} />
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Drills</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Fire Evacuation Drill</span>
              <span className="text-xs text-gray-500">Tomorrow 10:00 AM</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Earthquake Response</span>
              <span className="text-xs text-gray-500">Friday 2:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Classes</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drills Assigned</h3>
          <p className="text-3xl font-bold text-purple-600">24</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Class A - Fire Safety</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Class B - Earthquake</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Sarah Johnson</span>
              <span className="text-xs text-green-600">1,850 XP</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Mike Chen</span>
              <span className="text-xs text-green-600">1,720 XP</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">Emma Davis</span>
              <span className="text-xs text-green-600">1,650 XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">987</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Modules Completed</h3>
          <p className="text-3xl font-bold text-purple-600">8,456</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg. Preparedness</h3>
          <p className="text-3xl font-bold text-orange-600">87%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-2">
            <div className="flex items-center p-2 bg-red-50 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm">System maintenance required</span>
            </div>
            <div className="flex items-center p-2 bg-yellow-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm">New user registration spike</span>
            </div>
            <div className="flex items-center p-2 bg-blue-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">Drill completion rate up 15%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">North Region</span>
              <span className="text-xs text-green-600">92% Prepared</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">South Region</span>
              <span className="text-xs text-yellow-600">78% Prepared</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm">East Region</span>
              <span className="text-xs text-green-600">89% Prepared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return renderStudentDashboard();
      case 'teacher':
        return renderTeacherDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderStudentDashboard();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's your {user?.role} overview.
        </p>
      </div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
