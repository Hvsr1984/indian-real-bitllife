import { Player, ChoiceEvent } from '../types/game';

// We define structured events that the game loop can fetch based on player criteria.
// In TypeScript, some conditions need to check player state. We will provide a simple condition evaluator.

export const CHILDHOOD_EVENTS: ChoiceEvent[] = [
  {
    id: 'vaccination',
    title: 'Vaccination Time',
    description: 'Your mother is taking you to the local government clinic for a polio vaccination drop. The doctor is holding a syringe.',
    emoji: '💉',
    options: [
      {
        text: 'Bite the doctor\'s hand and scream',
        effects: { stats: { health: 5, happiness: -10, reputation: -5 }, logText: 'You bit the doctor during vaccination. Your mother was embarrassed.' }
      },
      {
        text: 'Take the polio drops quietly like a brave child',
        effects: { stats: { health: 15, happiness: 5, reputation: 10 }, logText: 'You took the vaccine bravely. The doctor gave you a sweet candy.' }
      },
      {
        text: 'Cry at the top of your lungs',
        effects: { stats: { health: 5, happiness: -5 }, logText: 'You cried loudly, but took the vaccine anyway.' }
      }
    ]
  },
  {
    id: 'sibling_toy',
    title: 'Sibling Rivalry',
    description: 'Your sibling took your favorite remote-control car and is refusing to give it back.',
    emoji: '🚗',
    options: [
      {
        text: 'Slap them and snatch the car',
        effects: { stats: { happiness: 10, reputation: -10 }, customTrigger: 'siblingDispute', logText: 'You slapped your sibling to get your toy back. Parents grounded you.' }
      },
      {
        text: 'Cry and complain to your Mother',
        effects: { stats: { happiness: -5, reputation: 5 }, logText: 'You complained to your mother. She reprimanded your sibling.' }
      },
      {
        text: 'Offer to share and play together',
        effects: { stats: { happiness: 15, intelligence: 5 }, logText: 'You suggested playing together. You both had fun.' }
      }
    ]
  },
  {
    id: 'school_cheat',
    title: 'Class Test Dilemma',
    description: 'You are writing a science test in school, and you don\'t know the answers. Your friend is open-cheating nearby.',
    emoji: '✏️',
    options: [
      {
        text: 'Copy their answers quietly',
        effects: { stats: { intelligence: 5, reputation: -15 }, customTrigger: 'cheatTest', logText: 'You cheated on the science test and got high marks, but the teacher suspected you.' }
      },
      {
        text: 'Write whatever you know honestly',
        effects: { stats: { intelligence: 10, reputation: 10, happiness: 5 }, logText: 'You wrote the test honestly and got average marks.' }
      },
      {
        text: 'Ask the teacher for help',
        effects: { stats: { intelligence: 8, reputation: 5 }, logText: 'The teacher explained the question, helping you score better.' }
      }
    ]
  }
];

export const SCHOOL_EVENTS: ChoiceEvent[] = [
  {
    id: 'stream_selection',
    title: 'Stream Selection (Class 11)',
    description: 'It is time to choose your subject stream for high school. Your parents want you to take Science, but you have options.',
    emoji: '🎓',
    options: [
      {
        text: 'Choose Science (PCM/PCB) - "The IIT/NEET Path"',
        effects: { stats: { intelligence: 10, happiness: -5 }, customTrigger: 'chooseScience', logText: 'You chose the Science stream. Your parents are proud, but the syllabus is heavy.' }
      },
      {
        text: 'Choose Commerce - "The CA/MBA/Finance Path"',
        effects: { stats: { intelligence: 5, happiness: 10 }, customTrigger: 'chooseCommerce', logText: 'You chose the Commerce stream, focusing on accountancy and business.' }
      },
      {
        text: 'Choose Humanities/Arts - "The UPSC/Literature Path"',
        effects: { stats: { intelligence: 5, happiness: 15 }, customTrigger: 'chooseArts', logText: 'You chose the Humanities stream to study history, literature, and social sciences.' }
      }
    ]
  },
  {
    id: 'school_crush',
    title: 'School Crush',
    description: 'You have developed a major crush on your classmate who sits in the front row. You want to ask them out.',
    emoji: '❤️',
    options: [
      {
        text: 'Write a romantic letter and pass it in class',
        effects: { stats: { happiness: 10, reputation: -10 }, customTrigger: 'proposeCrushLetter', logText: 'You passed a love note. The teacher caught it and read it out loud. Ultimate embarrassment!' }
      },
      {
        text: 'Talk to them after school and ask to study together',
        effects: { stats: { happiness: 15, intelligence: 2 }, customTrigger: 'proposeStudy', logText: 'You asked to study together. They smiled and agreed!' }
      },
      {
        text: 'Keep quiet and admire them from afar',
        effects: { stats: { happiness: -5 }, logText: 'You chose not to express your feelings and remained in the friend-zone.' }
      }
    ]
  }
];

