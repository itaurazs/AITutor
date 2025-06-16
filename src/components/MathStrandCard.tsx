import React from 'react';
import { Calculator, Variable, Ruler, Shapes, BarChart3, Dice6, ChevronRight, Award, Clock, BookOpen } from 'lucide-react';
import { MathStrand } from '../data/mathStrands';

const iconMap = {
  Calculator,
  Variable,
  Ruler,
  Shapes,
  BarChart: BarChart3,
  Dice: Dice6,
};

interface MathStrandCardProps {
  strand: MathStrand;
  onSelect: () => void;
}

export const MathStrandCard: React.FC<MathStrandCardProps> = ({ strand, onSelect }) => {
  const IconComponent = iconMap[strand.icon as keyof typeof iconMap] || Calculator;
  
  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg bg-white border-gray-200 hover:border-gray-300 group`}
    >
      {/* Australian Curriculum Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
          Australian Curriculum v9.0 Aligned
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Icon and Title */}
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-xl ${strand.bgColor}`}>
          <IconComponent className={`h-8 w-8 ${strand.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{strand.name}</h3>
          <p className="text-sm text-gray-600">{strand.description}</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{strand.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              strand.progress > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
            }`}
            style={{ width: `${strand.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">{strand.totalLessons}</span>
          </div>
          <span className="text-xs text-gray-600">Lessons</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Award className="h-4 w-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">{strand.completedLessons}</span>
          </div>
          <span className="text-xs text-gray-600">Completed</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-lg font-bold text-gray-900">{strand.topics.length}</span>
          </div>
          <span className="text-xs text-gray-600">Topics</span>
        </div>
      </div>

      {/* Key Topics Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Topics:</h4>
        <div className="flex flex-wrap gap-1">
          {strand.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${strand.bgColor} ${strand.color}`}
            >
              {topic}
            </span>
          ))}
          {strand.topics.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              +{strand.topics.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Start Learning Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all text-white bg-gradient-to-r ${
          strand.progress > 0 
            ? 'from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' 
            : 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } shadow-lg hover:shadow-xl`}
      >
        {strand.progress > 0 ? 'Continue Learning' : 'Start Learning'}
      </button>
    </div>
  );
};