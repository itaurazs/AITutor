import React from 'react';
import { Calculator, Atom, BookOpen, Scroll, Globe, TrendingUp, ChevronRight } from 'lucide-react';
import { Subject } from '../types/Subject';

const iconMap = {
  Calculator,
  Atom,
  BookOpen,
  Scroll,
  Globe,
  TrendingUp,
};

interface SubjectCardProps {
  subject: Subject;
  isSelected: boolean;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isSelected, onClick }) => {
  const IconComponent = iconMap[subject.icon as keyof typeof iconMap];
  
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? `${subject.bgColor} border-current ${subject.color} shadow-md`
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl ${isSelected ? 'bg-white' : subject.bgColor}`}>
          <IconComponent className={`h-6 w-6 ${subject.color}`} />
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${isSelected ? 'rotate-90' : ''} ${subject.color}`} />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isSelected ? subject.color : 'text-gray-900'}`}>
        {subject.name}
      </h3>
      <p className={`text-sm ${isSelected ? subject.color.replace('600', '700') : 'text-gray-600'}`}>
        {subject.description}
      </p>
    </div>
  );
};