import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, Clock, HelpCircle, Lightbulb } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface HintUsageData {
  level: number;
  count: number;
  helpful: number;
  subject: string;
  timestamp: Date;
}

interface StrugglePattern {
  topic: string;
  frequency: number;
  commonMistakes: string[];
  recommendedHelp: string;
  difficulty: 'low' | 'medium' | 'high';
}

interface LearningAnalyticsProps {
  userProfile: UserProfile;
  hintUsageHistory: HintUsageData[];
  onRecommendation: (topic: string, action: string) => void;
}

export const LearningAnalytics: React.FC<LearningAnalyticsProps> = ({
  userProfile,
  hintUsageHistory,
  onRecommendation
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [showDetails, setShowDetails] = useState(false);

  // Analyze hint usage patterns
  const analyzeHintUsage = () => {
    const timeframeDays = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 365;
    const cutoffDate = new Date(Date.now() - timeframeDays * 24 * 60 * 60 * 1000);
    
    const recentHints = hintUsageHistory.filter(hint => hint.timestamp >= cutoffDate);
    
    const totalHints = recentHints.length;
    const helpfulHints = recentHints.filter(hint => hint.helpful).length;
    const helpfulnessRate = totalHints > 0 ? (helpfulHints / totalHints) * 100 : 0;
    
    const levelDistribution = [1, 2, 3, 4].map(level => ({
      level,
      count: recentHints.filter(hint => hint.level === level).length,
      percentage: totalHints > 0 ? (recentHints.filter(hint => hint.level === level).length / totalHints) * 100 : 0
    }));

    const subjectBreakdown = recentHints.reduce((acc, hint) => {
      acc[hint.subject] = (acc[hint.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalHints,
      helpfulnessRate,
      levelDistribution,
      subjectBreakdown,
      averageLevel: totalHints > 0 ? recentHints.reduce((sum, hint) => sum + hint.level, 0) / totalHints : 0
    };
  };

  // Identify struggle patterns
  const identifyStrugglePatterns = (): StrugglePattern[] => {
    const patterns: StrugglePattern[] = [];
    
    // Analyze hint frequency by topic
    const topicHints = hintUsageHistory.reduce((acc, hint) => {
      const topic = hint.subject;
      if (!acc[topic]) {
        acc[topic] = { total: 0, level3Plus: 0, unhelpful: 0 };
      }
      acc[topic].total++;
      if (hint.level >= 3) acc[topic].level3Plus++;
      if (!hint.helpful) acc[topic].unhelpful++;
      return acc;
    }, {} as Record<string, { total: number; level3Plus: number; unhelpful: number }>);

    Object.entries(topicHints).forEach(([topic, data]) => {
      const frequency = data.total;
      const difficultyScore = (data.level3Plus / data.total) * 100;
      const unhelpfulRate = (data.unhelpful / data.total) * 100;
      
      let difficulty: 'low' | 'medium' | 'high' = 'low';
      if (difficultyScore > 60 || unhelpfulRate > 40) difficulty = 'high';
      else if (difficultyScore > 30 || unhelpfulRate > 20) difficulty = 'medium';

      if (frequency >= 3) { // Only include topics with significant hint usage
        patterns.push({
          topic,
          frequency,
          commonMistakes: getCommonMistakes(topic),
          recommendedHelp: getRecommendedHelp(topic, difficulty),
          difficulty
        });
      }
    });

    return patterns.sort((a, b) => b.frequency - a.frequency);
  };

  const getCommonMistakes = (topic: string): string[] => {
    const mistakes: Record<string, string[]> = {
      'Number': [
        'Decimal place errors',
        'Fraction simplification',
        'Percentage conversion mistakes',
        'GST calculation errors'
      ],
      'Algebra': [
        'Not doing same operation to both sides',
        'Order of operations confusion',
        'Variable isolation errors',
        'Sign errors when moving terms'
      ],
      'Measurement': [
        'Unit conversion mistakes',
        'Formula selection errors',
        'Area vs perimeter confusion',
        'Scale factor miscalculations'
      ],
      'Space & Geometry': [
        'Angle relationship confusion',
        'Coordinate plotting errors',
        'Transformation direction mistakes',
        'Shape property confusion'
      ],
      'Statistics': [
        'Mean vs median confusion',
        'Data interpretation errors',
        'Graph reading mistakes',
        'Range calculation errors'
      ],
      'Probability': [
        'Probability scale confusion',
        'Event independence misunderstanding',
        'Fraction to percentage errors',
        'Complementary event mistakes'
      ]
    };
    
    return mistakes[topic] || ['General problem-solving difficulties'];
  };

  const getRecommendedHelp = (topic: string, difficulty: 'low' | 'medium' | 'high'): string => {
    if (difficulty === 'high') {
      return `Focus on ${topic} fundamentals with extra practice and step-by-step guidance`;
    } else if (difficulty === 'medium') {
      return `Review ${topic} concepts and practice with worked examples`;
    } else {
      return `Continue practicing ${topic} with occasional concept reinforcement`;
    }
  };

  // Calculate improvement metrics
  const calculateImprovement = () => {
    const recentHints = hintUsageHistory.slice(-20); // Last 20 hints
    const olderHints = hintUsageHistory.slice(-40, -20); // Previous 20 hints
    
    if (olderHints.length === 0) return null;
    
    const recentAvgLevel = recentHints.reduce((sum, hint) => sum + hint.level, 0) / recentHints.length;
    const olderAvgLevel = olderHints.reduce((sum, hint) => sum + hint.level, 0) / olderHints.length;
    
    const improvement = ((olderAvgLevel - recentAvgLevel) / olderAvgLevel) * 100;
    
    return {
      improvement,
      recentAvgLevel,
      olderAvgLevel,
      trend: improvement > 5 ? 'improving' : improvement < -5 ? 'struggling' : 'stable'
    };
  };

  const analytics = analyzeHintUsage();
  const strugglePatterns = identifyStrugglePatterns();
  const improvement = calculateImprovement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Learning Analytics</h3>
              <p className="text-gray-600 text-sm">Track your help usage and learning patterns</p>
            </div>
          </div>
          
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Hints</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{analytics.totalHints}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Helpfulness</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{analytics.helpfulnessRate.toFixed(0)}%</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Avg Level</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">{analytics.averageLevel.toFixed(1)}</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Improvement</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {improvement ? `${improvement.improvement > 0 ? '+' : ''}${improvement.improvement.toFixed(0)}%` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Trend */}
      {improvement && (
        <div className={`rounded-xl border p-4 ${
          improvement.trend === 'improving' ? 'bg-green-50 border-green-200' :
          improvement.trend === 'struggling' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              improvement.trend === 'improving' ? 'bg-green-100' :
              improvement.trend === 'struggling' ? 'bg-red-100' :
              'bg-blue-100'
            }`}>
              <TrendingUp className={`h-5 w-5 ${
                improvement.trend === 'improving' ? 'text-green-600' :
                improvement.trend === 'struggling' ? 'text-red-600' :
                'text-blue-600'
              }`} />
            </div>
            <div>
              <h4 className={`font-semibold ${
                improvement.trend === 'improving' ? 'text-green-900' :
                improvement.trend === 'struggling' ? 'text-red-900' :
                'text-blue-900'
              }`}>
                {improvement.trend === 'improving' && 'Great Progress! 🎉'}
                {improvement.trend === 'struggling' && 'Need More Support 💪'}
                {improvement.trend === 'stable' && 'Steady Learning 📈'}
              </h4>
              <p className={`text-sm ${
                improvement.trend === 'improving' ? 'text-green-800' :
                improvement.trend === 'struggling' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {improvement.trend === 'improving' && 
                  `You're using hints less often - showing improved understanding!`
                }
                {improvement.trend === 'struggling' && 
                  `You're needing more help lately - let's focus on building stronger foundations.`
                }
                {improvement.trend === 'stable' && 
                  `Your hint usage is consistent - you're learning at a steady pace.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hint Level Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Hint Level Usage</h4>
        <div className="space-y-3">
          {analytics.levelDistribution.map((level) => (
            <div key={level.level} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-600">Level {level.level}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${level.percentage}%` }}
                ></div>
              </div>
              <div className="w-16 text-sm text-gray-900 text-right">
                {level.count} ({level.percentage.toFixed(0)}%)
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Lower levels indicate better understanding. Level 1-2 hints are ideal!</p>
        </div>
      </div>

      {/* Struggle Patterns */}
      {strugglePatterns.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Areas Needing Attention</h4>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>
          
          <div className="space-y-4">
            {strugglePatterns.slice(0, showDetails ? undefined : 3).map((pattern, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                pattern.difficulty === 'high' ? 'border-red-200 bg-red-50' :
                pattern.difficulty === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold text-gray-900">{pattern.topic}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      pattern.difficulty === 'high' ? 'bg-red-100 text-red-800' :
                      pattern.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pattern.difficulty} difficulty
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {pattern.frequency} hints requested
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{pattern.recommendedHelp}</p>
                
                {showDetails && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-900 mb-2">Common Issues:</h6>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {pattern.commonMistakes.map((mistake, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => onRecommendation(pattern.topic, pattern.recommendedHelp)}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Get Personalized Help →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject Breakdown */}
      {Object.keys(analytics.subjectBreakdown).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Help Requests by Subject</h4>
          <div className="space-y-3">
            {Object.entries(analytics.subjectBreakdown)
              .sort(([,a], [,b]) => b - a)
              .map(([subject, count]) => {
                const percentage = (count / analytics.totalHints) * 100;
                return (
                  <div key={subject} className="flex items-center space-x-3">
                    <div className="w-24 text-sm text-gray-600">{subject}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-sm text-gray-900 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>
          <h4 className="font-semibold text-blue-900">Personalized Recommendations</h4>
        </div>
        
        <div className="space-y-3">
          {analytics.averageLevel > 2.5 && (
            <div className="flex items-start space-x-2">
              <Target className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-blue-800 text-sm">
                Focus on building stronger foundations - you're often needing detailed guidance.
              </p>
            </div>
          )}
          
          {analytics.helpfulnessRate < 60 && (
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <p className="text-orange-800 text-sm">
                Try different learning approaches - current hints aren't always helping.
              </p>
            </div>
          )}
          
          {improvement && improvement.trend === 'improving' && (
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <p className="text-green-800 text-sm">
                Keep up the excellent progress! You're becoming more independent.
              </p>
            </div>
          )}
          
          {analytics.totalHints === 0 && (
            <div className="flex items-start space-x-2">
              <HelpCircle className="h-4 w-4 text-purple-600 mt-0.5" />
              <p className="text-purple-800 text-sm">
                Don't hesitate to ask for hints when you're stuck - they're here to help you learn!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};