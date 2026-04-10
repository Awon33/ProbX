import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, BarChart2, Eye, Sparkles } from 'lucide-react';

const COIN_RESULTS = ['heads', 'tails'];
const DICE_RESULTS = [1, 2, 3, 4, 5, 6];
const SPINNER_COLORS = ['Red', 'Blue', 'Yellow', 'Green'];

const configs = {
  coin: {
    title: 'Watch Probability in Action',
    subtitle: 'Coin Toss',
    themeFrom: 'from-blue-600',
    themeTo: 'to-purple-600',
    bgFrom: 'from-blue-50',
    bgTo: 'to-purple-50',
    accent: 'blue',
    narration: [
      "Watch the coin flip automatically 10 times...",
      "Notice how it's not always exactly 50/50?",
      "That's completely normal — randomness is unpredictable!",
      "But as we flip MORE times, it gets closer to 50/50.",
      "This is called the Law of Large Numbers. Now you'll feel it!",
    ],
  },
  dice: {
    title: 'Watch Probability in Action',
    subtitle: 'Dice Roll',
    themeFrom: 'from-purple-600',
    themeTo: 'to-blue-600',
    bgFrom: 'from-purple-50',
    bgTo: 'to-blue-50',
    accent: 'purple',
    narration: [
      "Watch the dice roll automatically 10 times...",
      "Each face (1–6) has an equal 1/6 chance.",
      "Notice how the distribution looks uneven with few rolls?",
      "The more we roll, the closer each number gets to ~16.7%.",
      "Let's explore this together in the real game!",
    ],
  },
  spinner: {
    title: 'Watch Probability in Action',
    subtitle: 'Color Spinner',
    themeFrom: 'from-green-600',
    themeTo: 'to-blue-600',
    bgFrom: 'from-green-50',
    bgTo: 'to-emerald-50',
    accent: 'green',
    narration: [
      "Watch the spinner spin 10 times automatically...",
      "Each color section is exactly 1/4 of the wheel.",
      "That means each has a 25% chance every spin.",
      "But look — they won't always be perfectly equal!",
      "That's the beauty of probability. Let's play!",
    ],
  },
};

const CoinFace = ({ side, size = 64 }) => (
  <div
    className="rounded-full flex items-center justify-center font-black shadow-lg border-4"
    style={{
      width: size, height: size,
      background: side === 'heads'
        ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
        : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
      borderColor: side === 'heads' ? '#d97706' : '#6b7280',
      color: side === 'heads' ? '#78350f' : '#374151',
      fontSize: size * 0.22,
    }}
  >
    {side === 'heads' ? 'H' : 'T'}
  </div>
);

