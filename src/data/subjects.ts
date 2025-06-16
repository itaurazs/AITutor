import { Subject } from '../types/Subject';

export const subjects: Subject[] = [
  {
    id: 'year7-mathematics',
    name: 'Year 7 Mathematics',
    icon: 'Calculator',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Australian Curriculum v9.0 aligned - Number, Algebra, Measurement, Geometry, Statistics',
    available: true,
    sampleQuestions: [
      "Solve for x: 2x + 5 = 17",
      "Find the area of a rectangle with length 8cm and width 5cm",
      "Simplify: 3(x + 4) - 2x",
      "What is 25% of 80?",
      "Convert 0.75 to a fraction in simplest form",
      "Find the mean of: 12, 15, 18, 21, 24"
    ]
  },
  {
    id: 'year8-mathematics',
    name: 'Year 8 Mathematics',
    icon: 'Calculator',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    description: 'Coming Soon - Advanced algebra, geometry, and data analysis',
    available: false,
    comingSoon: true,
    availabilityDate: 'Term 1, 2026',
    sampleQuestions: []
  },
  {
    id: 'year9-mathematics',
    name: 'Year 9 Mathematics',
    icon: 'Calculator',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    description: 'Coming Soon - Quadratic equations, trigonometry, and probability',
    available: false,
    comingSoon: true,
    availabilityDate: 'Term 2, 2026',
    sampleQuestions: []
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'Atom',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    description: 'Coming Soon - Physics, Chemistry, Biology concepts and problems',
    available: false,
    comingSoon: true,
    availabilityDate: 'Term 1, 2026',
    sampleQuestions: []
  },
  {
    id: 'english',
    name: 'English & Grammar',
    icon: 'BookOpen',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    description: 'Coming Soon - Grammar, Literature, Writing, and Language Arts',
    available: false,
    comingSoon: true,
    availabilityDate: 'Term 2, 2026',
    sampleQuestions: []
  },
  {
    id: 'history',
    name: 'History',
    icon: 'Scroll',
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    description: 'Coming Soon - Australian and World History',
    available: false,
    comingSoon: true,
    availabilityDate: 'Term 3, 2026',
    sampleQuestions: []
  }
];