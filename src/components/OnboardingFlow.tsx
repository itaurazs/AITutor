import React, { useState } from 'react';
import { X, Target, Clock, User, CheckCircle, ArrowRight, Play, BookOpen, Award } from 'lucide-react';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  learningGoal: 'catch-up' | 'keep-pace' | 'get-ahead';
  topicsPerWeek: number;
  studyTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
  hasAccount: boolean;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(preferences as UserPreferences);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome to Your AI Tutor!</h2>
              <p className="text-blue-100 mt-1">Let's personalize your learning experience</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-blue-700 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: How it Works */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Play className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How Your AI Tutor Works</h3>
                <p className="text-gray-600 text-lg mb-6">
                  In just 30 seconds, learn how we'll help you master Year 7 Mathematics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-green-600 font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ask Questions</h4>
                  <p className="text-gray-600 text-sm">Type any Year 7 maths question in plain English</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Get Step-by-Step Help</h4>
                  <p className="text-gray-600 text-sm">Receive detailed explanations with Australian examples</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
                  <p className="text-gray-600 text-sm">See your improvement across all curriculum strands</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <div className="text-left">
                    <h4 className="font-semibold text-yellow-900">Australian Curriculum v9.0 Aligned</h4>
                    <p className="text-yellow-800 text-sm">All content follows official Australian mathematics standards</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Learning Goal */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">What's Your Learning Goal?</h3>
                <p className="text-gray-600">This helps us recommend the right pace for you</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'catch-up',
                    title: 'Catch Up',
                    description: 'I need help with topics I\'ve missed or struggled with',
                    icon: '📚',
                    recommended: false
                  },
                  {
                    id: 'keep-pace',
                    title: 'Keep Pace',
                    description: 'I want to stay on track with my current Year 7 class',
                    icon: '🎯',
                    recommended: true
                  },
                  {
                    id: 'get-ahead',
                    title: 'Get Ahead',
                    description: 'I want to learn topics before they\'re taught in class',
                    icon: '🚀',
                    recommended: false
                  }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => updatePreference('learningGoal', goal.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      preferences.learningGoal === goal.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{goal.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                          {goal.recommended && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{goal.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 ${
                        preferences.learningGoal === goal.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {preferences.learningGoal === goal.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Study Schedule */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">How Many Topics Per Week?</h3>
                <p className="text-gray-600">We'll suggest a study schedule that fits your goal</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { topics: 2, time: '20-30 min', level: 'Light', description: 'Perfect for busy schedules' },
                  { topics: 4, time: '40-60 min', level: 'Balanced', description: 'Recommended for most students' },
                  { topics: 6, time: '60-90 min', level: 'Intensive', description: 'For ambitious learners' }
                ].map((option) => (
                  <button
                    key={option.topics}
                    onClick={() => updatePreference('topicsPerWeek', option.topics)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      preferences.topicsPerWeek === option.topics
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{option.topics}</div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">{option.level}</div>
                    <div className="text-xs text-gray-600 mb-2">{option.time} per week</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Flexible Learning</h4>
                    <p className="text-blue-800 text-sm">You can always adjust your pace later based on your progress</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Account Setup */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
                <p className="text-gray-600">Choose how you'd like to continue your learning journey</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => updatePreference('hasAccount', true)}
                  className={`w-full p-6 rounded-xl border-2 transition-all ${
                    preferences.hasAccount === true
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Create Free Account</h4>
                      <p className="text-gray-600 text-sm mb-2">Track progress, earn badges, and save your work</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Progress Tracking</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Achievement Badges</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Unlimited History</span>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => updatePreference('hasAccount', false)}
                  className={`w-full p-6 rounded-xl border-2 transition-all ${
                    preferences.hasAccount === false
                      ? 'border-gray-500 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Play className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Continue as Guest</h4>
                      <p className="text-gray-600 text-sm mb-2">Try 3 topics for free, no signup required</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">3 Free Topics</span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">No Registration</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Your Personalized Plan</h4>
                <div className="space-y-1 text-sm text-green-800">
                  <p>• Goal: {preferences.learningGoal === 'catch-up' ? 'Catch Up' : preferences.learningGoal === 'keep-pace' ? 'Keep Pace' : 'Get Ahead'}</p>
                  <p>• Pace: {preferences.topicsPerWeek} topics per week</p>
                  <p>• Focus: Australian Curriculum v9.0 aligned content</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Previous</span>
            </button>

            <div className="text-sm text-gray-500">
              🇦🇺 Australian Curriculum v9.0
            </div>

            <button
              onClick={handleNext}
              disabled={
                (step === 2 && !preferences.learningGoal) ||
                (step === 3 && !preferences.topicsPerWeek) ||
                (step === 4 && preferences.hasAccount === undefined)
              }
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              <span>{step === 4 ? 'Start Learning!' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};