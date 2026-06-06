import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CITIES } from '../../data/cities';
import { Dumbbell, Heart, Landmark, PlaneTakeoff, Compass, Ticket, Sparkles, Send } from 'lucide-react';

export const ActivitiesTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  
  // Basic activities
  const gymWorkout = useGameStore((state) => state.gymWorkout);
  const meditate = useGameStore((state) => state.meditate);
  const visitDoctor = useGameStore((state) => state.visitDoctor);
  const buyLotteryTicket = useGameStore((state) => state.buyLotteryTicket);

  // Migration actions
  const applyVisa = useGameStore((state) => state.applyVisa);
  const relocateCity = useGameStore((state) => state.relocateCity);

  // UI States
  const [actSection, setActSection] = useState<'daily' | 'migration'>('daily');
  const [destCountry, setDestCountry] = useState<string>('USA');
  const [visaMethod, setVisaMethod] = useState<'Student Visa' | 'Work Visa' | 'Startup Visa' | 'Investor Visa' | 'Marriage Visa'>('Work Visa');
  const [destCity, setDestCity] = useState<string>('Delhi');

  if (!player) return null;

  // Format currency
  const formatMoney = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'UAE', 'Singapore', 'Japan'];
  const visaMethods = ['Student Visa', 'Work Visa', 'Startup Visa', 'Investor Visa', 'Marriage Visa'] as const;

  const domesticCities = Object.keys(CITIES).filter(k => !CITIES[k].isInternational && k !== player.currentCity);

  return (
    <div className="flex flex-col gap-5">
      {/* Sub tabs */}
      <div className="flex border-b border-luxury-border select-none">
        <button
          onClick={() => setActSection('daily')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            actSection === 'daily'
              ? 'border-luxury-goldText text-gold-400'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Compass size={14} /> Personal Care & Leisure
        </button>
        <button
          onClick={() => setActSection('migration')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            actSection === 'migration'
              ? 'border-luxury-goldText text-gold-400'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <PlaneTakeoff size={14} /> Relocation & Migration
        </button>
      </div>

      {/* SECTION 1: DAILY CARE & LEISURE */}
      {actSection === 'daily' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gym Workout */}
          <div className="glass-card p-5 border border-luxury-border flex flex-col justify-between gap-3 group hover:border-luxury-goldBorder transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-emerald-950 bg-opacity-25 rounded-xl border border-emerald-900 border-opacity-40 text-emerald-400 select-none">
                🏋️
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Gold\'s Gym Workout</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Cardio and weight training. Raises Fitness and Health.</p>
              </div>
            </div>
            <button onClick={gymWorkout} className="btn-gold py-2 rounded-xl text-xs font-semibold">
              Work Out (Free)
            </button>
          </div>

          {/* Vipassana Meditation */}
          <div className="glass-card p-5 border border-luxury-border flex flex-col justify-between gap-3 group hover:border-luxury-goldBorder transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-blue-950 bg-opacity-25 rounded-xl border border-blue-900 border-opacity-40 text-blue-400 select-none">
                🧘
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Vipassana Meditation</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Mindfulness and breathing drills. Raises Happiness and Health.</p>
              </div>
            </div>
            <button onClick={meditate} className="btn-gold py-2 rounded-xl text-xs font-semibold">
              Meditate (Free)
            </button>
          </div>

          {/* Visit Hospital */}
          <div className="glass-card p-5 border border-luxury-border flex flex-col justify-between gap-3 group hover:border-luxury-goldBorder transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-red-950 bg-opacity-25 rounded-xl border border-red-900 border-opacity-40 text-red-400 select-none">
                🏥
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Apollo Clinic doctor</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Medical checkup and prescription. Fee: ₹5,000. Heals Health.</p>
              </div>
            </div>
            <button
              onClick={visitDoctor}
              disabled={player.stats.money < 5000}
              className="btn-gold py-2 rounded-xl text-xs font-semibold"
            >
              Consult Doctor (₹5,000)
            </button>
          </div>

          {/* Buy Bumper Lottery */}
          <div className="glass-card p-5 border border-luxury-border flex flex-col justify-between gap-3 group hover:border-luxury-goldBorder transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-yellow-950 bg-opacity-25 rounded-xl border border-yellow-900 border-opacity-40 text-yellow-400 select-none">
                🎰
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide">Diwali Bumper Lottery</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Try your luck! 1.5% chance to win ₹1 Crore jackpot. Ticket: ₹1,000.</p>
              </div>
            </div>
            <button
              onClick={buyLotteryTicket}
              disabled={player.stats.money < 1000}
              className="btn-gold py-2 rounded-xl text-xs font-semibold"
            >
              Buy Ticket (₹1,000)
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: RELOCATION & MIGRATION */}
      {actSection === 'migration' && (
        <div className="flex flex-col gap-6">
          {player.age < 18 ? (
            <div className="glass-card p-8 border border-luxury-border flex flex-col items-center justify-center text-center gap-4 py-16">
              <span className="text-5xl select-none animate-pulse-slow">🚚</span>
              <h3 className="text-lg font-extrabold text-gray-200 uppercase tracking-wide">Migration Restricted</h3>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                Minors cannot relocate to other cities or submit international visa requests independently. You must live under your parent's guardian household.
              </p>
              <div className="text-[10px] text-yellow-500 font-semibold px-4 py-2 bg-yellow-950 bg-opacity-40 border border-yellow-800 border-opacity-35 rounded-xl mt-2 select-none">
                ⏳ Relocation opens in {18 - player.age} years (at Age 18)
              </div>
            </div>
          ) : (
            <>
              {/* International Migration Visa Panel */}
              {player.currentCountry === 'India' ? (
                <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <PlaneTakeoff size={16} className="text-yellow-500" /> Apply Visa Abroad
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Migrate to global financial capitals. Consulates require visa processing fees (₹2.5 Lakhs base) and bank solvency proof.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-gray-500 uppercase">Target Country</label>
                      <select
                        value={destCountry}
                        onChange={(e) => setDestCountry(e.target.value)}
                        className="bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-gray-500 uppercase">Visa Classification</label>
                      <select
                        value={visaMethod}
                        onChange={(e) => setVisaMethod(e.target.value as any)}
                        className="bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                      >
                        {visaMethods.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => applyVisa(destCountry, visaMethod)}
                    className="btn-gold py-2.5 rounded-xl text-xs font-semibold w-full mt-2"
                  >
                    🛂 Submit Visa Application (₹2.5 Lakhs fee)
                  </button>
                </div>
              ) : (
                <div className="glass-card p-5 border border-yellow-600 bg-yellow-950 bg-opacity-5 flex flex-col items-center text-center gap-3">
                  <span className="text-3xl select-none">🌍</span>
                  <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wide">NRI Status: Living Abroad</h4>
                  <p className="text-xs text-yellow-400 max-w-sm">
                    You are currently living in {player.currentCity}, {player.currentCountry} with visa status: "{player.visaStatus}".
                  </p>
                </div>
              )}

              {/* Domestic Relocation Panel */}
              {player.currentCountry === 'India' && (
                <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass size={16} className="text-blue-400" /> Relocate to Another Indian City
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Relocate within India to seek city-specific advantages (e.g. tech boost in Bangalore, Bollywood boost in Mumbai).
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow w-full">
                      <label className="text-[9px] text-gray-500 uppercase block mb-1">Select City</label>
                      <select
                        value={destCity}
                        onChange={(e) => setDestCity(e.target.value)}
                        className="w-full bg-black bg-opacity-40 border border-luxury-border p-2.5 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                      >
                        {domesticCities.map((c) => {
                          const fee = CITIES[c]?.relocationFee || 30000;
                          return (
                            <option key={c} value={c}>
                              {c} (Fee: {formatMoney(fee)})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button
                      onClick={() => relocateCity(destCity)}
                      className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold shrink-0 w-full md:w-auto justify-center flex items-center gap-1.5"
                    >
                      🚚 Relocate City
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
