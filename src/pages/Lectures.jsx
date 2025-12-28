import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, Zap, Clock, Brain, ChevronRight, Sparkles, Menu, X, Calculator, PieChart, TrendingUp, BarChart3, Scale, Hash } from 'lucide-react';

const Lectures = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const lectures = [
        {
            id: 1,
            title: 'Probability: The Basics',
            shortContent: 'Probability is a number between 0 and 1 that shows how likely an event is to occur. 0 means impossible, 1 means certain, and 0.5 means equally likely.',
            theory: 'Mathematically: P(E) = 0 (impossible event) to P(E) = 1 (certain event). For example, the probability of the sun rising tomorrow is close to 1.',
            duration: '3 min read',
            icon: BookOpen,
            gradient: 'from-blue-500 to-cyan-400',
            concepts: ['0 to 1 scale', 'Impossible vs Certain', 'Numerical measure']
        },
        {
            id: 2,
            title: 'Coin Toss Mathematics',
            shortContent: 'A fair coin has exactly 1/2 chance for heads and 1/2 for tails. Each toss is independent.',
            theory: 'Sample Space S = {Heads, Tails} → n(S) = 2. For Heads: n(E) = 1. So P(Heads) = n(E)/n(S) = 1/2 = 0.5 = 50%.',
            duration: '3 min read',
            icon: Target,
            gradient: 'from-purple-500 to-pink-400',
            concepts: ['Sample Space', 'Independent events', '50% probability']
        },
        {
            id: 3,
            title: 'Dice Roll Theory',
            shortContent: 'Standard die has 6 faces. Each number (1-6) has equal probability of 1/6.',
            theory: 'S = {1,2,3,4,5,6}, n(S)=6. P(rolling 3) = 1/6 ≈ 0.167 = 16.7%. Expected value = (1+2+3+4+5+6)/6 = 3.5.',
            duration: '4 min read',
            icon: Hash,
            gradient: 'from-green-500 to-emerald-400',
            concepts: ['6 outcomes', 'Equal probability', 'Expected value = 3.5']
        },
        {
            id: 4,
            title: 'Spinner Probability',
            shortContent: '4-color spinner: each color has 1/4 chance. Visual representation helps understand equal sections.',
            theory: 'If spinner divided into 4 equal sections: P(Red) = 1/4 = 0.25 = 25%. For n equal sections: P = 1/n.',
            duration: '3 min read',
            icon: PieChart,
            gradient: 'from-amber-500 to-orange-400',
            concepts: ['Equal sections', 'Visual probability', '25% per section']
        },
        {
            id: 5,
            title: 'Basic Probability Formula',
            shortContent: 'Probability = (Favorable outcomes) ÷ (Total possible outcomes)',
            theory: 'P(E) = n(E)/n(S) where n(E) = number of favorable outcomes, n(S) = total outcomes in sample space.',
            duration: '4 min read',
            icon: Calculator,
            gradient: 'from-red-500 to-rose-400',
            concepts: ['P = n(E)/n(S)', 'Favorable outcomes', 'Sample space']
        },
        {
            id: 6,
            title: 'Real World Applications',
            shortContent: 'Used in weather forecasts (30% rain), games (card probabilities), and sports analytics.',
            theory: 'Weather: P(rain) = 0.3 means 30% chance. Cards: P(Ace of Spades) = 1/52 ≈ 0.0192 = 1.92%.',
            duration: '3 min read',
            icon: TrendingUp,
            gradient: 'from-indigo-500 to-violet-400',
            concepts: ['Weather forecasting', 'Game theory', 'Sports analytics']
        },
        {
            id: 7,
            title: 'Independent Events',
            shortContent: 'Two events are independent if one does not affect the other. Example: Coin tosses.',
            theory: 'Events A and B are independent if P(A∩B) = P(A) × P(B). For coin: P(H and then H) = 0.5 × 0.5 = 0.25.',
            duration: '4 min read',
            icon: Scale,
            gradient: 'from-blue-600 to-purple-500',
            concepts: ['Multiplication rule', 'No influence', 'Separate probabilities']
        },
        {
            id: 8,
            title: 'Probability Scale',
            shortContent: 'Probability values and their meaning: 0, 0.25, 0.5, 0.75, 1 represent different likelihoods.',
            theory: '0 → Impossible, 0.25 → Unlikely, 0.5 → Even chance, 0.75 → Likely, 1 → Certain. All probabilities fall between 0 and 1.',
            duration: '3 min read',
            icon: BarChart3,
            gradient: 'from-teal-500 to-cyan-400',
            concepts: ['Probability scale', 'Likelihood levels', '0 to 1 range']
        },
        {
            id: 9,
            title: 'The Law of Large Numbers',
            shortContent: 'More trials = results closer to theoretical probability. Example: More coin flips → closer to 50/50.',
            theory: 'As number of trials → ∞, experimental probability → theoretical probability. 1000 flips ≈ 500H, 500T.',
            duration: '4 min read',
            icon: Brain,
            gradient: 'from-orange-500 to-red-400',
            concepts: ['More trials', 'Convergence', 'Experimental vs theoretical']
        },
        {
            id: 10,
            title: 'Complementary Events',
            shortContent: 'Probability of event NOT happening = 1 - Probability of it happening.',
            theory: 'P(not E) = 1 - P(E). Example: P(not rolling 1 on die) = 1 - 1/6 = 5/6 ≈ 0.833.',
            duration: '3 min read',
            icon: Calculator,
            gradient: 'from-violet-500 to-purple-400',
            concepts: ['1 - P(E)', 'Opposite events', 'Complement rule']
        },
        {
            id: 11,
            title: 'Simple Probability Examples',
            shortContent: 'Drawing cards: 4/52 for an Ace. Rolling dice: 3/6 for even number.',
            theory: 'Cards: P(Ace) = 4/52 = 1/13 ≈ 0.077. Dice: P(even) = 3/6 = 1/2 = 0.5.',
            duration: '3 min read',
            icon: BookOpen,
            gradient: 'from-emerald-500 to-green-400',
            concepts: ['Card probabilities', 'Dice combinations', 'Simple calculations']
        },
        {
            id: 12,
            title: 'Understanding Percentages',
            shortContent: 'Probability can be expressed as percentage: 0.5 = 50%, 0.25 = 25%, 0.75 = 75%.',
            theory: 'Convert decimal to percentage: Multiply by 100. P = 0.3 → 0.3 × 100 = 30%. Percentage to decimal: Divide by 100.',
            duration: '2 min read',
            icon: PieChart,
            gradient: 'from-pink-500 to-rose-400',
            concepts: ['Decimal to %', '% to decimal', 'Conversion formula']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 flex flex-col">
            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-gray-900">Menu</h3>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <X size={24} />
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/menu')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
                        >
                            <ArrowLeft size={20} />
                            Back to Menu
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
                            >
                                <Menu size={24} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Desktop Back Button - Left side */}
                        <div className="hidden lg:block">
                            <button
                                onClick={() => navigate('/menu')}
                                className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
                            >
                                <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Back to Menu</span>
                            </button>
                        </div>

                        {/* Logo & Title - Centered */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                            <div className="text-left">
                                <span className="text-xl lg:text-2xl font-bold text-gray-900">
                                    <span className="text-indigo-600">Theory Guide</span>
                                </span>
                                <p className="text-xs text-gray-500 hidden lg:block">Clear explanations with theory & examples</p>
                            </div>
                        </div>

                        {/* Mobile Spacer - Right side for mobile menu */}
                        <div className="lg:hidden">
                            <div className="w-12"></div> {/* Spacer to balance with menu button on left */}
                        </div>

                        {/* Desktop Empty Spacer - Right side */}
                        <div className="hidden lg:block w-40"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                {/* Hero Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-full border border-indigo-100">
                        <Sparkles size={16} className="text-indigo-500" />
                        <span className="text-sm font-medium text-indigo-600">Complete Theory Guide</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                        Master Probability
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 block">
                            Theory & Concepts
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Each card contains a complete lesson with simple explanation, mathematical theory,
                        and key concepts. Read through all 12 topics to build strong foundation.
                    </p>
                </div>

                {/* Lectures Grid */}
                <div className="mb-8 lg:mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {lectures.map((lecture) => {
                            const Icon = lecture.icon;
                            return (
                                <div
                                    key={lecture.id}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 relative overflow-hidden h-full flex flex-col">
                                        {/* Background gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${lecture.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                        {/* Colored accent bar */}
                                        <div className={`h-2 bg-gradient-to-r ${lecture.gradient}`}></div>

                                        <div className="relative z-10 flex-grow flex flex-col p-5 sm:p-6">
                                            {/* Header with icon */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${lecture.gradient} shadow-sm`}>
                                                    <Icon size={22} className="text-white" />
                                                </div>

                                                <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                                                    <Clock size={12} />
                                                    <span>{lecture.duration}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                                {lecture.title}
                                            </h3>

                                            {/* Simple Explanation */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    <p className="text-xs font-medium text-gray-500">Simple Explanation</p>
                                                </div>
                                                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        {lecture.shortContent}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mathematical Theory */}
                                            <div className="mb-4 flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                    <p className="text-xs font-medium text-gray-500">Mathematical Theory</p>
                                                </div>
                                                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                                        {lecture.theory}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Concepts */}
                                            <div className="mt-auto">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    <p className="text-xs font-medium text-gray-500">Key Concepts</p>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {lecture.concepts.map((concept, idx) => (
                                                        <span key={idx} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                                            {concept}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-100">
                    <div className="text-center">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                                <div className="text-lg font-bold text-blue-600">0 to 1</div>
                                <p className="text-xs text-gray-600">Probability Scale</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                                <div className="text-lg font-bold text-purple-600">P = n(E)/n(S)</div>
                                <p className="text-xs text-gray-600">Basic Formula</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                                <div className="text-lg font-bold text-green-600">50%</div>
                                <p className="text-xs text-gray-600">Coin Flip</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                                <div className="text-lg font-bold text-amber-600">1/6</div>
                                <p className="text-xs text-gray-600">Dice Roll</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            You now understand the fundamental concepts of probability!
                            These basics apply to all probability calculations and real-world scenarios.
                        </p>

                        <button
                            onClick={() => navigate('/menu')}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 transition-all duration-300"
                        >
                            <span>Practice in Games</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-8 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">Prob<span className="text-indigo-600">X</span> Theory Guide</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Comprehensive probability theory for beginners to intermediate learners.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Lectures;