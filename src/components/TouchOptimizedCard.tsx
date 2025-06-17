import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TouchOptimizedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  onClick: () => void;
  disabled?: boolean;
  badge?: string;
  progress?: number;
  children?: React.ReactNode;
}

export const TouchOptimizedCard: React.FC<TouchOptimizedCardProps> = ({
  title,
  description,
  icon,
  color,
  bgColor,
  onClick,
  disabled = false,
  badge,
  progress,
  children
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 touch-manipulation ${
        disabled
          ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg cursor-pointer active:scale-[0.98]'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="flex justify-end mb-2">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${
          disabled ? 'text-gray-400' : `${color} group-hover:translate-x-1`
        }`} />
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className={`text-lg font-semibold mb-2 ${disabled ? 'text-gray-500' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                progress > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Additional Content */}
      {children}

      {/* Action Area */}
      <div className="pt-2 border-t border-gray-100">
        <div className={`text-sm font-medium ${disabled ? 'text-gray-400' : color}`}>
          {disabled ? 'Coming Soon' : 'Tap to explore'}
        </div>
      </div>
    </div>
  );
};