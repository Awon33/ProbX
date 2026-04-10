import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Lightbulb } from 'lucide-react';

const configs = {
  coin: {
    question: 'If you flip a coin 10 times, how many HEADS do you think you\'ll get?',
    options: [
      { label: '2 heads', value: 2 },
      { label: '5 heads', value: 5 },
      { label: '8 heads', value: 8 },
      { label: '10 heads', value: 10 },
    ],
    hint: 'Each flip is 50/50, but randomness is unpredictable in the short term!',
    themeFrom: 'from-blue-600',
    themeTo: 'to-purple-600',
    emoji: '🪙',
  },
  dice: {
    question: 'If you roll a dice 10 times, how many times do you think you\'ll roll a 6?',
    options: [
      { label: '0 times', value: 0 },
      { label: '1–2 times', value: 1.5 },
      { label: '3–4 times', value: 3.5 },
      { label: '5+ times', value: 5 },
    ],
    hint: 'The theoretical chance of rolling a 6 is 1 in 6, or about 16.7%!',
    themeFrom: 'from-purple-600',
    themeTo: 'to-blue-600',
    emoji: '🎲',
  },
  spinner: {
    question: 'If you spin 10 times, how many times do you think Green will appear?',
    options: [
      { label: '0–1 times', value: 0.5 },
      { label: '2–3 times', value: 2.5 },
      { label: '4–5 times', value: 4.5 },
      { label: '6+ times', value: 6 },
    ],
    hint: 'Green is 1 of 4 equal sections, so theoretically it shows up 25% of the time.',
    themeFrom: 'from-green-600',
    themeTo: 'to-blue-600',
    emoji: '🎡',
  },
};

const PredictionChallenge = ({ gameType, onComplete }) => {
  const cfg = configs[gameType];
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    setTimeout(() => onComplete(selected), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.1,
            }}>
            {cfg.emoji}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${cfg.themeFrom} ${cfg.themeTo} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-1">
            <HelpCircle size={20} className="opacity-80" />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-80">What Would You Guess?</span>
          </div>
          <div className="text-4xl mb-2">{cfg.emoji}</div>
          <h2 className="text-lg font-bold leading-snug">{cfg.question}</h2>
        </div>

        <div className="p-6">
          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {cfg.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                className={`py-4 px-3 rounded-2xl font-bold text-base border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  selected === i
                    ? `bg-gradient-to-r ${cfg.themeFrom} ${cfg.themeTo} text-white border-transparent shadow-lg scale-105`
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="mb-5 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
            <Lightbulb size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">{cfg.hint}</p>
          </div>

          {/* Confirm button */}
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                selected !== null
                  ? `bg-gradient-to-r ${cfg.themeFrom} ${cfg.themeTo} text-white hover:shadow-xl transform hover:scale-[1.02]`
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Lock In My Prediction
              <ChevronRight size={22} />
            </button>
          ) : (
            <div className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-lg">
              <span className="text-xl">🎯</span>
              Prediction locked! Let's see how right you are!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionChallenge;
