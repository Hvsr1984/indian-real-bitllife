import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ACHIEVEMENTS } from '../../data/achievements';
import { Trophy, Award, Landmark, GraduationCap, Heart, Sparkles } from 'lucide-react';

export const AchievementsTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const [filter, setFilter] = useState<'all' | 'academic' | 'career' | 'wealth' | 'fame' | 'family' | 'misc'>('all');

  if (!player) return null;

  const unlocked = player.achievements || [];
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  const unlockedCount = unlocked.length;
  const percentComplete = Math.round((unlockedCount / totalAchievements) * 100);

  const categories = [
    { id: 'all', label: 'All', icon: <Trophy size={12} /> },
    { id: 'academic', label: 'Study', icon: <GraduationCap size={12} /> },
    { id: 'career', label: 'Careers', icon: <Award size={12} /> },
    { id: 'wealth', label: 'Wealth', icon: <Landmark size={12} /> },
    { id: 'fame', label: 'Fame', icon: <Sparkles size={12} /> },
    { id: 'family', label: 'Family', icon: <Heart size={12} /> }
  ] as const;

  const filteredAchievements = Object.values(ACHIEVEMENTS).filter(
    (ach) => filter === 'all' || ach.category === filter
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Achievements stats progress card */}
      <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-yellow-950 bg-opacity-25 rounded-xl border border-yellow-850 border-opacity-40 text-yellow-400 select-none">
            🏆
          </span>
          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Trophy Room Milestones</h4>
            <p className="text-xs text-gray-400">Unlock special badges by achieving career goals, wealth sizes, and family trees.</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-56 text-xs select-none shrink-0">
          <div className="flex justify-between text-gray-400 font-semibold mb-0.5">
            <span>Unlocked: {unlockedCount} / {totalAchievements}</span>
            <span className="text-gold-400">{percentComplete}% Complete</span>
          </div>
          <div className="w-full bg-black bg-opacity-40 h-3 rounded-full border border-luxury-border p-0.5">
            <div className="bg-gold-gradient h-full rounded-full" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      {/* Filter menu */}
      <div className="flex flex-wrap gap-2 select-none border-b border-luxury-border pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition ${
              filter === cat.id
                ? 'bg-yellow-600 bg-opacity-20 border-yellow-500 text-yellow-400'
                : 'bg-luxury-panel border-luxury-border text-gray-400 hover:text-gray-200'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredAchievements.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border flex gap-3.5 transition duration-300 transform ${
                isUnlocked
                  ? 'glass-card border-yellow-500 border-opacity-35 bg-yellow-950 bg-opacity-5 hover:scale-[1.01] shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                  : 'bg-zinc-900 bg-opacity-30 border-luxury-border opacity-50'
              }`}
            >
              {/* Badge Icon bubble */}
              <span className={`text-2xl w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border select-none ${
                isUnlocked 
                  ? 'bg-yellow-950 border-yellow-600 shadow-inner' 
                  : 'bg-zinc-800 border-zinc-700'
              }`}>
                {ach.emoji}
              </span>

              {/* Text Info */}
              <div className="flex-grow flex flex-col justify-center">
                <h5 className={`text-xs font-bold ${isUnlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {ach.title}
                </h5>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{ach.description}</p>
                {isUnlocked && (
                  <span className="text-[7px] font-extrabold uppercase tracking-widest text-yellow-500 mt-1 select-none">
                    Unveiled 🏆
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
