import { Subject } from '../types/Subject';

export interface HintData {
  level: 1 | 2 | 3 | 4;
  content: string;
  type: 'nudge' | 'method' | 'guidance' | 'example';
}

export interface HintUsageRecord {
  questionId: string;
  timestamp: Date;
  level: number;
  helpful: boolean;
  subject: string;
  concept: string;
}

class HintService {
  private static instance: HintService;
  private hintUsageHistory: HintUsageRecord[] = [];
  
  private constructor() {
    // Load hint history from localStorage
    try {
      const savedHistory = localStorage.getItem('hintUsageHistory');
      if (savedHistory) {
        this.hintUsageHistory = JSON.parse(savedHistory).map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading hint history:', error);
    }
  }

  public static getInstance(): HintService {
    if (!HintService.instance) {
      HintService.instance = new HintService();
    }
    return HintService.instance;
  }

  // Generate contextual hints based on question and subject
  generateHints(question: string, subject: string): HintData[] {
    const hints: HintData[] = [
      {
        level: 1,
        content: this.getGentleNudge(question, subject),
        type: 'nudge'
      },
      {
        level: 2,
        content: this.getMethodReminder(question, subject),
        type: 'method'
      },
      {
        level: 3,
        content: this.getStepGuidance(question, subject),
        type: 'guidance'
      },
      {
        level: 4,
        content: this.getWorkedExample(question, subject),
        type: 'example'
      }
    ];

    return hints;
  }

  private getGentleNudge(question: string, subject: string): string {
    // Detect question type and provide appropriate nudge
    if (question.toLowerCase().includes('decimal')) {
      return "Remember to check your decimal placement carefully. Count the decimal places!";
    }
    if (question.toLowerCase().includes('fraction')) {
      return "Think about finding a common denominator first. What's the smallest number both denominators divide into?";
    }
    if (question.toLowerCase().includes('percentage') || question.toLowerCase().includes('%')) {
      return "Remember: percentage means 'out of 100'. Try converting to a fraction or decimal first.";
    }
    if (question.toLowerCase().includes('area')) {
      return "For area, think about the shape. What formula applies to this type of shape?";
    }
    if (question.toLowerCase().includes('algebra') || question.includes('x')) {
      return "Remember to do the same operation to both sides of the equation.";
    }
    if (question.toLowerCase().includes('gst')) {
      return "Remember that GST in Australia is 10%. Think about whether you need to add or remove GST.";
    }
    
    // Default nudge
    return "Take a moment to identify what type of problem this is. What's the key information given?";
  }

  private getMethodReminder(question: string, subject: string): string {
    // Provide method reminders based on question type
    if (question.toLowerCase().includes('fraction')) {
      return "Method: To add/subtract fractions, convert to the same denominator first. To multiply fractions, multiply numerators and denominators separately. To divide fractions, multiply by the reciprocal of the second fraction.";
    }
    if (question.toLowerCase().includes('percentage')) {
      return "Method: To find a percentage of a number, convert the percentage to a decimal (divide by 100) and multiply. To find what percentage one number is of another, divide the first by the second and multiply by 100.";
    }
    if (question.toLowerCase().includes('area')) {
      return "Method: For rectangles, Area = length × width. For triangles, Area = ½ × base × height. For circles, Area = π × radius².";
    }
    if (question.toLowerCase().includes('algebra')) {
      return "Method: Isolate the variable by performing inverse operations. Addition is undone by subtraction, multiplication by division, etc. Work step by step, keeping the equation balanced.";
    }
    if (question.toLowerCase().includes('gst')) {
      return "Method: To find price including GST, multiply by 1.10 (add 10%). To find price excluding GST, divide by 1.10 (remove 10%).";
    }
    
    // Default method reminder
    return "Method: Break the problem into smaller steps. Identify what you know and what you need to find. Choose the appropriate formula or approach, then work through systematically.";
  }

  private getStepGuidance(question: string, subject: string): string {
    // Provide step-by-step guidance
    let steps = `Let's break this into smaller steps:

1. First, identify what type of problem this is
2. Write down what information you have
3. Determine what you need to find
4. Choose the appropriate method or formula
5. Work through the calculation step by step
6. Check your answer makes sense

Would you like me to guide you through each step?`;

    // Customize for specific question types
    if (question.toLowerCase().includes('fraction')) {
      steps = `Let's solve this fraction problem step by step:

1. Identify what operation we're performing (addition, subtraction, multiplication, division)
2. For addition/subtraction: Find the least common multiple (LCM) of the denominators
3. Convert each fraction to an equivalent fraction with the common denominator
4. Perform the operation on the numerators, keeping the denominator the same
5. Simplify the result by finding the greatest common divisor (GCD)
6. Convert to a mixed number if appropriate

Let me know which step you need help with!`;
    }
    
    if (question.toLowerCase().includes('percentage')) {
      steps = `Let's solve this percentage problem step by step:

1. Identify whether we're finding a percentage of a number, or what percentage one number is of another
2. For finding a percentage of a number: Convert percentage to decimal (divide by 100), then multiply
3. For finding what percentage: Divide the first number by the second, then multiply by 100
4. For percentage increase/decrease: Find the difference, divide by original, multiply by 100
5. Round your answer appropriately
6. Check your answer makes sense (e.g., a 10% increase should be slightly larger)

Let me know which step you need help with!`;
    }

    return steps;
  }

  private getWorkedExample(question: string, subject: string): string {
    // Provide a worked example similar to the question
    if (question.toLowerCase().includes('fraction')) {
      return `Here's a similar example:
      
Problem: Add 1/3 + 1/4

Step 1: Find common denominator (12)
Step 2: Convert fractions: 4/12 + 3/12
Step 3: Add numerators: 7/12
Answer: 7/12

Now try applying this method to your problem!`;
    }

    if (question.toLowerCase().includes('percentage')) {
      return `Here's a similar example:
      
Problem: Find 25% of 80

Step 1: Convert percentage to decimal: 25% = 0.25
Step 2: Multiply: 0.25 × 80 = 20
Answer: 20

Now try this method with your problem!`;
    }

    if (question.toLowerCase().includes('gst')) {
      return `Here's a similar example:
      
Problem: A shirt costs $55 including GST. What was the price before GST?

Step 1: Recognize that $55 is 110% of the original price (100% + 10% GST)
Step 2: Divide by 1.10 to find the original price: $55 ÷ 1.10 = $50
Answer: $50

Now try applying this to your problem!`;
    }

    // Default example
    return `Here's how to approach a similar problem:

1. Read the problem carefully
2. Identify the key information
3. Choose the right method
4. Work step by step
5. Check your answer

Apply this same approach to your current problem!`;
  }

  // Record hint usage
  recordHintUsage(questionId: string, level: number, helpful: boolean, subject: string, concept: string): void {
    const record: HintUsageRecord = {
      questionId,
      timestamp: new Date(),
      level,
      helpful,
      subject,
      concept
    };
    
    this.hintUsageHistory.push(record);
    
    // Save to localStorage
    try {
      localStorage.setItem('hintUsageHistory', JSON.stringify(this.hintUsageHistory));
    } catch (error) {
      console.error('Error saving hint history:', error);
    }
  }

  // Get hint usage history
  getHintUsageHistory(): HintUsageRecord[] {
    return this.hintUsageHistory;
  }

  // Analyze hint usage patterns
  analyzeHintUsage(timeframeDays: number = 30): any {
    const cutoffDate = new Date(Date.now() - timeframeDays * 24 * 60 * 60 * 1000);
    const recentHints = this.hintUsageHistory.filter(hint => hint.timestamp >= cutoffDate);
    
    const totalHints = recentHints.length;
    const helpfulHints = recentHints.filter(hint => hint.helpful).length;
    const helpfulnessRate = totalHints > 0 ? (helpfulHints / totalHints) * 100 : 0;
    
    const levelDistribution = [1, 2, 3, 4].map(level => ({
      level,
      count: recentHints.filter(hint => hint.level === level).length,
      percentage: totalHints > 0 ? (recentHints.filter(hint => hint.level === level).length / totalHints) * 100 : 0
    }));

    const subjectBreakdown = recentHints.reduce((acc, hint) => {
      acc[hint.subject] = (acc[hint.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalHints,
      helpfulnessRate,
      levelDistribution,
      subjectBreakdown,
      averageLevel: totalHints > 0 ? recentHints.reduce((sum, hint) => sum + hint.level, 0) / totalHints : 0
    };
  }

  // Identify struggle patterns
  identifyStrugglePatterns(): any[] {
    const conceptHints = this.hintUsageHistory.reduce((acc, hint) => {
      const concept = hint.concept;
      if (!acc[concept]) {
        acc[concept] = { total: 0, level3Plus: 0, unhelpful: 0 };
      }
      acc[concept].total++;
      if (hint.level >= 3) acc[concept].level3Plus++;
      if (!hint.helpful) acc[concept].unhelpful++;
      return acc;
    }, {} as Record<string, { total: number; level3Plus: number; unhelpful: number }>);

    const patterns = [];
    
    for (const [concept, data] of Object.entries(conceptHints)) {
      if (data.total >= 3) { // Only include concepts with significant hint usage
        const difficultyScore = (data.level3Plus / data.total) * 100;
        const unhelpfulRate = (data.unhelpful / data.total) * 100;
        
        let difficulty: 'low' | 'medium' | 'high' = 'low';
        if (difficultyScore > 60 || unhelpfulRate > 40) difficulty = 'high';
        else if (difficultyScore > 30 || unhelpfulRate > 20) difficulty = 'medium';

        patterns.push({
          concept,
          frequency: data.total,
          difficultyScore,
          unhelpfulRate,
          difficulty
        });
      }
    }

    return patterns.sort((a, b) => b.frequency - a.frequency);
  }

  // Calculate improvement metrics
  calculateImprovement(): any {
    if (this.hintUsageHistory.length < 10) return null;
    
    const recentHints = this.hintUsageHistory.slice(-10);
    const olderHints = this.hintUsageHistory.slice(-20, -10);
    
    if (olderHints.length === 0) return null;
    
    const recentAvgLevel = recentHints.reduce((sum, hint) => sum + hint.level, 0) / recentHints.length;
    const olderAvgLevel = olderHints.reduce((sum, hint) => sum + hint.level, 0) / olderHints.length;
    
    const improvement = ((olderAvgLevel - recentAvgLevel) / olderAvgLevel) * 100;
    
    return {
      improvement,
      recentAvgLevel,
      olderAvgLevel,
      trend: improvement > 5 ? 'improving' : improvement < -5 ? 'struggling' : 'stable'
    };
  }

  // Get personalized recommendations based on hint usage
  getRecommendations(): string[] {
    const improvement = this.calculateImprovement();
    const strugglePatterns = this.identifyStrugglePatterns();
    const recommendations = [];

    if (improvement && improvement.trend === 'improving') {
      recommendations.push('You\'re making great progress! You\'re needing less help over time.');
    }

    if (improvement && improvement.trend === 'struggling') {
      recommendations.push('You might benefit from reviewing some fundamental concepts.');
    }

    if (strugglePatterns.length > 0) {
      const hardestConcept = strugglePatterns[0];
      recommendations.push(`Focus on building a stronger understanding of ${hardestConcept.concept}.`);
    }

    const analysis = this.analyzeHintUsage();
    if (analysis.averageLevel > 2.5) {
      recommendations.push('Try breaking problems into smaller steps before asking for hints.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue your current learning approach - you\'re doing well!');
    }

    return recommendations;
  }

  // Clear hint history (for testing or privacy)
  clearHintHistory(): void {
    this.hintUsageHistory = [];
    localStorage.removeItem('hintUsageHistory');
  }
}

export const hintService = HintService.getInstance();