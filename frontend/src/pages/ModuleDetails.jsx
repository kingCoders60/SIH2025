import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modulesAPI } from '../services/api';
import QuizEngine from '../components/QuizEngine';

const ModuleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetchModule();
  }, [id]);

  const fetchModule = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockModule = {
        id: id,
        title: 'Fire Safety Fundamentals',
        description: 'Learn essential fire safety procedures and evacuation protocols.',
        category: 'Fire Safety',
        icon: '🔥',
        duration: '45 min',
        difficulty: 'Beginner',
        progress: 60,
        sections: [
          {
            id: 1,
            title: 'Introduction to Fire Safety',
            type: 'video',
            content: 'https://example.com/video1',
            duration: '5 min'
          },
          {
            id: 2,
            title: 'Fire Prevention Tips',
            type: 'text',
            content: `
              <h3>Fire Prevention Tips</h3>
              <p>Here are some essential fire prevention tips:</p>
              <ul>
                <li>Never leave cooking unattended</li>
                <li>Keep flammable materials away from heat sources</li>
                <li>Install and maintain smoke detectors</li>
                <li>Have a fire escape plan</li>
                <li>Keep fire extinguishers accessible</li>
              </ul>
            `,
            duration: '10 min'
          },
          {
            id: 3,
            title: 'Evacuation Procedures',
            type: 'video',
            content: 'https://example.com/video2',
            duration: '8 min'
          },
          {
            id: 4,
            title: 'Fire Safety Quiz',
            type: 'quiz',
            questions: [
              {
                id: 1,
                question: 'What should you do if you discover a fire?',
                options: [
                  'Try to put it out yourself',
                  'Call 911 and evacuate immediately',
                  'Hide in a closet',
                  'Continue with your normal activities'
                ],
                correct: 1,
                explanation: 'Always call 911 first and evacuate immediately. Never try to fight a fire yourself unless you are trained and it is safe to do so.'
              },
              {
                id: 2,
                question: 'How often should you test your smoke detectors?',
                options: [
                  'Once a year',
                  'Once a month',
                  'Once a week',
                  'Never'
                ],
                correct: 1,
                explanation: 'Smoke detectors should be tested monthly to ensure they are working properly.'
              },
              {
                id: 3,
                question: 'What is the most important thing in a fire emergency?',
                options: [
                  'Saving your belongings',
                  'Getting everyone out safely',
                  'Taking photos for insurance',
                  'Calling your family first'
                ],
                correct: 1,
                explanation: 'The most important thing is getting everyone out safely. Material possessions can be replaced, but lives cannot.'
              }
            ]
          }
        ]
      };
      setModule(mockModule);
    } catch (error) {
      console.error('Error fetching module:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionComplete = async (sectionId) => {
    // Update progress in backend
    try {
      await modulesAPI.updateProgress(id, { sectionId, completed: true });
      // Move to next section
      if (currentSection < module.sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        // Module completed
        setShowQuiz(true);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleQuizComplete = async (score, answers) => {
    try {
      await modulesAPI.submitQuiz(id, answers);
      // Update module progress to 100%
      setModule(prev => ({ ...prev, progress: 100 }));
      // Navigate back to modules page
      navigate('/modules');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
          <p className="text-gray-600 mb-4">The module you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  const currentSectionData = module.sections[currentSection];

  return (
    <div className="p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/modules')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Modules
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
        <p className="text-gray-600">{module.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Module Progress</h3>
            <div className="space-y-3">
              {module.sections.map((section, index) => (
                <div 
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentSection 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : index < currentSection 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                  }`}
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{section.title}</span>
                    {index < currentSection && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{section.duration}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {showQuiz ? (
              <QuizEngine 
                questions={currentSectionData.questions}
                onComplete={handleQuizComplete}
                moduleTitle={module.title}
              />
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentSectionData.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {currentSection + 1} of {module.sections.length}
                  </span>
                </div>

                {currentSectionData.type === 'video' && (
                  <div className="mb-6">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">▶️</div>
                        <p>Video: {currentSectionData.title}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Duration: {currentSectionData.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSectionData.type === 'text' && (
                  <div 
                    className="prose max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: currentSectionData.content }}
                  />
                )}

                {currentSectionData.type === 'quiz' && (
                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Ready for the Quiz?
                      </h3>
                      <p className="text-blue-800">
                        This quiz will test your understanding of the module content. 
                        You need to score at least 70% to pass.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={() => {
                      if (currentSectionData.type === 'quiz') {
                        setShowQuiz(true);
                      } else {
                        handleSectionComplete(currentSectionData.id);
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {currentSectionData.type === 'quiz' ? 'Start Quiz' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
