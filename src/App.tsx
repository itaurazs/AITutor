import React, { useState, useEffect } from 'react';
import { GraduationCap, History, Send, ArrowRight, CheckCircle, Brain, Target, Zap, Users, Wifi } from 'lucide-react';
import { subjects } from './data/subjects';
import { Subject, Question, Step } from './types/Subject';
import { generateStepByStepSolution } from './utils/solutionGenerator';
import { SubjectCard } from './components/SubjectCard';
import { SampleQuestions } from './components/SampleQuestions';

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<Step[]>([]);
  const [currentKeyPoints, setCurrentKeyPoints] = useState<string[]>([]);
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineVisitors, setOnlineVisitors] = useState(1);

  // Track visitors and online status
  useEffect(() => {
    // Get current visitor count from localStorage
    const currentCount = localStorage.getItem('visitorCount');
    const hasVisited = localStorage.getItem('hasVisitedToday');
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!hasVisited || lastVisitDate !== today) {
      // New visitor or new day
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      setVisitorCount(newCount);
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('hasVisitedToday', 'true');
      localStorage.setItem('lastVisitDate', today);
    } else {
      // Returning visitor same day
      setVisitorCount(currentCount ? parseInt(currentCount) : 0);
    }

    // Simulate online visitors (in a real app, this would be handled by a backend)
    const updateOnlineCount = () => {
      // Generate a realistic online count based on total visitors
      const totalVisitors = parseInt(localStorage.getItem('visitorCount') || '1');
      const baseOnline = Math.max(1, Math.floor(totalVisitors * 0.05)); // 5% of total visitors
      const randomVariation = Math.floor(Math.random() * Math.max(3, Math.floor(totalVisitors * 0.02)));
      const onlineCount = baseOnline + randomVariation;
      setOnlineVisitors(onlineCount);
    };

    // Update online count immediately and then every 30 seconds
    updateOnlineCount();
    const interval = setInterval(updateOnlineCount, 30000);

    // Mark user as active
    const markActive = () => {
      localStorage.setItem('lastActive', Date.now().toString());
    };

    // Mark active on page load and user interactions
    markActive();
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, markActive, { passive: true });
    });

    // Cleanup
    return () => {
      clearInterval(interval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, markActive);
      });
    };
  }, []);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentSteps([]);
    setCurrentKeyPoints([]);
    setCurrentQuestion('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim() || !selectedSubject) return;

    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const solution = generateStepByStepSolution(currentQuestion, selectedSubject.id);
    setCurrentSteps(solution.steps);
    setCurrentKeyPoints(solution.keyPoints);
    
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      subject: selectedSubject.name,
      steps: solution.steps,
      keyPoints: solution.keyPoints,
      timestamp: new Date(),
    };
    
    setQuestionHistory(prev => [newQuestion, ...prev]);
    setIsLoading(false);
  };

  const handleSampleQuestion = (question: string) => {
    setCurrentQuestion(question);
    setCurrentSteps([]);
    setCurrentKeyPoints([]);
  };

  const loadFromHistory = (item: Question) => {
    setCurrentQuestion(item.question);
    setCurrentSteps(item.steps);
    setCurrentKeyPoints(item.keyPoints);
    // Find and select the subject
    const subject = subjects.find(s => s.name === item.subject);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your AI Tutor
                </h1>
                <p className="text-sm text-gray-600">Multi-subject learning companion for grades 7-12</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Online Visitors Counter */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-lg border border-emerald-200">
                <div className="relative">
                  <Wifi className="h-4 w-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm font-semibold">{onlineVisitors}</span>
                <span className="text-xs text-emerald-600 hidden sm:inline">online</span>
              </div>
              
              {/* Total Visitors Counter */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg border border-blue-200">
                <Users className="h-4 w-4" />
                <span className="text-sm font-semibold">{visitorCount.toLocaleString()}</span>
                <span className="text-xs text-blue-600 hidden sm:inline">total</span>
              </div>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Subject Selection */}
        {!selectedSubject && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your AI Tutor!</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  I'm here to help you understand concepts across multiple subjects. Choose a subject below to get started 
                  with step-by-step explanations that help you learn, not just get answers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Step-by-Step</h3>
                  <p className="text-sm text-blue-700">Every solution broken down clearly</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-900">Multi-Subject</h3>
                  <p className="text-sm text-green-700">Math, Science, English, History & more</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-900">Learn Concepts</h3>
                  <p className="text-sm text-purple-700">Understand the 'why' behind each step</p>
                </div>
              </div>
            </div>

            {/* Subject Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Subject</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={false}
                    onClick={() => handleSubjectSelect(subject)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subject-Specific Interface */}
        {selectedSubject && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subject Header */}
              <div className={`${selectedSubject.bgColor} rounded-2xl shadow-sm border border-current p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-3 rounded-xl">
                      <div className={`h-8 w-8 ${selectedSubject.color}`}>
                        {/* Icon will be rendered by SubjectCard component logic */}
                      </div>
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${selectedSubject.color}`}>
                        {selectedSubject.name}
                      </h2>
                      <p className={`${selectedSubject.color.replace('600', '700')}`}>
                        {selectedSubject.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className={`px-4 py-2 bg-white ${selectedSubject.color} rounded-lg hover:bg-gray-50 transition-colors`}
                  >
                    Change Subject
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className={`p-2 rounded-lg ${selectedSubject.bgColor} mr-3`}>
                    <div className={`h-5 w-5 ${selectedSubject.color}`}></div>
                  </div>
                  Ask Your {selectedSubject.name} Question
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder={`Type your ${selectedSubject.name.toLowerCase()} question here...`}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!currentQuestion.trim() || isLoading}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Working through the steps...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Get Step-by-Step Solution</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Step-by-Step Solution */}
              {currentSteps.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    Step-by-Step Solution
                  </h3>
                  
                  <div className="space-y-4">
                    {currentSteps.map((step, index) => (
                      <div key={step.number} className="relative">
                        {/* Step Card */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                          <div className="flex items-start space-x-4">
                            {/* Step Number */}
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {step.number}
                              </div>
                            </div>
                            
                            {/* Step Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {step.title}
                              </h4>
                              <p className="text-gray-700 mb-3">
                                {step.content}
                              </p>
                              
                              {/* Formula/Calculation Display */}
                              {step.formula && (
                                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-2">
                                  <code className="text-blue-800 font-mono text-lg whitespace-pre-line">
                                    {step.formula}
                                  </code>
                                </div>
                              )}
                              
                              {step.calculation && (
                                <div className="bg-green-100 rounded-lg p-4 border border-green-300 mb-2">
                                  <div className="flex items-center space-x-2">
                                    <ArrowRight className="h-4 w-4 text-green-600" />
                                    <code className="text-green-800 font-mono text-lg font-semibold">
                                      {step.calculation}
                                    </code>
                                  </div>
                                </div>
                              )}
                              
                              {step.example && (
                                <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
                                  <div className="flex items-start space-x-2">
                                    <span className="text-blue-600 font-semibold text-sm">Example:</span>
                                    <span className="text-blue-800 text-sm">{step.example}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Connector Line */}
                        {index < currentSteps.length - 1 && (
                          <div className="flex justify-center py-2">
                            <div className="w-0.5 h-6 bg-gradient-to-b from-green-300 to-blue-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Key Learning Points */}
                  {currentKeyPoints.length > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                        Key Learning Points
                      </h4>
                      <ul className="space-y-2">
                        {currentKeyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-purple-800">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sample Questions */}
              <SampleQuestions
                subject={selectedSubject}
                onQuestionSelect={handleSampleQuestion}
              />

              {/* Question History */}
              {showHistory && questionHistory.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Questions</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {questionHistory.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => loadFromHistory(item)}
                      >
                        <p className="text-sm text-gray-800 line-clamp-2">{item.question}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {item.subject}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-sm border border-orange-100 p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Study Tips</h3>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Follow each step carefully and understand why it's needed
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Practice writing out the steps yourself
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Always check your final answer makes sense
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Try similar problems to reinforce the method
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;