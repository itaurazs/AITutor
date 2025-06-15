import { Step } from '../types/Subject';

export const generateStepByStepSolution = (question: string, subject: string): { steps: Step[], keyPoints: string[] } => {
  const lowerQuestion = question.toLowerCase();
  
  // Mathematics Solutions
  if (subject === 'mathematics') {
    // SOLVE FOR X - Algebraic Equations (FIXED - moved before basic arithmetic)
    if ((lowerQuestion.includes('solve') && lowerQuestion.includes('x') && lowerQuestion.includes('=')) ||
        (lowerQuestion.includes('find x') && lowerQuestion.includes('='))) {
      
      // Extract the equation from the question
      let equation = question.match(/[^a-zA-Z]*[\d\w\s\+\-\*\/\=\(\)\.]+[^a-zA-Z]*/)?.[0]?.trim() || '';
      
      // Common equation patterns
      if (lowerQuestion.includes('2x + 5 = 17') || equation.includes('2x + 5 = 17')) {
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
      
      // Pattern: ax + b = c (like 3x + 7 = 22)
      const simpleLinearMatch = equation.match(/(\d+)x\s*\+\s*(\d+)\s*=\s*(\d+)/) || 
                               lowerQuestion.match(/(\d+)x\s*\+\s*(\d+)\s*=\s*(\d+)/);
      if (simpleLinearMatch) {
        const [, a, b, c] = simpleLinearMatch;
        const coefficient = parseInt(a);
        const constant = parseInt(b);
        const result = parseInt(c);
        const xValue = (result - constant) / coefficient;
        
        return {
          steps: [
            {
              number: 1,
              title: "Write down the equation",
              content: "Start by clearly writing the equation we need to solve.",
              formula: `${coefficient}x + ${constant} = ${result}`
            },
            {
              number: 2,
              title: `Subtract ${constant} from both sides`,
              content: `To isolate the term with x, we subtract ${constant} from both sides of the equation.`,
              formula: `${coefficient}x + ${constant} - ${constant} = ${result} - ${constant}`,
              calculation: `${coefficient}x = ${result - constant}`
            },
            {
              number: 3,
              title: `Divide both sides by ${coefficient}`,
              content: `Now divide both sides by ${coefficient} to solve for x.`,
              formula: `${coefficient}x ÷ ${coefficient} = ${result - constant} ÷ ${coefficient}`,
              calculation: `x = ${xValue}`
            },
            {
              number: 4,
              title: "Check your answer",
              content: `Substitute x = ${xValue} back into the original equation to verify.`,
              formula: `${coefficient}(${xValue}) + ${constant} = ${result}`,
              calculation: `${coefficient * xValue + constant} = ${result} ✓`
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
      
      // Pattern: ax - b = c (like 4x - 3 = 13)
      const subtractLinearMatch = equation.match(/(\d+)x\s*-\s*(\d+)\s*=\s*(\d+)/) || 
                                 lowerQuestion.match(/(\d+)x\s*-\s*(\d+)\s*=\s*(\d+)/);
      if (subtractLinearMatch) {
        const [, a, b, c] = subtractLinearMatch;
        const coefficient = parseInt(a);
        const constant = parseInt(b);
        const result = parseInt(c);
        const xValue = (result + constant) / coefficient;
        
        return {
          steps: [
            {
              number: 1,
              title: "Write down the equation",
              content: "Start by clearly writing the equation we need to solve.",
              formula: `${coefficient}x - ${constant} = ${result}`
            },
            {
              number: 2,
              title: `Add ${constant} to both sides`,
              content: `To isolate the term with x, we add ${constant} to both sides of the equation.`,
              formula: `${coefficient}x - ${constant} + ${constant} = ${result} + ${constant}`,
              calculation: `${coefficient}x = ${result + constant}`
            },
            {
              number: 3,
              title: `Divide both sides by ${coefficient}`,
              content: `Now divide both sides by ${coefficient} to solve for x.`,
              formula: `${coefficient}x ÷ ${coefficient} = ${result + constant} ÷ ${coefficient}`,
              calculation: `x = ${xValue}`
            },
            {
              number: 4,
              title: "Check your answer",
              content: `Substitute x = ${xValue} back into the original equation to verify.`,
              formula: `${coefficient}(${xValue}) - ${constant} = ${result}`,
              calculation: `${coefficient * xValue - constant} = ${result} ✓`
            }
          ],
          keyPoints: [
            "When subtracting in the equation, add the same amount to both sides",
            "Always perform the same operation on both sides of the equation",
            "Work systematically to isolate the variable",
            "Check your answer by substituting back into the original equation"
          ]
        };
      }
      
      // Pattern: x + b = c (like x + 8 = 15)
      const simpleAddMatch = equation.match(/x\s*\+\s*(\d+)\s*=\s*(\d+)/) || 
                            lowerQuestion.match(/x\s*\+\s*(\d+)\s*=\s*(\d+)/);
      if (simpleAddMatch) {
        const [, b, c] = simpleAddMatch;
        const constant = parseInt(b);
        const result = parseInt(c);
        const xValue = result - constant;
        
        return {
          steps: [
            {
              number: 1,
              title: "Write down the equation",
              content: "Start by clearly writing the equation we need to solve.",
              formula: `x + ${constant} = ${result}`
            },
            {
              number: 2,
              title: `Subtract ${constant} from both sides`,
              content: `To isolate x, we subtract ${constant} from both sides of the equation.`,
              formula: `x + ${constant} - ${constant} = ${result} - ${constant}`,
              calculation: `x = ${xValue}`
            },
            {
              number: 3,
              title: "Check your answer",
              content: `Substitute x = ${xValue} back into the original equation to verify.`,
              formula: `${xValue} + ${constant} = ${result}`,
              calculation: `${xValue + constant} = ${result} ✓`
            }
          ],
          keyPoints: [
            "To isolate x, perform the opposite operation on both sides",
            "If x is being added to a number, subtract that number from both sides",
            "Always check your answer by substituting back",
            "Simple equations like this are the foundation for more complex algebra"
          ]
        };
      }
      
      // Pattern: x - b = c (like x - 4 = 9)
      const simpleSubMatch = equation.match(/x\s*-\s*(\d+)\s*=\s*(\d+)/) || 
                            lowerQuestion.match(/x\s*-\s*(\d+)\s*=\s*(\d+)/);
      if (simpleSubMatch) {
        const [, b, c] = simpleSubMatch;
        const constant = parseInt(b);
        const result = parseInt(c);
        const xValue = result + constant;
        
        return {
          steps: [
            {
              number: 1,
              title: "Write down the equation",
              content: "Start by clearly writing the equation we need to solve.",
              formula: `x - ${constant} = ${result}`
            },
            {
              number: 2,
              title: `Add ${constant} to both sides`,
              content: `To isolate x, we add ${constant} to both sides of the equation.`,
              formula: `x - ${constant} + ${constant} = ${result} + ${constant}`,
              calculation: `x = ${xValue}`
            },
            {
              number: 3,
              title: "Check your answer",
              content: `Substitute x = ${xValue} back into the original equation to verify.`,
              formula: `${xValue} - ${constant} = ${result}`,
              calculation: `${xValue - constant} = ${result} ✓`
            }
          ],
          keyPoints: [
            "To isolate x, perform the opposite operation on both sides",
            "If x is being subtracted by a number, add that number to both sides",
            "Always check your answer by substituting back",
            "Remember: subtraction and addition are opposite operations"
          ]
        };
      }
      
      // Generic algebraic equation solver
      return {
        steps: [
          {
            number: 1,
            title: "Identify the equation type",
            content: "Look at the structure of your equation to determine the best solving method.",
            example: "Linear equations have x to the first power, quadratic equations have x²"
          },
          {
            number: 2,
            title: "Isolate the variable term",
            content: "Use addition or subtraction to move constants to one side of the equation.",
            example: "If you have 3x + 5 = 14, subtract 5 from both sides to get 3x = 9"
          },
          {
            number: 3,
            title: "Solve for the variable",
            content: "Use multiplication or division to isolate the variable completely.",
            example: "If you have 3x = 9, divide both sides by 3 to get x = 3"
          },
          {
            number: 4,
            title: "Check your solution",
            content: "Substitute your answer back into the original equation to verify it's correct.",
            example: "If x = 3, check: 3(3) + 5 = 9 + 5 = 14 ✓"
          }
        ],
        keyPoints: [
          "Always perform the same operation on both sides of the equation",
          "Work systematically: first move constants, then deal with coefficients",
          "Check your answer by substituting back into the original equation",
          "Practice with different types of equations to build confidence"
        ]
      };
    }

    // Times tables (moved after solve for x to avoid conflicts)
    if (lowerQuestion.includes('times table') || (lowerQuestion.includes('table') && /\d+/.test(lowerQuestion))) {
      const number = lowerQuestion.match(/(\d+)/)?.[1] || '8';
      return {
        steps: [
          {
            number: 1,
            title: `Understanding the ${number} times table`,
            content: `The ${number} times table shows what happens when we multiply ${number} by different numbers.`,
            example: `${number} × 1, ${number} × 2, ${number} × 3, and so on...`
          },
          {
            number: 2,
            title: "Pattern recognition",
            content: `Let's look at the pattern in the ${number} times table:`,
            formula: Array.from({length: 12}, (_, i) => `${number} × ${i + 1} = ${parseInt(number) * (i + 1)}`).join('\n')
          },
          {
            number: 3,
            title: "Memory techniques",
            content: "Here are some tricks to remember the times table:",
            example: parseInt(number) === 8 ? "8 times table: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80" : 
                     parseInt(number) === 9 ? "9 times table: Use your fingers! Hold down the finger for the number you're multiplying by 9" :
                     `Count by ${number}s: ${Array.from({length: 5}, (_, i) => parseInt(number) * (i + 1)).join(', ')}...`
          },
          {
            number: 4,
            title: "Practice and application",
            content: "Practice with real-world examples:",
            example: `If you have ${number} groups of 7 items each, you have ${number} × 7 = ${parseInt(number) * 7} items total.`
          }
        ],
        keyPoints: [
          `The ${number} times table is multiplication by ${number}`,
          "Look for patterns to make memorization easier",
          "Practice regularly with different numbers",
          "Use real-world examples to understand the concept"
        ]
      };
    }

    // Basic arithmetic operations (moved after algebraic equations)
    if ((lowerQuestion.includes('+') || lowerQuestion.includes('add')) && !lowerQuestion.includes('x') && !lowerQuestion.includes('=')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['12', '8'];
      return {
        steps: [
          {
            number: 1,
            title: "Identify the numbers to add",
            content: "Write down the numbers we need to add together.",
            formula: `${numbers[0]} + ${numbers[1] || numbers[0]}`
          },
          {
            number: 2,
            title: "Line up the numbers",
            content: "For larger numbers, line them up by place value (ones, tens, hundreds).",
            formula: `  ${numbers[0]}\n+ ${numbers[1] || numbers[0]}\n----`
          },
          {
            number: 3,
            title: "Add from right to left",
            content: "Start with the ones place, then tens, then hundreds, carrying over when needed.",
            calculation: `${parseInt(numbers[0]) + parseInt(numbers[1] || numbers[0])}`
          },
          {
            number: 4,
            title: "Check your answer",
            content: "Verify by adding in reverse order or using estimation.",
            example: `${numbers[1] || numbers[0]} + ${numbers[0]} = ${parseInt(numbers[0]) + parseInt(numbers[1] || numbers[0])}`
          }
        ],
        keyPoints: [
          "Always line up numbers by place value",
          "Add from right to left (ones, tens, hundreds)",
          "Remember to carry over when a column sum is 10 or more",
          "Check your work by adding in reverse order"
        ]
      };
    }

    if ((lowerQuestion.includes('-') || lowerQuestion.includes('subtract')) && !lowerQuestion.includes('x') && !lowerQuestion.includes('=')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['15', '7'];
      return {
        steps: [
          {
            number: 1,
            title: "Set up the subtraction",
            content: "Write the larger number on top and the smaller number below it.",
            formula: `  ${numbers[0]}\n- ${numbers[1] || numbers[0]}\n----`
          },
          {
            number: 2,
            title: "Subtract from right to left",
            content: "Start with the ones place. If the top digit is smaller, borrow from the next column.",
            example: numbers[0] && numbers[1] && parseInt(numbers[0]) < parseInt(numbers[1]) ? 
                    "Since we can't subtract a larger number from a smaller one, we need to borrow." : 
                    "Subtract each column from right to left."
          },
          {
            number: 3,
            title: "Calculate the result",
            content: "Complete the subtraction for each place value.",
            calculation: `${Math.abs(parseInt(numbers[0]) - parseInt(numbers[1] || numbers[0]))}`
          },
          {
            number: 4,
            title: "Verify your answer",
            content: "Check by adding your answer to the number you subtracted.",
            example: `${Math.abs(parseInt(numbers[0]) - parseInt(numbers[1] || numbers[0]))} + ${numbers[1] || numbers[0]} = ${numbers[0]}`
          }
        ],
        keyPoints: [
          "Always put the larger number on top",
          "Subtract from right to left",
          "Borrow from the next column when needed",
          "Check by adding your answer to the subtracted number"
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

    // Fractions
    if (lowerQuestion.includes('fraction') || lowerQuestion.includes('/')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding fractions",
            content: "A fraction represents a part of a whole. The top number is the numerator, the bottom is the denominator.",
            formula: "numerator/denominator",
            example: "3/4 means 3 parts out of 4 total parts"
          },
          {
            number: 2,
            title: "Adding fractions",
            content: "To add fractions, they must have the same denominator (bottom number).",
            formula: "1/4 + 2/4 = (1+2)/4 = 3/4",
            example: "Like adding pieces of the same-sized pie"
          },
          {
            number: 3,
            title: "Finding common denominators",
            content: "When denominators are different, find the least common multiple.",
            formula: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2",
            example: "Convert 1/3 to 2/6 so both fractions have denominator 6"
          },
          {
            number: 4,
            title: "Simplifying fractions",
            content: "Reduce fractions to lowest terms by dividing both numerator and denominator by their greatest common factor.",
            formula: "6/8 = 3/4 (divide both by 2)",
            example: "Always check if your answer can be simplified"
          }
        ],
        keyPoints: [
          "Fractions represent parts of a whole",
          "Same denominators are needed for addition and subtraction",
          "Find common denominators when they're different",
          "Always simplify your final answer"
        ]
      };
    }

    // Percentages
    if (lowerQuestion.includes('percent') || lowerQuestion.includes('%')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding percentages",
            content: "Percent means 'per hundred' or 'out of 100'. It's another way to express fractions and decimals.",
            example: "50% = 50/100 = 0.5 = half"
          },
          {
            number: 2,
            title: "Converting between forms",
            content: "You can convert between percentages, decimals, and fractions.",
            formula: "25% = 25/100 = 1/4 = 0.25",
            example: "To convert percent to decimal: divide by 100 (move decimal point 2 places left)"
          },
          {
            number: 3,
            title: "Finding a percentage of a number",
            content: "To find a percentage of a number, multiply the number by the decimal form of the percentage.",
            formula: "20% of 80 = 0.20 × 80 = 16",
            example: "What's 15% of 60? → 0.15 × 60 = 9"
          },
          {
            number: 4,
            title: "Real-world applications",
            content: "Percentages are used everywhere: discounts, tips, taxes, grades, and statistics.",
            example: "If a $40 shirt is 25% off, the discount is $10, so you pay $30"
          }
        ],
        keyPoints: [
          "Percent means 'out of 100'",
          "Convert to decimal by dividing by 100",
          "Multiply by the decimal to find percentage of a number",
          "Percentages help us compare parts to wholes"
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

    // States of matter
    if (lowerQuestion.includes('states of matter') || lowerQuestion.includes('solid') || lowerQuestion.includes('liquid') || lowerQuestion.includes('gas')) {
      return {
        steps: [
          {
            number: 1,
            title: "The three main states of matter",
            content: "Matter exists in three primary states: solid, liquid, and gas.",
            example: "Ice (solid), water (liquid), steam (gas)"
          },
          {
            number: 2,
            title: "Solid state properties",
            content: "In solids, particles are tightly packed and vibrate in fixed positions.",
            example: "Ice cubes keep their shape because particles can't move around freely"
          },
          {
            number: 3,
            title: "Liquid state properties",
            content: "In liquids, particles are close together but can move around each other.",
            example: "Water takes the shape of its container but maintains constant volume"
          },
          {
            number: 4,
            title: "Gas state properties",
            content: "In gases, particles are far apart and move freely in all directions.",
            example: "Steam expands to fill any container completely"
          },
          {
            number: 5,
            title: "State changes",
            content: "Matter can change states when energy (usually heat) is added or removed.",
            formula: "Solid ⟷ Liquid ⟷ Gas",
            example: "Melting (solid to liquid), boiling (liquid to gas), freezing (liquid to solid)"
          }
        ],
        keyPoints: [
          "Particle movement determines the state of matter",
          "Temperature changes can cause state changes",
          "Each state has unique properties and behaviors",
          "Energy is required to change from one state to another"
        ]
      };
    }

    // Newton's Laws
    if (lowerQuestion.includes('newton') && lowerQuestion.includes('law')) {
      return {
        steps: [
          {
            number: 1,
            title: "Newton's First Law (Law of Inertia)",
            content: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an unbalanced force.",
            example: "A ball rolling on the ground will eventually stop due to friction (unbalanced force)"
          },
          {
            number: 2,
            title: "Newton's Second Law (F = ma)",
            content: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
            formula: "Force = mass × acceleration (F = ma)",
            example: "It takes more force to accelerate a heavy truck than a light car"
          },
          {
            number: 3,
            title: "Newton's Third Law (Action-Reaction)",
            content: "For every action, there is an equal and opposite reaction.",
            example: "When you walk, you push backward on the ground, and the ground pushes forward on you"
          },
          {
            number: 4,
            title: "Real-world applications",
            content: "These laws explain how everything moves in our universe.",
            example: "Rockets work by pushing gas downward (action) which pushes the rocket upward (reaction)"
          }
        ],
        keyPoints: [
          "Newton's laws form the foundation of classical mechanics",
          "These laws apply to all objects, from atoms to planets",
          "Understanding these laws helps explain everyday motion",
          "They're essential for engineering, space travel, and sports"
        ]
      };
    }

    // DNA and RNA
    if (lowerQuestion.includes('dna') || lowerQuestion.includes('rna')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is DNA?",
            content: "DNA (Deoxyribonucleic Acid) is the molecule that contains genetic instructions for all living things.",
            example: "Think of DNA as a recipe book that tells cells how to build and maintain an organism"
          },
          {
            number: 2,
            title: "DNA structure",
            content: "DNA has a double helix structure made of two strands connected by base pairs.",
            formula: "Base pairs: A-T (Adenine-Thymine) and G-C (Guanine-Cytosine)",
            example: "Like a twisted ladder where the rungs are the base pairs"
          },
          {
            number: 3,
            title: "What is RNA?",
            content: "RNA (Ribonucleic Acid) is similar to DNA but single-stranded and helps make proteins.",
            example: "RNA is like a messenger that carries instructions from DNA to make proteins"
          },
          {
            number: 4,
            title: "Key differences",
            content: "DNA stores genetic information; RNA helps use that information to make proteins.",
            formula: "DNA: Double-stranded, has Thymine, stays in nucleus\nRNA: Single-stranded, has Uracil instead of Thymine, can leave nucleus"
          },
          {
            number: 5,
            title: "Why they're important",
            content: "DNA and RNA work together to control all life processes.",
            example: "DNA is the master plan, RNA is the construction worker that builds proteins according to the plan"
          }
        ],
        keyPoints: [
          "DNA stores genetic information in all living things",
          "RNA helps translate DNA instructions into proteins",
          "Both use a four-letter code (A, T/U, G, C) to store information",
          "Understanding DNA and RNA is key to genetics and medicine"
        ]
      };
    }

    // Mitosis
    if (lowerQuestion.includes('mitosis')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is mitosis?",
            content: "Mitosis is the process by which a cell divides to create two identical daughter cells.",
            example: "It's how your body grows and repairs itself by making new cells"
          },
          {
            number: 2,
            title: "Prophase",
            content: "The chromosomes condense and become visible. The nuclear membrane begins to break down.",
            example: "Like organizing scattered papers into neat folders before moving"
          },
          {
            number: 3,
            title: "Metaphase",
            content: "Chromosomes line up in the middle of the cell.",
            example: "Like lining up students in the center of a classroom"
          },
          {
            number: 4,
            title: "Anaphase",
            content: "The chromosomes separate and move to opposite ends of the cell.",
            example: "Like splitting the line of students and sending half to each side of the room"
          },
          {
            number: 5,
            title: "Telophase and Cytokinesis",
            content: "Two new nuclei form, and the cell membrane pinches in to create two separate cells.",
            example: "Like building walls to create two separate rooms from one"
          }
        ],
        keyPoints: [
          "Mitosis creates two identical cells from one parent cell",
          "It's essential for growth and repair in multicellular organisms",
          "Each daughter cell has the same number of chromosomes as the parent",
          "The process is carefully controlled to prevent errors"
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

    // Parts of speech
    if (lowerQuestion.includes('parts of speech') || lowerQuestion.includes('noun') || lowerQuestion.includes('verb') || lowerQuestion.includes('adjective')) {
      return {
        steps: [
          {
            number: 1,
            title: "Nouns - naming words",
            content: "Nouns name people, places, things, or ideas.",
            example: "Person: teacher, Place: school, Thing: book, Idea: happiness"
          },
          {
            number: 2,
            title: "Verbs - action words",
            content: "Verbs show action or state of being.",
            example: "Action: run, jump, write. State of being: is, are, was, were"
          },
          {
            number: 3,
            title: "Adjectives - describing words",
            content: "Adjectives describe or modify nouns.",
            example: "The big, red car. ('Big' and 'red' describe the car)"
          },
          {
            number: 4,
            title: "Adverbs - modify verbs, adjectives, or other adverbs",
            content: "Adverbs often end in -ly and tell how, when, where, or to what extent.",
            example: "She ran quickly. (How did she run? Quickly.)"
          },
          {
            number: 5,
            title: "Other important parts",
            content: "Pronouns (he, she, it), prepositions (in, on, under), conjunctions (and, but, or).",
            example: "He ran quickly under the bridge and stopped. (pronoun, adverb, preposition, conjunction)"
          }
        ],
        keyPoints: [
          "Every word in a sentence has a specific job (part of speech)",
          "Understanding parts of speech helps with grammar and writing",
          "Some words can be different parts of speech depending on how they're used",
          "Practice identifying parts of speech in sentences you read"
        ]
      };
    }

    // Literary devices
    if (lowerQuestion.includes('literary device') || lowerQuestion.includes('metaphor') || lowerQuestion.includes('simile')) {
      return {
        steps: [
          {
            number: 1,
            title: "Similes",
            content: "Similes compare two things using 'like' or 'as'.",
            example: "She's as brave as a lion. Her voice is like music."
          },
          {
            number: 2,
            title: "Metaphors",
            content: "Metaphors compare two things by saying one IS the other.",
            example: "Life is a journey. Time is money."
          },
          {
            number: 3,
            title: "Personification",
            content: "Personification gives human qualities to non-human things.",
            example: "The wind whispered through the trees. The sun smiled down on us."
          },
          {
            number: 4,
            title: "Alliteration",
            content: "Alliteration repeats the same sound at the beginning of words.",
            example: "Peter Piper picked a peck of pickled peppers."
          },
          {
            number: 5,
            title: "Why authors use them",
            content: "Literary devices make writing more interesting, memorable, and meaningful.",
            example: "They help readers visualize and feel what the author is describing"
          }
        ],
        keyPoints: [
          "Literary devices are tools that make writing more effective",
          "They help create vivid images in the reader's mind",
          "Different devices serve different purposes",
          "Learning to identify them improves reading comprehension"
        ]
      };
    }

    // Essay writing
    if (lowerQuestion.includes('essay') || lowerQuestion.includes('paragraph') || lowerQuestion.includes('write')) {
      return {
        steps: [
          {
            number: 1,
            title: "Plan your essay",
            content: "Start with brainstorming and organizing your ideas before writing.",
            example: "Create an outline: Introduction, Body Paragraph 1, Body Paragraph 2, Body Paragraph 3, Conclusion"
          },
          {
            number: 2,
            title: "Write a strong introduction",
            content: "Hook the reader, provide background, and end with your thesis statement.",
            example: "Start with a question, surprising fact, or interesting quote"
          },
          {
            number: 3,
            title: "Develop body paragraphs",
            content: "Each paragraph should have one main idea that supports your thesis.",
            formula: "Topic sentence + Evidence + Explanation + Transition",
            example: "Start each paragraph with a clear topic sentence"
          },
          {
            number: 4,
            title: "Write a conclusion",
            content: "Restate your thesis, summarize main points, and leave the reader with something to think about.",
            example: "Don't just repeat what you said - show why it matters"
          },
          {
            number: 5,
            title: "Revise and edit",
            content: "Review your essay for clarity, organization, grammar, and spelling.",
            example: "Read it aloud to catch errors and awkward sentences"
          }
        ],
        keyPoints: [
          "Good essays have clear structure and organization",
          "Each paragraph should support your main argument",
          "Use transitions to connect your ideas smoothly",
          "Always revise and proofread your work"
        ]
      };
    }
  }
  
  // History Solutions
  if (subject === 'history') {
    // American Civil War - Enhanced pattern matching
    if (lowerQuestion.includes('american civil war') || 
        lowerQuestion.includes('civil war') || 
        lowerQuestion.includes('what started the american civil war') ||
        lowerQuestion.includes('causes of the civil war') ||
        lowerQuestion.includes('why did the civil war start')) {
      return {
        steps: [
          {
            number: 1,
            title: "The slavery issue",
            content: "The fundamental disagreement over slavery was the primary cause of the Civil War.",
            example: "Northern states wanted to abolish slavery, while Southern states depended on slave labor for their economy"
          },
          {
            number: 2,
            title: "Economic differences",
            content: "The North and South had very different economic systems that created conflict.",
            example: "North: Industrial economy with factories. South: Agricultural economy with plantations using slave labor"
          },
          {
            number: 3,
            title: "States' rights vs federal power",
            content: "Southern states believed they had the right to make their own decisions about slavery.",
            example: "They argued that the federal government couldn't tell states what to do about slavery"
          },
          {
            number: 4,
            title: "Political tensions escalate",
            content: "Key events increased tensions between North and South.",
            example: "Missouri Compromise (1820), Kansas-Nebraska Act (1854), Dred Scott case (1857)"
          },
          {
            number: 5,
            title: "Lincoln's election triggers secession",
            content: "Abraham Lincoln's election in 1860 led Southern states to secede from the Union.",
            formula: "South Carolina seceded first (December 1860), followed by 10 other states"
          },
          {
            number: 6,
            title: "Fort Sumter - the war begins",
            content: "The first shots of the Civil War were fired at Fort Sumter in South Carolina.",
            example: "April 12, 1861 - Confederate forces attacked the federal fort, starting the war"
          }
        ],
        keyPoints: [
          "Slavery was the central issue that divided the nation",
          "Economic and cultural differences between North and South created lasting tensions",
          "The conflict was about whether the federal government or states had ultimate authority",
          "The war lasted from 1861 to 1865 and preserved the Union while ending slavery"
        ]
      };
    }

    // World War I
    if (lowerQuestion.includes('world war i') || lowerQuestion.includes('wwi') || lowerQuestion.includes('world war 1')) {
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

    // American Revolution
    if (lowerQuestion.includes('american revolution') || lowerQuestion.includes('revolutionary war')) {
      return {
        steps: [
          {
            number: 1,
            title: "Growing tensions with Britain",
            content: "The colonists became increasingly frustrated with British policies and taxes.",
            example: "Stamp Act, Tea Act, and other taxes without representation in Parliament"
          },
          {
            number: 2,
            title: "Key events leading to war",
            content: "Several incidents escalated the conflict between Britain and the colonies.",
            example: "Boston Massacre (1770), Boston Tea Party (1773), Intolerable Acts (1774)"
          },
          {
            number: 3,
            title: "Declaration of Independence",
            content: "The colonies formally declared their independence from Britain in 1776.",
            formula: "July 4, 1776 - Written primarily by Thomas Jefferson"
          },
          {
            number: 4,
            title: "The war and its outcome",
            content: "The colonists fought and won their independence with help from France.",
            example: "Treaty of Paris (1783) officially ended the war and recognized American independence"
          }
        ],
        keyPoints: [
          "The phrase 'No taxation without representation' summarized colonial grievances",
          "The war lasted from 1775 to 1783",
          "French support was crucial to American victory",
          "The revolution established the United States as an independent nation"
        ]
      };
    }

    // Industrial Revolution
    if (lowerQuestion.includes('industrial revolution')) {
      return {
        steps: [
          {
            number: 1,
            title: "What was the Industrial Revolution?",
            content: "A period of major technological and social change from the late 1700s to mid-1800s.",
            example: "Society shifted from farming and handmade goods to machine production in factories"
          },
          {
            number: 2,
            title: "Key inventions",
            content: "New machines and technologies revolutionized production.",
            example: "Steam engine, spinning jenny, power loom, cotton gin, railroad"
          },
          {
            number: 3,
            title: "Changes in work and life",
            content: "People moved from farms to cities to work in factories.",
            example: "Factory workers worked long hours in often dangerous conditions"
          },
          {
            number: 4,
            title: "Transportation revolution",
            content: "New forms of transportation connected markets and people.",
            example: "Canals, railroads, and steamships made trade faster and cheaper"
          },
          {
            number: 5,
            title: "Long-term effects",
            content: "The Industrial Revolution changed society permanently.",
            example: "Created modern industrial economy, but also led to pollution and labor problems"
          }
        ],
        keyPoints: [
          "The Industrial Revolution began in Britain and spread worldwide",
          "It created the modern factory system and industrial economy",
          "New technologies increased production but created new social problems",
          "It laid the foundation for our modern world"
        ]
      };
    }

    // Ancient civilizations
    if (lowerQuestion.includes('ancient') || lowerQuestion.includes('egypt') || lowerQuestion.includes('greece') || lowerQuestion.includes('rome')) {
      return {
        steps: [
          {
            number: 1,
            title: "Ancient Egypt",
            content: "One of the world's first great civilizations, lasting over 3,000 years.",
            example: "Known for pyramids, pharaohs, hieroglyphics, and the Nile River"
          },
          {
            number: 2,
            title: "Ancient Greece",
            content: "Birthplace of democracy, philosophy, and many ideas we still use today.",
            example: "Athens (democracy), Sparta (military), philosophers like Socrates and Plato"
          },
          {
            number: 3,
            title: "Ancient Rome",
            content: "Started as a small city-state and became a vast empire controlling much of Europe.",
            example: "Roman Republic, Julius Caesar, Roman Empire, Roman law and engineering"
          },
          {
            number: 4,
            title: "Common features",
            content: "These civilizations shared certain characteristics that made them successful.",
            example: "Strong governments, written laws, trade networks, military power, cultural achievements"
          },
          {
            number: 5,
            title: "Their lasting influence",
            content: "Ideas and innovations from these civilizations still influence us today.",
            example: "Democracy (Greece), law and government (Rome), architecture and art (all three)"
          }
        ],
        keyPoints: [
          "Ancient civilizations laid the foundations for modern society",
          "Each contributed unique ideas and innovations",
          "Geography played a major role in their development",
          "Their influence can still be seen in modern government, law, and culture"
        ]
      };
    }
  }

  // Geography Solutions
  if (subject === 'geography') {
    if (lowerQuestion.includes('mountain') || lowerQuestion.includes('formed')) {
      return {
        steps: [
          {
            number: 1,
            title: "Plate tectonics basics",
            content: "Mountains form due to the movement of Earth's tectonic plates.",
            example: "The Earth's crust is broken into large pieces called plates that slowly move"
          },
          {
            number: 2,
            title: "Collision mountains",
            content: "When two plates collide, the crust is pushed upward forming mountains.",
            example: "The Himalayas formed when the Indian plate collided with the Eurasian plate"
          },
          {
            number: 3,
            title: "Volcanic mountains",
            content: "Mountains can form from volcanic activity when magma reaches the surface.",
            example: "Mount Fuji in Japan is a volcanic mountain"
          },
          {
            number: 4,
            title: "Fault-block mountains",
            content: "These form when large blocks of crust are lifted up along fault lines.",
            example: "The Sierra Nevada mountains in California"
          },
          {
            number: 5,
            title: "Erosion and time",
            content: "Mountain formation is a slow process that takes millions of years.",
            example: "Weather and erosion also shape mountains over time"
          }
        ],
        keyPoints: [
          "Mountain formation is driven by plate tectonics",
          "There are several different ways mountains can form",
          "The process takes millions of years",
          "Mountains continue to change due to erosion and weathering"
        ]
      };
    }

    // Climate zones
    if (lowerQuestion.includes('climate') || lowerQuestion.includes('weather')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding climate vs weather",
            content: "Weather is day-to-day conditions; climate is long-term average weather patterns.",
            example: "Today it's raining (weather), but this area has a dry climate overall"
          },
          {
            number: 2,
            title: "Latitude and temperature",
            content: "Distance from the equator affects how much solar energy an area receives.",
            example: "Equatorial regions are hot, polar regions are cold"
          },
          {
            number: 3,
            title: "Ocean currents",
            content: "Warm and cold ocean currents affect the climate of nearby land areas.",
            example: "The Gulf Stream keeps Western Europe warmer than it would otherwise be"
          },
          {
            number: 4,
            title: "Elevation and mountains",
            content: "Higher elevations are cooler, and mountains create rain shadows.",
            example: "Denver is cooler than expected for its latitude due to high elevation"
          },
          {
            number: 5,
            title: "Major climate zones",
            content: "Earth has several major climate zones based on temperature and precipitation.",
            formula: "Tropical, Temperate, Polar, Arid (desert), Mediterranean"
          }
        ],
        keyPoints: [
          "Climate is determined by multiple factors working together",
          "Latitude is the most important factor for temperature",
          "Ocean currents and elevation also play major roles",
          "Understanding climate helps explain where people live and how they live"
        ]
      };
    }

    // Water cycle
    if (lowerQuestion.includes('water cycle')) {
      return {
        steps: [
          {
            number: 1,
            title: "Evaporation",
            content: "The sun heats water in oceans, lakes, and rivers, turning it into water vapor.",
            example: "Like when you see steam rising from a hot cup of coffee"
          },
          {
            number: 2,
            title: "Condensation",
            content: "Water vapor rises and cools, forming tiny droplets that create clouds.",
            example: "Like how your breath fogs up on a cold day"
          },
          {
            number: 3,
            title: "Precipitation",
            content: "When water droplets in clouds become too heavy, they fall as rain, snow, or hail.",
            example: "Rain, snow, sleet, and hail are all forms of precipitation"
          },
          {
            number: 4,
            title: "Collection",
            content: "Precipitation flows into rivers, lakes, and oceans, or soaks into the ground.",
            example: "Rainwater flows downhill into streams, which flow into rivers, which flow into oceans"
          },
          {
            number: 5,
            title: "The cycle continues",
            content: "The water cycle is continuous - it never stops.",
            example: "The same water has been cycling through Earth's systems for billions of years"
          }
        ],
        keyPoints: [
          "The water cycle is powered by energy from the sun",
          "Water constantly moves between oceans, atmosphere, and land",
          "This cycle provides fresh water for all life on Earth",
          "Human activities can affect parts of the water cycle"
        ]
      };
    }

    // Population patterns
    if (lowerQuestion.includes('population') || lowerQuestion.includes('settlement')) {
      return {
        steps: [
          {
            number: 1,
            title: "Factors affecting where people live",
            content: "Physical and human factors influence population distribution.",
            example: "Climate, water availability, landforms, resources, jobs, transportation"
          },
          {
            number: 2,
            title: "Dense population areas",
            content: "Some areas have many people living close together.",
            example: "River valleys, coastal plains, areas with good climate and resources"
          },
          {
            number: 3,
            title: "Sparse population areas",
            content: "Some areas have very few people.",
            example: "Deserts, mountains, polar regions, areas with harsh climates"
          },
          {
            number: 4,
            title: "Urban vs rural",
            content: "People live in cities (urban) or countryside (rural) for different reasons.",
            example: "Cities offer jobs and services; rural areas offer space and agriculture"
          },
          {
            number: 5,
            title: "Migration patterns",
            content: "People move from place to place for various reasons.",
            example: "Economic opportunities, political freedom, natural disasters, family"
          }
        ],
        keyPoints: [
          "Population distribution is uneven across the Earth",
          "Physical geography strongly influences where people can live",
          "Economic opportunities attract people to certain areas",
          "Understanding population patterns helps with planning and resource allocation"
        ]
      };
    }
  }

  // Economics Solutions
  if (subject === 'economics') {
    if (lowerQuestion.includes('supply') && lowerQuestion.includes('demand')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define supply",
            content: "Supply is the amount of a good or service that producers are willing to offer at different prices.",
            example: "If pizza prices are high, pizza shops will want to make more pizzas"
          },
          {
            number: 2,
            title: "Define demand",
            content: "Demand is the amount of a good or service that consumers are willing to buy at different prices.",
            example: "If pizza prices are low, more people will want to buy pizza"
          },
          {
            number: 3,
            title: "The relationship",
            content: "Supply and demand work together to determine market prices.",
            formula: "High demand + Low supply = Higher prices\nLow demand + High supply = Lower prices"
          },
          {
            number: 4,
            title: "Market equilibrium",
            content: "The price where supply equals demand is called the equilibrium price.",
            example: "This is where the market 'clears' - all items supplied are purchased"
          },
          {
            number: 5,
            title: "Real-world applications",
            content: "Supply and demand explain price changes in everyday life.",
            example: "Concert tickets cost more when the artist is popular (high demand, limited supply)"
          }
        ],
        keyPoints: [
          "Supply and demand are the basic forces in a market economy",
          "Prices rise when demand exceeds supply",
          "Prices fall when supply exceeds demand",
          "This system helps allocate resources efficiently"
        ]
      };
    }

    // Inflation
    if (lowerQuestion.includes('inflation')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is inflation?",
            content: "Inflation is the general increase in prices over time, reducing purchasing power.",
            example: "If a candy bar cost $1 last year and $1.10 this year, that's 10% inflation"
          },
          {
            number: 2,
            title: "Causes of inflation",
            content: "Inflation can be caused by increased demand, reduced supply, or more money in circulation.",
            example: "During shortages, prices rise because there's not enough to go around"
          },
          {
            number: 3,
            title: "Effects on consumers",
            content: "Inflation means your money buys less than it used to.",
            example: "Your $20 allowance buys fewer items when prices have gone up"
          },
          {
            number: 4,
            title: "Measuring inflation",
            content: "Economists track inflation using price indexes that measure cost changes over time.",
            formula: "Consumer Price Index (CPI) is the most common measure"
          },
          {
            number: 5,
            title: "Managing inflation",
            content: "Governments and central banks use various tools to control inflation.",
            example: "Raising interest rates can slow down spending and reduce inflation"
          }
        ],
        keyPoints: [
          "Inflation reduces the purchasing power of money",
          "Some inflation is normal in a healthy economy",
          "Too much inflation can hurt consumers and the economy",
          "Understanding inflation helps with financial planning"
        ]
      };
    }

    // GDP
    if (lowerQuestion.includes('gdp')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is GDP?",
            content: "GDP (Gross Domestic Product) measures the total value of all goods and services produced in a country.",
            example: "It's like adding up the value of everything a country makes in a year"
          },
          {
            number: 2,
            title: "How GDP is calculated",
            content: "GDP includes consumption, investment, government spending, and net exports.",
            formula: "GDP = C + I + G + (X - M)\nC = Consumption, I = Investment, G = Government spending, X = Exports, M = Imports"
          },
          {
            number: 3,
            title: "GDP per capita",
            content: "This divides total GDP by the population to show average economic output per person.",
            example: "If a country's GDP is $1 trillion and has 100 million people, GDP per capita is $10,000"
          },
          {
            number: 4,
            title: "Real vs nominal GDP",
            content: "Real GDP adjusts for inflation; nominal GDP uses current prices.",
            example: "Real GDP shows if the economy actually grew or if prices just went up"
          },
          {
            number: 5,
            title: "Why GDP matters",
            content: "GDP helps measure economic health and compare countries.",
            example: "Higher GDP usually means more jobs, higher incomes, and better living standards"
          }
        ],
        keyPoints: [
          "GDP is the most common measure of economic size and health",
          "It includes all final goods and services produced domestically",
          "GDP per capita is better for comparing living standards",
          "GDP has limitations - it doesn't measure happiness or environmental quality"
        ]
      };
    }

    // Opportunity cost
    if (lowerQuestion.includes('opportunity cost')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define opportunity cost",
            content: "Opportunity cost is the value of the next best alternative you give up when making a choice.",
            example: "If you choose to buy a video game instead of a book, the book is your opportunity cost"
          },
          {
            number: 2,
            title: "Why it exists",
            content: "Opportunity cost exists because resources (time, money, materials) are limited.",
            example: "You can't have everything you want, so you must choose"
          },
          {
            number: 3,
            title: "Examples in daily life",
            content: "Every choice has an opportunity cost.",
            example: "Studying instead of watching TV (opportunity cost = entertainment), Working instead of sleeping (opportunity cost = rest)"
          },
          {
            number: 4,
            title: "For businesses and governments",
            content: "Organizations also face opportunity costs when making decisions.",
            example: "A company spending money on advertising can't spend that same money on research"
          },
          {
            number: 5,
            title: "Making better decisions",
            content: "Understanding opportunity cost helps you make smarter choices.",
            example: "Consider what you're giving up, not just what you're getting"
          }
        ],
        keyPoints: [
          "Every choice has an opportunity cost",
          "Opportunity cost is about the next best alternative, not all alternatives",
          "Understanding this concept helps with decision-making",
          "It applies to individuals, businesses, and governments"
        ]
      };
    }

    // Economic systems
    if (lowerQuestion.includes('capitalism') || lowerQuestion.includes('socialism') || lowerQuestion.includes('economic system')) {
      return {
        steps: [
          {
            number: 1,
            title: "What are economic systems?",
            content: "Economic systems are ways societies organize production, distribution, and consumption of goods and services.",
            example: "Different countries use different systems to manage their economies"
          },
          {
            number: 2,
            title: "Capitalism (Market Economy)",
            content: "Private individuals and businesses own resources and make economic decisions.",
            example: "United States - businesses compete, prices set by supply and demand"
          },
          {
            number: 3,
            title: "Socialism (Command Economy)",
            content: "Government owns most resources and makes major economic decisions.",
            example: "Cuba, North Korea - government plans what to produce and sets prices"
          },
          {
            number: 4,
            title: "Mixed Economy",
            content: "Combines elements of both capitalism and socialism.",
            example: "Most modern countries - private businesses exist but government regulates and provides some services"
          },
          {
            number: 5,
            title: "Comparing the systems",
            content: "Each system has advantages and disadvantages.",
            example: "Capitalism promotes innovation but can create inequality; socialism aims for equality but may reduce efficiency"
          }
        ],
        keyPoints: [
          "No pure economic system exists - all are mixed to some degree",
          "Each system answers: What to produce? How to produce? For whom to produce?",
          "Most successful modern economies combine market freedom with government regulation",
          "The best system depends on a society's values and circumstances"
        ]
      };
    }
  }
  
  // Enhanced default response with subject-specific guidance
  const subjectSpecificGuidance = {
    mathematics: {
      approach: "identify the type of math problem (algebra, geometry, arithmetic, etc.)",
      method: "use appropriate formulas and show all calculations step by step",
      verification: "check your answer by substituting back or using estimation"
    },
    science: {
      approach: "determine if this is a physics, chemistry, or biology question",
      method: "apply scientific principles and use proper formulas or explanations",
      verification: "ensure your answer makes sense scientifically and includes proper units"
    },
    english: {
      approach: "identify if this is about grammar, literature, writing, or language arts",
      method: "use proper grammar rules, literary analysis, or writing techniques",
      verification: "check that your explanation is clear and follows language conventions"
    },
    history: {
      approach: "determine the time period and type of historical question",
      method: "use chronological thinking and analyze cause-and-effect relationships",
      verification: "ensure dates and facts are accurate and properly contextualized"
    },
    geography: {
      approach: "identify if this is physical geography, human geography, or earth science",
      method: "use geographic concepts like location, place, movement, and human-environment interaction",
      verification: "check that your explanation considers both physical and human factors"
    },
    economics: {
      approach: "determine if this involves microeconomics, macroeconomics, or basic economic principles",
      method: "apply economic concepts like supply and demand, opportunity cost, or market systems",
      verification: "ensure your explanation considers economic trade-offs and real-world applications"
    }
  };

  const guidance = subjectSpecificGuidance[subject as keyof typeof subjectSpecificGuidance] || {
    approach: "identify the key concepts and type of question being asked",
    method: "apply relevant principles and methods for this subject area",
    verification: "check that your answer is complete and addresses all parts of the question"
  };

  return {
    steps: [
      {
        number: 1,
        title: "Understand the question",
        content: `Read the question carefully and ${guidance.approach}.`,
        example: question
      },
      {
        number: 2,
        title: "Identify key information",
        content: "List all the given information and what you need to find or explain.",
        example: "Look for numbers, key terms, or specific requirements in the question"
      },
      {
        number: 3,
        title: "Choose the right approach",
        content: `Select the appropriate method: ${guidance.method}.`,
        example: "Consider what you've learned about this topic and which tools or concepts apply"
      },
      {
        number: 4,
        title: "Work through systematically",
        content: "Apply your chosen approach step by step, showing all work clearly.",
        example: "Break complex problems into smaller parts and solve each part carefully"
      },
      {
        number: 5,
        title: "Review and verify",
        content: `Check your answer: ${guidance.verification}.`,
        example: "Ask yourself: Does this answer make sense? Did I answer what was asked?"
      }
    ],
    keyPoints: [
      "Always read questions carefully before starting",
      "Break complex problems into smaller, manageable steps",
      "Show all your work clearly and organize your thoughts",
      "Practice similar problems to build understanding and confidence",
      `For ${subject}, focus on understanding the underlying concepts, not just memorizing procedures`
    ]
  };
};