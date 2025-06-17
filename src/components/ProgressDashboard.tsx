import React, { useState } from 'react';
import { TrendingUp, Target, Award, Clock, BookOpen, CheckCircle, BarChart3, Calendar, Users, Download, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../services/authService';
import { year7MathStrands } from '../data/mathStrands';
import { CurriculumProgress } from './CurriculumProgress';
import { RecommendationEngine } from './RecommendationEngine';
import { ParentTeacherView } from './ParentTeacherView';

interface ProgressDashboardProps {
  userProfile: UserProfile;
  onClose: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProfile, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'recommendations' | 'parent-teacher'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'term' | 'year'>('month');
  const [showParentView, setShowParentView] = useState(false);

  // Calculate progress statistics
  const calculateStrandProgress = () => {
    return year7MathStrands.map(strand => {
      const subjectStats = userProfile.progress.subjectStats[strand.id] || { questionsAsked: 0, lastUsed: new Date(), favoriteTopics: [] };
      const progress = Math.min((subjectStats.questionsAsked / 10) * 100, 100); // 10 questions = 100% for demo
      
      return {
        ...strand,
        progress,
        questionsAsked: subjectStats.questionsAsked,
        lastUsed: subjectStats.lastUsed,
        timeSpent: subjectStats.questionsAsked * 8, // Estimate 8 minutes per question
        masteryLevel: progress >= 80 ? 'mastered' : progress >= 60 ? 'proficient' : progress >= 40 ? 'developing' : 'beginning'
      };
    });
  };

  const strandProgress = calculateStrandProgress();
  const overallProgress = strandProgress.reduce((acc, strand) => acc + strand.progress, 0) / strandProgress.length;
  const totalTimeSpent = strandProgress.reduce((acc, strand) => acc + strand.timeSpent, 0);
  const masteredStrands = strandProgress.filter(strand => strand.masteryLevel === 'mastered').length;

  const getTimeRangeData = () => {
    const today = new Date();
    const ranges = {
      week: 7,
      month: 30,
      term: 90,
      year: 365
    };
    
    // Mock data for demonstration
    return {
      questionsAsked: Math.floor(Math.random() * 50) + 10,
      timeSpent: Math.floor(Math.random() * 300) + 60,
      topicsCompleted: Math.floor(Math.random() * 15) + 5,
      averageScore: Math.floor(Math.random() * 30) + 70
    };
  };

  const timeRangeData = getTimeRangeData();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'recommendations', label: 'Next Steps', icon: Target },
    { id: 'parent-teacher', label: 'Reports', icon: Users }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Progress Dashboard</h2>
              <p className="text-blue-100 mt-1">Track your learning journey across the Australian Curriculum</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowParentView(!showParentView)}
                className="flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                {showParentView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="text-sm">{showParentView ? 'Student View' : 'Parent View'}</span>
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-white bg-opacity-10 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Time Range Selector */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Learning Overview</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="term">This Term</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{overallProgress.toFixed(0)}%</div>
                      <div className="text-sm text-blue-700">Overall Progress</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900">{masteredStrands}/6</div>
                      <div className="text-sm text-green-700">Strands Mastered</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-900">{totalTimeSpent}m</div>
                      <div className="text-sm text-orange-700">Time Spent</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900">{timeRangeData.averageScore}%</div>
                      <div className="text-sm text-purple-700">Avg. Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strand Progress */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Mathematics Strand Progress</h4>
                <div className="space-y-4">
                  {strandProgress.map((strand) => (
                    <div key={strand.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${strand.bgColor}`}>
                            <div className={`h-5 w-5 ${strand.color}`}></div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{strand.name}</h5>
                            <p className="text-sm text-gray-600">{strand.questionsAsked} questions asked</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{strand.progress.toFixed(0)}%</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            strand.masteryLevel === 'mastered' ? 'bg-green-100 text-green-800' :
                            strand.masteryLevel === 'proficient' ? 'bg-blue-100 text-blue-800' :
                            strand.masteryLevel === 'developing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {strand.masteryLevel}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${strand.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{strand.timeSpent} minutes spent</span>
                        <span>Last used: {strand.lastUsed.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas Needing Practice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-yellow-900 mb-4">Areas Needing More Practice</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strandProgress
                    .filter(strand => strand.masteryLevel === 'beginning' || strand.masteryLevel === 'developing')
                    .map((strand) => (
                      <div key={strand.id} className="bg-white rounded-lg p-4 border border-yellow-300">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${strand.bgColor}`}>
                            <div className={`h-4 w-4 ${strand.color}`}></div>
                          </div>
                          <h5 className="font-semibold text-gray-900">{strand.name}</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {strand.progress < 40 ? 'Needs significant practice' : 'Developing well, keep practicing'}
                        </p>
                        <div className="text-xs text-yellow-700">
                          Recommended: 2-3 questions per day
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <CurriculumProgress 
              userProfile={userProfile}
              strandProgress={strandProgress}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationEngine 
              userProfile={userProfile}
              strandProgress={strandProgress}
            />
          )}

          {activeTab === 'parent-teacher' && (
            <ParentTeacherView 
              userProfile={userProfile}
              strandProgress={strandProgress}
              showParentView={showParentView}
            />
          )}
        </div>
      </div>
    </div>
  );
};