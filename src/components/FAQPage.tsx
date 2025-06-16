import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

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
      category: 'comparison',
      question: 'How is Your AI Tutor different from ChatGPT and other AI tools?',
      answer: 'Unlike general AI tools, Your AI Tutor is specifically customized for students with curriculum-focused content. We provide controlled, safe usage with targeted subjects rather than broad topics. Our platform includes built-in progress tracking, educational badges, and structured learning paths - features not available in general AI tools. While ChatGPT requires careful prompting and moderation, our platform is designed from the ground up for educational use with age-appropriate content and learning-focused interactions.'
    },
    {
      id: '4',
      category: 'comparison',
      question: 'Why not just use ChatGPT for homework help?',
      answer: 'While ChatGPT is very broad and flexible, it\'s not specifically designed for students. Your AI Tutor offers: ✅ Customized for students with curriculum-focused content ✅ Controlled and safe educational environment ✅ Built-in progress tracking and gamification ✅ Structured learning approach with step-by-step explanations ✅ No need for complex prompting - just ask your question naturally. ChatGPT requires moderation and careful prompting, while our platform is inherently educational and safe.'
    },
    {
      id: '5',
      category: 'comparison',
      question: 'What makes this better than other AI tutoring tools?',
      answer: 'Your AI Tutor combines the best of AI technology with educational design principles. We offer targeted subject focus (rather than overwhelming breadth), built-in progress tracking, achievement badges for motivation, and a controlled learning environment. Our platform is designed specifically for grades 7-12 curriculum, ensuring age-appropriate content and explanations that match your learning level.'
    },
    {
      id: '6',
      category: 'subjects',
      question: 'What subjects are covered?',
      answer: 'We cover six main subjects: Mathematics (Algebra, Geometry, Calculus, Statistics), Science (Physics, Chemistry, Biology), English & Grammar (Literature, Writing, Language Arts), History (World History, American History), Geography (Physical and Human Geography), and Economics (Basic Economics, Supply & Demand, Market Systems).'
    },
    {
      id: '7',
      category: 'account',
      question: 'Do I need to create an account?',
      answer: 'You can use basic features without an account, but creating a free account unlocks additional benefits like question history, progress tracking, streak monitoring, achievement badges, and access to AI-powered explanations. Premium accounts offer unlimited questions and advanced features.'
    },
    {
      id: '8',
      category: 'pricing',
      question: 'What are the pricing plans?',
      answer: 'We offer three tiers: Free (5 daily AI questions), Premium ($12.99/month - 50 daily questions, unlimited history, no ads), and Unlimited ($24.99/month - unlimited questions, advanced analytics, priority support). All plans include access to all subjects and basic step-by-step solutions.'
    },
    {
      id: '9',
      category: 'technical',
      question: 'What if the AI doesn\'t understand my question?',
      answer: 'Try rephrasing your question more clearly or breaking it into smaller parts. Include specific details like numbers, formulas, or context. If you\'re still having trouble, our fallback system will provide general guidance, and you can contact support for help.'
    },
    {
      id: '10',
      category: 'account',
      question: 'How do I track my progress?',
      answer: 'Signed-in users can view their learning statistics including daily questions asked, total questions, learning streak, subject-wise breakdown, and achievement badges. Premium users get access to advanced analytics and detailed progress reports.'
    },
    {
      id: '11',
      category: 'technical',
      question: 'Can I use this on mobile devices?',
      answer: 'Yes! Your AI Tutor is fully responsive and works on all devices including smartphones, tablets, laptops, and desktop computers. The interface adapts to your screen size for optimal learning experience.'
    },
    {
      id: '12',
      category: 'pricing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to premium features until the end of your current billing period, after which your account will revert to the free tier.'
    },
    {
      id: '13',
      category: 'general',
      question: 'Is my data safe and private?',
      answer: 'Absolutely. We take privacy seriously and use industry-standard security measures to protect your data. We don\'t share your personal information or questions with third parties. Your learning data is used only to improve your experience on our platform.'
    },
    {
      id: '14',
      category: 'subjects',
      question: 'What grade levels are supported?',
      answer: 'Our AI Tutor is specifically designed for students in grades 7-12 (middle school and high school). The explanations and examples are tailored to be age-appropriate and align with typical curriculum standards for these grade levels.'
    },
    {
      id: '15',
      category: 'technical',
      question: 'What if I encounter a bug or error?',
      answer: 'If you experience any technical issues, please contact us through our contact form. Include details about what you were doing when the error occurred, and we\'ll work to resolve it quickly.'
    },
    {
      id: '16',
      category: 'account',
      question: 'How do learning streaks and badges work?',
      answer: 'Learning streaks track consecutive days you\'ve asked questions on our platform. Achievement badges are earned by reaching milestones like asking your first question, maintaining streaks, or exploring multiple subjects. These gamification elements help motivate consistent learning habits and celebrate your progress.'
    },
    {
      id: '17',
      category: 'general',
      question: 'Can teachers use this for their students?',
      answer: 'Yes! Many educators use our platform to supplement their teaching. Teachers can recommend it to students for homework help, concept reinforcement, and independent study. We\'re working on special educator features and bulk pricing.'
    },
    {
      id: '18',
      category: 'pricing',
      question: 'Are there student discounts available?',
      answer: 'We offer competitive pricing designed with students in mind. Our free tier provides substantial value, and our premium plans are priced affordably. Contact us if you\'re facing financial hardship - we may be able to help.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'comparison', name: 'vs Other AI Tools' },
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

        {/* Featured Comparison Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Why Choose Your AI Tutor Over ChatGPT?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Your AI Tutor
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Customized for students (grades 7-12)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Curriculum-focused content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Built-in progress tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Safe, controlled learning environment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span>Achievement badges & gamification</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                ChatGPT / General AI Tools
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Not customized for students by default</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Needs careful prompting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>No built-in progress tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Requires moderation for safe usage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Very broad - can be overwhelming</span>
                </li>
              </ul>
            </div>
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
                    <span className={`inline-block text-xs px-2 py-1 rounded-full capitalize ${
                      faq.category === 'comparison' ? 'bg-purple-100 text-purple-800' :
                      faq.category === 'general' ? 'bg-blue-100 text-blue-800' :
                      faq.category === 'subjects' ? 'bg-green-100 text-green-800' :
                      faq.category === 'account' ? 'bg-orange-100 text-orange-800' :
                      faq.category === 'pricing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {faq.category === 'comparison' ? 'vs Other AI Tools' : faq.category}
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
                    <p className="text-gray-600 leading-relaxed pt-4 whitespace-pre-line">
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