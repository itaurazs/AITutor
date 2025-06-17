import React, { useState } from 'react';
import { Zap, BookOpen, Target, Lightbulb, ArrowRight, X } from 'lucide-react';

interface WhyItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: string;
  subject: string;
}

export const WhyItWorksModal: React.FC<WhyItWorksModalProps> = ({
  isOpen,
  onClose,
  concept,
  subject
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isOpen) return null;

  // Generate conceptual explanation based on concept and subject
  const getConceptualExplanation = () => {
    // This would be more sophisticated in a real implementation
    const explanations: Record<string, any> = {
      'fractions': {
        title: 'Why Fractions Work',
        basicExplanation: `Fractions represent parts of a whole. They work because they allow us to divide things into equal parts and talk about those parts precisely.

When we add fractions with different denominators, we need a common denominator because we can only add like parts (e.g., thirds with thirds, quarters with quarters).

It's like trying to add 3 apples and 2 oranges - you can't say "5 apples" or "5 oranges". But if you convert both to "fruits", you can say "5 fruits".`,
        
        advancedExplanation: `Mathematically, fractions are elements of a field extension of the integers. They form the field of rational numbers ℚ.

The need for common denominators when adding fractions comes from the definition of addition in this field:

a/b + c/d = (ad + bc)/bd

This formula ensures that addition of fractions satisfies the field axioms, particularly the associative and commutative properties.`,
        
        realWorldApplications: [
          'Cooking (1/2 cup of flour)',
          'Construction (3/4 inch measurement)',
          'Finance (1/4 of your budget)',
          'Time (3/4 of an hour)'
        ],
        
        connections: [
          'Fractions connect to decimals (1/4 = 0.25)',
          'Fractions connect to percentages (1/4 = 25%)',
          'Fractions connect to division (1/4 means 1÷4)',
          'Fractions connect to ratios (1:4 relationship)'
        ]
      },
      
      'percentages': {
        title: 'Why Percentages Work',
        basicExplanation: `Percentages work because they give us a standard way to talk about parts of a whole, always out of 100.

This standardization makes comparisons easy. If one test score is 80% and another is 75%, you can immediately compare them because they're both out of 100.

Percentages are especially useful for calculations. Finding 10% is just dividing by 10, and you can use that to find other percentages (e.g., 5% is half of 10%).`,
        
        advancedExplanation: `Percentages are essentially fractions with denominator 100, which simplifies many calculations by providing a standard reference point.

The power of percentages comes from their connection to decimal multiplication:
x% of y = (x/100) × y = 0.01x × y

This allows for efficient calculation and comparison across different contexts and scales.`,
        
        realWorldApplications: [
          'Sales tax (GST is 10% in Australia)',
          'Discounts (20% off sale)',
          'Interest rates (3.5% home loan)',
          'Test scores (85% on an exam)'
        ],
        
        connections: [
          'Percentages connect to fractions (25% = 1/4)',
          'Percentages connect to decimals (25% = 0.25)',
          'Percentages connect to ratios (25% = 25:100 = 1:4)',
          'Percentages connect to probability (25% chance = 0.25 probability)'
        ]
      },
      
      'algebra': {
        title: 'Why Algebra Works',
        basicExplanation: `Algebra works because it follows logical rules that preserve equality. When we solve equations, we're using these rules to isolate the variable.

The golden rule of algebra is: whatever you do to one side of an equation, you must do to the other side. This maintains balance.

It's like a balance scale - if you add 3kg to one side, you must add 3kg to the other side to keep it balanced.`,
        
        advancedExplanation: `Algebraic manipulation is based on the field axioms and properties of equality. 

When we solve equations, we apply inverse operations to isolate variables:
- Addition is undone by subtraction
- Multiplication is undone by division
- Powers are undone by roots

These operations form groups under the algebraic structure, allowing us to transform equations while preserving their solutions.`,
        
        realWorldApplications: [
          'Finding unknown values (age problems)',
          'Financial planning (savings calculations)',
          'Engineering (structural formulas)',
          'Computer programming (algorithms)'
        ],
        
        connections: [
          'Algebra connects to geometry (formulas for area, volume)',
          'Algebra connects to functions (y = f(x))',
          'Algebra connects to calculus (solving equations)',
          'Algebra connects to logic (if-then relationships)'
        ]
      }
    };

    // Default explanation if specific concept not found
    const defaultExplanation = {
      title: `Why ${concept} Works`,
      basicExplanation: `This mathematical concept works because it follows logical rules and patterns that are consistent and reliable.

The underlying principles are based on mathematical axioms that have been proven over centuries.

Understanding why it works helps you apply it correctly to different problems and situations.`,
      
      advancedExplanation: `The mathematical foundations of this concept are built on formal definitions and properties that ensure consistency across applications.

These properties allow us to manipulate expressions and equations while maintaining their validity.`,
      
      realWorldApplications: [
        'Practical problem-solving',
        'Measurement and calculation',
        'Data analysis',
        'Decision making'
      ],
      
      connections: [
        'Connects to other mathematical concepts',
        'Builds on fundamental principles',
        'Leads to more advanced topics',
        'Applies across different contexts'
      ]
    };

    // Find the best match for the concept
    const key = Object.keys(explanations).find(k => 
      concept.toLowerCase().includes(k) || k.includes(concept.toLowerCase())
    );

    return key ? explanations[key] : defaultExplanation;
  };

  const explanation = getConceptualExplanation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6" />
              <div>
                <h2 className="text-2xl font-bold">{explanation.title}</h2>
                <p className="text-purple-100 mt-1">Understanding the conceptual foundations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Explanation */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900">Conceptual Understanding</h3>
              </div>
              
              <div className="prose prose-purple max-w-none">
                <pre className="whitespace-pre-wrap text-purple-800 font-sans text-base leading-relaxed">
                  {explanation.basicExplanation}
                </pre>
              </div>
            </div>

            {/* Advanced Explanation (Toggle) */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900">Mathematical Foundation</h3>
                </div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {showAdvanced ? 'Show Less' : 'Show More'}
                </button>
              </div>
              
              {showAdvanced ? (
                <div className="prose prose-blue max-w-none">
                  <pre className="whitespace-pre-wrap text-blue-800 font-sans text-base leading-relaxed">
                    {explanation.advancedExplanation}
                  </pre>
                </div>
              ) : (
                <p className="text-blue-800">
                  Click "Show More" to see the deeper mathematical explanation.
                </p>
              )}
            </div>

            {/* Real-World Applications */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900">Real-World Applications</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {explanation.realWorldApplications.map((application, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-green-200">
                    <ArrowRight className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-green-800">{application}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connections to Other Concepts */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-900">Connections to Other Concepts</h3>
              </div>
              
              <div className="space-y-3">
                {explanation.connections.map((connection, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-yellow-800">{connection}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Understanding "why" helps you remember and apply concepts better!
            </div>
            <button
              onClick={onClose}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};