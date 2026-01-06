export const spinnerQuestions = [
  // ============ EASY QUESTIONS (15) ============
  {
    id: 1,
    difficulty: 'easy',
    question: "This spinner has 4 equal sections. What is the chance of Red?",
    options: ["25% (1 in 4)", "50% (1 in 2)", "10%"],
    correctAnswer: 0,
    hint: "It is one color out of four total.",
    explanation: "Correct! 1/4 is 25%."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "If you spin 100 times, will you get Red exactly 25 times?",
    options: ["Yes, exactly", "Roughly 25, but not exactly"],
    correctAnswer: 1,
    hint: "Is probability exact or an estimate?",
    explanation: "Right. It is an average. You might get 24 or 26."
  },
  {
    id: 3,
    difficulty: 'easy',
    question: "How many colors are on this spinner?",
    options: ["3", "4", "5"],
    correctAnswer: 1,
    hint: "Count the sections: Red, Blue, Yellow, Green.",
    explanation: "Correct! There are 4 different colors."
  },
  {
    id: 4,
    difficulty: 'easy',
    question: "What fraction represents 25%?",
    options: ["1/2", "1/4", "1/3"],
    correctAnswer: 1,
    hint: "25% means one quarter.",
    explanation: "Right! 25% = 1/4 = one quarter."
  },
  {
    id: 5,
    difficulty: 'easy',
    question: "What is the probability of landing on Blue?",
    options: ["20%", "25%", "33%"],
    correctAnswer: 1,
    hint: "Each section has equal chance.",
    explanation: "Correct! Blue is one of four equal sections."
  },
  {
    id: 6,
    difficulty: 'easy',
    question: "If you spin once, what are the possible outcomes?",
    options: ["Only Red", "Red or Blue", "Red, Blue, Yellow, or Green"],
    correctAnswer: 2,
    hint: "Look at all the colors.",
    explanation: "Exactly! The spinner can land on any of the 4 colors."
  },
  {
    id: 7,
    difficulty: 'easy',
    question: "What is 1 out of 4 as a percentage?",
    options: ["10%", "25%", "40%"],
    correctAnswer: 1,
    hint: "1 divided by 4 = 0.25",
    explanation: "Right! 1/4 = 0.25 = 25%"
  },
  {
    id: 8,
    difficulty: 'easy',
    question: "Which color has the highest probability?",
    options: ["Red", "Green", "All equal"],
    correctAnswer: 2,
    hint: "Are all sections the same size?",
    explanation: "Correct! All sections are equal size, so equal probability."
  },
  {
    id: 9,
    difficulty: 'easy',
    question: "What is the probability of NOT landing on Yellow?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "Three colors are not Yellow.",
    explanation: "Yes! 3 out of 4 sections are not Yellow = 75%."
  },
  {
    id: 10,
    difficulty: 'easy',
    question: "How many degrees is each section?",
    options: ["45°", "90°", "180°"],
    correctAnswer: 1,
    hint: "Full circle = 360°, divided by 4 sections.",
    explanation: "Correct! 360° ÷ 4 = 90° per section."
  },
  {
    id: 11,
    difficulty: 'easy',
    question: "What shape is the spinner?",
    options: ["Square", "Circle", "Triangle"],
    correctAnswer: 1,
    hint: "Spinners are usually round.",
    explanation: "Right! Spinners are circular."
  },
  {
    id: 12,
    difficulty: 'easy',
    question: "Can the spinner land between two colors?",
    options: ["Yes", "No", "Sometimes"],
    correctAnswer: 1,
    hint: "Spinners land in specific sections.",
    explanation: "Correct! It lands in one section at a time."
  },
  {
    id: 13,
    difficulty: 'easy',
    question: "What is probability 0 for this spinner?",
    options: ["Getting Red", "Getting Purple", "Getting Blue or Green"],
    correctAnswer: 1,
    hint: "Look at the colors available.",
    explanation: "Right! Purple isn't on the spinner, so probability is 0."
  },
  {
    id: 14,
    difficulty: 'easy',
    question: "What is probability 1 for this spinner?",
    options: [
      "Getting Red or Blue or Yellow or Green",
      "Getting Red",
      "Getting Red and Blue"
    ],
    correctAnswer: 0,
    hint: "Probability 1 means certain.",
    explanation: "Exactly! It's certain to land on one of the four colors."
  },
  {
    id: 15,
    difficulty: 'easy',
    question: "If you spin 8 times, about how many Reds would you expect?",
    options: ["Exactly 2", "About 2", "Exactly 8"],
    correctAnswer: 1,
    hint: "8 × 25% = ?",
    explanation: "Good! 8 × 0.25 = 2, so about 2 Reds expected."
  },
  // ============ MEDIUM QUESTIONS (20) ============
  {
    id: 16,
    difficulty: 'medium',
    question: "You just landed on Red 3 times. What is likely next?",
    options: ["Blue", "Red", "All colors are equally likely"],
    correctAnswer: 2,
    hint: "The spinner doesn't know what happened before.",
    explanation: "Correct! Previous spins don't change the odds."
  },
  {
    id: 17,
    difficulty: 'medium',
    question: "What is the chance of NOT getting Red?",
    options: ["25% (1 in 4)", "75% (3 in 4)", "50%"],
    correctAnswer: 1,
    hint: "Count the sections that are NOT Red (Blue, Yellow, Green).",
    explanation: "Exactly! There are 3 non-red sections, so 3 out of 4 (75%)."
  },
  {
    id: 18,
    difficulty: 'medium',
    question: "What is the probability of getting Red OR Blue?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 1,
    hint: "Red = 1/4, Blue = 1/4, total = ?",
    explanation: "Correct! P(Red) + P(Blue) = 1/4 + 1/4 = 1/2 = 50%."
  },
  {
    id: 19,
    difficulty: 'medium',
    question: "What is the chance of getting Red AND Blue on the same spin?",
    options: ["0%", "25%", "50%"],
    correctAnswer: 0,
    hint: "Can it land on two colors at once?",
    explanation: "Right! Impossible to land on two colors simultaneously."
  },
  {
    id: 20,
    difficulty: 'medium',
    question: "If P(Red)=25%, what is P(not Red)?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "Total probability must be 100%.",
    explanation: "Correct! 100% - 25% = 75%."
  },
  {
    id: 21,
    difficulty: 'medium',
    question: "What's the probability of getting a primary color (Red, Blue, Yellow)?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "Three colors out of four.",
    explanation: "Yes! 3 out of 4 = 3/4 = 75%."
  },
  {
    id: 22,
    difficulty: 'medium',
    question: "What's the chance of getting Green or Yellow?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 1,
    hint: "Two colors out of four.",
    explanation: "Right! 2 out of 4 = 2/4 = 1/2 = 50%."
  },
  {
    id: 23,
    difficulty: 'medium',
    question: "Which combination has 50% probability?",
    options: [
      "Red or Blue",
      "Red only",
      "Green only"
    ],
    correctAnswer: 0,
    hint: "Two colors out of four = 50%.",
    explanation: "Correct! Red or Blue = 2/4 = 50%."
  },
  {
    id: 24,
    difficulty: 'medium',
    question: "What is 3/4 as a percentage?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "Divide 3 by 4, multiply by 100.",
    explanation: "Right! 3 ÷ 4 = 0.75 = 75%."
  },
  {
    id: 25,
    difficulty: 'medium',
    question: "If you spin twice, what's the chance of different colors each time?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 2,
    hint: "1 - P(same color twice).",
    explanation: "Correct! 1 - 1/4 = 3/4 = 75%."
  },
  {
    id: 26,
    difficulty: 'medium',
    question: "What's the expected number of Reds in 20 spins?",
    options: ["5", "10", "15"],
    correctAnswer: 0,
    hint: "20 × 25% = ?",
    explanation: "Yes! 20 × 0.25 = 5 expected Reds."
  },
  {
    id: 27,
    difficulty: 'medium',
    question: "Which event has probability 0?",
    options: [
      "Landing on Blue",
      "Landing on Orange",
      "Landing on Green twice in a row"
    ],
    correctAnswer: 1,
    hint: "Orange isn't on the spinner.",
    explanation: "Correct! Orange isn't an option."
  },
  {
    id: 28,
    difficulty: 'medium',
    question: "What is the probability of NOT getting Blue AND NOT getting Yellow?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 0,
    hint: "That leaves only Red and Green.",
    explanation: "Right! Red or Green = 2/4 = 1/2 = 50%."
  },
  {
    id: 29,
    difficulty: 'medium',
    question: "If you spin until you get Green, what's the chance it's first spin?",
    options: ["25%", "50%", "75%"],
    correctAnswer: 0,
    hint: "First spin probability = P(Green).",
    explanation: "Correct! P(Green) = 25% on first spin."
  },
  {
    id: 30,
    difficulty: 'medium',
    question: "What's the probability of getting same color twice in a row?",
    options: ["25%", "6.25%", "50%"],
    correctAnswer: 0,
    hint: "First spin: any color. Second: must match (25%).",
    explanation: "Yes! 1 × 1/4 = 25%."
  },
  {
    id: 31,
    difficulty: 'medium',
    question: "Which is more likely: Red then Blue OR Blue then Red?",
    options: ["Red then Blue", "Blue then Red", "Equally likely"],
    correctAnswer: 2,
    hint: "Both are specific sequences.",
    explanation: "Correct! Both have probability (1/4) × (1/4) = 1/16."
  },
  {
    id: 32,
    difficulty: 'medium',
    question: "What's the chance of getting at least one Red in 2 spins?",
    options: ["43.75%", "50%", "56.25%"],
    correctAnswer: 0,
    hint: "1 - P(no Red in 2 spins) = 1 - (3/4)²",
    explanation: "Right! 1 - (0.75)² = 1 - 0.5625 = 0.4375 = 43.75%."
  },
  {
    id: 33,
    difficulty: 'medium',
    question: "If spinner had 8 equal sections, what would be P(Red)?",
    options: ["12.5%", "25%", "50%"],
    correctAnswer: 0,
    hint: "1 out of 8 sections.",
    explanation: "Correct! 1/8 = 12.5%."
  },
  {
    id: 34,
    difficulty: 'medium',
    question: "What's the probability distribution for one spin?",
    options: [
      "Uniform (all equal)",
      "Normal (bell curve)",
      "Exponential"
    ],
    correctAnswer: 0,
    hint: "All outcomes have same probability.",
    explanation: "Yes! Uniform distribution - all outcomes equally likely."
  },
  {
    id: 35,
    difficulty: 'medium',
    question: "If you spin 100 times, about how many would be Blue or Green?",
    options: ["About 25", "About 50", "About 75"],
    correctAnswer: 1,
    hint: "Blue or Green = 2/4 = 50%.",
    explanation: "Correct! 100 × 50% = about 50."
  },
  // ============ HARD QUESTIONS (15) ============
  {
    id: 36,
    difficulty: 'hard',
    question: "If you spin twice, what is the chance of getting Red BOTH times?",
    options: ["1/4 (25%)", "1/8", "1/16 (about 6%)"],
    correctAnswer: 2,
    hint: "Multiply the chances: 1/4 x 1/4.",
    explanation: "Genius! 1/4 times 1/4 equals 1/16."
  },
  {
    id: 37,
    difficulty: 'hard',
    question: "Which event is impossible on this spinner?",
    options: ["Landing on Green", "Landing on Purple", "Landing on Red twice"],
    correctAnswer: 1,
    hint: "Look at the colors on the wheel.",
    explanation: "Correct! There is no Purple section."
  },
  {
    id: 38,
    difficulty: 'hard',
    question: "What's the probability of getting Red THEN Blue THEN Green?",
    options: ["1/64", "1/32", "1/16"],
    correctAnswer: 0,
    hint: "(1/4) × (1/4) × (1/4) = ?",
    explanation: "Perfect! (1/4)³ = 1/64 ≈ 1.56%."
  },
  {
    id: 39,
    difficulty: 'hard',
    question: "What's the probability of getting exactly 2 Reds in 3 spins?",
    options: ["~14.1%", "~28.1%", "~42.2%"],
    correctAnswer: 0,
    hint: "Binomial: C(3,2) × (1/4)² × (3/4)¹",
    explanation: "Exactly! C(3,2)=3, (1/4)²=1/16, (3/4)=3/4, product=3×1/16×3/4=9/64≈14.1%"
  },
  {
    id: 40,
    difficulty: 'hard',
    question: "What's the expected number of spins to get first Blue?",
    options: ["2", "4", "8"],
    correctAnswer: 1,
    hint: "Geometric distribution mean = 1/p.",
    explanation: "Right! Expected wait time = 1/(1/4) = 4 spins."
  },
  {
    id: 41,
    difficulty: 'hard',
    question: "What is the standard deviation for number of Reds in 16 spins?",
    options: ["√3 ≈ 1.73", "2", "3"],
    correctAnswer: 0,
    hint: "√(n×p×q) where n=16, p=1/4, q=3/4",
    explanation: "Correct! √(16 × 1/4 × 3/4) = √(3) ≈ 1.73"
  },
  {
    id: 42,
    difficulty: 'hard',
    question: "What's the probability of getting at least one Red in 4 spins?",
    options: ["~68.4%", "~75.0%", "~82.0%"],
    correctAnswer: 0,
    hint: "1 - P(no Red in 4 spins) = 1 - (3/4)⁴",
    explanation: "Yes! 1 - (0.75)⁴ = 1 - 0.316 = 0.684 = 68.4%"
  },
  {
    id: 43,
    difficulty: 'hard',
    question: "What's the probability of all different colors in 4 spins?",
    options: ["~9.4%", "~23.4%", "~46.9%"],
    correctAnswer: 0,
    hint: "4!/(4⁴) = 24/256",
    explanation: "Perfect! 24/256 = 3/32 ≈ 0.09375 = 9.375%"
  },
  {
    id: 44,
    difficulty: 'hard',
    question: "What is the variance for one spin (Red=1, others=0)?",
    options: ["3/16 = 0.1875", "1/4 = 0.25", "1/2 = 0.5"],
    correctAnswer: 0,
    hint: "Bernoulli variance = p×q = (1/4)×(3/4)",
    explanation: "Right! 0.25 × 0.75 = 0.1875"
  },
  {
    id: 45,
    difficulty: 'hard',
    question: "What's the probability of getting more Reds than Blues in 3 spins?",
    options: ["~15.2%", "~25.0%", "~36.3%"],
    correctAnswer: 0,
    hint: "Count outcomes: 2R0B, 2R1B, 3R0B",
    explanation: "Correct! Need to count specific binomial outcomes."
  },
  {
    id: 46,
    difficulty: 'hard',
    question: "If spinner was biased: P(Red)=40%, others 20% each, what's P(not Red)?",
    options: ["40%", "60%", "80%"],
    correctAnswer: 1,
    hint: "100% - 40% = ?",
    explanation: "Yes! 100% - 40% = 60%"
  },
  {
    id: 47,
    difficulty: 'hard',
    question: "What's the probability of getting sequence R-G-B in that order?",
    options: ["1/64", "1/32", "1/24"],
    correctAnswer: 0,
    hint: "Specific sequence: (1/4) × (1/4) × (1/4)",
    explanation: "Right! (1/4)³ = 1/64"
  },
  {
    id: 48,
    difficulty: 'hard',
    question: "What's the expected number of different colors in 10 spins?",
    options: ["~2.5", "~3.0", "~3.5"],
    correctAnswer: 1,
    hint: "Complex calculation involving coupon collector problem.",
    explanation: "For 4 colors, expected different colors ≈ 3.0 in 10 spins."
  },
  {
    id: 49,
    difficulty: 'hard',
    question: "If you spin until you get all 4 colors, expected spins?",
    options: ["~8.33", "~12.5", "~25.0"],
    correctAnswer: 0,
    hint: "Coupon collector: 4 × (1 + 1/2 + 1/3 + 1/4)",
    explanation: "Exactly! 4 × (1 + 1/2 + 1/3 + 1/4) = 4 × 25/12 ≈ 8.33"
  },
  {
    id: 50,
    difficulty: 'hard',
    question: "Central Limit Theorem: With many spins, Red count approaches:",
    options: [
      "Normal distribution",
      "Uniform distribution",
      "Exponential distribution"
    ],
    correctAnswer: 0,
    hint: "Sum of independent trials → normal.",
    explanation: "Perfect! Number of Reds approaches normal distribution."
  }
];
