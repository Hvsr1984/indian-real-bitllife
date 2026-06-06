import { create } from 'zustand';
import type { Player, PlayerStats, Relationship, RealEstateAsset, BusinessAsset, SocialPlatforms, ChoiceEvent, ChoiceOption, HallOfFameRecord, Ancestor, EconomyState } from '../types/game';
import { INDIAN_NAMES, getRegionOfCity, CITIES_BY_REGION } from '../data/names';
import { CITIES } from '../data/cities';
import { CAREER_PATHS } from '../data/careers';
import { PERSONALITY_TRAITS } from '../data/traits';
import { ACHIEVEMENTS } from '../data/achievements';
import { CHILDHOOD_EVENTS, SCHOOL_EVENTS, ADULT_EVENTS, WORLD_NEWS_POOL, CULTURAL_FESTIVAL_EVENTS, COMPETITIVE_EXAM_EVENTS } from '../data/events';

export interface GameStore {
  player: Player | null;
  activeEvent: ChoiceEvent | null;
  activeFestival: any | null;
  newsTicker: string[];
  hallOfFame: HallOfFameRecord[];
  familyTree: Ancestor[];
  
  // Core Actions
  startNewLife: (gender?: 'Male' | 'Female', customName?: string, legacyChild?: Relationship | null) => void;
  ageUp: () => void;
  handleChoice: (option: ChoiceOption) => void;
  closeEvent: () => void;
  
  // Education & Career Actions
  studyHard: () => void;
  enrollCoaching: (type: 'JEE Prep' | 'NEET Prep' | 'UPSC Prep' | 'NDA Prep' | 'CAT Prep' | 'CA Prep') => void;
  applyJob: (pathKey: string) => boolean;
  workHard: () => void;
  resignJob: () => void;
  
  // Specialized Career Actions
  trainCricket: (action: 'batting' | 'bowling' | 'fitness') => void;
  cricketMatch: () => void;
  bollywoodAudition: () => void;
  releaseBollywoodMovie: () => void;
  politicalCampaign: (budget: number) => void;
  runForElection: () => void;
  
  // Relationship Actions
  interactRelationship: (id: string, action: 'spend_time' | 'conversation' | 'gift' | 'insult') => void;
  proposeMarriage: (id: string) => boolean;
  haveBaby: () => void;
  askParentsForMoney: (id: string) => void;
  
  // Assets & Investment Actions
  buyRealEstate: (type: RealEstateAsset['type']) => boolean;
  sellRealEstate: (id: string) => void;
  investMutualFunds: (amount: number) => boolean;
  withdrawMutualFunds: (amount: number) => boolean;
  buyStocks: (amount: number) => boolean;
  sellStocks: (amount: number) => boolean;
  takeBankLoan: (amount: number) => boolean;
  repayBankLoan: (amount: number) => boolean;
  
  // Business Actions
  startBusiness: (name: string, category: BusinessAsset['category']) => boolean;
  hireEmployees: (id: string, count: number) => void;
  fireEmployees: (id: string, count: number) => void;
  expandBusinessOps: (id: string) => boolean;
  raiseFunding: (id: string) => void;
  ipoBusiness: (id: string) => void;
  sellBusiness: (id: string) => void;
  
  // Social Media Actions
  postSocialMedia: (platform: keyof SocialPlatforms, type: string) => void;
  runSocialAds: (platform: keyof SocialPlatforms, budget: number) => boolean;
  
  // Migration Actions
  applyVisa: (country: string, method: 'Student Visa' | 'Work Visa' | 'Startup Visa' | 'Investor Visa' | 'Marriage Visa') => boolean;
  relocateCity: (cityName: string) => boolean;
  
  // Utility Actions
  gymWorkout: () => void;
  meditate: () => void;
  visitDoctor: () => void;
  buyLotteryTicket: () => void;
  unlockAchievement: (id: string) => void;
  loadGame: () => void;
  resetAll: () => void;
}

// Generate random helper values
const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomSelect = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const initialSocialMedia = (): SocialPlatforms => ({
  instagram: { followers: 0, engagement: 1.5, postsCount: 0 },
  youtube: { followers: 0, engagement: 2.0, postsCount: 0 },
  x: { followers: 0, engagement: 1.0, postsCount: 0 },
  linkedin: { followers: 0, engagement: 0.5, postsCount: 0 }
});

const generateRandomTraits = (): string[] => {
  const allTraits = Object.keys(PERSONALITY_TRAITS);
  const count = randomRange(2, 4);
  const selected: string[] = [];
  while (selected.length < count) {
    const trait = randomSelect(allTraits);
    if (!selected.includes(trait)) {
      selected.push(trait);
    }
  }
  return selected;
};

const formatCurrency = (val: number): string => {
  const isNeg = val < 0;
  const absVal = Math.abs(val);
  if (absVal >= 10000000) {
    return `${isNeg ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Crore`;
  } else if (absVal >= 100000) {
    return `${isNeg ? '-' : ''}₹${(absVal / 100000).toFixed(2)} Lakh`;
  }
  return `${isNeg ? '-' : ''}₹${absVal.toLocaleString('en-IN')}`;
};

