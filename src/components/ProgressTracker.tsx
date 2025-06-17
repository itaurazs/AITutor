import React from 'react';
import { TrendingUp, Target, Clock, Award, CheckCircle, BarChart3 } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface ProgressTrackerProps {
  userProfile: UserProfile;
  compact?: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  userProfile, 
  compact = false 
}) => {
  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    
    // Mock weekly data - in real app, this would come from user activity
    return {
      questionsThisWeek: Math.floor(Math.random() * 20) + 5,
      timeThisWeek: Math.floor(Math.random() * 180) + 60,
      streakDays: userProfile.progress.streakDays,
      weeklyGoal: 15,
      completedDays: Math.min(userProfile.progress.streakDays, 7)
    };
  };

  const weeklyData = getWeeklyProgress();
  const progressPercentage = (weeklyData.questionsThisWeek / weeklyData.weeklyGoal) * 100;

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Weekly Progress</h3>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Questions</span>
              <span className="font-medium">{weeklyData.questionsThisWeek}/{weeklyData.weeklyGoal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-orange-600">{weeklyData.streakDays}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{weeklyData.timeThisWeek}m</div>
              <div className="text-xs text-gray-600">This Week</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Progress Tracker</h3>
          <p className="text-sm text-gray-600">Your learning journey this week</p>
        </div>
        <div className="bg-blue-100 p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
          <span className="text-sm text-gray-600">
            {weeklyData.questionsThisWeek} / {weeklyData.weeklyGoal} questions
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 relative"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            {progressPercentage >= 100 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {progressPercentage >= 100 ? '🎉 Goal achieved!' : `${(100 - progressPercentage).toFixed(0)}% to go`}
        </div>
      </div>

      {/* Daily Activity */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Daily Activity</h4>
        <div className="flex space-x-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const isCompleted = index < weeklyData.completedDays;
            const isToday = index === new Date().getDay();
            
            return (
              <div key={day} className="flex-1 text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isToday 
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-500' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle className="h-3 w-3" /> : day.charAt(0)}
                </div>
                <div className="text-xs text-gray-500">{day}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">{userProfile.progress.totalQuestions}</span>
          </div>
          <div className="text-xs text-gray-600">Total Questions</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-lg font-bold text-gray-900">{weeklyData.timeThisWeek}m</span>
          </div>
          <div className="text-xs text-gray-600">This Week</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">{Object.keys(userProfile.progress.subjectStats).length}</span>
          </div>
          <div className="text-xs text-gray-600">Subjects</div>
        </div>
      </div>
    </div>
  );
};