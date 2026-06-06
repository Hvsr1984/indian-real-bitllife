export interface CareerLevel {
  title: string;
  salary: number; // yearly ₹
  reqExperience?: number; // years in previous role
  reqIntelligence?: number;
  reqFitness?: number;
  reqReputation?: number;
}

export interface CareerPath {
  name: string;
  category: 'Job' | 'Cricket' | 'Bollywood' | 'Politics' | 'Business';
  levels: CareerLevel[];
  description: string;
  entryRequirements: {
    education?: string[];
    examsPassed?: string[];
    intelligence?: number;
    fitness?: number;
    fame?: number;
    reputation?: number;
    money?: number; // entry costs
  };
}

export const CAREER_PATHS: Record<string, CareerPath> = {
  SoftwareEngineer: {
    name: 'Software Engineer',
    category: 'Job',
    description: 'Build apps and write code in IT parks. Classic Bangalore dream.',
    entryRequirements: {
      education: ['Engineering College', 'Foreign University'],
      intelligence: 60
    },
    levels: [
      { title: 'SDE Intern', salary: 360000 },
      { title: 'Junior SDE', salary: 720000, reqExperience: 1, reqIntelligence: 60 },
      { title: 'Senior SDE', salary: 1800000, reqExperience: 4, reqIntelligence: 70 },
      { title: 'Staff Engineer', salary: 3600000, reqExperience: 8, reqIntelligence: 80 },
      { title: 'Principal Architect / CTO', salary: 7500000, reqExperience: 12, reqIntelligence: 85 }
    ]
  },
  Doctor: {
    name: 'Doctor',
    category: 'Job',
    description: 'Save lives, work long hours, and open private clinics.',
    entryRequirements: {
      education: ['Medical College'],
      intelligence: 75
    },
    levels: [
      { title: 'Junior Resident', salary: 960000 },
      { title: 'Senior Resident', salary: 1500000, reqExperience: 3, reqIntelligence: 75 },
      { title: 'Specialist Consultant', salary: 3000000, reqExperience: 7, reqIntelligence: 80 },
      { title: 'Chief Medical Officer / HOD', salary: 6000000, reqExperience: 12, reqIntelligence: 85 }
    ]
  },
  IASOfficer: {
    name: 'IAS Officer',
    category: 'Job',
    description: 'Unmatched administrative power. Run districts, departments, and government ministries.',
    entryRequirements: {
      examsPassed: ['UPSC'],
      intelligence: 80
    },
    levels: [
      { title: 'Sub-Divisional Magistrate (SDM)', salary: 900000 },
      { title: 'District Magistrate (DM) / Collector', salary: 1500000, reqExperience: 5, reqIntelligence: 80 },
      { title: 'Joint Secretary / Commissioner', salary: 2400000, reqExperience: 12, reqIntelligence: 85 },
      { title: 'Chief Secretary', salary: 3600000, reqExperience: 20, reqIntelligence: 90 }
    ]
  },
  IPSOfficer: {
    name: 'IPS Officer',
    category: 'Job',
    description: 'Maintain law and order, wear the prestigious police khaki, and lead police forces.',
    entryRequirements: {
      examsPassed: ['UPSC'],
      intelligence: 70,
      fitness: 75
    },
    levels: [
      { title: 'Assistant Superintendent (ASP)', salary: 900000 },
      { title: 'Superintendent of Police (SP) / DCP', salary: 1500000, reqExperience: 5, reqIntelligence: 70 },
      { title: 'Deputy Inspector General (DIG)', salary: 2200000, reqExperience: 12, reqIntelligence: 75 },
      { title: 'Director General of Police (DGP)', salary: 3600000, reqExperience: 22, reqIntelligence: 80 }
    ]
  },
  ArmyOfficer: {
    name: 'Army Officer',
    category: 'Job',
    description: 'Serve the nation, live in cantonments, and lead battalions on the borders.',
    entryRequirements: {
      examsPassed: ['NDA'],
      fitness: 80
    },
    levels: [
      { title: 'Lieutenant', salary: 900000 },
      { title: 'Captain', salary: 1200000, reqExperience: 3, reqFitness: 80 },
      { title: 'Major', salary: 1800000, reqExperience: 8, reqFitness: 80 },
      { title: 'Colonel', salary: 3000000, reqExperience: 15, reqFitness: 75 },
      { title: 'Lieutenant General', salary: 4200000, reqExperience: 25, reqFitness: 70 }
    ]
  },
  Lawyer: {
    name: 'Lawyer',
    category: 'Job',
    description: 'Argue in courts, handle high-profile lawsuits, and aim for the Supreme Court bar.',
    entryRequirements: {
      education: ['Engineering College', 'Medical College', 'Foreign University', 'Government School', 'Private School'], // Any, but CAT/CLAT/CA is relevant
      intelligence: 65
    },
    levels: [
      { title: 'Junior Associate', salary: 480000 },
      { title: 'Senior Associate', salary: 1200000, reqExperience: 4, reqIntelligence: 65 },
      { title: 'Partner at Law Firm', salary: 3600000, reqExperience: 9, reqIntelligence: 75 },
      { title: 'Senior Advocate (Supreme Court)', salary: 9000000, reqExperience: 16, reqIntelligence: 85 }
    ]
  },
  YouTuber: {
    name: 'YouTuber',
    category: 'Job',
    description: 'Make reaction videos, vlogs, or tech tutorials. Monetize through ads and sponsorships.',
    entryRequirements: {
      fame: 10 // Need some starting fame or just start small
    },
    levels: [
      { title: 'Part-Time Creator', salary: 60000 },
      { title: 'Full-Time Creator', salary: 240000, reqExperience: 2, reqReputation: 50 },
      { title: 'Silver Play Button Creator', salary: 1200000, reqExperience: 4, reqReputation: 60 },
      { title: 'Gold Play Button Star', salary: 4800000, reqExperience: 7, reqReputation: 70 },
      { title: 'Diamond Button Celebrity', salary: 20000000, reqExperience: 12, reqReputation: 80 }
    ]
  },

  // SPECIAL CAREERS: Custom pathways managed in useGameStore
  Cricket: {
    name: 'Cricket',
    category: 'Cricket',
    description: 'The national religion. Train hard, play matches, hit centuries, and wear the Blue Jersey.',
    entryRequirements: {
      fitness: 60
    },
    levels: [
      { title: 'Gully Cricketer', salary: 0 },
      { title: 'School Team Player', salary: 12000 },
      { title: 'District Captain', salary: 120000 },
      { title: 'State Ranji Trophy Player', salary: 1500000 },
      { title: 'IPL Contract Player', salary: 12000000 },
      { title: 'Indian National Team Member', salary: 50000000 },
      { title: 'National Team Captain / Cricket Legend', salary: 150000000 }
    ]
  },
  Bollywood: {
    name: 'Bollywood Actor',
    category: 'Bollywood',
    description: 'Chasing fame, cameras, glitz, glamour, and the box office crown.',
    entryRequirements: {
      fame: 15
    },
    levels: [
      { title: 'Struggling Actor (Auditions)', salary: 30000 },
      { title: 'Side Role / TV Ads', salary: 180000 },
      { title: 'Daily Soap Actor', salary: 720000 },
      { title: 'Supporting Movie Actor', salary: 3500000 },
      { title: 'Lead Actor (A-List)', salary: 30000000 },
      { title: 'Bollywood Superstar', salary: 200000000 }
    ]
  },
  Politics: {
    name: 'Politician',
    category: 'Politics',
    description: 'From local student politics to public rallies, policy-making, and ruling the country.',
    entryRequirements: {
      reputation: 40,
      money: 100000 // Campaign setup
    },
    levels: [
      { title: 'Student Leader', salary: 24000 },
      { title: 'Local Councillor', salary: 360000 },
      { title: 'MLA (State Assembly)', salary: 1200000 },
      { title: 'MP (Lok Sabha)', salary: 3000000 },
      { title: 'Chief Minister', salary: 4800000 },
      { title: 'Prime Minister of India', salary: 6000000 }
    ]
  }
};
