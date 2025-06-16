import React from 'react';
import { BookOpen, Video, FileText, ExternalLink, Download, Clock, Users, Star } from 'lucide-react';

interface EducationalResourcesProps {
  subject?: string;
}

export const EducationalResources: React.FC<EducationalResourcesProps> = ({ subject }) => {
  const resources = [
    {
      id: 1,
      title: 'Mathematics Study Guide',
      type: 'PDF Guide',
      subject: 'mathematics',
      description: 'Comprehensive guide covering algebra, geometry, and calculus fundamentals',
      icon: FileText,
      duration: '45 min read',
      difficulty: 'Beginner to Advanced',
      downloads: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Science Lab Experiments',
      type: 'Interactive',
      subject: 'science',
      description: 'Virtual lab experiments for physics, chemistry, and biology',
      icon: Video,
      duration: '30-60 min each',
      difficulty: 'Intermediate',
      downloads: 890,
      rating: 4.9
    },
    {
      id: 3,
      title: 'English Grammar Workbook',
      type: 'Workbook',
      subject: 'english',
      description: 'Practice exercises for grammar, punctuation, and writing skills',
      icon: BookOpen,
      duration: '2-3 hours',
      difficulty: 'All Levels',
      downloads: 2100,
      rating: 4.7
    },
    {
      id: 4,
      title: 'History Timeline Explorer',
      type: 'Interactive',
      subject: 'history',
      description: 'Interactive timelines of major historical events and periods',
      icon: Video,
      duration: 'Self-paced',
      difficulty: 'Beginner',
      downloads: 675,
      rating: 4.6
    },
    {
      id: 5,
      title: 'Geography Map Collection',
      type: 'Resource Pack',
      subject: 'geography',
      description: 'Detailed maps and geographical data for study and reference',
      icon: FileText,
      duration: 'Reference',
      difficulty: 'All Levels',
      downloads: 540,
      rating: 4.5
    },
    {
      id: 6,
      title: 'Economics Case Studies',
      type: 'Case Studies',
      subject: 'economics',
      description: 'Real-world economic scenarios and analysis exercises',
      icon: BookOpen,
      duration: '1-2 hours each',
      difficulty: 'Intermediate',
      downloads: 420,
      rating: 4.8
    }
  ];

  const filteredResources = subject 
    ? resources.filter(resource => resource.subject === subject)
    : resources;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Educational Resources
          </h3>
          <p className="text-sm text-gray-600">
            Supplementary materials to enhance your learning experience
          </p>
        </div>
        <div className="bg-blue-100 p-2 rounded-lg">
          <BookOpen className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.slice(0, 4).map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {resource.type}
                </span>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {resource.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {resource.description}
              </p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{resource.downloads}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(resource.rating)}
                    <span className="text-xs text-gray-500 ml-1">{resource.rating}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    {resource.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All Resources ({filteredResources.length})
          </button>
        </div>
      )}
    </div>
  );
};