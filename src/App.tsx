import React, { useState, useEffect } from 'react';
import { GraduationCap, History, Send, ArrowRight, CheckCircle, Brain, Target, Zap, Users, Wifi, Settings, AlertCircle, User, LogIn, Flame, BarChart3, UserPlus } from 'lucide-react';
import { subjects } from './data/subjects';
import { year7MathStrands } from './data/mathStrands';
import { Subject, Question, Step } from './types/Subject';
import { generateStepByStepSolution } from './utils/solutionGenerator';
import { aiService } from './services/aiService';
import authService, { UserProfile } from './services/authService';
import { SubjectCard } from './components/SubjectCard';
import { SampleQuestions } from './components/SampleQuestions';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { UserProfile as UserProfileModal } from './components/UserProfile';
import { Footer } from './components/Footer';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { TestimonialsPage } from './components/TestimonialsPage';
import { ComingSoonModal } from './components/ComingSoonModal';
import { MathStrandCard } from './components/MathStrandCard';
import { MathStrandDetail } from './components/MathStrandDetail';
import { GamificationBadges } from './components/GamificationBadges';
import { EducationalResources } from './components/EducationalResources';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ProgressTracker } from './components/ProgressTracker';
import { AssessmentQuiz, AssessmentResults as AssessmentResultsType } from './components/AssessmentQuiz';
import { AssessmentResults } from './components/AssessmentResults';
import { OnboardingFlow, UserPreferences } from './components/OnboardingFlow';
import { StreakTracker } from './components/StreakTracker';
import { CelebrationModal } from './components/CelebrationModal';
import { BadgesPage } from './components/BadgesPage';
import { SoundProvider, SoundToggle, useSounds } from './components/SoundManager';
import { ParentSignup } from './components/ParentSignup';
import { ParentDashboard } from './components/ParentDashboard';
import { ParentControls } from './components/ParentControls';

