export interface TraitModifier {
  name: string;
  emoji: string;
  description: string;
  modifiers: {
    examBoost?: number; // e.g. +10% on Board Exams
    studyEfficiency?: number; // multiplier e.g. 1.2
    startupSuccessMult?: number; // multiplier e.g. 1.3
    fitnessGainMult?: number;
    moneyGainMult?: number;
    fameGainMult?: number;
    relationshipsGainMult?: number;
    depressionResistance?: number;
    luckFactor?: number; // 0 to 1
  };
}

export const PERSONALITY_TRAITS: Record<string, TraitModifier> = {
  Genius: {
    name: 'Genius',
    emoji: '🧠',
    description: 'Extremely high cognitive ability. Exams are easy, and learning comes naturally.',
    modifiers: {
      examBoost: 15,
      studyEfficiency: 1.5,
      startupSuccessMult: 1.1,
      depressionResistance: 1.0
    }
  },
  Ambitious: {
    name: 'Ambitious',
    emoji: '🚀',
    description: 'Highly career-oriented. Faster corporate climbs and startup growth.',
    modifiers: {
      studyEfficiency: 1.2,
      startupSuccessMult: 1.3,
      fameGainMult: 1.2
    }
  },
  Disciplined: {
    name: 'Disciplined',
    emoji: '⏱️',
    description: 'Never skips gym or study. Higher exam performance and fitness gains.',
    modifiers: {
      examBoost: 10,
      studyEfficiency: 1.3,
      fitnessGainMult: 1.4
    }
  },
  Lucky: {
    name: 'Lucky',
    emoji: '🍀',
    description: 'Good things happen to you. Better luck in lotteries, exams, and operations.',
    modifiers: {
      examBoost: 5,
      startupSuccessMult: 1.2,
      luckFactor: 0.8
    }
  },
  Attractive: {
    name: 'Attractive',
    emoji: '✨',
    description: 'Blessed with good looks. Boosts Bollywood, social media, and dating.',
    modifiers: {
      fameGainMult: 1.3,
      relationshipsGainMult: 1.3
    }
  },
  Charismatic: {
    name: 'Charismatic',
    emoji: '🗣️',
    description: 'Natural charmer. Excellent for politics, negotiations, and relationships.',
    modifiers: {
      relationshipsGainMult: 1.4,
      fameGainMult: 1.2,
      startupSuccessMult: 1.1
    }
  },
  Introvert: {
    name: 'Introvert',
    emoji: '🧘',
    description: 'Prefers reading and coding. Higher intelligence gains, but slower networking.',
    modifiers: {
      studyEfficiency: 1.2,
      relationshipsGainMult: 0.8,
      depressionResistance: 0.9
    }
  },
  Extrovert: {
    name: 'Extrovert',
    emoji: '🎉',
    description: 'Life of the party. Easy to build friendships, date, and gain followers.',
    modifiers: {
      relationshipsGainMult: 1.3,
      fameGainMult: 1.2
    }
  },
  'Risk Taker': {
    name: 'Risk Taker',
    emoji: '🎲',
    description: 'Loves high stakes. Boosts stock trading luck and startup valuations but higher crash risk.',
    modifiers: {
      startupSuccessMult: 1.4,
      luckFactor: 0.6 // high variance
    }
  },
  Lazy: {
    name: 'Lazy',
    emoji: '🛋️',
    description: 'Prefers resting. Harder to study, slower promotions, and faster fitness decay.',
    modifiers: {
      examBoost: -15,
      studyEfficiency: 0.6,
      fitnessGainMult: 0.7
    }
  },
  Creative: {
    name: 'Creative',
    emoji: '🎨',
    description: 'Born artist. Exceptional performance in Bollywood and social media creation.',
    modifiers: {
      fameGainMult: 1.4,
      studyEfficiency: 1.1
    }
  },
  Athletic: {
    name: 'Athletic',
    emoji: '🏃',
    description: 'Natural athlete. Massive boosts to fitness, cricket careers, and energy levels.',
    modifiers: {
      fitnessGainMult: 1.6,
      examBoost: -3 // distraction!
    }
  },
  'Business Minded': {
    name: 'Business Minded',
    emoji: '💼',
    description: 'Sees arbitrage everywhere. Boosts startup scaling, real estate returns, and business valuation.',
    modifiers: {
      startupSuccessMult: 1.5,
      moneyGainMult: 1.3
    }
  },
  Leader: {
    name: 'Leader',
    emoji: '👑',
    description: 'Commands respect. Massive boost to political approval and company hierarchy climbs.',
    modifiers: {
      relationshipsGainMult: 1.2,
      fameGainMult: 1.3
    }
  },
  Emotional: {
    name: 'Emotional',
    emoji: '❤️',
    description: 'Feels deeply. Slower recovery from tragedy but quick to form best friends and love bonds.',
    modifiers: {
      relationshipsGainMult: 1.4,
      depressionResistance: 0.6
    }
  }
};
