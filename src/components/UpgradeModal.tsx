import React from 'react';
import { X, Check, Crown, Zap, Gift, Star } from 'lucide-react';
import { TIER_LIMITS, TIER_PRICING, UserTier } from '../Services/userTierManager';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserTier;
  onUpgrade: (tier: UserTier) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  if (!isOpen) return null;

  const tiers: { tier: UserTier; icon: React.ComponentType<any>; gradient: string }[] = [
    { tier: 'free', icon: Gift, gradient: 'from-gray-400 to-gray-600' },
    { tier: 'premium', icon: Zap, gradient: 'from-blue-500 to-blue-700' },
    { tier: 'unlimited', icon: Crown, gradient: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-blue-100 mt-1">Unlock more AI-powered learning</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ tier, icon: Icon, gradient }) => {
              const limits = TIER_LIMITS[tier];
              const pricing = TIER_PRICING[tier];
              const isCurrentTier = currentTier === tier;
              const isPopular = pricing.popular;

              return (
                <div
                  key={tier}
                  className={`relative rounded-2xl border-2 p-6 transition-all ${
                    isCurrentTier
                      ? 'border-blue-500 bg-blue-50'
                      : isPopular
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrentTier && (
                    <div className="absolute -top-3 right-4">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Current Plan
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold capitalize text-gray-900">
                      {tier}
                    </h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${pricing.price}
                      </span>
                      {pricing.price > 0 && (
                        <span className="text-gray-600">/{pricing.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {pricing.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Daily AI Questions</span>
                      <span className="font-semibold text-gray-900">
                        {limits.dailyQuestions === Infinity ? '∞' : limits.dailyQuestions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Monthly AI Questions</span>
                      <span className="font-semibold text-gray-900">
                        {limits.monthlyQuestions === Infinity ? '∞' : limits.monthlyQuestions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Total AI Questions</span>
                      <span className="font-semibold text-gray-900">
                        {limits.totalQuestions === Infinity ? '∞' : limits.totalQuestions.toLocaleString()}
                      </span>
                    </div>
                    
                    <hr className="my-4" />
                    
                    {limits.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {limits.features.length > 4 && (
                      <div className="text-xs text-gray-500 mt-2">
                        +{limits.features.length - 4} more features
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onUpgrade(tier)}
                    disabled={isCurrentTier}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                      isCurrentTier
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : tier === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : `bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg`
                    }`}
                  >
                    {isCurrentTier
                      ? 'Current Plan'
                      : tier === 'free'
                      ? 'Downgrade to Free'
                      : `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`
                    }
                  </button>
                </div>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-700">Feature</th>
                    <th className="text-center py-2 text-gray-700">Free</th>
                    <th className="text-center py-2 text-blue-700">Premium</th>
                    <th className="text-center py-2 text-purple-700">Unlimited</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Question History</td>
                    <td className="text-center py-2">Last 10</td>
                    <td className="text-center py-2">Unlimited</td>
                    <td className="text-center py-2">Unlimited + Search</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Analytics</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅ Basic</td>
                    <td className="text-center py-2">✅ Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Export Solutions</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅ PDF</td>
                    <td className="text-center py-2">✅ PDF, Word, More</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Priority Support</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅ Email</td>
                    <td className="text-center py-2">✅ Email + Chat</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Advertisements</td>
                    <td className="text-center py-2">Yes</td>
                    <td className="text-center py-2">No</td>
                    <td className="text-center py-2">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};