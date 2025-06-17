import React, { useState, useEffect } from 'react';
import { Calculator, Atom, BookOpen, Scroll, Globe, TrendingUp, GraduationCap, User, Settings, History, Menu, X, HelpCircle, MessageCircle, Info, Star, AlertTriangle, CheckCircle, Target, Award } from 'lucide-react';
import { SubjectCard } from './components/SubjectCard';
import { SampleQuestions } from './components/SampleQuestions';
import { subjects } from './data/subjects';
import { Subject, Question } from './types/Subject';
import { aiService } from './services/aiService';
import { generateStepByStepSolution } from './utils/solutionGenerator';
import authService, { UserProfile } from './services/authService';
import { AuthModal } from './components/AuthModal';
import { UserProfile as UserProfileComponent } from './components/UserProfile';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FAQPage } from './components/FAQPage';
import { TestimonialsPage } from './components/TestimonialsPage';
import { Footer } from './components/Footer';
import { MobileNavigation } from './components/MobileNavigation';
import { ConceptExplainer } from './components/ConceptExplainer';
import { AlternativeSolutionModal } from './components/AlternativeSolutionModal';
import { WhyItWorksModal } from './components/WhyItWorksModal';
import { SmartHintSystem } from './components/SmartHintSystem';
import { AssessmentQuiz, AssessmentResults } from './components/AssessmentQuiz';
import { AssessmentResults as AssessmentResultsModal } from './components/AssessmentResults';
import { OnboardingFlow, UserPreferences } from './components/OnboardingFlow';
import { hintService } from './services/hintService';
import { year7MathStrands } from './data/mathStrands';
import { MathStrandCard } from './components/MathStrandCard';
import { MathStrandDetail } from './components/MathStrandDetail';