export const COMPETITIVE_EXAM_EVENTS: Record<string, ChoiceEvent> = {
  JEE: {
    id: 'jee_exam_day',
    title: 'IIT JEE Mains & Advanced Day',
    description: 'Today is the big day. Years of Kota coaching and late-night studying lead to this. You are sitting at the exam center.',
    emoji: '📝',
    options: [
      {
        text: 'Focus fully and apply your preparation',
        effects: { customTrigger: 'solveJEENormal', logText: 'You sat the exam with focus. Results will be declared soon.' }
      },
      {
        text: 'Try to sneak a peek at the topper\'s screen',
        effects: { customTrigger: 'cheatJEE', logText: 'You tried to cheat in JEE. The invigilator is looking suspicious.' }
      },
      {
        text: 'Panic, feel dizzy, and blank out',
        effects: { stats: { health: -10, happiness: -15 }, customTrigger: 'failJEE', logText: 'You panicked during the JEE exam and couldn\'t answer properly.' }
      }
    ]
  },
  NEET: {
    id: 'neet_exam_day',
    title: 'NEET Medical Entrance Day',
    description: 'The national medical entrance exam is here. 200 questions determine your entry into government medical colleges.',
    emoji: '🩺',
    options: [
      {
        text: 'Rely on your hard work and knowledge',
        effects: { customTrigger: 'solveNEETNormal', logText: 'You attempted NEET questions calmly. Results will be declared soon.' }
      },
      {
        text: 'Pray to all the Gods and guess the MCQs',
        effects: { customTrigger: 'prayNEET', logText: 'You guessed most of the answers. Fingers crossed!' }
      }
    ]
  },
  UPSC: {
    id: 'upsc_exam_day',
    title: 'UPSC Civil Services Prelims',
    description: 'Three phases stand between you and the red beacon car. Today is the Prelims. History, polity, current affairs.',
    emoji: '🏛️',
    options: [
      {
        text: 'Attempt based on extensive revision',
        effects: { customTrigger: 'solveUPSCNormal', logText: 'You wrote the UPSC prelims calmly.' }
      },
      {
        text: 'Take high risks, marking all doubtful options',
        effects: { customTrigger: 'solveUPSCRisk', logText: 'You marked a high volume of doubtful questions.' }
      }
    ]
  }
};