type CurrentPage = 'home' | 'contact' | 'about' | 'faq' | 'testimonials';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedMathStrand, setSelectedMathStrand] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<Step[]>([]);
  const [currentKeyPoints, setCurrentKeyPoints] = useState<string[]>([]);
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineVisitors, setOnlineVisitors] = useState(1);
  
  // Authentication and user management
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [aiConnectionStatus, setAiConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Coming Soon Modal
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonSubject, setComingSoonSubject] = useState<Subject | null>(null);

  // Assessment and Onboarding
  const [showAssessmentQuiz, setShowAssessmentQuiz] = useState(false);
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResultsType | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Gamification
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationAchievement, setCelebrationAchievement] = useState<any>(null);
  const [showBadgesPage, setShowBadgesPage] = useState(false);

  // Parent Features
  const [showParentSignup, setShowParentSignup] = useState(false);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [showParentControls, setShowParentControls] = useState(false);

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Sound system
  const { playSound } = useSounds();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const currentUser = authService.getCurrentUser();
      const userProfile = authService.getUserProfile();
      
      if (currentUser && userProfile) {
        setUser(userProfile);
      }
    };

    initAuth();

    // Check AI connection
    const checkAIConnection = async () => {
      try {
        const isConnected = await aiService.testConnection();
        setAiConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch {
        setAiConnectionStatus('disconnected');
      }
    };

    checkAIConnection();
  }, []);

  // Track visitors and online status
  useEffect(() => {
    const initializeVisitorCount = () => {
      const storedCount = localStorage.getItem('totalVisitorCount');
      const lastUpdate = localStorage.getItem('lastVisitorUpdate');
      const now = Date.now();
      
      if (!storedCount) {
        const baseCount = Math.floor(Math.random() * 500) + 100;
        localStorage.setItem('totalVisitorCount', baseCount.toString());
        localStorage.setItem('lastVisitorUpdate', now.toString());
        return baseCount;
      }
      
      const currentCount = parseInt(storedCount);
      const timeSinceUpdate = now - parseInt(lastUpdate || '0');
      const hoursElapsed = timeSinceUpdate / (1000 * 60 * 60);
      
      if (hoursElapsed > 0.1) {
        const newVisitors = Math.floor(Math.random() * Math.max(1, hoursElapsed * 3)) + 1;
        const newCount = currentCount + newVisitors;
        localStorage.setItem('totalVisitorCount', newCount.toString());
        localStorage.setItem('lastVisitorUpdate', now.toString());
        return newCount;
      }
      
      return currentCount;
    };

    const totalCount = initializeVisitorCount();
    setVisitorCount(totalCount);

    const visitorInterval = setInterval(() => {
      const currentCount = parseInt(localStorage.getItem('totalVisitorCount') || '0');
      const shouldAddVisitor = Math.random() < 0.3;
      
      if (shouldAddVisitor) {
        const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('totalVisitorCount', newCount.toString());
        localStorage.setItem('lastVisitorUpdate', Date.now().toString());
        setVisitorCount(newCount);
      }
    }, 45000);

    const updateOnlineCount = () => {
      const totalVisitors = parseInt(localStorage.getItem('totalVisitorCount') || '100');
      const basePercentage = 0.02 + (Math.random() * 0.06);
      const baseOnline = Math.max(1, Math.floor(totalVisitors * basePercentage));
      const hour = new Date().getHours();
      const peakHours = hour >= 15 && hour <= 21;
      const peakMultiplier = peakHours ? 1.2 + (Math.random() * 0.5) : 0.8 + (Math.random() * 0.4);
      const finalOnlineCount = Math.max(1, Math.floor(baseOnline * peakMultiplier));
      setOnlineVisitors(finalOnlineCount);
    };

    updateOnlineCount();
    const onlineInterval = setInterval(updateOnlineCount, 20000 + Math.random() * 20000);

    const markActive = () => {
      localStorage.setItem('lastActive', Date.now().toString());
    };

    markActive();
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, markActive, { passive: true });
    });

    return () => {
      clearInterval(visitorInterval);
      clearInterval(onlineInterval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, markActive);
      });
    };
  }, []);

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
    setSelectedSubject(null);
    setSelectedMathStrand(null);
    setCurrentSteps([]);
    setCurrentKeyPoints([]);
    setCurrentQuestion('');
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubjectSelect = (subject: Subject) => {
    if (!subject.available) {
      setComingSoonSubject(subject);
      setShowComingSoonModal(true);
      return;
    }

    setSelectedSubject(subject);
    setSelectedMathStrand(null);
    setCurrentSteps([]);
    setCurrentKeyPoints([]);
    setCurrentQuestion('');
    
    // Scroll to top smoothly for better mobile experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMathStrandSelect = (strandId: string) => {
    setSelectedMathStrand(strandId);
    setCurrentSteps([]);
    setCurrentKeyPoints([]);
    setCurrentQuestion('');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMathOverview = () => {
    setSelectedMathStrand(null);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canMakeAIRequest = (): { allowed: boolean; reason?: string } => {
    if (!user) {
      return { allowed: false, reason: 'Please sign in to use AI features' };
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyCount = user.usage.daily.date === today ? user.usage.daily.count : 0;

    let dailyLimit: number;
    switch (user.tier) {
      case 'premium':
        dailyLimit = 50;
        break;
      case 'unlimited':
        dailyLimit = Infinity;
        break;
      default:
        dailyLimit = 5;
    }

    if (dailyCount >= dailyLimit) {
      return { allowed: false, reason: `Daily limit of ${dailyLimit} AI questions reached` };
    }

    return { allowed: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim() || (!selectedSubject && !selectedMathStrand)) return;

    if (useAI && aiConnectionStatus === 'connected') {
      const canUse = canMakeAIRequest();
      if (!canUse.allowed) {
        alert(canUse.reason);
        return;
      }
    }

    setIsLoading(true);
    
    try {
      let solution;
      const subjectForAI = selectedSubject || { 
        id: selectedMathStrand || 'year7-mathematics', 
        name: 'Year 7 Mathematics' 
      };
      
      if (useAI && aiConnectionStatus === 'connected' && user) {
        solution = await aiService.generateSolution(currentQuestion, subjectForAI as Subject);
        await authService.recordAIUsage(subjectForAI.id);
        const updatedProfile = authService.getUserProfile();
        if (updatedProfile) {
          setUser(updatedProfile);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const localSolution = generateStepByStepSolution(currentQuestion, subjectForAI.id);
        solution = {
          steps: localSolution.steps,
          keyPoints: localSolution.keyPoints,
          explanation: 'Generated using local algorithms'
        };
      }
      
      setCurrentSteps(solution.steps);
      setCurrentKeyPoints(solution.keyPoints);
      
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion,
        subject: subjectForAI.name,
        steps: solution.steps,
        keyPoints: solution.keyPoints,
        timestamp: new Date(),
      };
      
      setQuestionHistory(prev => [newQuestion, ...prev]);

      // Check for achievements after question completion
      if (user) {
        checkForAchievements(user);
      }
    } catch (error) {
      console.error('Error generating solution:', error);
      const subjectId = selectedSubject?.id || selectedMathStrand || 'year7-mathematics';
      const localSolution = generateStepByStepSolution(currentQuestion, subjectId);
      setCurrentSteps(localSolution.steps);
      setCurrentKeyPoints(localSolution.keyPoints);
    } finally {
      setIsLoading(false);
    }
  };

  const checkForAchievements = (userProfile: UserProfile) => {
    const totalQuestions = userProfile.progress.totalQuestions;
    const streakDays = userProfile.progress.streakDays;
    
    // Check for milestone achievements
    const milestones = [1, 10, 25, 50, 100];
    const justReached = milestones.find(m => totalQuestions === m);
    
    if (justReached) {
      const achievement = {
        name: justReached === 1 ? 'Getting Started' : 
              justReached === 10 ? 'Curious Mind' :
              justReached === 25 ? 'Half Way Hero' :
              justReached === 50 ? 'Knowledge Seeker' : 'Year 7 Graduate',
        description: `Completed ${justReached} question${justReached > 1 ? 's' : ''}`,
        icon: justReached === 100 ? Target : CheckCircle,
        rarity: justReached >= 50 ? 'epic' : justReached >= 25 ? 'rare' : 'common',
        type: 'milestone'
      };
      
      setCelebrationAchievement(achievement);
      setShowCelebration(true);
      playSound('achievement');
    }
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
    const subject = subjects.find(s => s.name === item.subject);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    const userProfile = authService.getUserProfile();
    if (userProfile) {
      setUser(userProfile);
    }
  };

  const handleSubscriptionSuccess = () => {
    setShowSubscriptionModal(false);
    const userProfile = authService.getUserProfile();
    if (userProfile) {
      setUser(userProfile);
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    setShowUserProfile(false);
  };

  const handleAssessmentComplete = (results: AssessmentResultsType) => {
    setAssessmentResults(results);
    setShowAssessmentQuiz(false);
    setShowAssessmentResults(true);
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setShowOnboarding(false);
    if (preferences.hasAccount) {
      setShowAuthModal(true);
    } else {
      // Continue as guest
      console.log('User preferences:', preferences);
    }
  };

  const handleStreakMilestone = (days: number) => {
    const achievement = {
      name: days >= 30 ? 'Dedication Master' : 
            days >= 14 ? 'Two Week Warrior' :
            days >= 7 ? 'Week Warrior' : 'Consistent Learner',
      description: `Maintained a ${days}-day learning streak`,
      icon: Flame,
      rarity: days >= 30 ? 'legendary' : days >= 7 ? 'rare' : 'common',
      type: 'streak'
    };
    
    setCelebrationAchievement(achievement);
    setShowCelebration(true);
    playSound('streak');
  };

  const getRemainingQuestions = (): number => {
    if (!user) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    const dailyCount = user.usage.daily.date === today ? user.usage.daily.count : 0;
    
    let dailyLimit: number;
    switch (user.tier) {
      case 'premium':
        dailyLimit = 50;
        break;
      case 'unlimited':
        return Infinity;
      default:
        dailyLimit = 5;
    }
    
    return Math.max(0, dailyLimit - dailyCount);
  };

  const getStreakEmoji = (days: number) => {
    if (days >= 30) return '🔥';
    if (days >= 14) return '⚡';
    if (days >= 7) return '🌟';
    if (days >= 3) return '✨';
    return '💫';
  };

  // Render different pages
  if (currentPage === 'contact') {
    return <ContactPage onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'faq') {
    return <FAQPage onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'testimonials') {
    return <TestimonialsPage onBack={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 sm:p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your AI Tutor
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Multi-subject learning companion for grades 7-12</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Sound Toggle */}
              <SoundToggle />

              {/* AI Toggle - Mobile Optimized */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <label className="flex items-center space-x-1 sm:space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    disabled={aiConnectionStatus !== 'connected' || !user}
                    className="rounded"
                  />
                  <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">Use AI</span>
                </label>
                <div className={`w-2 h-2 rounded-full ${
                  aiConnectionStatus === 'connected' ? 'bg-green-500' : 
                  aiConnectionStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>

              {/* User Authentication - Mobile Optimized */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors border border-blue-200 touch-manipulation"
                  >
                    <img
                      src={user.avatar || '/avatars/avatar1.svg'}
                      alt="Avatar"
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                    />
                    <span className="hidden sm:inline text-sm">{user.displayName}</span>
                    <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                      user.tier === 'unlimited' ? 'bg-purple-100 text-purple-800' :
                      user.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.tier}
                    </div>
                  </button>
                  
                  {/* Parent Dashboard Button */}
                  <button
                    onClick={() => setShowParentDashboard(true)}
                    className="flex items-center space-x-1 px-2 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200 touch-manipulation"
                    title="Parent Dashboard"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">Parent</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors touch-manipulation"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm">Sign In</span>
                  </button>
                  
                  <button
                    onClick={() => setShowParentSignup(true)}
                    className="flex items-center space-x-1 px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors touch-manipulation"
                    title="Parent Account"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">Parent</span>
                  </button>
                </div>
              )}
              
              {/* Progress Dashboard Button */}
              {user && (
                <button
                  onClick={() => setShowProgressDashboard(true)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 rounded-lg hover:from-green-100 hover:to-blue-100 transition-colors border border-green-200 touch-manipulation"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Progress</span>
                </button>
              )}
              
              {/* Visitor Counters - Mobile Optimized */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-lg border border-emerald-200">
                  <div className="relative">
                    <Wifi className="h-4 w-4" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-semibold">{onlineVisitors}</span>
                  <span className="text-xs text-emerald-600">online</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg border border-blue-200">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-semibold">{visitorCount.toLocaleString()}</span>
                  <span className="text-xs text-blue-600">total</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">History</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 lg:px-8">
        {/* Math Strand Detail View */}
        {selectedMathStrand && (
          <MathStrandDetail
            strand={year7MathStrands.find(s => s.id === selectedMathStrand)!}
            onBack={handleBackToMathOverview}
            onQuestionSelect={handleSampleQuestion}
          />
        )}

        {/* Year 7 Mathematics Overview */}
        {selectedSubject && selectedSubject.id === 'year7-mathematics' && !selectedMathStrand && (
          <div className="space-y-4 sm:space-y-8">
            {/* Subject Header - Mobile Optimized */}
            <div className={`${selectedSubject.bgColor} rounded-2xl shadow-sm border border-current p-4 sm:p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white p-2 sm:p-3 rounded-xl">
                    <div className={`h-6 w-6 sm:h-8 sm:w-8 ${selectedSubject.color}`}>
                      {/* Icon will be rendered by SubjectCard component logic */}
                    </div>
                  </div>
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-bold ${selectedSubject.color}`}>
                      {selectedSubject.name}
                    </h2>
                    <p className={`text-sm sm:text-base ${selectedSubject.color.replace('600', '700')}`}>
                      {selectedSubject.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className={`px-3 sm:px-4 py-2 bg-white ${selectedSubject.color} rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base touch-manipulation`}
                >
                  Change Subject
                </button>
              </div>
            </div>

            {/* Progress Tracker for Mathematics */}
            {user && (
              <ProgressTracker userProfile={user} />
            )}

            {/* Streak Tracker */}
            {user && (
              <StreakTracker 
                userProfile={user} 
                onStreakMilestone={handleStreakMilestone}
              />
            )}

            {/* Math Strands Grid - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Choose Your Mathematics Strand</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {year7MathStrands.map((strand) => (
                  <MathStrandCard
                    key={strand.id}
                    strand={strand}
                    onSelect={() => handleMathStrandSelect(strand.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subject Selection */}
        {!selectedSubject && (
          <div className="space-y-6 sm:space-y-8">
            {/* Welcome Section - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Master Year 7 Mathematics with AI</h2>
                <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  Australian Curriculum Aligned - Personalized tutoring for Australian students following Curriculum v9.0
                </p>
                
                {/* AI Status Banner */}
                {aiConnectionStatus !== 'connected' && (
                  <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs sm:text-sm text-yellow-800">
                        {aiConnectionStatus === 'checking' 
                          ? 'Checking AI connection...' 
                          : 'AI service unavailable - using local solutions'
                        }
                      </span>
                    </div>
                  </div>
                )}

                {/* Authentication Prompt */}
                {!user && (
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-xs sm:text-sm text-blue-800">
                          Sign in to unlock AI-powered explanations and track your progress
                        </span>
                      </div>
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm underline touch-manipulation"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}

                {/* User Progress Display - Mobile Optimized */}
                {user && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-orange-900 flex items-center justify-center">
                            {getStreakEmoji(user.progress.streakDays)}
                            <span className="ml-1">{user.progress.streakDays}</span>
                          </div>
                          <div className="text-xs sm:text-sm text-orange-700">Day Streak</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-blue-900">
                            {user.usage.daily.date === new Date().toISOString().split('T')[0] 
                              ? user.usage.daily.count 
                              : 0
                            }
                          </div>
                          <div className="text-xs sm:text-sm text-blue-700">Today's Questions</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-green-900">{user.progress.totalQuestions}</div>
                          <div className="text-xs sm:text-sm text-green-700">Total Questions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Step-by-Step</h3>
                  <p className="text-xs sm:text-sm text-blue-700">Every solution broken down clearly</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-900 text-sm sm:text-base">Australian Curriculum</h3>
                  <p className="text-xs sm:text-sm text-green-700">Aligned with Curriculum v9.0</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-900 text-sm sm:text-base">Learn Concepts</h3>
                  <p className="text-xs sm:text-sm text-purple-700">Understand the 'why' behind each step</p>
                </div>
              </div>

              {/* Assessment and Onboarding Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={() => setShowAssessmentQuiz(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Take Free Assessment Quiz (2 minutes)
                </button>
                
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Quick Setup (30 seconds)
                </button>
              </div>

              {/* CTA Button - Mobile Optimized */}
              <div className="text-center">
                <button
                  onClick={() => handleSubjectSelect(subjects.find(s => s.id === 'year7-mathematics')!)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl touch-manipulation"
                >
                  Start Your Year 7 Maths Journey
                </button>
              </div>
            </div>

            {/* Subject Grid - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">All Subjects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Subject-Specific Interface (for non-math subjects) */}
        {selectedSubject && selectedSubject.id !== 'year7-mathematics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Subject Header */}
              <div className={`${selectedSubject.bgColor} rounded-2xl shadow-sm border border-current p-4 sm:p-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-white p-2 sm:p-3 rounded-xl">
                      <div className={`h-6 w-6 sm:h-8 sm:w-8 ${selectedSubject.color}`}>
                        {/* Icon will be rendered by SubjectCard component logic */}
                      </div>
                    </div>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold ${selectedSubject.color}`}>
                        {selectedSubject.name}
                      </h2>
                      <p className={`text-sm sm:text-base ${selectedSubject.color.replace('600', '700')}`}>
                        {selectedSubject.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className={`px-3 sm:px-4 py-2 bg-white ${selectedSubject.color} rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base touch-manipulation`}
                  >
                    Change Subject
                  </button>
                </div>
              </div>

              {/* Question Input - Mobile Optimized */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className={`p-2 rounded-lg ${selectedSubject.bgColor} mr-3`}>
                    <div className={`h-4 w-4 sm:h-5 sm:w-5 ${selectedSubject.color}`}></div>
                  </div>
                  Ask Your {selectedSubject.name} Question
                  {useAI && aiConnectionStatus === 'connected' && user && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      AI Powered
                    </span>
                  )}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder={`Type your ${selectedSubject.name.toLowerCase()} question here...`}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                    rows={isMobile ? 3 : 4}
                  />
                  <button
                    type="submit"
                    disabled={!currentQuestion.trim() || isLoading}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                        <span>
                          {useAI && aiConnectionStatus === 'connected' && user
                            ? 'AI is thinking...' 
                            : 'Working through the steps...'
                          }
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Get Step-by-Step Solution</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Step-by-Step Solution - Mobile Optimized */}
              {currentSteps.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    Step-by-Step Solution
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {currentSteps.map((step, index) => (
                      <div key={step.number} className="relative">
                        {/* Step Card - Mobile Optimized */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-green-200">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            {/* Step Number */}
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                                {step.number}
                              </div>
                            </div>
                            
                            {/* Step Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                {step.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-700 mb-3">
                                {step.content}
                              </p>
                              
                              {/* Formula/Calculation Display */}
                              {step.formula && (
                                <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 mb-2">
                                  <code className="text-blue-800 font-mono text-sm sm:text-lg whitespace-pre-line break-all">
                                    {step.formula}
                                  </code>
                                </div>
                              )}
                              
                              {step.calculation && (
                                <div className="bg-green-100 rounded-lg p-3 sm:p-4 border border-green-300 mb-2">
                                  <div className="flex items-center space-x-2">
                                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                    <code className="text-green-800 font-mono text-sm sm:text-lg font-semibold break-all">
                                      {step.calculation}
                                    </code>
                                  </div>
                                </div>
                              )}
                              
                              {step.example && (
                                <div className="bg-blue-100 rounded-lg p-3 sm:p-4 border border-blue-300">
                                  <div className="flex items-start space-x-2">
                                    <span className="text-blue-600 font-semibold text-xs sm:text-sm flex-shrink-0">Example:</span>
                                    <span className="text-blue-800 text-xs sm:text-sm">{step.example}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Connector Line */}
                        {index < currentSteps.length - 1 && (
                          <div className="flex justify-center py-2">
                            <div className="w-0.5 h-4 sm:h-6 bg-gradient-to-b from-green-300 to-blue-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Key Learning Points */}
                  {currentKeyPoints.length > 0 && (
                    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-200">
                      <h4 className="text-base sm:text-lg font-semibold text-purple-900 mb-4 flex items-center">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
                        Key Learning Points
                      </h4>
                      <ul className="space-y-2">
                        {currentKeyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-purple-800 text-sm sm:text-base">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
              {/* User Stats */}
              {user && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                  
                  {/* Progress Stats Grid - Mobile Optimized */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                        <div>
                          <div className="text-sm sm:text-lg font-bold text-orange-900 flex items-center">
                            {getStreakEmoji(user.progress.streakDays)}
                            <span className="ml-1">{user.progress.streakDays}</span>
                          </div>
                          <div className="text-xs text-orange-700">Day Streak</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Target className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        <div>
                          <div className="text-sm sm:text-lg font-bold text-blue-900">
                            {user.usage.daily.date === new Date().toISOString().split('T')[0] 
                              ? user.usage.daily.count 
                              : 0
                            }
                          </div>
                          <div className="text-xs text-blue-700">Today</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        <div>
                          <div className="text-sm sm:text-lg font-bold text-green-900">{user.progress.totalQuestions}</div>
                          <div className="text-xs text-green-700">Total</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="h-3 w-3 sm:h-4 sm:w-4 bg-purple-600 rounded-full"></div>
                        <div>
                          <div className="text-sm sm:text-lg font-bold text-purple-900">
                            {Object.keys(user.progress.subjectStats).length}
                          </div>
                          <div className="text-xs text-purple-700">Subjects</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Usage Details */}
                  <div className="space-y-2 sm:space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Daily Limit</span>
                      <span className="font-semibold text-xs sm:text-sm">
                        {user.usage.daily.date === new Date().toISOString().split('T')[0] 
                          ? user.usage.daily.count 
                          : 0
                        } / {user.tier === 'unlimited' ? '∞' : user.tier === 'premium' ? '50' : '5'}
                      </span>
                    </div>
                  </div>
                  
                  {user.tier === 'free' && (
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-xs sm:text-sm font-semibold touch-manipulation"
                    >
                      Upgrade for More Questions
                    </button>
                  )}
                </div>
              )}

              {/* Sample Questions */}
              <SampleQuestions
                subject={selectedSubject}
                onQuestionSelect={handleSampleQuestion}
              />

              {/* Question History - Mobile Optimized */}
              {showHistory && questionHistory.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Questions</h3>
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                    {questionHistory.slice(0, user?.tier === 'free' ? 10 : questionHistory.length).map((item) => (
                      <div
                        key={item.id}
                        className="p-2 sm:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors touch-manipulation"
                        onClick={() => loadFromHistory(item)}
                      >
                        <p className="text-xs sm:text-sm text-gray-800 line-clamp-2">{item.question}</p>
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

              {/* Gamification Badges - Mobile Optimized */}
              {user && (
                <GamificationBadges userProfile={user} />
              )}

              {/* Educational Resources */}
              <EducationalResources subject={selectedSubject?.id} />

              {/* Study Tips - Mobile Optimized */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-sm border border-orange-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-orange-900 mb-4">Study Tips</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-orange-800">
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

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSuccess={handleSubscriptionSuccess}
      />

      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        subjectName={comingSoonSubject?.name || ''}
        availabilityDate={comingSoonSubject?.availabilityDate}
      />

      <AssessmentQuiz
        isOpen={showAssessmentQuiz}
        onClose={() => setShowAssessmentQuiz(false)}
        onComplete={handleAssessmentComplete}
      />

      <AssessmentResults
        isOpen={showAssessmentResults}
        onClose={() => setShowAssessmentResults(false)}
        results={assessmentResults!}
        onStartLearning={(strand) => {
          setShowAssessmentResults(false);
          handleSubjectSelect(subjects.find(s => s.id === 'year7-mathematics')!);
        }}
        onCreateAccount={() => {
          setShowAssessmentResults(false);
          setShowAuthModal(true);
        }}
      />

      <OnboardingFlow
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        achievement={celebrationAchievement}
        onShare={() => {
          // Share achievement functionality
          console.log('Sharing achievement:', celebrationAchievement);
        }}
        onDownloadCertificate={() => {
          // Download certificate functionality
          console.log('Downloading certificate for:', celebrationAchievement);
        }}
      />

      <ParentSignup
        isOpen={showParentSignup}
        onClose={() => setShowParentSignup(false)}
        onSuccess={() => {
          setShowParentSignup(false);
          setShowParentDashboard(true);
        }}
      />

      <ParentDashboard
        isOpen={showParentDashboard}
        onClose={() => setShowParentDashboard(false)}
        parentProfile={user || {} as UserProfile}
      />

      <ParentControls
        isOpen={showParentControls}
        onClose={() => setShowParentControls(false)}
        childName="Sarah Chen"
        currentSettings={{
          dailyGoal: 5,
          weeklyGoal: 25,
          difficultyLevel: 'adaptive',
          emailNotifications: true,
          weeklyReports: true,
          achievementAlerts: true,
          concernAlerts: true,
          studyTimeLimit: 60,
          allowedSubjects: ['Number', 'Algebra', 'Measurement', 'Space & Geometry', 'Statistics', 'Probability']
        }}
        onSave={(settings) => {
          console.log('Saving parent controls:', settings);
        }}
      />

      {user && (
        <>
          <UserProfileModal
            isOpen={showUserProfile}
            onClose={() => setShowUserProfile(false)}
            userProfile={user}
            onSignOut={handleSignOut}
          />

          <ProgressDashboard
            isOpen={showProgressDashboard}
            onClose={() => setShowProgressDashboard(false)}
            userProfile={user}
          />

          <BadgesPage
            userProfile={user}
            onClose={() => setShowBadgesPage(false)}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}

export default App;