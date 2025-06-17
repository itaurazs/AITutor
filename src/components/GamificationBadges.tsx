import React from 'react';
import { Award, Star, Flame, Target, Trophy, Zap, Crown, Medal, Shield, Gem } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  requirement: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GamificationBadgesProps {
  userProfile: UserProfile;
}

export const GamificationBadges: React.FC<GamificationBadgesProps> = ({ userProfile }) => {
  const getBadges = (): Badge[] => {
    const totalQuestions = userProfile.progress.totalQuestions;
    const streakDays = userProfile.progress.streakDays;
    const subjectCount = Object.keys(userProfile.progress.subjectStats).length;

    return [
      {
        id: 'first-question',
        name: 'Getting Started',
        description: 'Asked your first question',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        requirement: 'Ask 1 question',
        earned: totalQuestions >= 1,
        rarity: 'common'
      },
      {
        id: 'streak-3',
        name: 'Consistent Learner',
        description: 'Maintained a 3-day learning streak',
        icon: Flame,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        requirement: '3-day streak',
        earned: streakDays >= 3,
        rarity: 'common'
      },
      {
        id: 'streak-7',
        name: 'Week Warrior',
        description: 'Maintained a 7-day learning streak',
        icon: Flame,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        requirement: '7-day streak',
        earned: streakDays >= 7,
        rarity: 'rare'
      },
      {
        id: 'questions-10',
        name: 'Curious Mind',
        description: 'Asked 10 questions',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        requirement: '10 questions',
        earned: totalQuestions >= 10,
        progress: Math.min(totalQuestions, 10),
        maxProgress: 10,
        rarity: 'common'
      },
      {
        id: 'questions-50',
        name: 'Knowledge Seeker',
        description: 'Asked 50 questions',
        icon: Trophy,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        requirement: '50 questions',
        earned: totalQuestions >= 50,
        progress: Math.min(totalQuestions, 50),
        maxProgress: 50,
        rarity: 'rare'
      },
      {
        id: 'questions-100',
        name: 'Scholar',
        description: 'Asked 100 questions',
        icon: Medal,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: '100 questions',
        earned: totalQuestions >= 100,
        progress: Math.min(totalQuestions, 100),
        maxProgress: 100,
        rarity: 'epic'
      },
      {
        id: 'multi-subject',
        name: 'Well-Rounded',
        description: 'Used 3 different subjects',
        icon: Shield,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        requirement: '3 subjects',
        earned: subjectCount >= 3,
        progress: Math.min(subjectCount, 3),
        maxProgress: 3,
        rarity: 'rare'
      },
      {
        id: 'all-subjects',
        name: 'Renaissance Student',
        description: 'Used all 6 subjects',
        icon: Crown,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        requirement: 'All 6 subjects',
        earned: subjectCount >= 6,
        progress: Math.min(subjectCount, 6),
        maxProgress: 6,
        rarity: 'legendary'
      },
      {
        id: 'streak-30',
        name: 'Dedication Master',
        description: 'Maintained a 30-day learning streak',
        icon: Gem,
        color: 'text-pink-600',
        bgColor: 'bg-pink-100',
        requirement: '30-day streak',
        earned: streakDays >= 30,
        rarity: 'legendary'
      },
      // Strand-specific badges
      {
        id: 'number-champion',
        name: 'Number Champion',
        description: 'Mastered the Number strand',
        icon: Trophy,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        requirement: 'Complete Number strand',
        earned: (userProfile.progress.subjectStats['number']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      },
      {
        id: 'algebra-explorer',
        name: 'Algebra Explorer',
        description: 'Mastered the Algebra strand',
        icon: Zap,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        requirement: 'Complete Algebra strand',
        earned: (userProfile.progress.subjectStats['algebra']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      },
      {
        id: 'measurement-master',
        name: 'Measurement Master',
        description: 'Mastered the Measurement strand',
        icon: Target,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: 'Complete Measurement strand',
        earned: (userProfile.progress.subjectStats['measurement']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      },
      {
        id: 'space-navigator',
        name: 'Space Navigator',
        description: 'Mastered the Space & Geometry strand',
        icon: Star,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        requirement: 'Complete Space & Geometry strand',
        earned: (userProfile.progress.subjectStats['space']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      },
      {
        id: 'statistics-detective',
        name: 'Statistics Detective',
        description: 'Mastered the Statistics strand',
        icon: Shield,
        color: 'text-teal-600',
        bgColor: 'bg-teal-100',
        requirement: 'Complete Statistics strand',
        earned: (userProfile.progress.subjectStats['statistics']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      },
      {
        id: 'probability-prophet',
        name: 'Probability Prophet',
        description: 'Mastered the Probability strand',
        icon: Gem,
        color: 'text-pink-600',
        bgColor: 'bg-pink-100',
        requirement: 'Complete Probability strand',
        earned: (userProfile.progress.subjectStats['probability']?.questionsAsked || 0) >= 10,
        rarity: 'epic'
      }
    ];
  };

  const badges = getBadges();
  const earnedBadges = badges.filter(badge => badge.earned);
  const nextBadges = badges.filter(badge => !badge.earned).slice(0, 3);

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'shadow-blue-200';
      case 'epic': return 'shadow-purple-200';
      case 'legendary': return 'shadow-yellow-200';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Achievements & Badges
          </h3>
          <p className="text-sm text-gray-600">
            {earnedBadges.length} of {badges.length} badges earned
          </p>
        </div>
        <div className="bg-yellow-100 p-2 rounded-lg">
          <Award className="h-5 w-5 text-yellow-600" />
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Earned Badges</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {earnedBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`border-2 rounded-xl p-3 text-center ${getRarityBorder(badge.rarity)} ${getRarityGlow(badge.rarity)} shadow-sm`}
                >
                  <div className={`${badge.bgColor} p-2 rounded-lg w-fit mx-auto mb-2`}>
                    <Icon className={`h-5 w-5 ${badge.color}`} />
                  </div>
                  <h5 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h5>
                  <p className="text-xs text-gray-600 line-clamp-2">{badge.description}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                      badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Badges to Earn */}
      {nextBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Next Achievements</h4>
          <div className="space-y-3">
            {nextBadges.map((badge) => {
              const Icon = badge.icon;
              const progressPercentage = badge.progress && badge.maxProgress 
                ? (badge.progress / badge.maxProgress) * 100 
                : 0;

              return (
                <div
                  key={badge.id}
                  className="border border-gray-200 rounded-lg p-3 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-900 text-sm">{badge.name}</h5>
                        <span className="text-xs text-gray-500">{badge.requirement}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {earnedBadges.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Start Your Journey</h4>
          <p className="text-gray-600 text-sm">
            Ask your first question to earn your first badge!
          </p>
        </div>
      )}
    </div>
  );
};