export const ADULT_EVENTS: ChoiceEvent[] = [
  {
    id: 'arranged_marriage',
    title: 'Arranged Marriage Proposal',
    description: 'Your parents have brought a marriage proposal. The candidate is a well-settled Software Engineer/Doctor from a reputable family in Delhi.',
    emoji: '💑',
    options: [
      {
        text: 'Accept the proposal and marry them',
        effects: { stats: { happiness: 15, reputation: 20 }, customTrigger: 'acceptArranged', logText: 'You accepted the arranged marriage proposal. A grand Indian wedding took place!' }
      },
      {
        text: 'Refuse flatly - "I want to focus on my career"',
        effects: { stats: { happiness: 5, reputation: -10 }, logText: 'You refused the proposal. Your parents are disappointed and are lecturing you.' }
      },
      {
        text: 'Ask to date them first to check compatibility',
        effects: { stats: { intelligence: 10 }, customTrigger: 'dateArranged', logText: 'You requested dating before committing. Your parents reluctantly agreed.' }
      }
    ]
  },
  {
    id: 'friend_startup_pitch',
    title: 'Friend\'s Startup Pitch',
    description: 'Your college friend approaches you with a business idea: "An AI-powered tea-delivery chain (ChaiTech)". They want ₹5 Lakhs for 10% equity.',
    emoji: '☕',
    options: [
      {
        text: 'Invest ₹5 Lakhs from your savings',
        effects: { money: -500000, customTrigger: 'investChaiTech', logText: 'You invested ₹5,00,000 into ChaiTech. You now hold 10% equity.' }
      },
      {
        text: 'Politely decline and wish them luck',
        effects: { logText: 'You declined the ChaiTech pitch. You prefer safer options.' }
      },
      {
        text: 'Mock the idea - "Chai delivery is not technology!"',
        effects: { stats: { reputation: -5 }, logText: 'You laughed at the idea. Your friend got offended, damaging your relationship.' }
      }
    ]
  },
  {
    id: 'ipl_betting',
    title: 'IPL Betting temptation',
    description: 'The IPL finals (RCB vs MI) are tonight. A colleague is inviting you to place a bet of ₹1 Lakh on a betting app.',
    emoji: '🏏',
    options: [
      {
        text: 'Bet ₹1 Lakh on RCB',
        effects: { customTrigger: 'betRCB', logText: 'You bet ₹1,00,000 on RCB.' }
      },
      {
        text: 'Bet ₹1 Lakh on MI',
        effects: { customTrigger: 'betMI', logText: 'You bet ₹1,00,000 on MI.' }
      },
      {
        text: 'Stay away from gambling',
        effects: { stats: { reputation: 5, happiness: 5 }, logText: 'You decided to watch the game safely with snacks.' }
      }
    ]
  },
  {
    id: 'health_heart_attack',
    title: 'Chest Pain Alert',
    description: 'You are feeling a sharp pain in your chest and left arm after a long stressful work week.',
    emoji: '🩺',
    options: [
      {
        text: 'Ignore it and take a Pudin Hara/Antacid',
        effects: { stats: { health: -30, happiness: -10 }, customTrigger: 'ignoreChestPain', logText: 'You ignored the pain. It was a mild cardiac issue that severely weakened your heart.' }
      },
      {
        text: 'Rush immediately to the Emergency Room',
        effects: { money: -50000, stats: { health: 15, happiness: 10 }, logText: 'You went to the ER. Doctors treated a blocked artery, saving your life. The bill was ₹50,000.' }
      }
    ]
  }
];

export const SPECIAL_CAREER_EVENTS: Record<string, ChoiceEvent[]> = {
  Cricket: [
    {
      id: 'cricket_trial_dilemma',
      title: 'State Selections Trial',
      description: 'The Ranji Trophy state selector is watching your batting nets today. You feel nervous.',
      emoji: '🏏',
      options: [
        {
          text: 'Play aggressive shots to impress them',
          effects: { customTrigger: 'cricketTrialAggressive', logText: 'You went for big shots.' }
        },
        {
          text: 'Play defensively and focus on technique',
          effects: { customTrigger: 'cricketTrialDefensive', logText: 'You played defensively, showing solid defense.' }
        }
      ]
    }
  ],
  Bollywood: [
    {
      id: 'audition_bribe',
      title: 'The Audition Bribe',
      description: 'A casting director hints that you can get the lead role in a major rom-com movie if you pay an "audition fee" of ₹5 Lakhs.',
      emoji: '🎬',
      options: [
        {
          text: 'Pay the ₹5 Lakhs fee',
          effects: { money: -500000, customTrigger: 'payAuditionBribe', logText: 'You paid the director ₹5,00,000 secretly.' }
        },
        {
          text: 'Refuse and expose them on social media',
          effects: { customTrigger: 'exposeAuditionBribe', logText: 'You wrote a viral post exposing the director.' }
        },
        {
          text: 'Just leave the audition room',
          effects: { stats: { happiness: -5 }, logText: 'You walked away, saddened by the industry realities.' }
        }
      ]
    }
  ],
  Politics: [
    {
      id: 'political_scandal',
      title: 'Rival Allegations',
      description: 'An opposition leader accuses you of taking bribes during a local infrastructure project.',
      emoji: '🏛️',
      options: [
        {
          text: 'Launch a counter-defamation lawsuit',
          effects: { money: -1000000, stats: { reputation: 15 }, logText: 'You filed a ₹10 Lakh lawsuit. Public views you as strong and innocent.' }
        },
        {
          text: 'Release a detailed denial statement',
          effects: { stats: { reputation: 5, happiness: -5 }, logText: 'You denied the allegations, but doubts remain among some voters.' }
        },
        {
          text: 'Pay them off silently to drop the topic',
          effects: { money: -2500000, stats: { reputation: -5 }, logText: 'You paid ₹25 Lakhs. The allegations disappeared, but your funds decreased.' }
        }
      ]
    }
  ]
};

