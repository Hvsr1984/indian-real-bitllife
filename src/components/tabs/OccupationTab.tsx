import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CAREER_PATHS } from '../../data/careers';
import { GraduationCap, Briefcase, Trophy, Film, Building, Play, Sparkles, Send } from 'lucide-react';

export const OccupationTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const studyHard = useGameStore((state) => state.studyHard);
  const enrollCoaching = useGameStore((state) => state.enrollCoaching);
  const applyJob = useGameStore((state) => state.applyJob);
  const workHard = useGameStore((state) => state.workHard);
  const resignJob = useGameStore((state) => state.resignJob);
  const trainCricket = useGameStore((state) => state.trainCricket);
  const cricketMatch = useGameStore((state) => state.cricketMatch);
  const bollywoodAudition = useGameStore((state) => state.bollywoodAudition);
  const releaseBollywoodMovie = useGameStore((state) => state.releaseBollywoodMovie);
  const politicalCampaign = useGameStore((state) => state.politicalCampaign);
  const takeCompetitiveExam = useGameStore((state) => state.takeCompetitiveExam);

  const [campaignAmount, setCampaignAmount] = useState<number>(500000);

  if (!player) return null;

  const { age, education, career } = player;

  // Format currency
  const formatMoney = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Competitive exams checker and renderer
  const eligibleExams = (() => {
    const exams = [];
    const examsPassed = education.examsPassed || [];
    
    // JEE & NEET: Science stream, age 17-21, has not passed JEE/NEET yet
    const hasPassedJEE = examsPassed.includes('JEE');
    const hasPassedNEET = examsPassed.includes('NEET');
    if (education.stream === 'Science' && age >= 17 && age <= 21) {
      if (!hasPassedJEE) {
        exams.push({ type: 'JEE', name: 'IIT JEE (Engineering)', fee: 2000, desc: 'Entrance for premium engineering institutes (IITs).' });
      }
      if (!hasPassedNEET) {
        exams.push({ type: 'NEET', name: 'NEET (Medical)', fee: 2000, desc: 'Entrance for premier medical colleges (AIIMS).' });
      }
    }
    
    // NDA: Age 17-21, has not passed NDA yet
    const hasPassedNDA = examsPassed.includes('NDA');
    if (age >= 17 && age <= 21 && !hasPassedNDA) {
      exams.push({ type: 'NDA', name: 'NDA (Defence Services)', fee: 1000, desc: 'Entrance for National Defence Academy officers.' });
    }
    
    // UPSC: Age >= 21, has completed or is in college, has not passed UPSC yet
    const hasPassedUPSC = examsPassed.includes('UPSC');
    const hasCollegeDegree = education.stage === 'College' || education.stage === 'Finished';
    if (age >= 21 && hasCollegeDegree && !hasPassedUPSC) {
      exams.push({ type: 'UPSC', name: 'UPSC Civil Services', fee: 5000, desc: 'Entrance for administrative civil services (IAS/IPS).' });
    }
    
    return exams;
  })();

  const renderCompetitiveExams = () => {
    if (eligibleExams.length === 0) return null;
    return (
      <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
        <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          📝 Competitive Entrance Exams
        </h4>
        <p className="text-xs text-gray-400">
          Register and write competitive national exams to qualify for prestigious university degrees or elite public service roles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {eligibleExams.map((exam) => (
            <div key={exam.type} className="bg-luxury-panel border border-luxury-border p-4 rounded-xl flex flex-col justify-between gap-3 hover:border-luxury-goldBorder transition">
              <div>
                <h5 className="text-xs font-bold text-gray-200">{exam.name}</h5>
                <p className="text-[10px] text-gray-400 mt-1">{exam.desc}</p>
                <p className="text-[10px] text-yellow-500 font-semibold mt-1">Fee: {formatMoney(exam.fee)}</p>
              </div>
              <button
                onClick={() => takeCompetitiveExam(exam.type as any)}
                className="btn-gold py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-full"
              >
                Register & Write Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // If toddler
  if (age < 5) {
    return (
      <div className="p-8 text-center text-gray-500 italic select-none">
        👶 You are a toddler (Age {age}). You are too young to go to school or work. Enjoy your nap time!
      </div>
    );
  }

  // 1. EDUCATION MODE
  if (education.stage !== 'Finished') {
    return (
      <div className="flex flex-col gap-5">
        {/* Education Status Card */}
        <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl p-3 bg-purple-950 bg-opacity-25 rounded-2xl border border-purple-900 border-opacity-50 text-purple-400 select-none">
              🎓
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-100 uppercase tracking-wide">
                Current Schooling: {education.stage === 'College' ? 'University / College' : `${education.stage} School`}
              </h4>
              {education.stage === 'College' && (
                <p className="text-xs text-purple-400 font-semibold mt-0.5">Degree: {education.currentDegree}</p>
              )}
              {education.stream && (
                <p className="text-xs text-purple-400 font-semibold mt-0.5">Stream: {education.stream}</p>
              )}
              {education.prepCoaching && education.prepCoaching !== 'None' && (
                <p className="text-xs text-yellow-400 font-semibold mt-0.5">Coaching Active: {education.prepCoaching}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-48 text-xs select-none">
            <span className="text-gray-400">Study Effort: {education.studyEffort}%</span>
            <div className="w-full bg-black bg-opacity-40 h-2.5 rounded-full border border-luxury-border p-0.5">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${education.studyEffort}%` }} />
            </div>
          </div>
        </div>

        {/* Education Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Academic Activities</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Study hard to raise your intelligence and secure top marks in boards and entrance exams.
            </p>
            <button onClick={studyHard} className="btn-gold px-4 py-2.5 rounded-xl text-xs w-full">
              📚 Study Harder
            </button>
          </div>

          {/* Entrance coaching option (available for science/arts high school or college students) */}
          {education.stage === 'High School' && (
            <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
              <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Competitive Coaching Centers</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enroll in Kota or Delhi-based coaching programs to crack competitive exams like JEE, NEET, or UPSC. Fee: ₹1.2L - ₹1.5L.
              </p>
              <div className="flex flex-col gap-2 w-full">
                {education.stream === 'Science' && (
                  <>
                    <button
                      onClick={() => enrollCoaching('JEE Prep')}
                      disabled={education.prepCoaching === 'JEE Prep'}
                      className="w-full bg-luxury-panel hover:bg-zinc-800 border border-luxury-border hover:border-yellow-600 px-4 py-2.5 rounded-xl text-xs text-gray-300 font-semibold transition"
                    >
                      ✏️ Enroll in Kota JEE Coaching
                    </button>
                    <button
                      onClick={() => enrollCoaching('NEET Prep')}
                      disabled={education.prepCoaching === 'NEET Prep'}
                      className="w-full bg-luxury-panel hover:bg-zinc-800 border border-luxury-border hover:border-yellow-600 px-4 py-2.5 rounded-xl text-xs text-gray-300 font-semibold transition"
                    >
                      🩺 Enroll in Kota NEET Medical Coaching
                    </button>
                  </>
                )}
                {education.stream === 'Arts' && (
                  <button
                    onClick={() => enrollCoaching('UPSC Prep')}
                    disabled={education.prepCoaching === 'UPSC Prep'}
                    className="w-full bg-luxury-panel hover:bg-zinc-800 border border-luxury-border hover:border-yellow-600 px-4 py-2.5 rounded-xl text-xs text-gray-300 font-semibold transition"
                  >
                    🏛️ Enroll in UPSC IAS/IPS Coaching
                  </button>
                )}
                {!education.stream && (
                  <p className="text-xs text-gray-500 italic">Select subject stream in Class 11 first.</p>
                )}
              </div>
            </div>
          )}
        </div>
        {renderCompetitiveExams()}
      </div>
    );
  }

  // 2. CORPORATE CAREER MODE
  if (career.type === 'Job' && career.job) {
    return (
      <div className="flex flex-col gap-5">
        <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl p-3 bg-blue-950 bg-opacity-25 rounded-2xl border border-blue-900 border-opacity-50 text-blue-400 select-none">
              💼
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-100 uppercase tracking-wide">
                Role: {career.job.name} ({career.name})
              </h4>
              <p className="text-xs text-blue-400 font-bold mt-0.5">
                Salary: {formatMoney(career.salary)} / year
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Years in Company: {career.job.yearsInRole} years
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-48 text-xs select-none">
            <span className="text-gray-400">Job Performance: {career.job.performance}%</span>
            <div className="w-full bg-black bg-opacity-40 h-2.5 rounded-full border border-luxury-border p-0.5">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${career.job.performance}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={workHard} className="btn-gold px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
            💻 Work Harder (Slog)
          </button>
          <button
            onClick={resignJob}
            className="w-full bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 px-4 py-3 rounded-xl text-xs text-red-400 font-semibold transition"
          >
            ❌ Resign from Job
          </button>
        </div>
        {renderCompetitiveExams()}
      </div>
    );
  }

  // 3. SPECIAL CAREERS: CRICKET TRACK
  if (career.type === 'Cricket' && career.cricket) {
    const c = career.cricket;
    return (
      <div className="flex flex-col gap-5">
        <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl p-3 bg-blue-950 bg-opacity-25 rounded-2xl border border-blue-900 border-opacity-50 text-blue-400 select-none">
              🏏
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-100 uppercase tracking-wide">
                Cricket: {c.stage}
              </h4>
              <p className="text-xs text-blue-400 font-bold mt-0.5">
                Salary Contract: {formatMoney(career.salary)} / year
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Match Stats: {c.runs} runs • {c.wickets} wickets
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs select-none">
            <div className="flex flex-col gap-1 w-28">
              <span className="text-gray-400">Batting Rating: {c.batting}%</span>
              <div className="w-full bg-black bg-opacity-40 h-2 rounded-full border border-luxury-border">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${c.batting}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-28">
              <span className="text-gray-400">Bowling Rating: {c.bowling}%</span>
              <div className="w-full bg-black bg-opacity-40 h-2 rounded-full border border-luxury-border">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.bowling}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
          <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Practice & Tournament Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button onClick={() => trainCricket('batting')} className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition">
              🏏 Net Session (Batting)
            </button>
            <button onClick={() => trainCricket('bowling')} className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition">
              ⚾ Academy Net (Bowling)
            </button>
            <button onClick={() => trainCricket('fitness')} className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3 rounded-xl text-xs text-gray-300 font-semibold transition">
              🏃 Agility Fielding drills
            </button>
            <button onClick={cricketMatch} className="btn-gold p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <Trophy size={14} /> Play Championship Match
            </button>
          </div>
          <button
            onClick={resignJob}
            className="w-full bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 py-2.5 rounded-xl text-xs text-red-400 font-semibold transition"
          >
            🚪 Retire from Cricket
          </button>
        </div>
      </div>
    );
  }

  // 4. SPECIAL CAREERS: BOLLYWOOD TRACK
  if (career.type === 'Bollywood' && career.bollywood) {
    const b = career.bollywood;
    return (
      <div className="flex flex-col gap-5">
        <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl p-3 bg-purple-950 bg-opacity-25 rounded-2xl border border-purple-900 border-opacity-50 text-purple-400 select-none">
              🎬
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-100 uppercase tracking-wide">
                Acting Stage: {b.stage}
              </h4>
              <p className="text-xs text-purple-400 font-bold mt-0.5">
                Passive Salary: {formatMoney(career.salary)} / year
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Film Portfolio: {b.boxOfficeHits} Hits • {b.awardsCount} Awards
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-48 text-xs select-none">
            <span className="text-gray-400">Acting Skill: {b.actingSkill}%</span>
            <div className="w-full bg-black bg-opacity-40 h-2.5 rounded-full border border-luxury-border p-0.5">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${b.actingSkill}%` }} />
            </div>
          </div>
        </div>

        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
          <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Cinematic Engagements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={releaseBollywoodMovie} className="btn-gold py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <Film size={14} /> Release Movie
            </button>
            <button onClick={bollywoodAudition} className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border py-3 rounded-xl text-xs text-gray-300 font-semibold transition">
              🎙️ Go to Audition trials
            </button>
          </div>
          <button
            onClick={resignJob}
            className="w-full bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 py-2.5 rounded-xl text-xs text-red-400 font-semibold transition"
          >
            ❌ Retire from Cinema
          </button>
        </div>
      </div>
    );
  }

  // 5. SPECIAL CAREERS: POLITICS TRACK
  if (career.type === 'Politics' && career.politics) {
    const p = career.politics;
    return (
      <div className="flex flex-col gap-5">
        <div className="glass-card p-5 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl p-3 bg-red-950 bg-opacity-25 rounded-2xl border border-red-900 border-opacity-50 text-red-400 select-none">
              🏛️
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-100 uppercase tracking-wide">
                Political Rank: {p.stage}
              </h4>
              <p className="text-xs text-red-400 font-bold mt-0.5">
                Salary: {formatMoney(career.salary)} / year
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Debates Won: {p.debatesWon} • Total Campaigns: {formatMoney(p.campaignFunds)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-48 text-xs select-none">
            <span className="text-gray-400">Public Approval: {p.publicApproval}%</span>
            <div className="w-full bg-black bg-opacity-40 h-2.5 rounded-full border border-luxury-border p-0.5">
              <div className="bg-red-500 h-full rounded-full" style={{ width: `${p.publicApproval}%` }} />
            </div>
          </div>
        </div>

        <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
          <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Electoral Campaigns</h4>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow w-full">
              <label className="text-xs text-gray-400 block mb-1">Set Campaign Budget: {formatMoney(campaignAmount)}</label>
              <input
                type="range"
                min={100000}
                max={50000000} // Up to 5 Crore
                step={100000}
                value={campaignAmount}
                onChange={(e) => setCampaignAmount(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
            </div>
            <button
              onClick={() => politicalCampaign(campaignAmount)}
              className="btn-gold px-6 py-3 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 w-full md:w-auto justify-center"
            >
              <Send size={14} /> Launch Campaign Rally
            </button>
          </div>
          <p className="text-[10px] text-gray-500 italic">
            *CM or PM elections occur automatically every 5 years (at ages 35, 40, 45, etc.). Boost approval above 60% to win.
          </p>
          <button
            onClick={resignJob}
            className="w-full bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 py-2.5 rounded-xl text-xs text-red-400 font-semibold transition"
          >
            ❌ Retire from Politics
          </button>
        </div>
      </div>
    );
  }

  // 6. UNEMPLOYED STATUS - JOB SEEKING LIST
  const availableCareers = Object.keys(CAREER_PATHS).filter(
    (k) => CAREER_PATHS[k].category === 'Job'
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Informative banner */}
      <div className="glass-card p-6 border border-luxury-border text-center flex flex-col items-center gap-3">
        <span className="text-4xl select-none">🤷</span>
        <h3 className="text-base font-bold text-gray-200 uppercase tracking-wide">You are Currently Unemployed</h3>
        <p className="text-xs text-gray-400 max-w-md">
          Browse the listings below to seek corporate roles. Ensure you meet the intelligence, education degree, or competitive exam benchmarks.
        </p>
      </div>

      {/* Special Career trials */}
      <div className="glass-card p-5 border border-luxury-border flex flex-col gap-3">
        <h4 className="text-sm font-bold text-gold-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} /> Special Career Trials
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => trainCricket('fitness')}
            className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-4 rounded-xl text-left hover:border-yellow-600 transition flex flex-col gap-1"
          >
            <span className="text-sm font-bold text-gray-200">🏏 Professional Cricket</span>
            <span className="text-[10px] text-gray-500">Train in academy nets and play trials.</span>
          </button>

          <button
            onClick={bollywoodAudition}
            className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-4 rounded-xl text-left hover:border-yellow-600 transition flex flex-col gap-1"
          >
            <span className="text-sm font-bold text-gray-200">🎬 Bollywood Audition</span>
            <span className="text-[10px] text-gray-500">Go to script reading calls to land acting roles.</span>
          </button>

          <button
            onClick={() => politicalCampaign(500000)}
            className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-4 rounded-xl text-left hover:border-yellow-600 transition flex flex-col gap-1"
          >
            <span className="text-sm font-bold text-gray-200">🏛️ Politics Student Union</span>
            <span className="text-[10px] text-gray-500">Start local student union rally. Fee: ₹5 Lakhs.</span>
          </button>
        </div>
      </div>

      {renderCompetitiveExams()}

      {/* Corporate Listings */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <Building size={14} /> Corporate Careers Marketplace
        </h4>
        
        {player.age < 18 ? (
          <div className="glass-card p-6 border border-luxury-border text-center flex flex-col items-center justify-center gap-3 py-10">
            <span className="text-3xl select-none animate-pulse-slow">⚠️</span>
            <h5 className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Minor Labor Restrictions</h5>
            <p className="text-[11px] text-gray-400 max-w-sm">
              Under age 18, you are not legally permitted to apply for formal corporate careers. Consider studying harder or training in specialized pathways like Cricket.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {availableCareers.map((key) => {
              const path = CAREER_PATHS[key];
              const startSal = path.levels[0].salary;
              const hasDegreeReq = path.entryRequirements.education;
              const hasExamReq = path.entryRequirements.examsPassed;

              return (
                <div
                  key={key}
                  className="glass-card p-4 border border-luxury-border hover:border-luxury-goldBorder transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <h5 className="text-sm font-bold text-gray-200">{path.name}</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">{path.description}</p>
                    
                    {/* Qualifications requirement info */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hasDegreeReq && (
                        <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-purple-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          Degree: {hasDegreeReq.join('/')}
                        </span>
                      )}
                      {hasExamReq && (
                        <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-red-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          Exam: Clear {hasExamReq.join('/')}
                        </span>
                      )}
                      {path.entryRequirements.intelligence && (
                        <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          Intel: {path.entryRequirements.intelligence}%+
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-luxury-border">
                    <div className="text-right md:text-right">
                      <p className="text-[10px] text-gray-500 uppercase">Starting Salary</p>
                      <p className="text-xs font-bold text-green-400">{formatMoney(startSal)}/yr</p>
                    </div>
                    <button
                      onClick={() => applyJob(key)}
                      className="btn-gold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <Play size={10} /> Apply Role
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
