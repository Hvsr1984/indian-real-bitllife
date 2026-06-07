export interface PlayerStats {
  health: number; // 0 - 100
  happiness: number; // 0 - 100
  intelligence: number; // 0 - 100
  fitness: number; // 0 - 100
  reputation: number; // 0 - 100
  money: number; // in Rupees (₹), can be negative
  fame: number; // 0 - 100
}

export type FameLevel = 'Unknown' | 'Local Celebrity' | 'Regional Star' | 'National Celebrity' | 'Global Icon';

export type WealthClass = 'Poor' | 'Lower Middle Class' | 'Middle Class' | 'Upper Middle Class' | 'Rich' | 'Royal Family';

export type EconomyState = 
  | 'Economic Boom' 
  | 'Recession' 
  | 'Inflation Surge' 
  | 'Real Estate Boom' 
  | 'Stock Market Crash' 
  | 'Startup Funding Wave' 
  | 'Employment Crisis';

export type VisaStatus = 'None' | 'Visa Approved' | 'Temporary Resident' | 'Permanent Resident' | 'Citizen';

export interface Relationship {
  id: string;
  name: string;
  relation: 'Mother' | 'Father' | 'Sibling' | 'Friend' | 'Best Friend' | 'Partner' | 'Spouse' | 'Child';
  level: number; // 0 - 100
  compatibility: number; // 0 - 100
  age: number;
  gender: 'Male' | 'Female';
  isDead: boolean;
  profession?: string;
}

export interface CricketCareer {
  stage: 'Gully Cricket' | 'School Team' | 'District Team' | 'State Team' | 'Ranji Trophy' | 'IPL' | 'Indian National Team';
  batting: number; // 0-100
  bowling: number; // 0-100
  runs: number;
  wickets: number;
  matchExperience: number;
}

export interface BollywoodCareer {
  stage: 'Auditions' | 'Side Roles' | 'TV Shows' | 'Supporting Actor' | 'Lead Actor' | 'Superstar';
  actingSkill: number; // 0-100
  boxOfficeHits: number;
  awardsCount: number;
}

export interface PoliticsCareer {
  stage: 'Student Leader' | 'Local Councillor' | 'MLA' | 'MP' | 'Chief Minister' | 'Prime Minister';
  publicApproval: number; // 0-100
  campaignFunds: number;
  debatesWon: number;
}

export interface StandardJob {
  name: string;
  companyTier: 'StartUp' | 'Mid-size' | 'MNC' | 'Conglomerate';
  yearsInRole: number;
  performance: number; // 0-100
}

export interface CareerState {
  type: 'None' | 'Job' | 'Cricket' | 'Bollywood' | 'Politics' | 'Business';
  name: string;
  levelIndex: number;
  salary: number; // yearly ₹
  cricket?: CricketCareer;
  bollywood?: BollywoodCareer;
  politics?: PoliticsCareer;
  job?: StandardJob;
}

export interface RealEstateAsset {
  id: string;
  name: string;
  type: 'Flat' | 'Villa' | 'Shop' | 'Hotel' | 'Commercial Building' | 'Farmhouse' | 'Luxury Palace';
  purchasePrice: number;
  currentValue: number;
  rentIncome: number;
  maintenance: number;
  purchaseAge: number;
  taxPaidThisYear: boolean;
}

export interface BusinessAsset {
  id: string;
  name: string;
  category: 'Technology' | 'Real Estate' | 'Healthcare' | 'Education' | 'E-Commerce' | 'Manufacturing';
  fundingStage: 'Bootstrap' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'IPO';
  employees: number;
  revenue: number; // yearly ₹
  profit: number; // yearly ₹
  valuation: number; // ₹
  investorStake: number; // percentage (0-100) owned by player
  yearsActive: number;
}

export interface SocialMediaAccount {
  followers: number;
  engagement: number; // percentage (0.1 - 10)
  postsCount: number;
}

export interface SocialPlatforms {
  instagram: SocialMediaAccount;
  youtube: SocialMediaAccount;
  x: SocialMediaAccount;
  linkedin: SocialMediaAccount;
}

export interface AvatarAttributes {
  gender: 'Male' | 'Female';
  skinTone: string; // hex
  hairStyle: string; // id
  hairColor: string; // hex
  beard?: string; // id
  glasses?: string; // id
  clothing: string; // id
}

export interface Ancestor {
  id: string;
  name: string;
  ageAtDeath: number;
  causeOfDeath: string;
  careerSummary: string;
  finalWealth: number;
  generation: number;
}

export interface LifeLogEntry {
  id: string;
  year: number;
  text: string;
  emoji: string;
  type: 'system' | 'stats' | 'career' | 'school' | 'relationship' | 'finance' | 'health' | 'news' | 'achievement' | 'migration';
}

export interface ChoiceOption {
  text: string;
  effects: {
    stats?: Partial<PlayerStats>;
    money?: number;
    logText: string;
    fame?: number;
    customTrigger?: string; // e.g. "passJEE", "failNEET", "marryArranged", "relocate", etc.
  };
}

export interface ChoiceEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  options: ChoiceOption[];
  stageRequirement?: string[]; // infant, school, college, career, old_age
  condition?: (player: Player) => boolean;
}

export interface Player {
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  currentCity: string;
  birthCity: string;
  currentCountry: string; // "India" or foreign countries
  visaStatus: VisaStatus;
  wealthClass: WealthClass;
  stats: PlayerStats;
  traits: string[]; // 2-4 traits
  avatar: AvatarAttributes;
  education: {
    stage: 'Infant' | 'Childhood' | 'School' | 'High School' | 'College' | 'Finished';
    schoolType?: 'Government School' | 'Private School';
    currentDegree?: string;
    stream?: 'Science' | 'Commerce' | 'Arts';
    prepCoaching?: 'None' | 'JEE Prep' | 'NEET Prep' | 'UPSC Prep' | 'NDA Prep' | 'CAT Prep' | 'CA Prep';
    studyEffort: number; // 0 - 100
    scholarship: boolean;
    examsPassed?: string[];
  };
  career: CareerState;
  relationships: Relationship[];
  realEstate: RealEstateAsset[];
  businesses: BusinessAsset[];
  investments: {
    mutualFunds: number; // money invested
    stocks: number; // money invested
    crypto: number;
  };
  socialMedia: SocialPlatforms;
  isDead: boolean;
  causeOfDeath?: string;
  achievements: string[]; // ids of unlocked achievements
  generation: number;
  biography: string[];
  inheritanceTrust?: number;
}

export interface HallOfFameRecord {
  id: string;
  name: string;
  age: number;
  careerSummary: string;
  netWorth: number;
  achievementsCount: number;
  generation: number;
  biographySummary: string;
}
