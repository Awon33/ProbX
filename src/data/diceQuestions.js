export const diceQuestions = [
  // ============ EASY QUESTIONS (15) ============
  {
    id: 1,
    difficulty: 'easy',
    question: "You roll a standard 6-sided die. What is the chance of getting a '6'?",
    options: ["1 out of 6", "1 out of 2", "50%"],
    correctAnswer: 0,
    hint: "How many faces does the die have?",
    explanation: "Correct! One specific number is always a 1 in 6 chance."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Is it possible to roll a '7' on a single standard die?",
    options: ["Yes", "No", "Maybe"],
    correctAnswer: 1,
    hint: "Look at the numbers on the cube. Do you see a 7?",
    explanation: "Right! The numbers only go from 1 to 6."
  },
  {
    id: 3,
    difficulty: 'easy',
    question: "How many sides does a standard die have?",
    options: ["4", "6", "8"],
    correctAnswer: 1,
    hint: "Think of a regular dice.",
    explanation: "Correct! Standard dice have 6 sides numbered 1-6."
  },
  {
    id: 4,
    difficulty: 'easy',
    question: "What is the highest number on a standard die?",
    options: ["5", "6", "10"],
    correctAnswer: 1,
    hint: "Count from 1 upwards.",
    explanation: "Right! Standard dice go from 1 to 6."
  },
  {
    id: 5,
    difficulty: 'easy',
    question: "What is the lowest number on a standard die?",
    options: ["0", "1", "2"],
    correctAnswer: 1,
    hint: "Counting usually starts at...",
    explanation: "Correct! Dice are numbered starting from 1."
  },
  {
    id: 6,
    difficulty: 'easy',
    question: "How many even numbers are on a die?",
    options: ["2", "3", "4"],
    correctAnswer: 1,
    hint: "Even numbers: 2, 4, 6",
    explanation: "Yes! The even numbers are 2, 4, and 6."
  },
  {
    id: 7,
    difficulty: 'easy',
    question: "How many odd numbers are on a die?",
    options: ["2", "3", "4"],
    correctAnswer: 1,
    hint: "Odd numbers: 1, 3, 5",
    explanation: "Correct! The odd numbers are 1, 3, and 5."
  },
  {
    id: 8,
    difficulty: 'easy',
    question: "What is 1/6 as a percentage?",
    options: ["16.7%", "25%", "50%"],
    correctAnswer: 0,
    hint: "Divide 1 by 6 and multiply by 100.",
    explanation: "Right! 1 ÷ 6 ≈ 0.167 = 16.7%"
  },
  {
    id: 9,
    difficulty: 'easy',
    question: "If you roll 10 times, roughly how many sixes would you expect?",
    options: ["About 2", "Exactly 2", "About 1.7"],
    correctAnswer: 2,
    hint: "10 × (1/6) = ?",
    explanation: "Good! 10 × 1/6 ≈ 1.67, so about 1 or 2 sixes."
  },
  {
    id: 10,
    difficulty: 'easy',
    question: "Which number has the best chance of appearing?",
    options: ["1", "6", "All equal"],
    correctAnswer: 2,
    hint: "Think about fairness.",
    explanation: "Correct! On a fair die, all numbers have equal probability."
  },
  {
    id: 11,
    difficulty: 'easy',
    question: "What shape is most like a die?",
    options: ["Sphere", "Cube", "Pyramid"],
    correctAnswer: 1,
    hint: "Think of square faces.",
    explanation: "Yes! Dice are cubes with 6 square faces."
  },
  {
    id: 12,
    difficulty: 'easy',
    question: "Can a die land on an edge?",
    options: ["Yes", "No", "Sometimes"],
    correctAnswer: 1,
    hint: "Dice are designed to land flat.",
    explanation: "Correct! In normal rolls, dice land on one of their faces."
  },
  {
    id: 13,
    difficulty: 'easy',
    question: "What is probability of rolling a 1?",
    options: ["1/6", "1/2", "1/3"],
    correctAnswer: 0,
    hint: "One specific face out of 6.",
    explanation: "Right! One specific number has probability 1/6."
  },
  {
    id: 14,
    difficulty: 'easy',
    question: "If probability is 0, what does it mean for dice?",
    options: ["Always happens", "Never happens", "50% chance"],
    correctAnswer: 1,
    hint: "0 means impossible.",
    explanation: "Correct! Probability 0 means impossible (like rolling 7)."
  },
  {
    id: 15,
    difficulty: 'easy',
    question: "What numbers are next to 5 on most dice?",
    options: ["1 & 6", "2 & 4", "3 & 4"],
    correctAnswer: 0,
    hint: "Standard dice have opposite sides that sum to 7.",
    explanation: "Yes! On standard dice, 5 is opposite 2, so it's adjacent to 1 and 6."
  },
  // ============ MEDIUM QUESTIONS (20) ============
  {
    id: 16,
    difficulty: 'medium',
    question: "Which result is MORE likely?",
    options: ["Rolling a 1", "Rolling a 6", "Both are equally likely"],
    correctAnswer: 2,
    hint: "Are the faces different sizes? No.",
    explanation: "Correct! Unless the die is weighted, every number has the same probability."
  },
  {
    id: 17,
    difficulty: 'medium',
    question: "You rolled a '4' three times in a row! What is likely to happen next?",
    options: ["A '4' again", "Anything but a '4'", "It is still random (1 in 6)"],
    correctAnswer: 2,
    hint: "The die does not have a brain or memory.",
    explanation: "Excellent. Previous rolls do not change the probability of the next roll."
  },
  {
    id: 18,
    difficulty: 'medium',
    question: "What is probability of rolling a number greater than 4?",
    options: ["1/6", "1/3", "1/2"],
    correctAnswer: 1,
    hint: "Numbers greater than 4: 5 and 6.",
    explanation: "Right! 5 and 6 are two numbers, so 2/6 = 1/3."
  },
  {
    id: 19,
    difficulty: 'medium',
    question: "What is probability of rolling a number less than 3?",
    options: ["1/6", "1/3", "1/2"],
    correctAnswer: 1,
    hint: "Numbers less than 3: 1 and 2.",
    explanation: "Correct! 1 and 2 are two numbers, so 2/6 = 1/3."
  },
  {
    id: 20,
    difficulty: 'medium',
    question: "If you roll two dice, what is the total number of possible outcomes?",
    options: ["12", "36", "6"],
    correctAnswer: 1,
    hint: "6 possibilities for first die × 6 for second die.",
    explanation: "Yes! 6 × 6 = 36 different outcomes."
  },
  {
    id: 21,
    difficulty: 'medium',
    question: "What is probability of rolling a prime number (2, 3, 5)?",
    options: ["1/2", "1/3", "2/3"],
    correctAnswer: 0,
    hint: "Prime numbers on dice: 2, 3, 5.",
    explanation: "Correct! 3 primes out of 6 numbers = 3/6 = 1/2."
  },
  {
    id: 21,
    difficulty: 'medium',
    question: "What is probability of NOT rolling a 6?",
    options: ["1/6", "5/6", "1/2"],
    correctAnswer: 1,
    hint: "Probability of not A = 1 - probability of A.",
    explanation: "Right! 1 - 1/6 = 5/6."
  },
  {
    id: 22,
    difficulty: 'medium',
    question: "If you roll until you get a 6, what's the chance it happens on first roll?",
    options: ["1/6", "1/2", "5/6"],
    correctAnswer: 0,
    hint: "First roll is just P(6).",
    explanation: "Correct! First roll has 1/6 chance of being a 6."
  },
  {
    id: 23,
    difficulty: 'medium',
    question: "What's the probability of rolling the same number twice in a row?",
    options: ["1/36", "1/6", "1/12"],
    correctAnswer: 1,
    hint: "First roll: any number. Second roll: must match that specific number.",
    explanation: "Yes! 1 × 1/6 = 1/6."
  },
  {
    id: 24,
    difficulty: 'medium',
    question: "Which is more likely: rolling a 3 OR rolling a 4?",
    options: ["3", "4", "Equally likely"],
    correctAnswer: 2,
    hint: "Both are single numbers.",
    explanation: "Correct! Both have probability 1/6."
  },
  {
    id: 25,
    difficulty: 'medium',
    question: "What's the chance of rolling an even number AND greater than 3?",
    options: ["1/6", "1/3", "1/2"],
    correctAnswer: 1,
    hint: "Even numbers > 3: 4 and 6.",
    explanation: "Right! Two numbers out of 6 = 2/6 = 1/3."
  },
  {
    id: 26,
    difficulty: 'medium',
    question: "What is the expected average of one die roll?",
    options: ["3", "3.5", "4"],
    correctAnswer: 1,
    hint: "Average of 1, 2, 3, 4, 5, 6.",
    explanation: "Correct! (1+2+3+4+5+6)/6 = 21/6 = 3.5"
  },
  {
    id: 27,
    difficulty: 'medium',
    question: "What's probability of rolling a number divisible by 3?",
    options: ["1/6", "1/3", "1/2"],
    correctAnswer: 1,
    hint: "Numbers divisible by 3: 3 and 6.",
    explanation: "Right! 2 numbers out of 6 = 2/6 = 1/3."
  },
  {
    id: 28,
    difficulty: 'medium',
    question: "If P(rolling 5)=1/6, what is P(not rolling 5)?",
    options: ["1/6", "5/6", "1"],
    correctAnswer: 1,
    hint: "Total probability is 1.",
    explanation: "Correct! 1 - 1/6 = 5/6."
  },
  {
    id: 29,
    difficulty: 'medium',
    question: "What's the chance of rolling a number between 2 and 5 inclusive?",
    options: ["1/3", "2/3", "1/2"],
    correctAnswer: 1,
    hint: "Between 2-5: 2, 3, 4, 5.",
    explanation: "Yes! 4 numbers out of 6 = 4/6 = 2/3."
  },
  {
    id: 30,
    difficulty: 'medium',
    question: "Which is NOT a possible outcome for two dice?",
    options: ["Total of 7", "Total of 1", "Total of 11"],
    correctAnswer: 1,
    hint: "Minimum total with two dice is 2.",
    explanation: "Right! Minimum is 1+1=2, maximum is 6+6=12."
  },
  {
    id: 31,
    difficulty: 'medium',
    question: "What is 2/3 as a percentage?",
    options: ["33.3%", "66.7%", "75%"],
    correctAnswer: 1,
    hint: "Divide 2 by 3, multiply by 100.",
    explanation: "Correct! 2 ÷ 3 ≈ 0.667 = 66.7%"
  },
  {
    id: 32,
    difficulty: 'medium',
    question: "What's the most common total when rolling two dice?",
    options: ["6", "7", "8"],
    correctAnswer: 1,
    hint: "7 has the most combinations.",
    explanation: "Yes! 7 has 6 different ways to make it (1+6, 2+5, 3+4, 4+3, 5+2, 6+1)."
  },
  {
    id: 33,
    difficulty: 'medium',
    question: "What's probability of rolling at least 5?",
    options: ["1/6", "1/3", "1/2"],
    correctAnswer: 1,
    hint: "At least 5 means 5 or 6.",
    explanation: "Right! 2 numbers out of 6 = 2/6 = 1/3."
  },
  {
    id: 34,
    difficulty: 'medium',
    question: "If you roll 100 dice, roughly how many would show even numbers?",
    options: ["About 33", "About 50", "About 67"],
    correctAnswer: 1,
    hint: "Half the numbers are even.",
    explanation: "Correct! About 50% of rolls should be even numbers."
  },
  {
    id: 35,
    difficulty: 'medium',
    question: "What's the probability of rolling different numbers on two consecutive rolls?",
    options: ["1/6", "5/6", "1/3"],
    correctAnswer: 1,
    hint: "1 - P(same number).",
    explanation: "Yes! 1 - 1/6 = 5/6."
  },
  // ============ HARD QUESTIONS (15) ============
  {
    id: 36,
    difficulty: 'hard',
    question: "What are the chances of rolling an EVEN number (2, 4, 6)?",
    options: ["1 out of 6", "3 out of 6 (50%)", "2 out of 6"],
    correctAnswer: 1,
    hint: "Count the even numbers: 2, 4, 6. That is 3 numbers total.",
    explanation: "Correct! 3 even numbers out of 6 total faces = 3/6, which simplifies to 50%."
  },
  {
    id: 37,
    difficulty: 'hard',
    question: "If you roll two dice, getting a total of 12 (6+6) is...",
    options: ["Very likely", "Impossible", "Very unlikely (1 in 36)"],
    correctAnswer: 2,
    hint: "You need specific numbers on BOTH dice at the same time.",
    explanation: "Right! You need a 6 on die #1 AND a 6 on die #2. That is hard to do!"
  },
  {
    id: 38,
    difficulty: 'hard',
    question: "What's the probability of rolling exactly 3 sixes in 5 rolls?",
    options: ["~3.2%", "~10.0%", "~16.1%"],
    correctAnswer: 0,
    hint: "Binomial probability: C(5,3) × (1/6)³ × (5/6)²",
    explanation: "Perfect! C(5,3)=10, (1/6)³×(5/6)²≈0.0032, so 10×0.0032=0.032=3.2%"
  },
  {
    id: 39,
    difficulty: 'hard',
    question: "What is the standard deviation for number of sixes in 60 rolls?",
    options: ["√10 ≈ 3.16", "5", "10"],
    correctAnswer: 0,
    hint: "√(n×p×q) where n=60, p=1/6, q=5/6",
    explanation: "Exactly! √(60 × 1/6 × 5/6) = √(50/6) = √8.33 ≈ 2.89"
  },
  {
    id: 40,
    difficulty: 'hard',
    question: "What's the probability of getting your first 6 on the 4th roll?",
    options: ["~9.6%", "~11.6%", "~15.4%"],
    correctAnswer: 1,
    hint: "Geometric distribution: (5/6)³ × (1/6)",
    explanation: "Correct! (5/6)³ × (1/6) = 125/216 × 1/6 ≈ 0.116 = 11.6%"
  },
  {
    id: 41,
    difficulty: 'hard',
    question: "What is the expected number of rolls to get your first 6?",
    options: ["3", "6", "12"],
    correctAnswer: 1,
    hint: "Geometric distribution mean = 1/p.",
    explanation: "Yes! Expected wait time = 1/(1/6) = 6 rolls."
  },
  {
    id: 42,
    difficulty: 'hard',
    question: "What's the probability of rolling at least one 6 in 4 rolls?",
    options: ["~51.8%", "~66.5%", "~80.2%"],
    correctAnswer: 0,
    hint: "1 - P(no 6 in 4 rolls) = 1 - (5/6)⁴",
    explanation: "Right! 1 - (5/6)⁴ = 1 - 0.482 = 0.518 = 51.8%"
  },
  {
    id: 43,
    difficulty: 'hard',
    question: "What is the variance for one die roll?",
    options: ["35/12 ≈ 2.92", "3.5", "6"],
    correctAnswer: 0,
    hint: "Variance = E(X²) - [E(X)]²",
    explanation: "Perfect! E(X)=3.5, E(X²)=91/6=15.17, variance=15.17-12.25=2.92"
  },
  {
    id: 44,
    difficulty: 'hard',
    question: "What's the probability of rolling a total of 7 with two dice?",
    options: ["1/6", "1/12", "1/36"],
    correctAnswer: 0,
    hint: "There are 6 ways to make 7 out of 36 total outcomes.",
    explanation: "Correct! 6/36 = 1/6 ≈ 16.67%"
  },
  {
    id: 45,
    difficulty: 'hard',
    question: "What's the chance of rolling a total of 2 with two dice?",
    options: ["1/6", "1/18", "1/36"],
    correctAnswer: 2,
    hint: "Only one way: 1+1.",
    explanation: "Exactly! Only 1 outcome out of 36 gives total 2."
  },
  {
    id: 46,
    difficulty: 'hard',
    question: "What is the probability distribution of two dice sums called?",
    options: [
      "Triangular distribution",
      "Normal distribution",
      "Uniform distribution"
    ],
    correctAnswer: 0,
    hint: "The sum frequencies form a triangle shape.",
    explanation: "Correct! The probability mass function forms a symmetric triangle."
  },
  {
    id: 47,
    difficulty: 'hard',
    question: "What's the probability of rolling doubles with two dice?",
    options: ["1/6", "1/12", "1/36"],
    correctAnswer: 0,
    hint: "There are 6 possible doubles out of 36 outcomes.",
    explanation: "Yes! 6/36 = 1/6"
  },
  {
    id: 48,
    difficulty: 'hard',
    question: "What is the expected sum of two dice?",
    options: ["6", "7", "8"],
    correctAnswer: 1,
    hint: "E(one die)=3.5, so E(two dice)=7",
    explanation: "Right! 2 × 3.5 = 7"
  },
  {
    id: 49,
    difficulty: 'hard',
    question: "If a die is biased with P(6)=0.3, what's P(not 6)?",
    options: ["0.3", "0.5", "0.7"],
    correctAnswer: 2,
    hint: "Probabilities must sum to 1.",
    explanation: "Correct! 1 - 0.3 = 0.7"
  },
  {
    id: 50,
    difficulty: 'hard',
    question: "Central Limit Theorem: With many dice rolls, the average approaches:",
    options: ["3", "3.5", "4"],
    correctAnswer: 1,
    hint: "Law of Large Numbers says sample mean → population mean.",
    explanation: "Perfect! The average of many rolls approaches the expected value of 3.5."
  }
];
