import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Target, Award, Clock, Thermometer, Mountain, Building, TrendingUp, ArrowUp, ArrowDown, RotateCcw, ArrowRight } from 'lucide-react';

interface IntegersLessonProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'ordering' | 'number-line' | 'word-problem';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

interface Section {
  id: string;
  title: string;
  duration: string;
  content: React.ReactNode;
  completed: boolean;
}

export const IntegersLesson: React.FC<IntegersLessonProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<boolean[]>([false, false, false, false]);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string | string[]>>({});
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const sections: Section[] = [
    {
      id: 'introduction',
      title: 'What are Integers?',
      duration: '5 min',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="mr-2" />
              Understanding Integers
            </h3>
            <p className="text-gray-700 mb-4">
              Integers are whole numbers that can be positive, negative, or zero. They include all the counting numbers, their opposites, and zero.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-red-100 p-4 rounded-lg text-center">
                <ArrowDown className="mx-auto mb-2 text-red-600" />
                <h4 className="font-semibold text-red-800">Negative Integers</h4>
                <p className="text-sm text-red-600">..., -3, -2, -1</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-gray-800">Zero</h4>
                <p className="text-sm text-gray-600">0</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <ArrowUp className="mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold text-green-800">Positive Integers</h4>
                <p className="text-sm text-green-600">1, 2, 3, ...</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <Thermometer className="mr-2" />
              Real-World Examples
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm"><strong>Temperature:</strong> -5°C (below freezing)</p>
                <p className="text-sm"><strong>Elevation:</strong> -200m (below sea level)</p>
                <p className="text-sm"><strong>Bank Account:</strong> -$50 (overdrawn)</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><strong>Temperature:</strong> 25°C (above freezing)</p>
                <p className="text-sm"><strong>Elevation:</strong> 1000m (above sea level)</p>
                <p className="text-sm"><strong>Bank Account:</strong> $100 (positive balance)</p>
              </div>
            </div>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 'number-line',
      title: 'The Number Line',
      duration: '7 min',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-bold text-purple-900 mb-4">
              Visualizing Integers on a Number Line
            </h3>
            <p className="text-gray-700 mb-6">
              The number line helps us visualize integers and understand their relationships. Negative numbers are to the left of zero, and positive numbers are to the right.
            </p>
            
            <div className="bg-white p-6 rounded-lg border-2 border-purple-200 mb-6">
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${num === 0 ? 'bg-gray-800' : num < 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className={`text-sm font-semibold mt-1 ${num === 0 ? 'text-gray-800' : num < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {num}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-gray-300 rounded-full"></div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-red-600">Negative</span>
                  <span className="text-xs text-gray-600">Zero</span>
                  <span className="text-xs text-green-600">Positive</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Key Points:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Numbers get smaller as you move left</li>
                <li>Numbers get larger as you move right</li>
                <li>Zero is neither positive nor negative</li>
                <li>The distance from zero determines the absolute value</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 'operations',
      title: 'Operations with Integers',
      duration: '10 min',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4">
              Adding and Subtracting Integers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <ArrowRight className="mr-2" />
                  Addition Rules
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded">
                    <p className="font-medium">Same Signs:</p>
                    <p className="text-sm">Add the numbers, keep the sign</p>
                    <p className="text-xs text-green-600">3 + 5 = 8, (-3) + (-5) = -8</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="font-medium">Different Signs:</p>
                    <p className="text-sm">Subtract, keep sign of larger number</p>
                    <p className="text-xs text-blue-600">3 + (-5) = -2, (-3) + 5 = 2</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <RotateCcw className="mr-2" />
                  Subtraction Rules
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded">
                    <p className="font-medium">Key Rule:</p>
                    <p className="text-sm">Subtracting = Adding the opposite</p>
                    <p className="text-xs text-orange-600">5 - 3 = 5 + (-3) = 2</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <p className="font-medium">Examples:</p>
                    <p className="text-xs">3 - (-2) = 3 + 2 = 5</p>
                    <p className="text-xs">(-4) - 3 = (-4) + (-3) = -7</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Practice Examples:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">(-7) + 3 = ?</p>
                  <p className="text-xs text-gray-600">Answer: -4</p>
                </div>
                <div>
                  <p className="text-sm">5 - (-2) = ?</p>
                  <p className="text-xs text-gray-600">Answer: 7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      completed: false
    },
    {
      id: 'applications',
      title: 'Real-World Applications',
      duration: '8 min',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
              <Building className="mr-2" />
              Integers in Daily Life
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg border border-orange-200">
                <div className="flex items-center mb-3">
                  <Thermometer className="mr-2 text-blue-500" />
                  <h4 className="font-semibold">Weather</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Temperature changes throughout the day
                </p>
                <div className="space-y-2">
                  <p className="text-xs">Morning: -2°C</p>
                  <p className="text-xs">Afternoon: +8°C</p>
                  <p className="text-xs">Change: 8 - (-2) = 10°C increase</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-orange-200">
                <div className="flex items-center mb-3">
                  <Mountain className="mr-2 text-green-500" />
                  <h4 className="font-semibold">Elevation</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Heights above and below sea level
                </p>
                <div className="space-y-2">
                  <p className="text-xs">Sea level: 0m</p>
                  <p className="text-xs">Mountain peak: +2000m</p>
                  <p className="text-xs">Ocean floor: -500m</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-orange-200">
                <div className="flex items-center mb-3">
                  <TrendingUp className="mr-2 text-purple-500" />
                  <h4 className="font-semibold">Finance</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Money gained and lost
                </p>
                <div className="space-y-2">
                  <p className="text-xs">Starting: $100</p>
                  <p className="text-xs">Spent: -$30</p>
                  <p className="text-xs">Earned: +$50</p>
                  <p className="text-xs">Final: $120</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Problem Solving Strategy:</h4>
              <ol className="list-decimal list-inside space-y-2 text-indigo-700">
                <li>Identify what the positive and negative values represent</li>
                <li>Set up the problem using integers</li>
                <li>Apply the rules for operations with integers</li>
                <li>Check if your answer makes sense in context</li>
              </ol>
            </div>
          </div>
        </div>
      ),
      completed: false
    }
  ];

  const questions: Question[] = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'Which of the following is NOT an integer?',
      options: ['-5', '0', '3.5', '42'],
      correctAnswer: '3.5',
      explanation: 'Integers are whole numbers (positive, negative, or zero). 3.5 is a decimal, not a whole number.',
      points: 10
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'What is (-8) + 3?',
      options: ['-11', '-5', '5', '11'],
      correctAnswer: '-5',
      explanation: 'When adding integers with different signs, subtract the smaller absolute value from the larger and keep the sign of the number with the larger absolute value.',
      points: 15
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      question: 'What is 4 - (-6)?',
      options: ['-10', '-2', '2', '10'],
      correctAnswer: '10',
      explanation: 'Subtracting a negative number is the same as adding its positive: 4 - (-6) = 4 + 6 = 10.',
      points: 15
    },
    {
      id: 'q4',
      type: 'word-problem',
      question: 'The temperature was -3°C in the morning. By afternoon, it had risen 8°C. What was the afternoon temperature?',
      options: ['-11°C', '-5°C', '5°C', '11°C'],
      correctAnswer: '5°C',
      explanation: 'Starting temperature: -3°C. Temperature rise: +8°C. Final temperature: -3 + 8 = 5°C.',
      points: 20
    }
  ];

  const handleSectionComplete = (sectionIndex: number) => {
    const newProgress = [...sectionProgress];
    newProgress[sectionIndex] = true;
    setSectionProgress(newProgress);
    
    if (sectionIndex < sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      setShowAssessment(true);
    }
  };

  const handleAssessmentAnswer = (questionId: string, answer: string | string[]) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = assessmentAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });
    
    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const handleAssessmentSubmit = () => {
    const score = calculateScore();
    setAssessmentScore(score);
    onComplete(score);
  };

  const renderQuestion = (question: Question) => {
    const userAnswer = assessmentAnswers[question.id];
    
    return (
      <div key={question.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-4">{question.question}</h4>
        
        {question.type === 'multiple-choice' && (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => handleAssessmentAnswer(question.id, e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
        
        {assessmentScore !== null && (
          <div className={`mt-4 p-3 rounded-lg ${userAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center mb-2">
              {userAnswer === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-semibold ${userAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'}`}>
                {userAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-gray-700">{question.explanation}</p>
            {userAnswer !== question.correctAnswer && (
              <p className="text-sm text-gray-600 mt-1">
                Correct answer: {question.correctAnswer}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Understanding Integers</h2>
              <p className="text-blue-100 mt-1">Master positive and negative whole numbers</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Progress</span>
              <span className="text-sm text-blue-100">
                {sectionProgress.filter(Boolean).length} / {sections.length} sections
              </span>
            </div>
            <div className="w-full bg-blue-500 bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(sectionProgress.filter(Boolean).length / sections.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showAssessment ? (
            <div>
              {/* Section Navigation */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        index === currentSection
                          ? 'bg-blue-600 text-white'
                          : sectionProgress[index]
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sectionProgress[index] && <CheckCircle className="w-4 h-4 inline mr-1" />}
                      {section.title}
                    </button>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {sections[currentSection]?.duration}
                </div>
              </div>

              {/* Section Content */}
              <div className="mb-8">
                {sections[currentSection]?.content}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                <button
                  onClick={() => handleSectionComplete(currentSection)}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {currentSection === sections.length - 1 ? 'Start Assessment' : 'Next Section'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Assessment Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Assessment Time!</h3>
                <p className="text-gray-600">Test your understanding of integers</p>
              </div>

              {/* Questions */}
              <div className="space-y-6 mb-8">
                {questions.map(renderQuestion)}
              </div>

              {/* Assessment Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowAssessment(false)}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Lessons
                </button>
                
                {assessmentScore === null ? (
                  <button
                    onClick={handleAssessmentSubmit}
                    disabled={Object.keys(assessmentAnswers).length < questions.length}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
                      assessmentScore >= 80 ? 'bg-green-100 text-green-800' : 
                      assessmentScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      <Award className="w-5 h-5 mr-2" />
                      Score: {assessmentScore}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};