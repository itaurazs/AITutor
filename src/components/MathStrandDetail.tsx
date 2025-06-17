import React, { useState } from 'react';
import { ArrowLeft, Calculator, Variable, Ruler, Shapes, BarChart3, Dice6, CheckCircle, Play, Lock, Award, Clock, BookOpen, Target, MapPin, DollarSign } from 'lucide-react';
import { MathStrand } from '../data/mathStrands';
import { SampleQuestions } from './SampleQuestions';

const iconMap = {
  Calculator,
  Variable,
  Ruler,
  Shapes,
  BarChart: BarChart3,
  Dice: Dice6,
};

interface MathStrandDetailProps {
  strand: MathStrand;
  onBack: () => void;
  onQuestionSelect: (question: string) => void;
}

export const MathStrandDetail: React.FC<MathStrandDetailProps> = ({ 
  strand, 
  onBack, 
  onQuestionSelect 
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const IconComponent = iconMap[strand.icon as keyof typeof iconMap] || Calculator;

  const mockLessons = strand.topics.map((topic, index) => ({
    id: `lesson-${index + 1}`,
    title: topic,
    duration: '15-20 min',
    difficulty: index < 2 ? 'Beginner' : index < 5 ? 'Intermediate' : 'Advanced',
    completed: index < strand.completedLessons,
    locked: false // For now, no lessons are locked
  }));

  // Australian context examples for Number strand
  const getAustralianContextExamples = () => {
    if (strand.id === 'number') {
      return [
        {
          title: "Australian Retail & GST",
          icon: DollarSign,
          examples: [
            "Woolworths, Coles pricing with 10% GST",
            "JB Hi-Fi electronics with GST calculations",
            "Bunnings hardware store discounts"
          ]
        },
        {
          title: "Australian Geography & Numbers",
          icon: MapPin,
          examples: [
            "AFL crowd sizes (MCG: 100,024 capacity)",
            "City populations (Sydney: 5.3M, Melbourne: 5.1M)",
            "Distances (Sydney to Melbourne: 878km)"
          ]
        },
        {
          title: "Australian Financial Context",
          icon: Calculator,
          examples: [
            "Australian interest rates (RBA cash rate)",
            "School test scores and percentages",
            "Weather probabilities in Australian cities"
          ]
        }
      ];
    }
    return [];
  };

  const australianExamples = getAustralianContextExamples();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className={`${strand.bgColor} rounded-2xl shadow-sm border border-current p-4 sm:p-6`}>
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 ${strand.color} hover:opacity-80 transition-opacity mb-3 sm:mb-4 touch-manipulation`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm sm:text-base">Back to Mathematics Overview</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
            <IconComponent className={`h-8 w-8 sm:h-10 sm:w-10 ${strand.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
              <h1 className={`text-2xl sm:text-3xl font-bold ${strand.color}`}>{strand.name}</h1>
              <div className="bg-green-100 text-green-800 text-xs px-2 sm:px-3 py-1 rounded-full font-semibold w-fit">
                Australian Curriculum v9.0
              </div>
            </div>
            <p className={`text-sm sm:text-lg ${strand.color.replace('600', '700')}`}>
              {strand.description}
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">{strand.progress}%</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Progress</span>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">{strand.completedLessons}/{strand.totalLessons}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Lessons</span>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">{Math.ceil(strand.totalLessons * 18)}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Minutes</span>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">{strand.topics.length}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Topics</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Australian Context Examples (for Number strand) */}
          {australianExamples.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Australian Context Examples</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Real-world Australian examples used in this strand</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {australianExamples.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-3 sm:p-4 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{category.title}</h3>
                      </div>
                      <ul className="space-y-1">
                        {category.examples.map((example, exIndex) => (
                          <li key={exIndex} className="text-xs text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lessons/Topics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Learning Path</h2>
            <div className="space-y-2 sm:space-y-3">
              {mockLessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${
                    lesson.completed
                      ? 'border-green-200 bg-green-50'
                      : lesson.locked
                      ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                  onClick={() => !lesson.locked && setSelectedTopic(lesson.title)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        lesson.completed
                          ? 'bg-green-500 text-white'
                          : lesson.locked
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : lesson.locked ? (
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">{lesson.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-1">
                          <span>{lesson.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          {strand.curriculumCodes && strand.curriculumCodes[index] && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-mono hidden sm:inline">
                              {strand.curriculumCodes[index]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-xs sm:text-sm font-medium ${
                        lesson.completed ? 'text-green-600' :
                        lesson.locked ? 'text-gray-500' : 'text-blue-600'
                      }`}>
                        {lesson.completed ? 'Completed' :
                         lesson.locked ? 'Locked' : 'Start'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Topic Detail */}
          {selectedTopic && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Learning: {selectedTopic}
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
                <p className="text-blue-800 text-sm sm:text-base">
                  This topic covers the fundamental concepts of {selectedTopic.toLowerCase()}. 
                  You'll learn through step-by-step explanations, worked examples with Australian context, and practice questions.
                  {strand.id === 'number' && (
                    <span className="block mt-2 font-medium">
                      🇦🇺 Includes real Australian examples like GST calculations, AFL crowds, and city populations!
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  const sampleQuestion = strand.sampleQuestions[0];
                  if (sampleQuestion) {
                    onQuestionSelect(sampleQuestion);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-sm sm:text-base touch-manipulation"
              >
                Start with a Practice Question
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Sample Questions */}
          <SampleQuestions
            subject={{
              id: strand.id,
              name: strand.name,
              icon: strand.icon,
              color: strand.color,
              bgColor: strand.bgColor,
              description: strand.description,
              available: true,
              sampleQuestions: strand.sampleQuestions
            }}
            onQuestionSelect={onQuestionSelect}
          />

          {/* Learning Tips */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-sm border border-orange-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-orange-900 mb-4">Study Tips for {strand.name}</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-orange-800">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Work through each topic in order for best understanding
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Practice the sample questions before moving on
              </li>
              {strand.id === 'number' && (
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Remember GST is 10% in Australia and often included in prices
                </li>
              )}
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Review previous topics if you're struggling
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Ask questions when concepts aren't clear
              </li>
            </ul>
          </div>

          {/* Curriculum Alignment */}
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-4">Curriculum Alignment</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <span className="text-xs sm:text-sm text-green-800">Australian Curriculum v9.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <span className="text-xs sm:text-sm text-green-800">Year 7 Mathematics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <span className="text-xs sm:text-sm text-green-800">{strand.name} Strand</span>
              </div>
              {strand.curriculumCodes && (
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-green-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-green-900 mb-2">Curriculum Codes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {strand.curriculumCodes.slice(0, 4).map((code, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                        {code}
                      </span>
                    ))}
                    {strand.curriculumCodes.length > 4 && (
                      <span className="text-xs text-green-700">+{strand.curriculumCodes.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};