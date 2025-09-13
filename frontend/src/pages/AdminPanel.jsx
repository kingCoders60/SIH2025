import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API calls
      const mockStats = {
        totalUsers: 1234,
        activeUsers: 987,
        newUsersThisMonth: 156,
        modulesCompleted: 8456,
        drillsConducted: 2134,
        avgPreparednessScore: 87
      };

      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', joinDate: '2024-01-15', xp: 1250 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', status: 'active', joinDate: '2024-01-10', xp: 2100 },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'student', status: 'inactive', joinDate: '2024-01-20', xp: 800 },
        { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', status: 'active', joinDate: '2024-01-05', xp: 3500 },
        { id: '5', name: 'David Brown', email: 'david@example.com', role: 'student', status: 'active', joinDate: '2024-01-25', xp: 950 }
      ];

      setStats(mockStats);
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data
  const drillParticipationData = [
    { month: 'Jan', participation: 65, completion: 58 },
    { month: 'Feb', participation: 72, completion: 68 },
    { month: 'Mar', participation: 78, completion: 74 },
    { month: 'Apr', participation: 85, completion: 82 },
    { month: 'May', participation: 88, completion: 85 },
    { month: 'Jun', participation: 92, completion: 89 }
  ];

  const preparednessScoreData = [
    { name: 'Excellent (90-100%)', value: 35, color: '#10B981' },
    { name: 'Good (80-89%)', value: 28, color: '#3B82F6' },
    { name: 'Average (70-79%)', value: 22, color: '#F59E0B' },
    { name: 'Below Average (60-69%)', value: 12, color: '#EF4444' },
    { name: 'Poor (<60%)', value: 3, color: '#6B7280' }
  ];

  const regionalStatsData = [
    { region: 'North', users: 320, preparedness: 92, drills: 450 },
    { region: 'South', users: 280, preparedness: 78, drills: 320 },
    { region: 'East', users: 350, preparedness: 89, drills: 480 },
    { region: 'West', users: 284, preparedness: 85, drills: 380 }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'analytics', name: 'Drill Analytics', icon: '📈' },
    { id: 'regional', name: 'Regional Preparedness', icon: '🗺️' }
  ];

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'delete') {
        await adminAPI.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } else if (action === 'toggle-status') {
        const user = users.find(u => u.id === userId);
        const updatedUser = { ...user, status: user.status === 'active' ? 'inactive' : 'active' };
        await adminAPI.updateUser(userId, updatedUser);
        setUsers(users.map(u => u.id === userId ? updatedUser : u));
      }
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage users, view analytics, and monitor system performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Total Users</span>
                  <span className="text-blue-600 font-bold">{stats.totalUsers?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Active Users</span>
                  <span className="text-green-600 font-bold">{stats.activeUsers?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">New This Month</span>
                  <span className="text-purple-600 font-bold">{stats.newUsersThisMonth?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Modules Completed</span>
                  <span className="text-blue-600 font-bold">{stats.modulesCompleted?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Drills Conducted</span>
                  <span className="text-green-600 font-bold">{stats.drillsConducted?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Avg. Preparedness</span>
                  <span className="text-purple-600 font-bold">{stats.avgPreparednessScore}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Uptime</span>
                  <span className="text-green-600 font-bold">99.9%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Response Time</span>
                  <span className="text-blue-600 font-bold">120ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Error Rate</span>
                  <span className="text-yellow-600 font-bold">0.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.xp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUserAction(user.id, 'toggle-status')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'delete')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Drill Participation Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Drill Participation Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={drillParticipationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participation" fill="#3B82F6" name="Participation Rate (%)" />
                <Bar dataKey="completion" fill="#10B981" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Preparedness Score Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparedness Score Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={preparednessScoreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {preparednessScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'regional' && (
        <div className="space-y-6">
          {/* Regional Statistics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Preparedness Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3B82F6" name="Total Users" />
                <Bar dataKey="preparedness" fill="#10B981" name="Preparedness Score (%)" />
                <Bar dataKey="drills" fill="#F59E0B" name="Drills Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalStatsData.map(region => (
              <div key={region.region} className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{region.region} Region</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-semibold">{region.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preparedness:</span>
                    <span className={`font-semibold ${
                      region.preparedness >= 90 ? 'text-green-600' :
                      region.preparedness >= 80 ? 'text-blue-600' :
                      region.preparedness >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {region.preparedness}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Drills:</span>
                    <span className="font-semibold">{region.drills}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
