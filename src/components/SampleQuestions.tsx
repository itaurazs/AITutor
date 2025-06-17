import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Subject } from '../types/Subject';

interface SampleQuestionsProps {
  subject: Subject;
  onQuestionSelect: (question: string) => void;
}

export const SampleQuestions: React.FC<SampleQuestionsProps> = ({ subject, onQuestionSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Try These {subject.name} Examples
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {subject.sampleQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className={`w-full text-left p-3 ${subject.bgColor} hover:opacity-80 rounded-lg transition-colors group touch-manipulation`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs sm:text-sm ${subject.color.replace('600', '900')} line-clamp-2 pr-2`}>
                {question}
              </span>
              <ChevronRight className={`h-3 w-3 sm:h-4 sm:w-4 ${subject.color} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};