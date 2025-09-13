import React, { useState } from 'react';

const QuizEngine = ({ questions, onComplete, moduleTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (showExplanation) {
      setShowExplanation(false);
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    } else {
      setShowExplanation(true);
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    onComplete(score, answers);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent work!';
    if (score >= 70) return 'Good job!';
    return 'Keep studying and try again!';
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="p-6">
        <div className="text-center">
          <div className={`text-6xl mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">Module: {moduleTitle}</p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className={`text-lg font-semibold mb-4 ${getScoreColor(score)}`}>
              {getScoreMessage(score)}
            </p>
            
            <div className="space-y-2 mb-6">
              {questions.map((question, index) => {
                const isCorrect = answers[question.id] === question.correct;
                return (
                  <div key={question.id} className="flex items-center justify-between p-2 rounded">
                    <span className="text-sm">Question {index + 1}</span>
                    <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {passed ? 'Continue to Next Module' : 'Review and Retry'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Quiz: {moduleTitle}</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            let optionClass = "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ";
            
            if (isAnswered) {
              if (index === question.correct) {
                optionClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && index !== question.correct) {
                optionClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                optionClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              optionClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
            }

            return (
              <div
                key={index}
                className={optionClass}
                onClick={() => !isAnswered && handleAnswerSelect(question.id, index)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    isAnswered 
                      ? index === question.correct 
                        ? 'border-green-500 bg-green-500' 
                        : index === selectedAnswer 
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      : 'border-gray-300'
                  }`}>
                    {isAnswered && index === question.correct && (
                      <span className="text-white text-sm">✓</span>
                    )}
                    {isAnswered && index === selectedAnswer && index !== question.correct && (
                      <span className="text-white text-sm">✗</span>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </div>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showExplanation 
              ? (currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question')
              : 'Check Answer'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
