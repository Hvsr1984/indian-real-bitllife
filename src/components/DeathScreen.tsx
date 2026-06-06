import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Relationship } from '../types/game';
import { Award, Landmark, RefreshCw, Milestone, Users, ChevronRight } from 'lucide-react';

export const DeathScreen: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const startNewLife = useGameStore((state) => state.startNewLife);
  const familyTree = useGameStore((state) => state.familyTree);

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  if (!player || !player.isDead) return null;

  const { name, age, causeOfDeath, wealthClass, stats, realEstate, businesses, relationships, achievements, generation } = player;

  // Format money helper
  const formatMoney = (val: number): string => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    if (absVal >= 10000000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Crore`;
    } else if (absVal >= 100000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 100000).toFixed(2)} Lakh`;
    }
    return `${isNeg ? '-' : ''}₹${absVal.toLocaleString('en-IN')}`;
  };

  // 1. Life Story Generator
  const generateBiographyStory = (): string => {
    // Generate a cohesive summary paragraphs based on achievements, career, and education
    const careerText = player.career.type !== 'None' ? `built a career as a ${player.career.name}` : 'lived a quiet, peaceful life';
    const degreeText = player.education.currentDegree ? `graduated with a degree in ${player.education.currentDegree}` : 'completed primary school';
    const bizText = businesses.length > 0 ? `founded and ran successful ventures including "${businesses[0].name}"` : '';
    const reText = realEstate.length > 0 ? `accumulated a premium real estate portfolio of ${realEstate.length} properties` : '';

    return `You were born in ${player.birthCity} into a ${wealthClass.toLowerCase()} family. During your studies, you ${degreeText}. Later in life, you ${careerText}. Along your journey, you ${bizText} ${bizText && reText ? 'and' : ''} ${reText}. You accumulated a final net worth of ${formatMoney(stats.money)} before passing away due to ${causeOfDeath || 'natural causes'} at the age of ${age}. Your legacy spans ${generation} generation(s).`;
  };

  // Filter living children for legacy mode
  const livingChildren = relationships.filter(
    (r) => r.relation === 'Child' && !r.isDead && r.age >= 18
  );

  const handleRestart = () => {
    startNewLife();
  };

  const handleLegacy = () => {
    if (!selectedChildId) return;
    const childRelation = relationships.find((r) => r.id === selectedChildId);
    if (childRelation) {
      startNewLife(undefined, undefined, childRelation);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-4 animate-fade-in select-text">
      {/* Tombstone Visual Card */}
      <div className="glass-card p-6 border-t-4 border-luxury-goldText bg-opacity-90 flex flex-col items-center gap-4 text-center shadow-2xl relative">
        <div className="text-5xl select-none">🪦</div>
        <h2 className="text-xl font-bold uppercase tracking-widest text-gold-400">Here Lies</h2>
        <h3 className="text-2xl font-extrabold text-gray-100">{name}</h3>
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Age {age} • Generation {generation} Ancestry
        </p>
        <p className="text-sm italic text-gray-400 max-w-sm mt-1">
          "Gone from our sight, but never from our hearts. Rest in peace."
        </p>

        {/* Shareable Summary Card */}
        <div className="mt-4 bg-black bg-opacity-50 p-4 rounded-xl border border-luxury-border w-full text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Shareable Life Summary</p>
          <p className="text-sm md:text-base font-extrabold text-yellow-100 mt-1.5 leading-relaxed">
            "You died at age {age} as a {player.career.type !== 'None' ? player.career.name : 'Citizen'} from {player.currentCity} with a net worth of {formatMoney(stats.money)} and a legacy spanning {generation} generation(s)."
          </p>
        </div>
      </div>

      {/* Dynamic Biography Story */}
      <div className="glass-card p-5 border border-luxury-border flex flex-col gap-3">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 select-none">
          <Milestone size={14} className="text-gold-500" /> Life Biography Story
        </h4>
        <div className="text-sm text-gray-300 leading-relaxed bg-black bg-opacity-25 p-4 rounded-xl border border-luxury-border select-text font-medium">
          {generateBiographyStory()}
        </div>
      </div>

      {/* Life Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Achievements grid */}
        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award size={14} className="text-yellow-500" /> Unlocked Achievements ({achievements.length})
          </h4>
          {achievements.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No achievements unlocked this life.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {achievements.map((id) => (
                <span
                  key={id}
                  className="text-[9px] bg-luxury-panel border border-luxury-border px-2 py-0.5 rounded text-yellow-300 font-bold uppercase tracking-wider"
                >
                  🏆 {id}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Wealth details */}
        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark size={14} className="text-emerald-500" /> Financial Legacy
          </h4>
          <div className="text-xs text-gray-400 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Final Bank Balance:</span>
              <span className="font-bold text-gray-200">{formatMoney(stats.money)}</span>
            </div>
            <div className="flex justify-between">
              <span>Properties Owned:</span>
              <span className="font-bold text-gray-200">{realEstate.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Businesses Owned:</span>
              <span className="font-bold text-gray-200">{businesses.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Mode / Continue as Child */}
      <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
        <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5 select-none">
          <Users size={16} className="text-blue-400" /> Legacy Dynasty Mode
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Transfer your remaining bank balances, titles, properties, and dynasty genealogy to one of your adult children (Age 18+) to continue the family empire.
        </p>

        {livingChildren.length === 0 ? (
          <p className="text-xs text-gray-500 italic border border-dashed border-luxury-border p-4 rounded-xl text-center select-none">
            👶 No eligible adult children (Age 18+) are alive to inherit your legacy.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 uppercase">Select Heir Child</label>
              <select
                value={selectedChildId || ''}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="bg-black bg-opacity-40 border border-luxury-border p-2.5 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600 w-full"
              >
                <option value="">-- Choose child --</option>
                {livingChildren.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Age {c.age})
                  </option>
                ))}
              </select>
            </div>
            {selectedChildId && (
              <button
                onClick={handleLegacy}
                className="btn-gold py-2.5 rounded-xl text-xs font-semibold w-full flex items-center justify-center gap-1.5"
              >
                Continue Legacy as Child <ChevronRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Restart Life Button */}
      <button
        onClick={handleRestart}
        className="w-full bg-luxury-panel hover:bg-zinc-800 border border-luxury-border py-3 rounded-xl text-xs font-semibold text-gold-400 hover:text-gold-300 transition flex items-center justify-center gap-2"
      >
        <RefreshCw size={14} /> Start a Fresh Life (New Character)
      </button>

      {/* Historical Ancestors */}
      {familyTree.length > 0 && (
        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider select-none">Dynasty Ancestor Logs</h4>
          <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1 text-xs">
            {familyTree.map((anc, idx) => (
              <div key={anc.id} className="bg-black bg-opacity-35 border border-luxury-border p-2.5 rounded-lg flex justify-between">
                <div>
                  <p className="font-bold text-gray-200">{anc.name} (Gen {anc.generation})</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Died age {anc.ageAtDeath} • {anc.causeOfDeath} • {anc.careerSummary}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[9px] text-gray-500 uppercase">Final Money</p>
                  <p className="font-bold text-yellow-400">{formatMoney(anc.finalWealth)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
