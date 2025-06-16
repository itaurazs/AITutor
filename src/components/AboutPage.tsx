import React from 'react';
import { ArrowLeft, Brain, Target, Zap, Users, Award, CheckCircle, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Explanations',
      description: 'Advanced AI provides detailed, step-by-step solutions that help you understand concepts, not just get answers.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: BookOpen,
      title: 'Multi-Subject Support',
      description: 'Comprehensive coverage across Mathematics, Science, English, History, Geography, and Economics.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Target,
      title: 'Step-by-Step Learning',
      description: 'Every solution is broken down into clear, logical steps that build understanding progressively.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate, detailed explanations available 24/7 whenever you need help with your studies.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and streak tracking to stay motivated.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Designed specifically for students grades 7-12 with age-appropriate explanations and examples.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped', icon: Users },
    { number: '50,000+', label: 'Questions Answered', icon: Brain },
    { number: '6', label: 'Subjects Covered', icon: BookOpen },
    { number: '24/7', label: 'Available', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Your AI Tutor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing education with AI-powered, step-by-step explanations that help students 
              truly understand concepts across multiple subjects.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                We believe every student deserves access to personalized, high-quality educational support. 
                Our AI tutor provides instant, detailed explanations that adapt to your learning style, 
                helping you build confidence and master challenging concepts.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Learn Concepts, Not Just Answers</h3>
                  <p className="text-gray-600 text-sm">Understanding the 'why' behind every step</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className={`${feature.bgColor} p-3 rounded-lg w-fit mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Subject</h3>
              <p className="text-gray-600 text-sm">Select from Math, Science, English, History, Geography, or Economics</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ask Question</h3>
              <p className="text-gray-600 text-sm">Type your question or problem in natural language</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Explanation</h3>
              <p className="text-gray-600 text-sm">Receive detailed, step-by-step solutions with explanations</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Learn & Practice</h3>
              <p className="text-gray-600 text-sm">Understand concepts and practice with similar problems</p>
            </div>
          </div>
        </div>

        {/* Subjects Covered */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Subjects We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Mathematics', topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'] },
              { name: 'Science', topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science'] },
              { name: 'English', topics: ['Grammar', 'Literature', 'Writing', 'Language Arts'] },
              { name: 'History', topics: ['World History', 'American History', 'Social Studies', 'Civics'] },
              { name: 'Geography', topics: ['Physical Geography', 'Human Geography', 'Earth Sciences', 'Climate'] },
              { name: 'Economics', topics: ['Basic Economics', 'Supply & Demand', 'Market Systems', 'Finance'] }
            ].map((subject, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{subject.name}</h3>
                <ul className="space-y-1">
                  {subject.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Your AI Tutor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-3">
                {[
                  'Get help anytime, anywhere - 24/7 availability',
                  'Learn at your own pace with personalized explanations',
                  'Build confidence with step-by-step guidance',
                  'Track your progress and maintain learning streaks',
                  'Access to multiple subjects in one platform'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Parents & Educators</h3>
              <ul className="space-y-3">
                {[
                  'Safe, educational environment for learning',
                  'Supplement classroom instruction effectively',
                  'Monitor student progress and engagement',
                  'Cost-effective alternative to private tutoring',
                  'Aligned with curriculum standards'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};