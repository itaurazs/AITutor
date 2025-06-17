import React, { useState } from 'react';
import { Award, Lock, Star, Trophy, Target, Flame, Crown, Medal, Shield, Gem, Filter, Search } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface BadgesPageProps {
  userProfile: UserProfile;
  onClose: () => void;
}

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
  category: 'progress' | 'strand' | 'special' | 'streak';
  earnedDate?: Date;
}

export const BadgesPage: React.FC<BadgesPageProps> = ({ userProfile, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'progress' | 'strand' | 'special' | 'streak'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getAllBadges = (): Badge[] => {
    const totalQuestions = userProfile.progress.totalQuestions;
    const streakDays = userProfile.progress.streakDays;
    const subjectCount = Object.keys(userProfile.progress.subjectStats).length;

    return [
      // Progress Badges
      {
        id: 'getting-started',
        name: 'Getting Started',
        description: 'Asked your first question',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        requirement: 'Ask 1 question',
        earned: totalQuestions >= 1,
        rarity: 'common',
        category: 'progress',
        earnedDate: totalQuestions >= 1 ? new Date() : undefined
      },
      {
        id: 'curious-mind',
        name: 'Curious Mind',
        description: 'Asked 10 questions',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        requirement: '10 questions',
        earned: totalQuestions >= 10,
        progress: Math.min(totalQuestions, 10),
        maxProgress: 10,
        rarity: 'common',
        category: 'progress'
      },
      {
        id: 'half-way-hero',
        name: 'Half Way Hero',
        description: 'Reached 25 questions',
        icon: Medal,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        requirement: '25 questions',
        earned: totalQuestions >= 25,
        progress: Math.min(totalQuestions, 25),
        maxProgress: 25,
        rarity: 'rare',
        category: 'progress'
      },
      {
        id: 'knowledge-seeker',
        name: 'Knowledge Seeker',
        description: 'Asked 50 questions',
        icon: Trophy,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        requirement: '50 questions',
        earned: totalQuestions >= 50,
        progress: Math.min(totalQuestions, 50),
        maxProgress: 50,
        rarity: 'rare',
        category: 'progress'
      },
      {
        id: 'almost-there',
        name: 'Almost There',
        description: 'Reached 75 questions',
        icon: Crown,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: '75 questions',
        earned: totalQuestions >= 75,
        progress: Math.min(totalQuestions, 75),
        maxProgress: 75,
        rarity: 'epic',
        category: 'progress'
      },
      {
        id: 'year7-graduate',
        name: 'Year 7 Graduate',
        description: 'Completed 100 questions',
        icon: Gem,
        color: 'text-pink-600',
        bgColor: 'bg-pink-100',
        requirement: '100 questions',
        earned: totalQuestions >= 100,
        progress: Math.min(totalQuestions, 100),
        maxProgress: 100,
        rarity: 'legendary',
        category: 'progress'
      },

      // Strand Mastery Badges
      {
        id: 'number-champion',
        name: 'Number Champion',
        description: 'Mastered the Number strand',
        icon: Trophy,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        requirement: 'Complete Number strand',
        earned: (userProfile.progress.subjectStats['number']?.questionsAsked || 0) >= 10,
        rarity: 'epic',
        category: 'strand'
      },
      {
        id: 'algebra-explorer',
        name: 'Algebra Explorer',
        description: 'Mastered the Algebra strand',
        icon: Target,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        requirement: 'Complete Algebra strand',
        earned: (userProfile.progress.subjectStats['algebra']?.questionsAsked || 0) >= 10,
        rarity: 'epic',
        category: 'strand'
      },
      {
        id: 'measurement-master',
        name: 'Measurement Master',
        description: 'Mastered the Measurement strand',
        icon: Medal,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: 'Complete Measurement strand',
        earned: (userProfile.progress.subjectStats['measurement']?.questionsAsked || 0) >= 10,
        rarity: 'epic',
        category: 'strand'
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
        rarity: 'epic',
        category: 'strand'
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
        rarity: 'epic',
        category: 'strand'
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
        rarity: 'epic',
        category: 'strand'
      },

      // Streak Badges
      {
        id: 'consistent-learner',
        name: 'Consistent Learner',
        description: 'Maintained a 3-day learning streak',
        icon: Flame,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        requirement: '3-day streak',
        earned: streakDays >= 3,
        rarity: 'common',
        category: 'streak'
      },
      {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Maintained a 7-day learning streak',
        icon: Flame,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        requirement: '7-day streak',
        earned: streakDays >= 7,
        rarity: 'rare',
        category: 'streak'
      },
      {
        id: 'dedication-master',
        name: 'Dedication Master',
        description: 'Maintained a 30-day learning streak',
        icon: Crown,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: '30-day streak',
        earned: streakDays >= 30,
        rarity: 'legendary',
        category: 'streak'
      },

      // Special Badges
      {
        id: 'well-rounded',
        name: 'Well-Rounded',
        description: 'Used 3 different subjects',
        icon: Shield,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        requirement: '3 subjects',
        earned: subjectCount >= 3,
        progress: Math.min(subjectCount, 3),
        maxProgress: 3,
        rarity: 'rare',
        category: 'special'
      },
      {
        id: 'renaissance-student',
        name: 'Renaissance Student',
        description: 'Used all 6 subjects',
        icon: Crown,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        requirement: 'All 6 subjects',
        earned: subjectCount >= 6,
        progress: Math.min(subjectCount, 6),
        maxProgress: 6,
        rarity: 'legendary',
        category: 'special'
      },
      {
        id: 'weekend-warrior',
        name: 'Weekend Warrior',
        description: 'Studied on a weekend',
        icon: Star,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        requirement: 'Study on weekend',
        earned: false, // Would need weekend tracking
        rarity: 'common',
        category: 'special'
      },
      {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Studied before 8 AM',
        icon: Target,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        requirement: 'Study before 8 AM',
        earned: false, // Would need time tracking
        rarity: 'common',
        category: 'special'
      },
      {
        id: 'problem-solver',
        name: 'Problem Solver',
        description: 'Solved a challenging problem',
        icon: Trophy,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        requirement: 'Solve hard problem',
        earned: totalQuestions >= 5,
        rarity: 'rare',
        category: 'special'
      },
      {
        id: 'help-seeker',
        name: 'Help Seeker',
        description: 'Asked for help when needed',
        icon: Medal,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        requirement: 'Ask for help',
        earned: totalQuestions >= 1,
        rarity: 'common',
        category: 'special'
      }
    ];
  };

  const badges = getAllBadges();
  const earnedBadges = badges.filter(badge => badge.earned);
  const lockedBadges = badges.filter(badge => !badge.earned);

  const filteredBadges = badges.filter(badge => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'earned' && badge.earned) || 
                         (filter === 'locked' && !badge.earned);
    
    const matchesCategory = categoryFilter === 'all' || badge.category === categoryFilter;
    
    const matchesSearch = searchTerm === '' || 
                         badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-200';
      case 'epic': return 'border-purple-400 shadow-purple-200';
      case 'rare': return 'border-blue-400 shadow-blue-200';
      default: return 'border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string, earned: boolean) => {
    if (!earned) return '';
    switch (rarity) {
      case 'legendary': return 'shadow-lg shadow-yellow-200 animate-pulse';
      case 'epic': return 'shadow-lg shadow-purple-200';
      case 'rare': return 'shadow-md shadow-blue-200';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Achievement Badges</h2>
              <p className="text-yellow-100 mt-1">
                {earnedBadges.length} of {badges.length} badges earned
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              ✕
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{earnedBadges.length}</div>
              <div className="text-sm text-yellow-100">Earned</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{lockedBadges.length}</div>
              <div className="text-sm text-yellow-100">Locked</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">
                {earnedBadges.filter(b => b.rarity === 'legendary').length}
              </div>
              <div className="text-sm text-yellow-100">Legendary</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">
                {Math.round((earnedBadges.length / badges.length) * 100)}%
              </div>
              <div className="text-sm text-yellow-100">Complete</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'earned', 'locked'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    filter === filterType
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="progress">Progress</option>
              <option value="strand">Strand Mastery</option>
              <option value="streak">Streak</option>
              <option value="special">Special</option>
            </select>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`border-2 rounded-xl p-4 transition-all ${getRarityBorder(badge.rarity)} ${
                    badge.earned 
                      ? `${badge.bgColor} ${getRarityGlow(badge.rarity, badge.earned)}` 
                      : 'bg-gray-50 opacity-75'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${badge.earned ? badge.bgColor : 'bg-gray-200'}`}>
                      {badge.earned ? (
                        <Icon className={`h-6 w-6 ${badge.color}`} />
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {badge.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
                          badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                          badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                          badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {badge.rarity}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{badge.category}</span>
                      </div>
                    </div>
                  </div>

                  <p className={`text-sm mb-3 ${badge.earned ? 'text-gray-700' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>

                  <div className="text-xs text-gray-600 mb-2">
                    Requirement: {badge.requirement}
                  </div>

                  {badge.progress !== undefined && badge.maxProgress && !badge.earned && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}/{badge.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {badge.earned && badge.earnedDate && (
                    <div className="text-xs text-gray-500">
                      Earned: {badge.earnedDate.toLocaleDateString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};