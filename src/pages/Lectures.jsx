import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, Zap, Clock, Brain, ChevronRight, ChevronLeft, Sparkles, Menu, X, Calculator, PieChart, TrendingUp, BarChart3, Scale, Hash, Check, Play, Lightbulb } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// Visual Slide Animations (SVG/CSS-based diagrams per lecture)
// ──────────────────────────────────────────────────────────────────────────────
const VisualSlide = ({ lectureId }) => {
  const visuals = {
    1: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Probability Scale: 0 to 1</p>
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0</span><span>0.25</span><span>0.5</span><span>0.75</span><span>1</span>
          </div>
          <div className="h-6 rounded-full bg-gradient-to-r from-red-400 via-amber-400 via-green-400 to-blue-500 relative shadow-inner">
            <div className="absolute top-full mt-1 w-full flex justify-between text-[10px] text-gray-500">
              <span>Impossible</span><span>Unlikely</span><span>Even</span><span>Likely</span><span>Certain</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          {[{emoji:'🌞',label:'Sun rising',p:'≈1'},{ emoji:'🎲',label:'Roll a 3',p:'1/6'},{emoji:'🪙',label:'Heads',p:'1/2'}].map(i=>(
            <div key={i.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="text-2xl">{i.emoji}</div>
              <p className="text-xs text-gray-600 mt-1">{i.label}</p>
              <p className="text-sm font-bold text-indigo-600">{i.p}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    2: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Coin flip — Sample Space</p>
        <div className="flex gap-6 justify-center">
          {['Heads','Tails'].map(s=>(
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl border-4 shadow-lg ${s==='Heads' ? 'bg-amber-300 border-amber-500 text-amber-900' : 'bg-gray-300 border-gray-500 text-gray-700'}`}>{s[0]}</div>
              <p className="text-sm font-semibold text-gray-700">{s}</p>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">P = 1/2 = 50%</div>
            </div>
          ))}
        </div>
        <div className="mt-2 p-3 bg-indigo-50 rounded-xl text-sm text-indigo-800 text-center">
          n(S) = 2 outcomes &nbsp;|&nbsp; P(Heads) = 1/2
        </div>
      </div>
    ),
    3: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">6-sided Die Distribution</p>
        <div className="flex gap-2">
          {[1,2,3,4,5,6].map(n=>(
            <div key={n} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center font-bold text-purple-700 shadow">{n}</div>
              <div className="text-[10px] text-gray-500">1/6</div>
            </div>
          ))}
        </div>
        <div className="mt-2 p-3 bg-purple-50 rounded-xl text-sm text-purple-800 text-center">
          Each face has exactly <strong>16.7%</strong> chance<br/>Expected value: <strong>3.5</strong>
        </div>
      </div>
    ),
    4: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">4-Section Equal Spinner</p>
        <svg viewBox="0 0 120 120" width="140" height="140">
          <circle cx="60" cy="60" r="55" fill="#f3f4f6"/>
          <path d="M60,60 L60,5 A55,55 0 0,1 115,60 Z" fill="#ef4444"/>
          <path d="M60,60 L115,60 A55,55 0 0,1 60,115 Z" fill="#3b82f6"/>
          <path d="M60,60 L60,115 A55,55 0 0,1 5,60 Z" fill="#f59e0b"/>
          <path d="M60,60 L5,60 A55,55 0 0,1 60,5 Z" fill="#22c55e"/>
          <circle cx="60" cy="60" r="6" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
          <text x="80" y="35" fontSize="9" fill="white" fontWeight="bold">Red</text>
          <text x="80" y="85" fontSize="9" fill="white" fontWeight="bold">Blue</text>
          <text x="22" y="85" fontSize="9" fill="white" fontWeight="bold">Yellow</text>
          <text x="22" y="35" fontSize="9" fill="white" fontWeight="bold">Green</text>
        </svg>
        <div className="p-3 bg-amber-50 rounded-xl text-sm text-amber-800 text-center">Each color: <strong>1/4 = 25%</strong> chance per spin</div>
      </div>
    ),
    5: (
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl font-black text-indigo-700 font-mono bg-indigo-50 px-6 py-3 rounded-2xl border-2 border-indigo-200">
          P(E) = n(E) / n(S)
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-xl text-center"><p className="text-xs text-gray-500">n(E)</p><p className="font-bold text-blue-700">Favorable outcomes</p></div>
          <div className="bg-green-50 p-3 rounded-xl text-center"><p className="text-xs text-gray-500">n(S)</p><p className="font-bold text-green-700">Total outcomes</p></div>
        </div>
        <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-xl w-full">
          Example: P(even on dice) = <strong>3/6 = 0.5 = 50%</strong>
        </div>
      </div>
    ),
    6: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">Real-World Probability</p>
        {[{emoji:'🌧️',label:'30% rain forecast',p:'P = 0.3'},{ emoji:'🃏',label:'Ace of Spades',p:'P = 1/52 ≈ 1.9%'},{emoji:'⚽',label:'Penalty kick goal',p:'P ≈ 0.75'}].map(i=>(
          <div key={i.label} className="flex items-center gap-3 w-full bg-white p-3 rounded-xl border border-gray-100">
            <span className="text-2xl">{i.emoji}</span>
            <div className="flex-1"><p className="text-sm font-medium text-gray-800">{i.label}</p></div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{i.p}</span>
          </div>
        ))}
      </div>
    ),
    7: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Independent Events — Multiplication Rule</p>
        <div className="flex items-center gap-3 text-2xl">
          <div className="bg-amber-100 rounded-xl p-3 font-mono font-bold text-amber-700">1/2</div>
          <span className="text-gray-500 font-bold">×</span>
          <div className="bg-amber-100 rounded-xl p-3 font-mono font-bold text-amber-700">1/2</div>
          <span className="text-gray-500 font-bold">=</span>
          <div className="bg-green-100 rounded-xl p-3 font-mono font-bold text-green-700">1/4</div>
        </div>
        <p className="text-xs text-gray-600 text-center">P(Heads then Heads) = 0.5 × 0.5 = 0.25</p>
        <div className="p-3 bg-blue-50 rounded-xl text-sm text-blue-800 text-center w-full">
          Key insight: Previous results don't affect future flips!
        </div>
      </div>
    ),
    8: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">Visual Probability Scale</p>
        {[{v:'0',label:'Impossible',emoji:'❌',color:'bg-red-100 text-red-700'},{v:'0.25',label:'Unlikely',emoji:'😟',color:'bg-orange-100 text-orange-700'},{v:'0.5',label:'Even chance',emoji:'🤷',color:'bg-amber-100 text-amber-700'},{v:'0.75',label:'Likely',emoji:'😊',color:'bg-lime-100 text-lime-700'},{v:'1',label:'Certain',emoji:'✅',color:'bg-green-100 text-green-700'}].map(i=>(
          <div key={i.v} className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl ${i.color}`}>
            <span>{i.emoji}</span><span className="font-mono font-bold w-10">{i.v}</span><span className="text-sm">{i.label}</span>
          </div>
        ))}
      </div>
    ),
    9: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Law of Large Numbers in Action</p>
        {[{n:'5',h:'60%',label:'5 flips'},{n:'50',h:'54%',label:'50 flips'},{n:'500',h:'51%',label:'500 flips'},{n:'5000',h:'50.1%',label:'5000 flips'}].map(i=>(
          <div key={i.n} className="w-full">
            <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{i.label}</span><span>Heads: {i.h}</span></div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{width:i.h}}/>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-500 text-center">→ Results converge to 50% with more flips</p>
      </div>
    ),
    10: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Complement Rule: P(not E) = 1 - P(E)</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-green-400 flex items-center justify-center bg-green-50">
              <span className="text-sm font-bold text-green-700">Rolling 1<br/>P=1/6</span>
            </div>
            <p className="text-xs mt-1 text-green-700">Event E</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-red-400 flex items-center justify-center bg-red-50">
              <span className="text-sm font-bold text-red-700">NOT 1<br/>P=5/6</span>
            </div>
            <p className="text-xs mt-1 text-red-700">Not E</p>
          </div>
        </div>
        <p className="text-sm text-center text-gray-600">1/6 + 5/6 = <strong>1</strong> (always!)</p>
      </div>
    ),
    11: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-600">Simple Probability Examples</p>
        {[{q:'P(Ace from deck)',a:'4/52 = 1/13 ≈ 7.7%'},{q:'P(even number on die)',a:'3/6 = 1/2 = 50%'},{q:'P(Red on spinner)',a:'1/4 = 25%'}].map(i=>(
          <div key={i.q} className="w-full bg-white p-3 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{i.q}</p>
            <p className="text-sm font-bold text-indigo-700">{i.a}</p>
          </div>
        ))}
      </div>
    ),
    12: (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-600">Convert: Decimal ↔ Percentage</p>
        <div className="grid grid-cols-2 gap-3 w-full">
          {[{d:'0.25',p:'25%'},{ d:'0.5',p:'50%'},{d:'0.75',p:'75%'},{d:'1.0',p:'100%'}].map(i=>(
            <div key={i.d} className="bg-white border rounded-xl p-3 flex items-center justify-between">
              <span className="font-mono font-bold text-gray-700">{i.d}</span>
              <ChevronRight size={14} className="text-gray-400"/>
              <span className="font-bold text-indigo-700">{i.p}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">Multiply decimal by 100 to get percentage</p>
      </div>
    ),
  };
  return <div className="p-4">{visuals[lectureId] || <p className="text-gray-400 text-center">Visual for lecture {lectureId}</p>}</div>;
};

// ──────────────────────────────────────────────────────────────────────────────
// TryIt Slide — interactive mini-activity
// ──────────────────────────────────────────────────────────────────────────────
const TryItSlide = ({ lectureId }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const activities = {
    1: { q: 'What is the probability of an impossible event?', opts: ['0','0.5','1','2'], correct: 0, explanation: 'An impossible event has probability 0 — it can never happen!' },
    2: { q: 'A coin lands Tails 3 times in a row. What is P(Heads) next flip?', opts: ['75% — Heads is due!','50% — always','25% — unlikely now','0% — it only does tails'], correct: 1, explanation: 'Coin flips are independent. Previous flips don\'t change future probabilities — it\'s always 50%!' },
    3: { q: 'What is P(rolling a 6) on a standard die?', opts: ['1/3','1/4','1/6','1/2'], correct: 2, explanation: 'A die has 6 equal faces. Only one face shows 6, so P(6) = 1/6 ≈ 16.7%' },
    4: { q: 'If the spinner has 4 equal sections, what is P(Green)?', opts: ['1/2 (50%)','1/4 (25%)','1/8 (12.5%)','1/3 (33%)'], correct: 1, explanation: 'With 4 equal sections, each has a 1/4 = 25% chance. Equal sections = equal probabilities!' },
    5: { q: 'A bag has 3 red and 7 blue balls. What is P(red)?', opts: ['3/7','7/10','3/10','1/3'], correct: 2, explanation: 'P(E) = n(E)/n(S) = 3 red / 10 total = 3/10 = 30%' },
    6: { q: 'A weather app says 70% chance of rain. What is the chance of NO rain?', opts: ['30%','70%','50%','20%'], correct: 0, explanation: 'P(no rain) = 1 - P(rain) = 1 - 0.7 = 0.3 = 30%. This is the complement rule!' },
    7: { q: 'You flip a coin twice. What is P(Heads then Heads)?', opts: ['1/2','1/4','1/3','1/8'], correct: 1, explanation: 'Independent events: P(H) × P(H) = 0.5 × 0.5 = 0.25 = 1/4' },
    8: { q: 'Which of these has a probability of 0.75?', opts: ['It\'s certain','It\'s impossible','It\'s likely to happen','It\'s even chance'], correct: 2, explanation: '0.75 means 75% — that\'s "likely". Remember: 0=impossible, 0.5=even, 1=certain' },
    9: { q: 'After 1000 coin flips, which result is closest to the theoretical prediction?', opts: ['400 heads','650 heads','501 heads','200 heads'], correct: 2, explanation: 'The Law of Large Numbers: with many trials, results approach theoretical probability (50%). 501/1000 ≈ 50.1% — closest!' },
    10: { q: 'If P(rolling 1 or 2) = 2/6, what is P(NOT rolling 1 or 2)?', opts: ['1/6','5/6','2/6','4/6'], correct: 3, explanation: 'P(not E) = 1 - P(E) = 1 - 2/6 = 4/6. The complement of rolling 1 or 2 is rolling 3,4,5, or 6.' },
    11: { q: 'A standard deck has 52 cards. What is P(drawing a heart)?', opts: ['1/4','1/52','1/13','1/2'], correct: 0, explanation: '13 hearts ÷ 52 total = 13/52 = 1/4 = 25%' },
    12: { q: 'Which is the correct decimal form of 35%?', opts: ['3.5','0.035','0.35','35.0'], correct: 2, explanation: 'To convert % to decimal, divide by 100. 35% ÷ 100 = 0.35' },
  };

  const activity = activities[lectureId];
  if (!activity) return <p className="text-gray-400 text-center p-4">Activity not available</p>;

  const handleSubmit = () => { if (selected !== null) setSubmitted(true); };

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm font-bold text-gray-800 leading-relaxed">{activity.q}</p>
      <div className="space-y-2">
        {activity.opts.map((opt, i) => (
          <button key={i} onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
              submitted
                ? i === activity.correct ? 'bg-green-50 border-green-400 text-green-800'
                  : i === selected ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
                : selected === i ? 'bg-indigo-50 border-indigo-400 text-indigo-800'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}>
            <span className="font-bold mr-2">{['A','B','C','D'][i]}.</span>{opt}
            {submitted && i === activity.correct && <span className="float-right">✅</span>}
            {submitted && i === selected && i !== activity.correct && <span className="float-right">❌</span>}
          </button>
        ))}
      </div>
      {!submitted ? (
        <button onClick={handleSubmit} disabled={selected === null}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${selected !== null ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
          Check My Answer
        </button>
      ) : (
        <div className={`p-3 rounded-xl text-sm ${selected === activity.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
          <p className="font-bold mb-1">{selected === activity.correct ? '🎉 Correct!' : '💡 Not quite — here\'s why:'}</p>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Slide Modal
// ──────────────────────────────────────────────────────────────────────────────
const SlideModal = ({ lecture, onClose, onComplete }) => {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const gameLinks = { 2: '/coin-toss', 3: '/dice-roll', 4: '/spinner' };
  const relatedGame = gameLinks[lecture.id];

  const slides = [
    { title: '📖 Concept', label: 'Simple Explanation' },
    { title: '🎨 Visual', label: 'See it in action' },
    { title: '✏️ Try It', label: 'Test yourself' },
    { title: '🚀 Next Step', label: 'Apply your knowledge' },
  ];

  const handleComplete = () => {
    onComplete(lecture.id);
    if (slide === 3) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${lecture.gradient} p-5 text-white`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Lecture {lecture.id} of 12</span>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{lecture.title}</h2>

          {/* Slide tabs */}
          <div className="flex gap-1 mt-3">
            {slides.map((s, i) => (
              <button key={i} onClick={() => i <= slide && setSlide(i)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${slide === i ? 'bg-white/30 text-white' : i < slide ? 'bg-white/15 text-white/80' : 'bg-white/5 text-white/40 cursor-default'}`}>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="min-h-[320px]">
          {slide === 0 && (
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">{lecture.shortContent}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-500 uppercase mb-2">Mathematical Theory</p>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{lecture.theory}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {lecture.concepts.map((c, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">{c}</span>
                ))}
              </div>
            </div>
          )}
          {slide === 1 && <VisualSlide lectureId={lecture.id} />}
          {slide === 2 && <TryItSlide lectureId={lecture.id} />}
          {slide === 3 && (
            <div className="p-6 text-center space-y-4">
              <div className="text-5xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-gray-900">You've completed this lesson!</h3>
              <p className="text-sm text-gray-600">Ready to put it into practice? Head to the game and experience it firsthand.</p>
              {relatedGame && (
                <button onClick={() => { handleComplete(); navigate(relatedGame); }}
                  className={`w-full py-4 bg-gradient-to-r ${lecture.gradient} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2`}>
                  <Play size={18} /> Try it in the Game!
                </button>
              )}
              <button onClick={() => { handleComplete(); onClose(); }}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all">
                Back to Lectures
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {slide < 3 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <button onClick={() => slide > 0 && setSlide(s => s - 1)}
              disabled={slide === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${slide === 0 ? 'text-gray-300 cursor-default' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronLeft size={16} /> Back
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${slide === i ? 'bg-indigo-600 w-5' : i < slide ? 'bg-indigo-300' : 'bg-gray-200'}`} />
              ))}
            </div>
            <button onClick={() => slide === 2 ? setSlide(3) : setSlide(s => s + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
              {slide === 2 ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Main Lectures Page
// ──────────────────────────────────────────────────────────────────────────────
const Lectures = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openLecture, setOpenLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState(() => {
    try { return JSON.parse(localStorage.getItem('completedLectures')) || []; }
    catch { return []; }
  });

  const markComplete = (id) => {
    const updated = [...new Set([...completedLectures, id])];
    setCompletedLectures(updated);
    localStorage.setItem('completedLectures', JSON.stringify(updated));
  };

  const lectures = [
    { id: 1, title: 'Probability: The Basics', shortContent: 'Probability is a number between 0 and 1 that shows how likely an event is to occur. 0 means impossible, 1 means certain, and 0.5 means equally likely.', theory: 'Mathematically: P(E) = 0 (impossible event) to P(E) = 1 (certain event). For example, the probability of the sun rising tomorrow is close to 1.', duration: '3 min', icon: BookOpen, gradient: 'from-blue-500 to-cyan-400', bgGradient: 'from-blue-50 to-cyan-50', concepts: ['0 to 1 scale', 'Impossible vs Certain', 'Numerical measure'] },
    { id: 2, title: 'Coin Toss Mathematics', shortContent: 'A fair coin has exactly 1/2 chance for heads and 1/2 for tails. Each toss is independent.', theory: 'Sample Space S = {Heads, Tails} → n(S) = 2. For Heads: n(E) = 1. So P(Heads) = n(E)/n(S) = 1/2 = 0.5 = 50%.', duration: '3 min', icon: Target, gradient: 'from-purple-500 to-pink-400', bgGradient: 'from-purple-50 to-pink-50', concepts: ['Sample Space', 'Independent events', '50% probability'] },
    { id: 3, title: 'Dice Roll Theory', shortContent: 'Standard die has 6 faces. Each number (1-6) has equal probability of 1/6.', theory: 'S = {1,2,3,4,5,6}, n(S)=6. P(rolling 3) = 1/6 ≈ 0.167 = 16.7%. Expected value = (1+2+3+4+5+6)/6 = 3.5.', duration: '4 min', icon: Hash, gradient: 'from-green-500 to-emerald-400', bgGradient: 'from-green-50 to-emerald-50', concepts: ['6 outcomes', 'Equal probability', 'Expected value = 3.5'] },
    { id: 4, title: 'Spinner Probability', shortContent: '4-color spinner: each color has 1/4 chance. Visual representation helps understand equal sections.', theory: 'If spinner divided into 4 equal sections: P(Red) = 1/4 = 0.25 = 25%. For n equal sections: P = 1/n.', duration: '3 min', icon: PieChart, gradient: 'from-amber-500 to-orange-400', bgGradient: 'from-amber-50 to-orange-50', concepts: ['Equal sections', 'Visual probability', '25% per section'] },
    { id: 5, title: 'Basic Probability Formula', shortContent: 'Probability = (Favorable outcomes) ÷ (Total possible outcomes)', theory: 'P(E) = n(E)/n(S) where n(E) = number of favorable outcomes, n(S) = total outcomes in sample space.', duration: '4 min', icon: Calculator, gradient: 'from-red-500 to-rose-400', bgGradient: 'from-red-50 to-rose-50', concepts: ['P = n(E)/n(S)', 'Favorable outcomes', 'Sample space'] },
    { id: 6, title: 'Real World Applications', shortContent: 'Used in weather forecasts (30% rain), games (card probabilities), and sports analytics.', theory: 'Weather: P(rain) = 0.3 means 30% chance. Cards: P(Ace of Spades) = 1/52 ≈ 0.0192 = 1.92%.', duration: '3 min', icon: TrendingUp, gradient: 'from-indigo-500 to-violet-400', bgGradient: 'from-indigo-50 to-violet-50', concepts: ['Weather forecasting', 'Game theory', 'Sports analytics'] },
    { id: 7, title: 'Independent Events', shortContent: 'Two events are independent if one does not affect the other. Example: Coin tosses.', theory: 'Events A and B are independent if P(A∩B) = P(A) × P(B). For coin: P(H and then H) = 0.5 × 0.5 = 0.25.', duration: '4 min', icon: Scale, gradient: 'from-blue-600 to-purple-500', bgGradient: 'from-blue-50 to-purple-50', concepts: ['Multiplication rule', 'No influence', 'Separate probabilities'] },
    { id: 8, title: 'Probability Scale', shortContent: 'Probability values and their meaning: 0, 0.25, 0.5, 0.75, 1 represent different likelihoods.', theory: '0 → Impossible, 0.25 → Unlikely, 0.5 → Even chance, 0.75 → Likely, 1 → Certain. All probabilities fall between 0 and 1.', duration: '3 min', icon: BarChart3, gradient: 'from-teal-500 to-cyan-400', bgGradient: 'from-teal-50 to-cyan-50', concepts: ['Probability scale', 'Likelihood levels', '0 to 1 range'] },
    { id: 9, title: 'The Law of Large Numbers', shortContent: 'More trials = results closer to theoretical probability. Example: More coin flips → closer to 50/50.', theory: 'As number of trials → ∞, experimental probability → theoretical probability. 1000 flips ≈ 500H, 500T.', duration: '4 min', icon: Brain, gradient: 'from-orange-500 to-red-400', bgGradient: 'from-orange-50 to-red-50', concepts: ['More trials', 'Convergence', 'Experimental vs theoretical'] },
    { id: 10, title: 'Complementary Events', shortContent: 'Probability of event NOT happening = 1 - Probability of it happening.', theory: 'P(not E) = 1 - P(E). Example: P(not rolling 1 on die) = 1 - 1/6 = 5/6 ≈ 0.833.', duration: '3 min', icon: Calculator, gradient: 'from-violet-500 to-purple-400', bgGradient: 'from-violet-50 to-purple-50', concepts: ['1 - P(E)', 'Opposite events', 'Complement rule'] },
    { id: 11, title: 'Simple Probability Examples', shortContent: 'Drawing cards: 4/52 for an Ace. Rolling dice: 3/6 for even number.', theory: 'Cards: P(Ace) = 4/52 = 1/13 ≈ 0.077. Dice: P(even) = 3/6 = 1/2 = 0.5.', duration: '3 min', icon: BookOpen, gradient: 'from-emerald-500 to-green-400', bgGradient: 'from-emerald-50 to-green-50', concepts: ['Card probabilities', 'Dice combinations', 'Simple calculations'] },
    { id: 12, title: 'Understanding Percentages', shortContent: 'Probability can be expressed as percentage: 0.5 = 50%, 0.25 = 25%, 0.75 = 75%.', theory: 'Convert decimal to percentage: Multiply by 100. P = 0.3 → 0.3 × 100 = 30%. Percentage to decimal: Divide by 100.', duration: '2 min', icon: PieChart, gradient: 'from-pink-500 to-rose-400', bgGradient: 'from-pink-50 to-rose-50', concepts: ['Decimal to %', '% to decimal', 'Conversion formula'] },
  ];

  const completedCount = completedLectures.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 flex flex-col">

      {/* Slide Modal */}
      {openLecture && (
        <SlideModal
          lecture={openLecture}
          onClose={() => setOpenLecture(null)}
          onComplete={markComplete}
        />
      )}

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-gray-900">Menu</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            <button onClick={() => navigate('/menu')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4">
              <ArrowLeft size={20} /> Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className="p-3 bg-white/90 rounded-xl shadow-lg hover:bg-white transition-all">
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="hidden lg:block">
              <button onClick={() => navigate('/menu')} className="group flex items-center gap-2 px-5 py-3 bg-white/80 rounded-2xl shadow-lg hover:bg-white transition-all">
                <ArrowLeft size={20} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Back to Menu</span>
              </button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div className="text-left">
                <span className="text-xl lg:text-2xl font-bold text-gray-900"><span className="text-indigo-600">Theory Guide</span></span>
                <p className="text-xs text-gray-500 hidden lg:block">{completedCount}/12 lessons completed</p>
              </div>
            </div>
            <div className="lg:hidden w-12" />
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl border border-indigo-100">
                <Check size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">{completedCount}/12 Done</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Hero */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-full border border-indigo-100">
            <Sparkles size={16} className="text-indigo-500" />
            <span className="text-sm font-medium text-indigo-600">4-Slide Interactive Lessons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Master Probability
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 block">Theory & Concepts</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            Each lesson has 4 steps: <strong>Concept → Visual → Try It → Next Step</strong>.
            Complete a lesson to unlock the related game!
          </p>

          {/* Progress bar */}
          {completedCount > 0 && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{completedCount}/12</span></div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${(completedCount / 12) * 100}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
          {lectures.map((lecture) => {
            const Icon = lecture.icon;
            const done = completedLectures.includes(lecture.id);
            return (
              <div key={lecture.id} className="group cursor-pointer" onClick={() => setOpenLecture(lecture)}>
                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border overflow-hidden h-full flex flex-col relative ${done ? 'border-green-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                  {/* Completion checkmark */}
                  {done && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`h-2 bg-gradient-to-r ${lecture.gradient}`} />
                  <div className="relative z-10 flex-grow flex flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${lecture.gradient} shadow-sm`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        <Clock size={12} /><span>{lecture.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{lecture.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">{lecture.shortContent}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lecture.concepts.map((c, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">{c}</span>
                      ))}
                    </div>
                    <div className={`flex items-center justify-between pt-4 border-t ${done ? 'border-green-100' : 'border-gray-100'}`}>
                      <span className={`flex items-center gap-2 text-sm font-medium ${done ? 'text-green-600' : 'text-indigo-600'}`}>
                        {done ? <><Check size={14} />Completed</> : <><Play size={14} />Open Lesson</>}
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="flex gap-1">
                        {['📖','🎨','✏️','🚀'].map((e, i) => (
                          <span key={i} className="text-sm opacity-40">{e}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6 sm:p-8 border border-indigo-100">
          <div className="text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-white p-3 rounded-xl text-center border border-gray-200"><div className="text-lg font-bold text-blue-600">0 to 1</div><p className="text-xs text-gray-600">Probability Scale</p></div>
              <div className="bg-white p-3 rounded-xl text-center border border-gray-200"><div className="text-lg font-bold text-purple-600">P = n(E)/n(S)</div><p className="text-xs text-gray-600">Basic Formula</p></div>
              <div className="bg-white p-3 rounded-xl text-center border border-gray-200"><div className="text-lg font-bold text-green-600">50%</div><p className="text-xs text-gray-600">Coin Flip</p></div>
              <div className="bg-white p-3 rounded-xl text-center border border-gray-200"><div className="text-lg font-bold text-amber-600">1/6</div><p className="text-xs text-gray-600">Dice Roll</p></div>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">You now understand the fundamental concepts of probability! These basics apply to all probability calculations and real-world scenarios.</p>
            <button onClick={() => navigate('/menu')} className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 transition-all">
              <span>Practice in Games</span><ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center"><span className="text-white font-bold text-sm">P</span></div>
            <span className="text-lg font-bold text-gray-900">Prob<span className="text-indigo-600">X</span> Theory Guide</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Comprehensive probability theory for beginners to intermediate learners.</p>
        </div>
      </footer>
    </div>
  );
};

export default Lectures;