import { Subject } from '../types/Subject';

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Calculator',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Algebra, Geometry, Calculus, Statistics and more',
    sampleQuestions: [
      "Solve for x: 2x + 5 = 17",
      "Find the area of a circle with radius 7cm",
      "Simplify: (3x² + 2x - 1) + (x² - 4x + 3)",
      "What is the slope of the line passing through (2,3) and (5,9)?",
      "Factor: x² - 5x + 6",
      "Find the derivative of f(x) = 3x² + 2x - 1"
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'Atom',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Physics, Chemistry, Biology concepts and problems',
    sampleQuestions: [
      "Explain photosynthesis and its chemical equation",
      "Calculate the force needed to accelerate a 10kg object at 5m/s²",
      "What happens during mitosis?",
      "Balance this equation: H₂ + O₂ → H₂O",
      "Explain Newton's three laws of motion",
      "What is the difference between DNA and RNA?"
    ]
  },
  {
    id: 'english',
    name: 'English & Grammar',
    icon: 'BookOpen',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Grammar, Literature, Writing, and Language Arts',
    sampleQuestions: [
      "What is the difference between active and passive voice?",
      "Identify the literary devices in this sentence",
      "How do I write a strong thesis statement?",
      "Explain the difference between metaphor and simile",
      "What are the parts of speech?",
      "How do I properly cite sources in MLA format?"
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: 'Scroll',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'World History, American History, and Social Studies',
    sampleQuestions: [
      "What were the causes of World War I?",
      "Explain the significance of the Industrial Revolution",
      "What led to the American Civil War?",
      "Describe the impact of the Renaissance",
      "What was the Cold War about?",
      "Explain the French Revolution and its consequences"
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: 'Globe',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Physical Geography, Human Geography, and Earth Sciences',
    sampleQuestions: [
      "Explain how mountains are formed",
      "What causes different climate zones?",
      "Describe the water cycle",
      "What is plate tectonics?",
      "How do rivers shape the landscape?",
      "Explain population distribution patterns"
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: 'TrendingUp',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Basic Economics, Supply & Demand, Market Systems',
    sampleQuestions: [
      "What is supply and demand?",
      "Explain inflation and its causes",
      "What is the difference between capitalism and socialism?",
      "How do interest rates affect the economy?",
      "What is GDP and how is it calculated?",
      "Explain opportunity cost with an example"
    ]
  }
];