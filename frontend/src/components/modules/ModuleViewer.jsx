"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Play, CheckCircle, Clock } from "lucide-react"
import QuizEngine from "./QuizEngine"

const ModuleViewer = ({ module, onClose, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResults, setQuizResults] = useState(null)

  const handleSectionComplete = (sectionIndex) => {
    const newCompleted = new Set(completedSections)
    newCompleted.add(sectionIndex)
    setCompletedSections(newCompleted)

    // Auto-advance to next section
    if (sectionIndex < module.sections.length - 1) {
      setCurrentSection(sectionIndex + 1)
    }
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setShowQuiz(false)
    onComplete({
      moduleId: module.id,
      progress: 100,
      quizScore: results.score,
      xpEarned: results.xpEarned,
      timeSpent: results.timeSpent,
    })
  }

  const canTakeQuiz = completedSections.size === module.sections.length
  const currentSectionData = module.sections[currentSection]

  if (showQuiz) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <QuizEngine quiz={module.quiz} onComplete={handleQuizComplete} onClose={() => setShowQuiz(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={onClose} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{module.title}</h1>
                <p className="text-sm text-gray-500">
                  Section {currentSection + 1} of {module.sections.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {completedSections.size}/{module.sections.length} completed
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSections.size / module.sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contents</h3>
              <nav className="space-y-2">
                {module.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index
                        ? "bg-primary-100 text-primary-700 border-l-4 border-primary-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs text-gray-500">{section.duration}</p>
                      </div>
                      {completedSections.has(index) && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                  </button>
                ))}

                {/* Quiz Section */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={() => canTakeQuiz && setShowQuiz(true)}
                    disabled={!canTakeQuiz}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      canTakeQuiz
                        ? "bg-green-50 hover:bg-green-100 text-green-700"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Final Quiz</p>
                        <p className="text-xs">{module.quiz.questions.length} questions</p>
                      </div>
                      {quizResults ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Play className="h-4 w-4" />}
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg shadow-md border border-gray-200">
              {/* Section Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentSectionData.title}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{currentSectionData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{currentSectionData.type}</span>
                      </div>
                    </div>
                  </div>
                  {!completedSections.has(currentSection) && (
                    <button onClick={() => handleSectionComplete(currentSection)} className="btn-primary">
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                {currentSectionData.type === "video" && (
                  <div className="mb-6">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4" />
                        <p>Video: {currentSectionData.title}</p>
                        <p className="text-sm text-gray-300">{currentSectionData.duration}</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSectionData.type === "reading" && (
                  <div className="mb-6">
                    <img
                      src={
                        currentSectionData.image ||
                        `/placeholder.svg?height=300&width=600&query=${currentSectionData.title}`
                      }
                      alt={currentSectionData.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  </div>
                )}

                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentSectionData.content }} />
                </div>

                {/* Key Points */}
                {currentSectionData.keyPoints && (
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">Key Points to Remember</h4>
                    <ul className="space-y-2">
                      {currentSectionData.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Section
                  </button>

                  {currentSection < module.sections.length - 1 ? (
                    <button onClick={() => setCurrentSection(currentSection + 1)} className="btn-primary">
                      Next Section
                    </button>
                  ) : (
                    <button
                      onClick={() => canTakeQuiz && setShowQuiz(true)}
                      disabled={!canTakeQuiz}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Take Final Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleViewer
