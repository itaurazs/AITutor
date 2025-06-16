import React, { useState } from 'react';
import { ArrowLeft, Calculator, Variable, Ruler, Shapes, BarChart3, Dice6, CheckCircle, Play, Lock, Award, Clock, BookOpen, Target } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${strand.bgColor} rounded-2xl shadow-sm border border-current p-6`}>
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 ${strand.color} hover:opacity-80 transition-opacity mb-4`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Mathematics Overview</span>
        </button>

        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <IconComponent className={`h-10 w-10 ${strand.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className={`text-3xl font-bold ${strand.color}`}>{strand.name}</h1>
              <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                Australian Curriculum v9.0
              </div>
            </div>
            <p className={`text-lg ${strand.color.replace('600', '700')}`}>
              {strand.description}
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{strand.progress}%</span>
            </div>
            <span className="text-sm text-gray-600">Progress</span>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">{strand.completedLessons}/{strand.totalLessons}</span>
            </div>
            <span className="text-sm text-gray-600">Lessons</span>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">{Math.ceil(strand.totalLessons * 18)}</span>
            </div>
            <span className="text-sm text-gray-600">Minutes</span>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">{strand.topics.length}</span>
            </div>
            <span className="text-sm text-gray-600">Topics</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lessons/Topics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Path</h2>
            <div className="space-y-3">
              {mockLessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    lesson.completed
                      ? 'border-green-200 bg-green-50'
                      : lesson.locked
                      ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                  onClick={() => !lesson.locked && setSelectedTopic(lesson.title)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.completed
                          ? 'bg-green-500 text-white'
                          : lesson.locked
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : lesson.locked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{lesson.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Learning: {selectedTopic}
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800">
                  This topic covers the fundamental concepts of {selectedTopic.toLowerCase()}. 
                  You'll learn through step-by-step explanations, worked examples, and practice questions.
                </p>
              </div>
              <button
                onClick={() => {
                  const sampleQuestion = strand.sampleQuestions[0];
                  if (sampleQuestion) {
                    onQuestionSelect(sampleQuestion);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
              >
                Start with a Practice Question
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-sm border border-orange-100 p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Study Tips for {strand.name}</h3>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Work through each topic in order for best understanding
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                Practice the sample questions before moving on
              </li>
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
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Curriculum Alignment</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Australian Curriculum v9.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Year 7 Mathematics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">{strand.name} Strand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};