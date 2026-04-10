import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import QuestionModal from '../components/QuestionModal';
import ConceptDemo from '../components/ConceptDemo';
import PredictionChallenge from '../components/PredictionChallenge';
import StoryCard from '../components/StoryCard';
import LearningBubble from '../components/LearningBubble';
import { spinnerQuestions } from '../data/spinnerQuestions';
import { ArrowLeft, Trophy, TrendingUp, Target, Zap, BarChart, RefreshCw, ChevronRight, Sparkles, Menu, X, Circle, AlertCircle, Check, XCircle, Flame } from 'lucide-react';

const WARMUP_COUNT = 5;
const MAX_QUESTIONS = 10;

const SpinnerGame = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState('demo');
  const [prediction, setPrediction] = useState(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('Tap to Spin');
  const [stats, setStats] = useState({ Red: 0, Blue: 0, Yellow: 0, Green: 0, total: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [warmupSpins, setWarmupSpins] = useState(0);
  const [showWarmupBanner, setShowWarmupBanner] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAskedCount, setQuestionsAskedCount] = useState(0);

  const [resultHistory, setResultHistory] = useState([]);
  const [bubble, setBubble] = useState(null);
  const [warmupPrediction, setWarmupPrediction] = useState(null);

  const getNextQuestion = (targetDifficulty, excludeIds, currentScore) => {
    let available = spinnerQuestions.filter(q => q.difficulty === targetDifficulty && !excludeIds.includes(q.id));
    if (available.length === 0) {
      const alts = { easy: ['medium', 'hard'], medium: ['easy', 'hard'], hard: ['medium', 'easy'] };
      for (const d of alts[targetDifficulty]) {
        available = spinnerQuestions.filter(q => q.difficulty === d && !excludeIds.includes(q.id));
        if (available.length > 0) break;
      }
    }
    if (available.length === 0 && excludeIds.length >= spinnerQuestions.length * 0.8) {
      available = spinnerQuestions.filter(q => q.difficulty === targetDifficulty);
      if (!available.length) available = spinnerQuestions;
      const weighted = [];
      available.forEach(q => { const w = excludeIds.includes(q.id) ? 1 : 5; for (let i = 0; i < w; i++) weighted.push(q); });
      return weighted[Math.floor(Math.random() * weighted.length)];
    }
    if (available.length > 0) {
      const weighted = [];
      available.forEach(q => {
        let w = 1;
        if (currentScore >= 3 && q.difficulty === 'hard') w = 2;
        if (currentScore <= 1 && q.difficulty === 'easy') w = 2;
        for (let i = 0; i < w; i++) weighted.push(q);
      });
      return weighted[Math.floor(Math.random() * weighted.length)];
    }
    return spinnerQuestions[Math.floor(Math.random() * spinnerQuestions.length)];
  };

  useEffect(() => {
    if (phase === 'play' && questionsAskedCount === 0 && !currentQuestion) {
      setCurrentQuestion(getNextQuestion('easy', [], score));
    }
  }, [phase]);

  const checkBubble = (color, history) => {
    if (bubble) return;
    const noGreenCount = history.filter(h => h !== 'Green').length;
    if (noGreenCount >= 10 && !history.includes('Green')) {
      setBubble({ message: "🎡 Green hasn't appeared yet, but its probability hasn't changed at all — it's still exactly 25% (1 in 4) every single spin!", color: 'green' });
      return;
    }
    const recent = history.slice(-3);
    if (recent.length === 3 && recent.every(v => v === recent[0])) {
      setBubble({ message: `✨ ${recent[0]} three times in a row! But every spin is still independent — ${recent[0]} still has a 25% chance next spin, same as always.`, color: 'indigo' });
    } else if (history.length >= 2 && history[history.length-1] === history[history.length-2]) {
      setBubble({ message: `🎡 ${color} again! Each spin is completely independent. Past results don't influence future ones — each color always stays at 25%.`, color: 'amber' });
    }
  };

  const spinWheel = () => {
    if (isSpinning || showModal) return;
    if (phase === 'warmup' && warmupPrediction === null) return;
    setIsSpinning(true);

    const randomDeg = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1080 + randomDeg;
    setRotation(totalRotation);

    setTimeout(() => {
      const finalDeg = totalRotation % 360;
      let color = '';
      if (finalDeg >= 0 && finalDeg < 90) color = 'Green';
      else if (finalDeg >= 90 && finalDeg < 180) color = 'Yellow';
      else if (finalDeg >= 180 && finalDeg < 270) color = 'Blue';
      else color = 'Red';

      setResult(color);
      const newTotal = stats.total + 1;
      setStats(prev => ({ ...prev, [color]: prev[color] + 1, total: newTotal }));

      const newHistory = [...resultHistory, color];
      setResultHistory(newHistory);
      setIsSpinning(false);
      setWarmupPrediction(null);

      if (phase === 'warmup') {
        const newWarmup = warmupSpins + 1;
        setWarmupSpins(newWarmup);
        if (newWarmup >= WARMUP_COUNT) {
          setShowWarmupBanner(true);
          setTimeout(() => {
            setShowWarmupBanner(false);
            setPhase('play');
            setCurrentQuestion(getNextQuestion('easy', [], score));
          }, 2500);
        }
        checkBubble(color, newHistory);
        return;
      }

      // Question after every spin
      if (questionsAskedCount < MAX_QUESTIONS) {
        if (!currentQuestion) setCurrentQuestion(getNextQuestion('easy', [], score));
        setTimeout(() => setShowModal(true), 1000);
      } else {
        finishGame(newTotal);
      }
      checkBubble(color, newHistory);
    }, 2000);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(s => s + 1);
      if (difficulty === 'easy' && score >= 2) setDifficulty('medium');
      else if (difficulty === 'medium' && score >= 4) setDifficulty('hard');
    } else {
      if (difficulty === 'hard' && score <= 2) setDifficulty('medium');
      else if (difficulty === 'medium' && score <= 1) setDifficulty('easy');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    const newUsedIds = [...usedQuestionIds, currentQuestion.id];
    setUsedQuestionIds(newUsedIds);
    const newCount = questionsAskedCount + 1;
    setQuestionsAskedCount(newCount);
    if (newCount >= MAX_QUESTIONS) finishGame(stats.total);
    else setCurrentQuestion(getNextQuestion(difficulty, newUsedIds, score));
  };

  const finishGame = (totalSpins = stats.total) => {
    navigate('/summary', {
      state: {
        game: 'spinner', score, totalQuestions: questionsAskedCount, difficulty,
        totalSpins, distribution: stats, prediction,
        predictionLabel: prediction !== null ? ['0–1 times', '2–3 times', '4–5 times', '6+ times'][prediction] : null,
        actualGreen: stats.Green,
      }
    });
  };

  const handleExit = () => setShowExitConfirm(true);
  const confirmExit = () => { setShowExitConfirm(false); navigate('/menu'); };
  const cancelExit = () => setShowExitConfirm(false);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'hard': return 'text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'medium': return 'text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default: return 'text-green-600 bg-gradient-to-r from-green-50 to-green-100 border-green-200';
    }
  };
  const getProgressColor = () => {
    switch (difficulty) {
      case 'hard': return 'bg-gradient-to-r from-red-500 via-red-400 to-red-300';
      case 'medium': return 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300';
      default: return 'bg-gradient-to-r from-green-500 via-green-400 to-green-300';
    }
  };
  const getHeaderColor = () => {
    switch (difficulty) {
      case 'hard': return 'from-red-600 to-orange-500';
      case 'medium': return 'from-amber-600 to-yellow-500';
      default: return 'from-green-600 to-emerald-500';
    }
  };
  const getResultColor = () => {
    switch (result) {
      case 'Red': return 'text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'Blue': return 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
      case 'Yellow': return 'text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      case 'Green': return 'text-green-600 bg-gradient-to-r from-green-50 to-green-100 border-green-200';
      default: return 'text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };
  const getColorPercentage = (color) => stats.total > 0 ? ((stats[color] / stats.total) * 100).toFixed(1) : 0;

  if (phase === 'demo') return <ConceptDemo gameType="spinner" onComplete={() => setPhase('predict')} />;
  if (phase === 'predict') return <PredictionChallenge gameType="spinner" onComplete={(p) => { setPrediction(p); setPhase('story'); }} />;
  if (phase === 'story') return <StoryCard gameType="spinner" onComplete={() => setPhase('warmup')} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50 flex flex-col">

      {bubble && <LearningBubble message={bubble.message} accentColor={bubble.color} onDismiss={() => setBubble(null)} />}

      {showWarmupBanner && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Warm-up Complete!</h3>
            <p className="text-gray-600">Questions will now appear after every spin. Good luck!</p>
          </div>
        </div>
      )}

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center"><AlertCircle size={24} className="text-red-500" /></div>
              <div><h3 className="text-xl font-bold">Leave Game?</h3><p className="text-gray-600 text-sm">Unsaved progress</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white border p-3 rounded-lg"><p className="text-xs text-gray-500">Spins</p><p className="text-lg font-bold text-green-600">{stats.total}</p></div>
              <div className="bg-white border p-3 rounded-lg"><p className="text-xs text-gray-500">Score</p><p className="text-lg font-bold text-blue-600">{score}</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={cancelExit} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl"><XCircle size={18} />Cancel</button>
              <button onClick={confirmExit} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl"><Check size={18} />Leave</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed top-0 left-0 h-1.5 ${getProgressColor()} transition-all duration-500 z-30`} style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }} />

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8"><h3 className="text-lg font-bold">Menu</h3><button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button></div>
            <button onClick={handleExit} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"><ArrowLeft size={20} />Back to Menu</button>
            <div className={`px-4 py-3 rounded-xl ${getDifficultyColor()} font-semibold mb-3`}>{difficulty.toUpperCase()} MODE</div>
          </div>
        </div>
      )}

      <div className="relative z-0 max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        <header className="pt-6 pb-4 lg:pt-8">
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="lg:hidden"><button onClick={() => setMobileMenuOpen(true)} className="p-3 bg-white/90 rounded-xl shadow-lg hover:bg-white"><Menu size={24} className="text-gray-600" /></button></div>
            <div className="hidden lg:block">
              <button onClick={handleExit} className="group flex items-center gap-2 px-5 py-3 bg-white/80 rounded-2xl shadow-lg hover:bg-white transition-all">
                <ArrowLeft size={20} className="text-gray-600" /><span className="text-gray-700 font-medium">Back to Menu</span>
              </button>
            </div>
            <div className="text-center flex-1 lg:flex-none">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r ${getHeaderColor()} flex items-center justify-center shadow-lg`}><Circle size={16} className="text-white" /></div>
                <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">Color Spinner</h1>
              </div>
              {phase === 'warmup' && (
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-xs font-semibold text-orange-600">Warm-up: {warmupSpins}/{WARMUP_COUNT} free spins</span>
                </div>
              )}
            </div>
            <div className={`hidden lg:flex px-5 py-3 rounded-2xl border ${getDifficultyColor()} font-semibold shadow-sm`}>{phase === 'warmup' ? '🔥 WARM-UP' : difficulty.toUpperCase() + ' MODE'}</div>
            <div className="lg:hidden w-12" />
          </div>

          <div className="lg:hidden mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/90 rounded-xl shadow-sm p-3 text-center border border-gray-100"><div className="text-xl font-bold text-green-600">{stats.total}</div><p className="text-xs text-gray-500 mt-1">Spins</p></div>
              <div className={`${getResultColor()} rounded-xl shadow-sm p-3 text-center border`}><div className="text-xl font-bold truncate">{result.charAt(0)}</div><p className="text-xs text-gray-500 mt-1">Result</p></div>
              <div className="bg-white/90 rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className={`text-xs font-medium px-1 py-1 rounded-full ${getDifficultyColor()}`}>{difficulty.charAt(0).toUpperCase()}</div>
                <p className="text-xs text-gray-500 mt-1">Level</p>
              </div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-8 lg:pb-12">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">

            {/* Warmup prediction */}
            {phase === 'warmup' && !isSpinning && (
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-5 border border-green-200 shadow-md">
                <p className="text-sm font-bold text-green-800 mb-3">🎯 Warm-Up Prediction — What color will it land on?</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Red','Blue','Yellow','Green'].map(color => {
                    const colorClasses = { Red:'bg-red-500', Blue:'bg-blue-500', Yellow:'bg-amber-500', Green:'bg-green-500' };
                    const selClasses = { Red:'border-red-500 text-red-700 bg-red-50', Blue:'border-blue-500 text-blue-700 bg-blue-50', Yellow:'border-amber-500 text-amber-700 bg-amber-50', Green:'border-green-500 text-green-700 bg-green-50' };
                    return (
                      <button key={color} onClick={() => setWarmupPrediction(color)}
                        className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all flex items-center justify-center gap-2 ${warmupPrediction === color ? `${selClasses[color]} shadow-lg scale-105` : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`} />{color}
                      </button>
                    );
                  })}
                </div>
                {warmupPrediction && <p className="text-xs text-green-600 mt-2 text-center">✅ Guessing {warmupPrediction}! Now spin!</p>}
                <p className="text-xs text-gray-500 text-center mt-2">{WARMUP_COUNT - warmupSpins} free spins remaining</p>
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 lg:mb-10">
                  <Spinner rotation={rotation} isSpinning={isSpinning} onClick={spinWheel} />
                </div>
                <div className={`mb-6 lg:mb-8 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border ${getResultColor()} font-bold text-lg lg:text-xl`}>
                  Current Result: <span className="font-extrabold">{result}</span>
                </div>
                <button onClick={spinWheel}
                  disabled={isSpinning || showModal || (phase === 'warmup' && warmupPrediction === null)}
                  className={`group relative w-full lg:w-auto px-8 lg:px-14 py-4 lg:py-5 text-lg lg:text-2xl font-bold text-white rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${isSpinning || showModal || (phase === 'warmup' && warmupPrediction === null) ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 via-blue-600 to-green-700'}`}>
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSpinning ? <><RefreshCw className="animate-spin" size={20} /><span>Spinning...</span></> : <><Sparkles size={20} /><span>Spin Wheel {phase === 'warmup' ? '(Free!)' : ''}</span><ChevronRight size={20} /></>}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="mt-4 text-center">
                  {phase === 'warmup' ? (
                    <p className="text-xs text-orange-600 font-semibold">🔥 Warm-up mode — explore freely! Questions start after {WARMUP_COUNT} spins.</p>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full">
                      <Target size={12} className="text-green-600" />
                      <span>Questions: <strong>{questionsAskedCount}/{MAX_QUESTIONS}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Color Distribution */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2">
                <BarChart className="text-green-600" size={20} /> Color Distribution
              </h2>
              <div className="space-y-4">
                {[
                  { color:'Red', bg:'bg-red-500', gradient:'from-red-400 to-red-500' },
                  { color:'Blue', bg:'bg-blue-500', gradient:'from-blue-400 to-blue-500' },
                  { color:'Yellow', bg:'bg-amber-500', gradient:'from-amber-400 to-amber-500' },
                  { color:'Green', bg:'bg-green-500', gradient:'from-green-400 to-green-500' },
                ].map(item => (
                  <div key={item.color} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2"><div className={`w-4 h-4 rounded-full ${item.bg}`} /><span>{item.color}</span></div>
                      <span>{stats[item.color]} ({getColorPercentage(item.color)}%)</span>
                    </div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${item.gradient} transition-all duration-500`} style={{ width: `${getColorPercentage(item.color)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Progress</h2>
                <div className="flex items-center gap-2"><Trophy className="text-amber-500" size={18} /><span className="text-sm font-semibold text-amber-600">{score} pts</span></div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2"><span>Learning Journey</span><span>{questionsAskedCount}/{MAX_QUESTIONS}</span></div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${getProgressColor()} transition-all`} style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl"><TrendingUp className="text-green-600 mb-1" size={16} /><div className="font-bold">{difficulty.toUpperCase()}</div><p className="text-xs text-gray-500">Level</p></div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl"><Target className="text-blue-600 mb-1" size={16} /><div className="font-bold">{questionsAskedCount > 0 ? Math.round((score/questionsAskedCount)*100) : 0}%</div><p className="text-xs text-gray-500">Accuracy</p></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-3">Spinner Facts</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl"><p className="text-sm font-medium">Equal Probability</p><p className="text-xs text-gray-600 mt-1">Each color has 1/4 (25%) chance</p></div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl"><p className="text-sm font-medium">Independent Events</p><p className="text-xs text-gray-600 mt-1">Each spin is independent of others</p></div>
                <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl"><p className="text-sm font-medium">Theoretical Distribution</p><p className="text-xs text-gray-600 mt-1">Expected: 25% each color</p></div>
              </div>
            </div>
          </div>
        </main>

        <footer className="pb-6 mt-6">
          <div className="bg-white/90 rounded-2xl p-4 border border-gray-200 shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center"><span className="text-white font-bold text-sm">P</span></div>
              <div><p className="text-sm font-medium text-gray-900">ProbX Spinner Lab</p><p className="text-xs text-gray-500">4-color probability learning</p></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-700">{stats.total}</span><span className="text-xs text-gray-400">Spins</span>
              <div className="w-px h-4 bg-gray-300" />
              <span className="font-medium text-gray-700">{questionsAskedCount}</span><span className="text-xs text-gray-400">Q's</span>
            </div>
          </div>
        </footer>
      </div>

      {showModal && currentQuestion && (
        <QuestionModal questionData={currentQuestion} onClose={handleCloseModal} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default SpinnerGame;
