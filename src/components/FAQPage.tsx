import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'What is Your AI Tutor?',
      answer: 'Your AI Tutor is an AI-powered educational platform that provides step-by-step explanations across multiple subjects including Mathematics, Science, English, History, Geography, and Economics. It\'s designed to help students grades 7-12 understand concepts rather than just providing answers.'
    },
    {
      id: '2',
      category: 'general',
      question: 'How does the AI tutoring work?',
      answer: 'Our AI analyzes your question and provides detailed, step-by-step explanations tailored to your learning level. Each solution includes the reasoning behind each step, relevant formulas, calculations, and key learning points to help you understand the underlying concepts.'
    },
    {
      id: '3',
      category: 'subjects',
      question: 'What subjects are covered?',
      answer: 'We cover six main subjects: Mathematics (Algebra, Geometry, Calculus, Statistics), Science (Physics, Chemistry, Biology), English & Grammar (Literature, Writing, Language Arts), History (World History, American History), Geography (Physical and Human Geography), and Economics (Basic Economics, Supply & Demand, Market Systems).'
    },
    {
      id: '4',
      category: 'account',
      question: 'Do I need to create an account?',
      answer: 'You can use basic features without an account, but creating a free account unlocks additional benefits like question history, progress tracking, streak monitoring, and access to AI-powered explanations. Premium accounts offer unlimited questions and advanced features.'
    },
    {
      id: '5',
      category: 'pricing',
      question: 'What are the pricing plans?',
      answer: 'We offer three tiers: Free (5 daily AI questions), Premium ($12.99/month - 50 daily questions, unlimited history, no ads), and Unlimited ($24.99/month - unlimited questions, advanced analytics, priority support). All plans include access to all subjects and basic step-by-step solutions.'
    },
    {
      id: '6',
      category: 'technical',
      question: 'What if the AI doesn\'t understand my question?',
      answer: 'Try rephrasing your question more clearly or breaking it into smaller parts. Include specific details like numbers, formulas, or context. If you\'re still having trouble, our fallback system will provide general guidance, and you can contact support for help.'
    },
    {
      id: '7',
      category: 'account',
      question: 'How do I track my progress?',
      answer: 'Signed-in users can view their learning statistics including daily questions asked, total questions, learning streak, and subject-wise breakdown. Premium users get access to advanced analytics and detailed progress reports.'
    },
    {
      id: '8',
      category: 'technical',
      question: 'Can I use this on mobile devices?',
      answer: 'Yes! Your AI Tutor is fully responsive and works on all devices including smartphones, tablets, laptops, and desktop computers. The interface adapts to your screen size for optimal learning experience.'
    },
    {
      id: '9',
      category: 'pricing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your current billing period, after which your account will revert to the free tier.'
    },
    {
      id: '10',
      category: 'general',
      question: 'Is my data safe and private?',
      answer: 'Absolutely. We take privacy seriously and use industry-standard security measures to protect your data. We don\'t share your personal information or questions with third parties. Your learning data is used only to improve your experience on our platform.'
    },
    {
      id: '11',
      category: 'subjects',
      question: 'What grade levels are supported?',
      answer: 'Our AI Tutor is specifically designed for students in grades 7-12 (middle school and high school). The explanations and examples are tailored to be age-appropriate and align with typical curriculum standards for these grade levels.'
    },
    {
      id: '12',
      category: 'technical',
      question: 'What if I encounter a bug or error?',
      answer: 'If you experience any technical issues, please contact us through our contact form or email us directly at zeyad.sweidan@itaura.com.au. Include details about what you were doing when the error occurred, and we\'ll work to resolve it quickly.'
    },
    {
      id: '13',
      category: 'account',
      question: 'How do learning streaks work?',
      answer: 'Learning streaks track consecutive days you\'ve asked questions on our platform. Streaks help motivate consistent learning habits. Your streak increases each day you ask at least one question and resets if you skip a day.'
    },
    {
      id: '14',
      category: 'general',
      question: 'Can teachers use this for their students?',
      answer: 'Yes! Many educators use our platform to supplement their teaching. Teachers can recommend it to students for homework help, concept reinforcement, and independent study. We\'re working on special educator features and bulk pricing.'
    },
    {
      id: '15',
      category: 'pricing',
      question: 'Are there student discounts available?',
      answer: 'We offer competitive pricing designed with students in mind. Our free tier provides substantial value, and our premium plans are priced affordably. Contact us if you\'re facing financial hardship - we may be able to help.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'subjects', name: 'Subjects' },
    { id: 'account', name: 'Account' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'technical', name: 'Technical' }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Your AI Tutor
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredFAQs.length} of {faqs.length} questions
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                      {faq.category}
                    </span>
                  </div>
                  <div className="ml-4">
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <button
            onClick={() => window.location.href = 'mailto:zeyad.sweidan@itaura.com.au?subject=FAQ%20Question'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};