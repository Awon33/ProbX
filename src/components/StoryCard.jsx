import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock } from 'lucide-react';

const stories = {
  coin: {
    title: 'A Fair Settlement',
    story: 'Amara and Jake both want the last slice of pizza. They decide the fairest way to settle it is by flipping a coin — Amara picks Heads, Jake picks Tails. Is this really fair? What are each of their chances of winning?',
    question: 'Is a coin flip truly a fair way to decide?',
    emoji: '🍕',
    themeFrom: 'from-blue-600',
    themeTo: 'to-cyan-500',
    answer: 'Yes! Each side has exactly a 50% chance — it\'s perfectly fair!',
  },
  dice: {
    title: 'The Ludo Challenge',
    story: 'In Ludo, you can only enter your token onto the board if you roll exactly a 6. Your friend has been waiting 5 turns already and still hasn\'t rolled a 6. They\'re frustrated. Is it really that hard? How likely are you to roll a 6 on any given turn?',
    question: 'How hard is it to roll a 6?',
    emoji: '🎮',
    themeFrom: 'from-purple-600',
    themeTo: 'to-pink-500',
    answer: 'Only 1 in 6 chance (~16.7%). Going 5 turns without a 6 is totally normal!',
  },
  spinner: {
    title: 'The Game Show Dilemma',
    story: 'You\'re on a game show! A spinner has 4 equal sections — Red, Blue, Yellow, and Green. Only the Green section wins the jackpot. The host spins and it lands on Blue. "Green has to come soon!" shouts a contestant. Are they right?',
    question: 'Is Green "due" after landing on Blue?',
    emoji: '🎰',
    themeFrom: 'from-green-600',
    themeTo: 'to-teal-500',
    answer: 'No! Each spin is independent. Green still has exactly a 25% chance next spin!',
  },
};

const StoryCard = ({ gameType, onComplete }) => {
  const story = stories[gameType];
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' }}>

      {/* Background emoji pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[...Array(16)].map((_, i) => (
          <span key={i}
            className="absolute text-5xl opacity-5"
            style={{
              left: `${(i % 4) * 26 + 3}%`,
              top: `${Math.floor(i / 4) * 26 + 3}%`,
            }}>
            {story.emoji}
          </span>
        ))}
      </div>

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${story.themeFrom} ${story.themeTo} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={20} className="opacity-80" />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-80">Scenario Story</span>
          </div>
          <div className="text-4xl mb-2">{story.emoji}</div>
          <h2 className="text-xl font-bold">{story.title}</h2>
        </div>

        <div className="p-6">
          {/* Story text */}
          <div className="mb-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-base text-gray-800 leading-relaxed">{story.story}</p>
          </div>

          {/* Question */}
          <div className={`mb-5 p-4 bg-gradient-to-r ${story.themeFrom.replace('from-', 'from-').replace('600', '50')} rounded-2xl border`}
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <p className="text-sm font-bold text-gray-700 mb-1">🤔 Think about it:</p>
            <p className="text-base font-semibold text-gray-900">{story.question}</p>
          </div>

          {/* Reveal answer */}
          {!revealed ? (
            <>
              <button
                onClick={() => setRevealed(true)}
                className="w-full py-3 mb-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                💡 Reveal the answer
              </button>
              <button
                onClick={onComplete}
                className={`w-full py-4 bg-gradient-to-r ${story.themeFrom} ${story.themeTo} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg`}
              >
                Let's find out by playing!
                <ChevronRight size={22} />
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 p-4 bg-green-50 rounded-2xl border border-green-200 flex items-start gap-3">
                <span className="text-xl">✅</span>
                <p className="text-sm text-green-800 font-medium">{story.answer}</p>
              </div>
              <button
                onClick={onComplete}
                className={`w-full py-4 bg-gradient-to-r ${story.themeFrom} ${story.themeTo} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg`}
              >
                Now let's experience it!
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
