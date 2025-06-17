import React from 'react';
import { Target, TrendingUp, Clock, BookOpen, Zap, ArrowRight, Star, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface RecommendationEngineProps {
  userProfile: UserProfile;
  strandProgress: any[];
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ 
  userProfile, 
  strandProgress 
}) => {
  // Generate personalized recommendations
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Find weakest strand
    const weakestStrand = strandProgress.reduce((min, strand) => 
      strand.progress < min.progress ? strand : min
    );
    
    // Find strongest strand
    const strongestStrand = strandProgress.reduce((max, strand) => 
      strand.progress > max.progress ? strand : max
    );
    
    // Daily practice recommendation
    if (userProfile.progress.streakDays < 7) {
      recommendations.push({
        type: 'habit',
        priority: 'high',
        title: 'Build a Learning Habit',
        description: 'Practice 2-3 questions daily to build consistency',
        action: 'Start with 10 minutes per day',
        timeEstimate: '10 min/day',
        icon: Clock,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      });
    }
    
    // Weak area focus
    if (weakestStrand.progress < 40) {
      recommendations.push({
        type: 'focus',
        priority: 'high',
        title: `Focus on ${weakestStrand.name}`,
        description: `Your ${weakestStrand.name} needs attention. Start with basic concepts.`,
        action: `Practice ${weakestStrand.name} fundamentals`,
        timeEstimate: '15-20 min',
        icon: Target,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      });
    }
    
    // Strength building
    if (strongestStrand.progress > 70) {
      recommendations.push({
        type: 'advance',
        priority: 'medium',
        title: `Advance Your ${strongestStrand.name}`,
        description: `You're doing well! Try more challenging ${strongestStrand.name} problems.`,
        action: 'Tackle advanced questions',
        timeEstimate: '20-25 min',
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    }
    
    // Review recommendation
    const lastWeekActivity = Object.values(userProfile.progress.subjectStats)
      .filter(stat => {
        const daysSince = (Date.now() - new Date(stat.lastUsed).getTime()) / (1000 * 60 * 60 * 24);
        return daysSince > 7;
      });
    
    if (lastWeekActivity.length > 0) {
      recommendations.push({
        type: 'review',
        priority: 'medium',
        title: 'Review Previous Topics',
        description: 'Revisit topics you haven\'t practiced recently to maintain knowledge.',
        action: 'Quick review session',
        timeEstimate: '10-15 min',
        icon: BookOpen,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      });
    }
    
    // Balanced learning
    const unevenProgress = Math.max(...strandProgress.map(s => s.progress)) - 
                          Math.min(...strandProgress.map(s => s.progress));
    
    if (unevenProgress > 40) {
      recommendations.push({
        type: 'balance',
        priority: 'medium',
        title: 'Balance Your Learning',
        description: 'Your progress varies significantly across strands. Focus on weaker areas.',
        action: 'Practice neglected strands',
        timeEstimate: '15-20 min',
        icon: Star,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const recommendations = generateRecommendations();

  // Generate next topics to study
  const getNextTopics = () => {
    return strandProgress
      .filter(strand => strand.progress < 100)
      .sort((a, b) => a.progress - b.progress)
      .slice(0, 3)
      .map(strand => {
        const nextTopicIndex = Math.floor((strand.progress / 100) * strand.topics.length);
        const nextTopic = strand.topics[nextTopicIndex] || strand.topics[strand.topics.length - 1];
        
        return {
          strand: strand.name,
          topic: nextTopic,
          difficulty: strand.progress < 30 ? 'Beginner' : strand.progress < 70 ? 'Intermediate' : 'Advanced',
          estimatedTime: '15-20 min',
          color: strand.color,
          bgColor: strand.bgColor
        };
      });
  };

  const nextTopics = getNextTopics();

  // Study plan for the week
  const generateWeeklyPlan = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = [];
    
    // Distribute strands across the week
    const activeStrands = strandProgress.filter(s => s.progress < 100);
    
    days.forEach((day, index) => {
      const strand = activeStrands[index % activeStrands.length];
      const isWeekend = index >= 5;
      
      plan.push({
        day,
        strand: strand.name,
        focus: strand.progress < 40 ? 'Foundation building' : 'Skill development',
        duration: isWeekend ? '20-30 min' : '15-20 min',
        questions: isWeekend ? '3-4 questions' : '2-3 questions',
        color: strand.color,
        bgColor: strand.bgColor
      });
    });
    
    return plan;
  };

  const weeklyPlan = generateWeeklyPlan();

  return (
    <div className="space-y-6">
      {/* Personalized Recommendations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div 
                key={index}
                className={`border-2 rounded-xl p-4 ${rec.borderColor} ${rec.bgColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-white`}>
                      <Icon className={`h-5 w-5 ${rec.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {rec.priority} priority
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>⏱️ {rec.timeEstimate}</span>
                        <span>🎯 {rec.action}</span>
                      </div>
                    </div>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${rec.color} bg-white hover:bg-gray-50 border border-current`}>
                    Start Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Topics to Study */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Next Topics to Study</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nextTopics.map((topic, index) => (
            <div key={index} className={`border-2 rounded-xl p-4 ${topic.bgColor} border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">{topic.strand}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {topic.difficulty}
                </span>
              </div>
              <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">{topic.topic}</h5>
              <div className="text-sm text-gray-600 mb-3">
                Estimated time: {topic.estimatedTime}
              </div>
              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${topic.color} bg-white hover:bg-gray-50 border border-current`}>
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Study Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Weekly Study Plan</h4>
        <p className="text-gray-600 mb-6">A personalized plan based on your current progress and learning goals.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeklyPlan.map((day, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-900">{day.day}</h5>
                <span className="text-sm text-gray-500">{day.duration}</span>
              </div>
              <div className={`text-sm font-medium mb-1 ${day.color}`}>
                {day.strand}
              </div>
              <p className="text-sm text-gray-600 mb-2">{day.focus}</p>
              <div className="text-xs text-gray-500">
                Target: {day.questions}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-gray-900">Pro Tip</span>
          </div>
          <p className="text-sm text-gray-700">
            Consistency is key! Even 15 minutes of daily practice is more effective than longer, infrequent sessions. 
            Try to stick to your plan and adjust as needed based on your progress.
          </p>
        </div>
      </div>

      {/* Learning Analytics */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Learning Analytics</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Optimal Study Times</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Morning (8-10 AM)</span>
                <span className="text-sm font-semibold text-green-600">Best for new concepts</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Afternoon (2-4 PM)</span>
                <span className="text-sm font-semibold text-blue-600">Good for practice</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                <span className="text-sm">Evening (6-8 PM)</span>
                <span className="text-sm font-semibold text-purple-600">Ideal for review</span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Learning Patterns</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">You learn best with short, frequent sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Visual examples help your understanding</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">You prefer step-by-step explanations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};