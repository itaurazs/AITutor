import React from 'react';
import { Crown, Zap, Gift, AlertCircle } from 'lucide-react';
import { UserTier } from '../Services/userTierManager';

interface UserTierBadgeProps {
  tier: UserTier;
  remainingQuestions?: number;
  onClick?: () => void;
}

export const UserTierBadge: React.FC<UserTierBadgeProps> = ({ 
  tier, 
  remainingQuestions, 
  onClick 
}) => {
  const getTierConfig = (tier: UserTier) => {
    switch (tier) {
      case 'free':
        return {
          icon: Gift,
          label: 'Free',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300'
        };
      case 'premium':
        return {
          icon: Zap,
          label: 'Premium',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-300'
        };
      case 'unlimited':
        return {
          icon: Crown,
          label: 'Unlimited',
          bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-300'
        };
    }
  };

  const config = getTierConfig(tier);
  const Icon = config.icon;

  return (
    <div 
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${config.bgColor} ${config.borderColor}`}
      onClick={onClick}
    >
      <Icon className={`h-4 w-4 ${config.textColor}`} />
      <span className={`text-sm font-semibold ${config.textColor}`}>
        {config.label}
      </span>
      {remainingQuestions !== undefined && remainingQuestions < 10 && (
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-3 w-3 text-orange-500" />
          <span className="text-xs text-orange-600 font-medium">
            {remainingQuestions} left
          </span>
        </div>
      )}
    </div>
  );
};