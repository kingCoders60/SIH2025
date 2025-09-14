"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Target, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import EscapeRouteMap from "./EscapeRouteMap"

const DrillSimulation = ({ drill, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [responses, setResponses] = useState({})
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [score, setScore] = useState(0)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStepResponse = (response) => {
    const newResponses = {
      ...responses,
      [currentStep]: response,
    }
    setResponses(newResponses)

    // Auto-advance to next step
    if (currentStep < drill.steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 1500)
    } else {
      // Complete simulation
      setTimeout(() => {
        completeSimulation(newResponses)
      }, 1500)
    }
  }

  const completeSimulation = (finalResponses) => {
    // Calculate score based on correct responses and time
    const correctResponses = drill.steps.reduce((count, step, index) => {
      return count + (finalResponses[index] === step.correctAction ? 1 : 0)
    }, 0)

    const timeBonus = Math.max(0, 100 - timeElapsed) // Bonus points for speed
    const finalScore = Math.round(((correctResponses / drill.steps.length) * 80 + timeBonus * 0.2) * 100) / 100

    setScore(finalScore)
    setSimulationComplete(true)

    onComplete({
      drillId: drill.id,
      score: finalScore,
      correctActions: correctResponses,
      totalSteps: drill.steps.length,
      timeElapsed,
      xpEarned: Math.round(finalScore * 0.5),
    })
  }

  const currentStepData = drill.steps[currentStep]
  const hasResponded = responses[currentStep] !== undefined
  const isCorrect = responses[currentStep] === currentStepData?.correctAction

  if (simulationComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <div
            className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              score >= 80 ? "bg-green-100" : score >= 60 ? "bg-yellow-100" : "bg-red-100"
            }`}
          >
            {score >= 80 ? (
              <CheckCircle className="h-10 w-10 text-green-600" />
            ) : score >= 60 ? (
              <Target className="h-10 w-10 text-yellow-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Drill Complete!</h2>
          <p className="text-gray-600 mb-6">
            {score >= 80
              ? "Excellent response! You're well-prepared for emergencies."
              : score >= 60
                ? "Good job! Review the feedback to improve your response."
                : "Keep practicing! Emergency preparedness takes time to master."}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-primary-600">{score}%</p>
              <p className="text-sm text-gray-600">Final Score</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">
                {drill.steps.reduce(
                  (count, _, index) => count + (responses[index] === drill.steps[index].correctAction ? 1 : 0),
                  0,
                )}
                /{drill.steps.length}
              </p>
              <p className="text-sm text-gray-600">Correct Actions</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</p>
              <p className="text-sm text-gray-600">Time Taken</p>
            </div>
          </div>

          <button onClick={onClose} className="btn-primary">
            Continue Training
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={onClose} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{drill.title}</h1>
                <p className="text-sm text-gray-500">
                  Step {currentStep + 1} of {drill.steps.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / drill.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scenario Description */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Emergency Scenario</h2>
              </div>
              <p className="text-gray-700 mb-4">{currentStepData?.scenario}</p>

              {currentStepData?.image && (
                <img
                  src={currentStepData.image || "/placeholder.svg"}
                  alt="Emergency scenario"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">What should you do?</h3>
                <p className="text-orange-700">{currentStepData?.question}</p>
              </div>
            </div>

            {/* Action Options */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Action</h3>
              <div className="space-y-3">
                {currentStepData?.options.map((option, index) => {
                  const isSelected = responses[currentStep] === index
                  const isCorrectOption = index === currentStepData.correctAction
                  const showCorrect = hasResponded && isCorrectOption
                  const showIncorrect = hasResponded && isSelected && !isCorrectOption

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: hasResponded ? 1 : 1.02 }}
                      whileTap={{ scale: hasResponded ? 1 : 0.98 }}
                      onClick={() => !hasResponded && handleStepResponse(index)}
                      disabled={hasResponded}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        showCorrect
                          ? "border-green-500 bg-green-50 text-green-800"
                          : showIncorrect
                            ? "border-red-500 bg-red-50 text-red-800"
                            : isSelected
                              ? "border-primary-500 bg-primary-50 text-primary-800"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {hasResponded && (
                          <div>
                            {isCorrectOption && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {hasResponded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-4 p-4 rounded-lg ${
                      isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-start">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                          {isCorrect ? "Correct Action!" : "Incorrect Action"}
                        </p>
                        <p className={`text-sm mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                          {currentStepData?.feedback}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Escape Route Map */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Escape Route</h3>
            <EscapeRouteMap
              drill={drill}
              currentStep={currentStep}
              userResponse={responses[currentStep]}
              isCorrect={isCorrect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrillSimulation
