import React, { useEffect, useState } from 'react';
import { X, Lightbulb } from 'lucide-react';

const LearningBubble = ({ message, onDismiss, accentColor = 'indigo' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const t = setTimeout(() => setVisible(true), 50);
    // Auto-dismiss after 8 seconds
    const auto = setTimeout(() => handleDismiss(), 8000);
    return () => { clearTimeout(t); clearTimeout(auto); };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 350);
  };

  const colorMap = {
    indigo: { bg: 'from-indigo-600 to-purple-600', light: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800' },
    amber: { bg: 'from-amber-500 to-orange-500', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
    red: { bg: 'from-red-500 to-pink-500', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' },
    green: { bg: 'from-green-500 to-emerald-500', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
  };
  const c = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 transition-all duration-350 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(2rem)', maxWidth: 420, width: 'calc(100% - 2rem)' }}
    >
      <div className={`${c.light} ${c.border} border-2 rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Colored top bar */}
        <div className={`bg-gradient-to-r ${c.bg} px-4 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-2 text-white">
            <Lightbulb size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Did You Know?</span>
          </div>
          <button onClick={handleDismiss} className="text-white/80 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-4">
          <p className={`text-sm font-medium ${c.text} leading-relaxed`}>{message}</p>
        </div>
        {/* Progress bar (auto-dismiss timer) */}
        <div className="h-1 bg-gray-200">
          <div
            className={`h-full bg-gradient-to-r ${c.bg} transition-all`}
            style={{ animation: 'shrink 8s linear forwards' }}
          />
        </div>
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default LearningBubble;
