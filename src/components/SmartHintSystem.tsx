import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Lightbulb, Eye, Play, BookOpen, Target, Clock, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Zap } from 'lucide-react';

interface HintLevel {
  level: 1 | 2 | 3 | 4;
  title: string;
  content: string;
  type: 'nudge' | 'method' | 'guidance' | 'example';
  icon: React.ComponentType<any>;
}

interface SmartHintSystemProps {
  question: string;
  subject: string;
  onHintUsed: (level: number, helpful: boolean) => void;
  onExplainConcept: () => void;
  onShowAlternative: () => void;
  onShowWhy: () => void;
  userProfile?: any;
}

export const SmartHintSystem: React.FC<SmartHintSystemProps> = ({
  question,
  subject,
  onHintUsed,
  onExplainConcept,
  onShowAlternative,
  onShowWhy,
  userProfile
}) => {
  const [showHints, setShowHints] = useState(false);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [hintTriggerReason, setHintTriggerReason] = useState<'inactivity' | 'incorrect' | 'manual'>('manual');
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [hintFeedback, setHintFeedback] = useState<{ level: number; helpful: boolean } | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Generate contextual hints based on question and subject
  const generateHints = (): HintLevel[] => {
    const baseHints: HintLevel[] = [
      {
        level: 1,
        title: "Gentle Nudge",
        content: getGentleNudge(),
        type: 'nudge',
        icon: Lightbulb
      },
      {
        level: 2,
        title: "Method Reminder",
        content: getMethodReminder(),
        type: 'method',
        icon: Target
      },
      {
        level: 3,
        title: "Step-by-Step Guidance",
        content: getStepGuidance(),
        type: 'guidance',
        icon: ArrowRight
      },
      {
        level: 4,
        title: "Worked Example",
        content: getWorkedExample(),
        type: 'example',
        icon: BookOpen
      }
    ];

    return baseHints;
  };

  const getGentleNudge = (): string => {
    if (question.toLowerCase().includes('decimal')) {
      return "Remember to check your decimal placement carefully. Count the decimal places!";
    }
    if (question.toLowerCase().includes('fraction')) {
      return "Think about finding a common denominator first. What's the smallest number both denominators divide into?";
    }
    if (question.toLowerCase().includes('percentage') || question.toLowerCase().includes('%')) {
      return "Remember: percentage means 'out of 100'. Try converting to a fraction or decimal first.";
    }
    if (question.toLowerCase().includes('area')) {
      return "For area, think about the shape. What formula applies to this type of shape?";
    }
    if (question.toLowerCase().includes('algebra') || question.includes('x')) {
      return "Remember to do the same operation to both sides of the equation.";
    }
    return "Take a moment to identify what type of problem this is. What's the key information given?";
  };

  const getMethodReminder = (): string => {
    if (question.toLowerCase().includes('fraction')) {
      return "Try converting to the same denominator first. Find the least common multiple of the denominators.";
    }
    if (question.toLowerCase().includes('percentage')) {
      return "Method: Convert percentage to decimal (divide by 100), then multiply by the number.";
    }
    if (question.toLowerCase().includes('area')) {
      return "Method: Identify the shape, then use the appropriate formula (rectangle: length × width, triangle: ½ × base × height).";
    }
    if (question.toLowerCase().includes('algebra')) {
      return "Method: Isolate the variable by performing inverse operations. Work backwards from the order of operations.";
    }
    if (question.toLowerCase().includes('gst')) {
      return "Method: GST is 10% in Australia. To find price with GST: multiply by 1.10. To find price without GST: divide by 1.10.";
    }
    return "Method: Break the problem into smaller steps. Identify what you know and what you need to find.";
  };

  const getStepGuidance = (): string => {
    return `Let's break this into smaller steps:

1. First, identify what type of problem this is
2. Write down what information you have
3. Determine what you need to find
4. Choose the appropriate method or formula
5. Work through the calculation step by step
6. Check your answer makes sense

Would you like me to guide you through each step?`;
  };

  const getWorkedExample = (): string => {
    if (question.toLowerCase().includes('fraction')) {
      return `Here's a similar example:
      
Problem: Add 1/3 + 1/4

Step 1: Find common denominator (12)
Step 2: Convert fractions: 4/12 + 3/12
Step 3: Add numerators: 7/12
Answer: 7/12

Now try applying this method to your problem!`;
    }

    if (question.toLowerCase().includes('percentage')) {
      return `Here's a similar example:
      
Problem: Find 25% of 80

Step 1: Convert percentage to decimal: 25% = 0.25
Step 2: Multiply: 0.25 × 80 = 20
Answer: 20

Now try this method with your problem!`;
    }

    return `Here's how to approach a similar problem:

1. Read the problem carefully
2. Identify the key information
3. Choose the right method
4. Work step by step
5. Check your answer

Apply this same approach to your current problem!`;
  };

  // Track user activity and trigger hints
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      
      // Clear inactivity timer
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      // Set new inactivity timer (30 seconds)
      const newTimer = setTimeout(() => {
        if (!showHints) {
          setHintTriggerReason('inactivity');
          setShowHints(true);
        }
      }, 30000);

      setInactivityTimer(newTimer);
    };

    // Add activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Initial timer
    handleActivity();

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [showHints, inactivityTimer]);

  // Handle incorrect attempts
  const handleIncorrectAttempt = () => {
    const newAttempts = incorrectAttempts + 1;
    setIncorrectAttempts(newAttempts);

    if (newAttempts >= 2 && !showHints) {
      setHintTriggerReason('incorrect');
      setShowHints(true);
    }
  };

  const handleHintRequest = (level: number) => {
    setCurrentHintLevel(level);
    setHintTriggerReason('manual');
  };

  const handleHintFeedback = (level: number, helpful: boolean) => {
    setHintFeedback({ level, helpful });
    onHintUsed(level, helpful);
    
    // Auto-hide feedback after 3 seconds
    setTimeout(() => setHintFeedback(null), 3000);
  };

  const hints = generateHints();
  const currentHint = hints.find(h => h.level === currentHintLevel);

  const getTriggerMessage = () => {
    switch (hintTriggerReason) {
      case 'inactivity':
        return "Stuck? Let me help you get back on track! 🤔";
      case 'incorrect':
        return "Need a hint? I'm here to help! 💡";
      default:
        return "What kind of help would you like?";
    }
  };

  return (
    <div className="space-y-4">
      {/* Hint Trigger Banner */}
      {showHints && !currentHint && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{getTriggerMessage()}</h3>
                <p className="text-blue-700 text-sm">Choose the level of help you need</p>
              </div>
            </div>
            <button
              onClick={() => setShowHints(false)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Maybe later
            </button>
          </div>

          {/* Hint Level Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {hints.map((hint) => {
              const Icon = hint.icon;
              return (
                <button
                  key={hint.level}
                  onClick={() => handleHintRequest(hint.level)}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{hint.title}</div>
                    <div className="text-gray-600 text-xs">
                      {hint.type === 'nudge' && 'Gentle guidance'}
                      {hint.type === 'method' && 'Remind me of the method'}
                      {hint.type === 'guidance' && 'Break it down step by step'}
                      {hint.type === 'example' && 'Show me a similar example'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Hint Display */}
      {currentHint && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <currentHint.icon className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentHint.title}</h3>
                <p className="text-gray-600 text-sm">Level {currentHint.level} hint</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentHintLevel(0)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-4">
            <pre className="whitespace-pre-wrap text-gray-800 text-sm font-sans">
              {currentHint.content}
            </pre>
          </div>

          {/* Hint Feedback */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Was this hint helpful?
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleHintFeedback(currentHint.level, true)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                <CheckCircle className="h-3 w-3" />
                <span>Yes</span>
              </button>
              <button
                onClick={() => handleHintFeedback(currentHint.level, false)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <AlertCircle className="h-3 w-3" />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Next Level Hint Option */}
          {currentHint.level < 4 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleHintRequest(currentHint.level + 1)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Need more help?</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Help Features Menu */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Additional Help</h3>
          <button
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showHelpMenu ? 'Hide' : 'Show'} Options
          </button>
        </div>

        {showHelpMenu && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={onExplainConcept}
              className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-left"
            >
              <BookOpen className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900 text-sm">Explain This Concept</div>
                <div className="text-blue-700 text-xs">Learn the underlying theory</div>
              </div>
            </button>

            <button
              onClick={onShowAlternative}
              className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-left"
            >
              <Eye className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium text-green-900 text-sm">Show Another Way</div>
                <div className="text-green-700 text-xs">Alternative solution method</div>
              </div>
            </button>

            <button
              onClick={onShowWhy}
              className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors text-left"
            >
              <Zap className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900 text-sm">Why Does This Work?</div>
                <div className="text-purple-700 text-xs">Conceptual understanding</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Hint Feedback Success */}
      {hintFeedback && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          hintFeedback.helpful ? 'bg-green-100 border border-green-200' : 'bg-orange-100 border border-orange-200'
        }`}>
          <div className="flex items-center space-x-2">
            {hintFeedback.helpful ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-600" />
            )}
            <span className={`text-sm font-medium ${
              hintFeedback.helpful ? 'text-green-800' : 'text-orange-800'
            }`}>
              {hintFeedback.helpful 
                ? 'Thanks! Glad the hint helped!' 
                : 'Thanks for the feedback. Let\'s try a different approach.'
              }
            </span>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {userProfile && (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Hint Usage Progress:</span>
            <span className="text-gray-900 font-medium">
              Using hints {Math.max(0, 20 - (userProfile.hintUsage || 0))}% less often - great improvement!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};