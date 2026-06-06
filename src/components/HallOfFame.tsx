import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Award, Landmark, Calendar } from 'lucide-react';

export const HallOfFame: React.FC = () => {
  const hallOfFame = useGameStore((state) => state.hallOfFame);

  // Format money helper
  const formatMoney = (val: number): string => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    if (absVal >= 10000000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Cr`;
    } else if (absVal >= 100000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 100000).toFixed(2)} L`;
    }
    return `${isNeg ? '-' : ''}₹${absVal.toLocaleString('en-IN')}`;
  };

  // Sort by net worth descending
  const sortedRecords = [...hallOfFame].sort((a, b) => b.netWorth - a.netWorth);

  return (
    <div className="flex flex-col gap-5">
      <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-yellow-950 bg-opacity-25 rounded-xl border border-yellow-850 border-opacity-40 text-yellow-400 select-none">
            🌌
          </span>
          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Hall of Fame Scoreboard</h4>
            <p className="text-xs text-gray-400">Records of your top completed life runs in this browser.</p>
          </div>
        </div>
        <span className="text-xs font-bold text-gold-500 bg-luxury-panel px-3 py-1.5 rounded-full border border-luxury-border">
          Total Completed Runs: {hallOfFame.length}
        </span>
      </div>

      {sortedRecords.length === 0 ? (
        <div className="p-10 text-center text-gray-500 text-xs italic border border-luxury-border rounded-xl">
          🌌 No records found. Complete a life run (die or restart) to post statistics here.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedRecords.map((rec, idx) => (
            <div
              key={rec.id}
              className="glass-card p-4 border border-luxury-border hover:border-luxury-goldBorder transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-xl font-bold bg-luxury-panel border border-luxury-border text-gold-400 w-8 h-8 rounded-lg flex items-center justify-center select-none shrink-0 shadow-inner">
                  #{idx + 1}
                </span>
                <div>
                  <h5 className="text-sm font-bold text-gray-200">{rec.name}</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{rec.biographySummary}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={10} /> Age: {rec.age} yrs</span>
                    <span className="flex items-center gap-1"><Award size={10} /> Career: {rec.careerSummary}</span>
                    <span className="flex items-center gap-1"><Trophy size={10} /> Achievements: {rec.achievementsCount}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-luxury-border flex md:flex-col justify-between items-center md:items-end">
                <p className="text-[9px] text-gray-500 uppercase">Final Net Worth</p>
                <p className="text-sm font-extrabold text-green-400">{formatMoney(rec.netWorth)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
