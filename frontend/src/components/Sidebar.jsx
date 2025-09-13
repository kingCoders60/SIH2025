import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Modules', href: '/modules', icon: '📚' },
    { name: 'Drills', href: '/drills', icon: '🏃' },
    { name: 'Alerts', href: '/alerts', icon: '🚨' },
    { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
    { name: 'Admin Panel', href: '/admin', icon: '⚙️', adminOnly: true },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Navigation</h2>
        {user && (
          <div className="mt-2 text-sm text-gray-300">
            <p>Role: {user.role}</p>
            <p>Level: {user.level}</p>
            <p>XP: {user.xp}</p>
          </div>
        )}
      </div>
      <nav className="mt-4">
        {filteredNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
              location.pathname === item.href ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
