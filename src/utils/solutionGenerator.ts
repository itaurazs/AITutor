import { Step } from '../types/Subject';

export const generateStepByStepSolution = (question: string, subject: string): { steps: Step[], keyPoints: string[] } => {
  const lowerQuestion = question.toLowerCase();
  
  // MATHEMATICS SOLUTIONS - Comprehensive coverage
  if (subject === 'mathematics') {
    
    // Times tables - Enhanced pattern matching
    if (lowerQuestion.includes('times table') || 
        (lowerQuestion.includes('table') && /\d+/.test(lowerQuestion)) ||
        lowerQuestion.match(/(\d+)\s*times\s*table/) ||
        lowerQuestion.match(/what\s+is\s+(\d+)\s*x/) ||
        lowerQuestion.match(/(\d+)\s*multiplication/)) {
      
      const number = lowerQuestion.match(/(\d+)/)?.[1] || '8';
      const num = parseInt(number);
      
      return {
        steps: [
          {
            number: 1,
            title: `Understanding the ${number} times table`,
            content: `The ${number} times table shows what happens when we multiply ${number} by different numbers. It's like adding ${number} to itself multiple times.`,
            example: `${number} × 1 = ${num}, ${number} × 2 = ${num * 2}, ${number} × 3 = ${num * 3}...`
          },
          {
            number: 2,
            title: "Complete times table sequence",
            content: `Here's the full ${number} times table from 1 to 12:`,
            formula: Array.from({length: 12}, (_, i) => `${number} × ${i + 1} = ${num * (i + 1)}`).join('\n')
          },
          {
            number: 3,
            title: "Pattern recognition",
            content: `Look for patterns in the ${number} times table to make it easier to remember:`,
            example: num === 2 ? "Even numbers: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24" :
                     num === 5 ? "Ends in 5 or 0: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60" :
                     num === 9 ? "Digits add up to 9: 9(9), 18(1+8=9), 27(2+7=9), 36(3+6=9)" :
                     num === 10 ? "Just add a zero: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120" :
                     `Count by ${number}s: ${Array.from({length: 6}, (_, i) => num * (i + 1)).join(', ')}...`
          },
          {
            number: 4,
            title: "Memory techniques and tricks",
            content: "Here are some helpful tricks to remember this times table:",
            example: num === 8 ? "Double, double, double: 8×3 = double 3 (6), double again (12), double again (24)" :
                     num === 9 ? "Finger trick: Hold down the finger for the number you're multiplying, count fingers before (tens) and after (ones)" :
                     num === 6 ? "Even numbers only, and 6×6=36 (remember 'six six thirty-six')" :
                     num === 7 ? "The tricky one! Practice these: 7×7=49, 7×8=56, 7×9=63" :
                     `Practice skip counting by ${number}s regularly`
          },
          {
            number: 5,
            title: "Real-world applications",
            content: "Practice with real-world examples to understand when you'd use this:",
            example: `If you buy ${number} packs of stickers and each pack has 6 stickers, you have ${number} × 6 = ${num * 6} stickers total.`
          }
        ],
        keyPoints: [
          `The ${number} times table is multiplication by ${number}`,
          "Look for patterns to make memorization easier",
          "Practice regularly with different numbers",
          "Use real-world examples to understand the concept",
          "Skip counting helps build multiplication fluency"
        ]
      };
    }

    // Addition problems
    if (lowerQuestion.includes('+') || lowerQuestion.includes('add') || lowerQuestion.includes('plus') || lowerQuestion.includes('sum')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['25', '17'];
      const num1 = parseInt(numbers[0]);
      const num2 = parseInt(numbers[1] || numbers[0]);
      const sum = num1 + num2;
      
      return {
        steps: [
          {
            number: 1,
            title: "Identify the numbers to add",
            content: "Write down the numbers we need to add together clearly.",
            formula: `${num1} + ${num2}`
          },
          {
            number: 2,
            title: "Line up the numbers by place value",
            content: "For multi-digit numbers, align them by place value (ones under ones, tens under tens).",
            formula: `  ${num1.toString().padStart(3, ' ')}\n+ ${num2.toString().padStart(3, ' ')}\n${'─'.repeat(4)}`
          },
          {
            number: 3,
            title: "Add from right to left",
            content: "Start with the ones place, then tens, then hundreds. Carry over when needed.",
            example: sum >= 10 ? "When a column adds up to 10 or more, write down the ones digit and carry the tens digit to the next column." : "Add each column and write the result below."
          },
          {
            number: 4,
            title: "Calculate the final answer",
            content: "Complete the addition for all place values.",
            calculation: `${num1} + ${num2} = ${sum}`
          },
          {
            number: 5,
            title: "Check your answer",
            content: "Verify by adding in reverse order or using estimation.",
            example: `Check: ${num2} + ${num1} = ${sum} ✓`
          }
        ],
        keyPoints: [
          "Always line up numbers by place value",
          "Add from right to left (ones, tens, hundreds)",
          "Remember to carry over when a column sum is 10 or more",
          "Check your work by adding in reverse order",
          "Estimation can help you verify if your answer is reasonable"
        ]
      };
    }

    // Subtraction problems
    if (lowerQuestion.includes('-') || lowerQuestion.includes('subtract') || lowerQuestion.includes('minus') || lowerQuestion.includes('difference')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['43', '18'];
      const num1 = parseInt(numbers[0]);
      const num2 = parseInt(numbers[1] || numbers[0]);
      const difference = Math.abs(num1 - num2);
      
      return {
        steps: [
          {
            number: 1,
            title: "Set up the subtraction",
            content: "Write the larger number on top and the smaller number below it.",
            formula: `  ${Math.max(num1, num2).toString().padStart(3, ' ')}\n- ${Math.min(num1, num2).toString().padStart(3, ' ')}\n${'─'.repeat(4)}`
          },
          {
            number: 2,
            title: "Check if borrowing is needed",
            content: "Look at each column from right to left. If the top digit is smaller than the bottom digit, you'll need to borrow.",
            example: "Borrowing means taking 1 from the next column to the left (which equals 10 in the current column)."
          },
          {
            number: 3,
            title: "Subtract from right to left",
            content: "Start with the ones place, then tens, then hundreds. Borrow when necessary.",
            example: "If you need to borrow, cross out the digit you're borrowing from, reduce it by 1, and add 10 to the current column."
          },
          {
            number: 4,
            title: "Calculate the result",
            content: "Complete the subtraction for each place value.",
            calculation: `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ${difference}`
          },
          {
            number: 5,
            title: "Verify your answer",
            content: "Check by adding your answer to the number you subtracted.",
            example: `Check: ${difference} + ${Math.min(num1, num2)} = ${Math.max(num1, num2)} ✓`
          }
        ],
        keyPoints: [
          "Always put the larger number on top",
          "Subtract from right to left",
          "Borrow from the next column when the top digit is smaller",
          "Check by adding your answer to the subtracted number",
          "Practice borrowing with different examples"
        ]
      };
    }

    // Multiplication problems
    if ((lowerQuestion.includes('×') || lowerQuestion.includes('*') || lowerQuestion.includes('multiply')) && !lowerQuestion.includes('table')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['24', '6'];
      const num1 = parseInt(numbers[0]);
      const num2 = parseInt(numbers[1] || numbers[0]);
      const product = num1 * num2;
      
      return {
        steps: [
          {
            number: 1,
            title: "Set up the multiplication",
            content: "Write the numbers clearly, with the larger number typically on top.",
            formula: `  ${num1}\n× ${num2}\n${'─'.repeat(Math.max(num1.toString().length, num2.toString().length) + 2)}`
          },
          {
            number: 2,
            title: "Multiply by each digit",
            content: "If multiplying by a multi-digit number, multiply by each digit separately, starting from the right.",
            example: num2 >= 10 ? `First multiply ${num1} × ${num2 % 10}, then ${num1} × ${Math.floor(num2 / 10)}0` : `Multiply ${num1} × ${num2}`
          },
          {
            number: 3,
            title: "Use your times tables",
            content: "Apply the times tables you've learned to calculate each step.",
            formula: `${num1} × ${num2} = ${product}`
          },
          {
            number: 4,
            title: "Add partial products (if needed)",
            content: num2 >= 10 ? "If you had multiple rows, add them together for the final answer." : "For single-digit multiplication, you have your final answer.",
            calculation: `${product}`
          },
          {
            number: 5,
            title: "Check your answer",
            content: "Verify using estimation or by multiplying in reverse order.",
            example: `Check: ${num2} × ${num1} = ${product} ✓`
          }
        ],
        keyPoints: [
          "Multiplication is repeated addition",
          "Use times tables to make calculations faster",
          "For multi-digit numbers, multiply by each digit separately",
          "Always check your work with estimation",
          "Practice times tables to improve speed and accuracy"
        ]
      };
    }

    // Division problems
    if (lowerQuestion.includes('÷') || lowerQuestion.includes('/') || lowerQuestion.includes('divide') || lowerQuestion.includes('division')) {
      const numbers = lowerQuestion.match(/\d+/g) || ['84', '7'];
      const dividend = parseInt(numbers[0]);
      const divisor = parseInt(numbers[1] || numbers[0]);
      const quotient = Math.floor(dividend / divisor);
      const remainder = dividend % divisor;
      
      return {
        steps: [
          {
            number: 1,
            title: "Set up the division",
            content: "Write the division in long division format.",
            formula: `${dividend} ÷ ${divisor} = ?`
          },
          {
            number: 2,
            title: "Estimate the answer",
            content: "Think about what number times the divisor would be close to the dividend.",
            example: `What times ${divisor} is close to ${dividend}? Try ${quotient}...`
          },
          {
            number: 3,
            title: "Use multiplication to check",
            content: "Multiply your estimate by the divisor to see how close you are.",
            formula: `${quotient} × ${divisor} = ${quotient * divisor}`
          },
          {
            number: 4,
            title: "Calculate the remainder",
            content: "Subtract to find what's left over.",
            calculation: remainder > 0 ? `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}` : `${dividend} ÷ ${divisor} = ${quotient}`
          },
          {
            number: 5,
            title: "Check your answer",
            content: "Verify by multiplying the quotient by the divisor and adding the remainder.",
            example: `Check: ${quotient} × ${divisor} + ${remainder} = ${quotient * divisor + remainder} = ${dividend} ✓`
          }
        ],
        keyPoints: [
          "Division is the opposite of multiplication",
          "Estimate first to get close to the answer",
          "Use times tables to help with division",
          "Check your work by multiplying back",
          "Remainders are what's left over when division isn't exact"
        ]
      };
    }

    // Algebra - solving for x
    if ((lowerQuestion.includes('solve') && lowerQuestion.includes('x')) || lowerQuestion.includes('equation')) {
      // Try to extract equation parts
      const hasEquals = lowerQuestion.includes('=');
      if (hasEquals) {
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
              title: "Isolate the term with x",
              content: "Get all terms with x on one side and all numbers on the other side.",
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
              content: "Substitute your answer back into the original equation to verify.",
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
    }

    // Fractions
    if (lowerQuestion.includes('fraction') || lowerQuestion.includes('½') || lowerQuestion.includes('1/2') || lowerQuestion.match(/\d+\/\d+/)) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding fractions",
            content: "A fraction represents a part of a whole. The top number (numerator) shows how many parts we have, the bottom number (denominator) shows how many equal parts the whole is divided into.",
            formula: "numerator/denominator",
            example: "3/4 means 3 parts out of 4 total equal parts"
          },
          {
            number: 2,
            title: "Types of fractions",
            content: "Proper fractions (numerator < denominator), improper fractions (numerator ≥ denominator), and mixed numbers.",
            example: "Proper: 2/3, Improper: 5/3, Mixed: 1⅔"
          },
          {
            number: 3,
            title: "Adding fractions with same denominators",
            content: "When denominators are the same, add the numerators and keep the denominator.",
            formula: "1/4 + 2/4 = (1+2)/4 = 3/4",
            example: "Like adding pieces of the same-sized pie"
          },
          {
            number: 4,
            title: "Adding fractions with different denominators",
            content: "Find a common denominator (usually the least common multiple), then add.",
            formula: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2",
            example: "Convert 1/3 to 2/6 so both fractions have denominator 6"
          },
          {
            number: 5,
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
          "Always simplify your final answer",
          "Practice with visual models like pie charts or fraction bars"
        ]
      };
    }

    // Geometry - area and perimeter
    if (lowerQuestion.includes('area') || lowerQuestion.includes('perimeter') || lowerQuestion.includes('rectangle') || lowerQuestion.includes('square') || lowerQuestion.includes('triangle') || lowerQuestion.includes('circle')) {
      
      if (lowerQuestion.includes('circle')) {
        return {
          steps: [
            {
              number: 1,
              title: "Identify what we're finding",
              content: "Determine if we need area or circumference of the circle.",
              example: "Area = space inside the circle, Circumference = distance around the circle"
            },
            {
              number: 2,
              title: "Identify the radius or diameter",
              content: "Find the radius (center to edge) or diameter (across the circle through center).",
              formula: "Radius = Diameter ÷ 2, or Diameter = Radius × 2"
            },
            {
              number: 3,
              title: "Use the appropriate formula",
              content: "Apply the correct circle formula.",
              formula: "Area = πr² (pi times radius squared)\nCircumference = 2πr (2 times pi times radius)"
            },
            {
              number: 4,
              title: "Calculate the answer",
              content: "Substitute values and calculate, using π ≈ 3.14159 or leaving in terms of π.",
              example: "For radius = 5: Area = π(5)² = 25π ≈ 78.54 square units"
            }
          ],
          keyPoints: [
            "Remember π (pi) ≈ 3.14159",
            "Area uses r² (radius squared)",
            "Circumference uses 2r (2 times radius)",
            "Include proper units (square units for area, linear units for circumference)"
          ]
        };
      }

      return {
        steps: [
          {
            number: 1,
            title: "Identify the shape and what to find",
            content: "Determine the shape (rectangle, square, triangle) and whether you need area or perimeter.",
            example: "Area = space inside, Perimeter = distance around the outside"
          },
          {
            number: 2,
            title: "Identify the measurements",
            content: "Find the length, width, height, or side measurements given in the problem.",
            example: "Rectangle: length and width, Square: side length, Triangle: base and height for area"
          },
          {
            number: 3,
            title: "Choose the correct formula",
            content: "Use the appropriate formula for your shape and what you're finding.",
            formula: "Rectangle Area = length × width\nRectangle Perimeter = 2(length + width)\nSquare Area = side²\nTriangle Area = ½ × base × height"
          },
          {
            number: 4,
            title: "Substitute and calculate",
            content: "Replace the variables in the formula with your measurements and calculate.",
            example: "If length = 8 and width = 5, then Area = 8 × 5 = 40 square units"
          },
          {
            number: 5,
            title: "Include proper units",
            content: "Make sure your answer has the correct units.",
            example: "Area: square units (cm², m², etc.), Perimeter: linear units (cm, m, etc.)"
          }
        ],
        keyPoints: [
          "Area is always in square units, perimeter in linear units",
          "Double-check which formula to use for each shape",
          "Make sure all measurements are in the same units",
          "Draw a picture if it helps visualize the problem"
        ]
      };
    }

    // Percentages
    if (lowerQuestion.includes('percent') || lowerQuestion.includes('%') || lowerQuestion.includes('percentage')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understand what percent means",
            content: "Percent means 'out of 100'. So 25% means 25 out of 100.",
            example: "25% = 25/100 = 0.25"
          },
          {
            number: 2,
            title: "Convert between forms",
            content: "Learn to convert between percent, decimal, and fraction forms.",
            formula: "Percent to decimal: divide by 100\nDecimal to percent: multiply by 100\nPercent to fraction: put over 100 and simplify"
          },
          {
            number: 3,
            title: "Finding a percentage of a number",
            content: "To find what percent of a number is, multiply the number by the decimal form of the percent.",
            example: "25% of 80 = 0.25 × 80 = 20"
          },
          {
            number: 4,
            title: "Finding what percent one number is of another",
            content: "Divide the part by the whole, then multiply by 100.",
            formula: "(Part ÷ Whole) × 100 = Percent",
            example: "15 out of 60 = (15 ÷ 60) × 100 = 25%"
          },
          {
            number: 5,
            title: "Real-world applications",
            content: "Practice with common percentage problems like discounts, tips, and test scores.",
            example: "20% discount on $50 item: $50 × 0.20 = $10 discount, so final price = $40"
          }
        ],
        keyPoints: [
          "Percent means 'out of 100'",
          "Convert to decimals for easier calculation",
          "Part ÷ Whole × 100 gives you the percentage",
          "Practice with real-world examples like shopping and grades"
        ]
      };
    }
  }

  // SCIENCE SOLUTIONS - Comprehensive coverage
  if (subject === 'science') {
    
    // Photosynthesis
    if (lowerQuestion.includes('photosynthesis')) {
      return {
        steps: [
          {
            number: 1,
            title: "Define photosynthesis",
            content: "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) to make their own food.",
            example: "Plants are like solar-powered food factories!"
          },
          {
            number: 2,
            title: "Identify what plants need (reactants)",
            content: "Plants need three things for photosynthesis: carbon dioxide, water, and sunlight.",
            formula: "Carbon dioxide (CO₂) + Water (H₂O) + Light energy"
          },
          {
            number: 3,
            title: "Where photosynthesis happens",
            content: "Photosynthesis occurs in the chloroplasts of plant cells, specifically in the chlorophyll.",
            example: "Chlorophyll is the green pigment that captures light energy - that's why plants are green!"
          },
          {
            number: 4,
            title: "The chemical equation",
            content: "The complete chemical equation shows what goes in and what comes out.",
            formula: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
            example: "6 carbon dioxide + 6 water + light → 1 glucose + 6 oxygen"
          },
          {
            number: 5,
            title: "What plants produce (products)",
            content: "Photosynthesis produces glucose (sugar for plant energy) and oxygen (which we breathe).",
            example: "The oxygen you're breathing right now came from photosynthesis!"
          },
          {
            number: 6,
            title: "Why photosynthesis is important",
            content: "This process is essential for all life on Earth.",
            example: "Without photosynthesis: no oxygen to breathe, no food for animals, no life as we know it!"
          }
        ],
        keyPoints: [
          "Photosynthesis happens in chloroplasts using chlorophyll",
          "Plants need CO₂, H₂O, and light energy",
          "Products are glucose (food) and oxygen",
          "This process provides oxygen for all living things",
          "Plants are called producers because they make their own food"
        ]
      };
    }

    // States of matter
    if (lowerQuestion.includes('states of matter') || lowerQuestion.includes('solid') || lowerQuestion.includes('liquid') || lowerQuestion.includes('gas') || lowerQuestion.includes('plasma')) {
      return {
        steps: [
          {
            number: 1,
            title: "The main states of matter",
            content: "Matter exists in four primary states: solid, liquid, gas, and plasma.",
            example: "Ice (solid), water (liquid), steam (gas), lightning (plasma)"
          },
          {
            number: 2,
            title: "Solid state properties",
            content: "In solids, particles are tightly packed in fixed positions and only vibrate in place.",
            example: "Ice cubes keep their shape because particles can't move around freely. Solids have definite shape and volume."
          },
          {
            number: 3,
            title: "Liquid state properties",
            content: "In liquids, particles are close together but can slide past each other.",
            example: "Water takes the shape of its container but keeps the same volume. Liquids have definite volume but no definite shape."
          },
          {
            number: 4,
            title: "Gas state properties",
            content: "In gases, particles are far apart and move freely and quickly in all directions.",
            example: "Steam expands to fill any container completely. Gases have no definite shape or volume."
          },
          {
            number: 5,
            title: "How states change",
            content: "Matter changes states when energy (usually heat) is added or removed.",
            formula: "Solid ⟷ Liquid ⟷ Gas ⟷ Plasma",
            example: "Melting (solid→liquid), boiling (liquid→gas), condensing (gas→liquid), freezing (liquid→solid)"
          },
          {
            number: 6,
            title: "Energy and state changes",
            content: "Adding energy makes particles move faster and spread out. Removing energy slows particles down.",
            example: "Heat ice → water → steam. Cool steam → water → ice."
          }
        ],
        keyPoints: [
          "Particle movement and spacing determine the state of matter",
          "Temperature changes cause state changes",
          "Each state has unique properties and behaviors",
          "Energy is required to change from one state to another",
          "The same substance can exist in different states"
        ]
      };
    }

    // Newton's laws
    if (lowerQuestion.includes('newton') || lowerQuestion.includes('force') || lowerQuestion.includes('motion') || lowerQuestion.includes('acceleration')) {
      return {
        steps: [
          {
            number: 1,
            title: "Newton's First Law (Law of Inertia)",
            content: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an unbalanced force.",
            example: "A ball on the ground won't move unless you kick it. A rolling ball keeps rolling unless friction stops it."
          },
          {
            number: 2,
            title: "Newton's Second Law (F = ma)",
            content: "The force on an object equals its mass times its acceleration.",
            formula: "Force = mass × acceleration (F = ma)",
            example: "It takes more force to accelerate a heavy truck than a light car at the same rate."
          },
          {
            number: 3,
            title: "Newton's Third Law (Action-Reaction)",
            content: "For every action, there is an equal and opposite reaction.",
            example: "When you walk, you push back on the ground, and the ground pushes forward on you. When you sit in a chair, you push down on it, and it pushes up on you."
          },
          {
            number: 4,
            title: "Applying the Second Law",
            content: "Use F = ma to solve force problems.",
            example: "If a 10 kg object accelerates at 5 m/s², the force is: F = 10 kg × 5 m/s² = 50 N (Newtons)"
          },
          {
            number: 5,
            title: "Real-world examples",
            content: "These laws explain everyday experiences.",
            example: "Seatbelts (1st law), pushing a shopping cart (2nd law), rocket propulsion (3rd law)"
          }
        ],
        keyPoints: [
          "Inertia means objects resist changes in motion",
          "More force or less mass means more acceleration",
          "Forces always come in pairs",
          "These laws explain how everything moves",
          "Force is measured in Newtons (N)"
        ]
      };
    }

    // Cell structure and function
    if (lowerQuestion.includes('cell') || lowerQuestion.includes('mitosis') || lowerQuestion.includes('dna') || lowerQuestion.includes('rna')) {
      return {
        steps: [
          {
            number: 1,
            title: "What are cells?",
            content: "Cells are the basic units of life. All living things are made of one or more cells.",
            example: "You have trillions of cells in your body, each doing specific jobs!"
          },
          {
            number: 2,
            title: "Parts of a cell",
            content: "Key cell parts include the nucleus (control center), cytoplasm (jelly-like filling), and cell membrane (outer boundary).",
            example: "Think of a cell like a factory: nucleus = office, cytoplasm = factory floor, membrane = security gate"
          },
          {
            number: 3,
            title: "DNA and RNA",
            content: "DNA stores genetic information, RNA helps make proteins.",
            formula: "DNA = instructions for life, RNA = messenger that carries out instructions",
            example: "DNA is like a recipe book, RNA is like a cook following the recipe"
          },
          {
            number: 4,
            title: "Cell division (Mitosis)",
            content: "Mitosis is how cells divide to create two identical cells for growth and repair.",
            example: "When you get a cut, mitosis creates new skin cells to heal the wound"
          },
          {
            number: 5,
            title: "Plant vs Animal cells",
            content: "Plant cells have cell walls and chloroplasts that animal cells don't have.",
            example: "Plant cells: rigid cell wall, chloroplasts for photosynthesis. Animal cells: flexible membrane, no chloroplasts"
          }
        ],
        keyPoints: [
          "Cells are the building blocks of all life",
          "Each cell part has a specific function",
          "DNA contains the instructions for life",
          "Mitosis creates new cells for growth and repair",
          "Plant and animal cells have some differences"
        ]
      };
    }

    // Chemical reactions and equations
    if (lowerQuestion.includes('chemical') || lowerQuestion.includes('reaction') || lowerQuestion.includes('equation') || lowerQuestion.includes('balance')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is a chemical reaction?",
            content: "A chemical reaction occurs when substances (reactants) change into new substances (products).",
            example: "Burning wood: wood + oxygen → ash + carbon dioxide + water vapor"
          },
          {
            number: 2,
            title: "Writing chemical equations",
            content: "Chemical equations use symbols to show what happens in a reaction.",
            formula: "Reactants → Products",
            example: "H₂ + O₂ → H₂O (hydrogen + oxygen → water)"
          },
          {
            number: 3,
            title: "Balancing equations",
            content: "The same number of each type of atom must be on both sides of the equation.",
            example: "Unbalanced: H₂ + O₂ → H₂O\nBalanced: 2H₂ + O₂ → 2H₂O"
          },
          {
            number: 4,
            title: "Types of reactions",
            content: "Common types include synthesis (combining), decomposition (breaking apart), and combustion (burning).",
            example: "Synthesis: A + B → AB\nDecomposition: AB → A + B\nCombustion: fuel + oxygen → CO₂ + H₂O"
          },
          {
            number: 5,
            title: "Signs of chemical reactions",
            content: "Look for color changes, gas production, temperature changes, or precipitate formation.",
            example: "Baking soda + vinegar produces bubbles (gas), showing a chemical reaction occurred"
          }
        ],
        keyPoints: [
          "Chemical reactions create new substances",
          "Equations must be balanced (same atoms on both sides)",
          "Energy is usually absorbed or released",
          "Look for observable signs that a reaction occurred",
          "Practice balancing equations step by step"
        ]
      };
    }

    // Human body systems
    if (lowerQuestion.includes('body') || lowerQuestion.includes('system') || lowerQuestion.includes('heart') || lowerQuestion.includes('lung') || lowerQuestion.includes('digestive')) {
      return {
        steps: [
          {
            number: 1,
            title: "Body systems work together",
            content: "Your body has several systems that work together to keep you alive and healthy.",
            example: "Circulatory, respiratory, digestive, nervous, skeletal, muscular systems all cooperate"
          },
          {
            number: 2,
            title: "Circulatory system",
            content: "Heart pumps blood through blood vessels to carry oxygen and nutrients throughout your body.",
            example: "Heart → arteries → capillaries → veins → back to heart"
          },
          {
            number: 3,
            title: "Respiratory system",
            content: "Lungs take in oxygen and remove carbon dioxide from your blood.",
            example: "Breathe in oxygen, breathe out carbon dioxide. Lungs and blood work together."
          },
          {
            number: 4,
            title: "Digestive system",
            content: "Breaks down food into nutrients your body can use for energy and growth.",
            example: "Mouth → stomach → small intestine → large intestine. Each part has a specific job."
          },
          {
            number: 5,
            title: "How systems connect",
            content: "Systems depend on each other to function properly.",
            example: "Digestive system gets nutrients, circulatory system delivers them, respiratory system provides oxygen for cells to use nutrients"
          }
        ],
        keyPoints: [
          "Body systems are interconnected and interdependent",
          "Each system has specific organs with specific functions",
          "Systems work together to maintain homeostasis",
          "Understanding one system helps understand others",
          "Healthy habits support all body systems"
        ]
      };
    }
  }

  // ENGLISH SOLUTIONS - Comprehensive coverage
  if (subject === 'english') {
    
    // Grammar - Parts of speech
    if (lowerQuestion.includes('parts of speech') || lowerQuestion.includes('noun') || lowerQuestion.includes('verb') || lowerQuestion.includes('adjective') || lowerQuestion.includes('grammar')) {
      return {
        steps: [
          {
            number: 1,
            title: "Nouns - naming words",
            content: "Nouns name people, places, things, or ideas. They can be concrete (touchable) or abstract (ideas).",
            example: "Person: teacher, doctor. Place: school, park. Thing: book, car. Idea: happiness, freedom"
          },
          {
            number: 2,
            title: "Verbs - action and being words",
            content: "Verbs show action or state of being. Action verbs show what someone does, being verbs show what someone is.",
            example: "Action: run, jump, write, think. Being: is, are, was, were, become, seem"
          },
          {
            number: 3,
            title: "Adjectives - describing words",
            content: "Adjectives describe or modify nouns. They tell us what kind, which one, or how many.",
            example: "The big, red car. (What kind of car? Big and red.) Three books. (How many books? Three.)"
          },
          {
            number: 4,
            title: "Adverbs - modify verbs, adjectives, other adverbs",
            content: "Adverbs often end in -ly and tell how, when, where, or to what extent something happens.",
            example: "She ran quickly. (How?) Yesterday, I studied. (When?) He is very tall. (To what extent?)"
          },
          {
            number: 5,
            title: "Other important parts",
            content: "Pronouns replace nouns, prepositions show relationships, conjunctions connect words or ideas.",
            example: "Pronouns: he, she, it, they. Prepositions: in, on, under, beside. Conjunctions: and, but, or, because"
          },
          {
            number: 6,
            title: "Using parts of speech",
            content: "Understanding parts of speech helps you write better sentences and understand grammar rules.",
            example: "The happy children played quietly in the park. (article + adjective + noun + verb + adverb + preposition + article + noun)"
          }
        ],
        keyPoints: [
          "Every word in a sentence has a specific job (part of speech)",
          "Understanding parts of speech improves writing and grammar",
          "Some words can be different parts of speech in different sentences",
          "Practice identifying parts of speech in sentences you read",
          "Good writing uses a variety of parts of speech effectively"
        ]
      };
    }

    // Writing - Essays and paragraphs
    if (lowerQuestion.includes('essay') || lowerQuestion.includes('paragraph') || lowerQuestion.includes('writing') || lowerQuestion.includes('thesis')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding essay structure",
            content: "A good essay has three main parts: introduction, body paragraphs, and conclusion.",
            example: "Introduction: hook + background + thesis. Body: main points with evidence. Conclusion: restate thesis + summarize + final thought"
          },
          {
            number: 2,
            title: "Writing a strong thesis statement",
            content: "Your thesis statement is the main argument of your essay. It should be specific, arguable, and supportable.",
            example: "Weak: 'Pollution is bad.' Strong: 'Government regulations are the most effective way to reduce industrial pollution because they create enforceable standards.'"
          },
          {
            number: 3,
            title: "Developing body paragraphs",
            content: "Each body paragraph should have a topic sentence, evidence, and explanation of how the evidence supports your thesis.",
            formula: "Topic sentence + Evidence + Explanation + Transition to next paragraph"
          },
          {
            number: 4,
            title: "Using evidence effectively",
            content: "Support your points with specific examples, quotes, statistics, or expert opinions.",
            example: "Don't just say 'Many people agree.' Instead: 'According to a 2023 survey by the Environmental Protection Agency, 78% of Americans support stricter pollution controls.'"
          },
          {
            number: 5,
            title: "Writing strong conclusions",
            content: "Your conclusion should restate your thesis in new words, summarize main points, and leave the reader with something to think about.",
            example: "Don't just repeat your introduction. Instead, show why your argument matters and what it means for the future."
          }
        ],
        keyPoints: [
          "Every essay needs a clear thesis statement",
          "Each paragraph should support your main argument",
          "Use specific evidence to support your points",
          "Organize your ideas logically",
          "Revise and edit your work for clarity and correctness"
        ]
      };
    }

    // Reading comprehension and literature
    if (lowerQuestion.includes('reading') || lowerQuestion.includes('literature') || lowerQuestion.includes('story') || lowerQuestion.includes('poem') || lowerQuestion.includes('metaphor') || lowerQuestion.includes('simile')) {
      return {
        steps: [
          {
            number: 1,
            title: "Active reading strategies",
            content: "Good readers engage with the text by asking questions, making predictions, and connecting to their own experiences.",
            example: "Before reading: What do I know about this topic? During reading: What might happen next? After reading: How does this connect to what I know?"
          },
          {
            number: 2,
            title: "Understanding literary devices",
            content: "Authors use special techniques to make their writing more interesting and meaningful.",
            example: "Metaphor: 'Life is a journey' (direct comparison). Simile: 'Life is like a journey' (comparison using 'like' or 'as')"
          },
          {
            number: 3,
            title: "Identifying themes",
            content: "The theme is the main message or lesson of a story. Look for what the characters learn or what the author wants you to understand.",
            example: "In 'The Tortoise and the Hare,' the theme is that slow and steady wins the race (persistence beats natural talent without effort)"
          },
          {
            number: 4,
            title: "Analyzing characters",
            content: "Pay attention to what characters say, do, think, and how others react to them.",
            example: "Character development: How does the character change from beginning to end? What causes this change?"
          },
          {
            number: 5,
            title: "Understanding plot structure",
            content: "Most stories follow a pattern: exposition, rising action, climax, falling action, resolution.",
            example: "Exposition: introduces characters and setting. Climax: the turning point or most exciting moment. Resolution: how everything ends"
          }
        ],
        keyPoints: [
          "Active reading improves comprehension",
          "Literary devices add depth and meaning to writing",
          "Themes are universal messages about life",
          "Character analysis reveals human nature",
          "Plot structure helps organize and understand stories"
        ]
      };
    }

    // Vocabulary and word study
    if (lowerQuestion.includes('vocabulary') || lowerQuestion.includes('word') || lowerQuestion.includes('meaning') || lowerQuestion.includes('definition')) {
      return {
        steps: [
          {
            number: 1,
            title: "Context clues",
            content: "Use the words and sentences around an unknown word to figure out its meaning.",
            example: "The arid desert had no water for miles. (Arid probably means dry because deserts are dry and there's no water)"
          },
          {
            number: 2,
            title: "Word parts (roots, prefixes, suffixes)",
            content: "Many English words are built from smaller parts that have their own meanings.",
            example: "Unhappiness: un- (not) + happy + -ness (state of being) = the state of not being happy"
          },
          {
            number: 3,
            title: "Using a dictionary effectively",
            content: "Dictionaries give pronunciation, part of speech, definitions, and example sentences.",
            example: "Look for the definition that makes sense in your specific sentence - many words have multiple meanings"
          },
          {
            number: 4,
            title: "Building vocabulary through reading",
            content: "The more you read, the more words you encounter and learn naturally.",
            example: "Keep a vocabulary journal of new words you find, with definitions and example sentences"
          },
          {
            number: 5,
            title: "Using new words",
            content: "Practice using new vocabulary words in your own speaking and writing.",
            example: "Try to use each new word in three different sentences to really understand it"
          }
        ],
        keyPoints: [
          "Context clues are your first tool for unknown words",
          "Understanding word parts helps with many words",
          "Reading widely exposes you to more vocabulary",
          "Practice using new words to make them stick",
          "A strong vocabulary improves all communication skills"
        ]
      };
    }
  }

  // HISTORY SOLUTIONS - Comprehensive coverage
  if (subject === 'history') {
    
    // American Civil War - Enhanced
    if (lowerQuestion.includes('american civil war') || lowerQuestion.includes('civil war') || lowerQuestion.includes('what started the american civil war') || lowerQuestion.includes('causes of the civil war') || lowerQuestion.includes('why did the civil war start')) {
      return {
        steps: [
          {
            number: 1,
            title: "The central issue: slavery",
            content: "The fundamental disagreement over slavery was the primary cause of the Civil War.",
            example: "Northern states wanted to abolish slavery, while Southern states depended on slave labor for their cotton-based economy"
          },
          {
            number: 2,
            title: "Economic differences",
            content: "The North and South had developed very different economic systems that created conflict.",
            example: "North: Industrial economy with factories and wage workers. South: Agricultural economy with plantations using enslaved labor"
          },
          {
            number: 3,
            title: "States' rights vs federal power",
            content: "Southern states believed they had the right to make their own decisions about slavery, while the federal government disagreed.",
            example: "South argued: 'The federal government can't tell states what to do about slavery.' North argued: 'Slavery violates human rights and should be illegal everywhere.'"
          },
          {
            number: 4,
            title: "Political tensions escalate",
            content: "Key events and compromises increased tensions between North and South throughout the 1800s.",
            example: "Missouri Compromise (1820), Compromise of 1850, Kansas-Nebraska Act (1854), Dred Scott case (1857) - each made tensions worse"
          },
          {
            number: 5,
            title: "Lincoln's election triggers secession",
            content: "Abraham Lincoln's election in 1860 led Southern states to secede (leave) the Union.",
            formula: "South Carolina seceded first (December 1860), followed by 10 other states by June 1861"
          },
          {
            number: 6,
            title: "Fort Sumter - the war begins",
            content: "The first shots of the Civil War were fired at Fort Sumter in Charleston, South Carolina.",
            example: "April 12, 1861 - Confederate forces attacked the federal fort, officially starting the war that would last four years"
          }
        ],
        keyPoints: [
          "Slavery was the central issue that divided the nation",
          "Economic and cultural differences between North and South created lasting tensions",
          "The conflict was fundamentally about whether federal or state government had ultimate authority",
          "The war lasted from 1861 to 1865 and preserved the Union while ending slavery",
          "Over 600,000 Americans died in this conflict"
        ]
      };
    }

    // World War I
    if (lowerQuestion.includes('world war i') || lowerQuestion.includes('wwi') || lowerQuestion.includes('world war 1') || lowerQuestion.includes('first world war')) {
      return {
        steps: [
          {
            number: 1,
            title: "Long-term causes building tension",
            content: "Several factors built tension in Europe before the war began, creating a powder keg ready to explode.",
            example: "Imperialism (competition for colonies), nationalism (ethnic groups wanting independence), militarism (arms race), alliance systems (opposing teams)"
          },
          {
            number: 2,
            title: "The alliance system divides Europe",
            content: "Europe was divided into two opposing alliance systems that meant a small conflict could become a big war.",
            example: "Triple Alliance: Germany, Austria-Hungary, Italy vs. Triple Entente: France, Russia, Britain"
          },
          {
            number: 3,
            title: "The immediate trigger: assassination",
            content: "The assassination of Archduke Franz Ferdinand of Austria-Hungary sparked the war.",
            example: "June 28, 1914, in Sarajevo - Shot by Gavrilo Princip, a Serbian nationalist who wanted Bosnia free from Austrian rule"
          },
          {
            number: 4,
            title: "The domino effect begins",
            content: "The alliance system turned a regional conflict into a world war through a chain reaction.",
            formula: "Austria-Hungary declares war on Serbia → Russia mobilizes to help Serbia → Germany declares war on Russia → France mobilizes to help Russia → Germany invades Belgium → Britain declares war on Germany"
          },
          {
            number: 5,
            title: "New technology makes war deadlier",
            content: "WWI introduced new weapons and tactics that made it especially devastating.",
            example: "Machine guns, poison gas, tanks, airplanes, submarines - trench warfare led to massive casualties for small gains"
          },
          {
            number: 6,
            title: "The war's end and consequences",
            content: "The war ended in 1918 with Germany's defeat, but its consequences shaped the 20th century.",
            example: "Treaty of Versailles punished Germany harshly, Russian Revolution created Soviet Union, Ottoman Empire collapsed, millions died"
          }
        ],
        keyPoints: [
          "No single cause led to WWI - it was a combination of factors",
          "The alliance system meant that a small conflict escalated quickly",
          "Nationalism and imperialism created tensions between nations",
          "New technology made this war more deadly than any before",
          "The war's aftermath set the stage for World War II"
        ]
      };
    }

    // American Revolution
    if (lowerQuestion.includes('american revolution') || lowerQuestion.includes('revolutionary war') || lowerQuestion.includes('independence') || lowerQuestion.includes('1776')) {
      return {
        steps: [
          {
            number: 1,
            title: "Growing tensions with Britain",
            content: "After the French and Indian War (1754-1763), Britain needed money and began taxing the American colonies heavily.",
            example: "Sugar Act, Stamp Act, Townshend Acts, Tea Act - colonists had no representation in British Parliament but were being taxed"
          },
          {
            number: 2,
            title: "Colonial resistance grows",
            content: "Colonists protested British policies through boycotts, petitions, and sometimes violence.",
            example: "Boston Massacre (1770), Boston Tea Party (1773), formation of Sons of Liberty, 'No taxation without representation' became the rallying cry"
          },
          {
            number: 3,
            title: "The Intolerable Acts push colonists too far",
            content: "Britain's harsh response to the Boston Tea Party united the colonies against British rule.",
            example: "Closed Boston Harbor, took away Massachusetts' self-government, allowed British officials to be tried in England instead of America"
          },
          {
            number: 4,
            title: "First Continental Congress and early battles",
            content: "Colonies began organizing resistance, leading to the first battles of the war.",
            example: "First Continental Congress (1774), Battles of Lexington and Concord (April 1775) - 'the shot heard round the world'"
          },
          {
            number: 5,
            title: "Declaration of Independence",
            content: "The colonies formally declared their independence from Britain.",
            formula: "July 4, 1776 - Written primarily by Thomas Jefferson, based on ideas of natural rights and government by consent"
          },
          {
            number: 6,
            title: "The war and victory",
            content: "The colonists fought and won their independence with crucial help from France.",
            example: "Valley Forge (1777-78), French alliance (1778), Battle of Yorktown (1781), Treaty of Paris (1783) officially ended the war"
          }
        ],
        keyPoints: [
          "The phrase 'No taxation without representation' summarized colonial grievances",
          "The war lasted from 1775 to 1783",
          "French support was crucial to American victory",
          "The revolution established the United States as an independent nation",
          "Ideas from the Declaration influenced democratic movements worldwide"
        ]
      };
    }

    // Ancient civilizations
    if (lowerQuestion.includes('ancient') || lowerQuestion.includes('egypt') || lowerQuestion.includes('rome') || lowerQuestion.includes('greece') || lowerQuestion.includes('civilization')) {
      return {
        steps: [
          {
            number: 1,
            title: "What makes a civilization?",
            content: "Civilizations have cities, government, religion, social classes, arts, and writing systems.",
            example: "Ancient Egypt, Greece, Rome, Mesopotamia, China, and India all developed these features"
          },
          {
            number: 2,
            title: "Ancient Egypt: Gift of the Nile",
            content: "Egyptian civilization developed along the Nile River, which provided water and fertile soil.",
            example: "Pharaohs (god-kings), pyramids, hieroglyphics, mummification, lasted over 3,000 years"
          },
          {
            number: 3,
            title: "Ancient Greece: Birthplace of democracy",
            content: "Greeks developed new ideas about government, philosophy, and science.",
            example: "Athens (democracy), Sparta (military state), philosophers like Socrates and Plato, Olympic Games"
          },
          {
            number: 4,
            title: "Ancient Rome: From republic to empire",
            content: "Rome grew from a small city-state to control most of the known world.",
            example: "Roman Republic (senators), Julius Caesar, Roman Empire, Roman law, roads and aqueducts, Christianity spreads"
          },
          {
            number: 5,
            title: "Legacy of ancient civilizations",
            content: "These civilizations gave us ideas and innovations we still use today.",
            example: "Democracy (Greece), law systems (Rome), architecture (columns, domes), mathematics and medicine, alphabet systems"
          }
        ],
        keyPoints: [
          "Ancient civilizations developed along major rivers",
          "Each civilization contributed unique ideas to human development",
          "Government systems evolved from kingdoms to republics to empires",
          "Religion played a central role in ancient societies",
          "Many modern ideas trace back to ancient civilizations"
        ]
      };
    }

    // Industrial Revolution
    if (lowerQuestion.includes('industrial revolution') || lowerQuestion.includes('industrial') || lowerQuestion.includes('factory') || lowerQuestion.includes('steam engine')) {
      return {
        steps: [
          {
            number: 1,
            title: "What was the Industrial Revolution?",
            content: "A period (roughly 1760-1840) when production shifted from hand-made goods in homes to machine-made goods in factories.",
            example: "Before: families made cloth at home on spinning wheels. After: workers made cloth in textile factories with steam-powered machines"
          },
          {
            number: 2,
            title: "Key inventions changed everything",
            content: "New machines and power sources revolutionized how things were made.",
            example: "Steam engine (James Watt), spinning jenny, power loom, cotton gin, railroad locomotive"
          },
          {
            number: 3,
            title: "Why it started in Britain",
            content: "Britain had the right combination of factors for industrialization.",
            example: "Natural resources (coal, iron), capital (money to invest), labor (people to work), transportation (rivers, ports), political stability"
          },
          {
            number: 4,
            title: "Changes in how people lived",
            content: "Industrialization changed where and how people lived and worked.",
            example: "Rural to urban migration, factory towns, new social classes (industrial capitalists and industrial workers), child labor"
          },
          {
            number: 5,
            title: "Positive and negative effects",
            content: "The Industrial Revolution brought both benefits and problems.",
            example: "Positive: more goods, lower prices, new jobs, better transportation. Negative: pollution, dangerous working conditions, crowded cities, inequality"
          },
          {
            number: 6,
            title: "Spread around the world",
            content: "Industrialization spread from Britain to other countries and continues today.",
            example: "United States (1800s), Germany (1800s), Japan (late 1800s), and continues spreading to developing countries today"
          }
        ],
        keyPoints: [
          "The Industrial Revolution changed how goods were produced",
          "Steam power was the key breakthrough technology",
          "It created new social and economic systems",
          "Both positive and negative effects on society",
          "This process of industrialization continues worldwide today"
        ]
      };
    }
  }

  // GEOGRAPHY SOLUTIONS - Comprehensive coverage
  if (subject === 'geography') {
    
    // Mountain formation
    if (lowerQuestion.includes('mountain') || lowerQuestion.includes('formed') || lowerQuestion.includes('plate tectonics')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding plate tectonics",
            content: "The Earth's outer layer (crust) is broken into large pieces called tectonic plates that slowly move.",
            example: "Think of the Earth's crust like a cracked eggshell - the pieces (plates) float on the hot, soft rock underneath"
          },
          {
            number: 2,
            title: "Collision mountains (fold mountains)",
            content: "When two plates push against each other, the crust gets squeezed and pushed upward, forming mountains.",
            example: "The Himalayas formed when the Indian plate crashed into the Eurasian plate - they're still growing taller today!"
          },
          {
            number: 3,
            title: "Volcanic mountains",
            content: "Mountains can form when magma (melted rock) from inside the Earth reaches the surface and builds up over time.",
            example: "Mount Fuji in Japan, Mount St. Helens in Washington, Hawaiian islands - all formed by volcanic activity"
          },
          {
            number: 4,
            title: "Fault-block mountains",
            content: "These form when large blocks of crust are lifted up or dropped down along cracks (faults) in the Earth.",
            example: "The Sierra Nevada mountains in California formed this way - one side lifted up, creating steep mountain faces"
          },
          {
            number: 5,
            title: "Dome mountains",
            content: "Formed when magma pushes up from below but doesn't break through the surface, creating a dome shape.",
            example: "Black Hills in South Dakota - magma pushed up the rock layers from below"
          },
          {
            number: 6,
            title: "Time and erosion",
            content: "Mountain formation takes millions of years, and erosion by wind, water, and ice constantly shapes them.",
            example: "The Appalachian Mountains are much older and more worn down than the Rocky Mountains"
          }
        ],
        keyPoints: [
          "Mountain formation is driven by plate tectonics",
          "There are several different ways mountains can form",
          "The process takes millions of years",
          "Mountains continue to change due to erosion and weathering",
          "Different types of mountains have different characteristics"
        ]
      };
    }

    // Climate and weather
    if (lowerQuestion.includes('climate') || lowerQuestion.includes('weather') || lowerQuestion.includes('zones')) {
      return {
        steps: [
          {
            number: 1,
            title: "Climate vs. weather - what's the difference?",
            content: "Weather is what's happening right now or day-to-day. Climate is the average weather pattern over many years.",
            example: "Today it's raining (weather), but this area usually has dry summers (climate)"
          },
          {
            number: 2,
            title: "Latitude affects temperature",
            content: "Distance from the equator is the most important factor determining how hot or cold a place is.",
            example: "Equatorial regions (0°) are hot year-round, polar regions (90°) are cold year-round, temperate zones (middle latitudes) have seasons"
          },
          {
            number: 3,
            title: "Ocean currents affect climate",
            content: "Warm and cold ocean currents carry heat around the planet, affecting the climate of nearby land areas.",
            example: "The Gulf Stream keeps Western Europe much warmer than it would be otherwise - London is warmer than cities at the same latitude in Canada"
          },
          {
            number: 4,
            title: "Elevation and mountains matter",
            content: "Higher elevations are cooler, and mountains create different climate zones and rain shadows.",
            example: "Denver is cooler than expected for its latitude due to high elevation. Mountains block rain clouds, creating wet and dry sides"
          },
          {
            number: 5,
            title: "Distance from water",
            content: "Large bodies of water moderate temperature - coastal areas have milder climates than inland areas.",
            example: "San Francisco has cool summers and mild winters, while inland California has hot summers and cold winters"
          },
          {
            number: 6,
            title: "Major climate zones",
            content: "Earth has several major climate zones based on temperature and precipitation patterns.",
            formula: "Tropical (hot, wet), Arid (dry), Temperate (moderate), Continental (hot summers, cold winters), Polar (cold)"
          }
        ],
        keyPoints: [
          "Climate is long-term weather patterns, weather is short-term conditions",
          "Latitude is the most important factor for temperature",
          "Ocean currents, elevation, and distance from water also affect climate",
          "Mountains create rain shadows and different climate zones",
          "Understanding climate helps explain where and how people live"
        ]
      };
    }

    // Water cycle
    if (lowerQuestion.includes('water cycle') || lowerQuestion.includes('evaporation') || lowerQuestion.includes('precipitation')) {
      return {
        steps: [
          {
            number: 1,
            title: "The water cycle is a continuous process",
            content: "Water constantly moves between the oceans, atmosphere, and land in an endless cycle powered by the sun.",
            example: "The same water has been cycling through this process for billions of years!"
          },
          {
            number: 2,
            title: "Evaporation - water becomes vapor",
            content: "The sun heats water in oceans, lakes, and rivers, turning it into invisible water vapor that rises into the atmosphere.",
            example: "Like when you see steam rising from a hot cup of coffee, but most evaporation is invisible"
          },
          {
            number: 3,
            title: "Condensation - vapor becomes droplets",
            content: "As water vapor rises higher, it cools down and condenses into tiny water droplets that form clouds.",
            example: "This is like how your breath fogs up on a cold day - warm water vapor hits cold air and becomes visible droplets"
          },
          {
            number: 4,
            title: "Precipitation - water falls back down",
            content: "When water droplets in clouds get too heavy, they fall as rain, snow, sleet, or hail.",
            example: "Rain in warm weather, snow in cold weather - the type depends on temperature"
          },
          {
            number: 5,
            title: "Collection and runoff",
            content: "Precipitation collects in rivers, lakes, and oceans, or soaks into the ground to become groundwater.",
            example: "Some water flows quickly in streams back to the ocean, some soaks in and moves slowly underground"
          },
          {
            number: 6,
            title: "The cycle continues",
            content: "Water that collected on land evaporates again, and the cycle repeats endlessly.",
            example: "Plants also release water vapor through their leaves (transpiration), adding to evaporation"
          }
        ],
        keyPoints: [
          "The water cycle is powered by energy from the sun",
          "Water changes between liquid, vapor, and solid forms",
          "The same water is recycled over and over",
          "This process distributes fresh water around the planet",
          "Human activities can affect parts of the water cycle"
        ]
      };
    }

    // Population and settlement patterns
    if (lowerQuestion.includes('population') || lowerQuestion.includes('settlement') || lowerQuestion.includes('city') || lowerQuestion.includes('urban') || lowerQuestion.includes('rural')) {
      return {
        steps: [
          {
            number: 1,
            title: "Why people live where they do",
            content: "People settle in places that meet their basic needs: water, food, shelter, and safety.",
            example: "Most early settlements were near rivers (water), fertile land (food), and natural defenses (safety)"
          },
          {
            number: 2,
            title: "Physical factors affect settlement",
            content: "Climate, landforms, water sources, and natural resources influence where people live.",
            example: "Few people live in Antarctica (too cold), the Sahara Desert (too dry), or high mountains (too difficult)"
          },
          {
            number: 3,
            title: "Human factors also matter",
            content: "Economic opportunities, transportation, government policies, and cultural factors affect population distribution.",
            example: "Cities grow where there are jobs, good transportation, and services like schools and hospitals"
          },
          {
            number: 4,
            title: "Population density varies greatly",
            content: "Some areas are very crowded (high density), others are nearly empty (low density).",
            example: "Bangladesh: very high density. Mongolia: very low density. Most people live on a small portion of Earth's land"
          },
          {
            number: 5,
            title: "Urban vs. rural settlement",
            content: "Urban areas (cities) have high population density and economic activities. Rural areas have lower density and often focus on agriculture.",
            example: "More than half the world's people now live in cities - this is a major change from 100 years ago"
          },
          {
            number: 6,
            title: "Migration changes population patterns",
            content: "People move from place to place for better opportunities, safety, or environmental reasons.",
            example: "Rural to urban migration (looking for jobs), international migration (better life), climate refugees (environmental changes)"
          }
        ],
        keyPoints: [
          "People settle where their needs can be met",
          "Both physical and human factors affect where people live",
          "Population is very unevenly distributed around the world",
          "Urbanization is a major trend in modern times",
          "Migration continues to change population patterns"
        ]
      };
    }
  }

  // ECONOMICS SOLUTIONS - Comprehensive coverage
  if (subject === 'economics') {
    
    // Supply and demand
    if (lowerQuestion.includes('supply') && lowerQuestion.includes('demand')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding supply",
            content: "Supply is the amount of a good or service that producers are willing and able to offer at different prices.",
            example: "If pizza prices are high ($20 each), pizza shops will want to make lots of pizzas to earn more money"
          },
          {
            number: 2,
            title: "Understanding demand",
            content: "Demand is the amount of a good or service that consumers are willing and able to buy at different prices.",
            example: "If pizza prices are low ($5 each), more people will want to buy pizza because it's affordable"
          },
          {
            number: 3,
            title: "The law of supply",
            content: "Generally, as prices go up, the quantity supplied goes up. As prices go down, quantity supplied goes down.",
            example: "Higher prices = more profit = producers want to make more. Lower prices = less profit = producers make less"
          },
          {
            number: 4,
            title: "The law of demand",
            content: "Generally, as prices go up, the quantity demanded goes down. As prices go down, quantity demanded goes up.",
            example: "Higher prices = fewer people can afford it. Lower prices = more people can afford it"
          },
          {
            number: 5,
            title: "Market equilibrium",
            content: "The price where the amount supplied equals the amount demanded is called the equilibrium price.",
            formula: "Supply = Demand at equilibrium price",
            example: "If 100 pizzas are supplied and 100 pizzas are demanded at $10 each, then $10 is the equilibrium price"
          },
          {
            number: 6,
            title: "Real-world examples",
            content: "Supply and demand explain price changes in everyday life.",
            example: "Concert tickets cost more for popular artists (high demand, limited supply). Gas prices rise when oil supply is disrupted. Sales happen when stores have too much supply"
          }
        ],
        keyPoints: [
          "Supply and demand are the basic forces in a market economy",
          "Prices rise when demand exceeds supply",
          "Prices fall when supply exceeds demand",
          "Equilibrium is where supply and demand meet",
          "This system helps allocate resources efficiently"
        ]
      };
    }

    // Inflation
    if (lowerQuestion.includes('inflation') || lowerQuestion.includes('prices rising')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is inflation?",
            content: "Inflation is the general increase in prices over time, which reduces the purchasing power of money.",
            example: "If a candy bar cost $1 last year and $1.10 this year, that's 10% inflation - your dollar buys less candy"
          },
          {
            number: 2,
            title: "Demand-pull inflation",
            content: "When demand for goods and services increases faster than supply, prices rise.",
            example: "During the pandemic, demand for bicycles increased but supply couldn't keep up, so bicycle prices rose"
          },
          {
            number: 3,
            title: "Cost-push inflation",
            content: "When the cost of producing goods increases, companies raise prices to maintain profits.",
            example: "If oil prices rise, transportation costs increase, making everything more expensive to produce and deliver"
          },
          {
            number: 4,
            title: "Effects on consumers",
            content: "Inflation means your money buys less than it used to, affecting your standard of living.",
            example: "Your $20 allowance buys fewer items when prices have gone up 5% - you need $21 to buy the same things"
          },
          {
            number: 5,
            title: "Measuring inflation",
            content: "Economists track inflation using price indexes that measure how much a basket of goods costs over time.",
            formula: "Consumer Price Index (CPI) is the most common measure in the US"
          },
          {
            number: 6,
            title: "Managing inflation",
            content: "Governments and central banks use various tools to control inflation.",
            example: "Raising interest rates makes borrowing more expensive, which can slow spending and reduce inflation"
          }
        ],
        keyPoints: [
          "Inflation reduces the purchasing power of money",
          "Some inflation (2-3% per year) is normal in a healthy economy",
          "Too much inflation can hurt consumers and the economy",
          "Inflation can be caused by increased demand or increased costs",
          "Understanding inflation helps with financial planning"
        ]
      };
    }

    // Economic systems
    if (lowerQuestion.includes('capitalism') || lowerQuestion.includes('socialism') || lowerQuestion.includes('economic system') || lowerQuestion.includes('market economy')) {
      return {
        steps: [
          {
            number: 1,
            title: "What are economic systems?",
            content: "Economic systems are the ways societies organize the production, distribution, and consumption of goods and services.",
            example: "Every country must decide: What to produce? How to produce it? Who gets what is produced?"
          },
          {
            number: 2,
            title: "Market economy (Capitalism)",
            content: "In a market economy, private individuals and businesses own resources and make economic decisions based on supply and demand.",
            example: "United States: businesses compete for customers, prices are set by supply and demand, individuals can own property and start businesses"
          },
          {
            number: 3,
            title: "Command economy (Socialism/Communism)",
            content: "In a command economy, the government owns resources and makes most economic decisions.",
            example: "Former Soviet Union: government decided what to produce, set all prices, owned all major businesses and property"
          },
          {
            number: 4,
            title: "Mixed economy",
            content: "Most modern countries have mixed economies that combine elements of market and command systems.",
            example: "Canada, Germany, Japan: mostly market-based but with government regulation, public services, and some government-owned businesses"
          },
          {
            number: 5,
            title: "Advantages and disadvantages",
            content: "Each system has benefits and drawbacks.",
            example: "Market: efficient, innovative, but can have inequality. Command: can ensure basic needs met, but often inefficient. Mixed: tries to get benefits of both"
          },
          {
            number: 6,
            title: "Economic freedom vs. equality",
            content: "Different systems make different trade-offs between economic freedom and economic equality.",
            example: "More market freedom often means more inequality but more innovation. More government control can mean more equality but less efficiency"
          }
        ],
        keyPoints: [
          "All societies must answer the same basic economic questions",
          "Market economies rely on supply and demand",
          "Command economies rely on government planning",
          "Most modern economies are mixed systems",
          "Each system involves trade-offs between efficiency, equality, and freedom"
        ]
      };
    }

    // GDP and economic indicators
    if (lowerQuestion.includes('gdp') || lowerQuestion.includes('gross domestic product') || lowerQuestion.includes('economic growth')) {
      return {
        steps: [
          {
            number: 1,
            title: "What is GDP?",
            content: "Gross Domestic Product (GDP) is the total value of all goods and services produced in a country in one year.",
            example: "If a country produces $1 trillion worth of cars, food, services, etc. in a year, its GDP is $1 trillion"
          },
          {
            number: 2,
            title: "How GDP is calculated",
            content: "GDP can be calculated by adding up all spending in the economy or all income earned.",
            formula: "GDP = Consumption + Investment + Government Spending + (Exports - Imports)"
          },
          {
            number: 3,
            title: "GDP per capita",
            content: "To compare living standards between countries, we divide GDP by population to get GDP per capita.",
            example: "Country A: $2 trillion GDP, 100 million people = $20,000 per capita. Country B: $1 trillion GDP, 25 million people = $40,000 per capita"
          },
          {
            number: 4,
            title: "Real vs. nominal GDP",
            content: "Nominal GDP uses current prices, real GDP adjusts for inflation to show actual growth.",
            example: "If GDP grows 5% but inflation is 3%, real GDP growth is only 2% - the economy actually grew 2%, not 5%"
          },
          {
            number: 5,
            title: "What GDP measures and doesn't measure",
            content: "GDP measures economic activity but doesn't measure everything that affects quality of life.",
            example: "GDP counts: all production, spending. GDP doesn't count: unpaid work (parenting), environmental quality, income distribution, happiness"
          },
          {
            number: 6,
            title: "Using GDP to understand the economy",
            content: "GDP growth indicates economic health, but it's not the only important measure.",
            example: "Growing GDP usually means more jobs and higher incomes, but we also need to look at unemployment, inflation, and inequality"
          }
        ],
        keyPoints: [
          "GDP measures the total economic output of a country",
          "GDP per capita helps compare living standards between countries",
          "Real GDP adjusts for inflation to show true growth",
          "GDP is important but doesn't measure everything about quality of life",
          "Economic health requires looking at multiple indicators, not just GDP"
        ]
      };
    }

    // Opportunity cost
    if (lowerQuestion.includes('opportunity cost') || lowerQuestion.includes('trade-off') || lowerQuestion.includes('scarcity')) {
      return {
        steps: [
          {
            number: 1,
            title: "Understanding scarcity",
            content: "Scarcity means we have unlimited wants but limited resources, so we must make choices.",
            example: "You have $20 and want both a book ($15) and a movie ticket ($12), but you can't afford both"
          },
          {
            number: 2,
            title: "What is opportunity cost?",
            content: "Opportunity cost is the value of the next best alternative that you give up when you make a choice.",
            example: "If you choose the book, your opportunity cost is the movie ticket you didn't buy"
          },
          {
            number: 3,
            title: "Opportunity cost in everyday decisions",
            content: "Every choice has an opportunity cost, even when money isn't involved.",
            example: "Studying for math test vs. watching TV: if you study, opportunity cost is the entertainment you missed. If you watch TV, opportunity cost is the better grade you might have gotten"
          },
          {
            number: 4,
            title: "Time as a resource",
            content: "Time is often our most scarce resource, making time management an economic decision.",
            example: "You have 2 hours: study for test, hang out with friends, or play video games. Whatever you choose, the opportunity cost is the other activities you didn't do"
          },
          {
            number: 5,
            title: "Opportunity cost for businesses and governments",
            content: "Organizations also face opportunity costs when making decisions about how to use their resources.",
            example: "A city spending $1 million on a new park means they can't spend that money on fixing roads - the opportunity cost is the road repairs"
          },
          {
            number: 6,
            title: "Making better decisions",
            content: "Understanding opportunity cost helps you make better choices by considering what you're giving up.",
            example: "Before making a decision, ask: 'What am I giving up?' and 'Is what I'm getting worth more than what I'm giving up?'"
          }
        ],
        keyPoints: [
          "Scarcity forces us to make choices",
          "Opportunity cost is what you give up when you make a choice",
          "Every decision has an opportunity cost",
          "Time is often our most valuable resource",
          "Good decision-making considers opportunity costs"
        ]
      };
    }
  }

  // Enhanced default response with subject-specific guidance
  const subjectSpecificGuidance = {
    mathematics: {
      approach: "identify the type of math problem (arithmetic, algebra, geometry, etc.)",
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

  // Default response for unmatched questions - now more helpful
  return {
    steps: [
      {
        number: 1,
        title: "Understand the question",
        content: `Read the question carefully and ${guidance.approach}.`,
        example: `Question: "${question}"`
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