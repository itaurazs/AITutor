import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Clock, BookOpen, Target, Users, Download, Mail, Settings, AlertTriangle, CheckCircle, BarChart3, MapPin } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface Child {
  id: string;
  name: string;
  email: string;
  avatar: string;
  grade: string;
  profile: UserProfile;
  lastActive: Date;
  weeklyGoal: number;
  currentStreak: number;
}

interface ParentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  parentProfile: UserProfile;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  isOpen,
  onClose,
  parentProfile
}) => {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'term'>('week');
  const [showSettings, setShowSettings] = useState(false);

  // Mock children data - in real app, this would come from the database
  const [children] = useState<Child[]>([
    {
      id: 'child1',
      name: 'Sarah Chen',
      email: 'sarah.chen@student.edu.au',
      avatar: '/avatars/avatar2.svg',
      grade: 'Year 7',
      profile: {
        ...parentProfile,
        displayName: 'Sarah Chen',
        progress: {
          totalQuestions: 45,
          subjectStats: {
            'number': { questionsAsked: 15, lastUsed: new Date(), favoriteTopics: [] },
            'algebra': { questionsAsked: 12, lastUsed: new Date(), favoriteTopics: [] },
            'measurement': { questionsAsked: 8, lastUsed: new Date(), favoriteTopics: [] }
          },
          streakDays: 7,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      },
      lastActive: new Date(),
      weeklyGoal: 15,
      currentStreak: 7
    },
    {
      id: 'child2',
      name: 'Marcus Chen',
      email: 'marcus.chen@student.edu.au',
      avatar: '/avatars/avatar3.svg',
      grade: 'Year 9',
      profile: {
        ...parentProfile,
        displayName: 'Marcus Chen',
        progress: {
          totalQuestions: 23,
          subjectStats: {
            'number': { questionsAsked: 8, lastUsed: new Date(), favoriteTopics: [] },
            'algebra': { questionsAsked: 15, lastUsed: new Date(), favoriteTopics: [] }
          },
          streakDays: 3,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      },
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      weeklyGoal: 10,
      currentStreak: 3
    }
  ]);

  if (!isOpen) return null;

  const selectedChildData = selectedChild ? children.find(c => c.id === selectedChild) : children[0];

  const getWeeklyProgress = (child: Child) => {
    // Mock weekly data - in real app, this would be calculated from actual usage
    return {
      questionsThisWeek: Math.floor(Math.random() * child.weeklyGoal) + 5,
      timeThisWeek: Math.floor(Math.random() * 180) + 60,
      topicsCompleted: Math.floor(Math.random() * 8) + 3,
      averageScore: Math.floor(Math.random() * 30) + 70
    };
  };

  const getCurriculumProgress = (child: Child) => {
    const strands = ['Number', 'Algebra', 'Measurement', 'Space & Geometry', 'Statistics', 'Probability'];
    return strands.map(strand => ({
      name: strand,
      progress: Math.floor(Math.random() * 100),
      questionsAsked: child.profile.progress.subjectStats[strand.toLowerCase()]?.questionsAsked || 0,
      lastUsed: new Date()
    }));
  };

  const getRecentActivity = (child: Child) => {
    return [
      {
        date: new Date(),
        activity: 'Completed 3 algebra problems',
        timeSpent: 25,
        strand: 'Algebra'
      },
      {
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        activity: 'Mastered fractions with decimals',
        timeSpent: 18,
        strand: 'Number'
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        activity: 'Practiced area calculations',
        timeSpent: 22,
        strand: 'Measurement'
      }
    ];
  };

  const getRecommendations = (child: Child) => {
    const weakestStrand = Object.entries(child.profile.progress.subjectStats)
      .sort(([,a], [,b]) => a.questionsAsked - b.questionsAsked)[0];
    
    return [
      `${child.name} is ready for advanced fractions`,
      `Consider focusing more time on ${weakestStrand?.[0] || 'algebra'} this week`,
      `Great progress in measurement - encourage continued practice`,
      `${child.name} learns best in 15-20 minute sessions`
    ];
  };

  const handleDownloadReport = () => {
    // Generate and download progress report
    console.log('Downloading progress report for', selectedChildData?.name);
  };

  const handleSendEmail = () => {
    // Send email report
    console.log('Sending email report for', selectedChildData?.name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Parent Dashboard</h2>
              <p className="text-green-100 mt-1">Monitor your children's learning progress</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* Child Selector */}
          <div className="mt-4 flex space-x-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  selectedChild === child.id || (!selectedChild && child === children[0])
                    ? 'bg-white text-green-600'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold">{child.name}</div>
                  <div className="text-xs opacity-75">{child.grade}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {selectedChildData && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{selectedChildData.currentStreak}</div>
                      <div className="text-sm text-blue-700">Day Streak</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900">
                        {getWeeklyProgress(selectedChildData).timeThisWeek}m
                      </div>
                      <div className="text-sm text-green-700">This Week</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900">
                        {getWeeklyProgress(selectedChildData).topicsCompleted}
                      </div>
                      <div className="text-sm text-purple-700">Topics Completed</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Target className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-900">
                        {getWeeklyProgress(selectedChildData).averageScore}%
                      </div>
                      <div className="text-sm text-orange-700">Avg. Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Map */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Curriculum Progress Map</h3>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="term">This Term</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getCurriculumProgress(selectedChildData).map((strand, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{strand.name}</h4>
                        <span className="text-lg font-bold text-gray-900">{strand.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${strand.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {strand.questionsAsked} questions • Last used: {strand.lastUsed.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {getRecentActivity(selectedChildData).map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.activity}</div>
                          <div className="text-sm text-gray-600">
                            {activity.strand} • {activity.timeSpent} minutes
                          </div>
                          <div className="text-xs text-gray-500">
                            {activity.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {getRecommendations(selectedChildData).map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerts & Concerns */}
              {selectedChildData.lastActive < new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-yellow-900">Attention Needed</h4>
                      <p className="text-yellow-800 text-sm">
                        {selectedChildData.name} hasn't practiced in {Math.floor((Date.now() - selectedChildData.lastActive.getTime()) / (24 * 60 * 60 * 1000))} days. 
                        Consider sending a gentle reminder.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Report</span>
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Report</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Adjust Goals</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};