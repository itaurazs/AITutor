import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Target, Award, Zap, Star } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface StreakTrackerProps {
  userProfile: UserProfile;
  onStreakMilestone?: (days: number) => void;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({ 
  userProfile, 
  onStreakMilestone 
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [milestoneReached, setMilestoneReached] = useState<number | null>(null);

  const streakDays = userProfile.progress.streakDays;
  const milestones = [3, 7, 14, 30, 60, 100];

  // Check for milestone achievements
  useEffect(() => {
    const lastMilestone = milestones
      .filter(m => m <= streakDays)
      .sort((a, b) => b - a)[0];

    if (lastMilestone && lastMilestone !== milestoneReached) {
      setMilestoneReached(lastMilestone);
      setShowCelebration(true);
      onStreakMilestone?.(lastMilestone);
      
      // Auto-hide celebration after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [streakDays]);

  const getStreakEmoji = (days: number) => {
    if (days >= 100) return '🏆';
    if (days >= 60) return '💎';
    if (days >= 30) return '🔥';
    if (days >= 14) return '⚡';
    if (days >= 7) return '🌟';
    if (days >= 3) return '✨';
    return '💫';
  };

  const getStreakColor = (days: number) => {
    if (days >= 100) return 'text-yellow-600';
    if (days >= 60) return 'text-purple-600';
    if (days >= 30) return 'text-red-600';
    if (days >= 14) return 'text-orange-600';
    if (days >= 7) return 'text-blue-600';
    if (days >= 3) return 'text-green-600';
    return 'text-gray-600';
  };

  const getStreakBg = (days: number) => {
    if (days >= 100) return 'bg-yellow-100';
    if (days >= 60) return 'bg-purple-100';
    if (days >= 30) return 'bg-red-100';
    if (days >= 14) return 'bg-orange-100';
    if (days >= 7) return 'bg-blue-100';
    if (days >= 3) return 'bg-green-100';
    return 'bg-gray-100';
  };

  const getNextMilestone = () => {
    return milestones.find(m => m > streakDays) || null;
  };

  const nextMilestone = getNextMilestone();
  const progressToNext = nextMilestone ? (streakDays / nextMilestone) * 100 : 100;

  return (
    <div className="relative">
      {/* Celebration Animation */}
      {showCelebration && milestoneReached && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-400 animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {milestoneReached} Day Streak!
              </h3>
              <p className="text-gray-600">
                {milestoneReached >= 30 ? 'Incredible dedication!' :
                 milestoneReached >= 14 ? 'Amazing consistency!' :
                 milestoneReached >= 7 ? 'Great momentum!' :
                 'Keep it up!'}
              </p>
            </div>
          </div>
          
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                {['🎉', '⭐', '🔥', '💫', '✨'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Streak Display */}
      <div className={`${getStreakBg(streakDays)} rounded-xl p-4 border-2 ${
        streakDays >= 30 ? 'border-red-300' :
        streakDays >= 14 ? 'border-orange-300' :
        streakDays >= 7 ? 'border-blue-300' :
        streakDays >= 3 ? 'border-green-300' :
        'border-gray-300'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getStreakEmoji(streakDays)}</div>
            <div>
              <div className={`text-2xl font-bold ${getStreakColor(streakDays)}`}>
                {streakDays}
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
          
          {streakDays > 0 && (
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {streakDays === 1 ? 'Great start!' :
                 streakDays < 7 ? 'Building momentum!' :
                 streakDays < 14 ? 'On fire!' :
                 streakDays < 30 ? 'Unstoppable!' :
                 'Legend!'}
              </div>
              {nextMilestone && (
                <div className="text-xs text-gray-600">
                  {nextMilestone - streakDays} days to {nextMilestone}-day milestone
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress to Next Milestone */}
        {nextMilestone && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress to {nextMilestone} days</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  streakDays >= 30 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                  streakDays >= 14 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                  streakDays >= 7 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-green-500 to-blue-500'
                }`}
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Milestone Badges */}
        <div className="flex flex-wrap gap-1">
          {milestones.map((milestone) => (
            <div
              key={milestone}
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                streakDays >= milestone
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {milestone}d
            </div>
          ))}
        </div>

        {/* Motivation Message */}
        {streakDays === 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800 font-medium">
                Start your learning streak today! 🚀
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};