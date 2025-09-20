import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DrillSimulation = ({ drill, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const startDrill = () => {
    setIsRunning(true);
  };

  const nextStep = () => {
    if (currentStep < drill.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeDrill();
    }
  };

  const completeDrill = () => {
    setIsCompleted(true);
    setIsRunning(false);
    onComplete({
      drillId: drill.id,
      timeElapsed,
      stepsCompleted: drill.steps.length,
      score: calculateScore()
    });
  };

  const calculateScore = () => {
    // Simple scoring based on time and completion
    const maxTime = drill.estimatedTime * 60; // Convert to seconds
    const timeScore = Math.max(0, 100 - (timeElapsed / maxTime) * 50);
    return Math.round(timeScore);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRunning && !isCompleted) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-6xl mb-6">{drill.icon}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{drill.title}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{drill.description}</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Drill Information</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span>{drill.estimatedTime} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span>{drill.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span>Steps:</span>
                <span>{drill.steps.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={startDrill}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Start Drill
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Drill Complete!</h2>
          <p className="text-gray-600 mb-6">Great job completing the {drill.title} drill</p>
          
          <div className="bg-card rounded-lg shadow-lg p-8 max-w-md mx-auto mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Taken:</span>
                <span className="font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Steps Completed:</span>
                <span className="font-semibold">{drill.steps.length}/{drill.steps.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Score:</span>
                <span className={`font-bold text-lg ${
                  score >= 80 ? 'text-green-600' : 
                  score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {score}%
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/drills'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Drills
          </button>
        </div>
      </div>
    );
  }

  const step = drill.steps[currentStep];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{drill.title}</h2>
          <div className="text-right">
            <div className="text-sm text-gray-500">Time: {formatTime(timeElapsed)}</div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {drill.steps.length}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / drill.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{step.icon}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
          <p className="text-gray-600 text-lg">{step.description}</p>
        </div>

        {/* Animated Route Visualization */}
        <div className="mb-8">
          <div className="bg-gray-100 rounded-lg p-6 min-h-64 relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Simple building layout */}
              <div className="relative w-full h-full">
                {/* Building outline */}
                <div className="absolute inset-4 border-4 border-gray-400 rounded-lg"></div>
                
                {/* Rooms */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-blue-200 rounded border-2 border-blue-400"></div>
                <div className="absolute top-8 right-8 w-16 h-16 bg-green-200 rounded border-2 border-green-400"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-200 rounded border-2 border-yellow-400"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-red-200 rounded border-2 border-red-400"></div>
                
                {/* Animated path */}
                <motion.div
                  className="absolute w-4 h-4 bg-red-500 rounded-full"
                  initial={{ x: 20, y: 20 }}
                  animate={step.animation}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Exit */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🚪</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-3">Instructions:</h4>
          <ul className="space-y-2">
            {step.instructions.map((instruction, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {currentStep === drill.steps.length - 1 ? 'Complete Drill' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrillSimulation;
