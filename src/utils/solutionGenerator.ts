import { Step } from '../types/Subject';

export const generateStepByStepSolution = (question: string, subject: string): { steps: Step[], keyPoints: string[] } => {
  const lowerQuestion = question.toLowerCase();
  
  // Mathematics Solutions
  if (subject === 'mathematics') {
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

    // Basic arithmetic operations
    if (lowerQuestion.includes('+') || lowerQuestion.includes('add')) {
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

    if (lowerQuestion.includes('-') || lowerQuestion.includes('subtract')) {
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

    // Solve for x equations
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