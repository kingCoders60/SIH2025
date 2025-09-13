import React, { useState, useEffect } from 'react';
import { modulesAPI } from '../services/api';
import ModuleCard from '../components/ModuleCard';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockModules = [
        {
          id: '1',
          title: 'Fire Safety Fundamentals',
          description: 'Learn essential fire safety procedures, prevention tips, and evacuation protocols to protect yourself and others.',
          category: 'Fire Safety',
          icon: '🔥',
          duration: '45 min',
          difficulty: 'Beginner',
          progress: 60
        },
        {
          id: '2',
          title: 'Earthquake Preparedness',
          description: 'Understand earthquake safety measures, response protocols, and how to prepare for seismic events.',
          category: 'Earthquake',
          icon: '🌍',
          duration: '35 min',
          difficulty: 'Intermediate',
          progress: 100
        },
        {
          id: '3',
          title: 'Flood Response & Safety',
          description: 'Master flood safety procedures, evacuation routes, and emergency response during flooding events.',
          category: 'Flood',
          icon: '🌊',
          duration: '40 min',
          difficulty: 'Beginner',
          progress: 30
        },
        {
          id: '4',
          title: 'Hurricane Preparedness',
          description: 'Learn how to prepare for hurricanes, secure your property, and stay safe during severe weather.',
          category: 'Hurricane',
          icon: '🌀',
          duration: '50 min',
          difficulty: 'Intermediate',
          progress: 0
        },
        {
          id: '5',
          title: 'Emergency Communication',
          description: 'Master emergency communication protocols, radio usage, and coordination during disasters.',
          category: 'Communication',
          icon: '📡',
          duration: '30 min',
          difficulty: 'Advanced',
          progress: 80
        },
        {
          id: '6',
          title: 'First Aid & Medical Response',
          description: 'Essential first aid skills, medical emergency response, and triage procedures for disaster situations.',
          category: 'Medical',
          icon: '🏥',
          duration: '60 min',
          difficulty: 'Advanced',
          progress: 45
        }
      ];
      setModules(mockModules);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Fire Safety', 'Earthquake', 'Flood', 'Hurricane', 'Communication', 'Medical'];
  
  const filteredModules = filter === 'all' 
    ? modules 
    : modules.filter(module => module.category === filter);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disaster Education Modules</h1>
        <p className="text-gray-600">Learn essential disaster preparedness skills through interactive modules</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Modules' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-600">Try selecting a different category or check back later for new content.</p>
        </div>
      )}

      {/* Progress Summary */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {modules.filter(m => m.progress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {modules.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {modules.filter(m => m.progress === 0).length}
            </div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
