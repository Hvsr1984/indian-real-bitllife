import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ChoiceModal: React.FC = () => {
  const activeEvent = useGameStore((state) => state.activeEvent);
  const handleChoice = useGameStore((state) => state.handleChoice);

  if (!activeEvent) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-lg glass-card p-6 border-t-2 border-luxury-goldText bg-opacity-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-yellow-500 bg-opacity-5 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center gap-3 border-b border-luxury-border pb-3">
            <span className="text-3xl p-2 bg-luxury-panel border border-luxury-border rounded-xl shadow-inner select-none">
              {activeEvent.emoji || '❓'}
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-100 uppercase tracking-wide">
                {activeEvent.title}
              </h2>
              <p className="text-[10px] text-gold-500 font-bold uppercase tracking-widest">Decision Card</p>
            </div>
          </div>

          {/* Scenario Description */}
          <div className="text-sm md:text-base text-gray-300 leading-relaxed py-2 select-text font-medium bg-black bg-opacity-20 p-4 rounded-xl border border-luxury-border">
            {activeEvent.description}
          </div>

          {/* Choice Options Buttons */}
          <div className="flex flex-col gap-2.5 mt-2">
            {activeEvent.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleChoice(option)}
                className="w-full text-left text-xs md:text-sm bg-luxury-panel hover:bg-zinc-800 border border-luxury-border hover:border-luxury-goldBorder text-gray-200 hover:text-gold-400 p-3.5 rounded-xl transition-all duration-200 transform hover:translate-x-1 flex items-center justify-between gap-3 group"
              >
                <span>{option.text}</span>
                <span className="text-gray-600 group-hover:text-luxury-goldText text-xs font-bold transition">➔</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
