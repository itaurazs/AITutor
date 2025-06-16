import React from 'react';
import { X, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { UserTier } from '../Services/userTierManager';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: 'daily' | 'monthly' | 'total';
  currentTier: UserTier;
  onUpgrade: () => void;
  resetTime?: string;
}

export const UsageLimitModal: React.FC<UsageLimitModalProps> = ({
  isOpen,
  onClose,
  limitType,
  currentTier,
  onUpgrade,
  resetTime
}) => {
  if (!isOpen) return null;

  const getLimitInfo = () => {
    switch (limitType) {
      case 'daily':
        return {
          title: 'Daily Limit Reached',
          description: 'You\'ve used all your AI questions for today.',
          icon: Clock,
          resetInfo: resetTime ? `Resets in ${resetTime}` : 'Resets at midnight'
        };
      case 'monthly':
        return {
          title: 'Monthly Limit Reached',
          description: 'You\'ve used all your AI questions for this month.',
          icon: TrendingUp,
          resetInfo: 'Resets next month'
        };
      case 'total':
        return {
          title: 'Total Limit Reached',
          description: 'You\'ve reached your total AI question limit.',
          icon: AlertTriangle,
          resetInfo: 'Upgrade to continue learning'
        };
    }
  };

  const info = getLimitInfo();
  const Icon = info.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="h-6 w-6" />
              <h2 className="text-xl font-bold">{info.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">{info.description}</p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800 font-medium">
                {info.resetInfo}
              </span>
            </div>
          </div>

          {currentTier === 'free' && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Upgrade Benefits:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Up to 50 daily AI questions (Premium)</li>
                <li>• Up to ∞ daily AI questions (Unlimited)</li>
                <li>• Advanced explanations & examples</li>
                <li>• No advertisements</li>
                <li>• Priority support</li>
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Browsing
            </button>
            {currentTier === 'free' && (
              <button
                onClick={onUpgrade}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};