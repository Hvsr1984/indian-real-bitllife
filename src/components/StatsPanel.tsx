import React from 'react';
import { Player, PlayerStats } from '../types/game';
import { VisualAvatar } from './VisualAvatar';
import { MapPin, Briefcase, GraduationCap, Award, Crown, Zap } from 'lucide-react';

interface StatsPanelProps {
  player: Player;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ player }) => {
  const { name, age, currentCity, currentCountry, wealthClass, stats, traits, career, education } = player;

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

  // Determine fame tier
  let fameTier = 'Unknown';
  if (stats.fame >= 90) fameTier = 'Global Icon 🌌';
  else if (stats.fame >= 70) fameTier = 'National Celebrity 🌟';
  else if (stats.fame >= 55) fameTier = 'Regional Star ⭐';
  else if (stats.fame >= 35) fameTier = 'Local Celebrity 📣';

  // Stats configs
  const statList = [
    { label: 'Health', value: stats.health, color: 'from-emerald-600 to-green-500', icon: '❤️' },
    { label: 'Happiness', value: stats.happiness, color: 'from-amber-500 to-yellow-400', icon: '😊' },
    { label: 'Intelligence', value: stats.intelligence, color: 'from-blue-600 to-cyan-500', icon: '🧠' },
    { label: 'Fitness', value: stats.fitness, color: 'from-orange-600 to-amber-500', icon: '🏋️' },
    { label: 'Reputation', value: stats.reputation, color: 'from-purple-600 to-pink-500', icon: '🎖️' }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Profile Card */}
      <div className="flex-grow md:w-1/3 glass-card p-5 flex flex-col items-center border border-luxury-border shadow-2xl relative overflow-hidden">
        {/* Glow overlay for royals */}
        {wealthClass === 'Royal Family' && (
          <div className="absolute inset-0 bg-yellow-500 bg-opacity-5 pointer-events-none border border-yellow-500 border-opacity-30 rounded-2xl animate-pulse" />
        )}

        <VisualAvatar player={player} size={110} />

        {/* Name and Age */}
        <h2 className="mt-3 text-lg font-bold text-gray-100 flex items-center gap-1.5 text-center">
          {name}
          {wealthClass === 'Royal Family' && <Crown size={16} className="text-yellow-400" />}
        </h2>
        <p className="text-xs text-gold-500 font-bold uppercase tracking-wider">Age {age} • {player.gender}</p>

        {/* Net Worth */}
        <div className="mt-3 bg-black bg-opacity-40 px-4 py-2 rounded-xl border border-luxury-border w-full text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Bank Balance</p>
          <p className={`text-lg font-extrabold tracking-wide ${stats.money >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatMoney(stats.money)}
          </p>
        </div>

        {/* Current status info */}
        <div className="mt-4 w-full flex flex-col gap-2.5 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold-500" />
            <span>{currentCity}, {currentCountry}</span>
          </div>

          <div className="flex items-center gap-2">
            {career.type !== 'None' ? (
              <>
                <Briefcase size={14} className="text-blue-400" />
                <span className="truncate">{career.name} {career.job ? `(${career.job.name})` : ''}</span>
              </>
            ) : education.stage !== 'Finished' ? (
              <>
                <GraduationCap size={14} className="text-purple-400" />
                <span className="truncate">
                  {education.stage === 'College' ? education.currentDegree : `${education.stage} School`}
                </span>
              </>
            ) : (
              <>
                <Briefcase size={14} className="text-gray-500" />
                <span className="text-gray-500">Unemployed</span>
              </>
            )}
          </div>

          {/* Fame Tag */}
          {stats.fame > 10 && (
            <div className="flex items-center gap-2">
              <Award size={14} className="text-yellow-500 animate-pulse" />
              <span className="font-semibold text-yellow-400">Status: {fameTier}</span>
            </div>
          )}
        </div>

        {/* Traits Badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 w-full">
          {traits.map((trait) => (
            <span
              key={trait}
              className="text-[10px] bg-luxury-panel border border-luxury-border px-2.5 py-1 rounded-full text-gold-300 font-bold uppercase tracking-wider flex items-center gap-1 hover:border-gold-700 transition cursor-help"
              title="Personality modifier active"
            >
              <Zap size={8} /> {trait}
            </span>
          ))}
          <span
            className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
              wealthClass === 'Royal Family'
                ? 'bg-yellow-950 border border-yellow-500 text-yellow-300'
                : 'bg-luxury-panel border border-luxury-border text-gray-400'
            }`}
          >
            🏰 {wealthClass}
          </span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="flex-grow md:w-2/3 glass-card p-5 flex flex-col justify-between gap-4 border border-luxury-border shadow-2xl">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2 border-b border-luxury-border pb-1.5">
          Vitals Dashboard
        </h3>
        
        <div className="flex flex-col gap-4 flex-grow justify-center">
          {statList.map((stat) => (
            <div key={stat.label} className="w-full flex items-center justify-between gap-4">
              <div className="w-24 text-xs font-semibold text-gray-300 flex items-center gap-1.5 select-none">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
              <div className="flex-grow bg-black bg-opacity-50 h-3 rounded-full overflow-hidden border border-luxury-border p-0.5 relative">
                {/* Visual bar gradient */}
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.1)]`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
              <div className="w-8 text-right text-xs font-bold text-gold-400 select-none">
                {stat.value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
