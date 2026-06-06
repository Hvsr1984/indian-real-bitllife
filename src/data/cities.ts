export interface CityStats {
  name: string;
  country: string;
  description: string;
  costOfLiving: number; // multiplier e.g. 1.0 (Delhi), 1.3 (Mumbai), 3.5 (USA)
  techBoost: number; // 0 to 1.5
  bollywoodBoost: number;
  politicsBoost: number;
  realEstateBoost: number;
  upscBoost: number;
  startupBoost: number;
  cricketBoost: number;
  taxRate: number; // e.g. 0.15
  relocationFee: number; // ₹ to relocate there
  isInternational: boolean;
}

export const CITIES: Record<string, CityStats> = {
  // Indian Cities
  Jaipur: {
    name: 'Jaipur',
    country: 'India',
    description: 'The Pink City. Famous for culture, tourism, and booming local real estate.',
    costOfLiving: 0.8,
    techBoost: 0.8,
    bollywoodBoost: 0.7,
    politicsBoost: 0.9,
    realEstateBoost: 1.3, // 30% boost to property values appreciation
    upscBoost: 0.9,
    startupBoost: 0.8,
    cricketBoost: 1.0,
    taxRate: 0.10,
    relocationFee: 25000,
    isInternational: false
  },
  Delhi: {
    name: 'Delhi',
    country: 'India',
    description: 'The Capital City. The epicenter of politics, student unions, and UPSC coaching.',
    costOfLiving: 1.1,
    techBoost: 1.0,
    bollywoodBoost: 0.8,
    politicsBoost: 1.4, // 40% boost to political campaigns
    realEstateBoost: 1.1,
    upscBoost: 1.4, // 40% UPSC preparation effectiveness boost
    startupBoost: 1.1,
    cricketBoost: 1.1,
    taxRate: 0.15,
    relocationFee: 40000,
    isInternational: false
  },
  Mumbai: {
    name: 'Mumbai',
    country: 'India',
    description: 'City of Dreams. Hub of Bollywood, cricket culture, finance, and digital media.',
    costOfLiving: 1.4,
    techBoost: 0.9,
    bollywoodBoost: 1.5, // 50% Bollywood career trial and social media growth boost
    politicsBoost: 1.0,
    realEstateBoost: 1.2,
    upscBoost: 0.8,
    startupBoost: 1.2,
    cricketBoost: 1.3, // 30% cricket progression boost
    taxRate: 0.15,
    relocationFee: 50000,
    isInternational: false
  },
  Bangalore: {
    name: 'Bangalore',
    country: 'India',
    description: 'Silicon Valley of India. Technologists, venture capitalists, and startups thrive here.',
    costOfLiving: 1.2,
    techBoost: 1.5, // 50% tech career and promotion boost
    bollywoodBoost: 0.6,
    politicsBoost: 0.8,
    realEstateBoost: 1.1,
    upscBoost: 0.9,
    startupBoost: 1.5, // 50% tech startup valuation and funding boost
    cricketBoost: 1.1,
    taxRate: 0.15,
    relocationFee: 45000,
    isInternational: false
  },
  Chennai: {
    name: 'Chennai',
    country: 'India',
    description: 'Gateway to the South. Strong engineering core, chess, and traditional corporate culture.',
    costOfLiving: 0.9,
    techBoost: 1.1,
    bollywoodBoost: 0.8,
    politicsBoost: 1.1,
    realEstateBoost: 0.9,
    upscBoost: 1.1,
    startupBoost: 0.9,
    cricketBoost: 1.2,
    taxRate: 0.12,
    relocationFee: 35000,
    isInternational: false
  },
  Kolkata: {
    name: 'Kolkata',
    country: 'India',
    description: 'City of Joy. Historic hub for arts, literature, tea trading, and football/cricket passion.',
    costOfLiving: 0.85,
    techBoost: 0.8,
    bollywoodBoost: 0.9, // creative side
    politicsBoost: 1.2,
    realEstateBoost: 0.85,
    upscBoost: 1.0,
    startupBoost: 0.8,
    cricketBoost: 1.1,
    taxRate: 0.12,
    relocationFee: 35000,
    isInternational: false
  },
  Lucknow: {
    name: 'Lucknow',
    country: 'India',
    description: 'City of Nawabs. Cultural hub, growing infrastructure, and local administration core.',
    costOfLiving: 0.75,
    techBoost: 0.7,
    bollywoodBoost: 0.6,
    politicsBoost: 1.2,
    realEstateBoost: 1.0,
    upscBoost: 1.1,
    startupBoost: 0.8,
    cricketBoost: 0.9,
    taxRate: 0.10,
    relocationFee: 25000,
    isInternational: false
  },
  Hyderabad: {
    name: 'Hyderabad',
    country: 'India',
    description: 'City of Pearls. Dynamic tech center, famous biryani, and thriving Telugu cinema (Tollywood).',
    costOfLiving: 1.0,
    techBoost: 1.3,
    bollywoodBoost: 1.0, // acting boost
    politicsBoost: 1.0,
    realEstateBoost: 1.0,
    upscBoost: 1.0,
    startupBoost: 1.2,
    cricketBoost: 1.1,
    taxRate: 0.14,
    relocationFee: 38000,
    isInternational: false
  },
  Pune: {
    name: 'Pune',
    country: 'India',
    description: 'Oxford of the East. Strong student culture, IT parks, and automobile manufacturing.',
    costOfLiving: 1.0,
    techBoost: 1.2,
    bollywoodBoost: 0.7,
    politicsBoost: 0.9,
    realEstateBoost: 1.0,
    upscBoost: 1.1,
    startupBoost: 1.1,
    cricketBoost: 1.0,
    taxRate: 0.13,
    relocationFee: 30000,
    isInternational: false
  },
  Ahmedabad: {
    name: 'Ahmedabad',
    country: 'India',
    description: 'Business and trading heart of Gujarat. Focus on commerce, textiles, and stock trading.',
    costOfLiving: 0.9,
    techBoost: 0.8,
    bollywoodBoost: 0.6,
    politicsBoost: 1.1,
    realEstateBoost: 1.25,
    upscBoost: 0.8,
    startupBoost: 1.2, // business startup boost
    cricketBoost: 1.0,
    taxRate: 0.11,
    relocationFee: 32000,
    isInternational: false
  },

  // International Cities
  'New York': {
    name: 'New York',
    country: 'USA',
    description: 'Global financial hub. Extreme costs but massive corporate, technology, and fame boosts.',
    costOfLiving: 4.2,
    techBoost: 1.3,
    bollywoodBoost: 1.2,
    politicsBoost: 0.5,
    realEstateBoost: 1.4,
    upscBoost: 0.1,
    startupBoost: 1.6,
    cricketBoost: 0.4,
    taxRate: 0.35,
    relocationFee: 600000, // ₹6,00,000 relocation fee
    isInternational: true
  },
  Toronto: {
    name: 'Toronto',
    country: 'Canada',
    description: 'Diverse financial center. Highly welcoming to skilled migration and tech workers.',
    costOfLiving: 3.2,
    techBoost: 1.2,
    bollywoodBoost: 1.0,
    politicsBoost: 0.4,
    realEstateBoost: 1.3,
    upscBoost: 0.1,
    startupBoost: 1.3,
    cricketBoost: 0.6,
    taxRate: 0.30,
    relocationFee: 500000,
    isInternational: true
  },
  London: {
    name: 'London',
    country: 'UK',
    description: 'Historic city. Major finance and cultural capital. Thriving cricket (Lord\'s) and tech hub.',
    costOfLiving: 3.8,
    techBoost: 1.2,
    bollywoodBoost: 1.2,
    politicsBoost: 0.4,
    realEstateBoost: 1.3,
    upscBoost: 0.1,
    startupBoost: 1.4,
    cricketBoost: 1.3, // Lord's!
    taxRate: 0.32,
    relocationFee: 550000,
    isInternational: true
  },
  Sydney: {
    name: 'Sydney',
    country: 'Australia',
    description: 'Sunny coastal metropolis. High quality of life, strong salaries, and heavy cricket focus.',
    costOfLiving: 3.4,
    techBoost: 1.1,
    bollywoodBoost: 0.9,
    politicsBoost: 0.3,
    realEstateBoost: 1.2,
    upscBoost: 0.1,
    startupBoost: 1.2,
    cricketBoost: 1.5, // SCG, massive cricket boost!
    taxRate: 0.30,
    relocationFee: 520000,
    isInternational: true
  },
  Munich: {
    name: 'Munich',
    country: 'Germany',
    description: 'European engineering stronghold. Highly disciplined, high taxes, but exceptional public services.',
    costOfLiving: 3.0,
    techBoost: 1.3,
    bollywoodBoost: 0.8,
    politicsBoost: 0.3,
    realEstateBoost: 1.1,
    upscBoost: 0.1,
    startupBoost: 1.1,
    cricketBoost: 0.3,
    taxRate: 0.40,
    relocationFee: 480000,
    isInternational: true
  },
  Dubai: {
    name: 'Dubai',
    country: 'UAE',
    description: 'Tax-free desert oasis. Massive real estate boom, luxury, shopping, and fast corporate careers.',
    costOfLiving: 3.6,
    techBoost: 1.1,
    bollywoodBoost: 1.3,
    politicsBoost: 0.2,
    realEstateBoost: 1.5, // Dubai luxury properties!
    upscBoost: 0.1,
    startupBoost: 1.3,
    cricketBoost: 1.0,
    taxRate: 0.00, // Tax-free!
    relocationFee: 400000,
    isInternational: true
  },
  Singapore: {
    name: 'Singapore',
    country: 'Singapore',
    description: 'Ultra-safe financial city-state. Extremely dense, tech/business-focused, minimal tax.',
    costOfLiving: 4.5,
    techBoost: 1.4,
    bollywoodBoost: 0.9,
    politicsBoost: 0.2,
    realEstateBoost: 1.6,
    upscBoost: 0.1,
    startupBoost: 1.5,
    cricketBoost: 0.5,
    taxRate: 0.12,
    relocationFee: 500000,
    isInternational: true
  },
  Tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    description: 'Cleanest mega-city. Polite culture, cutting-edge technology, and high cost of living.',
    costOfLiving: 3.5,
    techBoost: 1.3,
    bollywoodBoost: 0.9,
    politicsBoost: 0.2,
    realEstateBoost: 1.1,
    upscBoost: 0.1,
    startupBoost: 1.2,
    cricketBoost: 0.3,
    taxRate: 0.35,
    relocationFee: 550000,
    isInternational: true
  }
};
