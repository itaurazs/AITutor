import React from 'react';
import { ArrowLeft, Star, Quote, GraduationCap, Award, TrendingUp } from 'lucide-react';

interface TestimonialsPageProps {
  onBack: () => void;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  grade?: string;
  subject?: string;
  rating: number;
  text: string;
  highlight: string;
  avatar: string;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onBack }) => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Student',
      grade: 'Grade 11',
      subject: 'Mathematics',
      rating: 5,
      text: 'Your AI Tutor has completely transformed how I approach math problems. The step-by-step explanations help me understand not just the answer, but why each step is necessary. My grades have improved from C+ to A- in just two months!',
      highlight: 'Improved from C+ to A- in 2 months',
      avatar: '👩‍🎓'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      role: 'Student',
      grade: 'Grade 9',
      subject: 'Science',
      rating: 5,
      text: 'Chemistry was my worst subject until I found this platform. The AI breaks down complex reactions into simple steps that actually make sense. I finally understand balancing equations and molecular structures!',
      highlight: 'Finally mastered chemistry concepts',
      avatar: '👨‍🔬'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Parent',
      grade: 'Mother of 2',
      rating: 5,
      text: 'As a parent, I love that my kids can get help anytime they need it. The explanations are clear enough that I can follow along too. It\'s like having a patient tutor available 24/7 at a fraction of the cost.',
      highlight: '24/7 tutoring at affordable cost',
      avatar: '👩‍👧‍👦'
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Student',
      grade: 'Grade 12',
      subject: 'History',
      rating: 5,
      text: 'I was struggling with essay writing and historical analysis. The AI helped me understand how to structure arguments and analyze primary sources. My history teacher noticed the improvement immediately.',
      highlight: 'Dramatically improved essay writing',
      avatar: '📚'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      role: 'Teacher',
      grade: 'High School Math Teacher',
      rating: 5,
      text: 'I recommend Your AI Tutor to all my students. It complements classroom instruction perfectly and helps students who need extra practice. The step-by-step approach aligns with how I teach problem-solving.',
      highlight: 'Perfect complement to classroom teaching',
      avatar: '👩‍🏫'
    },
    {
      id: '6',
      name: 'Alex Patel',
      role: 'Student',
      grade: 'Grade 10',
      subject: 'English',
      rating: 5,
      text: 'Grammar was always confusing for me, but the AI explains rules in a way that sticks. I\'ve gone from dreading English assignments to actually enjoying writing. My confidence has skyrocketed!',
      highlight: 'Transformed from dreading to enjoying English',
      avatar: '✍️'
    },
    {
      id: '7',
      name: 'Jennifer Walsh',
      role: 'Parent & Educator',
      grade: 'Elementary Principal',
      rating: 5,
      text: 'Even though this is designed for older students, the clear explanations help me understand concepts I can then explain to younger learners. It\'s an excellent resource for educators at all levels.',
      highlight: 'Valuable resource for all educators',
      avatar: '👩‍💼'
    },
    {
      id: '8',
      name: 'Ryan Mitchell',
      role: 'Student',
      grade: 'Grade 8',
      subject: 'Geography',
      rating: 5,
      text: 'Geography seemed boring until I started using this platform. The explanations about climate patterns and landforms are so detailed that I can actually visualize what\'s happening. It makes everything click!',
      highlight: 'Made geography fascinating and understandable',
      avatar: '🌍'
    }
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '95%', label: 'Student Satisfaction', icon: Award },
    { number: '78%', label: 'Grade Improvement', icon: TrendingUp },
    { number: '10,000+', label: 'Happy Students', icon: GraduationCap }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Students & Parents Say
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from students, parents, and educators who have experienced 
              the transformative power of AI-powered learning.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.grade && ` • ${testimonial.grade}`}
                    </p>
                    {testimonial.subject && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                        {testimonial.subject}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="h-6 w-6 text-blue-200 absolute -top-2 -left-1" />
                <p className="text-gray-700 leading-relaxed pl-6 mb-4">
                  {testimonial.text}
                </p>
              </div>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800">
                  ✨ {testimonial.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Success Stories by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-gray-700 font-medium">of students report improved grades</p>
              <p className="text-sm text-gray-600 mt-1">within their first month of use</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <p className="text-gray-700 font-medium">say they understand concepts better</p>
              <p className="text-sm text-gray-600 mt-1">compared to traditional study methods</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">96%</div>
              <p className="text-gray-700 font-medium">would recommend to friends</p>
              <p className="text-sm text-gray-600 mt-1">and continue using the platform</p>
            </div>
          </div>
        </div>

        {/* Subject-Specific Success */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Success Across All Subjects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { subject: 'Mathematics', improvement: '89%', icon: '📊' },
              { subject: 'Science', improvement: '84%', icon: '🔬' },
              { subject: 'English', improvement: '91%', icon: '📝' },
              { subject: 'History', improvement: '87%', icon: '📜' },
              { subject: 'Geography', improvement: '83%', icon: '🌍' },
              { subject: 'Economics', improvement: '88%', icon: '📈' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.subject}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">{item.improvement}</div>
                <p className="text-sm text-gray-600">grade improvement rate</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Thousands of Successful Students
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Start your journey to better grades and deeper understanding today. 
            Experience the difference AI-powered learning can make.
          </p>
          <button
            onClick={onBack}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Get Started Free
          </button>
          <p className="text-sm text-blue-200 mt-3">
            No credit card required • Start learning in seconds
          </p>
        </div>
      </div>
    </div>
  );
};