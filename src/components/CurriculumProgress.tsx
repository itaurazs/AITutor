import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Target, Award, Download, ExternalLink } from 'lucide-react';
import { UserProfile } from '../services/authService';
import { year7MathStrands } from '../data/mathStrands';

interface CurriculumProgressProps {
  userProfile: UserProfile;
  strandProgress: any[];
}

export const CurriculumProgress: React.FC<CurriculumProgressProps> = ({ 
  userProfile, 
  strandProgress 
}) => {
  const [selectedStrand, setSelectedStrand] = useState<string | null>(null);

  // Australian Curriculum v9.0 achievement levels
  const achievementLevels = [
    { level: 'Working Towards', color: 'bg-red-100 text-red-800', description: 'Beginning to demonstrate understanding' },
    { level: 'At Standard', color: 'bg-yellow-100 text-yellow-800', description: 'Demonstrates expected understanding' },
    { level: 'Above Standard', color: 'bg-green-100 text-green-800', description: 'Demonstrates thorough understanding' }
  ];

  const getCurriculumCoverage = () => {
    const totalCodes = year7MathStrands.reduce((acc, strand) => acc + (strand.curriculumCodes?.length || 0), 0);
    const completedCodes = strandProgress.reduce((acc, strand) => {
      const completionRate = strand.progress / 100;
      return acc + Math.floor((strand.curriculumCodes?.length || 0) * completionRate);
    }, 0);
    
    return {
      total: totalCodes,
      completed: completedCodes,
      percentage: totalCodes > 0 ? (completedCodes / totalCodes) * 100 : 0
    };
  };

  const curriculumCoverage = getCurriculumCoverage();

  const getAchievementLevel = (progress: number) => {
    if (progress >= 80) return achievementLevels[2];
    if (progress >= 60) return achievementLevels[1];
    return achievementLevels[0];
  };

  return (
    <div className="space-y-6">
      {/* Curriculum Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Australian Curriculum v9.0 Progress</h3>
            <p className="text-gray-600">Year 7 Mathematics Coverage</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-300">
            <div className="text-2xl font-bold text-green-900">{curriculumCoverage.percentage.toFixed(0)}%</div>
            <div className="text-sm text-green-700">Curriculum Coverage</div>
            <div className="text-xs text-gray-600 mt-1">
              {curriculumCoverage.completed} of {curriculumCoverage.total} outcomes
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="text-2xl font-bold text-blue-900">6</div>
            <div className="text-sm text-blue-700">Mathematics Strands</div>
            <div className="text-xs text-gray-600 mt-1">All strands covered</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <div className="text-2xl font-bold text-purple-900">{userProfile.progress.totalQuestions}</div>
            <div className="text-sm text-purple-700">Total Questions</div>
            <div className="text-xs text-gray-600 mt-1">Across all strands</div>
          </div>
        </div>
      </div>

      {/* Strand-by-Strand Curriculum Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Curriculum Outcomes by Strand</h4>
        
        <div className="space-y-4">
          {strandProgress.map((strand) => {
            const achievementLevel = getAchievementLevel(strand.progress);
            const isSelected = selectedStrand === strand.id;
            
            return (
              <div key={strand.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedStrand(isSelected ? null : strand.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${strand.bgColor}`}>
                        <div className={`h-5 w-5 ${strand.color}`}></div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{strand.name}</h5>
                        <p className="text-sm text-gray-600">{strand.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${achievementLevel.color}`}>
                        {achievementLevel.level}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{strand.progress.toFixed(0)}%</div>
                        <div className="text-xs text-gray-500">
                          {strand.curriculumCodes?.length || 0} outcomes
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${strand.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {isSelected && strand.curriculumCodes && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h6 className="font-semibold text-gray-900 mb-3">Curriculum Outcomes</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {strand.curriculumCodes.map((code: string, index: number) => {
                        const isCompleted = (index / strand.curriculumCodes.length) * 100 < strand.progress;
                        const topic = strand.topics[index] || 'Topic not specified';
                        
                        return (
                          <div 
                            key={code}
                            className={`p-3 rounded-lg border ${
                              isCompleted 
                                ? 'border-green-300 bg-green-50' 
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm font-semibold text-blue-600">{code}</span>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Clock className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{topic}</p>
                            <div className={`text-xs mt-1 ${
                              isCompleted ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {isCompleted ? 'Completed' : 'In Progress'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Levels Guide */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Australian Curriculum Achievement Levels</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievementLevels.map((level, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${level.color}`}>
                {level.level}
              </div>
              <p className="text-sm text-gray-600">{level.description}</p>
              <div className="text-xs text-gray-500 mt-2">
                {index === 0 && '0-59% mastery'}
                {index === 1 && '60-79% mastery'}
                {index === 2 && '80-100% mastery'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Resources */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Curriculum Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="flex items-center space-x-3 mb-2">
              <ExternalLink className="h-5 w-5 text-blue-600" />
              <h5 className="font-semibold text-gray-900">Australian Curriculum</h5>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Official curriculum documents and achievement standards
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Official Curriculum →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="flex items-center space-x-3 mb-2">
              <Download className="h-5 w-5 text-blue-600" />
              <h5 className="font-semibold text-gray-900">Progress Report</h5>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Download detailed curriculum progress report
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Download Report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};