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
  curriculumCodes?: string[];
  timeSpent?: number; // minutes
  masteryLevel?: 'beginning' | 'developing' | 'proficient' | 'mastered';
}

export const year7MathStrands: MathStrand[] = [
  {
    id: 'number',
    name: 'Number',
    description: 'Integers, fractions, decimals, percentages, and financial mathematics with Australian context',
    icon: 'Calculator',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    topics: [
      'Positive and negative integers (AC9M7N01)',
      'Adding and subtracting integers (AC9M7N02)',
      'Fractions and mixed numbers (AC9M7N03)',
      'Decimal operations (AC9M7N04)',
      'Percentage calculations (AC9M7N05)',
      'Financial mathematics with GST (AC9M7N06)',
      'Simple interest calculations (AC9M7N07)',
      'Profit, loss and Australian retail (AC9M7N08)'
    ],
    curriculumCodes: ['AC9M7N01',   'AC9M7N02', 'AC9M7N03', 'AC9M7N04', 'AC9M7N05', 'AC9M7N06', 'AC9M7N07', 'AC9M7N08'],
    sampleQuestions: [
      'Sarah is shopping at Woolworths and buys 3 items for $4.50 each. Calculate the total including 10% GST.',
      'The MCG has a capacity of 100,024 people. If 87,543 people attend a match, how many empty seats are there?',
      'Convert the fraction 3/4 to a decimal and percentage, then calculate 3/4 of the distance from Sydney to Melbourne (878 km).',
      'A student scores 17 out of 20 on a maths test. What percentage did they achieve?',
      'Calculate the simple interest on $2,500 invested at 3.5% per annum for 2 years (typical Australian savings rate).',
      'Coles sells a jacket for $89.95. If this includes 10% GST, what was the original price before GST?',
      'The population of Brisbane is approximately 2,560,720. Round this to the nearest 100,000.',
      'If the temperature in Melbourne drops from 8°C to -3°C overnight, what is the temperature change?'
    ],
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
  },
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Variables, expressions, and simple linear equations',
    icon: 'Variable',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    topics: [
      'Variables and expressions (AC9M7A01)',
      'Substitution into formulas (AC9M7A02)',
      'Simplifying expressions (AC9M7A03)',
      'Collecting like terms (AC9M7A04)',
      'Simple linear equations (AC9M7A05)',
      'Solving for unknown values (AC9M7A06)',
      'Number patterns (AC9M7A07)',
      'Algebraic reasoning (AC9M7A08)'
    ],
    curriculumCodes: ['AC9M7A01', 'AC9M7A02', 'AC9M7A03', 'AC9M7A04', 'AC9M7A05', 'AC9M7A06', 'AC9M7A07', 'AC9M7A08'],
    sampleQuestions: [
      'Simplify: 3x + 2x - x',
      'Solve for x: 2x + 5 = 17',
      'If y = 3x + 2, find y when x = 4',
      'Find the next term in the pattern: 2, 5, 8, 11, ...',
      'Expand: 3(x + 4)',
      'If the cost of a movie ticket is $t and popcorn costs $8, write an expression for the total cost of 3 tickets and 2 popcorns'
    ],
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
  },
  {
    id: 'measurement',
    name: 'Measurement',
    description: 'Units, area, volume, time, and measurement applications',
    icon: 'Ruler',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    topics: [
      'Metric units and conversions (AC9M7M01)',
      'Area of rectangles and triangles (AC9M7M02)',
      'Perimeter calculations (AC9M7M03)',
      'Volume of rectangular prisms (AC9M7M04)',
      'Time calculations (AC9M7M05)',
      'Scale and maps (AC9M7M06)',
      'Measurement accuracy (AC9M7M07)',
      'Practical applications (AC9M7M08)'
    ],
    curriculumCodes: ['AC9M7M01', 'AC9M7M02', 'AC9M7M03', 'AC9M7M04', 'AC9M7M05', 'AC9M7M06', 'AC9M7M07', 'AC9M7M08'],
    sampleQuestions: [
      'Convert 2.5 km to metres',
      'Find the area of a rectangle with length 8cm and width 5cm',
      'Calculate the volume of a box 10cm × 6cm × 4cm',
      'How many minutes are in 2.5 hours?',
      'Find the perimeter of a triangle with sides 5cm, 7cm, and 9cm',
      'A map has a scale of 1:50,000. If two cities are 4cm apart on the map, what is the actual distance?'
    ],
    progress: 0,
    totalLessons: 11,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
  },
  {
    id: 'space',
    name: 'Space & Geometry',
    description: 'Geometric shapes, coordinates, transformations, and spatial reasoning',
    icon: 'Shapes',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    topics: [
      'Properties of 2D shapes (AC9M7SP01)',
      'Angles and angle relationships (AC9M7SP02)',
      'Coordinate geometry (AC9M7SP03)',
      'Transformations (reflection, rotation, translation) (AC9M7SP04)',
      'Parallel and perpendicular lines (AC9M7SP05)',
      'Symmetry (AC9M7SP06)',
      '3D objects and nets (AC9M7SP07)',
      'Spatial visualization (AC9M7SP08)'
    ],
    curriculumCodes: ['AC9M7SP01', 'AC9M7SP02', 'AC9M7SP03', 'AC9M7SP04', 'AC9M7SP05', 'AC9M7SP06', 'AC9M7SP07', 'AC9M7SP08'],
    sampleQuestions: [
      'Find the missing angle in a triangle with angles 60° and 45°',
      'Plot the point (3, -2) on a coordinate plane',
      'Describe the transformation from triangle A to triangle B',
      'How many lines of symmetry does a regular hexagon have?',
      'What is the sum of interior angles in a quadrilateral?',
      'Draw the net of a cube and calculate its surface area if each edge is 4cm'
    ],
    progress: 0,
    totalLessons: 13,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'Data collection, graphs, averages, and data interpretation',
    icon: 'BarChart',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    topics: [
      'Data collection methods (AC9M7ST01)',
      'Frequency tables (AC9M7ST02)',
      'Bar graphs and histograms (AC9M7ST03)',
      'Line graphs (AC9M7ST04)',
      'Pie charts (AC9M7ST05)',
      'Mean, median, and mode (AC9M7ST06)',
      'Range and outliers (AC9M7ST07)',
      'Interpreting data (AC9M7ST08)'
    ],
    curriculumCodes: ['AC9M7ST01', 'AC9M7ST02', 'AC9M7ST03', 'AC9M7ST04', 'AC9M7ST05', 'AC9M7ST06', 'AC9M7ST07', 'AC9M7ST08'],
    sampleQuestions: [
      'Find the mean of: 12, 15, 18, 21, 24',
      'What is the median of: 3, 7, 9, 12, 15?',
      'Create a frequency table for the data: 2, 3, 2, 4, 3, 2, 5',
      'Interpret the trend shown in this line graph of Melbourne\'s monthly rainfall',
      'Which measure of central tendency is most appropriate for this data?',
      'Calculate the range of test scores: 78, 85, 92, 67, 88, 91, 73'
    ],
    progress: 0,
    totalLessons: 9,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Chance, simple events, and probability calculations',
    icon: 'Dice',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    topics: [
      'Language of chance (AC9M7P01)',
      'Probability scale (0 to 1) (AC9M7P02)',
      'Simple probability calculations (AC9M7P03)',
      'Experimental vs theoretical probability (AC9M7P04)',
      'Equally likely outcomes (AC9M7P05)',
      'Probability of simple events (AC9M7P06)',
      'Complementary events (AC9M7P07)',
      'Tree diagrams (basic) (AC9M7P08)'
    ],
    curriculumCodes: ['AC9M7P01', 'AC9M7P02', 'AC9M7P03', 'AC9M7P04', 'AC9M7P05', 'AC9M7P06', 'AC9M7P07', 'AC9M7P08'],
    sampleQuestions: [
      'What is the probability of rolling a 6 on a fair die?',
      'Express the probability of getting heads when flipping a coin',
      'If there are 5 red balls and 3 blue balls in a bag, what is P(red)?',
      'What is the probability of NOT rolling a 1 on a die?',
      'Describe an event that has a probability of 0.5',
      'In a class of 30 students, 18 are girls. What is the probability of randomly selecting a boy?'
    ],
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    timeSpent: 0,
    masteryLevel: 'beginning'
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