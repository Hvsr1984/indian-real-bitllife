export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'academic' | 'career' | 'wealth' | 'fame' | 'family' | 'misc';
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  // Academic
  IITGrad: { id: 'IITGrad', title: 'IIT Graduate', description: 'Graduated from the prestigious Indian Institute of Technology (IIT).', emoji: '🎓', category: 'academic' },
  AIIMSGrad: { id: 'AIIMSGrad', title: 'AIIMS Doctor', description: 'Graduated from the top medical school AIIMS.', emoji: '🩺', category: 'academic' },
  IIMGrad: { id: 'IIMGrad', title: 'IIM Elite', description: 'Graduated with an MBA from the Indian Institute of Management (IIM).', emoji: '💼', category: 'academic' },
  KotaSurvivor: { id: 'KotaSurvivor', title: 'Kota Survivor', description: 'Survived Kota competitive coaching and passed JEE or NEET.', emoji: '✏️', category: 'academic' },
  UPSCWinner: { id: 'UPSCWinner', title: 'UPSC Cracker', description: 'Cleared the Civil Services Exam on your first try.', emoji: '🏛️', category: 'academic' },
  ForeignDegree: { id: 'ForeignDegree', title: 'Ivy Leaguer', description: 'Completed a degree at a foreign university.', emoji: '✈️', category: 'academic' },
  Scholar: { id: 'Scholar', title: 'Scholarship Holder', description: 'Obtained a 100% scholarship for higher studies.', emoji: '📜', category: 'academic' },

  // Careers
  IASOfficer: { id: 'IASOfficer', title: 'IAS Officer', description: 'Achieved the rank of an IAS officer and governed districts.', emoji: '🦁', category: 'career' },
  IPSOfficer: { id: 'IPSOfficer', title: 'IPS Officer', description: 'Led police forces as an IPS officer.', emoji: '👮', category: 'career' },
  CMTitle: { id: 'CMTitle', title: 'Chief Minister', description: 'Elected as the Chief Minister of an Indian state.', emoji: '🏢', category: 'career' },
  PMTitle: { id: 'PMTitle', title: 'Prime Minister', description: 'Elected as the Prime Minister of India.', emoji: '🇮🇳', category: 'career' },
  CricketNational: { id: 'CricketNational', title: 'Men in Blue', description: 'Represented India on the National Cricket Team.', emoji: '🏏', category: 'career' },
  IPLCaptain: { id: 'IPLCaptain', title: 'IPL Champion', description: 'Captain of an IPL franchise and won the trophy.', emoji: '🏆', category: 'career' },
  WorldCupWinner: { id: 'WorldCupWinner', title: 'World Cup Winner', description: 'Won the Cricket World Cup for India.', emoji: '🌍', category: 'career' },
  SuperstarActor: { id: 'SuperstarActor', title: 'Bollywood Superstar', description: 'Achieved Superstar status in the Bollywood film industry.', emoji: '🎬', category: 'career' },
  NationalAward: { id: 'NationalAward', title: 'National Award Winner', description: 'Won a prestigious national award for best actor.', emoji: '🎖️', category: 'career' },
  SponsorshipKing: { id: 'SponsorshipKing', title: 'Endorsement Star', description: 'Signed a ₹50 Crore brand endorsement deal.', emoji: '💸', category: 'career' },
  CTOTitle: { id: 'CTOTitle', title: 'CTO', description: 'Promoted to Chief Technology Officer or Principal Architect.', emoji: '💻', category: 'career' },
  HODTitle: { id: 'HODTitle', title: 'HOD Medicine', description: 'Became Head of Department at a top medical clinic.', emoji: '🏥', category: 'career' },

  // Wealth & Business
  Lakhpati: { id: 'Lakhpati', title: 'Lakhpati', description: 'Amassed a net worth of over ₹1 Lakh.', emoji: '💰', category: 'wealth' },
  Crorepati: { id: 'Crorepati', title: 'Crorepati', description: 'Amassed a net worth of over ₹1 Crore.', emoji: '💎', category: 'wealth' },
  Billionaire: { id: 'Billionaire', title: 'Billionaire', description: 'Amassed a net worth of over ₹8,000 Crore ($1B+).', emoji: '👑', category: 'wealth' },
  DecacornFounder: { id: 'DecacornFounder', title: 'Decacorn Founder', description: 'Built a startup with a valuation of over ₹80,000 Crore.', emoji: '🦄', category: 'wealth' },
  RealEstateKing: { id: 'RealEstateKing', title: 'Real Estate King', description: 'Owned more than 10 properties simultaneously.', emoji: '🏢', category: 'wealth' },
  PalaceOwner: { id: 'PalaceOwner', title: 'Royal Palace', description: 'Purchased a luxury palace worth over ₹100 Crore.', emoji: '🏰', category: 'wealth' },
  IPOClub: { id: 'IPOClub', title: 'IPO Listing', description: 'Successfully listed your private company on the stock exchange (IPO).', emoji: '📈', category: 'wealth' },
  PassiveIncomeLord: { id: 'PassiveIncomeLord', title: 'Passive Rent Lord', description: 'Earned over ₹1 Crore per year purely in rent.', emoji: '🏦', category: 'wealth' },
  MarketWizard: { id: 'MarketWizard', title: 'Market Wizard', description: 'Invested over ₹50 Crore in stocks and mutual funds.', emoji: '📊', category: 'wealth' },

  // Fame
  LocalStar: { id: 'LocalStar', title: 'Local Hero', description: 'Achieved Local Celebrity status.', emoji: '📣', category: 'fame' },
  NationalIcon: { id: 'NationalIcon', title: 'National Icon', description: 'Achieved National Celebrity status.', emoji: '🌟', category: 'fame' },
  GlobalSuperstar: { id: 'GlobalSuperstar', title: 'Global Legend', description: 'Achieved Global Icon status.', emoji: '🌌', category: 'fame' },
  SocialMediaKing: { id: 'SocialMediaKing', title: 'Follower Monarch', description: 'Gained over 10 Million followers on a social platform.', emoji: '📱', category: 'fame' },
  ViralSensation: { id: 'ViralSensation', title: 'Viral Sensation', description: 'Had a video go viral with over 5 Million views in a day.', emoji: '⚡', category: 'fame' },

  // Family
  PerfectFamily: { id: 'PerfectFamily', title: 'Happy Family', description: 'Maintained 100% relationship status with spouse and all children.', emoji: '👨‍👩‍👧‍👦', category: 'family' },
  ArrangedSuccess: { id: 'ArrangedSuccess', title: 'Arranged Match', description: 'Got married through a parental arranged marriage proposal.', emoji: '🤝', category: 'family' },
  DynastyBuilder: { id: 'DynastyBuilder', title: 'Dynasty Builder', description: 'Continued playing for 3 consecutive generations (Legacy Mode).', emoji: '🌳', category: 'family' },
  LargeFamily: { id: 'LargeFamily', title: 'Hum Do Humare Chaar', description: 'Had 4 or more children in a single life.', emoji: '🍼', category: 'family' },

  // Misc / International
  CenturyLife: { id: 'CenturyLife', title: 'Century Life', description: 'Lived to be 100 years or older.', emoji: '💯', category: 'misc' },
  NriStatus: { id: 'NriStatus', title: 'NRI Status', description: 'Successfully migrated abroad and gained permanent residency/citizenship.', emoji: '🌎', category: 'misc' },
  GlobalCitizen: { id: 'GlobalCitizen', title: 'Global Citizen', description: 'Migrated and gained citizenship in USA, Canada, UK, or Germany.', emoji: '🛂', category: 'misc' },
  YogaGuru: { id: 'YogaGuru', title: 'Yoga Guru', description: 'Meditated and maintained 100% Health and Fitness for 5 years straight.', emoji: '🧘', category: 'misc' },
  LuckyWin: { id: 'LuckyWin', title: 'Jackpot Winner', description: 'Won the Indian Mega Lottery jackpot.', emoji: '🎰', category: 'misc' }
};
