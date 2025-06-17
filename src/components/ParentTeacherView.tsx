import React, { useState } from 'react';
import { Download, Eye, Calendar, TrendingUp, Clock, Award, Target, BookOpen, Users, Mail, Printer } from 'lucide-react';
import { UserProfile } from '../services/authService';

interface ParentTeacherViewProps {
  userProfile: UserProfile;
  strandProgress: any[];
  showParentView: boolean;
}

export const ParentTeacherView: React.FC<ParentTeacherViewProps> = ({ 
  userProfile, 
  strandProgress,
  showParentView 
}) => {
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'curriculum'>('summary');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'term' | 'year'>('month');

  // Generate comprehensive report data
  const generateReportData = () => {
    const totalQuestions = userProfile.progress.totalQuestions;
    const averageProgress = strandProgress.reduce((acc, strand) => acc + strand.progress, 0) / strandProgress.length;
    const strongestStrand = strandProgress.reduce((max, strand) => strand.progress > max.progress ? strand : max);
    const weakestStrand = strandProgress.reduce((min, strand) => strand.progress < min.progress ? strand : min);
    const timeSpent = strandProgress.reduce((acc, strand) => acc + strand.timeSpent, 0);
    
    return {
      overview: {
        totalQuestions,
        averageProgress: averageProgress.toFixed(1),
        timeSpent,
        streakDays: userProfile.progress.streakDays,
        strongestStrand: strongestStrand.name,
        weakestStrand: weakestStrand.name
      },
      achievements: [
        { name: 'First Question', achieved: totalQuestions >= 1, date: '2024-01-15' },
        { name: 'Week Warrior', achieved: userProfile.progress.streakDays >= 7, date: userProfile.progress.streakDays >= 7 ? '2024-01-22' : null },
        { name: 'Knowledge Seeker', achieved: totalQuestions >= 50, date: totalQuestions >= 50 ? '2024-02-01' : null }
      ],
      recommendations: [
        'Continue daily practice to maintain learning momentum',
        `Focus additional time on ${weakestStrand.name} to improve overall balance`,
        'Celebrate progress in ' + strongestStrand.name + ' and use it to build confidence',
        'Consider setting a goal of 3-4 questions per day for optimal progress'
      ]
    };
  };

  const reportData = generateReportData();

  const handleDownloadReport = () => {
    // In a real application, this would generate and download a PDF report
    const reportContent = {
      student: userProfile.displayName,
      dateGenerated: new Date().toLocaleDateString(),
      reportType,
      timeframe,
      data: reportData
    };
    
    console.log('Downloading report:', reportContent);
    alert('Report download would start here. In a real application, this would generate a PDF.');
  };

  const handleEmailReport = () => {
    // In a real application, this would email the report
    alert('Email functionality would be implemented here.');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {showParentView ? 'Parent/Guardian Report' : 'Teacher Report'}
            </h3>
            <p className="text-gray-600">
              Comprehensive progress overview for {userProfile.displayName}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="curriculum">Curriculum Report</option>
            </select>
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handleEmailReport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Email Report</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Student Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Student Overview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">{reportData.overview.averageProgress}%</div>
                <div className="text-sm text-blue-700">Overall Progress</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-300">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900">{reportData.overview.totalQuestions}</div>
                <div className="text-sm text-green-700">Questions Completed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-orange-300">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-900">{reportData.overview.timeSpent}m</div>
                <div className="text-sm text-orange-700">Time Invested</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">{reportData.overview.streakDays}</div>
                <div className="text-sm text-purple-700">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <h5 className="font-semibold text-gray-900 mb-2">Strongest Area</h5>
            <p className="text-green-600 font-medium">{reportData.overview.strongestStrand}</p>
            <p className="text-sm text-gray-600">Showing excellent understanding and progress</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <h5 className="font-semibold text-gray-900 mb-2">Area for Growth</h5>
            <p className="text-orange-600 font-medium">{reportData.overview.weakestStrand}</p>
            <p className="text-sm text-gray-600">Would benefit from additional practice</p>
          </div>
        </div>
      </div>

      {/* Detailed Progress by Strand */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Progress by Mathematics Strand</h4>
        
        <div className="space-y-4">
          {strandProgress.map((strand) => (
            <div key={strand.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${strand.bgColor}`}>
                    <div className={`h-5 w-5 ${strand.color}`}></div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{strand.name}</h5>
                    <p className="text-sm text-gray-600">{strand.questionsAsked} questions completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{strand.progress.toFixed(0)}%</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    strand.masteryLevel === 'mastered' ? 'bg-green-100 text-green-800' :
                    strand.masteryLevel === 'proficient' ? 'bg-blue-100 text-blue-800' :
                    strand.masteryLevel === 'developing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {strand.masteryLevel}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${strand.progress}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Time Spent: </span>
                  <span className="font-medium">{strand.timeSpent} minutes</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Activity: </span>
                  <span className="font-medium">{strand.lastUsed.toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Curriculum Coverage: </span>
                  <span className="font-medium">{Math.floor((strand.progress / 100) * (strand.curriculumCodes?.length || 0))} of {strand.curriculumCodes?.length || 0} outcomes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements and Milestones */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Achievements and Milestones</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportData.achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`border-2 rounded-lg p-4 ${
                achievement.achieved 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  achievement.achieved ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Award className={`h-4 w-4 ${
                    achievement.achieved ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <h5 className="font-semibold text-gray-900">{achievement.name}</h5>
              </div>
              <div className={`text-sm ${
                achievement.achieved ? 'text-green-600' : 'text-gray-500'
              }`}>
                {achievement.achieved 
                  ? `Achieved on ${achievement.date}` 
                  : 'Not yet achieved'
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations for Parents/Teachers */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-yellow-900 mb-4">
          {showParentView ? 'Recommendations for Parents' : 'Teaching Recommendations'}
        </h4>
        
        <div className="space-y-3">
          {reportData.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-yellow-800">{recommendation}</p>
            </div>
          ))}
        </div>
        
        {showParentView && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-300">
            <h5 className="font-semibold text-gray-900 mb-2">How You Can Help at Home</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Encourage daily practice, even if just for 10-15 minutes</li>
              <li>• Celebrate progress and effort, not just correct answers</li>
              <li>• Ask your child to explain what they've learned</li>
              <li>• Connect math to real-world situations (shopping, cooking, etc.)</li>
              <li>• Maintain a positive attitude towards mathematics</li>
            </ul>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Need More Information?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">For Parents</h5>
            <p className="text-sm text-gray-600 mb-2">
              If you have questions about your child's progress or need guidance on how to support their learning at home.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Contact Parent Support →
            </button>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">For Teachers</h5>
            <p className="text-sm text-gray-600 mb-2">
              Access detailed curriculum alignment reports and integration guides for classroom use.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Teacher Resources →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};