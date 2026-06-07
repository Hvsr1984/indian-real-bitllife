import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { RotateCcw } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const newsTicker = useGameStore((state) => state.newsTicker);
  const resetAll = useGameStore((state) => state.resetAll);

  return (
    <div className="relative min-h-screen bg-luxury-bg text-gray-200 flex flex-col font-sans overflow-hidden">
      {/* Background glow orbs for high-fidelity AAA design */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[50%] rounded-full glow-circle-1 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[50%] rounded-full glow-circle-2 pointer-events-none z-0" />
      
      {/* Header Bar */}
      <header className="relative w-full z-10 glass-card rounded-none border-t-0 border-x-0 bg-opacity-80 py-3 px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-md">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wider text-gold-gradient uppercase flex items-center gap-2">
            🇮🇳 BitLife India
            <span className="text-[10px] bg-yellow-600 bg-opacity-30 text-yellow-300 font-semibold px-2 py-0.5 rounded border border-yellow-600 uppercase tracking-widest">
              Next-Gen
            </span>
          </h1>
          <button
            onClick={() => {
              if (window.confirm('Restart life from scratch? All progress in current run will be lost.')) {
                resetAll();
                window.location.reload();
              }
            }}
            className="md:hidden p-1.5 rounded-lg border border-red-900 bg-red-950 bg-opacity-20 hover:bg-opacity-50 text-red-400 transition"
            title="Restart Game"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Global Reset Action for desktop */}
        <button
          onClick={() => {
            if (window.confirm('Restart life from scratch? All progress in current run will be lost.')) {
              resetAll();
              window.location.reload();
            }
          }}
          className="hidden md:flex items-center gap-2 text-xs border border-red-900 bg-red-950 bg-opacity-20 hover:bg-opacity-50 text-red-400 px-3 py-1.5 rounded-lg transition"
        >
          <RotateCcw size={13} />
          Restart Simulation
        </button>
      </header>

      {/* World News Banner Ticker */}
      <div className="relative w-full z-10 bg-black bg-opacity-60 border-b border-luxury-border py-1.5 overflow-hidden flex items-center">
        <span className="absolute left-0 top-0 bottom-0 bg-yellow-600 bg-opacity-20 text-yellow-400 font-bold text-[10px] uppercase tracking-wider flex items-center px-3 z-20 border-r border-luxury-border shadow-md">
          LIVE NEWS
        </span>
        <div className="w-full pl-24 overflow-hidden">
          <div className="animate-ticker text-xs font-medium text-yellow-100 flex items-center gap-8">
            {newsTicker.map((news, idx) => (
              <span key={idx} className="mr-8 flex items-center gap-2">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="relative flex-grow w-full max-w-6xl mx-auto px-4 pt-4 pb-28 md:py-6 flex flex-col z-10 overflow-y-auto">
        {children}
      </main>

      {/* Footer bar */}
      <footer className="relative w-full z-10 text-center py-4 border-t border-luxury-border bg-black bg-opacity-40 text-gray-500 text-xs mt-auto">
        © 2026 BitLife India Simulator. Built for high fidelity, realistic economics & unlimited replays.
      </footer>
    </div>
  );
};
