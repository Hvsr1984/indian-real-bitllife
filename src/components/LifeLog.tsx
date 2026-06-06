import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';

export const LifeLog: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  const biography = player?.biography || [];

  // Scroll to bottom on updates
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [biography.length]);

  return (
    <div className="w-full flex-grow glass-card p-5 border border-luxury-border flex flex-col h-[320px] md:h-[400px]">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 border-b border-luxury-border pb-1.5 flex items-center justify-between select-none">
        <span>Timeline Logs</span>
        <span className="text-[10px] text-gold-500 font-bold bg-luxury-panel px-2 py-0.5 rounded border border-luxury-border">
          Generation {player?.generation || 1}
        </span>
      </h3>
      
      {/* Scroll area */}
      <div className="flex-grow overflow-y-auto pr-2 flex flex-col gap-3 relative pl-4 border-l border-luxury-goldBorder border-opacity-35 select-text">
        <AnimatePresence initial={false}>
          {biography.length === 0 ? (
            <div className="text-gray-500 text-xs text-center my-auto italic select-none">
              Life timeline is empty. Press "Age Up" to start.
            </div>
          ) : (
            biography.map((log, index) => {
              // Parse out first character emoji if it exists, otherwise use bullet point
              const firstChar = Array.from(log)[0];
              const isEmoji = /\p{Emoji}/u.test(firstChar) && !/\d/.test(firstChar);
              const emoji = isEmoji ? firstChar : '📝';
              const textContent = isEmoji ? log.substring(firstChar.length).trim() : log;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-start gap-3 text-xs md:text-sm text-gray-300 leading-relaxed group"
                >
                  {/* Timeline Node dot */}
                  <span className="absolute left-[-5px] w-2.5 h-2.5 rounded-full bg-luxury-goldText border border-luxury-bg shadow-[0_0_5px_rgba(212,175,55,0.8)] group-hover:scale-125 transition-transform" />
                  
                  {/* Emoji Icon bubble */}
                  <span className="text-base select-none bg-luxury-panel border border-luxury-border p-1 rounded-lg w-8 h-8 flex items-center justify-center shrink-0 shadow-sm">
                    {emoji}
                  </span>
                  
                  {/* Event Text */}
                  <div className="flex-grow pt-0.5 select-text">
                    <span className="text-gray-200 font-medium">{textContent}</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>
    </div>
  );
};
