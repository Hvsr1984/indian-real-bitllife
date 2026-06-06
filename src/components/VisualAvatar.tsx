import React from 'react';
import type { Player } from '../types/game';

interface VisualAvatarProps {
  player: Player;
  size?: number;
}

export const VisualAvatar: React.FC<VisualAvatarProps> = ({ player, size = 120 }) => {
  const { gender, age, wealthClass, stats, career, currentCountry } = player;

  // Overwrite stage
  const currentStage = age < 3 ? 'Baby' : age < 12 ? 'Child' : age < 20 ? 'Teen' : age < 60 ? 'Adult' : 'Elder';

  // Skin tone
  const skin = player.avatar.skinTone || '#e6a172';
  
  // Hair and beard colors
  let hairColor = '#1a1a1a';
  if (currentStage === 'Elder') {
    hairColor = '#cfd2d6'; // Grey hair
  }

  // Draw accessories based on wealth, career, fame
  const isRoyal = wealthClass === 'Royal Family';
  const isFamous = stats.fame > 35;
  const isSDE = career.type === 'Job' && career.name.includes('Software');
  const isDoctor = career.type === 'Job' && career.name.includes('Doctor');
  const isCricketer = career.type === 'Cricket';
  const isActor = career.type === 'Bollywood';
  const isPolitician = career.type === 'Politics';


  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Background radial ring */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-luxury-border"
        style={{ background: 'linear-gradient(135deg, #161622 0%, #0b0b0e 100%)' }}
      >
        {/* Glow Ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bf953f" />
            <stop offset="25%" stopColor="#fcf6ba" />
            <stop offset="50%" stopColor="#b38728" />
            <stop offset="75%" stopColor="#fbf5b7" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin} />
            <stop offset="100%" stopColor={adjustColorBrightness(skin, -20)} />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hairColor} />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>

        {/* 1. Body / Clothes */}
        {currentStage === 'Baby' ? (
          <path d="M25,85 C25,70 75,70 75,85 Z" fill="#60a5fa" /> // Baby blanket
        ) : isCricketer ? (
          <path d="M20,90 C20,70 80,70 80,90 Z" fill="#1e3a8a" /> // India Blue Jersey
        ) : isPolitician ? (
          <path d="M20,90 C20,70 80,70 80,90 Z" fill="#f3f4f6" /> // White Khadi Kurta
        ) : isDoctor ? (
          <path d="M20,90 C20,70 80,70 80,90 Z" fill="#ffffff" /> // Doctor Lab Coat
        ) : isRoyal ? (
          <path d="M20,90 C20,68 80,68 80,90 Z" fill="#7f1d1d" /> // Royal Maroon Robe
        ) : (
          <path d="M20,90 C20,72 80,72 80,90 Z" fill="#1e1b4b" /> // Dark suit / shirt
        )}

        {/* 2. Neck */}
        {currentStage !== 'Baby' && (
          <rect x="45" y="60" width="10" height="15" fill={skin} rx="2" />
        )}

        {/* 3. Face */}
        {currentStage === 'Baby' ? (
          <circle cx="50" cy="50" r="22" fill="url(#skinGrad)" />
        ) : currentStage === 'Child' ? (
          <circle cx="50" cy="48" r="23" fill="url(#skinGrad)" />
        ) : (
          // Teen/Adult/Elder: Shaper jaw
          <path d="M26,42 C26,26 74,26 74,42 C74,58 64,68 50,68 C36,68 26,58 26,42 Z" fill="url(#skinGrad)" />
        )}

        {/* 4. Ears */}
        <circle cx="25" cy="42" r="5" fill={skin} />
        <circle cx="75" cy="42" r="5" fill={skin} />

        {/* Royal Earrings */}
        {isRoyal && (
          <>
            <circle cx="25" cy="47" r="2" fill="url(#goldGrad)" />
            <circle cx="75" cy="47" r="2" fill="url(#goldGrad)" />
          </>
        )}

        {/* 5. Hair */}
        {currentStage === 'Baby' ? (
          // Tuft of hair
          <path d="M48,27 C50,22 53,24 51,28 Z" fill={hairColor} />
        ) : gender === 'Male' ? (
          // Male Haircuts
          currentStage === 'Teen' ? (
            <path d="M24,38 C22,25 78,25 76,38 C70,20 30,20 24,38 Z" fill="url(#hairGrad)" /> // Spiky
          ) : (
            <path d="M24,38 C22,23 78,23 76,38 C72,25 28,25 24,38 Z" fill="url(#hairGrad)" /> // Corporate comb
          )
        ) : (
          // Female Haircuts
          <path d="M24,40 C20,20 80,20 76,40 C80,55 78,70 76,75 C70,30 30,30 24,75 Z" fill="url(#hairGrad)" />
        )}

        {/* 6. Eyes */}
        <circle cx="42" cy="42" r="3" fill="#1a1a1a" />
        <circle cx="58" cy="42" r="3" fill="#1a1a1a" />
        <circle cx="43" cy="41" r="1" fill="#ffffff" />
        <circle cx="59" cy="41" r="1" fill="#ffffff" />

        {/* Eyebrows */}
        <path d="M37,36 Q42,34 47,37" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        <path d="M53,37 Q58,34 63,36" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />

        {/* 7. Nose */}
        <path d="M49,44 L51,44 L50,48 Z" fill="#000000" opacity="0.15" />

        {/* 8. Mouth / Smile */}
        {currentStage === 'Baby' ? (
          // Pacifier
          <circle cx="50" cy="54" r="5" fill="#f43f5e" />
        ) : stats.happiness < 40 ? (
          // Sad mouth
          <path d="M43,58 Q50,54 57,58" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        ) : (
          // Smile
          <path d="M43,54 Q50,60 57,54" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        )}

        {/* 9. Beard for males (Adult/Elder) */}
        {gender === 'Male' && currentStage !== 'Baby' && currentStage !== 'Child' && (
          <path d="M28,47 C30,65 70,65 72,47 C72,58 66,66 50,66 C34,66 28,58 28,47 Z" fill="url(#hairGrad)" opacity="0.8" />
        )}

        {/* 10. Accessories */}
        {/* SDE / Doctor Glasses */}
        {(isSDE || isDoctor || currentStage === 'Elder') && (
          <>
            <circle cx="41" cy="42" r="6" fill="none" stroke="#6b7280" strokeWidth="1.5" />
            <circle cx="59" cy="42" r="6" fill="none" stroke="#6b7280" strokeWidth="1.5" />
            <line x1="47" y1="42" x2="53" y2="42" stroke="#6b7280" strokeWidth="1.5" />
          </>
        )}

        {/* Cricketer Cap */}
        {isCricketer && (
          <>
            <path d="M26,30 C30,12 70,12 74,30 Z" fill="#1e3a8a" /> {/* Blue Cap body */}
            <path d="M35,28 L65,28 L78,24 L22,24 Z" fill="#172554" /> {/* Cap Visor */}
            <circle cx="50" cy="21" r="2.5" fill="#eab308" /> {/* Indian emblem circle */}
          </>
        )}

        {/* Politician Cap */}
        {isPolitician && (
          <path d="M30,22 L70,22 L73,28 L27,28 Z" fill="#f9fafb" stroke="#d1d5db" strokeWidth="0.5" />
        )}

        {/* Bollywood Sunglasses / Fame sunglasses */}
        {(isActor || isFamous) && (
          <>
            <polygon points="33,37 49,37 47,46 35,46" fill="#111115" stroke="url(#goldGrad)" strokeWidth="1" />
            <polygon points="51,37 67,37 65,46 53,46" fill="#111115" stroke="url(#goldGrad)" strokeWidth="1" />
            <line x1="48" y1="38" x2="52" y2="38" stroke="url(#goldGrad)" strokeWidth="1.5" />
          </>
        )}

        {/* Royal Crown */}
        {isRoyal && (
          <path d="M30,22 L35,10 L50,18 L65,10 L70,22 Z" fill="url(#goldGrad)" stroke="#8a6f27" strokeWidth="1" />
        )}
      </svg>
      
      {/* Small floating flags if abroad */}
      {currentCountry !== 'India' && (
        <span className="absolute bottom-1 right-1 text-base bg-luxury-card px-1 py-0.5 rounded border border-luxury-border">
          {countryFlag(currentCountry)}
        </span>
      )}
    </div>
  );
};

// Adjust helper
function adjustColorBrightness(col: string, amt: number) {
  let usePound = false;
  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

// Flag mapper
function countryFlag(c: string): string {
  const flags: Record<string, string> = {
    USA: '🇺🇸',
    Canada: '🇨🇦',
    UK: '🇬🇧',
    Australia: '🇦🇺',
    Germany: '🇩🇪',
    UAE: '🇦🇪',
    Singapore: '🇸🇬',
    Japan: '🇯🇵'
  };
  return flags[c] || '🇮🇳';
}
