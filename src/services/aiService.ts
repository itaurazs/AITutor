import OpenAI from 'openai';
import { Subject, Step } from '../types/Subject';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export interface AIResponse {
  steps: Step[];
  keyPoints: string[];
  explanation: string;
}

export class AIService {
  private static instance: AIService;
  
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private getSubjectPrompt(subject: Subject): string {
    const prompts = {
      mathematics: `You are an expert mathematics tutor. Provide step-by-step solutions with clear explanations, formulas, and calculations. Focus on teaching the underlying concepts.`,
      science: `You are an expert science tutor covering Physics, Chemistry, and Biology. Provide detailed explanations with scientific principles, formulas, and real-world examples.`,
      english: `You are an expert English and Grammar tutor. Provide clear explanations of grammar rules, literary devices, writing techniques, and language concepts with examples.`,
      history: `You are an expert History tutor. Provide comprehensive explanations of historical events, causes, effects, and significance with dates and context.`,
      geography: `You are an expert Geography tutor. Explain physical and human geography concepts, processes, and their real-world applications with examples.`,
      economics: `You are an expert Economics tutor. Explain economic concepts, theories, and their practical applications with clear examples and real-world relevance.`
    };

    return prompts[subject.id as keyof typeof prompts] || prompts.mathematics;
  }

  private parseAIResponse(response: string): AIResponse {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(response);
      if (parsed.steps && parsed.keyPoints) {
        return parsed;
      }
    } catch {
      // If not JSON, parse the text response
    }

    // Parse text response into structured format
    const lines = response.split('\n').filter(line => line.trim());
    const steps: Step[] = [];
    const keyPoints: string[] = [];
    let currentSection = 'explanation';
    let stepNumber = 1;

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.toLowerCase().includes('step') && trimmed.includes(':')) {
        currentSection = 'steps';
        const title = trimmed.split(':')[1]?.trim() || `Step ${stepNumber}`;
        steps.push({
          number: stepNumber++,
          title,
          content: '',
          formula: '',
          calculation: ''
        });
      } else if (trimmed.toLowerCase().includes('key points') || trimmed.toLowerCase().includes('important')) {
        currentSection = 'keyPoints';
      } else if (currentSection === 'steps' && steps.length > 0) {
        const lastStep = steps[steps.length - 1];
        if (trimmed.includes('=') || trimmed.includes('→')) {
          lastStep.calculation = trimmed;
        } else if (trimmed.match(/^[A-Za-z\s]+=|^[A-Za-z\s]+:/)) {
          lastStep.formula = trimmed;
        } else {
          lastStep.content += (lastStep.content ? ' ' : '') + trimmed;
        }
      } else if (currentSection === 'keyPoints' && trimmed.startsWith('-') || trimmed.startsWith('•')) {
        keyPoints.push(trimmed.replace(/^[-•]\s*/, ''));
      }
    }

    // If no structured steps found, create a single step
    if (steps.length === 0) {
      steps.push({
        number: 1,
        title: 'Solution',
        content: response.trim(),
        formula: '',
        calculation: ''
      });
    }

    return {
      steps,
      keyPoints: keyPoints.length > 0 ? keyPoints : [
        'Review the solution step by step',
        'Practice similar problems to reinforce understanding',
        'Ask follow-up questions if anything is unclear'
      ],
      explanation: response
    };
  }

  async generateSolution(question: string, subject: Subject): Promise<AIResponse> {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
    }

    const systemPrompt = this.getSubjectPrompt(subject);
    const userPrompt = `
Please provide a detailed, step-by-step solution to this ${subject.name} question: "${question}"

Format your response as follows:
1. Break down the solution into clear, numbered steps
2. Include any relevant formulas or equations
3. Show calculations where applicable
4. Provide key learning points at the end

Make sure to explain WHY each step is necessary, not just HOW to do it. This helps students understand the underlying concepts.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Using GPT-4o-mini as requested
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from AI service');
      }

      return this.parseAIResponse(response);
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback to local generation if AI fails
      throw new Error(
        error instanceof Error 
          ? `AI service error: ${error.message}` 
          : 'Failed to generate AI response'
      );
    }
  }

  // Test connection to AI service
  async testConnection(): Promise<boolean> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hello, can you respond with just "OK"?' }],
        max_tokens: 10,
      });
      
      return !!completion.choices[0]?.message?.content;
    } catch {
      return false;
    }
  }
}

export const aiService = AIService.getInstance();