function App() {
  // Core state
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [question, setQuestion] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
  const [aiServiceAvailable, setAiServiceAvailable] = useState<boolean | null>(null);
  
  // UI state
  const [currentView, setCurrentView] = useState<'home' | 'mathematics' | 'history' | 'profile' | 'progress' | 'about' | 'contact' | 'faq' | 'testimonials' | 'settings'>('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedStrand, setSelectedStrand] = useState<string | null>(null);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  
  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [showConceptExplainer, setShowConceptExplainer] = useState(false);
  const [showAlternativeSolution, setShowAlternativeSolution] = useState(false);
  const [showWhyItWorks, setShowWhyItWorks] = useState(false);
  const [showAssessmentQuiz, setShowAssessmentQuiz] = useState(false);
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  
  // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check AI service availability on mount
  useEffect(() => {
    const checkAIService = async () => {
      try {
        const isAvailable = await aiService.testConnection();
        setAiServiceAvailable(isAvailable);
      } catch (error) {
        setAiServiceAvailable(false);
      }
    };

    checkAIService();
  }, []);

  // Load user profile and question history on mount
  useEffect(() => {
    const checkAuthState = async () => {
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true);
        const profile = authService.getUserProfile();
        setUserProfile(profile);
      }
    };

    checkAuthState();

    // Load question history from localStorage
    const savedHistory = localStorage.getItem('questionHistory');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setQuestionHistory(history.map((q: any) => ({
          ...q,
          timestamp: new Date(q.timestamp)
        })));
      } catch (error) {
        console.error('Error loading question history:', error);
      }
    }

    // Check if user has completed onboarding
    const completedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    setHasCompletedOnboarding(!!completedOnboarding);

    // Show quick setup for new users
    const hasSeenQuickSetup = localStorage.getItem('hasSeenQuickSetup');
    if (!hasSeenQuickSetup && !completedOnboarding) {
      setShowQuickSetup(true);
    }
  }, []);

  // Save question history to localStorage whenever it changes
  useEffect(() => {
    if (questionHistory.length > 0) {
      localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
    }
  }, [questionHistory]);

  const handleSubjectSelect = (subject: Subject) => {
    if (!subject.available) return;
    
    if (subject.id === 'year7-mathematics') {
      setCurrentView('mathematics');
      setSelectedSubject(subject);
    } else {
      setSelectedSubject(subject);
    }
  };

  const handleStrandSelect = (strandId: string) => {
    setSelectedStrand(strandId);
  };

  const handleBackToMathematics = () => {
    setSelectedStrand(null);
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;
    if (!selectedSubject) {
      setError('Please select a subject first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Record AI usage if user is authenticated
      if (isAuthenticated && userProfile) {
        await authService.recordAIUsage(selectedSubject.id);
        // Refresh user profile to get updated usage stats
        const updatedProfile = authService.getUserProfile();
        setUserProfile(updatedProfile);
      }

      // Try AI service first, fallback to local generation
      let response;
      let usedAI = false;
      
      try {
        if (aiServiceAvailable) {
          response = await aiService.generateSolution(question, selectedSubject);
          usedAI = true;
        } else {
          throw new Error('AI service not available');
        }
      } catch (aiError) {
        console.warn('AI service failed, using local generation:', aiError);
        const localSolution = generateStepByStepSolution(question, selectedSubject.id);
        response = {
          steps: localSolution.steps,
          keyPoints: localSolution.keyPoints,
          explanation: `Here's a step-by-step solution for your ${selectedSubject.name} question.`
        };
        usedAI = false;
      }

      const newQuestion: Question = {
        id: Date.now().toString(),
        question,
        subject: selectedSubject.name,
        steps: response.steps,
        keyPoints: response.keyPoints,
        timestamp: new Date()
      };

      setCurrentQuestion(newQuestion);
      setQuestionHistory(prev => [newQuestion, ...prev.slice(0, 49)]); // Keep last 50 questions
      setQuestion('');

      // Show notification if using local solutions
      if (!usedAI) {
        setError('AI service unavailable - using local solutions');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      console.error('Error generating solution:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate solution. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    const profile = authService.getUserProfile();
    setUserProfile(profile);
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setIsAuthenticated(false);
      setUserProfile(null);
      setShowUserProfile(false);
      setCurrentView('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentView(page as any);
    setShowMobileMenu(false);
  };

  const handleHintUsed = (level: number, helpful: boolean) => {
    if (currentQuestion) {
      hintService.recordHintUsage(
        currentQuestion.id,
        level,
        helpful,
        selectedSubject?.name || 'unknown',
        'general' // This could be more specific based on the question content
      );
    }
  };

  const handleExplainConcept = () => {
    setShowConceptExplainer(true);
  };

  const handleShowAlternative = () => {
    setShowAlternativeSolution(true);
  };

  const handleShowWhy = () => {
    setShowWhyItWorks(true);
  };

  const handleStartAssessment = () => {
    setShowAssessmentQuiz(true);
  };

  const handleAssessmentComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    setShowAssessmentQuiz(false);
    setShowAssessmentResults(true);
  };

  const handleStartLearning = (strand: string) => {
    setShowAssessmentResults(false);
    setCurrentView('mathematics');
    setSelectedSubject(subjects.find(s => s.id === 'year7-mathematics')!);
    // Find and select the recommended strand
    const strandData = year7MathStrands.find(s => s.name.toLowerCase().includes(strand.toLowerCase()));
    if (strandData) {
      setSelectedStrand(strandData.id);
    }
  };

  const handleCreateAccount = () => {
    setShowAssessmentResults(false);
    setShowAuthModal(true);
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setShowOnboarding(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    // If user chose to create account, show auth modal
    if (preferences.hasAccount) {
      setShowAuthModal(true);
    }
  };

  const handleQuickSetup = () => {
    setShowQuickSetup(false);
    localStorage.setItem('hasSeenQuickSetup', 'true');
    setShowOnboarding(true);
  };

  const handleSkipQuickSetup = () => {
    setShowQuickSetup(false);
    localStorage.setItem('hasSeenQuickSetup', 'true');
  };

  // Close all modals function
  const closeAllModals = () => {
    setShowConceptExplainer(false);
    setShowAlternativeSolution(false);
    setShowWhyItWorks(false);
    setShowAuthModal(false);
    setShowUserProfile(false);
    setShowProgressDashboard(false);
    setShowAssessmentQuiz(false);
    setShowAssessmentResults(false);
    setShowOnboarding(false);
  };

  // Render different views
  if (currentView === 'about') {
    return <AboutPage onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <ContactPage onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'faq') {
    return <FAQPage onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'testimonials') {
    return <TestimonialsPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* AI Service Status Banner */}
      {aiServiceAvailable === false && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800 font-medium">
              AI service unavailable - using local solutions
            </span>
          </div>
        </div>
      )}

      {/* Quick Setup Banner */}
      {showQuickSetup && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5" />
              <div>
                <span className="font-semibold">Quick Setup:</span>
                <span className="ml-2">Get personalized learning recommendations in 2 minutes</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleQuickSetup}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm"
              >
                Start Setup
              </button>
              <button
                onClick={handleSkipQuickSetup}
                className="text-blue-100 hover:text-white transition-colors text-sm"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                setCurrentView('home');
                setSelectedSubject(null);
                setSelectedStrand(null);
                closeAllModals();
              }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your AI Tutor
                </h1>
                <p className="text-sm text-gray-600">Multi-subject learning companion</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('about')}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </button>
              <button
                onClick={() => setCurrentView('faq')}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </button>
              <button
                onClick={() => setCurrentView('testimonials')}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Star className="h-4 w-4" />
                <span>Reviews</span>
              </button>
              <button
                onClick={() => setCurrentView('contact')}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contact</span>
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {questionHistory.length > 0 && (
                <button
                  onClick={() => setCurrentView('history')}
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <History className="h-4 w-4" />
                  <span>History</span>
                </button>
              )}

              {isAuthenticated && userProfile ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowProgressDashboard(true)}
                    className="hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Progress</span>
                  </button>
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <img
                      src={userProfile.avatar || '/avatars/avatar1.svg'}
                      alt="User Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="hidden sm:inline">{userProfile.displayName}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCurrentView('about');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('faq');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home View */}
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Master Year 7 Mathematics with AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Get step-by-step explanations designed for students grades 7-12. 
                <span className="text-blue-600 font-semibold"> Math, Science, English, History</span> and more.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <span className="text-2xl">🇦🇺</span>
                <span className="font-semibold">Australian Curriculum v9.0 Aligned</span>
              </div>

              {/* Assessment CTA */}
              {!hasCompletedOnboarding && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">Find Your Starting Point</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Take our free 5-minute assessment to discover your strengths and get personalized learning recommendations.
                  </p>
                  <button
                    onClick={handleStartAssessment}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-semibold"
                  >
                    Take Free Assessment Quiz
                  </button>
                </div>
              )}
            </div>

            {/* Subject Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">Choose Your Subject</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={selectedSubject?.id === subject.id}
                    onClick={() => handleSubjectSelect(subject)}
                  />
                ))}
              </div>
            </div>

            {/* Question Input */}
            {selectedSubject && selectedSubject.available && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ask Your {selectedSubject.name} Question
                </h3>
                <div className="space-y-4">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={`Type your ${selectedSubject.name} question here...`}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  {error && (
                    <div className={`text-sm flex items-center space-x-2 ${
                      error.includes('AI service unavailable') ? 'text-yellow-700' : 'text-red-600'
                    }`}>
                      {error.includes('AI service unavailable') ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <span>{error}</span>
                    </div>
                  )}
                  <button
                    onClick={handleQuestionSubmit}
                    disabled={!question.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Generating Solution...' : 'Get Step-by-Step Solution'}
                  </button>
                </div>
              </div>
            )}

            {/* Current Question Solution */}
            {currentQuestion && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Solution</h3>
                  <span className="text-sm text-gray-500">
                    {currentQuestion.timestamp.toLocaleString()}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Question:</h4>
                  <p className="text-blue-800">{currentQuestion.question}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution:</h4>
                    <div className="space-y-4">
                      {currentQuestion.steps.map((step) => (
                        <div key={step.number} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {step.number}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-2">{step.title}</h5>
                              <p className="text-gray-700 mb-3">{step.content}</p>
                              {step.formula && (
                                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                  <span className="text-sm font-medium text-gray-600">Formula: </span>
                                  <code className="text-blue-600">{step.formula}</code>
                                </div>
                              )}
                              {step.calculation && (
                                <div className="bg-green-50 rounded-lg p-3">
                                  <span className="text-sm font-medium text-gray-600">Calculation: </span>
                                  <code className="text-green-700">{step.calculation}</code>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-900 mb-3">Key Learning Points:</h4>
                    <ul className="space-y-2">
                      {currentQuestion.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-yellow-800">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Smart Hint System */}
                {selectedSubject && (
                  <div className="mt-6">
                    <SmartHintSystem
                      question={currentQuestion.question}
                      subject={selectedSubject.name}
                      onHintUsed={handleHintUsed}
                      onExplainConcept={handleExplainConcept}
                      onShowAlternative={handleShowAlternative}
                      onShowWhy={handleShowWhy}
                      userProfile={userProfile}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mathematics View */}
        {currentView === 'mathematics' && !selectedStrand && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <button
                onClick={() => setCurrentView('home')}
                className="text-blue-600 hover:text-blue-700 transition-colors mb-4"
              >
                ← Back to All Subjects
              </button>
              <h1 className="text-4xl font-bold text-gray-900">Year 7 Mathematics</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master the Australian Curriculum v9.0 with comprehensive coverage across all mathematics strands
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <span className="text-2xl">🇦🇺</span>
                <span className="font-semibold">Australian Curriculum v9.0 Aligned</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {year7MathStrands.map((strand) => (
                <MathStrandCard
                  key={strand.id}
                  strand={strand}
                  onSelect={() => handleStrandSelect(strand.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mathematics Strand Detail View */}
        {currentView === 'mathematics' && selectedStrand && (
          <MathStrandDetail
            strand={year7MathStrands.find(s => s.id === selectedStrand)!}
            onBack={handleBackToMathematics}
            onQuestionSelect={(question) => {
              setQuestion(question);
              setSelectedSubject(subjects.find(s => s.id === 'year7-mathematics')!);
              setCurrentView('home');
            }}
          />
        )}

        {/* History View */}
        {currentView === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Question History</h1>
              <button
                onClick={() => setCurrentView('home')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                ← Back to Home
              </button>
            </div>

            {questionHistory.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions yet</h3>
                <p className="text-gray-600">Start asking questions to see your history here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questionHistory.map((q) => (
                  <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{q.question}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{q.subject}</span>
                          <span>{q.timestamp.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentQuestion(q);
                          setCurrentView('home');
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                      >
                        View Solution
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Navigation */}
      <MobileNavigation
        currentView={currentView}
        onNavigate={handleNavigate}
        hasHistory={questionHistory.length > 0}
        isAuthenticated={isAuthenticated}
      />

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {showUserProfile && userProfile && (
        <UserProfileComponent
          isOpen={showUserProfile}
          onClose={() => setShowUserProfile(false)}
          userProfile={userProfile}
          onSignOut={handleSignOut}
        />
      )}

      {showProgressDashboard && userProfile && (
        <ProgressDashboard
          userProfile={userProfile}
          onClose={() => setShowProgressDashboard(false)}
        />
      )}

      {showConceptExplainer && currentQuestion && selectedSubject && (
        <ConceptExplainer
          concept={currentQuestion.question}
          subject={selectedSubject.name}
          onClose={() => setShowConceptExplainer(false)}
        />
      )}

      {showAlternativeSolution && currentQuestion && selectedSubject && (
        <AlternativeSolutionModal
          isOpen={showAlternativeSolution}
          onClose={() => setShowAlternativeSolution(false)}
          question={currentQuestion.question}
          subject={selectedSubject.name}
        />
      )}

      {showWhyItWorks && currentQuestion && selectedSubject && (
        <WhyItWorksModal
          isOpen={showWhyItWorks}
          onClose={() => setShowWhyItWorks(false)}
          concept={currentQuestion.question}
          subject={selectedSubject.name}
        />
      )}

      {showAssessmentQuiz && (
        <AssessmentQuiz
          isOpen={showAssessmentQuiz}
          onClose={() => setShowAssessmentQuiz(false)}
          onComplete={handleAssessmentComplete}
        />
      )}

      {showAssessmentResults && assessmentResults && (
        <AssessmentResultsModal
          isOpen={showAssessmentResults}
          onClose={() => setShowAssessmentResults(false)}
          results={assessmentResults}
          onStartLearning={handleStartLearning}
          onCreateAccount={handleCreateAccount}
        />
      )}

      {showOnboarding && (
        <OnboardingFlow
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
        />
      )}
    </div>
  );
}

export default App;