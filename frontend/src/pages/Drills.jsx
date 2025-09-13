import React, { useState, useEffect } from 'react';
import { drillsAPI } from '../services/api';
import DrillSimulation from '../components/DrillSimulation';

const Drills = () => {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrill, setSelectedDrill] = useState(null);

  useEffect(() => {
    fetchDrills();
  }, []);

  const fetchDrills = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockDrills = [
        {
          id: '1',
          title: 'Fire Evacuation Drill',
          description: 'Practice fire evacuation procedures in a virtual environment. Learn proper exit routes and safety protocols.',
          icon: '🔥',
          difficulty: 'Beginner',
          estimatedTime: 15,
          category: 'Fire Safety',
          steps: [
            {
              title: 'Alert Detection',
              description: 'Recognize fire alarm and assess the situation',
              icon: '🚨',
              instructions: [
                'Listen for fire alarm sound',
                'Check for smoke or fire signs',
                'Stay calm and alert others'
              ],
              animation: { x: 20, y: 20 }
            },
            {
              title: 'Exit Planning',
              description: 'Identify the nearest safe exit route',
              icon: '🚪',
              instructions: [
                'Locate nearest emergency exit',
                'Check if exit is clear of smoke',
                'Have alternative route ready'
              ],
              animation: { x: 100, y: 20 }
            },
            {
              title: 'Evacuation',
              description: 'Follow evacuation procedures safely',
              icon: '🏃',
              instructions: [
                'Walk, do not run',
                'Stay low if there is smoke',
                'Close doors behind you',
                'Do not use elevators'
              ],
              animation: { x: 200, y: 100 }
            },
            {
              title: 'Assembly Point',
              description: 'Reach designated assembly point',
              icon: '📍',
              instructions: [
                'Go to designated assembly area',
                'Account for all team members',
                'Wait for further instructions'
              ],
              animation: { x: 200, y: 200 }
            }
          ]
        },
        {
          id: '2',
          title: 'Earthquake Response Drill',
          description: 'Simulate earthquake scenarios and practice safety protocols including drop, cover, and hold procedures.',
          icon: '🌍',
          difficulty: 'Intermediate',
          estimatedTime: 20,
          category: 'Earthquake',
          steps: [
            {
              title: 'Drop',
              description: 'Drop to the ground immediately',
              icon: '⬇️',
              instructions: [
                'Drop to hands and knees',
                'Protect head and neck',
                'Stay low to the ground'
              ],
              animation: { x: 100, y: 100 }
            },
            {
              title: 'Cover',
              description: 'Take cover under sturdy furniture',
              icon: '🛡️',
              instructions: [
                'Get under a desk or table',
                'Hold on to furniture legs',
                'Cover head and neck with arms'
              ],
              animation: { x: 100, y: 100 }
            },
            {
              title: 'Hold On',
              description: 'Hold position until shaking stops',
              icon: '🤝',
              instructions: [
                'Hold on to furniture',
                'Stay in position',
                'Wait for shaking to stop'
              ],
              animation: { x: 100, y: 100 }
            }
          ]
        },
        {
          id: '3',
          title: 'Flood Evacuation Drill',
          description: 'Learn flood evacuation routes and safety measures for water-related emergencies.',
          icon: '🌊',
          difficulty: 'Beginner',
          estimatedTime: 18,
          category: 'Flood',
          steps: [
            {
              title: 'Flood Warning',
              description: 'Recognize flood warning signs',
              icon: '⚠️',
              instructions: [
                'Listen for flood warnings',
                'Check water levels',
                'Monitor weather updates'
              ],
              animation: { x: 20, y: 20 }
            },
            {
              title: 'Move to Higher Ground',
              description: 'Evacuate to higher elevation',
              icon: '⛰️',
              instructions: [
                'Move to higher floors',
                'Avoid flooded areas',
                'Take essential items only'
              ],
              animation: { x: 100, y: 50 }
            },
            {
              title: 'Safe Location',
              description: 'Reach designated safe area',
              icon: '🏠',
              instructions: [
                'Go to designated safe location',
                'Stay away from water',
                'Wait for rescue if needed'
              ],
              animation: { x: 200, y: 20 }
            }
          ]
        },
        {
          id: '4',
          title: 'Emergency Communication Drill',
          description: 'Practice emergency communication protocols and coordination procedures.',
          icon: '📡',
          difficulty: 'Advanced',
          estimatedTime: 25,
          category: 'Communication',
          steps: [
            {
              title: 'Assess Situation',
              description: 'Evaluate emergency situation',
              icon: '🔍',
              instructions: [
                'Assess the emergency',
                'Identify key information',
                'Determine communication needs'
              ],
              animation: { x: 100, y: 100 }
            },
            {
              title: 'Contact Authorities',
              description: 'Establish communication with emergency services',
              icon: '📞',
              instructions: [
                'Call emergency services',
                'Provide clear information',
                'Follow instructions given'
              ],
              animation: { x: 100, y: 100 }
            },
            {
              title: 'Coordinate Response',
              description: 'Coordinate with team members',
              icon: '👥',
              instructions: [
                'Communicate with team',
                'Assign responsibilities',
                'Maintain clear communication'
              ],
              animation: { x: 100, y: 100 }
            }
          ]
        }
      ];
      setDrills(mockDrills);
    } catch (error) {
      console.error('Error fetching drills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrillComplete = async (results) => {
    try {
      await drillsAPI.submitDrill(results.drillId, results);
      // Show success message or update UI
      setSelectedDrill(null);
      // Refresh drills to show updated progress
      fetchDrills();
    } catch (error) {
      console.error('Error submitting drill results:', error);
    }
  };

  if (selectedDrill) {
    return (
      <DrillSimulation 
        drill={selectedDrill} 
        onComplete={handleDrillComplete}
      />
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Drills</h1>
        <p className="text-gray-600">Practice emergency response procedures in a safe virtual environment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drills.map(drill => (
          <div key={drill.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <div className="text-4xl">{drill.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{drill.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{drill.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    {drill.estimatedTime} min
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">⭐</span>
                    {drill.difficulty}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📋</span>
                    {drill.steps.length} steps
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedDrill(drill)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Start Drill
            </button>
          </div>
        ))}
      </div>

      {/* Drill History */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Drill History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="font-medium">Fire Evacuation Drill</div>
                <div className="text-sm text-gray-500">Completed 2 days ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">95%</div>
              <div className="text-sm text-gray-500">12:30</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <div className="font-medium">Earthquake Response Drill</div>
                <div className="text-sm text-gray-500">Completed 1 week ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">88%</div>
              <div className="text-sm text-gray-500">18:45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drills;