export const WORLD_NEWS_POOL = [
  { headline: 'AI Revolution Accelerates', effectText: 'IT salaries grow by 20%, but entry-level hiring criteria tighten.', type: 'AI_BOOM' },
  { headline: 'Global Economic Recession Hits', effectText: 'Job opportunities plummet, and stock markets drop 20%.', type: 'RECESSION' },
  { headline: 'Real Estate Boom in Tier-2 Cities', effectText: 'Properties appreciate by 25% this year.', type: 'RE_BOOM' },
  { headline: 'Stock Market Bull Run', effectText: 'Sensex reaches all-time high, stocks up 15%.', type: 'STOCK_BOOM' },
  { headline: 'Government Exam Reforms', effectText: 'UPSC and JEE selection limits tightened. Preparation requires more effort.', type: 'EXAM_REFORM' },
  { headline: 'Venture Capital Funding Wave', effectText: 'VC investments surge. Startups raise series rounds easily.', type: 'STARTUP_WAVE' },
  { headline: 'IPL Media Rights Auction Record', effectText: 'Cricket popularity surges. IPL cricketer salaries double.', type: 'CRICKET_BOOM' },
  { headline: 'Tax Reform Bill Passed', effectText: 'Standard tax rates across Indian cities increased by 5%.', type: 'TAX_SURGE' }
];

export const CULTURAL_FESTIVAL_EVENTS = [
  {
    name: 'Diwali',
    emoji: '🪔',
    description: 'The Festival of Lights! Your family is gathering for Lakshmi Puja and card games.',
    options: [
      {
        text: 'Buy luxury gifts and firecrackers for everyone',
        effects: { money: -50000, stats: { happiness: 25, reputation: 15 }, logText: 'You spent ₹50,000 on Diwali gifts. Everyone loved it!' }
      },
      {
        text: 'Play safe Diwali Teen Patti card game',
        effects: { customTrigger: 'diwaliCards', logText: 'You sat down for a friendly card game.' }
      },
      {
        text: 'Help parents decorate the house and light diyas',
        effects: { stats: { happiness: 15, relationshipsGainMult: 1.2 }, logText: 'You decorated the home with lights. Warm family moments!' }
      }
    ]
  },
  {
    name: 'Holi',
    emoji: '🎨',
    description: 'The Festival of Colors! The neighborhood is playing with water balloons and organic colors.',
    options: [
      {
        text: 'Play enthusiastically with everyone and drink Thandai',
        effects: { stats: { happiness: 20, fitness: 5 }, logText: 'You played Holi all day and drank sweet Thandai. Extremely fun!' }
      },
      {
        text: 'Throw water balloons at random strangers from the balcony',
        effects: { stats: { happiness: 10, reputation: -15 }, logText: 'You threw balloons at strangers. Some got angry and argued with your family.' }
      },
      {
        text: 'Stay clean indoors and eat Gujiyas',
        effects: { stats: { happiness: 10, health: -5 }, logText: 'You stayed indoors, munching on delicious homemade Gujiyas.' }
      }
    ]
  }
];
