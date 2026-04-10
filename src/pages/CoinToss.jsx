import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Coin from '../components/Coin';
import QuestionModal from '../components/QuestionModal';
import ConceptDemo from '../components/ConceptDemo';
import PredictionChallenge from '../components/PredictionChallenge';
import StoryCard from '../components/StoryCard';
import LearningBubble from '../components/LearningBubble';
import { coinQuestions } from '../data/coinQuestions';
import { ArrowLeft, Trophy, TrendingUp, Target, Zap, BarChart, RefreshCw, ChevronRight, Sparkles, Menu, X, AlertCircle, Check, XCircle, Flame } from 'lucide-react';

const WARMUP_COUNT = 5;
const MAX_QUESTIONS = 10;

const CoinToss = () => {
  const navigate = useNavigate();

  // ── Phase state ──────────────────────────────────────────────────
  // 'demo' | 'predict' | 'story' | 'warmup' | 'play'
  const [phase, setPhase] = useState('demo');
  const [prediction, setPrediction] = useState(null);

  // ── Game state ───────────────────────────────────────────────────
  const [isFlipping, setIsFlipping] = useState(false);
  const [side, setSide] = useState('heads');
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [warmupFlips, setWarmupFlips] = useState(0);
  const [warmupComplete, setWarmupComplete] = useState(false);

  // ── Adaptive learning state ──────────────────────────────────────
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAskedCount, setQuestionsAskedCount] = useState(0);

  // ── Streak / learning bubble state ──────────────────────────────
  const [tailsStreak, setTailsStreak] = useState(0);
  const [headsStreak, setHeadsStreak] = useState(0);
  const [resultHistory, setResultHistory] = useState([]);
  const [bubble, setBubble] = useState(null); // { message, color }

  // ── Pre-warmup prediction meter ─────────────────────────────────
  const [warmupPrediction, setWarmupPrediction] = useState(null);
  const [showWarmupBanner, setShowWarmupBanner] = useState(false);

  const getNextQuestion = (targetDifficulty, excludeIds, currentScore) => {
    let available = coinQuestions.filter(q =>
      q.difficulty === targetDifficulty && !excludeIds.includes(q.id)
    );
    if (available.length === 0) {
      const alts = { easy: ['medium', 'hard'], medium: ['easy', 'hard'], hard: ['medium', 'easy'] };
      for (const d of alts[targetDifficulty]) {
        available = coinQuestions.filter(q => q.difficulty === d && !excludeIds.includes(q.id));
        if (available.length > 0) break;
      }
    }
    if (available.length === 0) {
      if (excludeIds.length >= coinQuestions.length * 0.8) {
        available = coinQuestions.filter(q => q.difficulty === targetDifficulty);
        if (available.length === 0) available = coinQuestions;
        const weighted = [];
        available.forEach(q => {
          const w = excludeIds.includes(q.id) ? 1 : 5;
          for (let i = 0; i < w; i++) weighted.push(q);
        });
        return weighted[Math.floor(Math.random() * weighted.length)];
      }
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
    return coinQuestions[Math.floor(Math.random() * coinQuestions.length)];
  };

  useEffect(() => {
    if (phase === 'play' && questionsAskedCount === 0 && !currentQuestion) {
      setCurrentQuestion(getNextQuestion('easy', [], score));
    }
  }, [phase]);

  // ── Check for learning bubble triggers ───────────────────────────
  const checkBubble = (result, newTailsStreak, newHeadsStreak, history) => {
    if (bubble) return; // Don't stack bubbles
    if (newTailsStreak >= 3) {
      setBubble({ message: "🎯 Feeling like Heads is 'due'? Each flip is still exactly 50/50 — this is the Gambler's Fallacy! Past flips don't affect future ones.", color: 'indigo' });
    } else if (newHeadsStreak >= 3) {
      setBubble({ message: "🎯 Three Heads in a row! Surprising? Actually this happens sometimes. Tails is still 50/50 next flip — not 'more likely'!", color: 'amber' });
    } else if (history.length >= 2 && history[history.length - 1] === history[history.length - 2]) {
      const recent = history[history.length - 1];
      setBubble({ message: `✨ ${recent === 'heads' ? 'Heads' : 'Tails'} twice in a row! Each flip is completely independent — there's still a 50% chance for either side next time.`, color: 'green' });
    }
  };

  const tossCoin = () => {
    if (isFlipping || showModal) return;
    if (phase === 'warmup' && warmupPrediction === null) return; // Must predict first in warmup
    setIsFlipping(true);

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      setSide(result);

      const newTotal = stats.total + 1;
      setStats(prev => ({ ...prev, [result]: prev[result] + 1, total: newTotal }));

      // Update streaks
      const newTailsStreak = result === 'tails' ? tailsStreak + 1 : 0;
      const newHeadsStreak = result === 'heads' ? headsStreak + 1 : 0;
      setTailsStreak(newTailsStreak);
      setHeadsStreak(newHeadsStreak);

      const newHistory = [...resultHistory, result];
      setResultHistory(newHistory);

      setIsFlipping(false);
      setWarmupPrediction(null); // Reset warmup prediction after flip

      if (phase === 'warmup') {
        const newWarmup = warmupFlips + 1;
        setWarmupFlips(newWarmup);
        if (newWarmup >= WARMUP_COUNT) {
          setShowWarmupBanner(true);
          setTimeout(() => {
            setShowWarmupBanner(false);
            setPhase('play');
            setCurrentQuestion(getNextQuestion('easy', [], score));
          }, 2500);
        }
        checkBubble(result, newTailsStreak, newHeadsStreak, newHistory);
        return;
      }

      // ── Play phase — question after every flip ───────────────────
      if (questionsAskedCount < MAX_QUESTIONS) {
        if (!currentQuestion) setCurrentQuestion(getNextQuestion('easy', [], score));
        setTimeout(() => setShowModal(true), 800);
      } else {
        finishGame(newTotal);
      }

      checkBubble(result, newTailsStreak, newHeadsStreak, newHistory);
    }, 1000);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
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
    if (newCount >= MAX_QUESTIONS) {
      finishGame(stats.total);
    } else {
      setCurrentQuestion(getNextQuestion(difficulty, newUsedIds, score));
    }
  };

  const finishGame = (totalFlips = stats.total) => {
    navigate('/summary', {
      state: {
        game: 'coin',
        score,
        totalQuestions: questionsAskedCount,
        difficulty,
        totalFlips,
        headsCount: stats.heads,
        tailsCount: stats.tails,
        prediction,
        predictionLabel: prediction !== null ? ['2 heads', '5 heads', '8 heads', '10 heads'][prediction] : null,
        actualHeads: stats.heads,
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

  const headsPercentage = stats.total > 0 ? ((stats.heads / stats.total) * 100).toFixed(1) : 0;
  const tailsPercentage = stats.total > 0 ? ((stats.tails / stats.total) * 100).toFixed(1) : 0;

  // ── Phase overlays ───────────────────────────────────────────────
  if (phase === 'demo') return <ConceptDemo gameType="coin" onComplete={() => setPhase('predict')} />;
  if (phase === 'predict') return <PredictionChallenge gameType="coin" onComplete={(p) => { setPrediction(p); setPhase('story'); }} />;
  if (phase === 'story') return <StoryCard gameType="coin" onComplete={() => setPhase('warmup')} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">

      {/* Learning Bubble */}
      {bubble && (
        <LearningBubble
          message={bubble.message}
          accentColor={bubble.color}
          onDismiss={() => setBubble(null)}
        />
      )}

      {/* Warmup complete banner */}
      {showWarmupBanner && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Warm-up Complete!</h3>
            <p className="text-gray-600">Questions will now appear after every flip. Good luck!</p>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Leave Game?</h3>
                <p className="text-gray-600 text-sm">You have unsaved progress</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <p className="text-gray-700 font-medium mb-2">Current Session:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Flips</p>
                    <p className="text-lg font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="text-lg font-bold text-green-600">{score}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={cancelExit} className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-300">
                  <XCircle size={18} /> Cancel
                </button>
                <button onClick={confirmExit} className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Check size={18} /> Yes, Leave Game
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">Progress is auto-saved after completing questions</p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className={`fixed top-0 left-0 h-1.5 ${getProgressColor()} transition-all duration-500 z-30`}
        style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }} />

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-gray-900">Menu</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            <button onClick={handleExit} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4">
              <ArrowLeft size={20} /> Back to Menu
            </button>
            <div className="space-y-4">
              <div className={`px-4 py-3 rounded-xl ${getDifficultyColor()} font-semibold`}>{difficulty.toUpperCase()} MODE</div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Progress: {questionsAskedCount}/{MAX_QUESTIONS}</p>
                <p className="text-sm text-gray-600 mt-1">Score: {score} points</p>
              </div>
              {phase === 'warmup' && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm text-amber-700 font-semibold">🔥 Warm-up Mode</p>
                  <p className="text-xs text-amber-600 mt-1">{WARMUP_COUNT - warmupFlips} free flips left</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-0 max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">

        {/* Header */}
        <header className="pt-6 pb-4 lg:pt-8">
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300">
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="hidden lg:block">
              <button onClick={handleExit} className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300">
                <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Back to Menu</span>
              </button>
            </div>
            <div className="text-center flex-1 lg:flex-none">
              <div className="flex items-center justify-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-r ${getHeaderColor()} flex items-center justify-center shadow-lg`}>
                  <Zap size={16} className="text-white" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Coin Toss</h1>
              </div>
              <p className="text-xs lg:text-base text-gray-600 hidden lg:block">Flip, learn, and master 50/50 probability</p>
              {phase === 'warmup' && (
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-xs font-semibold text-orange-600">Warm-up: {warmupFlips}/{WARMUP_COUNT} free flips</span>
                </div>
              )}
            </div>
            <div className={`hidden lg:flex px-5 py-3 rounded-2xl border ${getDifficultyColor()} font-semibold shadow-sm`}>
              {phase === 'warmup' ? '🔥 WARM-UP' : difficulty.toUpperCase() + ' MODE'}
            </div>
            <div className="lg:hidden w-12" />
          </div>

          {/* Quick Stats for Mobile */}
          <div className="lg:hidden mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className="text-xl font-bold text-blue-600">{stats.total}</div>
                <p className="text-xs text-gray-500 mt-1">Flips</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className="text-xl font-bold text-green-600">{score}</div>
                <p className="text-xs text-gray-500 mt-1">Correct</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className={`text-xs font-medium px-1 py-1 rounded-full ${getDifficultyColor()}`}>{difficulty.charAt(0).toUpperCase()}</div>
                <p className="text-xs text-gray-500 mt-1">Level</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-8 lg:pb-12">

          {/* Left Column - Game Control */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">

            {/* Warmup prediction meter */}
            {phase === 'warmup' && !isFlipping && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-amber-200 shadow-md">
                <p className="text-sm font-bold text-amber-800 mb-3">🎯 Warm-Up Prediction — What will this flip be?</p>
                <div className="flex gap-3">
                  <button onClick={() => setWarmupPrediction('heads')}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${warmupPrediction === 'heads' ? 'bg-amber-500 text-white border-amber-500 shadow-lg scale-105' : 'bg-white text-amber-700 border-amber-200 hover:border-amber-400'}`}>
                    🪙 Heads
                  </button>
                  <button onClick={() => setWarmupPrediction('tails')}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${warmupPrediction === 'tails' ? 'bg-gray-500 text-white border-gray-500 shadow-lg scale-105' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                    🪙 Tails
                  </button>
                </div>
                {warmupPrediction && <p className="text-xs text-amber-600 mt-2 text-center">✅ Prediction locked! Now flip the coin!</p>}
                <p className="text-xs text-gray-500 text-center mt-2">{WARMUP_COUNT - warmupFlips} free flips remaining — no questions yet!</p>
              </div>
            )}

            {/* Game Area */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 lg:mb-10">
                  <Coin side={side} isFlipping={isFlipping} onClick={tossCoin} />
                  <div className="hidden lg:block absolute -top-6 -right-6 w-12 h-12 bg-yellow-400/20 rounded-full animate-ping" />
                  <div className="hidden lg:block absolute -bottom-6 -left-6 w-10 h-10 bg-blue-400/20 rounded-full animate-pulse" />
                </div>

                <button
                  onClick={tossCoin}
                  disabled={isFlipping || showModal || (phase === 'warmup' && warmupPrediction === null)}
                  className={`group relative w-full lg:w-auto px-8 lg:px-14 py-4 lg:py-5 text-lg lg:text-2xl font-bold text-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${isFlipping || showModal || (phase === 'warmup' && warmupPrediction === null)
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:shadow-3xl'}`}>
                  <div className="relative z-10 flex items-center justify-center gap-2 lg:gap-3">
                    {isFlipping ? (
                      <><RefreshCw className="animate-spin" size={20} /><span className="animate-pulse">Flipping...</span></>
                    ) : (
                      <><Sparkles size={20} /><span>Toss Coin {phase === 'warmup' ? '(Free!)' : ''}</span><ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <div className="mt-4 lg:mt-6 text-center">
                  {phase === 'warmup' ? (
                    <p className="text-xs lg:text-sm text-orange-600 font-semibold">🔥 Warm-up mode — explore freely! Questions start after {WARMUP_COUNT} flips.</p>
                  ) : (
                    <div className="inline-flex items-center gap-1 lg:gap-2 text-xs lg:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                      <Target size={12} className="text-blue-600" />
                      <span className="text-gray-600">Questions: <strong>{questionsAskedCount}/{MAX_QUESTIONS}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats & Analytics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                <BarChart className="text-blue-600" size={20} /> Live Statistics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Distribution</h3>
                  <div className="space-y-3 lg:space-y-4">
                    <div>
                      <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-1">
                        <span>Heads ({headsPercentage}%)</span><span>{stats.heads}</span>
                      </div>
                      <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${headsPercentage}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-1">
                        <span>Tails ({tailsPercentage}%)</span><span>{stats.tails}</span>
                      </div>
                      <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-500" style={{ width: `${tailsPercentage}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Summary</h3>
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 lg:p-4 rounded-xl lg:rounded-2xl text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-blue-700">{stats.total}</div>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">Total Flips</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 lg:p-4 rounded-xl lg:rounded-2xl text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-green-700">{score}</div>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">Correct</p>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl lg:rounded-2xl">
                    <p className="text-xs lg:text-sm text-gray-600"><span className="font-semibold">Expected:</span> 50% Heads, 50% Tails</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">

            {/* Learning Progress Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Progress</h2>
                <div className="flex items-center gap-1 lg:gap-2">
                  <Trophy className="text-amber-500" size={18} />
                  <span className="text-sm font-semibold text-amber-600">{score} pts</span>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                    <span>Learning Journey</span>
                    <span className="font-semibold">{questionsAskedCount}/{MAX_QUESTIONS}</span>
                  </div>
                  <div className="h-2 lg:h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden">
                    <div className={`h-full ${getProgressColor()} transition-all duration-500`} style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-1 lg:mt-2 text-xs text-gray-500"><span>Start</span><span>Complete</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <TrendingUp className="text-blue-600 mb-1 lg:mb-2" size={16} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">{difficulty.toUpperCase()}</div>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <Target className="text-purple-600 mb-1 lg:mb-2" size={16} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">
                      {questionsAskedCount > 0 ? Math.round((score / questionsAskedCount) * 100) : 0}%
                    </div>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl lg:rounded-2xl border border-blue-100">
                  <p className="text-xs lg:text-sm text-gray-700"><span className="font-semibold text-blue-600">How it works:</span> Answer questions to level up!</p>
                  <div className="flex items-center justify-between mt-2 lg:mt-3 text-xs">
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'easy' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}>Easy</span>
                    <div className="w-6 lg:w-8 h-px bg-gray-300" />
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'text-gray-500'}`}>Med</span>
                    <div className="w-6 lg:w-8 h-px bg-gray-300" />
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'text-gray-500'}`}>Hard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Probability Info Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">Probability Facts</h2>
              <div className="space-y-3 lg:space-y-4">
                <div className="p-3 lg:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Theoretical Probability</p>
                  <p className="text-xs text-gray-600 mt-1">Exactly 50% chance for heads or tails</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Law of Large Numbers</p>
                  <p className="text-xs text-gray-600 mt-1">More flips = closer to 50/50</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Independent Events</p>
                  <p className="text-xs text-gray-600 mt-1">Past flips don't affect future ones</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-6 lg:pb-8 mt-6 lg:mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">ProbX Coin Lab</p>
                  <p className="text-xs text-gray-500">Interactive probability learning</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">{stats.total}</p>
                  <span className="text-xs text-gray-400">Flips</span>
                  <div className="w-px h-4 bg-gray-300" />
                  <p className="text-sm font-medium text-gray-700">{questionsAskedCount}/{MAX_QUESTIONS}</p>
                  <span className="text-xs text-gray-400">Qs</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Question Modal */}
      {showModal && currentQuestion && (
        <QuestionModal questionData={currentQuestion} onClose={handleCloseModal} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default CoinToss;
