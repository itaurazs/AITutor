export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  available: boolean;
  comingSoon?: boolean;
  availabilityDate?: string;
  sampleQuestions: string[];
}

export interface Step {
  number: number;
  title: string;
  content: string;
  formula?: string;
  calculation?: string;
  example?: string;
}

export interface Question {
  id: string;
  question: string;
  subject: string;
  steps: Step[];
  keyPoints: string[];
  timestamp: Date;
}