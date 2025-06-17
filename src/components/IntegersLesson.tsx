import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Target, Award, Clock, Thermometer, Mountain, Building, TrendingUp, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

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

  // Interactive Number Line Component
  const NumberLine = ({ min = -10, max = 10, markers = [], interactive = false, onNumberSelect }: {
    min?: number;
    max?: number;
    markers?: { value: number; label: string; color: string }[];
    interactive?: boolean;
    onNumberSelect?: (value: number) => void;
  }) => {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="relative">
          {/* Number line */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-full h-2 bg-gray-300 rounded-full relative">
              {/* Zero marker */}
              <div 
                className="absolute w-1 h-6 bg-red-500 -top-2"
                style={{ left: `${((0 - min) / (max - min)) * 100}%` }}
              >
                <span className="absolute -bottom-8 -left-2 text-sm font-bold text-red-600">0</span>
              </div>
            </div>
          </div>
          
          {/* Number markers */}
          <div className="flex justify-between items-center">
            {numbers.map((num) => {
              const marker = markers.find(m => m.value === num);
              const isSelected = selectedNumbers.includes(num);
              
              return (
                <div key={num} className="flex flex-col items-center">
                  <button
                    onClick={() => interactive && onNumberSelect && onNumberSelect(num)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${
                      marker 
                        ? `${marker.color} border-current` 
                        : isSelected
                        ? 'bg-blue-500 text-white border-blue-500'
                        : interactive
                        ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        : 'border-gray-300'
                    }`}
                    disabled={!interactive}
                  >
                    {marker ? marker.label : num}
                  </button>
                  <span className={`text-xs mt-1 ${num === 0 ? 'font-bold text-red-600' : 'text-gray-600'}`}>
                    {num}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Temperature Gauge Component
  const TemperatureGauge = ({ temperature, city }: { temperature: number; city: string }) => {
    const height = Math.abs(temperature) * 3 + 50;
    const isNegative = temperature < 0;
    
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
        <h4 className="font-semibold text-gray-900 mb-2">{city}</h4>
        <div className="relative w-8 h-32 mx-auto bg-gray-200 rounded-full">
          {/* Zero line */}
          <div className="absolute w-full h-0.5 bg-red-500 top-1/2 transform -translate-y-0.5"></div>
          
          {/* Temperature fill */}
          <div 
            className={`absolute w-full rounded-full transition-all duration-500 ${
              isNegative ? 'bg-blue-500 top-1/2' : 'bg-red-500 bottom-1/2'
            }`}
            style={{ 
              height: `${Math.min(height, 64)}px`,
              ...(isNegative ? { top: '50%' } : { bottom: '50%' })
            }}
          ></div>
          
          {/* Thermometer bulb */}
          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${
            isNegative ? 'bg-blue-500' : 'bg-red-500'
          }`}></div>
        </div>
        <div className={`mt-2 text-lg font-bold ${isNegative ? 'text-blue-600' : 'text-red-600'}`}>
          {temperature}°C
        </div>
      </div>
    );
  };

  // Assessment Questions
  const assessmentQuestions: Question[] = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'Which integer represents 20m below sea level?',
      options: ['+20', '-20', '20m', 'below 20'],
      correctAnswer: '-20',
      explanation: 'Below sea level is represented by negative integers. 20m below sea level = -20',
      points: 2
    },
    {
      id: 'q2',
      type: 'ordering',
      question: 'Arrange these temperatures from coldest to warmest: 5°C, -8°C, 0°C, -2°C',
      options: ['5°C', '-8°C', '0°C', '-2°C'],
      correctAnswer: ['-8°C', '-2°C', '0°C', '5°C'],
      explanation: 'On the number line, numbers get larger as you move right. -8 < -2 < 0 < 5',
      points: 3
    },
    {
      id: 'q3',
      type: 'word-problem',
      question: 'A Perth business has a profit of $500 in January and a loss of $300 in February. Express both as integers.',
      options: ['Profit: +500, Loss: +300', 'Profit: +500, Loss: -300', 'Profit: -500, Loss: +300', 'Profit: 500, Loss: 300'],
      correctAnswer: 'Profit: +500, Loss: -300',
      explanation: 'Profit is positive (+500), loss is negative (-300). Positive integers represent gains, negative represent losses.',
      points: 3
    },
    {
      id: 'q4',
      type: 'number-line',
      question: 'Plot -6, +4, and -1 on a number line',
      correctAnswer: ['-6', '+4', '-1'],
      explanation: '-6 is 6 units left of zero, -1 is 1 unit left of zero, +4 is 4 units right of zero',
      points: 2
    },
    {
      id: 'q5',
      type: 'word-problem',
      question: 'A Sydney Harbour Bridge climb tour starts at 0m sea level and goes up 134m. Express the final height as an integer.',
      options: ['-134', '+134', '134m above', 'sea level + 134'],
      correctAnswer: '+134',
      explanation: 'Above sea level is positive. Starting at 0m and going up 134m gives +134m',
      points: 2
    }
  ];

  // Lesson Sections
  const sections: Section[] = [
    {
      id: 'introduction',
      title: 'Lesson Introduction',
      duration: '2-3 minutes',
      completed: sectionProgress[0],
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What are integers and why do we need negative numbers?</h3>
            <p className="text-gray-700 mb-4">
              Integers are whole numbers that can be positive, negative, or zero. We use negative numbers to represent 
              values below a reference point - like temperatures below freezing, depths below sea level, or money owed.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🌡️ Australian Weather</h4>
                <p className="text-sm text-blue-800">"Sydney's temperature dropped to -2°C this morning"</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">🏔️ Australian Geography</h4>
                <p className="text-sm text-green-800">"The Nullarbor Plain is 120m above sea level, while Lake Eyre is 15m below sea level"</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TemperatureGauge temperature={-2} city="Sydney" />
            <TemperatureGauge temperature={5} city="Brisbane" />
            <TemperatureGauge temperature={-8} city="Canberra" />
          </div>
        </div>
      )
    },
    {
      id: 'understanding',
      title: 'Understanding Integers',
      duration: '5 minutes',
      completed: sectionProgress[1],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Number Line</h3>
            <p className="text-gray-700 mb-4">
              The number line helps us visualize integers. Zero is in the middle, positive numbers go to the right, 
              negative numbers go to the left.
            </p>
            
            <NumberLine 
              markers={[
                { value: -5, label: '🥶', color: 'bg-blue-100 text-blue-800' },
                { value: 0, label: '🌡️', color: 'bg-gray-100 text-gray-800' },
                { value: 5, label: '☀️', color: 'bg-orange-100 text-orange-800' }
              ]}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Practice Questions:</h4>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="font-medium text-blue-900 mb-2">
                "The temperature in Canberra is -5°C. What does the negative sign mean?"
              </p>
              <div className="text-sm text-blue-800">
                <strong>Answer:</strong> The negative sign means the temperature is 5 degrees below zero (freezing point).
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="font-medium text-green-900 mb-2">
                "A submarine dives 50m below sea level. Express this as an integer."
              </p>
              <div className="text-sm text-green-800">
                <strong>Answer:</strong> -50 (negative because it's below the reference point of sea level)
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="font-medium text-purple-900 mb-2">
                "Place these AFL team scores on a number line: +14, -7, +3, -12"
              </p>
              <div className="mt-3">
                <NumberLine 
                  min={-15}
                  max={15}
                  markers={[
                    { value: -12, label: '🏈', color: 'bg-red-100 text-red-800' },
                    { value: -7, label: '🏈', color: 'bg-red-100 text-red-800' },
                    { value: 3, label: '🏈', color: 'bg-green-100 text-green-800' },
                    { value: 14, label: '🏈', color: 'bg-green-100 text-green-800' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comparing',
      title: 'Comparing Integers',
      duration: '5 minutes',
      completed: sectionProgress[2],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Comparing and Ordering Integers</h3>
            <p className="text-gray-700 mb-4">
              On the number line, numbers get larger as you move to the right. This means:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Any positive number is greater than any negative number</li>
              <li>Zero is greater than any negative number</li>
              <li>For negative numbers, the one closer to zero is larger (e.g., -2 > -5)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Australian Context Questions:</h4>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="font-medium text-blue-900 mb-3">
                "Which is colder: -8°C in Hobart or -3°C in Melbourne?"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <TemperatureGauge temperature={-8} city="Hobart" />
                <TemperatureGauge temperature={-3} city="Melbourne" />
              </div>
              <div className="text-sm text-blue-800">
                <strong>Answer:</strong> -8°C in Hobart is colder because -8 < -3 on the number line.
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="font-medium text-green-900 mb-2">
                "A mine shaft goes down 180m. The basement of a Sydney building is 5m below ground. Which is the lower integer?"
              </p>
              <div className="flex items-center space-x-4 mb-3">
                <div className="text-center">
                  <Building className="h-8 w-8 text-gray-600 mx-auto mb-1" />
                  <div className="text-sm">Building: -5m</div>
                </div>
                <ArrowDown className="h-6 w-6 text-gray-400" />
                <div className="text-center">
                  <Mountain className="h-8 w-8 text-brown-600 mx-auto mb-1" />
                  <div className="text-sm">Mine: -180m</div>
                </div>
              </div>
              <div className="text-sm text-green-800">
                <strong>Answer:</strong> -180m is lower because -180 < -5 on the number line.
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="font-medium text-purple-900 mb-2">
                "Order these elevations from lowest to highest: Mount Kosciuszko (+2228m), Lake Eyre (-15m), sea level (0m)"
              </p>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="bg-blue-100 px-3 py-2 rounded-lg text-blue-800 font-semibold">-15m</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-gray-800 font-semibold">0m</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-green-100 px-3 py-2 rounded-lg text-green-800 font-semibold">+2228m</div>
              </div>
              <div className="text-sm text-purple-800">
                <strong>Answer:</strong> Lake Eyre (-15m), sea level (0m), Mount Kosciuszko (+2228m)
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'applications',
      title: 'Real-World Applications',
      duration: '5-8 minutes',
      completed: sectionProgress[3],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Problem-Solving Scenarios</h3>
            <p className="text-gray-700 mb-4">
              Let's apply integers to real Australian situations you might encounter:
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">💰 Banking Scenario</h4>
              <p className="text-green-800 mb-3">
                "A bank account starts at $50. After spending $75, what's the balance? Express as an integer."
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <div className="text-sm space-y-2">
                  <div>Starting balance: +$50</div>
                  <div>Spending: -$75</div>
                  <div className="border-t pt-2 font-semibold">Final balance: +$50 + (-$75) = -$25</div>
                </div>
              </div>
              <div className="text-sm text-green-800">
                <strong>Answer:</strong> -25 (The account is $25 overdrawn)
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">🏢 Elevator Problem</h4>
              <p className="text-blue-800 mb-3">
                "An elevator in a Melbourne shopping center goes from Level 3 to Basement 2. How many levels did it travel?"
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <div className="text-sm space-y-2">
                  <div>Starting level: +3</div>
                  <div>Ending level: -2</div>
                  <div className="border-t pt-2 font-semibold">Distance: |3 - (-2)| = |3 + 2| = 5 levels</div>
                </div>
              </div>
              <div className="text-sm text-blue-800">
                <strong>Answer:</strong> The elevator traveled 5 levels down
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">📈 RBA Interest Rate</h4>
              <p className="text-orange-800 mb-3">
                "The RBA cash rate changed from +2.5% to -0.5%. What was the change?"
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <div className="text-sm space-y-2">
                  <div>Original rate: +2.5%</div>
                  <div>New rate: -0.5%</div>
                  <div className="border-t pt-2 font-semibold">Change: -0.5% - (+2.5%) = -0.5% - 2.5% = -3.0%</div>
                </div>
              </div>
              <div className="text-sm text-orange-800">
                <strong>Answer:</strong> The rate decreased by 3.0 percentage points
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSectionComplete = (sectionIndex: number) => {
    const newProgress = [...sectionProgress];
    newProgress[sectionIndex] = true;
    setSectionProgress(newProgress);
    
    // Auto-advance to next section or assessment
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

  const calculateAssessmentScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    assessmentQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = assessmentAnswers[question.id];
      
      if (question.type === 'ordering') {
        if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
          if (JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)) {
            earnedPoints += question.points;
          }
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      }
    });
    
    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const handleAssessmentSubmit = () => {
    const score = calculateAssessmentScore();
    setAssessmentScore(score);
    onComplete(score);
  };

  const allSectionsComplete = sectionProgress.every(completed => completed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Positive and Negative Integers</h2>
              <p className="text-blue-100 mt-1">Australian Curriculum v9.0 • AC9M7N01</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>
                {showAssessment ? 'Assessment' : `Section ${currentSection + 1} of ${sections.length}`}
              </span>
              <span>
                {showAssessment ? 'Final Assessment' : sections[currentSection]?.duration}
              </span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: showAssessment 
                    ? '100%' 
                    : `${((currentSection + 1) / sections.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {!showAssessment ? (
            <div className="space-y-6">
              {/* Section Navigation */}
              <div className="flex items-center space-x-4 mb-6">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      index === currentSection
                        ? 'bg-blue-100 text-blue-800'
                        : section.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {section.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </div>

              {/* Current Section Content */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {sections[currentSection]?.title}
                </h3>
                {sections[currentSection]?.content}
              </div>

              {/* Section Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="text-sm text-gray-500">
                  🇦🇺 Australian Curriculum v9.0 Aligned
                </div>

                <button
                  onClick={() => handleSectionComplete(currentSection)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                >
                  <span>
                    {currentSection === sections.length - 1 ? 'Start Assessment' : 'Next Section'}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Assessment */
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment</h3>
                <p className="text-gray-600">Test your understanding of positive and negative integers</p>
              </div>

              {assessmentScore === null ? (
                <div className="space-y-6">
                  {assessmentQuestions.map((question, index) => (
                    <div key={question.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Question {index + 1}
                        </h4>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                          {question.points} points
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{question.question}</p>
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleAssessmentAnswer(question.id, option)}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                assessmentAnswers[question.id] === option
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {question.type === 'number-line' && (
                        <div>
                          <NumberLine 
                            interactive={true}
                            onNumberSelect={(value) => {
                              const current = assessmentAnswers[question.id] as string[] || [];
                              const valueStr = value > 0 ? `+${value}` : `${value}`;
                              if (current.includes(valueStr)) {
                                handleAssessmentAnswer(
                                  question.id, 
                                  current.filter(v => v !== valueStr)
                                );
                              } else if (current.length < 3) {
                                handleAssessmentAnswer(question.id, [...current, valueStr]);
                              }
                            }}
                          />
                          <div className="mt-2 text-sm text-gray-600">
                            Selected: {(assessmentAnswers[question.id] as string[] || []).join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="text-center">
                    <button
                      onClick={handleAssessmentSubmit}
                      disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      Submit Assessment
                    </button>
                  </div>
                </div>
              ) : (
                /* Assessment Results */
                <div className="text-center space-y-6">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                    assessmentScore >= 80 ? 'bg-green-100' : assessmentScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-3xl font-bold ${
                      assessmentScore >= 80 ? 'text-green-600' : assessmentScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {assessmentScore}%
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {assessmentScore >= 80 ? 'Excellent Work!' : assessmentScore >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                    </h3>
                    <p className="text-gray-600">
                      {assessmentScore >= 80 
                        ? 'You have mastered positive and negative integers!' 
                        : assessmentScore >= 60 
                        ? 'You understand most concepts. Review the areas you missed.'
                        : 'Review the lesson content and try again when ready.'
                      }
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Next Steps:</h4>
                    <ul className="text-blue-800 space-y-2 text-left">
                      <li>• Practice more integer problems with Australian contexts</li>
                      <li>• Move on to adding and subtracting integers (AC9M7N02)</li>
                      <li>• Apply integers to real-world financial situations</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};