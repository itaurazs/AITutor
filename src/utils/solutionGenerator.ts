import { Step } from '../types/Subject';

export const generateStepByStepSolution = (question: string, subject: string): { steps: Step[], keyPoints: string[] } => {
  const lowerQuestion = question.toLowerCase();
  
  // Mathematics Solutions
  if (subject === 'mathematics') {
    // Solve for x equations - MUST come first before basic arithmetic
    if ((lowerQuestion.includes('solve') && lowerQuestion.includes('x') && lowerQuestion.includes('=')) ||
        (lowerQuestion.includes('find') && lowerQuestion.includes('x') && lowerQuestion.includes('='))) {
      
      // Try to extract the actual equation from the question
      const equationMatch = question.match(/([0-9]*x\s*[+\-]\s*[0-9]+\s*=\s*[0-9]+)|([0-9]+x\s*=\s*[0-9]+)|(x\s*[+\-]\s*[0-9]+\s*=\s*[0-9]+)/i);
      
      if (equationMatch) {
        const equation = equationMatch[0];
        
        // Parse different equation types
        if (equation.includes('+')) {
          // Format: ax + b = c or x + b = c
          const parts = equation.split('=');
          const leftSide = parts[0].trim();
          const rightSide = parseInt(parts[1].trim());
          
          if (leftSide.includes('x')) {
            const xCoeff = leftSide.match(/(\d*)x/)?.[1] || '1';
            const coefficient = xCoeff === '' ? 1 : parseInt(xCoeff);
            const constant = parseInt(leftSide.match(/\+\s*(\d+)/)?.[1] || '0');
            
            const result = (rightSide - constant) / coefficient;
            
            return {
              steps: [
                {
                  number: 1,
                  title: "Write down the equation",
                  content: "Start by clearly writing the equation we need to solve.",
                  formula: equation
                },
                {
                  number: 2,
                  title: `Subtract ${constant} from both sides`,
                  content: `To isolate the term with x, we subtract ${constant} from both sides of the equation.`,
                  formula: `${leftSide} - ${constant} = ${rightSide} - ${constant}`,
                  calculation: `${coefficient}x = ${rightSide - constant}`
                },
                {
                  number: 3,
                  title: `Divide both sides by ${coefficient}`,
                  content: `Now divide both sides by ${coefficient} to solve for x.`,
                  formula: `${coefficient}x ÷ ${coefficient} = ${rightSide - constant} ÷ ${coefficient}`,
                  calculation: `x = ${result}`
                },
                {
                  number: 4,
                  title: "Check your answer",
                  content: `Substitute x = ${result} back into the original equation to verify.`,
                  formula: `${coefficient}(${result}) + ${constant} = ${rightSide}`,
                  calculation: `${coefficient * result + constant} = ${rightSide} ✓`
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
        } else if (equation.includes('-')) {
          // Handle subtraction equations
          const parts = equation.split('=');
          const leftSide = parts[0].trim();
          const rightSide = parseInt(parts[1].trim());
          
          const xCoeff = leftSide.match(/(\d*)x/)?.[1] || '1';
          const coefficient = xCoeff === '' ? 1 : parseInt(xCoeff);
          const constant = parseInt(leftSide.match(/-\s*(\d+)/)?.[1] || '0');
          
          const result = (rightSide + constant) / coefficient;
          
          return {
            steps: [
              {
                number: 1,
                title: "Write down the equation",
                content: "Start by clearly writing the equation we need to solve.",
                formula: equation
              },
              {
                number: 2,
                title: `Add ${constant} to both sides`,
                content: `To isolate the term with x, we add ${constant} to both sides of the equation.`,
                formula: `${leftSide} + ${constant} = ${rightSide} + ${constant}`,
                calculation: `${coefficient}x = ${rightSide + constant}`
              },
              {
                number: 3,
                title: `Divide both sides by ${coefficient}`,
                content: `Now divide both sides by ${coefficient} to solve for x.`,
                formula: `${coefficient}x ÷ ${coefficient} = ${rightSide + constant} ÷ ${coefficient}`,
                calculation: `x = ${result}`
              },
              {
                number: 4,
                title: "Check your answer",
                content: `Substitute x = ${result} back into the original equation to verify.`,
                formula: `${coefficient}(${result}) - ${constant} = ${rightSide}`,
                calculation: `${coefficient * result - constant} = ${rightSide} ✓`
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
      }
      
      // Default algebraic equation solution if parsing fails
      return {
        steps: [
          {
            number: 1,
            title: "Write down the equation",
            content: "Start by clearly writing the equation we need to solve.",
            formula: "Example: 2x + 5 = 17"
          },
          {
            number: 2,
            title: "Isolate the x term",
            content: "Move constants to one side by adding or subtracting from both sides.",
            formula: "2x + 5 - 5 = 17 - 5",
            calculation: "2x = 12"
          },
          {
            number: 3,
            title: "Solve for x",
            content: "Divide both sides by the coefficient of x.",
            formula: "2x ÷ 2 = 12 ÷ 2",
            calculation: "x = 6"
          },
          {
            number: 4,
            title: "Check your answer",
            content: "Substitute your answer back into the original equation.",
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

    // Factoring quadratics
    if (lowerQuestion.includes('factor') && (lowerQuestion.includes('x²') || lowerQuestion.includes('x^2'))) {
      return {
        steps: [
          {
            number: 1,
            title: "Identify the quadratic form",
            content: "Write the quadratic in standard form ax² + bx + c.",
            formula: "x² - 5x + 6",
            example: "Here a = 1, b = -5, c = 6"
          },
          {
            number: 2,
            title: "Find two numbers that multiply to c and add to b",
            content: "We need two numbers that multiply to 6 and add to -5.",
            calculation: "-2 × -3 = 6 and -2 + (-3) = -5"
          },
          {
            number: 3,
            title: "Write the factored form",
            content: "Use the two numbers to write the factors.",
            formula: "x² - 5x + 6 = (x - 2)(x - 3)"
          },
          {
            number: 4,
            title: "Verify by expanding",
            content: "Check your answer by multiplying the factors.",
            calculation: "(x - 2)(x - 3) = x² - 3x - 2x + 6 = x² - 5x + 6 ✓"
          }
        ],
        keyPoints: [
          "Look for two numbers that multiply to the constant term and add to the coefficient of x",
          "Always check your factoring by expanding back",
          "If the leading coefficient is not 1, the process is more complex",
          "Some quadratics cannot be factored using integers"
        ]
      };
    }

    // Derivatives (Calculus)
    if (lowerQuestion.includes('derivative') || lowerQuestion.includes('differentiate')) {
      return {
        steps: [
          {
            number: 1,
            title: "Identify the function",
            content: "Write down the function we need to differentiate.",
            formula: "f(x) = 3x² + 2x - 1"
          },
          {
            number: 2,
            title: "Apply the power rule",
            content: "For each term axⁿ, the derivative is n·axⁿ⁻¹.",
            formula: "d/dx[axⁿ] = n·axⁿ⁻¹"
          },
          {
            number: 3,
            title: "Differentiate each term",
            content: "Apply the power rule to each term separately.",
            formula: "d/dx[3x²] = 2·3x¹ = 6x\nd/dx[2x] = 1·2x⁰ = 2\nd/dx[-1] = 0"
          },
          {
            number: 4,
            title: "Combine the results",
            content: "Add all the differentiated terms together.",
            calculation: "f'(x) = 6x + 2"
          }
        ],
        keyPoints: [
          "The power rule is the most basic differentiation rule",
          "The derivative of a constant is always zero",
          "The derivative of x is 1",
          "Differentiation is linear: d/dx[f + g] = f' + g'"
        ]
      };
    }

    // Slope calculation
    if (lowerQuestion.includes('slope') && (lowerQuestion.includes('point') || lowerQuestion.includes('('))) {
      return {
        steps: [
          {
            number: 1,
            title: "Identify the two points",
            content: "Write down the coordinates of both points.",
            formula: "Point 1: (2, 3)\nPoint 2: (5, 9)"
          },
          {
            number: 2,
            title: "Write the slope formula",
            content: "The slope formula is the change in y divided by the change in x.",
            formula: "m = (y₂ - y₁)/(x₂ - x₁)"
          },
          {
            number: 3,
            title: "Substitute the values",
            content: "Replace the variables with the actual coordinates.",
            formula: "m = (9 - 3)/(5 - 2)"
          },
          {
            number: 4,
            title: "Calculate the slope",
            content: "Simplify the fraction to get the final answer.",
            calculation: "m = 6/3 = 2"
          }
        ],
        keyPoints: [
          "Slope measures how steep a line is",
          "Positive slope means the line goes up from left to right",
          "Negative slope means the line goes down from left to right",
          "The slope formula works for any two points on a line"
        ]
      };
    }

    // Simplify expressions
    if (lowerQuestion.includes('simplify') && lowerQuestion.includes('x')) {
      return {
        steps: [
          {
            number: 1,
            title: "Write out the expression",
            content: "Start with the given expression to simplify.",
            formula: "(3x² + 2x - 1) + (x² - 4x + 3)"
          },
          {
            number: 2,
            title: "Remove parentheses",
            content: "Since we're adding, we can remove the parentheses.",
            formula: "3x² + 2x - 1 + x² - 4x + 3"
          },
          {
            number: 3,
            title: "Group like terms",
            content: "Collect terms with the same variable and power.",
            formula: "(3x² + x²) + (2x - 4x) + (-1 + 3)"
          },
          {
            number: 4,
            title: "Combine like terms",
            content: "Add or subtract the coefficients of like terms.",
            calculation: "4x² - 2x + 2"
          }
        ],
        keyPoints: [
          "Like terms have the same variable raised to the same power",
          "Only combine coefficients, not the variables themselves",
          "Always arrange terms in descending order of powers",
          "Check your work by expanding back if possible"
        ]
      };
    }

    // Times tables
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

    // Basic arithmetic - EXCLUDE if contains 'x' and '=' (algebraic)
    if ((lowerQuestion.includes('+') || lowerQuestion.includes('add')) && 
        !(lowerQuestion.includes('x') && lowerQuestion.includes('='))) {
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

    if ((lowerQuestion.includes('-') || lowerQuestion.includes('subtract')) && 
        !(lowerQuestion.includes('x') && lowerQuestion.includes('='))) {
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

    // Area of circle
    if (lowerQuestion.includes('area') && lowerQuestion.includes('circle')) {
      const radiusMatch = lowerQuestion.match(/radius\s*(\d+)/i) || lowerQuestion.match(/r\s*=\s*(\d+)/i);
      const radius = radiusMatch ? radiusMatch[1] : '7';
      const area = Math.PI * parseInt(radius) * parseInt(radius);
      
      return {
        steps: [
          {
            number: 1,
            title: "Identify the given information",
            content: "Write down what we know about the circle.",
            formula: `Radius (r) = ${radius} cm`
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
            content: `Replace r with ${radius} in the formula.`,
            formula: `A = π × (${radius})²`,
            calculation: `A = π × ${parseInt(radius) * parseInt(radius)}`
          },
          {
            number: 4,
            title: "Calculate the final answer",
            content: "Multiply to get the area in terms of π, or use π ≈ 3.14159 for a decimal answer.",
            formula: `A = ${parseInt(radius) * parseInt(radius)}π cm²`,
            calculation: `A ≈ ${area.toFixed(2)} cm²`
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

    // Multiplication
    if ((lowerQuestion.includes('×') || lowerQuestion.includes('*') || lowerQuestion.includes('multiply')) && 
        !lowerQuestion.includes('table')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['12', '8'];
      const result = parseInt(numbers[0]) * parseInt(numbers[1] || numbers[0]);
      
      return {
        steps: [
          {
            number: 1,
            title: "Set up the multiplication",
            content: "Write the numbers to be multiplied.",
            formula: `${numbers[0]} × ${numbers[1] || numbers[0]}`
          },
          {
            number: 2,
            title: "Use the multiplication algorithm",
            content: "For larger numbers, use the standard algorithm or break into parts.",
            formula: `  ${numbers[0]}\n× ${numbers[1] || numbers[0]}\n----`
          },
          {
            number: 3,
            title: "Calculate the result",
            content: "Multiply and add partial products if needed.",
            calculation: `${result}`
          },
          {
            number: 4,
            title: "Check your answer",
            content: "Verify using estimation or by dividing the result by one of the factors.",
            example: `${result} ÷ ${numbers[0]} = ${numbers[1] || numbers[0]} ✓`
          }
        ],
        keyPoints: [
          "Multiplication is repeated addition",
          "The order doesn't matter (commutative property)",
          "Break large numbers into smaller parts if needed",
          "Always check your work"
        ]
      };
    }

    // Division
    if ((lowerQuestion.includes('÷') || lowerQuestion.includes('/') || lowerQuestion.includes('divide')) && 
        !lowerQuestion.includes('fraction')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['24', '6'];
      const result = parseInt(numbers[0]) / parseInt(numbers[1] || numbers[0]);
      
      return {
        steps: [
          {
            number: 1,
            title: "Set up the division",
            content: "Write the dividend (number being divided) and divisor (number dividing by).",
            formula: `${numbers[0]} ÷ ${numbers[1] || numbers[0]}`
          },
          {
            number: 2,
            title: "Use long division or mental math",
            content: "For simple problems, use mental math. For complex ones, use long division.",
            example: `How many ${numbers[1] || numbers[0]}s are in ${numbers[0]}?`
          },
          {
            number: 3,
            title: "Calculate the quotient",
            content: "Find how many times the divisor goes into the dividend.",
            calculation: `${result}`
          },
          {
            number: 4,
            title: "Check your answer",
            content: "Multiply the quotient by the divisor to get back the dividend.",
            example: `${result} × ${numbers[1] || numbers[0]} = ${numbers[0]} ✓`
          }
        ],
        keyPoints: [
          "Division is the opposite of multiplication",
          "The answer is called the quotient",
          "Check division by multiplying back",
          "Some divisions result in remainders or decimals"
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
    
    if (lowerQuestion.includes('force') && (lowerQuestion.includes('accelerate') || lowerQuestion.includes('acceleration'))) {
      const massMatch = lowerQuestion.match(/(\d+)\s*kg/i);
      const accelMatch = lowerQuestion.match(/(\d+)\s*m\/s/i);
      const mass = massMatch ? massMatch[1] : '10';
      const acceleration = accelMatch ? accelMatch[1] : '5';
      const force = parseInt(mass) * parseInt(acceleration);
      
      return {
        steps: [
          {
            number: 1,
            title: "Identify the given information",
            content: "Write down what we know from the problem.",
            formula: `Mass (m) = ${mass} kg, Acceleration (a) = ${acceleration} m/s²`
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
            formula: `F = ${mass} kg × ${acceleration} m/s²`
          },
          {
            number: 4,
            title: "Calculate the force",
            content: "Multiply to find the force in Newtons.",
            calculation: `F = ${force} N`
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

    if (lowerQuestion.includes('mitosis')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is mitosis?",
            content: "Mitosis is the process by which a cell divides to create two identical daughter cells.",
            example: "It's how your body grows and repairs itself"
          },
          {
            number: 2,
            title: "Prophase",
            content: "Chromosomes condense and become visible. The nuclear membrane begins to break down.",
            example: "DNA coils up tightly so it can be moved around safely"
          },
          {
            number: 3,
            title: "Metaphase",
            content: "Chromosomes line up at the center of the cell (the metaphase plate).",
            example: "Like lining up for a race - everything gets organized before the split"
          },
          {
            number: 4,
            title: "Anaphase",
            content: "Sister chromatids separate and move to opposite ends of the cell.",
            example: "The chromosome copies are pulled apart to opposite sides"
          },
          {
            number: 5,
            title: "Telophase and Cytokinesis",
            content: "Nuclear membranes reform around each set of chromosomes, and the cell divides.",
            example: "Two new cells are formed, each with identical genetic material"
          }
        ],
        keyPoints: [
          "Mitosis produces two genetically identical cells",
          "It's essential for growth and repair in multicellular organisms",
          "The process ensures each new cell gets a complete copy of DNA",
          "Cancer occurs when mitosis goes wrong and cells divide uncontrollably"
        ]
      };
    }

    if (lowerQuestion.includes('balance') && (lowerQuestion.includes('equation') || lowerQuestion.includes('h₂') || lowerQuestion.includes('o₂'))) {
      return {
        steps: [
          {
            number: 1,
            title: "Write the unbalanced equation",
            content: "Start with the chemical equation showing reactants and products.",
            formula: "H₂ + O₂ → H₂O"
          },
          {
            number: 2,
            title: "Count atoms on each side",
            content: "Count the number of each type of atom on both sides of the equation.",
            example: "Left: 2 H, 2 O | Right: 2 H, 1 O"
          },
          {
            number: 3,
            title: "Balance by adding coefficients",
            content: "Add numbers in front of compounds to balance the atoms.",
            formula: "2H₂ + O₂ → 2H₂O"
          },
          {
            number: 4,
            title: "Check your work",
            content: "Verify that you have the same number of each atom on both sides.",
            calculation: "Left: 4 H, 2 O | Right: 4 H, 2 O ✓"
          }
        ],
        keyPoints: [
          "Chemical equations must be balanced (same atoms on both sides)",
          "Only change coefficients, never change chemical formulas",
          "Start with the most complex molecule",
          "Balance one element at a time"
        ]
      };
    }

    if (lowerQuestion.includes('newton') && lowerQuestion.includes('law')) {
      return {
        steps: [
          {
            number: 1,
            title: "Newton's First Law (Law of Inertia)",
            content: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an unbalanced force.",
            example: "A ball on a table won't move unless you push it"
          },
          {
            number: 2,
            title: "Newton's Second Law (F = ma)",
            content: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
            formula: "F = ma (Force = mass × acceleration)"
          },
          {
            number: 3,
            title: "Newton's Third Law (Action-Reaction)",
            content: "For every action, there is an equal and opposite reaction.",
            example: "When you walk, you push back on the ground, and the ground pushes forward on you"
          },
          {
            number: 4,
            title: "Applications in daily life",
            content: "These laws explain motion in everything from cars to rockets to walking.",
            example: "Seatbelts work because of the first law - your body wants to keep moving when the car stops"
          }
        ],
        keyPoints: [
          "These three laws form the foundation of classical mechanics",
          "They explain all motion of objects from atoms to planets",
          "Understanding these laws helps explain everyday experiences",
          "They're still used today in engineering and space exploration"
        ]
      };
    }

    if (lowerQuestion.includes('dna') && lowerQuestion.includes('rna')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is DNA?",
            content: "DNA (Deoxyribonucleic Acid) is the molecule that stores genetic information in cells.",
            example: "Think of it as the instruction manual for building and running a living organism"
          },
          {
            number: 2,
            title: "What is RNA?",
            content: "RNA (Ribonucleic Acid) is a molecule that helps carry out the instructions stored in DNA.",
            example: "RNA is like the messenger that takes instructions from DNA to make proteins"
          },
          {
            number: 3,
            title: "Key structural differences",
            content: "DNA is double-stranded and contains thymine; RNA is single-stranded and contains uracil instead of thymine.",
            formula: "DNA: A-T, G-C base pairs\nRNA: A-U, G-C base pairs"
          },
          {
            number: 4,
            title: "Different functions",
            content: "DNA stores information long-term; RNA carries out various functions including protein synthesis.",
            example: "DNA is like a library book (permanent storage), RNA is like a photocopy (temporary working copy)"
          }
        ],
        keyPoints: [
          "DNA stores genetic information, RNA helps use that information",
          "DNA is double-stranded, RNA is usually single-stranded",
          "DNA contains thymine, RNA contains uracil instead",
          "Both are essential for life and work together in cells"
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

    if (lowerQuestion.includes('metaphor') && lowerQuestion.includes('simile')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define simile",
            content: "A simile compares two different things using 'like' or 'as'.",
            example: "She runs like the wind. Her smile is as bright as the sun."
          },
          {
            number: 2,
            title: "Define metaphor",
            content: "A metaphor directly states that one thing is another, without using 'like' or 'as'.",
            example: "Life is a journey. Time is money."
          },
          {
            number: 3,
            title: "Key difference",
            content: "Similes use comparison words (like, as), while metaphors make direct statements.",
            formula: "Simile: X is like Y\nMetaphor: X is Y"
          },
          {
            number: 4,
            title: "Purpose and effect",
            content: "Both create vivid imagery and help readers understand abstract concepts.",
            example: "They make writing more interesting and help explain complex ideas"
          }
        ],
        keyPoints: [
          "Both similes and metaphors are types of figurative language",
          "Similes use 'like' or 'as' for comparison",
          "Metaphors make direct comparisons without comparison words",
          "Both help create vivid imagery in writing"
        ]
      };
    }

    if (lowerQuestion.includes('literary device')) {
      return {
        steps: [
          {
            number: 1,
            title: "Read the sentence carefully",
            content: "Look for patterns, repetitions, comparisons, or unusual word choices.",
            example: "Example sentence: 'The wind whispered through the trees.'"
          },
          {
            number: 2,
            title: "Identify common devices",
            content: "Look for metaphors, similes, personification, alliteration, etc.",
            example: "In our example: 'whispered' gives human qualities to wind = personification"
          },
          {
            number: 3,
            title: "Consider the effect",
            content: "Think about why the author chose this device and what effect it creates.",
            example: "Personification makes the scene feel alive and peaceful"
          },
          {
            number: 4,
            title: "Name and explain",
            content: "Identify the device and explain how it works in the sentence.",
            example: "This sentence uses personification to create a calm, natural atmosphere"
          }
        ],
        keyPoints: [
          "Literary devices add depth and meaning to writing",
          "Common devices include metaphor, simile, personification, and alliteration",
          "Always explain the effect, not just identify the device",
          "Context matters - consider the overall tone and purpose"
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

    if (lowerQuestion.includes('mla') && lowerQuestion.includes('cite')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understand MLA format basics",
            content: "MLA (Modern Language Association) format is commonly used in English and humanities classes.",
            example: "It provides a standard way to give credit to your sources"
          },
          {
            number: 2,
            title: "In-text citations",
            content: "Include the author's last name and page number in parentheses after quotes or paraphrases.",
            formula: "(Smith 45) or (Smith and Jones 23)"
          },
          {
            number: 3,
            title: "Works Cited page",
            content: "List all sources alphabetically by author's last name at the end of your paper.",
            example: "Smith, John. 'Article Title.' Journal Name, vol. 1, no. 2, 2023, pp. 45-67."
          },
          {
            number: 4,
            title: "Different source types",
            content: "Books, articles, websites, and other sources have slightly different citation formats.",
            example: "Always check the specific format for your type of source"
          }
        ],
        keyPoints: [
          "Always give credit to avoid plagiarism",
          "In-text citations connect to your Works Cited page",
          "Different sources require different citation formats",
          "When in doubt, consult the MLA Handbook or your teacher"
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
        lowerQuestion.includes('what led to the american civil war') ||
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
    if (lowerQuestion.includes('world war i') || lowerQuestion.includes('wwi') || lowerQuestion.includes('world war 1') || 
        lowerQuestion.includes('causes of world war i') || lowerQuestion.includes('what caused world war 1')) {
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
            title: "Key technological innovations",
            content: "New machines and power sources revolutionized production.",
            example: "Steam engine, spinning jenny, power loom, cotton gin"
          },
          {
            number: 3,
            title: "Changes in work and society",
            content: "People moved from rural areas to cities to work in factories.",
            example: "Rise of factory towns, new social classes (industrial workers and factory owners)"
          },
          {
            number: 4,
            title: "Long-term impacts",
            content: "The Industrial Revolution changed how people lived, worked, and thought about progress.",
            example: "Led to modern capitalism, labor movements, and environmental challenges"
          }
        ],
        keyPoints: [
          "Started in Britain and spread to other countries",
          "Transformed agriculture, manufacturing, and transportation",
          "Created new social and economic structures",
          "Set the foundation for the modern industrial world"
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

    // Renaissance
    if (lowerQuestion.includes('renaissance')) {
      return {
        steps: [
          {
            number: 1,
            title: "What was the Renaissance?",
            content: "A period of cultural rebirth in Europe from roughly 1300 to 1600.",
            example: "Renaissance means 'rebirth' - it was a revival of art, learning, and culture"
          },
          {
            number: 2,
            title: "Key characteristics",
            content: "Emphasis on humanism, classical learning, and individual achievement.",
            example: "People studied ancient Greek and Roman texts and focused on human potential"
          },
          {
            number: 3,
            title: "Major achievements",
            content: "Breakthroughs in art, science, literature, and exploration.",
            example: "Leonardo da Vinci's art, Galileo's astronomy, Shakespeare's plays, Columbus's voyages"
          },
          {
            number: 4,
            title: "Long-term impact",
            content: "The Renaissance laid the groundwork for the modern world.",
            example: "Led to the Scientific Revolution, Age of Exploration, and modern democratic ideas"
          }
        ],
        keyPoints: [
          "Started in Italy and spread throughout Europe",
          "Marked the transition from medieval to modern times",
          "Emphasized human achievement and potential",
          "Produced some of history's greatest artists and thinkers"
        ]
      };
    }

    // French Revolution
    if (lowerQuestion.includes('french revolution')) {
      return {
        steps: [
          {
            number: 1,
            title: "Causes of the revolution",
            content: "France faced serious economic, social, and political problems in the 1780s.",
            example: "Heavy taxes, food shortages, inequality between social classes, and absolute monarchy"
          },
          {
            number: 2,
            title: "The revolution begins (1789)",
            content: "The Third Estate (common people) demanded political representation and rights.",
            example: "Storming of the Bastille (July 14, 1789) became a symbol of the revolution"
          },
          {
            number: 3,
            title: "Radical phase and Reign of Terror",
            content: "The revolution became increasingly violent and extreme.",
            example: "King Louis XVI and Queen Marie Antoinette were executed; thousands died during the Terror"
          },
          {
            number: 4,
            title: "Consequences and legacy",
            content: "The revolution changed France and influenced democratic movements worldwide.",
            example: "Ended feudalism, established principles of liberty and equality, inspired other revolutions"
          }
        ],
        keyPoints: [
          "Overthrew the absolute monarchy and established a republic",
          "Promoted ideas of liberty, equality, and fraternity",
          "Led to the rise of Napoleon Bonaparte",
          "Influenced democratic movements around the world"
        ]
      };
    }

    // Cold War
    if (lowerQuestion.includes('cold war')) {
      return {
        steps: [
          {
            number: 1,
            title: "What was the Cold War?",
            content: "A period of tension and competition between the US and Soviet Union from 1945-1991.",
            example: "Called 'cold' because it never became a direct military conflict between the superpowers"
          },
          {
            number: 2,
            title: "Ideological differences",
            content: "The conflict was based on opposing political and economic systems.",
            example: "US: Capitalism and democracy vs USSR: Communism and authoritarian government"
          },
          {
            number: 3,
            title: "Key events and crises",
            content: "Several major confrontations brought the world close to nuclear war.",
            example: "Berlin Blockade, Korean War, Cuban Missile Crisis, Vietnam War"
          },
          {
            number: 4,
            title: "End of the Cold War",
            content: "The Soviet Union collapsed in 1991, ending the Cold War.",
            example: "Fall of Berlin Wall (1989), dissolution of USSR (1991)"
          }
        ],
        keyPoints: [
          "Dominated international relations for nearly 50 years",
          "Led to an arms race and space race between superpowers",
          "Influenced conflicts around the world",
          "Ended with the collapse of the Soviet Union"
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
            content: "Heat from the sun causes water from oceans, lakes, and rivers to turn into water vapor.",
            example: "Like when a puddle dries up on a hot day"
          },
          {
            number: 2,
            title: "Condensation",
            content: "Water vapor rises and cools, forming tiny droplets that create clouds.",
            example: "This is why you see your breath on a cold day"
          },
          {
            number: 3,
            title: "Precipitation",
            content: "When water droplets in clouds become too heavy, they fall as rain, snow, or hail.",
            example: "Rain, snow, sleet, and hail are all forms of precipitation"
          },
          {
            number: 4,
            title: "Collection and runoff",
            content: "Precipitation flows into rivers, lakes, and oceans, or soaks into the ground.",
            example: "This water eventually evaporates again, continuing the cycle"
          }
        ],
        keyPoints: [
          "The water cycle is powered by energy from the sun",
          "Water constantly moves between the atmosphere, land, and oceans",
          "This process provides fresh water for all life on Earth",
          "Human activities can affect the water cycle"
        ]
      };
    }

    // Plate tectonics
    if (lowerQuestion.includes('plate tectonics')) {
      return {
        steps: [
          {
            number: 1,
            title: "What are tectonic plates?",
            content: "Earth's outer layer (lithosphere) is broken into large pieces called tectonic plates.",
            example: "Like a cracked eggshell, but the pieces are slowly moving"
          },
          {
            number: 2,
            title: "How plates move",
            content: "Plates move due to convection currents in the hot mantle beneath them.",
            example: "Hot material rises, cool material sinks, creating circular currents"
          },
          {
            number: 3,
            title: "Types of plate boundaries",
            content: "Plates interact in three main ways: divergent, convergent, and transform.",
            example: "Divergent: plates move apart; Convergent: plates collide; Transform: plates slide past each other"
          },
          {
            number: 4,
            title: "Effects of plate movement",
            content: "Plate tectonics causes earthquakes, volcanoes, and mountain formation.",
            example: "Most earthquakes and volcanoes occur along plate boundaries"
          }
        ],
        keyPoints: [
          "Plate tectonics explains most geological activity on Earth",
          "Plates move very slowly - only a few centimeters per year",
          "This theory revolutionized our understanding of Earth",
          "It explains the distribution of earthquakes, volcanoes, and mountains"
        ]
      };
    }

    // Rivers and landscapes
    if (lowerQuestion.includes('river') && lowerQuestion.includes('landscape')) {
      return {
        steps: [
          {
            number: 1,
            title: "Erosion by flowing water",
            content: "Rivers pick up and carry away soil, rocks, and sediment as they flow.",
            example: "Fast-flowing water can move large rocks; slow water carries fine particles"
          },
          {
            number: 2,
            title: "Creating valleys",
            content: "Over time, rivers cut down into the landscape, forming valleys.",
            example: "The Grand Canyon was carved by the Colorado River over millions of years"
          },
          {
            number: 3,
            title: "Deposition and floodplains",
            content: "When rivers slow down, they deposit sediment, creating fertile floodplains.",
            example: "The Nile River delta in Egypt is built from sediment deposited by the river"
          },
          {
            number: 4,
            title: "Changing course over time",
            content: "Rivers naturally change their path through erosion and deposition.",
            example: "Meandering rivers create oxbow lakes when they change course"
          }
        ],
        keyPoints: [
          "Rivers are powerful agents of erosion and deposition",
          "They create many landscape features over long periods",
          "River valleys are often the most fertile agricultural areas",
          "Human activities can significantly alter river systems"
        ]
      };
    }

    // Population distribution
    if (lowerQuestion.includes('population distribution')) {
      return {
        steps: [
          {
            number: 1,
            title: "Physical factors",
            content: "Climate, terrain, and natural resources affect where people live.",
            example: "Most people live in areas with moderate climate, flat land, and fresh water"
          },
          {
            number: 2,
            title: "Economic opportunities",
            content: "People concentrate where there are jobs and economic opportunities.",
            example: "Cities and industrial areas attract large populations"
          },
          {
            number: 3,
            title: "Historical factors",
            content: "Past events and cultural factors influence settlement patterns.",
            example: "Colonial history, migration patterns, and cultural preferences"
          },
          {
            number: 4,
            title: "Global patterns",
            content: "Most people live in certain regions of the world.",
            example: "East Asia, South Asia, Europe, and eastern North America have the highest population densities"
          }
        ],
        keyPoints: [
          "Population distribution is uneven across the Earth",
          "Physical geography strongly influences where people can live",
          "Economic and historical factors also play important roles",
          "Understanding these patterns helps explain human geography"
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

    // Capitalism vs Socialism
    if (lowerQuestion.includes('capitalism') && lowerQuestion.includes('socialism')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define capitalism",
            content: "Capitalism is an economic system where private individuals own businesses and property.",
            example: "People can start their own companies and keep the profits they make"
          },
          {
            number: 2,
            title: "Define socialism",
            content: "Socialism is an economic system where the government or community owns major industries.",
            example: "The government controls key industries like healthcare, education, and utilities"
          },
          {
            number: 3,
            title: "Key differences",
            content: "The main difference is who owns and controls the means of production.",
            formula: "Capitalism: Private ownership\nSocialism: Public/government ownership"
          },
          {
            number: 4,
            title: "Real-world examples",
            content: "Most countries today use mixed systems with elements of both.",
            example: "US: Mostly capitalist with some government programs. Nordic countries: Mixed systems with strong social programs"
          }
        ],
        keyPoints: [
          "Both systems aim to organize economic activity",
          "Pure capitalism and pure socialism are rare in practice",
          "Most modern economies are mixed systems",
          "Each system has advantages and disadvantages"
        ]
      };
    }

    // Interest rates
    if (lowerQuestion.includes('interest rate')) {
      return {
        steps: [
          {
            number: 1,
            title: "What are interest rates?",
            content: "Interest rates are the cost of borrowing money or the reward for saving money.",
            example: "If you borrow $100 at 5% interest, you pay back $105"
          },
          {
            number: 2,
            title: "How they affect borrowing",
            content: "Higher interest rates make borrowing more expensive, lower rates make it cheaper.",
            example: "High rates discourage people from taking loans; low rates encourage borrowing"
          },
          {
            number: 3,
            title: "Impact on spending and saving",
            content: "Interest rates influence whether people spend or save their money.",
            example: "High rates encourage saving; low rates encourage spending"
          },
          {
            number: 4,
            title: "Economic effects",
            content: "Central banks use interest rates to influence economic activity.",
            example: "Lower rates to stimulate growth; raise rates to control inflation"
          }
        ],
        keyPoints: [
          "Interest rates are a key tool of monetary policy",
          "They affect borrowing, spending, and saving decisions",
          "Central banks adjust rates to manage the economy",
          "Changes in interest rates ripple through the entire economy"
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
            content: "GDP can be calculated by adding consumption, investment, government spending, and net exports.",
            formula: "GDP = C + I + G + (X - M)"
          },
          {
            number: 3,
            title: "Why GDP matters",
            content: "GDP is used to measure economic growth and compare countries' economic performance.",
            example: "A growing GDP usually means more jobs and higher living standards"
          },
          {
            number: 4,
            title: "Limitations of GDP",
            content: "GDP doesn't measure everything that matters for quality of life.",
            example: "It doesn't account for income inequality, environmental damage, or unpaid work"
          }
        ],
        keyPoints: [
          "GDP is the most common measure of economic activity",
          "Higher GDP generally indicates a stronger economy",
          "GDP growth is important for job creation and prosperity",
          "GDP has limitations and doesn't measure all aspects of well-being"
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
            example: "You can't have everything, so every choice means giving up something else"
          },
          {
            number: 3,
            title: "Examples in daily life",
            content: "Every decision involves opportunity cost, from small daily choices to major life decisions.",
            example: "Studying for a test (opportunity cost: watching TV). Going to college (opportunity cost: working full-time)"
          },
          {
            number: 4,
            title: "Making better decisions",
            content: "Understanding opportunity cost helps you make more informed choices.",
            example: "Consider what you're giving up, not just what you're getting"
          }
        ],
        keyPoints: [
          "Every choice has an opportunity cost",
          "Opportunity cost is about the best alternative you give up",
          "Understanding this concept leads to better decision-making",
          "It applies to individuals, businesses, and governments"
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