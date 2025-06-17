import React, { useState } from 'react';
import { BookOpen, Play, Eye, Zap, ArrowRight, CheckCircle, Lightbulb, Target } from 'lucide-react';

interface ConceptExplainerProps {
  concept: string;
  subject: string;
  onClose: () => void;
}

export const ConceptExplainer: React.FC<ConceptExplainerProps> = ({
  concept,
  subject,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'examples' | 'practice'>('explanation');
  const [showVideo, setShowVideo] = useState(false);

  const getConceptData = () => {
    // This would normally come from a comprehensive database
    const conceptDatabase: Record<string, any> = {
      'fractions': {
        title: 'Understanding Fractions',
        explanation: `A fraction represents a part of a whole. It consists of two numbers:
        
• **Numerator** (top number): How many parts we have
• **Denominator** (bottom number): How many equal parts the whole is divided into

Think of a pizza cut into 8 slices. If you eat 3 slices, you've eaten 3/8 of the pizza.

**Key Concepts:**
- Equivalent fractions: Different fractions that represent the same amount (1/2 = 2/4 = 4/8)
- Simplifying: Reducing fractions to their lowest terms
- Common denominators: Making fractions have the same bottom number for adding/subtracting`,
        
        examples: [
          {
            title: 'Pizza Example',
            content: 'A pizza is cut into 8 slices. You eat 3 slices. What fraction did you eat?',
            solution: 'You ate 3 out of 8 slices, so you ate 3/8 of the pizza.'
          },
          {
            title: 'Chocolate Bar',
            content: 'A chocolate bar has 12 squares. You eat 4 squares. What fraction is left?',
            solution: 'You ate 4/12, which simplifies to 1/3. So 8/12 or 2/3 is left.'
          }
        ],
        
        practiceQuestions: [
          'What fraction of this rectangle is shaded if 3 out of 5 parts are colored?',
          'Simplify the fraction 6/9',
          'Which is larger: 2/3 or 3/4?'
        ],
        
        realWorldConnections: [
          'Cooking recipes (1/2 cup of flour)',
          'Time (1/4 of an hour = 15 minutes)',
          'Money (1/4 of a dollar = 25 cents)',
          'Sports scores (won 3/4 of games played)'
        ]
      },
      
      'percentages': {
        title: 'Understanding Percentages',
        explanation: `Percentage means "out of 100" (per cent = per hundred).

**Key Ideas:**
- 50% = 50 out of 100 = 1/2 = 0.5
- 25% = 25 out of 100 = 1/4 = 0.25
- 100% = the whole thing

**Converting:**
- Fraction to percentage: Divide top by bottom, multiply by 100
- Percentage to decimal: Divide by 100
- Percentage to fraction: Put over 100, then simplify

**Australian Context:**
- GST is 10% (Goods and Services Tax)
- Interest rates are often given as percentages
- Test scores and grades use percentages`,
        
        examples: [
          {
            title: 'Test Score',
            content: 'You got 17 out of 20 questions correct. What percentage is this?',
            solution: '17 ÷ 20 = 0.85 = 85%'
          },
          {
            title: 'GST Calculation',
            content: 'A shirt costs $40 plus 10% GST. What\'s the total price?',
            solution: '10% of $40 = $4. Total = $40 + $4 = $44'
          }
        ],
        
        practiceQuestions: [
          'Convert 3/4 to a percentage',
          'What is 15% of 80?',
          'If 60% of students passed, and there are 25 students, how many passed?'
        ],
        
        realWorldConnections: [
          'Sales discounts (20% off)',
          'Tax rates (GST is 10%)',
          'Interest rates on savings',
          'Sports statistics (shooting percentage)'
        ]
      },
      
      'algebra': {
        title: 'Introduction to Algebra',
        explanation: `Algebra uses letters (variables) to represent unknown numbers.

**Key Concepts:**
- Variables: Letters like x, y, a, b that represent unknown numbers
- Expressions: Mathematical phrases like 3x + 5
- Equations: Mathematical sentences with an equals sign like 2x + 3 = 11
- Solving: Finding the value of the variable that makes the equation true

**Golden Rule:**
Whatever you do to one side of an equation, you must do to the other side.

**Order of Operations (BODMAS):**
- Brackets first
- Orders (powers/indices)
- Division and Multiplication (left to right)
- Addition and Subtraction (left to right)`,
        
        examples: [
          {
            title: 'Simple Equation',
            content: 'Solve: x + 5 = 12',
            solution: 'Subtract 5 from both sides: x + 5 - 5 = 12 - 5, so x = 7'
          },
          {
            title: 'Two-Step Equation',
            content: 'Solve: 2x + 3 = 11',
            solution: 'Subtract 3: 2x = 8. Divide by 2: x = 4'
          }
        ],
        
        practiceQuestions: [
          'Solve: x - 7 = 15',
          'Solve: 3x = 21',
          'Solve: 2x + 5 = 17'
        ],
        
        realWorldConnections: [
          'Age problems (In 5 years, I\'ll be x + 5 years old)',
          'Money problems (If I save $x per week...)',
          'Distance and speed calculations',
          'Recipe scaling (double the recipe means 2x ingredients)'
        ]
      }
    };

    const key = concept.toLowerCase();
    return conceptDatabase[key] || {
      title: `Understanding ${concept}`,
      explanation: `This concept is fundamental to ${subject}. Let's break it down step by step.`,
      examples: [],
      practiceQuestions: [],
      realWorldConnections: []
    };
  };

  const conceptData = getConceptData();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{conceptData.title}</h2>
              <p className="text-blue-100 mt-1">Deep dive into the concept</p>
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
            {[
              { id: 'explanation', label: 'Explanation', icon: BookOpen },
              { id: 'examples', label: 'Examples', icon: Lightbulb },
              { id: 'practice', label: 'Practice', icon: Target }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600'
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
          {/* Explanation Tab */}
          {activeTab === 'explanation' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Core Concept</h3>
                <div className="prose prose-blue max-w-none">
                  <pre className="whitespace-pre-wrap text-blue-800 font-sans text-sm leading-relaxed">
                    {conceptData.explanation}
                  </pre>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Video Explanation</h3>
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Video</span>
                  </button>
                </div>
                
                {showVideo ? (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <Play className="h-16 w-16 text-white mx-auto mb-4" />
                    <p className="text-white">Video explanation would play here</p>
                    <p className="text-gray-300 text-sm mt-2">
                      Interactive video with step-by-step visual explanations
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-lg p-8 text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to watch a 3-minute explanation video</p>
                  </div>
                )}
              </div>

              {/* Real-World Connections */}
              {conceptData.realWorldConnections.length > 0 && (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Real-World Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {conceptData.realWorldConnections.map((connection: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-sm">{connection}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-6">
              {conceptData.examples.map((example: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Example {index + 1}: {example.title}
                  </h3>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Problem:</h4>
                    <p className="text-blue-800">{example.content}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                    <p className="text-green-800">{example.solution}</p>
                  </div>
                </div>
              ))}

              {/* Alternative Methods */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">Alternative Methods</h3>
                </div>
                <p className="text-purple-800 mb-4">
                  There are often multiple ways to solve the same problem. Here are some alternative approaches:
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-purple-300">
                    <h4 className="font-semibold text-purple-900">Visual Method</h4>
                    <p className="text-purple-800 text-sm">Draw diagrams or use visual representations</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-300">
                    <h4 className="font-semibold text-purple-900">Calculator Method</h4>
                    <p className="text-purple-800 text-sm">Use technology to verify your work</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-300">
                    <h4 className="font-semibold text-purple-900">Mental Math</h4>
                    <p className="text-purple-800 text-sm">Develop shortcuts and estimation skills</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-900">Practice Questions</h3>
                </div>
                <p className="text-yellow-800 mb-4">
                  Try these questions to test your understanding:
                </p>
                
                <div className="space-y-4">
                  {conceptData.practiceQuestions.map((question: string, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-yellow-300">
                      <div className="flex items-start space-x-3">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 flex-1">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Does This Work? */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-900">Why Does This Work?</h3>
                </div>
                <p className="text-orange-800 mb-4">
                  Understanding the reasoning behind mathematical concepts helps you apply them confidently:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-orange-300">
                    <h4 className="font-semibold text-orange-900">Mathematical Foundation</h4>
                    <p className="text-orange-800 text-sm">
                      This concept builds on fundamental mathematical principles and logical reasoning.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-300">
                    <h4 className="font-semibold text-orange-900">Pattern Recognition</h4>
                    <p className="text-orange-800 text-sm">
                      Look for patterns and relationships that help you understand when and how to apply this concept.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-300">
                    <h4 className="font-semibold text-orange-900">Problem-Solving Strategy</h4>
                    <p className="text-orange-800 text-sm">
                      This concept provides a systematic approach to solving specific types of problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Need more help? Try asking specific questions about this concept.
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};