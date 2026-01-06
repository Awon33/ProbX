export const coinQuestions = [
  // ============ EASY QUESTIONS (15) ============
  {
    id: 1,
    difficulty: 'easy',
    question: "You flip a coin. How many possible outcomes are there?",
    options: ["1 (Only Heads)", "2 (Heads or Tails)", "3 (Heads, Tails, Edge)"],
    correctAnswer: 1,
    hint: "Count the sides of the coin.",
    explanation: "Correct! There are exactly 2 sides: Heads and Tails."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Is it possible to roll a '3' with a coin?",
    options: ["Yes", "No"],
    correctAnswer: 1,
    hint: "Coins only have Heads and Tails.",
    explanation: "Right. Coins don't have numbers like dice do."
  },
  {
    id: 3,
    difficulty: 'easy',
    question: "What is the chance of getting Heads on one flip?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 1,
    hint: "Think about equal probability.",
    explanation: "Correct! Each side has 50% chance."
  },
  {
    id: 4,
    difficulty: 'easy',
    question: "What is the chance of getting Tails on one flip?",
    options: ["50%", "33%", "67%"],
    correctAnswer: 0,
    hint: "Same as Heads!",
    explanation: "Exactly! Tails also has 50% probability."
  },
  {
    id: 5,
    difficulty: 'easy',
    question: "How many sides does a standard coin have?",
    options: ["1", "2", "3"],
    correctAnswer: 1,
    hint: "Think Heads and...",
    explanation: "Correct! Heads side and Tails side."
  },
  {
    id: 6,
    difficulty: 'easy',
    question: "If you flip a coin, it must land on either Heads or...?",
    options: ["Sides", "Tails", "Feet"],
    correctAnswer: 1,
    hint: "The opposite of Heads.",
    explanation: "Yes! The two outcomes are Heads or Tails."
  },
  {
    id: 7,
    difficulty: 'easy',
    question: "What is 50% as a fraction?",
    options: ["1/4", "1/2", "3/4"],
    correctAnswer: 1,
    hint: "Half of something.",
    explanation: "Right! 50% equals 1/2 or one-half."
  },
  {
    id: 8,
    difficulty: 'easy',
    question: "If you flip a coin 10 times, roughly how many Heads would you expect?",
    options: ["Exactly 5", "About 5", "Exactly 10"],
    correctAnswer: 1,
    hint: "Think probability, not certainty.",
    explanation: "Good! On average you'd get about 5, but it could vary."
  },
  {
    id: 9,
    difficulty: 'easy',
    question: "Is a coin flip considered a random event?",
    options: ["Yes", "No", "Sometimes"],
    correctAnswer: 0,
    hint: "We can't predict the exact outcome.",
    explanation: "Correct! Coin flips are random in practice."
  },
  {
    id: 10,
    difficulty: 'easy',
    question: "What shape is most like a coin?",
    options: ["Square", "Circle", "Triangle"],
    correctAnswer: 1,
    hint: "Coins are round.",
    explanation: "Yes! Coins are circular discs."
  },
  {
    id: 11,
    difficulty: 'easy',
    question: "Which has more sides: a coin or a die?",
    options: ["Coin", "Die", "Same"],
    correctAnswer: 1,
    hint: "Dice typically have 6 sides.",
    explanation: "Correct! Dice have 6 sides, coins have 2."
  },
  {
    id: 12,
    difficulty: 'easy',
    question: "What do we call the study of chance?",
    options: ["Biology", "Probability", "Geometry"],
    correctAnswer: 1,
    hint: "P-word.",
    explanation: "Right! Probability is the mathematics of chance."
  },
  {
    id: 13,
    difficulty: 'easy',
    question: "If probability = 0, what does it mean?",
    options: ["Will always happen", "Will never happen", "50% chance"],
    correctAnswer: 1,
    hint: "0 means none.",
    explanation: "Correct! 0 probability means impossible."
  },
  {
    id: 14,
    difficulty: 'easy',
    question: "If probability = 1, what does it mean?",
    options: ["Will never happen", "Will always happen", "50% chance"],
    correctAnswer: 1,
    hint: "1 means all.",
    explanation: "Right! Probability 1 means certain."
  },
  {
    id: 15,
    difficulty: 'easy',
    question: "What is 0.5 as a percentage?",
    options: ["5%", "50%", "500%"],
    correctAnswer: 1,
    hint: "Multiply by 100.",
    explanation: "Correct! 0.5 × 100 = 50%."
  },
  // ============ MEDIUM QUESTIONS (20) ============
  {
    id: 16,
    difficulty: 'medium',
    question: "You just flipped Heads. What is the chance the NEXT flip is Heads?",
    options: ["50% (1/2)", "25% (1/4)", "100%"],
    correctAnswer: 0,
    hint: "Does the coin remember the last flip?",
    explanation: "Correct! The coin has no memory. Every flip is 50/50."
  },
  {
    id: 17,
    difficulty: 'medium',
    question: "Which sequence is more likely?",
    options: ["H-H-H-H", "H-T-H-T", "Both are equally likely"],
    correctAnswer: 2,
    hint: "Since every flip is random, is any specific pattern special?",
    explanation: "Spot on! Any specific pattern has the exact same math behind it."
  },
  {
    id: 18,
    difficulty: 'medium',
    question: "What is the probability of getting Heads then Tails (H-T) in two flips?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 0,
    hint: "First flip: 1/2, second flip: 1/2.",
    explanation: "Correct! 1/2 × 1/2 = 1/4 = 25%."
  },
  {
    id: 19,
    difficulty: 'medium',
    question: "If you flip 2 coins, how many total possible outcomes?",
    options: ["2", "4", "8"],
    correctAnswer: 1,
    hint: "Count all combinations: HH, HT, TH, TT.",
    explanation: "Yes! 2 coins × 2 outcomes each = 4 total."
  },
  {
    id: 20,
    difficulty: 'medium',
    question: "What's the chance of getting at least one Tails in 2 flips?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "Only HH has no Tails.",
    explanation: "Correct! Only 1 out of 4 outcomes (HH) has no Tails."
  },
  {
    id: 21,
    difficulty: 'medium',
    question: "If you get 4 Heads in a row, what's the chance of Tails next?",
    options: ["More than 50%", "Exactly 50%", "Less than 50%"],
    correctAnswer: 1,
    hint: "Past outcomes don't affect future.",
    explanation: "Right! Each flip is independent and 50/50."
  },
  {
    id: 22,
    difficulty: 'medium',
    question: "What is (1/2) × (1/2) × (1/2)?",
    options: ["1/6", "1/8", "1/10"],
    correctAnswer: 1,
    hint: "Multiply fractions: numerator × numerator, denominator × denominator.",
    explanation: "Exactly! 1/2 × 1/2 × 1/2 = 1/8."
  },
  {
    id: 23,
    difficulty: 'medium',
    question: "Three coins are flipped. How many outcomes have exactly 2 Heads?",
    options: ["1", "2", "3"],
    correctAnswer: 2,
    hint: "List them: HHT, HTH, THH.",
    explanation: "Correct! There are 3 ways to get exactly 2 Heads."
  },
  {
    id: 24,
    difficulty: 'medium',
    question: "What's the probability of getting the same result twice in a row?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 1,
    hint: "HH or TT.",
    explanation: "Right! Probability of HH (25%) + TT (25%) = 50%."
  },
  {
    id: 25,
    difficulty: 'medium',
    question: "If P(Heads) = 0.5, what is P(not Heads)?",
    options: ["0.2", "0.5", "0.8"],
    correctAnswer: 1,
    hint: "Total probability must be 1.",
    explanation: "Correct! P(not Heads) = 1 - 0.5 = 0.5."
  },
  {
    id: 26,
    difficulty: 'medium',
    question: "What's the chance of getting Heads on flip 1 AND Tails on flip 2?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 0,
    hint: "Two independent events.",
    explanation: "Yes! 0.5 × 0.5 = 0.25 = 25%."
  },
  {
    id: 27,
    difficulty: 'medium',
    question: "Which is more likely: 2 Heads in 2 flips OR 2 Tails in 2 flips?",
    options: ["2 Heads", "2 Tails", "Equally likely"],
    correctAnswer: 2,
    hint: "Both are specific patterns.",
    explanation: "Correct! Both have probability 1/4."
  },
  {
    id: 28,
    difficulty: 'medium',
    question: "If you flip 3 coins, what's the probability of all same side?",
    options: ["12.5%", "25%", "50%"],
    correctAnswer: 1,
    hint: "HHH or TTT.",
    explanation: "Right! Probability of HHH (1/8) + TTT (1/8) = 2/8 = 25%."
  },
  {
    id: 29,
    difficulty: 'medium',
    question: "What does 'independent events' mean in coin flipping?",
    options: ["Flips affect each other", "Flips don't affect each other", "Always get same result"],
    correctAnswer: 1,
    hint: "No memory.",
    explanation: "Exactly! Previous flips don't influence future ones."
  },
  {
    id: 30,
    difficulty: 'medium',
    question: "The probability of getting at least one Head in 2 flips is:",
    options: ["0.25", "0.50", "0.75"],
    correctAnswer: 2,
    hint: "Only TT has no Heads.",
    explanation: "Correct! 1 - P(TT) = 1 - 0.25 = 0.75."
  },
  {
    id: 31,
    difficulty: 'medium',
    question: "What is 3/8 as a percentage?",
    options: ["37.5%", "50%", "62.5%"],
    correctAnswer: 0,
    hint: "Divide 3 by 8, multiply by 100.",
    explanation: "Yes! 3 ÷ 8 = 0.375 = 37.5%."
  },
  {
    id: 32,
    difficulty: 'medium',
    question: "If you flip until you get Heads, what's the chance it happens on flip 1?",
    options: ["25%", "50%", "100%"],
    correctAnswer: 1,
    hint: "First flip is just P(Heads).",
    explanation: "Correct! First flip has 50% chance of Heads."
  },
  {
    id: 33,
    difficulty: 'medium',
    question: "Which is NOT a possible outcome for 2 coin flips?",
    options: ["HH", "HT", "HHH"],
    correctAnswer: 2,
    hint: "HHH requires 3 flips.",
    explanation: "Right! HHH needs 3 coins/flips."
  },
  {
    id: 34,
    difficulty: 'medium',
    question: "The probability of getting different results on two flips is:",
    options: ["25%", "50%", "75%"],
    correctAnswer: 1,
    hint: "HT or TH.",
    explanation: "Correct! P(HT) = 25% + P(TH) = 25% = 50%."
  },
  {
    id: 35,
    difficulty: 'medium',
    question: "What's the expected number of Heads in 4 flips?",
    options: ["1", "2", "4"],
    correctAnswer: 1,
    hint: "Average = number of flips × P(Heads).",
    explanation: "Exactly! 4 × 0.5 = 2 expected Heads."
  },
  // ============ HARD QUESTIONS (15) ============
  {
    id: 36,
    difficulty: 'hard',
    question: "If you flip a coin 2 times, what is the chance of getting TWO Heads (H-H)?",
    options: ["50% (1/2)", "25% (1/4)", "10% (1/10)"],
    correctAnswer: 1,
    hint: "Flip 1 is 1/2. Flip 2 is 1/2. Multiply them.",
    explanation: "Genius! 1/2 x 1/2 = 1/4. There are 4 outcomes: HH, HT, TH, TT."
  },
  {
    id: 37,
    difficulty: 'hard',
    question: "If probability is 50%, why did we get 7 Heads in 10 flips?",
    options: ["The coin is broken", "Probability predicts long-term, not short-term", "I am just lucky"],
    correctAnswer: 1,
    hint: "Probability works best with huge numbers (like 1,000 flips).",
    explanation: "Exactly. In small games, randomness looks messy. Over time, it evens out."
  },
  {
    id: 38,
    difficulty: 'hard',
    question: "What's the probability of getting exactly 3 Heads in 5 flips?",
    options: ["10/32", "20/32", "31/32"],
    correctAnswer: 0,
    hint: "Use combinations: C(5,3) × (1/2)^5.",
    explanation: "Brilliant! C(5,3) = 10, each outcome has probability (1/2)^5 = 1/32, so 10/32."
  },
  {
    id: 39,
    difficulty: 'hard',
    question: "What is the standard deviation for number of Heads in 100 flips?",
    options: ["2.5", "5", "10"],
    correctAnswer: 1,
    hint: "√(n × p × q) where n=100, p=0.5, q=0.5",
    explanation: "Perfect! √(100 × 0.5 × 0.5) = √25 = 5."
  },
  {
    id: 40,
    difficulty: 'hard',
    question: "What's the probability of getting your first Head on the 3rd flip?",
    options: ["12.5%", "25%", "50%"],
    correctAnswer: 0,
    hint: "T-T-H sequence: (1/2) × (1/2) × (1/2)",
    explanation: "Correct! P(T) × P(T) × P(H) = (1/2)^3 = 1/8 = 12.5%."
  },
  {
    id: 41,
    difficulty: 'hard',
    question: "What is the Law of Large Numbers?",
    options: [
      "Short-term results match probability",
      "Long-term averages approach expected value",
      "All coins are biased"
    ],
    correctAnswer: 1,
    hint: "Think about many trials.",
    explanation: "Exactly! As you flip more, the ratio approaches 50/50."
  },
  {
    id: 42,
    difficulty: 'hard',
    question: "For a fair coin, P(Heads)=0.5. What is the variance for one flip?",
    options: ["0.25", "0.5", "1.0"],
    correctAnswer: 0,
    hint: "Variance = p × q where p=0.5, q=0.5.",
    explanation: "Right! 0.5 × 0.5 = 0.25."
  },
  {
    id: 43,
    difficulty: 'hard',
    question: "What's the probability of getting at least one Head in 3 flips?",
    options: ["7/8", "3/4", "1/2"],
    correctAnswer: 0,
    hint: "1 - P(no Heads) = 1 - P(TTT).",
    explanation: "Correct! 1 - (1/2)^3 = 1 - 1/8 = 7/8."
  },
  {
    id: 44,
    difficulty: 'hard',
    question: "If you flip 10 coins, what's the most likely number of Heads?",
    options: ["5", "6", "0 or 10"],
    correctAnswer: 0,
    hint: "Symmetry and expected value.",
    explanation: "Yes! The binomial distribution peaks at n×p = 10×0.5 = 5."
  },
  {
    id: 45,
    difficulty: 'hard',
    question: "What's the chance of getting Heads 10 times in a row?",
    options: ["1/1024", "1/512", "1/256"],
    correctAnswer: 0,
    hint: "(1/2)^10 = 1/2^10.",
    explanation: "Amazing! (1/2)^10 = 1/1024 ≈ 0.098%."
  },
  {
    id: 46,
    difficulty: 'hard',
    question: "What does 'binomial distribution' describe for coin flips?",
    options: [
      "Probability of getting k Heads in n flips",
      "Only the first flip",
      "Continuous outcomes"
    ],
    correctAnswer: 0,
    hint: "Bi = two outcomes (H/T).",
    explanation: "Correct! It gives P(k successes in n trials) for two outcomes."
  },
  {
    id: 47,
    difficulty: 'hard',
    question: "What is the expected number of flips to get the first Head?",
    options: ["1", "2", "4"],
    correctAnswer: 1,
    hint: "Geometric distribution mean = 1/p.",
    explanation: "Yes! For geometric distribution, expected wait time = 1/p = 1/0.5 = 2."
  },
  {
    id: 48,
    difficulty: 'hard',
    question: "What is the probability of more Heads than Tails in 3 flips?",
    options: ["1/2", "1/4", "3/8"],
    correctAnswer: 0,
    hint: "More Heads means 2 or 3 Heads.",
    explanation: "Right! P(2 Heads) = 3/8 + P(3 Heads) = 1/8 = 4/8 = 1/2."
  },
  {
    id: 49,
    difficulty: 'hard',
    question: "If P(Heads)=0.6 (biased coin), what's P(Tails)?",
    options: ["0.4", "0.5", "0.6"],
    correctAnswer: 0,
    hint: "Probabilities must sum to 1.",
    explanation: "Correct! P(Tails) = 1 - 0.6 = 0.4."
  },
  {
    id: 50,
    difficulty: 'hard',
    question: "Central Limit Theorem says with many flips, the distribution becomes:",
    options: [
      "Uniform",
      "Normal (bell curve)",
      "Exponential"
    ],
    correctAnswer: 1,
    hint: "Think 'bell-shaped'.",
    explanation: "Perfect! The sum of many independent flips approaches a normal distribution."
  }
];