const DieFace = ({ value, size = 64 }) => {
  const dots = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
  };
  const dotSize = size * 0.16;
  return (
    <div
      className="rounded-xl bg-white shadow-lg border-2 border-purple-300 relative"
      style={{ width: size, height: size }}
    >
      {(dots[value] || []).map(([x, y], i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-700"
          style={{
            width: dotSize, height: dotSize,
            left: `${x}%`, top: `${y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

const SpinnerFace = ({ color, size = 64 }) => {
  const colors = { Red: '#ef4444', Blue: '#3b82f6', Yellow: '#f59e0b', Green: '#22c55e' };
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shadow-lg border-4 border-white"
      style={{ width: size, height: size, background: colors[color] || '#6b7280', fontSize: size * 0.18 }}
    >
      {color?.[0] || '?'}
    </div>
  );
};

const BarChart = ({ data, gameType }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;

  const entries = gameType === 'coin'
    ? [
        { label: 'Heads', value: data.heads || 0, color: '#f59e0b', bg: 'bg-amber-400' },
        { label: 'Tails', value: data.tails || 0, color: '#6b7280', bg: 'bg-gray-400' },
      ]
    : gameType === 'dice'
    ? [1, 2, 3, 4, 5, 6].map((n, i) => ({
        label: String(n),
        value: data[n] || 0,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#3b82f6'][i],
        bg: ['bg-indigo-400', 'bg-violet-400', 'bg-pink-400', 'bg-amber-400', 'bg-green-400', 'bg-blue-400'][i],
      }))
    : [
        { label: 'Red', value: data.Red || 0, color: '#ef4444', bg: 'bg-red-400' },
        { label: 'Blue', value: data.Blue || 0, color: '#3b82f6', bg: 'bg-blue-400' },
        { label: 'Yellow', value: data.Yellow || 0, color: '#f59e0b', bg: 'bg-amber-400' },
        { label: 'Green', value: data.Green || 0, color: '#22c55e', bg: 'bg-green-400' },
      ];

  return (
    <div className="space-y-2">
      {entries.map((e) => (
        <div key={e.label} className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-600 w-10 text-right">{e.label}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700`}
              style={{ width: `${(e.value / total) * 100}%`, background: e.color }}
            />
          </div>
          <span className="text-xs font-bold text-gray-700 w-8">{e.value}</span>
          <span className="text-xs text-gray-400 w-10">
            {((e.value / total) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
};

const ConceptDemo = ({ gameType, onComplete }) => {
  const cfg = configs[gameType];
  const [results, setResults] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [data, setData] = useState(() => {
    if (gameType === 'coin') return { heads: 0, tails: 0 };
    if (gameType === 'dice') return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    return { Red: 0, Blue: 0, Yellow: 0, Green: 0 };
  });
  const [narrationIdx, setNarrationIdx] = useState(0);
  const [demoComplete, setDemoComplete] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [started, setStarted] = useState(false);
  const countRef = useRef(0);
  const TOTAL = 10;

  const getRandom = () => {
    if (gameType === 'coin') return Math.random() > 0.5 ? 'heads' : 'tails';
    if (gameType === 'dice') return Math.floor(Math.random() * 6) + 1;
    return SPINNER_COLORS[Math.floor(Math.random() * 4)];
  };

  const runDemo = () => {
    setStarted(true);
    const interval = setInterval(() => {
      if (countRef.current >= TOTAL) {
        clearInterval(interval);
        setDemoComplete(true);
        return;
      }
      const r = getRandom();
      countRef.current += 1;
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
      setCurrentResult(r);
      setResults(prev => [...prev, r]);
      setData(prev => {
        const key = gameType === 'dice' ? r : r;
        return { ...prev, [key]: (prev[key] || 0) + 1 };
      });
      // Advance narration
      const step = Math.floor((countRef.current / TOTAL) * cfg.narration.length);
      setNarrationIdx(Math.min(step, cfg.narration.length - 1));
    }, 900);
  };

  const renderCurrent = () => {
    if (!currentResult) return null;
    const size = 72;
    if (gameType === 'coin') return <CoinFace side={currentResult} size={size} />;
    if (gameType === 'dice') return <DieFace value={currentResult} size={size} />;
    return <SpinnerFace color={currentResult} size={size} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)' }}>

      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white opacity-20 animate-pulse"
            style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }} />
        ))}
      </div>

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${cfg.themeFrom} ${cfg.themeTo} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-1">
            <Eye size={20} className="opacity-80" />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-80">Concept Demo</span>
          </div>
          <h2 className="text-2xl font-bold">{cfg.title}</h2>
          <p className="text-sm opacity-75 mt-1">{cfg.subtitle} — {TOTAL} auto-plays</p>
        </div>

        <div className="p-6">
          {/* Narration box */}
          <div className="mb-5 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 min-h-[60px] flex items-center">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-800 font-medium leading-relaxed">
                {started ? cfg.narration[narrationIdx] : '👀 Watch the demo to build intuition before you play!'}
              </p>
            </div>
          </div>

          {/* Current result display */}
          <div className="flex flex-col items-center mb-5">
            <div className={`transition-all duration-200 ${animating ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}>
              {currentResult ? renderCurrent() : (
                <div className="w-[72px] h-[72px] rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Play size={24} className="text-gray-300" />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {started ? `Flip ${Math.min(countRef.current, TOTAL)} of ${TOTAL}` : 'Press Start to begin demo'}
            </p>

            {/* Mini result trail */}
            <div className="flex gap-1 mt-3 flex-wrap justify-center max-w-xs">
              {results.map((r, i) => (
                <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{
                    background: gameType === 'coin' ? (r === 'heads' ? '#f59e0b' : '#9ca3af')
                      : gameType === 'dice' ? ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#22c55e','#3b82f6'][r - 1]
                      : { Red: '#ef4444', Blue: '#3b82f6', Yellow: '#f59e0b', Green: '#22c55e' }[r]
                  }}>
                  {gameType === 'coin' ? r[0].toUpperCase() : gameType === 'dice' ? r : r[0]}
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          {started && (
            <div className="mb-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 size={16} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Live Distribution</span>
              </div>
              <BarChart data={data} gameType={gameType} />
            </div>
          )}

          {/* CTA buttons */}
          {!started ? (
            <button onClick={runDemo}
              className={`w-full py-4 bg-gradient-to-r ${cfg.themeFrom} ${cfg.themeTo} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg`}>
              <Play size={22} />
              Start Demo
            </button>
          ) : !demoComplete ? (
            <div className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl flex items-center justify-center gap-3 text-base">
              <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full" />
              Demo in progress... ({Math.min(countRef.current, TOTAL)}/{TOTAL})
            </div>
          ) : (
            <button onClick={onComplete}
              className={`w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg`}>
              <span>✅ I understand, let's play!</span>
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptDemo;
