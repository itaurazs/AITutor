import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, Target, Award, BarChart3, Clock } from 'lucide-react';

interface Question {
  id: string;
  strand: string;
  curriculumCode: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

interface AssessmentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: AssessmentResults) => void;
}

export interface AssessmentResults {
  totalScore: number;
  strandScores: Record<string, number>;
  strengths: string[];
  gaps: string[];
  recommendedStartingStrand: string;
  personalizedMessage: string;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeStarted] = useState(Date.now());

  const questions: Question[] = [
    {
      id: 'q1',
      strand: 'Number',
      curriculumCode: 'AC9M7N02',
      question: 'Sarah buys a jacket at Coles for $45.50. If this price includes 10% GST, what was the original price before GST?',
      options: [
        '$40.95',
        '$41.36',
        '$50.05',
        '$45.50'
      ],
      correctAnswer: 1,
      explanation: 'To find the price before GST: $45.50 ÷ 1.10 = $41.36 (since GST makes the total 110% of the original price)',
      difficulty: 'intermediate'
    },
    {
      id: 'q2',
      strand: 'Algebra',
      curriculumCode: 'AC9M7A01',
      question: 'If y = 3x + 5, what is the value of y when x = 4?',
      options: [
        '12',
        '17',
        '20',
        '9'
      ],
      correctAnswer: 1,
      explanation: 'Substitute x = 4 into the equation: y = 3(4) + 5 = 12 + 5 = 17',
      difficulty: 'basic'
    },
    {
      id: 'q3',
      strand: 'Measurement',
      curriculumCode: 'AC9M7M02',
      question: 'A rectangular AFL field is 150m long and 100m wide. What is its area in square metres?',
      options: [
        '250 m²',
        '500 m²',
        '15,000 m²',
        '1,500 m²'
      ],
      correctAnswer: 2,
      explanation: 'Area of rectangle = length × width = 150m × 100m = 15,000 m²',
      difficulty: 'basic'
    },
    {
      id: 'q4',
      strand: 'Space & Geometry',
      curriculumCode: 'AC9M7SP02',
      question: 'On a coordinate plane, which point is located at (3, -2)?',
      options: [
        '3 units right, 2 units up from origin',
        '3 units right, 2 units down from origin',
        '3 units left, 2 units down from origin',
        '2 units right, 3 units down from origin'
      ],
      correctAnswer: 1,
      explanation: 'The point (3, -2) means 3 units to the right (positive x) and 2 units down (negative y) from the origin',
      difficulty: 'basic'
    },
    {
      id: 'q5',
      strand: 'Statistics',
      curriculumCode: 'AC9M7ST01',
      question: 'The test scores for a class are: 78, 85, 92, 67, 88, 91, 73. What is the median score?',
      options: [
        '85',
        '82',
        '88',
        '91'
      ],
      correctAnswer: 0,
      explanation: 'First arrange in order: 67, 73, 78, 85, 88, 91, 92. The median is the middle value: 85',
      difficulty: 'intermediate'
    }
  ];

  if (!isOpen) return null;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const strandScores: Record<string, number> = {};
    let totalCorrect = 0;

    questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) totalCorrect++;
      
      if (!strandScores[question.strand]) {
        strandScores[question.strand] = 0;
      }
      strandScores[question.strand] += isCorrect ? 1 : 0;
    });

    const totalScore = (totalCorrect / questions.length) * 100;
    
    // Identify strengths and gaps
    const strengths: string[] = [];
    const gaps: string[] = [];
    
    Object.entries(strandScores).forEach(([strand, score]) => {
      if (score === 1) {
        strengths.push(strand);
      } else if (score === 0) {
        gaps.push(strand);
      }
    });

    // Recommend starting strand (prioritize gaps, then lowest scores)
    let recommendedStartingStrand = 'Number'; // Default
    if (gaps.length > 0) {
      recommendedStartingStrand = gaps[0];
    } else {
      const lowestStrand = Object.entries(strandScores).sort(([,a], [,b]) => a - b)[0];
      if (lowestStrand) {
        recommendedStartingStrand = lowestStrand[0];
      }
    }

    const personalizedMessage = generatePersonalizedMessage(totalScore, strengths, gaps);

    const results: AssessmentResults = {
      totalScore,
      strandScores,
      strengths,
      gaps,
      recommendedStartingStrand,
      personalizedMessage
    };

    setShowResults(true);
    onComplete(results);
  };

  const generatePersonalizedMessage = (score: number, strengths: string[], gaps: string[]): string => {
    if (score >= 80) {
      return "Excellent work! You have a strong foundation in Year 7 Mathematics. Let's challenge you with more advanced topics.";
    } else if (score >= 60) {
      return "Good job! You understand many Year 7 concepts. Let's strengthen a few areas to build your confidence.";
    } else if (score >= 40) {
      return "You're on the right track! With some focused practice, you'll master these Year 7 concepts in no time.";
    } else {
      return "No worries - everyone starts somewhere! Let's build your Year 7 maths foundation step by step.";
    }
  };

  const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return null; // Results will be handled by parent component
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Year 7 Maths Assessment</h2>
              <p className="text-green-100 mt-1">Find your starting point • Australian Curriculum v9.0</p>
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
            <div className="flex justify-between text-sm text-green-100 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="w-full bg-green-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          {/* Strand Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {currentQ.strand}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-mono">
              {currentQ.curriculumCode}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              currentQ.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
              currentQ.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQ.difficulty}
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-sm text-gray-500">
              🇦🇺 Australian Curriculum Aligned
            </div>

            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              <span>{currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};