import React from 'react';
import { Calculator, Atom, BookOpen, Scroll, Globe, TrendingUp, ChevronRight, Clock, Lock } from 'lucide-react';
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
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
        isSelected && subject.available
          ? `${subject.bgColor} border-current ${subject.color} shadow-md`
          : subject.available
          ? 'bg-white border-gray-200 hover:border-gray-300'
          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-75'
      }`}
    >
      {/* Coming Soon Badge */}
      {subject.comingSoon && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          Coming Soon
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl ${isSelected && subject.available ? 'bg-white' : subject.bgColor}`}>
          {subject.available ? (
            <IconComponent className={`h-6 w-6 ${subject.color}`} />
          ) : (
            <Lock className="h-6 w-6 text-gray-400" />
          )}
        </div>
        {subject.available ? (
          <ChevronRight className={`h-5 w-5 transition-transform ${isSelected ? 'rotate-90' : ''} ${subject.color}`} />
        ) : (
          <Clock className="h-5 w-5 text-gray-400" />
        )}
      </div>

      <h3 className={`text-lg font-semibold mb-2 ${
        isSelected && subject.available ? subject.color : 
        subject.available ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {subject.name}
      </h3>

      <p className={`text-sm ${
        isSelected && subject.available ? subject.color.replace('600', '700') : 
        subject.available ? 'text-gray-600' : 'text-gray-500'
      }`}>
        {subject.description}
      </p>

      {subject.availabilityDate && (
        <div className="mt-3 flex items-center space-x-2">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-orange-600 font-medium">
            {subject.availabilityDate}
          </span>
        </div>
      )}
    </div>
  );
};