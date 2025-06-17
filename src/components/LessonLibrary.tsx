import React, { useState } from 'react';
import { BookOpen, Play, Clock, Award, CheckCircle, Lock, Search, Filter, Star } from 'lucide-react';
import { IntegersLesson } from './IntegersLesson';

interface Lesson {
  id: string;
  title: string;
  curriculumCode: string;
  strand: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  completed: boolean;
  score?: number;
  prerequisites?: string[];
}

interface LessonLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LessonLibrary: React.FC<LessonLibraryProps> = ({ isOpen, onClose }) => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrand, setFilterStrand] = useState<string>('all');
  const [completedLessons, setCompletedLessons] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const lessons: Lesson[] = [
    {
      id: 'integers-positive-negative',
      title: 'Positive and Negative Integers',
      curriculumCode: 'AC9M7N01',
      strand: 'Number',
      duration: '15-20 minutes',
      difficulty: 'Beginner',
      description: 'Learn about integers with Australian contexts including temperature, altitude, and financial situations.',
      completed: !!completedLessons['integers-positive-negative'],
      score: completedLessons['integers-positive-negative']
    },
    {
      id: 'adding-subtracting-integers',
      title: 'Adding and Subtracting Integers',
      curriculumCode: 'AC9M7N02',
      strand: 'Number',
      duration: '20-25 minutes',
      difficulty: 'Intermediate',
      description: 'Master integer operations with real-world Australian examples and problem-solving strategies.',
      completed: false,
      prerequisites: ['integers-positive-negative']
    },
    {
      id: 'fractions-mixed-numbers',
      title: 'Fractions and Mixed Numbers',
      curriculumCode: 'AC9M7N03',
      strand: 'Number',
      duration: '25-30 minutes',
      difficulty: 'Intermediate',
      description: 'Work with fractions using Australian cooking recipes, sports statistics, and measurement contexts.',
      completed: false
    },
    {
      id: 'decimal-operations',
      title: 'Decimal Operations',
      curriculumCode: 'AC9M7N04',
      strand: 'Number',
      duration: '20-25 minutes',
      difficulty: 'Intermediate',
      description: 'Practice decimal calculations with Australian currency, measurements, and real-world applications.',
      completed: false
    },
    {
      id: 'percentage-calculations',
      title: 'Percentage Calculations',
      curriculumCode: 'AC9M7N05',
      strand: 'Number',
      duration: '25-30 minutes',
      difficulty: 'Intermediate',
      description: 'Calculate percentages using Australian retail prices, GST, discounts, and statistical data.',
      completed: false
    },
    {
      id: 'financial-mathematics-gst',
      title: 'Financial Mathematics with GST',
      curriculumCode: 'AC9M7N06',
      strand: 'Number',
      duration: '30-35 minutes',
      difficulty: 'Advanced',
      description: 'Master Australian GST calculations, retail pricing, and financial problem-solving.',
      completed: false,
      prerequisites: ['percentage-calculations']
    }
  ];

  const strands = ['all', 'Number', 'Algebra', 'Measurement', 'Space & Geometry', 'Statistics', 'Probability'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.curriculumCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStrand = filterStrand === 'all' || lesson.strand === filterStrand;
    return matchesSearch && matchesStrand;
  });

  const handleLessonComplete = (lessonId: string, score: number) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: score
    }));
    setSelectedLesson(null);
  };

  const isLessonLocked = (lesson: Lesson) => {
    if (!lesson.prerequisites) return false;
    return lesson.prerequisites.some(prereq => !completedLessons[prereq]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Interactive Lesson Library</h2>
                <p className="text-blue-100 mt-1">Australian Curriculum v9.0 • Year 7 Mathematics</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStrand}
                onChange={(e) => setFilterStrand(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {strands.map(strand => (
                  <option key={strand} value={strand}>
                    {strand === 'all' ? 'All Strands' : strand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => {
                const isLocked = isLessonLocked(lesson);
                
                return (
                  <div
                    key={lesson.id}
                    className={`border-2 rounded-xl p-6 transition-all ${
                      isLocked
                        ? 'border-gray-200 bg-gray-50 opacity-75'
                        : lesson.completed
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !isLocked && setSelectedLesson(lesson.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {isLocked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Play className="h-5 w-5 text-blue-600" />
                        )}
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                          {lesson.curriculumCode}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lesson.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{lesson.strand}</span>
                      </div>
                    </div>

                    {lesson.completed && lesson.score && (
                      <div className="mt-3 flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-gray-900">Score: {lesson.score}%</span>
                      </div>
                    )}

                    {isLocked && lesson.prerequisites && (
                      <div className="mt-3 text-xs text-gray-500">
                        Complete: {lesson.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredLessons.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Modals */}
      {selectedLesson === 'integers-positive-negative' && (
        <IntegersLesson
          isOpen={true}
          onClose={() => setSelectedLesson(null)}
          onComplete={(score) => handleLessonComplete('integers-positive-negative', score)}
        />
      )}
    </>
  );
};