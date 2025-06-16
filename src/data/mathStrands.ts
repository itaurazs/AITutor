export interface MathStrand {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  topics: string[];
  sampleQuestions: string[];
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
}

export const year7MathStrands: MathStrand[] = [
  {
    id: 'number',
    name: 'Number',
    description: 'Integers, fractions, decimals, percentages, and financial mathematics',
    icon: 'Calculator',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    topics: [
      'Positive and negative integers',
      'Adding and subtracting integers',
      'Fractions and mixed numbers',
      'Decimal operations',
      'Percentage calculations',
      'Financial mathematics',
      'Simple interest',
      'Profit and loss'
    ],
    sampleQuestions: [
      'Calculate: (-5) + 8 - (-3)',
      'Convert 3/4 to a decimal and percentage',
      'Find 25% of $120',
      'Calculate simple interest on $500 at 4% for 2 years',
      'What is the profit if an item costs $80 and sells for $100?'
    ],
    progress: 0,
    totalLessons: 12,
    completedLessons: 0
  },
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Variables, expressions, and simple linear equations',
    icon: 'Variable',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    topics: [
      'Variables and expressions',
      'Substitution into formulas',
      'Simplifying expressions',
      'Collecting like terms',
      'Simple linear equations',
      'Solving for unknown values',
      'Number patterns',
      'Algebraic reasoning'
    ],
    sampleQuestions: [
      'Simplify: 3x + 2x - x',
      'Solve for x: 2x + 5 = 17',
      'If y = 3x + 2, find y when x = 4',
      'Find the next term in the pattern: 2, 5, 8, 11, ...',
      'Expand: 3(x + 4)'
    ],
    progress: 0,
    totalLessons: 10,
    completedLessons: 0
  },
  {
    id: 'measurement',
    name: 'Measurement',
    description: 'Units, area, volume, time, and measurement applications',
    icon: 'Ruler',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    topics: [
      'Metric units and conversions',
      'Area of rectangles and triangles',
      'Perimeter calculations',
      'Volume of rectangular prisms',
      'Time calculations',
      'Scale and maps',
      'Measurement accuracy',
      'Practical applications'
    ],
    sampleQuestions: [
      'Convert 2.5 km to metres',
      'Find the area of a rectangle with length 8cm and width 5cm',
      'Calculate the volume of a box 10cm × 6cm × 4cm',
      'How many minutes are in 2.5 hours?',
      'Find the perimeter of a triangle with sides 5cm, 7cm, and 9cm'
    ],
    progress: 0,
    totalLessons: 11,
    completedLessons: 0
  },
  {
    id: 'space',
    name: 'Space & Geometry',
    description: 'Geometric shapes, coordinates, transformations, and spatial reasoning',
    icon: 'Shapes',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    topics: [
      'Properties of 2D shapes',
      'Angles and angle relationships',
      'Coordinate geometry',
      'Transformations (reflection, rotation, translation)',
      'Parallel and perpendicular lines',
      'Symmetry',
      '3D objects and nets',
      'Spatial visualization'
    ],
    sampleQuestions: [
      'Find the missing angle in a triangle with angles 60° and 45°',
      'Plot the point (3, -2) on a coordinate plane',
      'Describe the transformation from triangle A to triangle B',
      'How many lines of symmetry does a regular hexagon have?',
      'What is the sum of interior angles in a quadrilateral?'
    ],
    progress: 0,
    totalLessons: 13,
    completedLessons: 0
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'Data collection, graphs, averages, and data interpretation',
    icon: 'BarChart',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    topics: [
      'Data collection methods',
      'Frequency tables',
      'Bar graphs and histograms',
      'Line graphs',
      'Pie charts',
      'Mean, median, and mode',
      'Range and outliers',
      'Interpreting data'
    ],
    sampleQuestions: [
      'Find the mean of: 12, 15, 18, 21, 24',
      'What is the median of: 3, 7, 9, 12, 15?',
      'Create a frequency table for the data: 2, 3, 2, 4, 3, 2, 5',
      'Interpret the trend shown in this line graph',
      'Which measure of central tendency is most appropriate for this data?'
    ],
    progress: 0,
    totalLessons: 9,
    completedLessons: 0
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Chance, simple events, and probability calculations',
    icon: 'Dice',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    topics: [
      'Language of chance',
      'Probability scale (0 to 1)',
      'Simple probability calculations',
      'Experimental vs theoretical probability',
      'Equally likely outcomes',
      'Probability of simple events',
      'Complementary events',
      'Tree diagrams (basic)'
    ],
    sampleQuestions: [
      'What is the probability of rolling a 6 on a fair die?',
      'Express the probability of getting heads when flipping a coin',
      'If there are 5 red balls and 3 blue balls in a bag, what is P(red)?',
      'What is the probability of NOT rolling a 1 on a die?',
      'Describe an event that has a probability of 0.5'
    ],
    progress: 0,
    totalLessons: 8,
    completedLessons: 0
  }
];

// Icon mapping for the strands
export const strandIconMap = {
  Calculator: 'Calculator',
  Variable: 'Variable',
  Ruler: 'Ruler',
  Shapes: 'Shapes',
  BarChart: 'BarChart3',
  Dice: 'Dice6'
};