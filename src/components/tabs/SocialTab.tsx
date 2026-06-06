import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SocialPlatforms } from '../../types/game';
import { MessageSquare, Heart, Users, Sparkles, Send, Megaphone, DollarSign } from 'lucide-react';

export const SocialTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const postSocialMedia = useGameStore((state) => state.postSocialMedia);
  const runSocialAds = useGameStore((state) => state.runSocialAds);
  const unlockAchievement = useGameStore((state) => state.unlockAchievement);

  const [activePlatform, setActivePlatform] = useState<keyof SocialPlatforms>('instagram');
  const [adBudget, setAdBudget] = useState<number>(50000); // default ₹50k

  if (!player) return null;

  if (player.age < 13) {
    return (
      <div className="glass-card p-8 border border-luxury-border flex flex-col items-center justify-center text-center gap-4 py-16">
        <span className="text-5xl select-none animate-pulse-slow">📱</span>
        <h3 className="text-lg font-extrabold text-gray-200 uppercase tracking-wide">Age Restriction (COPPA)</h3>
        <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
          Digital safety guidelines and national policies require individuals to be at least 13 years old to open social media accounts and manage digital profiles.
        </p>
        <div className="text-[10px] text-yellow-500 font-semibold px-4 py-2 bg-yellow-950 bg-opacity-40 border border-yellow-800 border-opacity-35 rounded-xl mt-2 select-none">
          ⏳ Available in {13 - player.age} years (at Age 13)
        </div>
      </div>
    );
  }

  const { socialMedia, stats, career } = player;

  // Format money helper
  const formatMoney = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const getPlatformIcon = (platform: keyof SocialPlatforms) => {
    switch (platform) {
      case 'instagram': return '📸';
      case 'youtube': return '🎥';
      case 'x': return '🐦';
      case 'linkedin': return '💼';
    }
  };

  const currentAcc = socialMedia[activePlatform];

  const handlePost = (type: string) => {
    postSocialMedia(activePlatform, type);
  };

  // Sign brand endorsements if famous
  const isFamous = stats.fame > 15 || career.type === 'Cricket' || career.type === 'Bollywood';
  const handleEndorsement = () => {
    if (!player) return;
    const payout = Math.round(stats.fame * 120000); // ₹1.2 Lakh per fame percentage
    const updated = { ...player };
    updated.stats.money += payout;
    updated.biography.push(`💸 Signed a commercial endorsement contract with a national clothing brand. Payout: ${formatMoney(payout)}.`);
    
    // Check sponsorship achievement
    if (payout >= 50000000) {
      setTimeout(() => unlockAchievement('SponsorshipKing'), 100);
    }

    useGameStore.setState({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    
    // Alert via fake popup event
    useGameStore.setState({
      activeEvent: {
        id: `endorsement_${Date.now()}`,
        title: '📸 Brand Endorsement Signed!',
        description: `You shot a commercial TV ad. The brand paid you ${formatMoney(payout)} for your endorsement contract!`,
        emoji: '💸',
        options: [{ text: 'Splendid!', effects: { logText: `Shot a brand TV ad.` } }]
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Fame actions banner if famous */}
      {isFamous && (
        <div className="glass-card p-5 border border-yellow-600 bg-yellow-950 bg-opacity-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse-slow">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 bg-yellow-950 bg-opacity-35 rounded-xl border border-yellow-800 border-opacity-40 text-yellow-400 select-none animate-bounce">
              🌟
            </span>
            <div>
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wide">Celebrity Endorsement Contract</h4>
              <p className="text-xs text-yellow-400">Your fame enables brand sponsorships and commercial shoots.</p>
            </div>
          </div>
          <button
            onClick={handleEndorsement}
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition"
          >
            <DollarSign size={14} /> Sign Brand Contract ({formatMoney(stats.fame * 120000)})
          </button>
        </div>
      )}

      {/* Social Platforms selections */}
      <div className="grid grid-cols-4 gap-2">
        {(['instagram', 'youtube', 'x', 'linkedin'] as const).map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition select-none ${
              activePlatform === platform
                ? 'bg-luxury-panel border-luxury-goldBorder text-gold-400 font-bold'
                : 'bg-zinc-900 border-luxury-border text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-xl">{getPlatformIcon(platform)}</span>
            <span className="text-[10px] uppercase tracking-wider">{platform}</span>
          </button>
        ))}
      </div>

      {/* Selected Platform dashboard details */}
      <div className="glass-card p-5 border border-luxury-border flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-luxury-border pb-3">
          <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wide flex items-center gap-2">
            <span>{getPlatformIcon(activePlatform)}</span>
            <span>{activePlatform} Profile analytics</span>
          </h4>
          <span className="text-xs text-gray-500">Posts: {currentAcc.postsCount} posts</span>
        </div>

        {/* Analytics stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-40 p-3 rounded-xl border border-luxury-border text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">Followers / Subs</p>
            <p className="text-lg font-bold text-gray-100 mt-1">{currentAcc.followers.toLocaleString()}</p>
          </div>
          <div className="bg-black bg-opacity-40 p-3 rounded-xl border border-luxury-border text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">Avg Engagement</p>
            <p className="text-lg font-bold text-gray-100 mt-1">{currentAcc.engagement.toFixed(1)}%</p>
          </div>
        </div>

        {/* Action controllers */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={14} className="text-gold-500" /> Create Content
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => handlePost('vlog')}
                className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition text-center"
              >
                📸 Share Vlog/Selfie
              </button>
              <button
                onClick={() => handlePost('funny')}
                className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition text-center"
              >
                🎥 Upload Comedy Reel
              </button>
              <button
                onClick={() => handlePost('tech')}
                className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition text-center"
              >
                💻 Write Tech / Career Post
              </button>
              <button
                onClick={() => handlePost('opinion')}
                className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition text-center"
              >
                🔥 Post controversial opinion
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-luxury-border pt-4">
            <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone size={14} className="text-blue-400" /> Paid Advertising
            </h5>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow w-full">
                <label className="text-[10px] text-gray-500 block mb-1">Marketing Budget: {formatMoney(adBudget)}</label>
                <input
                  type="range"
                  min={10000}
                  max={5000000} // Up to 50 Lakhs
                  step={10000}
                  value={adBudget}
                  onChange={(e) => setAdBudget(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
              </div>
              <button
                onClick={() => runSocialAds(activePlatform, adBudget)}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold shrink-0 w-full md:w-auto justify-center flex items-center gap-1.5"
              >
                <Send size={12} /> Run Ad Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
