import { Step } from '../types/Subject';

export const generateStepByStepSolution = (question: string, subject: string): { steps: Step[], keyPoints: string[] } => {
  const lowerQuestion = question.toLowerCase();
  
  // Mathematics Solutions
  if (subject === 'mathematics') {
    if (lowerQuestion.includes('solve') && lowerQuestion.includes('x') && lowerQuestion.includes('=')) {
      return {
        steps: [
          {
            number: 1,
            title: "Write down the equation",
            content: "Start by clearly writing the equation we need to solve.",
            formula: "2x + 5 = 17"
          },
          {
            number: 2,
            title: "Subtract 5 from both sides",
            content: "To isolate the term with x, we subtract 5 from both sides of the equation.",
            formula: "2x + 5 - 5 = 17 - 5",
            calculation: "2x = 12"
          },
          {
            number: 3,
            title: "Divide both sides by 2",
            content: "Now divide both sides by 2 to solve for x.",
            formula: "2x ÷ 2 = 12 ÷ 2",
            calculation: "x = 6"
          },
          {
            number: 4,
            title: "Check your answer",
            content: "Substitute x = 6 back into the original equation to verify.",
            formula: "2(6) + 5 = 17",
            calculation: "12 + 5 = 17 ✓"
          }
        ],
        keyPoints: [
          "Always perform the same operation on both sides of the equation",
          "Work systematically to isolate the variable",
          "Check your answer by substituting back into the original equation",
          "Keep your work organized and show each step clearly"
        ]
      };
    }
    
    if (lowerQuestion.includes('area') && lowerQuestion.includes('circle')) {
      return {
        steps: [
          {
            number: 1,
            title: "Identify the given information",
            content: "Write down what we know about the circle.",
            formula: "Radius (r) = 7 cm"
          },
          {
            number: 2,
            title: "Write the area formula",
            content: "The formula for the area of a circle is A = πr².",
            formula: "A = πr²"
          },
          {
            number: 3,
            title: "Substitute the values",
            content: "Replace r with 7 in the formula.",
            formula: "A = π × (7)²",
            calculation: "A = π × 49"
          },
          {
            number: 4,
            title: "Calculate the final answer",
            content: "Multiply to get the area in terms of π, or use π ≈ 3.14159 for a decimal answer.",
            formula: "A = 49π cm²",
            calculation: "A ≈ 153.94 cm²"
          }
        ],
        keyPoints: [
          "Always identify what information is given in the problem",
          "Remember the area formula: A = πr²",
          "You can leave answers in terms of π or use decimal approximation",
          "Don't forget to include units in your final answer"
        ]
      };
    }
  }
  
  // Science Solutions
  if (subject === 'science') {
    if (lowerQuestion.includes('photosynthesis')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define photosynthesis",
            content: "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose).",
            example: "Plants use sunlight to make their own food"
          },
          {
            number: 2,
            title: "Identify the reactants",
            content: "The raw materials needed for photosynthesis are carbon dioxide and water.",
            formula: "6CO₂ + 6H₂O"
          },
          {
            number: 3,
            title: "Add energy source",
            content: "Light energy (usually from the sun) is required to drive the reaction.",
            formula: "6CO₂ + 6H₂O + light energy"
          },
          {
            number: 4,
            title: "Show the products",
            content: "The products are glucose and oxygen.",
            formula: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"
          },
          {
            number: 5,
            title: "Explain the significance",
            content: "This process produces oxygen for us to breathe and glucose for the plant's energy.",
            example: "Without photosynthesis, there would be no oxygen in our atmosphere"
          }
        ],
        keyPoints: [
          "Photosynthesis occurs in the chloroplasts of plant cells",
          "Chlorophyll is the green pigment that captures light energy",
          "This process is essential for all life on Earth",
          "Plants are called producers because they make their own food"
        ]
      };
    }
    
    if (lowerQuestion.includes('force') && lowerQuestion.includes('accelerate')) {
      return {
        steps: [
          {
            number: 1,
            title: "Identify the given information",
            content: "Write down what we know from the problem.",
            formula: "Mass (m) = 10 kg, Acceleration (a) = 5 m/s²"
          },
          {
            number: 2,
            title: "Write Newton's second law",
            content: "The relationship between force, mass, and acceleration is given by Newton's second law.",
            formula: "F = ma"
          },
          {
            number: 3,
            title: "Substitute the values",
            content: "Replace m and a with the given values.",
            formula: "F = 10 kg × 5 m/s²"
          },
          {
            number: 4,
            title: "Calculate the force",
            content: "Multiply to find the force in Newtons.",
            calculation: "F = 50 N"
          }
        ],
        keyPoints: [
          "Force is measured in Newtons (N)",
          "Newton's second law: F = ma",
          "More mass or more acceleration requires more force",
          "This law explains why it's harder to push a heavy object"
        ]
      };
    }
  }
  
  // English Solutions
  if (subject === 'english') {
    if (lowerQuestion.includes('active') && lowerQuestion.includes('passive')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define active voice",
            content: "In active voice, the subject performs the action.",
            example: "The cat chased the mouse. (Subject 'cat' does the action 'chased')"
          },
          {
            number: 2,
            title: "Define passive voice",
            content: "In passive voice, the subject receives the action.",
            example: "The mouse was chased by the cat. (Subject 'mouse' receives the action)"
          },
          {
            number: 3,
            title: "Identify the structure",
            content: "Active: Subject + Verb + Object. Passive: Subject + be verb + past participle + by + agent",
            formula: "Active: [Subject] [Verb] [Object]\nPassive: [Subject] [be + past participle] [by + agent]"
          },
          {
            number: 4,
            title: "When to use each",
            content: "Use active voice for clarity and directness. Use passive voice when the action is more important than who did it.",
            example: "Active: 'I made a mistake.' Passive: 'Mistakes were made.'"
          }
        ],
        keyPoints: [
          "Active voice is usually clearer and more direct",
          "Passive voice can be useful when the doer is unknown or unimportant",
          "Good writing uses mostly active voice",
          "Both have their place in effective communication"
        ]
      };
    }
    
    if (lowerQuestion.includes('thesis statement')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understand what a thesis statement is",
            content: "A thesis statement is a sentence that clearly states your main argument or position.",
            example: "It's like a roadmap for your entire essay"
          },
          {
            number: 2,
            title: "Make it specific and arguable",
            content: "Your thesis should take a clear position that others could disagree with.",
            example: "Weak: 'Pollution is bad.' Strong: 'Government regulations are the most effective way to reduce industrial pollution.'"
          },
          {
            number: 3,
            title: "Place it strategically",
            content: "Usually place your thesis statement at the end of your introduction paragraph.",
            example: "This gives readers a clear preview of your argument"
          },
          {
            number: 4,
            title: "Make it support your evidence",
            content: "Ensure your thesis can be supported by the evidence you plan to present.",
            example: "If you can't find evidence for your claim, revise your thesis"
          }
        ],
        keyPoints: [
          "A thesis statement should be one clear, concise sentence",
          "It should be arguable, not just a statement of fact",
          "Every paragraph in your essay should support your thesis",
          "Revise your thesis as your argument develops"
        ]
      };
    }
  }
  
  // History Solutions
  if (subject === 'history') {
    if (lowerQuestion.includes('world war i') || lowerQuestion.includes('wwi')) {
      return {
        steps: [
          {
            number: 1,
            title: "Long-term causes",
            content: "Several factors built tension in Europe before the war began.",
            example: "Imperialism, nationalism, militarism, and alliance systems"
          },
          {
            number: 2,
            title: "The alliance system",
            content: "Europe was divided into two opposing alliance systems.",
            example: "Triple Alliance (Germany, Austria-Hungary, Italy) vs Triple Entente (France, Russia, Britain)"
          },
          {
            number: 3,
            title: "The immediate trigger",
            content: "The assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo.",
            example: "June 28, 1914 - Shot by a Serbian nationalist named Gavrilo Princip"
          },
          {
            number: 4,
            title: "The domino effect",
            content: "The alliance system turned a regional conflict into a world war.",
            example: "Austria-Hungary declared war on Serbia, Russia mobilized, Germany declared war on Russia, etc."
          }
        ],
        keyPoints: [
          "No single cause led to WWI - it was a combination of factors",
          "The alliance system meant that a small conflict could escalate quickly",
          "Nationalism and imperialism created tensions between nations",
          "The war lasted from 1914 to 1918 and changed the world forever"
        ]
      };
    }
  }
  
  // Default response for any subject
  return {
    steps: [
      {
        number: 1,
        title: "Understand the question",
        content: "Read the question carefully and identify what type of problem or concept this involves.",
        example: question
      },
      {
        number: 2,
        title: "Identify key information",
        content: "List all the given information and what you need to find or explain."
      },
      {
        number: 3,
        title: "Choose the right approach",
        content: "Select the appropriate method, formula, or framework for this type of question."
      },
      {
        number: 4,
        title: "Work through systematically",
        content: "Apply your chosen approach step by step, showing all work clearly."
      },
      {
        number: 5,
        title: "Review and verify",
        content: "Check your answer to make sure it makes sense and addresses the question fully."
      }
    ],
    keyPoints: [
      "Always read questions carefully before starting",
      "Break complex problems into smaller, manageable steps",
      "Show all your work clearly and organize your thoughts",
      "Practice similar problems to build understanding and confidence"
    ]
  };
};