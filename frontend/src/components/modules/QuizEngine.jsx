"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, Award, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const QuizEngine = ({ quiz, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || 300) // 5 minutes default
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete()
    }
  }, [timeLeft, quizCompleted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    })
  }

  const handleNext = () => {
    if (showFeedback) {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setShowFeedback(false)
      } else {
        handleQuizComplete()
      }
    } else {
      setShowFeedback(true)
    }
  }

  const handleQuizComplete = () => {
    const correctAnswers = quiz.questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0)
    }, 0)

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(finalScore)
    setQuizCompleted(true)

    // Calculate XP based on score
    const xpEarned = Math.round(finalScore * 0.5) // 50 XP for perfect score
    onComplete({
      score: finalScore,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      xpEarned,
      timeSpent: (quiz.timeLimit || 300) - timeLeft,
    })
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowFeedback(false)
    setTimeLeft(quiz.timeLimit || 300)
    setQuizCompleted(false)
    setScore(0)
  }

  const currentQ = quiz.questions[currentQuestion]
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correctAnswer
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined

  if (quizCompleted) {
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
              <Award className="h-10 w-10 text-green-600" />
            ) : score >= 60 ? (
              <CheckCircle className="h-10 w-10 text-yellow-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">
            {score >= 80
              ? "Excellent work! You've mastered this topic."
              : score >= 60
                ? "Good job! You have a solid understanding."
                : "Keep studying! Review the material and try again."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-primary-600">{score}%</p>
              <p className="text-sm text-gray-600">Final Score</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">
                {quiz.questions.reduce(
                  (count, _, index) => count + (selectedAnswers[index] === quiz.questions[index].correctAnswer ? 1 : 0),
                  0,
                )}
                /{quiz.questions.length}
              </p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={restartQuiz} className="btn-secondary flex items-center">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </button>
            <button onClick={onClose} className="btn-primary">
              Continue Learning
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-primary-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <p className="text-primary-100">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <button onClick={onClose} className="text-primary-200 hover:text-white">
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="bg-primary-700 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQ?.question}</h3>

            <div className="space-y-3 mb-8">
              {currentQ?.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index
                const isCorrectAnswer = index === currentQ.correctAnswer
                const showCorrect = showFeedback && isCorrectAnswer
                const showIncorrect = showFeedback && isSelected && !isCorrectAnswer

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                    whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                    onClick={() => !showFeedback && handleAnswerSelect(index)}
                    disabled={showFeedback}
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
                      {showFeedback && (
                        <div>
                          {isCorrectAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
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
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 rounded-lg mb-6 ${
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
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </p>
                      <p className={`text-sm mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                        {currentQ?.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswered}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showFeedback
                  ? currentQuestion === quiz.questions.length - 1
                    ? "Complete Quiz"
                    : "Next Question"
                  : "Submit Answer"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default QuizEngine
