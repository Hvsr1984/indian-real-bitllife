import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { StatsPanel } from './StatsPanel';
import { LifeLog } from './LifeLog';
import { ChoiceModal } from './ChoiceModal';
import { DeathScreen } from './DeathScreen';
import { HallOfFame } from './HallOfFame';
import { Layout } from './Layout';

// Tabs
import { OccupationTab } from './tabs/OccupationTab';
import { RelationshipsTab } from './tabs/RelationshipsTab';
import { AssetsTab } from './tabs/AssetsTab';
import { SocialTab } from './tabs/SocialTab';
import { ActivitiesTab } from './tabs/ActivitiesTab';
import { AchievementsTab } from './tabs/AchievementsTab';

import { motion } from 'framer-motion';
import { Briefcase, Users, Landmark, Share2, Compass, Trophy, Award, Zap, HelpCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const startNewLife = useGameStore((state) => state.startNewLife);
  const ageUp = useGameStore((state) => state.ageUp);
  const loadGame = useGameStore((state) => state.loadGame);

  const [activeTab, setActiveTab] = useState<'occupation' | 'relationships' | 'assets' | 'social' | 'activities' | 'achievements' | 'hall_of_fame'>('occupation');
  
  // Character Creation Form state
  const [customName, setCustomName] = useState('');
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female'>('Male');

  useEffect(() => {
    loadGame();
  }, []);

  const handleStartLife = (e: React.FormEvent) => {
    e.preventDefault();
    startNewLife(selectedGender, customName.trim() || undefined);
  };

  // 1. CHARACTER CREATION SCREEN
  if (!player) {
    return (
      <Layout>
        <div className="w-full max-w-md mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6 border-t-2 border-luxury-goldText bg-opacity-95 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col gap-6"
          >
            <div className="text-center border-b border-luxury-border pb-4">
              <span className="text-4xl select-none">👶</span>
              <h2 className="text-xl font-bold uppercase tracking-widest text-gold-400 mt-2">Start a New Life</h2>
              <p className="text-xs text-gray-500 mt-0.5">Customize your character details to begin the simulation.</p>
            </div>

            <form onSubmit={handleStartLife} className="flex flex-col gap-4">
              {/* Gender */}
              <div className="flex flex-col gap-1.5 select-none">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Select Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Male', 'Female'] as const).map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => setSelectedGender(gender)}
                      className={`py-3 rounded-xl border text-xs font-bold transition ${
                        selectedGender === gender
                          ? 'bg-yellow-600 bg-opacity-25 border-yellow-500 text-yellow-300'
                          : 'bg-luxury-panel border-luxury-border text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {gender === 'Male' ? '👦 Male' : '👧 Female'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Custom Full Name (Optional)</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="bg-black bg-opacity-40 border border-luxury-border p-3 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                />
                <p className="text-[9px] text-gray-500 italic">Leave empty to randomize regional name in India.</p>
              </div>

              <button
                type="submit"
                className="btn-gold py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest w-full mt-3 flex items-center justify-center gap-1.5"
              >
                👶 Start Life Simulation
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // 2. OBITUARY / DEATH SCREEN
  if (player.isDead) {
    return (
      <Layout>
        <DeathScreen />
      </Layout>
    );
  }

  // 3. MAIN GAME SCREEN
  return (
    <Layout>
      <div className="w-full flex flex-col gap-6">
        {/* Vitals Stats bar panel */}
        <StatsPanel player={player} />

        {/* Dashboard Grid layout */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left: Life chronological Log logs list */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <LifeLog />
          </div>

          {/* Right: Selected Tab Interaction options panel */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="w-full flex-grow glass-card p-5 border border-luxury-border flex flex-col h-[400px] lg:h-auto overflow-y-auto">
              {activeTab === 'occupation' && <OccupationTab />}
              {activeTab === 'relationships' && <RelationshipsTab />}
              {activeTab === 'assets' && <AssetsTab />}
              {activeTab === 'social' && <SocialTab />}
              {activeTab === 'activities' && <ActivitiesTab />}
              {activeTab === 'achievements' && <AchievementsTab />}
              {activeTab === 'hall_of_fame' && <HallOfFame />}
            </div>
          </div>
        </div>

        {/* Center: AGE UP control button */}
        <div className="flex justify-center items-center py-2 select-none relative z-20">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={ageUp}
            className="fixed bottom-24 right-4 lg:relative lg:bottom-0 lg:right-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-luxury-card lg:bg-luxury-goldGlow border-2 border-luxury-goldText flex flex-col items-center justify-center gap-1 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] hover:scale-105 transition-all text-gold-400 select-none group cursor-pointer z-45"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest group-hover:text-gold-200 transition">Age Up</span>
            <span className="text-sm font-black text-gold-400 group-hover:scale-110 transition-transform">Age {player.age + 1}</span>
            <span className="text-xs group-hover:scale-110 transition-transform">🎂</span>
          </motion.button>
        </div>

        {/* Bottom Dock Navigation Tabs */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 glass-card bg-luxury-card bg-opacity-95 rounded-t-2xl rounded-b-none border-t border-x-0 border-b-0 py-2 px-3 flex justify-between items-center shadow-2xl gap-1 md:gap-2 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-10 lg:rounded-2xl lg:border lg:py-2 lg:px-3 lg:shadow-lg lg:bg-opacity-90 lg:m-0">
          {[
            { id: 'occupation', label: 'Work', icon: <Briefcase size={15} /> },
            { id: 'relationships', label: 'Family', icon: <Users size={15} /> },
            { id: 'assets', label: 'Assets', icon: <Landmark size={15} /> },
            { id: 'social', label: 'Social', icon: <Share2 size={15} /> },
            { id: 'activities', label: 'Leisure', icon: <Compass size={15} /> },
            { id: 'achievements', label: 'Badges', icon: <Trophy size={15} /> },
            { id: 'hall_of_fame', label: 'Trophies', icon: <Award size={15} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 py-1 rounded-xl flex-1 transition-all select-none ${
                activeTab === tab.id
                  ? 'text-gold-400 font-bold bg-luxury-panel bg-opacity-35 scale-105 border border-luxury-border'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              <span className="text-sm md:text-base">{tab.icon}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-wider truncate max-w-full">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Pop up Decision choice cards */}
      <ChoiceModal />
    </Layout>
  );
};
