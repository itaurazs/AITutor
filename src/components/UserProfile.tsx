import React, { useState } from 'react';
import { User, Settings, LogOut, Crown, Zap, Gift, TrendingUp, Calendar, Award, Target } from 'lucide-react';
import { authService, UserProfile as UserProfileType } from '../services/authService';
import { subscriptionService } from '../services/subscriptionService';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfileType;
  onSignOut: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSignOut
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You\'ll keep access until the end of your billing period.')) {
      return;
    }

    setIsLoading(true);
    try {
      await subscriptionService.cancelSubscription();
      // Refresh user profile or show success message
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'unlimited': return <Crown className="h-4 w-4 text-purple-600" />;
      default: return <Gift className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unlimited': return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStreakEmoji = (days: number) => {
    if (days >= 30) return '🔥';
    if (days >= 14) return '⚡';
    if (days >= 7) return '🌟';
    if (days >= 3) return '✨';
    return '💫';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userProfile.displayName}</h2>
                <p className="text-blue-100">{userProfile.email}</p>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border mt-2 ${getTierColor(userProfile.tier)}`}>
                  {getTierIcon(userProfile.tier)}
                  <span className="text-sm font-semibold capitalize">{userProfile.tier}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{userProfile.progress.totalQuestions}</div>
              <div className="text-sm text-blue-700">Total Questions</div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900 flex items-center justify-center">
                {getStreakEmoji(userProfile.progress.streakDays)}
                {userProfile.progress.streakDays}
              </div>
              <div className="text-sm text-green-700">Day Streak</div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">
                {Object.keys(userProfile.progress.subjectStats).length}
              </div>
              <div className="text-sm text-purple-700">Subjects Used</div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{userProfile.usage.daily.count}</div>
              <div className="text-sm text-orange-700">Today's Questions</div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Daily Questions Used</span>
                <span className="font-semibold">{userProfile.usage.daily.count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Monthly Questions Used</span>
                <span className="font-semibold">{userProfile.usage.monthly.count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Questions Asked</span>
                <span className="font-semibold">{userProfile.usage.total}</span>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          {Object.keys(userProfile.progress.subjectStats).length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(userProfile.progress.subjectStats)
                  .sort(([,a], [,b]) => b.questionsAsked - a.questionsAsked)
                  .map(([subject, stats]) => (
                    <div key={subject} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-900 capitalize">{subject}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          Last used: {formatDate(stats.lastUsed)}
                        </span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {stats.questionsAsked} questions
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Subscription Info */}
          {userProfile.tier !== 'free' && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Plan</span>
                  <span className="font-semibold capitalize">{userProfile.tier}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    userProfile.subscriptionStatus === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {userProfile.subscriptionStatus}
                  </span>
                </div>
                {userProfile.subscriptionExpiry && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {userProfile.subscriptionStatus === 'cancelled' ? 'Access Until' : 'Renews On'}
                    </span>
                    <span className="font-semibold">
                      {formatDate(userProfile.subscriptionExpiry)}
                    </span>
                  </div>
                )}
              </div>
              
              {userProfile.subscriptionStatus === 'active' && (
                <button
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
                >
                  {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
                </button>
              )}
            </div>
          )}

          {/* Account Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Member Since</span>
                <span className="font-semibold">{formatDate(userProfile.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Last Login</span>
                <span className="font-semibold">{formatDate(userProfile.lastLogin)}</span>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};