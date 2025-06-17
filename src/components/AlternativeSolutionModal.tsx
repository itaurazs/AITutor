import React, { useState } from 'react';
import { Eye, ArrowRight, CheckCircle, Lightbulb, Target, X } from 'lucide-react';

interface AlternativeSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  subject: string;
}

export const AlternativeSolutionModal: React.FC<AlternativeSolutionModalProps> = ({
  isOpen,
  onClose,
  question,
  subject
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'visual' | 'algebraic' | 'numerical'>('visual');

  if (!isOpen) return null;

  // Generate alternative solutions based on question and subject
  const getAlternativeSolutions = () => {
    // This would be more sophisticated in a real implementation
    const solutions = {
      visual: {
        title: 'Visual Method',
        description: 'Solving through diagrams and visual representations',
        steps: [
          'Draw a visual representation of the problem',
          'Use the diagram to identify relationships',
          'Solve visually, then verify numerically'
        ],
        example: 'For fractions, use pie charts or bar models to visualize the parts and whole.',
        advantages: [
          'Helps visual learners understand concepts',
          'Makes abstract ideas concrete',
          'Useful for checking answers'
        ]
      },
      algebraic: {
        title: 'Algebraic Method',
        description: 'Solving through equations and algebraic manipulation',
        steps: [
          'Set up an equation using variables',
          'Apply algebraic operations to isolate the variable',
          'Solve for the unknown value'
        ],
        example: 'For percentage problems, use the equation part = percentage × whole.',
        advantages: [
          'Works for complex problems',
          'Develops algebraic thinking',
          'Provides exact solutions'
        ]
      },
      numerical: {
        title: 'Numerical Method',
        description: 'Solving through calculations and number operations',
        steps: [
          'Break down the problem into numerical steps',
          'Perform calculations in a logical sequence',
          'Verify the answer makes sense'
        ],
        example: 'For GST calculations, multiply by 1.1 or divide by 1.1 depending on the question.',
        advantages: [
          'Often faster for simple problems',
          'Builds computational fluency',
          'Practical for everyday situations'
        ]
      }
    };

    return solutions;
  };

  const solutions = getAlternativeSolutions();
  const currentSolution = solutions[selectedMethod];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-6 w-6" />
              <div>
                <h2 className="text-2xl font-bold">Alternative Solution Methods</h2>
                <p className="text-green-100 mt-1">Different ways to approach the same problem</p>
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

        {/* Method Selector */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {Object.entries(solutions).map(([method, data]) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedMethod === method
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Original Question */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Original Question:</h3>
              <p className="text-blue-800">{question}</p>
            </div>

            {/* Method Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{currentSolution.title}</h3>
              <p className="text-gray-700 mb-4">{currentSolution.description}</p>
              
              {/* Steps */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Solution Steps:</h4>
                <div className="space-y-3">
                  {currentSolution.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex-1">
                        <p className="text-green-800">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-6">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Example:</h4>
                    <p className="text-yellow-800">{currentSolution.example}</p>
                  </div>
                </div>
              </div>

              {/* Advantages */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Advantages of this Method:</h4>
                <ul className="space-y-2">
                  {currentSolution.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* When to Use This Method */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">When to Use This Method:</h3>
              <div className="space-y-2">
                {selectedMethod === 'visual' && (
                  <>
                    <p className="text-purple-800">Visual methods work best when:</p>
                    <ul className="space-y-1 text-purple-800">
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>You're a visual learner</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>The problem involves fractions, percentages, or ratios</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>You want to check your algebraic solution</span>
                      </li>
                    </ul>
                  </>
                )}

                {selectedMethod === 'algebraic' && (
                  <>
                    <p className="text-purple-800">Algebraic methods work best when:</p>
                    <ul className="space-y-1 text-purple-800">
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>The problem involves unknown values</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>You need a precise, exact solution</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>The problem is complex with multiple relationships</span>
                      </li>
                    </ul>
                  </>
                )}

                {selectedMethod === 'numerical' && (
                  <>
                    <p className="text-purple-800">Numerical methods work best when:</p>
                    <ul className="space-y-1 text-purple-800">
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>The problem is straightforward with clear steps</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>You're working with specific numbers rather than variables</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>You need a quick solution for a practical problem</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Try applying this method to your original question!
            </div>
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2"
            >
              <span>Try It Myself</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};