export const useGameStore = create<GameStore>((set, get) => ({
  player: null,
  activeEvent: null,
  activeFestival: null,
  newsTicker: ['Welcome to BitLife India. Tap "Age Up" to start your journey!'],
  hallOfFame: [],
  familyTree: [],

  loadGame: () => {
    try {
      const saved = localStorage.getItem('bitlife_india_save');
      const savedFame = localStorage.getItem('bitlife_india_fame');
      const savedTree = localStorage.getItem('bitlife_india_tree');
      if (saved) {
        set({ player: JSON.parse(saved) });
      }
      if (savedFame) {
        set({ hallOfFame: JSON.parse(savedFame) });
      }
      if (savedTree) {
        set({ familyTree: JSON.parse(savedTree) });
      }
    } catch (e) {
      console.error('Error loading save game', e);
    }
  },

  resetAll: () => {
    localStorage.removeItem('bitlife_india_save');
    set({ player: null, activeEvent: null, activeFestival: null });
  },

  unlockAchievement: (id: string) => {
    const { player } = get();
    if (!player || player.achievements.includes(id)) return;
    const ach = ACHIEVEMENTS[id];
    if (!ach) return;

    const updatedAchievements = [...player.achievements, id];
    const updatedPlayer = { ...player, achievements: updatedAchievements };
    
    // Add event log
    updatedPlayer.biography.push(`Unlocked Achievement: ${ach.emoji} ${ach.title}`);
    
    set({ player: updatedPlayer });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updatedPlayer));

    // Show achievement pop-up via a fake log or activeEvent
    set({
      activeEvent: {
        id: `ach_${id}`,
        title: '🏆 Achievement Unlocked!',
        description: `Congratulations! You unlocked the achievement: "${ach.title}" - ${ach.description}`,
        emoji: '🏆',
        options: [{ text: 'Brilliant!', effects: { logText: `You unlocked the achievement: ${ach.title}` } }]
      }
    });

    // Fire Confetti!
    try {
      // Import dynamically or check window
      (window as any).confetti?.({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
  },

  startNewLife: (gender?: 'Male' | 'Female', customName?: string, legacyChild?: Relationship | null) => {
    const selectedGender = gender || (Math.random() > 0.5 ? 'Male' : 'Female');
    const birthRegion = randomSelect(['North', 'South', 'East', 'West']);
    const city = randomSelect(CITIES_BY_REGION[birthRegion]);
    
    // Set up names
    let fName = customName;
    let lName = '';
    if (!fName) {
      const namesData = INDIAN_NAMES[birthRegion];
      fName = selectedGender === 'Male' ? randomSelect(namesData.firstNamesMale) : randomSelect(namesData.firstNamesFemale);
      lName = randomSelect(namesData.lastNames);
    } else {
      const split = fName.split(' ');
      fName = split[0];
      lName = split.slice(1).join(' ') || randomSelect(INDIAN_NAMES[birthRegion].lastNames);
    }
    const fullName = `${fName} ${lName}`;

    // Family Wealth
    const rVal = Math.random();
    let wealth: Player['wealthClass'] = 'Middle Class';
    let startingMoney = 0; // Newborns start with zero liquid money
    if (rVal < 0.25) {
      wealth = 'Poor';
    } else if (rVal < 0.50) {
      wealth = 'Lower Middle Class';
    } else if (rVal < 0.75) {
      wealth = 'Middle Class';
    } else if (rVal < 0.90) {
      wealth = 'Upper Middle Class';
    } else if (rVal < 0.99) {
      wealth = 'Rich';
    } else {
      wealth = 'Royal Family';
    }

    // Heritage inheritance if legacy mode
    let legacyTree = [...get().familyTree];
    let inheritanceTrust = 0;
    if (legacyChild && get().player) {
      const parent = get().player!;
      inheritanceTrust = parent.stats.money;
      wealth = parent.wealthClass;
      
      const newAncestor: Ancestor = {
        id: Math.random().toString(),
        name: parent.name,
        ageAtDeath: parent.age,
        causeOfDeath: parent.causeOfDeath || 'Old Age',
        careerSummary: parent.career.type !== 'None' ? parent.career.name : 'Unemployed',
        finalWealth: parent.stats.money,
        generation: parent.generation
      };
      legacyTree = [...legacyTree, newAncestor];
      set({ familyTree: legacyTree });
      localStorage.setItem('bitlife_india_tree', JSON.stringify(legacyTree));
    }

    // Starting Stats
    const traits = generateRandomTraits();
    const isGenius = traits.includes('Genius');
    const isAthletic = traits.includes('Athletic');

    const stats: PlayerStats = {
      health: randomRange(75, 95),
      happiness: randomRange(80, 100),
      intelligence: randomRange(isGenius ? 85 : 40, isGenius ? 100 : 80),
      fitness: randomRange(isAthletic ? 80 : 45, isAthletic ? 100 : 80),
      reputation: 50,
      money: startingMoney,
      fame: 0
    };

    // Parents
    const dadName = `${randomSelect(INDIAN_NAMES[birthRegion].firstNamesMale)} ${lName}`;
    const momName = `${randomSelect(INDIAN_NAMES[birthRegion].firstNamesFemale)} ${lName}`;
    const relationships: Relationship[] = [
      {
        id: 'father',
        name: dadName,
        relation: 'Father',
        level: randomRange(75, 95),
        compatibility: randomRange(60, 95),
        age: randomRange(22, 35),
        gender: 'Male',
        isDead: false
      },
      {
        id: 'mother',
        name: momName,
        relation: 'Mother',
        level: randomRange(80, 98),
        compatibility: randomRange(70, 98),
        age: randomRange(20, 32),
        gender: 'Female',
        isDead: false
      }
    ];

    // Avatar config
    const avatar = {
      gender: selectedGender,
      skinTone: randomSelect(['#f9c99d', '#e6a172', '#b37145', '#7a421b']),
      hairStyle: selectedGender === 'Male' ? 'short' : 'long',
      hairColor: '#1a1a1a',
      clothing: 'baby_cloth'
    };

    const newPlayer: Player = {
      name: fullName,
      gender: selectedGender,
      age: 0,
      currentCity: city,
      birthCity: city,
      currentCountry: 'India',
      visaStatus: 'None',
      wealthClass: wealth,
      stats,
      traits,
      avatar,
      education: {
        stage: 'Infant',
        studyEffort: 50,
        scholarship: false
      },
      career: { type: 'None', name: 'None', levelIndex: 0, salary: 0 },
      relationships,
      realEstate: [],
      businesses: [],
      investments: { mutualFunds: 0, stocks: 0, crypto: 0 },
      socialMedia: initialSocialMedia(),
      isDead: false,
      achievements: [],
      generation: legacyChild ? (get().player?.generation || 1) + 1 : 1,
      biography: [
        `👶 You were born in ${city}, India as a ${selectedGender.toLowerCase()}.`,
        `Family Wealth: ${wealth}.`,
        ...(inheritanceTrust > 0 ? [`💼 A trust fund of ${formatCurrency(inheritanceTrust)} has been set up from your parent's estate, maturing when you turn 18.`] : [])
      ],
      inheritanceTrust: inheritanceTrust > 0 ? inheritanceTrust : undefined
    };

    // If Royal Family, award achievement
    if (wealth === 'Royal Family') {
      newPlayer.achievements.push('RoyalBlood');
    }

    set({ player: newPlayer, activeEvent: null, activeFestival: null });
    localStorage.setItem('bitlife_india_save', JSON.stringify(newPlayer));
  },

  closeEvent: () => {
    set({ activeEvent: null });
  },

  handleChoice: (option: ChoiceOption) => {
    const { player } = get();
    if (!player) return;

    let updatedPlayer = { ...player };
    const e = option.effects;

    // Apply stat changes
    if (e.stats) {
      Object.keys(e.stats).forEach((k) => {
        const key = k as keyof PlayerStats;
        const delta = e.stats![key] || 0;
        updatedPlayer.stats[key] = Math.min(100, Math.max(0, updatedPlayer.stats[key] + delta));
      });
    }

    // Apply financial changes
    if (e.money) {
      updatedPlayer.stats.money += e.money;
    }

    // Apply fame changes
    if (e.fame) {
      updatedPlayer.stats.fame = Math.min(100, Math.max(0, updatedPlayer.stats.fame + e.fame));
    }

    // Add log entry
    updatedPlayer.biography.push(e.logText);

    // Resolve Custom Triggers
    if (e.customTrigger) {
      const trig = e.customTrigger;
      
      if (trig === 'chooseScience') {
        updatedPlayer.education.stream = 'Science';
      } else if (trig.startsWith('askParentsCoaching_')) {
        const coachingType = trig.replace('askParentsCoaching_', '') as any;
        let fee = 100000;
        if (coachingType === 'UPSC Prep') fee = 150000;
        if (coachingType === 'JEE Prep' || coachingType === 'NEET Prep') fee = 120000;

        const parents = updatedPlayer.relationships.filter(r => r.relation === 'Father' || r.relation === 'Mother');
        const avgRelation = parents.length > 0 ? parents.reduce((acc, p) => acc + p.level, 0) / parents.length : 50;
        const avgCompatibility = parents.length > 0 ? parents.reduce((acc, p) => acc + p.compatibility, 0) / parents.length : 50;
        const successChance = (avgRelation * 0.7) + (avgCompatibility * 0.3);

        const roll = Math.random() * 100;
        if (roll < successChance || updatedPlayer.wealthClass === 'Royal Family' || updatedPlayer.wealthClass === 'Rich') {
          updatedPlayer.education.prepCoaching = coachingType;
          updatedPlayer.biography.push(`✏️ Coaching Success: Your parents agreed to pay your ${coachingType} fees of ${formatCurrency(fee)}!`);
          updatedPlayer.stats.happiness = Math.min(100, updatedPlayer.stats.happiness + 15);
        } else {
          updatedPlayer.biography.push(`❌ Refusal: Your parents refused to pay for ${coachingType} coaching. They advised you to self-study.`);
          updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 10);
          
          setTimeout(() => {
            set({
              activeEvent: {
                id: 'parents_refused_coaching',
                title: 'Request Denied',
                description: `Your parents refused to pay the fees of ${formatCurrency(fee)}. They believe self-study is sufficient or they cannot afford it.`,
                emoji: '😠',
                options: [{ text: 'Accept decision', effects: { logText: 'Had to focus on self-study.' } }]
              }
            });
          }, 100);
        }
      } else if (trig.startsWith('borrowParentsCoaching_')) {
        const coachingType = trig.replace('borrowParentsCoaching_', '') as any;
        let fee = 100000;
        if (coachingType === 'UPSC Prep') fee = 150000;
        if (coachingType === 'JEE Prep' || coachingType === 'NEET Prep') fee = 120000;

        updatedPlayer.stats.money -= fee;
        updatedPlayer.education.prepCoaching = coachingType;
        updatedPlayer.biography.push(`✏️ Coaching Loan: Borrowed ${formatCurrency(fee)} from parents to enroll in ${coachingType}.`);
        updatedPlayer.stats.happiness = Math.min(100, updatedPlayer.stats.happiness + 5);
      } else if (trig === 'chooseCommerce') {
        updatedPlayer.education.stream = 'Commerce';
      } else if (trig === 'chooseArts') {
        updatedPlayer.education.stream = 'Arts';
      } else if (trig === 'solveJEENormal' || trig === 'solveNEETNormal') {
        // Exam Resolution!
        const effort = updatedPlayer.education.studyEffort;
        const intel = updatedPlayer.stats.intelligence;
        const isGenius = updatedPlayer.traits.includes('Genius');
        const isDisciplined = updatedPlayer.traits.includes('Disciplined');
        const isLazy = updatedPlayer.traits.includes('Lazy');
        
        let prepBoost = 0;
        if (updatedPlayer.education.prepCoaching === 'JEE Prep' || updatedPlayer.education.prepCoaching === 'NEET Prep') {
          prepBoost = 30; // 30% coaching boost
        }

        const score = (intel * 0.4) + (effort * 0.3) + prepBoost + (isGenius ? 20 : 0) + (isDisciplined ? 10 : 0) - (isLazy ? 20 : 0) + randomRange(-10, 10);
        
        if (score >= 70) {
          // Passed!
          const degree = trig === 'solveJEENormal' ? 'IIT BTech Engineering' : 'AIIMS MBBS Medicine';
          const univ = trig === 'solveJEENormal' ? 'IIT Bombay' : 'AIIMS Delhi';
          updatedPlayer.education.stage = 'College';
          updatedPlayer.education.currentDegree = degree;
          updatedPlayer.biography.push(`🎉 Congratulations! You CRACKED the competitive exam with score ${score.toFixed(0)} and secured admission at ${univ}!`);
          updatedPlayer.stats.happiness = Math.min(100, updatedPlayer.stats.happiness + 25);
          updatedPlayer.stats.reputation = Math.min(100, updatedPlayer.stats.reputation + 25);
          
          if (trig === 'solveJEENormal') {
            setTimeout(() => get().unlockAchievement('IITGrad'), 100);
            setTimeout(() => get().unlockAchievement('KotaSurvivor'), 150);
          } else {
            setTimeout(() => get().unlockAchievement('AIIMSGrad'), 100);
            setTimeout(() => get().unlockAchievement('KotaSurvivor'), 150);
          }
        } else {
          // Failed
          updatedPlayer.education.stage = 'Finished';
          updatedPlayer.biography.push(`❌ You failed to clear the cut-off for elite colleges (Score: ${score.toFixed(0)}). You had to settle for a local private college.`);
          updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 20);
        }
      } else if (trig === 'solveUPSCNormal') {
        const effort = updatedPlayer.education.studyEffort;
        const intel = updatedPlayer.stats.intelligence;
        const hasUPSCPrep = updatedPlayer.education.prepCoaching === 'UPSC Prep';
        const isGenius = updatedPlayer.traits.includes('Genius');

        const score = (intel * 0.5) + (effort * 0.2) + (hasUPSCPrep ? 25 : 0) + (isGenius ? 15 : 0) + randomRange(-15, 15);
        if (score >= 80) {
          updatedPlayer.biography.push('🦁 UPSC CSE Result: Selected! You cleared all three rounds of Civil Services Exam on your first try! You are now an IAS/IPS ranker.');
          updatedPlayer.stats.reputation = 100;
          updatedPlayer.stats.happiness = 100;
          // Unlocks civil service careers
          updatedPlayer.education.prepCoaching = 'None';
          
          // Allocate civil services job options
          const roll = Math.random() > 0.5 ? 'IAS' : 'IPS';
          const p = roll === 'IAS' ? CAREER_PATHS.IASOfficer : CAREER_PATHS.IPSOfficer;
          updatedPlayer.career = {
            type: 'Job',
            name: p.name,
            levelIndex: 0,
            salary: p.levels[0].salary,
            job: {
              name: p.levels[0].title,
              companyTier: 'Conglomerate',
              yearsInRole: 0,
              performance: 70
            }
          };
          updatedPlayer.biography.push(`💼 Joined government civil services as a ${p.levels[0].title}.`);
          setTimeout(() => get().unlockAchievement('UPSCWinner'), 100);
          if (roll === 'IAS') setTimeout(() => get().unlockAchievement('IASOfficer'), 200);
          if (roll === 'IPS') setTimeout(() => get().unlockAchievement('IPSOfficer'), 200);
        } else {
          updatedPlayer.biography.push(`❌ UPSC CSE Result: Rejected. Score: ${score.toFixed(0)}/100. The competition was brutal.`);
          updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 15);
        }
      } else if (trig === 'acceptArranged') {
        const spName = `${randomSelect(INDIAN_NAMES[getRegionOfCity(updatedPlayer.currentCity)].firstNamesFemale)} ${updatedPlayer.name.split(' ').slice(1).join(' ')}`;
        const spouse: Relationship = {
          id: 'spouse',
          name: spName,
          relation: 'Spouse',
          level: 85,
          compatibility: randomRange(55, 95),
          age: updatedPlayer.age + randomRange(-2, 2),
          gender: updatedPlayer.gender === 'Male' ? 'Female' : 'Male',
          isDead: false
        };
        updatedPlayer.relationships.push(spouse);
        setTimeout(() => get().unlockAchievement('ArrangedSuccess'), 100);
      } else if (trig.startsWith('bet')) {
        const team = trig.substring(3);
        const win = Math.random() > 0.5;
        if (win) {
          updatedPlayer.stats.money += 100000;
          updatedPlayer.biography.push(`🏏 IPL Betting Result: You WON! ${team} won the match. You pocketed ₹1 Lakh profit.`);
          updatedPlayer.stats.happiness = Math.min(100, updatedPlayer.stats.happiness + 15);
        } else {
          updatedPlayer.stats.money -= 100000;
          updatedPlayer.biography.push(`🏏 IPL Betting Result: You LOST! ${team} lost. You lost ₹1 Lakh.`);
          updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 15);
        }
      } else if (trig === 'payAuditionBribe') {
        if (Math.random() > 0.6) {
          // Success
          updatedPlayer.career = {
            type: 'Bollywood',
            name: 'Bollywood Actor',
            levelIndex: 1,
            salary: CAREER_PATHS.Bollywood.levels[1].salary,
            bollywood: {
              stage: 'TV Shows',
              actingSkill: 40,
              boxOfficeHits: 0,
              awardsCount: 0
            }
          };
          updatedPlayer.biography.push('🎬 The casting director kept their word. You got a role in a TV Soap!');
        } else {
          updatedPlayer.biography.push('❌ Scam! The casting director disappeared with your ₹5 Lakhs. You got no role.');
          updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 20);
        }
      } else if (trig === 'exposeAuditionBribe') {
        const viral = Math.random() > 0.4;
        if (viral) {
          updatedPlayer.stats.fame = Math.min(100, updatedPlayer.stats.fame + 30);
          updatedPlayer.stats.reputation = Math.min(100, updatedPlayer.stats.reputation + 25);
          updatedPlayer.biography.push('🔥 Your post went VIRAL! The news covered your bravery. Fame +30, Reputation +25.');
          setTimeout(() => get().unlockAchievement('ViralSensation'), 100);
        } else {
          updatedPlayer.stats.reputation = Math.max(0, updatedPlayer.stats.reputation - 10);
          updatedPlayer.biography.push('🔇 Nobody noticed your post. The director blacklisted you from audition agencies.');
        }
      }
    }

    set({ player: updatedPlayer, activeEvent: null });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updatedPlayer));
  },

  ageUp: () => {
    const { player } = get();
    if (!player || player.isDead) return;

    let updatedPlayer = { ...player };
    updatedPlayer.age += 1;

    const currentAge = updatedPlayer.age;

    // 0. Inheritance Trust Fund Maturation
    if (currentAge === 18 && updatedPlayer.inheritanceTrust && updatedPlayer.inheritanceTrust > 0) {
      const trustAmt = updatedPlayer.inheritanceTrust;
      updatedPlayer.stats.money += trustAmt;
      updatedPlayer.biography.push(`🎉 Trust Fund Mature: You turned 18 and received your inheritance trust fund of ${formatCurrency(trustAmt)}!`);
      updatedPlayer.inheritanceTrust = 0;
    }

    // 1. Update Relationships
    updatedPlayer.relationships = updatedPlayer.relationships.map((rel) => {
      let r = { ...rel };
      r.age += 1;
      
      // Sickness/Death for parents
      if (r.relation === 'Father' || r.relation === 'Mother') {
        if (!r.isDead && r.age > 50) {
          const deathChance = (r.age - 50) * 0.015;
          if (Math.random() < deathChance) {
            r.isDead = true;
            updatedPlayer.biography.push(`💔 Tragedy: Your ${r.relation.toLowerCase()} (${r.name}) passed away at age ${r.age}.`);
            updatedPlayer.stats.happiness = Math.max(0, updatedPlayer.stats.happiness - 35);
            
            // Family property inheritance!
            let inheritance = 0;
            if (updatedPlayer.wealthClass === 'Middle Class') inheritance = randomRange(50000, 200000);
            else if (updatedPlayer.wealthClass === 'Upper Middle Class') inheritance = randomRange(500000, 2000000);
            else if (updatedPlayer.wealthClass === 'Rich') inheritance = randomRange(5000000, 20000000);
            else if (updatedPlayer.wealthClass === 'Royal Family') inheritance = randomRange(50000000, 200000000);
            
            if (inheritance > 0) {
              updatedPlayer.stats.money += inheritance;
              updatedPlayer.biography.push(`💰 You inherited ${formatCurrency(inheritance)} from their estate.`);
            }
          }
        }
      }
      return r;
    });

    // 2. Economy Roll
    const newsPool = WORLD_NEWS_POOL;
    const activeNews = randomSelect(newsPool);
    const tickerMsg = `📰 NEWS: ${activeNews.headline} - ${activeNews.effectText}`;
    
    // Change economic state
    let econState: EconomyState = 'Economic Boom';
    if (activeNews.type === 'RECESSION') econState = 'Recession';
    else if (activeNews.type === 'STOCK_BOOM') econState = 'Stock Market Boom' as any; // Standard stock boom
    else if (activeNews.type === 'RE_BOOM') econState = 'Real Estate Boom';
    else if (activeNews.type === 'AI_BOOM') econState = 'Startup Funding Wave' as any;
    else econState = randomSelect(['Economic Boom', 'Recession', 'Inflation Surge', 'Employment Crisis']);
    
    // Set news ticker state
    set((state) => ({ 
      newsTicker: [tickerMsg, ...state.newsTicker.slice(0, 4)]
    }));

    // 3. Investments passive updates
    let mfMultiplier = 1.08; // 8% avg growth
    let stockMultiplier = 1.10; // 10% avg growth
    
    if (econState === 'Economic Boom') {
      mfMultiplier = 1.12;
      stockMultiplier = 1.25;
    } else if (econState === 'Recession') {
      mfMultiplier = 1.02;
      stockMultiplier = 0.80; // drops 20%
    } else if (econState === 'Real Estate Boom') {
      mfMultiplier = 1.09;
      stockMultiplier = 1.05;
    }

    if (updatedPlayer.investments.mutualFunds > 0) {
      const prev = updatedPlayer.investments.mutualFunds;
      updatedPlayer.investments.mutualFunds = Math.round(prev * mfMultiplier);
      const interestEarned = updatedPlayer.investments.mutualFunds - prev;
      updatedPlayer.stats.money += interestEarned; // interest liquidates or compounding
      updatedPlayer.biography.push(`📊 Investments: Your Mutual Funds grew by ${(mfMultiplier * 100 - 100).toFixed(0)}%, earning you ${formatCurrency(interestEarned)}.`);
    }
    if (updatedPlayer.investments.stocks > 0) {
      const prev = updatedPlayer.investments.stocks;
      updatedPlayer.investments.stocks = Math.round(prev * stockMultiplier);
      const stockChange = updatedPlayer.investments.stocks - prev;
      updatedPlayer.stats.money += stockChange;
      updatedPlayer.biography.push(`📈 Stocks: Your portfolio changed by ${(stockMultiplier * 100 - 100).toFixed(0)}% (${stockChange >= 0 ? '+' : ''}${formatCurrency(stockChange)}).`);
    }

    // 4. Real Estate assets appreciation and rent income
    updatedPlayer.realEstate = updatedPlayer.realEstate.map((prop) => {
      let p = { ...prop };
      let appRate = randomRange(3, 8) / 100; // 3-8% appreciation base
      
      if (econState === 'Real Estate Boom') {
        appRate += 0.12; // extra 12%
      } else if (econState === 'Recession') {
        appRate -= 0.05; // drops value
      }
      
      // Jaipur appreciation bonus
      if (updatedPlayer.currentCity === 'Jaipur') {
        appRate += 0.03;
      }
      
      p.currentValue = Math.round(p.currentValue * (1 + appRate));
      
      // Rent payout
      updatedPlayer.stats.money += p.rentIncome;
      // Maintenance charges
      updatedPlayer.stats.money -= p.maintenance;
      
      return p;
    });

    // 5. Business Operations Updates
    updatedPlayer.businesses = updatedPlayer.businesses.map((biz) => {
      let b = { ...biz };
      b.yearsActive += 1;
      
      // Startup revenue scaling
      let econMult = 1.0;
      if (econState === 'Economic Boom' || econState === 'Startup Funding Wave') econMult = 1.4;
      if (econState === 'Recession') econMult = 0.6;
      
      const baseRevPerEmp = 300000; // ₹3 Lakh per employee
      b.revenue = Math.round(b.employees * baseRevPerEmp * econMult * (1 + b.yearsActive * 0.1));
      b.profit = Math.round(b.revenue * 0.3); // 30% margin
      
      // Valuation formula: 5x revenue + profit
      b.valuation = Math.round(b.revenue * 5 + b.profit);
      
      // Passive business payout
      const playerPayout = Math.round(b.profit * (b.investorStake / 100));
      updatedPlayer.stats.money += playerPayout;
      
      updatedPlayer.biography.push(`💼 Business: "${b.name}" generated ${formatCurrency(b.revenue)} revenue and ${formatCurrency(b.profit)} profit. You received ${formatCurrency(playerPayout)} payout.`);
      
      // Check unicorn status
      if (b.valuation >= 10000000000 && !updatedPlayer.achievements.includes('DecacornFounder')) { // ₹10,000 Crore valuation
        setTimeout(() => get().unlockAchievement('DecacornFounder'), 100);
      } else if (b.valuation >= 1000000000 && !updatedPlayer.achievements.includes('Billionaire')) { // ₹1,000 Crore
        setTimeout(() => get().unlockAchievement('Billionaire'), 100);
      }
      
      return b;
    });

    // 6. Base Expenses (Cost of Living) - Only for adults 18+
    if (currentAge >= 18) {
      const cityData = CITIES[updatedPlayer.currentCity] || CITIES.Delhi;
      const baseCol = 60000; // ₹60,000 yearly base
      let colClassMult = 1.0;
      if (updatedPlayer.wealthClass === 'Poor') colClassMult = 0.5;
      else if (updatedPlayer.wealthClass === 'Upper Middle Class') colClassMult = 1.5;
      else if (updatedPlayer.wealthClass === 'Rich') colClassMult = 4.0;
      else if (updatedPlayer.wealthClass === 'Royal Family') colClassMult = 15.0;

      const colCharge = Math.round(baseCol * cityData.costOfLiving * colClassMult);
      updatedPlayer.stats.money -= colCharge;
    }

    // Pocket money for kids
    if (currentAge < 18 && updatedPlayer.education.stage !== 'Finished') {
      let pocketMoney = 0;
      if (updatedPlayer.wealthClass === 'Lower Middle Class') pocketMoney = 500;
      else if (updatedPlayer.wealthClass === 'Middle Class') pocketMoney = 2000;
      else if (updatedPlayer.wealthClass === 'Upper Middle Class') pocketMoney = 10000;
      else if (updatedPlayer.wealthClass === 'Rich') pocketMoney = 50000;
      else if (updatedPlayer.wealthClass === 'Royal Family') pocketMoney = 500000;
      
      updatedPlayer.stats.money += pocketMoney;
    }

    // 7. Education & Exams Milestones
    if (currentAge === 5) {
      updatedPlayer.education.stage = 'Childhood';
      updatedPlayer.education.schoolType = updatedPlayer.wealthClass === 'Poor' ? 'Government School' : 'Private School';
      updatedPlayer.biography.push(`🏫 Started primary school at a local ${updatedPlayer.education.schoolType}.`);
    } else if (currentAge === 15) {
      updatedPlayer.education.stage = 'School';
      // Trigger Class 11 stream selection
      set({ player: updatedPlayer });
      const streamEvent = SCHOOL_EVENTS.find(x => x.id === 'stream_selection')!;
      set({ activeEvent: streamEvent });
      return;
    } else if (currentAge === 17) {
      updatedPlayer.education.stage = 'High School';
      updatedPlayer.biography.push('✏️ Class 12 Board Exams are next year. Parents advise starting coaching.');
    } else if (currentAge === 18 && updatedPlayer.education.stage === 'High School') {
      // Board Results & Entrance Exams
      const stream = updatedPlayer.education.stream || 'Science';
      const intel = updatedPlayer.stats.intelligence;
      const effort = updatedPlayer.education.studyEffort;
      
      // Calculate Board Exam score
      const boardScore = Math.min(100, Math.round((intel * 0.5) + (effort * 0.4) + randomRange(1, 10)));
      updatedPlayer.biography.push(`📝 Class 12 CBSE Board Results: You scored ${boardScore}%!`);
      
      if (stream === 'Science' && updatedPlayer.education.prepCoaching === 'JEE Prep') {
        set({ player: updatedPlayer });
        set({ activeEvent: COMPETITIVE_EXAM_EVENTS.JEE });
        return;
      } else if (stream === 'Science' && updatedPlayer.education.prepCoaching === 'NEET Prep') {
        set({ player: updatedPlayer });
        set({ activeEvent: COMPETITIVE_EXAM_EVENTS.NEET });
        return;
      } else {
        // Normal university entry
        updatedPlayer.education.stage = 'College';
        updatedPlayer.education.currentDegree = stream === 'Commerce' ? 'BCom Finance' : stream === 'Arts' ? 'BA History' : 'BSc General';
        updatedPlayer.biography.push(`🎓 Enrolled in Delhi University for ${updatedPlayer.education.currentDegree}.`);
      }
    } else if (currentAge === 21 && updatedPlayer.education.stage === 'College') {
      updatedPlayer.education.stage = 'Finished';
      updatedPlayer.biography.push(`🎓 Graduated from university with your degree in ${updatedPlayer.education.currentDegree}. Time to look for a job!`);
    }

    // 8. Career & Professional Passive progress
    if (updatedPlayer.career.type === 'Job' && updatedPlayer.career.job) {
      const job = updatedPlayer.career.job;
      job.yearsInRole += 1;
      
      // SDE / IAS promotion checklist
      const pathKey = Object.keys(CAREER_PATHS).find(k => CAREER_PATHS[k].name === updatedPlayer.career.name);
      if (pathKey) {
        const path = CAREER_PATHS[pathKey];
        const currentLvlIdx = updatedPlayer.career.levelIndex;
        const nextLvl = path.levels[currentLvlIdx + 1];
        
        if (nextLvl && job.performance > 78 && job.yearsInRole >= (nextLvl.reqExperience || 3)) {
          // Promote!
          updatedPlayer.career.levelIndex += 1;
          updatedPlayer.career.salary = nextLvl.salary;
          updatedPlayer.career.job.name = nextLvl.title;
          updatedPlayer.career.job.yearsInRole = 0;
          updatedPlayer.career.job.performance = 70; // reset
          updatedPlayer.stats.happiness = Math.min(100, updatedPlayer.stats.happiness + 20);
          updatedPlayer.stats.reputation = Math.min(100, updatedPlayer.stats.reputation + 15);
          updatedPlayer.biography.push(`🎉 PROMOTED: You are now a ${nextLvl.title} with a salary of ${formatCurrency(nextLvl.salary)}/yr!`);
        }
      }
      
      // Salary deposit
      updatedPlayer.stats.money += updatedPlayer.career.salary;
    } else if (updatedPlayer.career.type === 'Cricket' && updatedPlayer.career.cricket) {
      const c = updatedPlayer.career.cricket;
      c.matchExperience += 1;
      
      // Generate matches outcomes
      const runGains = randomRange(c.batting * 3, c.batting * 6);
      const wicketGains = randomRange(c.bowling * 0.1, c.bowling * 0.3);
      c.runs += runGains;
      c.wickets += Math.round(wicketGains);
      
      updatedPlayer.biography.push(`🏏 Played matches: Scored ${runGains} runs and took ${Math.round(wicketGains)} wickets this season.`);
      
      // Career stage promotion based on experience & stats
      const currentLvlIdx = updatedPlayer.career.levelIndex;
      const cricketLevels = CAREER_PATHS.Cricket.levels;
      const nextLvl = cricketLevels[currentLvlIdx + 1];
      
      let eligible = false;
      if (currentLvlIdx === 1 && c.matchExperience >= 2) eligible = true; // School -> District
      else if (currentLvlIdx === 2 && c.matchExperience >= 4 && c.batting + c.bowling > 100) eligible = true; // District -> State Ranji
      else if (currentLvlIdx === 3 && c.matchExperience >= 7 && (c.batting > 65 || c.bowling > 65)) eligible = true; // Ranji -> IPL
      else if (currentLvlIdx === 4 && c.matchExperience >= 10 && (c.batting > 75 || c.bowling > 75)) eligible = true; // IPL -> India
      else if (currentLvlIdx === 5 && c.matchExperience >= 15 && (c.batting > 85 || c.bowling > 85)) eligible = true; // India -> Captain
      
      if (nextLvl && eligible) {
        updatedPlayer.career.levelIndex += 1;
        updatedPlayer.career.salary = nextLvl.salary;
        updatedPlayer.career.name = `Cricket - ${nextLvl.title}`;
        updatedPlayer.stats.fame = Math.min(100, updatedPlayer.stats.fame + 20);
        updatedPlayer.biography.push(`🏆 Cricket Promotion: Drafted into the ${nextLvl.title}! Contract salary: ${formatCurrency(nextLvl.salary)}/yr.`);
        
        if (nextLvl.title === 'Indian National Team Member') {
          setTimeout(() => get().unlockAchievement('CricketNational'), 100);
        } else if (nextLvl.title === 'IPL Contract Player') {
          setTimeout(() => get().unlockAchievement('IPLCaptain'), 100);
        }
      }
      updatedPlayer.stats.money += updatedPlayer.career.salary;
       // Passive earnings
      updatedPlayer.stats.money += updatedPlayer.career.salary;
    } else if (updatedPlayer.career.type === 'Politics' && updatedPlayer.career.politics) {
      // Prime Minister elections occur every 5 years starting at age 35
      if (currentAge >= 35 && currentAge % 5 === 0) {
        set({ player: updatedPlayer });
        get().runForElection();
        return;
      }
      updatedPlayer.stats.money += updatedPlayer.career.salary;
    }

    const isLazy = updatedPlayer.traits.includes('Lazy');
    
    // Decay rates
    let healthDecay = 1;
    let fitnessDecay = 2;
    if (currentAge > 40) {
      healthDecay = 2;
      fitnessDecay = 3;
    }
    if (currentAge > 70) {
      healthDecay = 4;
      fitnessDecay = 5;
    }
    if (isLazy) {
      fitnessDecay += 2;
    }

    updatedPlayer.stats.fitness = Math.max(0, updatedPlayer.stats.fitness - fitnessDecay);
    updatedPlayer.stats.health = Math.max(0, updatedPlayer.stats.health - healthDecay);

    // Death triggers
    let isDead = false;
    let cause = 'Old Age';
    if (updatedPlayer.stats.health <= 0) {
      isDead = true;
      cause = 'Organ Failure';
    } else if (currentAge >= 75) {
      const deathProb = (currentAge - 75) * 0.035;
      if (Math.random() < deathProb) {
        isDead = true;
        cause = randomSelect(['Cardiac Arrest', 'Pneumonia', 'Passed away peacefully in sleep', 'Natural causes']);
      }
    }

    if (isDead) {
      updatedPlayer.isDead = true;
      updatedPlayer.causeOfDeath = cause;
      updatedPlayer.biography.push(`🪦 You died at age ${currentAge} due to ${cause}.`);
      
      // Update Hall of Fame
      const summaryText = `You died at age ${currentAge} as a ${updatedPlayer.career.type !== 'None' ? updatedPlayer.career.name : 'Citizen'} from ${updatedPlayer.currentCity} with a net worth of ${formatCurrency(updatedPlayer.stats.money)}.`;
      const record: HallOfFameRecord = {
        id: Math.random().toString(),
        name: updatedPlayer.name,
        age: currentAge,
        careerSummary: updatedPlayer.career.type !== 'None' ? updatedPlayer.career.name : 'Unemployed',
        netWorth: updatedPlayer.stats.money,
        achievementsCount: updatedPlayer.achievements.length,
        generation: updatedPlayer.generation,
        biographySummary: summaryText
      };
      
      const updatedFame = [...get().hallOfFame, record];
      set({ hallOfFame: updatedFame });
      localStorage.setItem('bitlife_india_fame', JSON.stringify(updatedFame));
      
      if (updatedPlayer.stats.money >= 10000000000) { // 1000 Cr
        setTimeout(() => get().unlockAchievement('Billionaire'), 100);
      }
      if (currentAge >= 100) {
        setTimeout(() => get().unlockAchievement('CenturyLife'), 100);
      }
      
      set({ player: updatedPlayer, activeEvent: null });
      localStorage.setItem('bitlife_india_save', JSON.stringify(updatedPlayer));
      return;
    }

    // 10. Random Life Events Picker
    let event: ChoiceEvent | null = null;
    
    // Check if we trigger festival
    if (Math.random() > 0.65) {
      const fest = randomSelect(CULTURAL_FESTIVAL_EVENTS);
      const mappedEvent: ChoiceEvent = {
        id: `festival_${fest.name}_${currentAge}`,
        title: `${fest.emoji} ${fest.name} Celebrations!`,
        description: fest.description,
        emoji: fest.emoji,
        options: fest.options
      };
      event = mappedEvent;
    } else if (Math.random() > 0.45) {
      if (currentAge < 12) {
        event = randomSelect(CHILDHOOD_EVENTS);
      } else if (currentAge < 18) {
        event = randomSelect(SCHOOL_EVENTS);
      } else {
        event = randomSelect(ADULT_EVENTS);
      }
    }

    set({ player: updatedPlayer, activeEvent: event });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updatedPlayer));
  },

  studyHard: () => {
    const { player } = get();
    if (!player) return;
    const isLazy = player.traits.includes('Lazy');
    const isGenius = player.traits.includes('Genius');
    
    let studyBoost = isGenius ? 20 : 10;
    if (isLazy) studyBoost = 4;

    const updated = { ...player };
    updated.education.studyEffort = Math.min(100, updated.education.studyEffort + 15);
    updated.stats.intelligence = Math.min(100, updated.stats.intelligence + studyBoost);
    updated.biography.push('📚 You studied hard, increasing your intelligence and prep levels.');
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  enrollCoaching: (type) => {
    const { player } = get();
    if (!player) return;

    let fee = 100000; // ₹1 Lakh
    if (type === 'UPSC Prep') fee = 150000;
    if (type === 'JEE Prep' || type === 'NEET Prep') fee = 120000;

    if (player.stats.money < fee) {
      if (player.age < 18) {
        set({
          activeEvent: {
            id: 'insufficient_funds_coaching_support',
            title: 'Request Parental Support?',
            description: `Enrollment in ${type} coaching requires ${formatCurrency(fee)}. You don't have enough money. Will you ask your parents to pay or borrow it from them?`,
            emoji: '✏️',
            options: [
              {
                text: 'Ask parents to pay the fee',
                effects: {
                  logText: `Asked parents to pay for ${type} coaching.`,
                  customTrigger: `askParentsCoaching_${type}`
                }
              },
              {
                text: `Borrow fee as a parental loan`,
                effects: {
                  logText: `Borrowed ${formatCurrency(fee)} from parents for coaching.`,
                  customTrigger: `borrowParentsCoaching_${type}`
                }
              },
              {
                text: 'Never mind',
                effects: {
                  logText: 'Decided not to enroll in coaching.'
                }
              }
            ]
          }
        });
      } else {
        set({
          activeEvent: {
            id: 'insufficient_funds_coaching',
            title: 'Coaching Fees Too High',
            description: `Enrollment in Kota or Delhi coaching requires ${formatCurrency(fee)}. You don't have enough money.`,
            emoji: '❌',
            options: [{ text: 'Bummer', effects: { logText: 'You couldn\'t afford coaching classes.' } }]
          }
        });
      }
      return;
    }

    const updated = { ...player };
    updated.stats.money -= fee;
    updated.education.prepCoaching = type;
    updated.biography.push(`✏️ Enrolled in ${type} coaching. Paid fees of ${formatCurrency(fee)}.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  applyJob: (pathKey) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) {
      set({
        activeEvent: {
          id: 'minor_job_restricted',
          title: 'Labor Rules Restriction',
          description: 'You must be at least 18 years old to apply for formal corporate careers.',
          emoji: '⚠️',
          options: [{ text: 'Understand', effects: { logText: 'Attempted to get a corporate job as a minor.' } }]
        }
      });
      return false;
    }

    const path = CAREER_PATHS[pathKey];
    if (!path) return false;

    // Check entry qualifications
    const req = path.entryRequirements;
    let eligible = true;
    let reason = '';

    if (req.education && req.education.length > 0) {
      if (!req.education.includes(player.education.currentDegree || '')) {
        eligible = false;
        reason = `Requires degree in ${req.education.join(' or ')}.`;
      }
    }
    if (req.examsPassed && req.examsPassed.length > 0) {
      // Checked separately
      eligible = false;
      reason = 'Must clear specific competitive entrance exam first.';
    }
    if (req.intelligence && player.stats.intelligence < req.intelligence) {
      eligible = false;
      reason = `Requires at least ${req.intelligence}% Intelligence.`;
    }
    if (req.fitness && player.stats.fitness < req.fitness) {
      eligible = false;
      reason = `Requires at least ${req.fitness}% Fitness.`;
    }

    if (!eligible) {
      set({
        activeEvent: {
          id: `job_reject_${pathKey}`,
          title: 'Job Application Rejected',
          description: `You applied for ${path.name} SDE but were rejected. Reason: ${reason}`,
          emoji: '❌',
          options: [{ text: 'Try something else', effects: { logText: `Rejected from job: ${path.name}.` } }]
        }
      });
      return false;
    }

    const updated = { ...player };
    updated.career = {
      type: 'Job',
      name: path.name,
      levelIndex: 0,
      salary: path.levels[0].salary,
      job: {
        name: path.levels[0].title,
        companyTier: 'Mid-size',
        yearsInRole: 0,
        performance: 70
      }
    };
    updated.biography.push(`💼 Joined company as a ${path.levels[0].title} with salary ${formatCurrency(path.levels[0].salary)}/yr.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  workHard: () => {
    const { player } = get();
    if (!player || player.career.type === 'None') return;

    const updated = { ...player };
    if (updated.career.job) {
      updated.career.job.performance = Math.min(100, updated.career.job.performance + 15);
    }
    updated.stats.happiness = Math.max(0, updated.stats.happiness - 5);
    updated.stats.health = Math.max(0, updated.stats.health - 2);
    updated.biography.push('💼 You put extra hours into your work. Slogging away!');
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  resignJob: () => {
    const { player } = get();
    if (!player || player.career.type === 'None') return;

    const updated = { ...player };
    updated.biography.push(`💼 Resigned from your role as a ${updated.career.name}.`);
    updated.career = { type: 'None', name: 'None', levelIndex: 0, salary: 0 };
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  // specialized careers
  trainCricket: (action) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    if (!updated.career.cricket) {
      // Set up cricket trial career
      updated.career = {
        type: 'Cricket',
        name: 'Cricket - Gully Cricketer',
        levelIndex: 0,
        salary: 0,
        cricket: { stage: 'Gully Cricket', batting: 20, bowling: 20, runs: 0, wickets: 0, matchExperience: 0 }
      };
    }

    const c = updated.career.cricket!;
    if (action === 'batting') {
      c.batting = Math.min(100, c.batting + 8);
      updated.biography.push('🏏 Trained batting in the nets.');
    } else if (action === 'bowling') {
      c.bowling = Math.min(100, c.bowling + 8);
      updated.biography.push('🏏 Trained bowling in the academy.');
    } else if (action === 'fitness') {
      updated.stats.fitness = Math.min(100, updated.stats.fitness + 12);
      updated.biography.push('🏃 Ran laps and worked on cricket fielding agility.');
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  cricketMatch: () => {
    const { player } = get();
    if (!player || player.career.type !== 'Cricket') return;

    const updated = { ...player };
    const c = updated.career.cricket!;
    
    c.matchExperience += 1;
    const runsThisMatch = randomRange(c.batting * 0.4, c.batting * 1.6);
    const wicketsThisMatch = randomRange(0, c.bowling > 50 ? 3 : 1);
    
    c.runs += runsThisMatch;
    c.wickets += wicketsThisMatch;
    
    updated.biography.push(`🏏 MATCH DAY: You scored ${runsThisMatch} runs and took ${wicketsThisMatch} wickets.`);
    
    // Check WC Winner conditions
    if (c.stage === 'Indian National Team' && Math.random() > 0.8 && !updated.achievements.includes('WorldCupWinner')) {
      setTimeout(() => get().unlockAchievement('WorldCupWinner'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  bollywoodAudition: () => {
    const { player } = get();
    if (!player) return;

    // Apply audition
    const looks = player.stats.fitness + player.stats.health; // abstraction for appearance
    const isAttractive = player.traits.includes('Attractive');
    const isCreative = player.traits.includes('Creative');
    const auditionScore = (looks * 0.4) + (isAttractive ? 30 : 0) + (isCreative ? 15 : 0) + randomRange(10, 30);
    
    const updated = { ...player };
    if (auditionScore > 65) {
      updated.career = {
        type: 'Bollywood',
        name: 'Bollywood - Supporting Actor',
        levelIndex: 3,
        salary: CAREER_PATHS.Bollywood.levels[3].salary,
        bollywood: {
          stage: 'Supporting Actor',
          actingSkill: 45,
          boxOfficeHits: 0,
          awardsCount: 0
        }
      };
      updated.stats.fame = Math.min(100, updated.stats.fame + 15);
      updated.biography.push(`🎬 Audition Passed! A director offered you a supporting role in an upcoming film. Salary: ${formatCurrency(updated.career.salary)}/yr.`);
    } else {
      updated.biography.push('❌ Audition Rejected. Directors felt you lacked screen presence.');
      updated.stats.happiness = Math.max(0, updated.stats.happiness - 5);
    }
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  releaseBollywoodMovie: () => {
    const { player } = get();
    if (!player || player.career.type !== 'Bollywood') return;

    const updated = { ...player };
    const b = updated.career.bollywood!;
    
    b.actingSkill = Math.min(100, b.actingSkill + 6);
    const hitRoll = Math.random() + (b.actingSkill / 200);
    
    let outcome = 'Flop';
    if (hitRoll > 0.85) {
      outcome = 'Superhit';
      b.boxOfficeHits += 1;
      updated.stats.fame = Math.min(100, updated.stats.fame + 25);
      updated.stats.money += 5000000; // bonus
    } else if (hitRoll > 0.55) {
      outcome = 'Average';
      updated.stats.fame = Math.min(100, updated.stats.fame + 5);
    } else {
      updated.stats.fame = Math.max(0, updated.stats.fame - 5);
    }

    updated.biography.push(`🎬 Movie Released! The film was declared a ${outcome.toUpperCase()} at the box office.`);
    
    // Awards roll
    if (outcome === 'Superhit' && Math.random() > 0.7) {
      b.awardsCount += 1;
      updated.biography.push('🏆 Award Ceremony: You won the Filmfare Award for Best Actor!');
      setTimeout(() => get().unlockAchievement('NationalAward'), 100);
    }

    // Level progression
    const levels = CAREER_PATHS.Bollywood.levels;
    const currentLvlIdx = updated.career.levelIndex;
    if (currentLvlIdx < levels.length - 1) {
      if (b.boxOfficeHits >= 2 && currentLvlIdx === 3) {
        // Upgrade to lead actor
        updated.career.levelIndex = 4;
        updated.career.salary = levels[4].salary;
        updated.career.name = `Bollywood - Lead Actor`;
        updated.biography.push('🎬 A-List Promotion: Signed a multi-crore deal as a Lead Actor!');
      } else if (b.boxOfficeHits >= 5 && currentLvlIdx === 4) {
        // Upgrade to superstar
        updated.career.levelIndex = 5;
        updated.career.salary = levels[5].salary;
        updated.career.name = `Bollywood - Superstar`;
        updated.biography.push('🎬 Movie Legend: You are officially a Bollywood Superstar!');
        setTimeout(() => get().unlockAchievement('SuperstarActor'), 100);
      }
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  politicalCampaign: (budget) => {
    const { player } = get();
    if (!player) return;

    if (player.stats.money < budget) return;

    const updated = { ...player };
    updated.stats.money -= budget;
    
    if (!updated.career.politics) {
      updated.career = {
        type: 'Politics',
        name: 'Politics - Student Leader',
        levelIndex: 0,
        salary: CAREER_PATHS.Politics.levels[0].salary,
        politics: { stage: 'Student Leader', publicApproval: 20, campaignFunds: 0, debatesWon: 0 }
      };
    }

    const p = updated.career.politics!;
    p.campaignFunds += budget;
    
    // Approval gain is log based on budget
    const approvalGain = Math.round(Math.log10(budget) * 4);
    p.publicApproval = Math.min(100, p.publicApproval + approvalGain);
    updated.biography.push(`🏛️ Political Campaign: Invested ${formatCurrency(budget)} in public relations, boosting approval to ${p.publicApproval}%.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  runForElection: () => {
    const { player } = get();
    if (!player || player.career.type !== 'Politics') return;

    const updated = { ...player };
    const p = updated.career.politics!;
    
    const levels = CAREER_PATHS.Politics.levels;
    const currentLvlIdx = updated.career.levelIndex;
    const nextLvl = levels[currentLvlIdx + 1];

    if (!nextLvl) return;

    const isWinner = p.publicApproval > 60 && Math.random() < (p.publicApproval / 100);

    if (isWinner) {
      updated.career.levelIndex += 1;
      updated.career.salary = nextLvl.salary;
      updated.career.name = `Politics - ${nextLvl.title}`;
      p.publicApproval = 50; // reset baseline
      updated.biography.push(`🏢 ELECTION RESULTS: You WON the election and sworn in as ${nextLvl.title}! Salary: ${formatCurrency(nextLvl.salary)}/yr.`);
      
      if (nextLvl.title === 'Chief Minister') {
        setTimeout(() => get().unlockAchievement('CMTitle'), 100);
      } else if (nextLvl.title === 'Prime Minister of India') {
        setTimeout(() => get().unlockAchievement('PMTitle'), 100);
      }
    } else {
      updated.biography.push(`❌ ELECTION RESULTS: You LOST the election. Voters rejected your campaign.`);
      p.publicApproval = Math.max(10, p.publicApproval - 20);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  interactRelationship: (id, action) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.relationships = updated.relationships.map((r) => {
      if (r.id !== id) return r;
      let rel = { ...r };
      
      if (action === 'spend_time') {
        rel.level = Math.min(100, rel.level + 10);
        updated.stats.happiness = Math.min(100, updated.stats.happiness + 5);
        updated.biography.push(`👥 Spent time chatting and drinking chai with your ${rel.relation.toLowerCase()} (${rel.name}).`);
      } else if (action === 'conversation') {
        const dialog = randomSelect([
          'talked about current affairs in India.',
          'argued about IPL team strategies.',
          'discussed future wedding expectations.',
          'shared sweet childhood memories.'
        ]);
        rel.level = Math.min(100, rel.level + randomRange(3, 8));
        updated.biography.push(`👥 Conversed with ${rel.name}. You ${dialog}`);
      } else if (action === 'gift') {
        const giftCost = 15000;
        if (updated.stats.money >= giftCost) {
          updated.stats.money -= giftCost;
          rel.level = Math.min(100, rel.level + 20);
          updated.biography.push(`👥 Gifted a box of Kaju Katli and luxury sweets to ${rel.name} (-₹15k).`);
        } else {
          updated.biography.push(`👥 Tried to buy a gift for ${rel.name} but lacked pocket money.`);
        }
      } else if (action === 'insult') {
        rel.level = Math.max(0, rel.level - 25);
        updated.stats.reputation = Math.max(0, updated.stats.reputation - 10);
        updated.biography.push(`👥 Insulted ${rel.name} over dinner. The atmosphere grew tense.`);
      }
      return rel;
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  askParentsForMoney: (id) => {
    const { player } = get();
    if (!player) return;
    const target = player.relationships.find(r => r.id === id);
    if (!target || (target.relation !== 'Father' && target.relation !== 'Mother')) return;

    const relLevel = target.level;
    const wealth = player.wealthClass;
    
    let maxAmount = 1000;
    if (wealth === 'Lower Middle Class') maxAmount = 2000;
    else if (wealth === 'Middle Class') maxAmount = 5000;
    else if (wealth === 'Upper Middle Class') maxAmount = 15000;
    else if (wealth === 'Rich') maxAmount = 50000;
    else if (wealth === 'Royal Family') maxAmount = 500000;
    
    const roll = Math.random() * 100;
    const successChance = (relLevel * 0.7) + (target.compatibility * 0.3);
    const updated = { ...player };

    if (roll < successChance) {
      const amount = Math.round(maxAmount * (0.5 + Math.random() * 0.5));
      updated.stats.money += amount;
      updated.biography.push(`💰 Asked ${target.name} (${target.relation}) for money. They gave you ${formatCurrency(amount)}.`);
      updated.stats.happiness = Math.min(100, updated.stats.happiness + 5);
      
      updated.relationships = updated.relationships.map(r => {
        if (r.id === id) {
          return { ...r, level: Math.min(100, r.level + 4) };
        }
        return r;
      });
      
      set({
        player: updated,
        activeEvent: {
          id: `ask_money_success_${Date.now()}`,
          title: '💰 Pocket Money Granted!',
          description: `Your ${target.relation.toLowerCase()} (${target.name}) handed you ${formatCurrency(amount)} pocket money.`,
          emoji: '😊',
          options: [{ text: 'Thank you!', effects: { logText: 'Thanked parents for the money.' } }]
        }
      });
    } else {
      updated.stats.happiness = Math.max(0, updated.stats.happiness - 8);
      updated.relationships = updated.relationships.map(r => {
        if (r.id === id) {
          return { ...r, level: Math.max(0, r.level - 5) };
        }
        return r;
      });

      set({
        player: updated,
        activeEvent: {
          id: `ask_money_fail_${Date.now()}`,
          title: '❌ Request Refused',
          description: `Your ${target.relation.toLowerCase()} (${target.name}) told you to save your money and refused to give you any.`,
          emoji: '😠',
          options: [{ text: 'Disappointing', effects: { logText: 'Parents refused to give pocket money.' } }]
        }
      });
    }
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  proposeMarriage: (id) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) return false;

    const target = player.relationships.find(r => r.id === id);
    if (!target || target.relation !== 'Partner') return false;

    const ringCost = 250000; // ₹2.5 Lakhs
    if (player.stats.money < ringCost) {
      set({
        activeEvent: {
          id: 'ring_insufficient',
          title: 'Proposal Lacked Funds',
          description: 'A proper gold diamond engagement ring costs ₹2.5 Lakhs. You do not have enough funds.',
          emoji: '💍',
          options: [{ text: 'Back down', effects: { logText: 'You postponed the proposal.' } }]
        }
      });
      return false;
    }

    const isAccepted = target.level > 70 && Math.random() > 0.2;
    const updated = { ...player };
    updated.stats.money -= ringCost;

    if (isAccepted) {
      updated.relationships = updated.relationships.map((r) => {
        if (r.id === id) {
          return { ...r, relation: 'Spouse' };
        }
        return r;
      });
      updated.biography.push(`💍 Proposed to ${target.name} with a diamond ring. They said YES! You are now married.`);
      updated.stats.happiness = Math.min(100, updated.stats.happiness + 20);
    } else {
      updated.biography.push(`💔 Proposed to ${target.name}. They rejected the ring, saying they aren\'t ready.`);
      updated.stats.happiness = Math.max(0, updated.stats.happiness - 15);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return isAccepted;
  },

  haveBaby: () => {
    const { player } = get();
    if (!player) return;
    if (player.age < 18) return;

    const hasSpouse = player.relationships.some(r => r.relation === 'Spouse');
    if (!hasSpouse) {
      set({
        activeEvent: {
          id: 'no_spouse_baby',
          title: 'Parenting Advice',
          description: 'It is highly recommended to get married in India before planning children.',
          emoji: '🍼',
          options: [{ text: 'Find a partner first', effects: { logText: 'Decided to wait for marriage.' } }]
        }
      });
      return;
    }

    const childGender = Math.random() > 0.5 ? 'Male' : 'Female';
    const region = getRegionOfCity(player.currentCity);
    const names = INDIAN_NAMES[region];
    const cName = childGender === 'Male' ? randomSelect(names.firstNamesMale) : randomSelect(names.firstNamesFemale);
    const childName = `${cName} ${player.name.split(' ').slice(1).join(' ')}`;

    const child: Relationship = {
      id: Math.random().toString(),
      name: childName,
      relation: 'Child',
      level: 90,
      compatibility: randomRange(65, 95),
      age: 0,
      gender: childGender,
      isDead: false
    };

    const updated = { ...player };
    updated.relationships.push(child);
    updated.biography.push(`🍼 Baby Born! You welcomed a beautiful baby ${childGender.toLowerCase()} named ${childName} into the world.`);
    updated.stats.happiness = Math.min(100, updated.stats.happiness + 15);
    
    // Check Hum Do Humare Chaar achievement
    const kidsCount = updated.relationships.filter(r => r.relation === 'Child').length;
    if (kidsCount >= 4) {
      setTimeout(() => get().unlockAchievement('LargeFamily'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  // Investments
  investMutualFunds: (amount) => {
    const { player } = get();
    if (!player || player.stats.money < amount) return false;
    if (player.age < 18) return false;

    const updated = { ...player };
    updated.stats.money -= amount;
    updated.investments.mutualFunds += amount;
    updated.biography.push(`📊 Invested ${formatCurrency(amount)} into safe equity/debt Mutual Funds.`);
    
    if (updated.investments.mutualFunds + updated.investments.stocks >= 500000000) {
      setTimeout(() => get().unlockAchievement('MarketWizard'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  withdrawMutualFunds: (amount) => {
    const { player } = get();
    if (!player || player.investments.mutualFunds < amount) return false;

    const updated = { ...player };
    updated.stats.money += amount;
    updated.investments.mutualFunds -= amount;
    updated.biography.push(`📊 Withdrew ${formatCurrency(amount)} from your Mutual Funds portfolio.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  buyStocks: (amount) => {
    const { player } = get();
    if (!player || player.stats.money < amount) return false;
    if (player.age < 18) return false;

    const updated = { ...player };
    updated.stats.money -= amount;
    updated.investments.stocks += amount;
    updated.biography.push(`📈 Purchased shares of blue-chip Indian companies worth ${formatCurrency(amount)}.`);
    
    if (updated.investments.mutualFunds + updated.investments.stocks >= 500000000) {
      setTimeout(() => get().unlockAchievement('MarketWizard'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  sellStocks: (amount) => {
    const { player } = get();
    if (!player || player.investments.stocks < amount) return false;

    const updated = { ...player };
    updated.stats.money += amount;
    updated.investments.stocks -= amount;
    updated.biography.push(`📈 Sold blue-chip shares worth ${formatCurrency(amount)}.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  takeBankLoan: (amount) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) return false;

    // Apply simple loan interest rates
    const updated = { ...player };
    updated.stats.money += amount;
    updated.biography.push(`🏦 Bank Loan: Borrowed ${formatCurrency(amount)} from SBI at 9.5% annual interest.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  repayBankLoan: (amount) => {
    const { player } = get();
    if (!player || player.stats.money < amount) return false;

    const updated = { ...player };
    updated.stats.money -= amount;
    updated.biography.push(`🏦 Bank Loan: Repaid ${formatCurrency(amount)} towards outstanding debt.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  // Real estate
  buyRealEstate: (type) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) return false;

    // Price index
    let price = 3000000; // Flat
    let rent = 120000;
    let maint = 15000;
    
    if (type === 'Villa') {
      price = 15000000; rent = 480000; maint = 60000;
    } else if (type === 'Shop') {
      price = 8000000; rent = 420000; maint = 30000;
    } else if (type === 'Hotel') {
      price = 100000000; rent = 4800000; maint = 500000;
    } else if (type === 'Commercial Building') {
      price = 250000000; rent = 14400000; maint = 1000000;
    } else if (type === 'Farmhouse') {
      price = 30000000; rent = 720000; maint = 120000;
    } else if (type === 'Luxury Palace') {
      price = 1000000000; rent = 30000000; maint = 4000000;
    }

    if (player.stats.money < price) {
      set({
        activeEvent: {
          id: 're_insufficient',
          title: 'Real Estate Transaction Blocked',
          description: `Buying a ${type} requires cash balance of ${formatCurrency(price)}. Lacking liquid capital.`,
          emoji: '❌',
          options: [{ text: 'Cancel offer', effects: { logText: 'Lacked funds for real estate.' } }]
        }
      });
      return false;
    }

    const prop: RealEstateAsset = {
      id: Math.random().toString(),
      name: `${type} in ${player.currentCity}`,
      type,
      purchasePrice: price,
      currentValue: price,
      rentIncome: rent,
      maintenance: maint,
      purchaseAge: player.age,
      taxPaidThisYear: true
    };

    const updated = { ...player };
    updated.stats.money -= price;
    updated.realEstate.push(prop);
    updated.biography.push(`🏢 Property Purchased: Bought a ${type} in ${player.currentCity} for ${formatCurrency(price)}.`);
    
    // Check landlord achievements
    if (updated.realEstate.length >= 10) {
      setTimeout(() => get().unlockAchievement('RealEstateKing'), 100);
    }
    if (type === 'Luxury Palace') {
      setTimeout(() => get().unlockAchievement('PalaceOwner'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  sellRealEstate: (id) => {
    const { player } = get();
    if (!player) return;

    const prop = player.realEstate.find(x => x.id === id);
    if (!prop) return;

    const updated = { ...player };
    updated.stats.money += prop.currentValue;
    updated.realEstate = updated.realEstate.filter(x => x.id !== id);
    updated.biography.push(`🏢 Property Sold: Sold your ${prop.name} for ${formatCurrency(prop.currentValue)}.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  // Business Empire
  startBusiness: (name, category) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) return false;

    const startingFee = 500000; // ₹5 Lakhs
    if (player.stats.money < startingFee) {
      set({
        activeEvent: {
          id: 'biz_funds_low',
          title: 'Startup Capital Needed',
          description: `Registering a bootstrap startup in India requires ₹5 Lakhs for operational licenses and registration fees.`,
          emoji: '❌',
          options: [{ text: 'Re-budget', effects: { logText: 'Couldn\'t afford to bootstrap.' } }]
        }
      });
      return false;
    }

    const biz: BusinessAsset = {
      id: Math.random().toString(),
      name,
      category,
      fundingStage: 'Bootstrap',
      employees: 2,
      revenue: 600000,
      profit: 180000,
      valuation: 4000000, // ₹40 Lakhs
      investorStake: 100,
      yearsActive: 0
    };

    const updated = { ...player };
    updated.stats.money -= startingFee;
    updated.businesses.push(biz);
    updated.biography.push(`🦄 Founded Startup: Launched "${name}" (${category}) with a seed bootstrap size of 2 employees.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  hireEmployees: (id, count) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.businesses = updated.businesses.map((b) => {
      if (b.id !== id) return b;
      const total = b.employees + count;
      return { ...b, employees: total };
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  fireEmployees: (id, count) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.businesses = updated.businesses.map((b) => {
      if (b.id !== id) return b;
      const total = Math.max(1, b.employees - count);
      return { ...b, employees: total };
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  expandBusinessOps: (id) => {
    const { player } = get();
    if (!player) return false;

    const cost = 2500000; // ₹25 Lakhs
    if (player.stats.money < cost) return false;

    const updated = { ...player };
    updated.stats.money -= cost;
    updated.businesses = updated.businesses.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        valuation: Math.round(b.valuation * 1.5),
        revenue: Math.round(b.revenue * 1.4)
      };
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  raiseFunding: (id) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.businesses = updated.businesses.map((b) => {
      if (b.id !== id) return b;
      
      let nextStage: BusinessAsset['fundingStage'] = 'Seed';
      let cashInject = 0;
      let dilution = 0;

      if (b.fundingStage === 'Bootstrap') {
        nextStage = 'Seed'; cashInject = 5000000; dilution = 15; // ₹50 Lakhs
      } else if (b.fundingStage === 'Seed') {
        nextStage = 'Series A'; cashInject = 30000000; dilution = 20; // ₹3 Crore
      } else if (b.fundingStage === 'Series A') {
        nextStage = 'Series B'; cashInject = 150000000; dilution = 15; // ₹15 Crore
      } else if (b.fundingStage === 'Series B') {
        nextStage = 'Series C'; cashInject = 800000000; dilution = 10; // ₹80 Crore
      } else {
        return b;
      }

      if (b.investorStake <= dilution) return b; // cannot dilute more

      b.fundingStage = nextStage;
      b.investorStake -= dilution;
      b.valuation = Math.round((b.valuation + cashInject) * 1.3);
      updated.stats.money += cashInject;
      updated.biography.push(`🦄 Funding Raised: "${b.name}" closed its ${nextStage} round, diluting ${dilution}% and injecting ${formatCurrency(cashInject)} cash into your bank account!`);
      
      // Check Unicorn threshold
      if (b.valuation >= 8000000000) { // ₹800 Crore (~$100M)
        setTimeout(() => get().unlockAchievement('DecacornFounder'), 100);
      }
      return b;
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  ipoBusiness: (id) => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.businesses = updated.businesses.map((b) => {
      if (b.id !== id || b.valuation < 1000000000) return b; // requires ₹100 Crore

      b.fundingStage = 'IPO';
      // Sell 20% stake during IPO to public
      const sellStake = Math.min(20, b.investorStake - 5);
      const cashOut = Math.round(b.valuation * (sellStake / 100));
      
      b.investorStake -= sellStake;
      updated.stats.money += cashOut;
      updated.biography.push(`📈 IPO listed: Listed "${b.name}" on national stock exchange. Diluted ${sellStake}% for ${formatCurrency(cashOut)} liquidity!`);
      setTimeout(() => get().unlockAchievement('IPOClub'), 100);
      
      return b;
    });

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  sellBusiness: (id) => {
    const { player } = get();
    if (!player) return;

    const biz = player.businesses.find(x => x.id === id);
    if (!biz) return;

    const payout = Math.round(biz.valuation * (biz.investorStake / 100));
    const updated = { ...player };
    updated.stats.money += payout;
    updated.businesses = updated.businesses.filter(x => x.id !== id);
    updated.biography.push(`🦄 Sold Startup: Sold your equity stake in "${biz.name}" for ${formatCurrency(payout)} cash payout.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  // Social Media
  postSocialMedia: (platform, _type) => {
    const { player } = get();
    if (!player) return;
    if (player.age < 13) return;

    const acc = player.socialMedia[platform];
    const attractive = player.traits.includes('Attractive');
    const creative = player.traits.includes('Creative');

    acc.postsCount += 1;
    
    // Growth formula
    let gain = randomRange(50, 500);
    if (player.stats.fame > 10) gain += player.stats.fame * 350;
    if (attractive) gain *= 1.3;
    if (creative) gain *= 1.4;

    acc.followers = Math.round(acc.followers + gain);
    updatedPlayerStats(player, platform, acc, gain);
  },

  runSocialAds: (platform, budget) => {
    const { player } = get();
    if (!player || player.stats.money < budget) return false;

    const updated = { ...player };
    updated.stats.money -= budget;
    
    const acc = updated.socialMedia[platform];
    const gain = Math.round(budget * 0.35); // ₹1 per ~3 followers
    acc.followers += gain;
    updated.biography.push(`📱 Social Ads: Paid ${formatCurrency(budget)} for sponsored ads on ${platform}, gaining ${gain.toLocaleString()} followers.`);
    
    if (acc.followers >= 10000000) {
      setTimeout(() => get().unlockAchievement('SocialMediaKing'), 100);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  // Migration
  applyVisa: (country, method) => {
    const { player } = get();
    if (!player) return false;
    if (player.age < 18) return false;

    let fee = 250000; // ₹2.5L
    let reqIntel = 60;
    let reqMoney = 800000;

    if (method === 'Investor Visa') {
      reqMoney = 50000000; // ₹5 Crore
      fee = 500000;
    } else if (method === 'Student Visa') {
      reqIntel = 70;
      reqMoney = 1500000;
    }

    if (player.stats.money < fee + reqMoney) {
      set({
        activeEvent: {
          id: 'visa_reject_funds',
          title: 'Visa Application Rejected',
          description: `The Consulate of ${country} rejected your application. You failed the financial solvency check. Requirements: ${formatCurrency(fee + reqMoney)}.`,
          emoji: '🛂',
          options: [{ text: 'Apply elsewhere', effects: { logText: `Visa to ${country} rejected due to insufficient bank balance.` } }]
        }
      });
      return false;
    }

    // Pass visa check
    const isApproved = player.stats.intelligence >= reqIntel && Math.random() > 0.15;
    const updated = { ...player };
    updated.stats.money -= fee;

    if (isApproved) {
      updated.currentCountry = country;
      updated.currentCity = country === 'USA' ? 'New York' : country === 'UK' ? 'London' : country === 'Germany' ? 'Munich' : country === 'UAE' ? 'Dubai' : country === 'Japan' ? 'Tokyo' : 'Singapore'; // simple mapper
      updated.visaStatus = 'Visa Approved';
      updated.biography.push(`✈️ Migration: Your ${method} to ${country} was APPROVED! You moved to ${updated.currentCity}.`);
      setTimeout(() => get().unlockAchievement('NriStatus'), 100);
      
      // If USA, Canada, UK, Germany
      if (['USA', 'UK', 'Germany'].includes(country)) {
        setTimeout(() => get().unlockAchievement('GlobalCitizen'), 200);
      }
    } else {
      updated.biography.push(`❌ Visa Rejected: ${country} rejected your visa request.`);
      updated.stats.happiness = Math.max(0, updated.stats.happiness - 10);
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return isApproved;
  },

  relocateCity: (cityName) => {
    const { player } = get();
    if (!player) return false;

    const cityData = CITIES[cityName];
    if (!cityData || player.stats.money < cityData.relocationFee) return false;

    const updated = { ...player };
    updated.stats.money -= cityData.relocationFee;
    updated.currentCity = cityName;
    updated.biography.push(`🚚 Relocated: Moved to ${cityName}. Cost: ${formatCurrency(cityData.relocationFee)}.`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
    return true;
  },

  // Utilities
  gymWorkout: () => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.stats.fitness = Math.min(100, updated.stats.fitness + 15);
    updated.stats.health = Math.min(100, updated.stats.health + 5);
    updated.stats.happiness = Math.min(100, updated.stats.happiness + 5);
    updated.biography.push('🏋️ Gym Workout: You lifted weights and performed cardio at Gold\'s Gym.');
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  meditate: () => {
    const { player } = get();
    if (!player) return;

    const updated = { ...player };
    updated.stats.happiness = Math.min(100, updated.stats.happiness + 12);
    updated.stats.health = Math.min(100, updated.stats.health + 3);
    updated.biography.push('🧘 Meditation: Practised Vipassana meditation under a tree. Mindfulness attained.');
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  visitDoctor: () => {
    const { player } = get();
    if (!player) return;

    const charge = 5000;
    if (player.stats.money < charge) return;

    const updated = { ...player };
    updated.stats.money -= charge;
    updated.stats.health = Math.min(100, updated.stats.health + 25);
    updated.stats.happiness = Math.min(100, updated.stats.happiness + 8);
    updated.biography.push(`🩺 Doctor Visit: Consultation at Apollo Hospital. Got medicines for seasonal fatigue (-₹${charge}).`);
    
    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  },

  buyLotteryTicket: () => {
    const { player } = get();
    if (!player) return;

    const ticketPrice = 1000;
    if (player.stats.money < ticketPrice) return;

    const updated = { ...player };
    updated.stats.money -= ticketPrice;

    // 1 in 100 chance to win ₹1 Crore jackpot
    const isWin = Math.random() < 0.015;
    if (isWin) {
      const winnings = 10000000;
      updated.stats.money += winnings;
      updated.biography.push(`🎰 JACKPOT! You won the Mega Diwali bumper lottery jackpot of ${formatCurrency(winnings)}!`);
      updated.stats.happiness = 100;
      setTimeout(() => get().unlockAchievement('LuckyWin'), 100);
    } else {
      updated.biography.push('🎰 Lottery: Purchased a ticket, but your numbers didn\'t match.');
    }

    set({ player: updated });
    localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
  }
}));

// Social media follow count helper
function updatedPlayerStats(player: Player, platform: keyof SocialPlatforms, acc: any, gain: number) {
  const updated = { ...player };
  updated.socialMedia[platform] = acc;
  updated.biography.push(`📱 Posted on ${platform}. Gained ${gain.toLocaleString()} followers.`);
  
  if (acc.followers >= 10000000) {
    setTimeout(() => useGameStore.getState().unlockAchievement('SocialMediaKing'), 100);
  }
  
  useGameStore.setState({ player: updated });
  localStorage.setItem('bitlife_india_save', JSON.stringify(updated));
}
