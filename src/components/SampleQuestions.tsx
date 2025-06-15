import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Subject } from '../types/Subject';

interface SampleQuestionsProps {
  subject: Subject;
  onQuestionSelect: (question: string) => void;
}

export const SampleQuestions: React.FC<SampleQuestionsProps> = ({ subject, onQuestionSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Try These {subject.name} Examples
      </h3>
      <div className="space-y-3">
        {subject.sampleQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className={`w-full text-left p-3 ${subject.bgColor} hover:opacity-80 rounded-lg transition-colors group`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm ${subject.color.replace('600', '900')}`}>
                {question}
              </span>
              <ChevronRight className={`h-4 w-4 ${subject.color} group-hover:translate-x-1 transition-transform`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};