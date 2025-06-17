import React from 'react';
import { CheckCircle, Target, TrendingUp, Award, ArrowRight, BarChart3, Clock, Star } from 'lucide-react';
import { AssessmentResults as Results } from './AssessmentQuiz';

interface AssessmentResultsProps {
  isOpen: boolean;
  onClose: () => void;
  results: Results;
  onStartLearning: (strand: string) => void;
  onCreateAccount: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  isOpen,
  onClose,
  results,
  onStartLearning,
  onCreateAccount
}) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  const strands = [
    { name: 'Number', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Algebra', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Measurement', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'Space & Geometry', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { name: 'Statistics', color: 'text-teal-600', bgColor: 'bg-teal-50' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`${getScoreBg(results.totalScore)} border-b-4 ${
          results.totalScore >= 80 ? 'border-green-500' :
          results.totalScore >= 60 ? 'border-blue-500' :
          results.totalScore >= 40 ? 'border-yellow-500' : 'border-orange-500'
        } p-6 rounded-t-2xl`}>
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${getScoreBg(results.totalScore)} border-4 ${
              results.totalScore >= 80 ? 'border-green-500' :
              results.totalScore >= 60 ? 'border-blue-500' :
              results.totalScore >= 40 ? 'border-yellow-500' : 'border-orange-500'
            } flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${getScoreColor(results.totalScore)}`}>
                {Math.round(results.totalScore)}%
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
            <p className="text-lg text-gray-700">{results.personalizedMessage}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Strengths and Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900">Your Strengths</h3>
              </div>
              {results.strengths.length > 0 ? (
                <div className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 font-medium">{strength}</span>
                    </div>
                  ))}
                  <p className="text-green-700 text-sm mt-3">
                    Great work! You have a solid understanding in these areas.
                  </p>
                </div>
              ) : (
                <p className="text-green-700">
                  We'll help you build strengths as you learn! Everyone starts somewhere.
                </p>
              )}
            </div>

            {/* Areas to Improve */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">Let's Focus On</h3>
              </div>
              {results.gaps.length > 0 ? (
                <div className="space-y-2">
                  {results.gaps.map((gap, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 font-medium">{gap}</span>
                    </div>
                  ))}
                  <p className="text-blue-700 text-sm mt-3">
                    Perfect! These are great areas to focus on for improvement.
                  </p>
                </div>
              ) : (
                <p className="text-blue-700">
                  You're doing well across all areas! Let's deepen your understanding.
                </p>
              )}
            </div>
          </div>

          {/* Progress Wheel */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Your Year 7 Mathematics Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {strands.map((strand) => {
                const score = results.strandScores[strand.name] || 0;
                const percentage = score * 100; // Since each strand has 1 question
                
                return (
                  <div key={strand.name} className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-3 rounded-full ${strand.bgColor} border-4 ${
                      percentage === 100 ? 'border-green-500' : 
                      percentage === 0 ? 'border-gray-300' : 'border-yellow-500'
                    } flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${strand.color}`}>
                        {percentage}%
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{strand.name}</h4>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      percentage === 100 ? 'bg-green-100 text-green-800' :
                      percentage === 0 ? 'bg-gray-100 text-gray-600' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {percentage === 100 ? 'Strong' : percentage === 0 ? 'Focus Area' : 'Developing'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Starting Point */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900">Recommended Starting Point</h3>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Start with: {results.recommendedStartingStrand}
              </h4>
              <p className="text-gray-700 mb-4">
                Based on your assessment, we recommend beginning with {results.recommendedStartingStrand} topics. 
                This will help build a strong foundation for your Year 7 mathematics journey.
              </p>
              <button
                onClick={() => onStartLearning(results.recommendedStartingStrand)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center space-x-2"
              >
                <span>Start Learning {results.recommendedStartingStrand}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Master Year 7 Maths?</h3>
            <p className="text-blue-100 mb-6">
              Create your free account to track progress, earn achievements, and get personalized learning paths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onCreateAccount}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onStartLearning(results.recommendedStartingStrand)}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold border border-blue-500"
              >
                Continue as Guest (3 free topics)
              </button>
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};