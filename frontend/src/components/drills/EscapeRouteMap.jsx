"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const EscapeRouteMap = ({ drill, currentStep, userResponse, isCorrect }) => {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (userResponse !== undefined) {
      // Start animation when user responds
      setAnimationStep(1)
      const timer = setTimeout(() => {
        setAnimationStep(2)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [userResponse])

  const getRouteColor = () => {
    if (userResponse === undefined) return "#3b82f6" // Blue for default
    return isCorrect ? "#10b981" : "#ef4444" // Green for correct, red for incorrect
  }

  const getPersonPosition = () => {
    if (animationStep === 0) return { x: 50, y: 80 } // Starting position
    if (animationStep === 1) return { x: 50, y: 60 } // Moving
    return isCorrect ? { x: 20, y: 20 } : { x: 80, y: 80 } // End position based on correctness
  }

  const personPos = getPersonPosition()

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      {/* Building Layout */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Room boundaries */}
        <rect x="10" y="10" width="80" height="80" fill="white" stroke="#d1d5db" strokeWidth="0.5" />

        {/* Interior walls */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="#d1d5db" strokeWidth="0.5" />
        <line x1="50" y1="10" x2="50" y2="50" stroke="#d1d5db" strokeWidth="0.5" />

        {/* Doors */}
        <rect x="45" y="48" width="10" height="4" fill="#fbbf24" />
        <rect x="18" y="8" width="4" height="4" fill="#10b981" />
        <rect x="88" y="48" width="4" height="4" fill="#ef4444" />

        {/* Emergency exits */}
        <text x="15" y="7" fontSize="2" fill="#10b981" fontWeight="bold">
          EXIT
        </text>
        <text x="85" y="47" fontSize="2" fill="#ef4444" fontWeight="bold">
          BLOCKED
        </text>

        {/* Hazard indicators */}
        {drill.type === "fire" && (
          <>
            <circle cx="70" cy="30" r="3" fill="#ef4444" opacity="0.7" />
            <text x="68" y="32" fontSize="2" fill="white">
              🔥
            </text>
          </>
        )}

        {/* Escape routes */}
        <motion.path
          d="M 50 80 Q 30 60 20 12"
          stroke={getRouteColor()}
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animationStep > 0 ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Person indicator */}
        <motion.circle
          cx={personPos.x}
          cy={personPos.y}
          r="2"
          fill={userResponse === undefined ? "#3b82f6" : isCorrect ? "#10b981" : "#ef4444"}
          animate={personPos}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.text
          x={personPos.x - 1}
          y={personPos.y + 1}
          fontSize="2"
          fill="white"
          animate={personPos}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          👤
        </motion.text>

        {/* Step indicators */}
        {animationStep > 0 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <circle cx="40" cy="70" r="1" fill={getRouteColor()} />
            <circle cx="30" cy="50" r="1" fill={getRouteColor()} />
            <circle cx="25" cy="30" r="1" fill={getRouteColor()} />
          </motion.g>
        )}

        {/* Legend */}
        <g transform="translate(5, 85)">
          <rect x="0" y="0" width="25" height="12" fill="white" stroke="#d1d5db" strokeWidth="0.2" />
          <circle cx="2" cy="2" r="0.5" fill="#10b981" />
          <text x="4" y="3" fontSize="1.5" fill="#374151">
            Safe Exit
          </text>
          <circle cx="2" cy="5" r="0.5" fill="#ef4444" />
          <text x="4" y="6" fontSize="1.5" fill="#374151">
            Blocked
          </text>
          <circle cx="2" cy="8" r="0.5" fill="#3b82f6" />
          <text x="4" y="9" fontSize="1.5" fill="#374151">
            Your Path
          </text>
        </g>
      </svg>

      {/* Status overlay */}
      {userResponse !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-white font-medium ${
            isCorrect ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isCorrect ? "Safe Route!" : "Dangerous Route!"}
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-3">
        <p className="text-sm text-gray-700">
          {animationStep === 0
            ? "Choose your action to see the escape route animation"
            : animationStep === 1
              ? "Following your chosen path..."
              : isCorrect
                ? "You successfully reached the safe exit!"
                : "This route led to danger. The safe exit was highlighted in green."}
        </p>
      </div>
    </div>
  )
}

export default EscapeRouteMap
