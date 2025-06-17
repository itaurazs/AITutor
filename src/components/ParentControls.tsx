import React, { useState } from 'react';
import { Settings, Target, Clock, BarChart3, Download, Bell, Shield, Users } from 'lucide-react';

interface ParentControlsProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  currentSettings: {
    dailyGoal: number;
    weeklyGoal: number;
    difficultyLevel: 'easy' | 'medium' | 'hard' | 'adaptive';
    emailNotifications: boolean;
    weeklyReports: boolean;
    achievementAlerts: boolean;
    concernAlerts: boolean;
    studyTimeLimit: number;
    allowedSubjects: string[];
  };
  onSave: (settings: any) => void;
}

export const ParentControls: React.FC<ParentControlsProps> = ({
  isOpen,
  onClose,
  childName,
  currentSettings,
  onSave
}) => {
  const [settings, setSettings] = useState(currentSettings);
  const [activeTab, setActiveTab] = useState<'goals' | 'notifications' | 'content' | 'reports'>('goals');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSubject = (subject: string) => {
    const newSubjects = settings.allowedSubjects.includes(subject)
      ? settings.allowedSubjects.filter(s => s !== subject)
      : [...settings.allowedSubjects, subject];
    updateSetting('allowedSubjects', newSubjects);
  };

  const tabs = [
    { id: 'goals', label: 'Learning Goals', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'content', label: 'Content Control', icon: Shield },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Parent Controls</h2>
              <p className="text-purple-100 mt-1">Manage {childName}'s learning settings</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-white bg-opacity-10 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Learning Goals Tab */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily & Weekly Goals</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Question Goal
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={settings.dailyGoal}
                        onChange={(e) => updateSetting('dailyGoal', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-8">
                        {settings.dailyGoal}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Recommended: 3-5 questions per day
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Question Goal
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={settings.weeklyGoal}
                        onChange={(e) => updateSetting('weeklyGoal', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-8">
                        {settings.weeklyGoal}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Recommended: 15-25 questions per week
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Difficulty Level</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'easy', label: 'Easy', description: 'Basic concepts' },
                    { value: 'medium', label: 'Medium', description: 'Standard level' },
                    { value: 'hard', label: 'Hard', description: 'Challenging' },
                    { value: 'adaptive', label: 'Adaptive', description: 'Adjusts automatically' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => updateSetting('difficultyLevel', level.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        settings.difficultyLevel === level.value
                          ? 'border-purple-500 bg-purple-50 text-purple-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{level.label}</div>
                      <div className="text-xs text-gray-600">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Study Time Limit</h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={settings.studyTimeLimit}
                    onChange={(e) => updateSetting('studyTimeLimit', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold text-gray-900 w-16">
                    {settings.studyTimeLimit}m
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Maximum daily study time (0 = no limit)
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
              
              <div className="space-y-4">
                {[
                  {
                    key: 'emailNotifications',
                    title: 'Email Notifications',
                    description: 'Receive email updates about learning progress'
                  },
                  {
                    key: 'weeklyReports',
                    title: 'Weekly Summary Reports',
                    description: 'Get detailed weekly progress summaries every Sunday'
                  },
                  {
                    key: 'achievementAlerts',
                    title: 'Achievement Alerts',
                    description: 'Be notified when your child earns new badges or milestones'
                  },
                  {
                    key: 'concernAlerts',
                    title: 'Concern Alerts',
                    description: 'Get alerts if your child hasn\'t practiced for several days'
                  }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[notification.key as keyof typeof settings] as boolean}
                        onChange={(e) => updateSetting(notification.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Notification Schedule</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Weekly reports: Sundays at 6 PM</p>
                  <p>• Achievement alerts: Immediately when earned</p>
                  <p>• Concern alerts: After 3 days of inactivity</p>
                  <p>• Milestone celebrations: Immediately when reached</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Control Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Content & Subject Access</h3>
              
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Allowed Subjects</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Number',
                    'Algebra', 
                    'Measurement',
                    'Space & Geometry',
                    'Statistics',
                    'Probability'
                  ].map((subject) => (
                    <label key={subject} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={settings.allowedSubjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-medium text-gray-900">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Safety Features</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <p>✓ All content is curriculum-aligned and age-appropriate</p>
                  <p>✓ No external links or unsafe content</p>
                  <p>✓ AI responses are filtered for educational content only</p>
                  <p>✓ Progress tracking helps identify learning gaps</p>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Progress Reports</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Weekly Summary</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Comprehensive overview of weekly progress, achievements, and recommendations.
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Download This Week
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Curriculum Report</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Detailed breakdown of Australian Curriculum v9.0 coverage and mastery.
                  </p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Download Curriculum Report
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Parent-Teacher Conference</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Formal report suitable for sharing with teachers and schools.
                  </p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Generate Conference Report
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Achievement Certificate</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Printable certificates for major milestones and achievements.
                  </p>
                  <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                    Create Certificate
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Report Features</h4>
                <div className="text-sm text-purple-800 space-y-1">
                  <p>• Detailed curriculum outcome tracking</p>
                  <p>• Visual progress charts and graphs</p>
                  <p>• Personalized recommendations</p>
                  <p>• Comparison with grade-level expectations</p>
                  <p>• Areas of strength and improvement</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};