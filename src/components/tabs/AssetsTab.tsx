import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { RealEstateAsset, BusinessAsset } from '../../types/game';
import { Landmark, TrendingUp, Home, Briefcase, Plus, Minus, UserPlus, ShieldAlert, Award } from 'lucide-react';

export const AssetsTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  
  // Real Estate actions
  const buyRealEstate = useGameStore((state) => state.buyRealEstate);
  const sellRealEstate = useGameStore((state) => state.sellRealEstate);

  // Investment actions
  const investMutualFunds = useGameStore((state) => state.investMutualFunds);
  const withdrawMutualFunds = useGameStore((state) => state.withdrawMutualFunds);
  const buyStocks = useGameStore((state) => state.buyStocks);
  const sellStocks = useGameStore((state) => state.sellStocks);
  
  // Debt Actions
  const takeBankLoan = useGameStore((state) => state.takeBankLoan);
  const repayBankLoan = useGameStore((state) => state.repayBankLoan);

  // Business actions
  const startBusiness = useGameStore((state) => state.startBusiness);
  const hireEmployees = useGameStore((state) => state.hireEmployees);
  const fireEmployees = useGameStore((state) => state.fireEmployees);
  const expandBusinessOps = useGameStore((state) => state.expandBusinessOps);
  const raiseFunding = useGameStore((state) => state.raiseFunding);
  const ipoBusiness = useGameStore((state) => state.ipoBusiness);
  const sellBusiness = useGameStore((state) => state.sellBusiness);

  // UI States
  const [subSection, setSubSection] = useState<'finance' | 'real_estate' | 'business'>('finance');
  
  // Inputs state
  const [mfAmount, setMfAmount] = useState<number>(100000);
  const [stockAmount, setStockAmount] = useState<number>(100000);
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [bizName, setBizName] = useState<string>('My Startup');
  const [bizCat, setBizCat] = useState<BusinessAsset['category']>('Technology');

  if (!player) return null;

  if (player.age < 18) {
    return (
      <div className="glass-card p-8 border border-yellow-800 border-opacity-35 bg-yellow-950 bg-opacity-5 flex flex-col items-center justify-center text-center gap-4 py-16">
        <span className="text-5xl select-none animate-pulse-slow">🔒</span>
        <h3 className="text-lg font-extrabold text-yellow-400 uppercase tracking-wide">Minor Financial Restriction</h3>
        <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
          National banking and labor laws prohibit individuals under the age of 18 from trading stocks, investing in mutual funds, securing bank loans, or registering commercial businesses.
        </p>
        <div className="text-[10px] text-yellow-500 font-semibold px-4 py-2 bg-yellow-950 bg-opacity-40 border border-yellow-800 border-opacity-35 rounded-xl mt-2 select-none">
          ⏳ Matures in {18 - player.age} years (at Age 18)
        </div>
      </div>
    );
  }

  const { realEstate, businesses, investments } = player;

  // Format money helper
  const formatMoney = (val: number): string => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    if (absVal >= 10000000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Cr`;
    } else if (absVal >= 100000) {
      return `${isNeg ? '-' : ''}₹${(absVal / 100000).toFixed(2)} L`;
    }
    return `${isNeg ? '-' : ''}₹${absVal.toLocaleString('en-IN')}`;
  };

  const menuItems = [
    { id: 'finance', label: 'Finance & Stocks', icon: <Landmark size={14} /> },
    { id: 'real_estate', label: 'Real Estate', icon: <Home size={14} /> },
    { id: 'business', label: 'Business Empire', icon: <Briefcase size={14} /> }
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      {/* Tab Navigation header */}
      <div className="flex border-b border-luxury-border">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSubSection(item.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition select-none ${
              subSection === item.id
                ? 'border-luxury-goldText text-gold-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* SUB-SECTION 1: FINANCE & INVESTMENTS */}
      {subSection === 'finance' && (
        <div className="flex flex-col gap-6">
          {/* Portfolio holdings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mutual funds card */}
            <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-emerald-400" /> Mutual Funds Portfolio
                </h4>
                <span className="text-xs font-semibold text-emerald-400">
                  {formatMoney(investments.mutualFunds)}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Equity and debt mutual funds accumulate compounding interest passively. Average returns yield 8% - 14% depending on economic states.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={mfAmount}
                    onChange={(e) => setMfAmount(Math.max(0, Number(e.target.value)))}
                    className="flex-grow bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                    placeholder="Enter amount"
                  />
                  <span className="text-[10px] text-gray-500">₹</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => investMutualFunds(mfAmount)}
                    className="flex-grow btn-gold py-2 rounded-xl text-xs"
                  >
                    Invest
                  </button>
                  <button
                    onClick={() => withdrawMutualFunds(mfAmount)}
                    className="flex-grow bg-luxury-panel hover:bg-zinc-800 border border-luxury-border py-2 rounded-xl text-xs font-semibold text-gray-300 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Stocks trading card */}
            <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-blue-400" /> Stock Marketplace (NSE)
                </h4>
                <span className="text-xs font-semibold text-blue-400">
                  {formatMoney(investments.stocks)}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-risk, high-return shares of Indian companies. Extremely vulnerable to World News events, recessions, or market booms (-30% to +35%).
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(Math.max(0, Number(e.target.value)))}
                    className="flex-grow bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                    placeholder="Enter amount"
                  />
                  <span className="text-[10px] text-gray-500">₹</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => buyStocks(stockAmount)}
                    className="flex-grow btn-gold py-2 rounded-xl text-xs"
                  >
                    Buy shares
                  </button>
                  <button
                    onClick={() => sellStocks(stockAmount)}
                    className="flex-grow bg-luxury-panel hover:bg-zinc-800 border border-luxury-border py-2 rounded-xl text-xs font-semibold text-gray-300 transition"
                  >
                    Sell shares
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SBI Bank loans card */}
          <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark size={16} className="text-yellow-500" /> SBI Credit & Debt Facility
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Borrow liquid capital from State Bank of India. Loans accrue 9.5% annual interest. Ensure you maintain positive cash balances.
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="w-full md:flex-grow bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                placeholder="Enter loan amount"
              />
              <div className="flex gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={() => takeBankLoan(loanAmount)}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold w-1/2 md:w-auto text-center"
                >
                  Borrow Loan
                </button>
                <button
                  onClick={() => repayBankLoan(loanAmount)}
                  className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border px-6 py-2.5 rounded-xl text-xs font-semibold text-gray-300 transition w-1/2 md:w-auto text-center"
                >
                  Repay Debt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: REAL ESTATE EMPIRE */}
      {subSection === 'real_estate' && (
        <div className="flex flex-col gap-6">
          {/* Purchase Catalog */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Property Catalog listings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { type: 'Flat', price: 3000000, rent: 120000, maint: 15000 },
                { type: 'Shop', price: 8000000, rent: 420000, maint: 30000 },
                { type: 'Villa', price: 15000000, rent: 480000, maint: 60000 },
                { type: 'Farmhouse', price: 30000000, rent: 720000, maint: 120000 },
                { type: 'Hotel', price: 100000000, rent: 4800000, maint: 500000 },
                { type: 'Commercial Building', price: 250000000, rent: 14400000, maint: 1000000 },
                { type: 'Luxury Palace', price: 1000000000, rent: 30000000, maint: 4000000 }
              ].map((prop) => (
                <div
                  key={prop.type}
                  className="bg-luxury-panel border border-luxury-border p-4 rounded-xl flex flex-col justify-between gap-3 group hover:border-yellow-600 transition"
                >
                  <div>
                    <h5 className="text-xs font-bold text-gray-200">{prop.type}</h5>
                    <p className="text-[10px] text-gray-500 mt-1">Cost: {formatMoney(prop.price)}</p>
                    <p className="text-[10px] text-green-400">Rent Income: {formatMoney(prop.rent)}/yr</p>
                    <p className="text-[10px] text-red-400">Maint: {formatMoney(prop.maint)}/yr</p>
                  </div>
                  <button
                    onClick={() => buyRealEstate(prop.type as any)}
                    className="w-full btn-gold py-1.5 rounded-lg text-[10px]"
                  >
                    Buy Asset
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory lists */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Owned Properties Inventory</h4>
            {realEstate.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs italic border border-luxury-border rounded-xl">
                🏠 You do not own any real estate properties.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {realEstate.map((prop) => (
                  <div
                    key={prop.id}
                    className="glass-card p-4 border border-luxury-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-gray-200">{prop.name}</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Purchased at age {prop.purchaseAge} for {formatMoney(prop.purchasePrice)}</p>
                      <div className="flex gap-4 mt-1.5 text-[10px]">
                        <span className="text-green-400 font-semibold">Rent Yield: {formatMoney(prop.rentIncome)}/yr</span>
                        <span className="text-red-400 font-semibold">Maintenance: {formatMoney(prop.maintenance)}/yr</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-luxury-border">
                      <div className="text-right">
                        <p className="text-[8px] text-gray-500 uppercase">Current Market Value</p>
                        <p className="text-xs font-extrabold text-gold-400">{formatMoney(prop.currentValue)}</p>
                      </div>
                      <button
                        onClick={() => sellRealEstate(prop.id)}
                        className="bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 text-red-400 px-3 py-1.5 rounded-lg text-[10px] font-bold transition"
                      >
                        Sell Property
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: BUSINESS EMPIRE */}
      {subSection === 'business' && (
        <div className="flex flex-col gap-6">
          {/* Register Startup if none */}
          {businesses.length === 0 ? (
            <div className="glass-card p-5 border border-luxury-border flex flex-col gap-4 max-w-md mx-auto w-full">
              <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider text-center">
                Bootstrap New Startup
              </h4>
              <p className="text-xs text-gray-400 text-center">
                Register a bootstrap startup category. Initial license and registration fee is ₹5 Lakhs.
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 uppercase">Startup Name</label>
                  <input
                    type="text"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    className="bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 uppercase">Sector Category</label>
                  <select
                    value={bizCat}
                    onChange={(e) => setBizCat(e.target.value as any)}
                    className="bg-black bg-opacity-40 border border-luxury-border p-2 rounded-xl text-xs text-gray-200 outline-none focus:border-yellow-600"
                  >
                    <option value="Technology">Technology (ChaiTech, AI)</option>
                    <option value="Real Estate">Real Estate Developers</option>
                    <option value="Healthcare">Healthcare Clinics</option>
                    <option value="Education">EdTech Coaching</option>
                    <option value="E-Commerce">E-Commerce D2C Brand</option>
                    <option value="Manufacturing">Manufacturing Plant</option>
                  </select>
                </div>

                <button
                  onClick={() => startBusiness(bizName, bizCat)}
                  className="btn-gold py-2.5 rounded-xl text-xs font-semibold w-full mt-2"
                >
                  🚀 Bootstrap Startup (₹5 Lakhs)
                </button>
              </div>
            </div>
          ) : (
            // Manage Active Startups
            <div className="flex flex-col gap-4">
              {businesses.map((biz) => (
                <div key={biz.id} className="glass-card p-5 border border-luxury-border flex flex-col gap-5">
                  {/* Header info */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-luxury-border pb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-gray-100 uppercase tracking-wide flex items-center gap-2">
                        {biz.name}
                        <span className="text-[9px] bg-yellow-950 border border-yellow-600 text-yellow-300 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          {biz.fundingStage}
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Sector: {biz.category} • Active: {biz.yearsActive} years</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] text-gray-500 uppercase">Company Valuation</p>
                      <p className="text-lg font-extrabold text-yellow-400">{formatMoney(biz.valuation)}</p>
                    </div>
                  </div>

                  {/* Financial stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black bg-opacity-40 p-3.5 rounded-xl border border-luxury-border text-center">
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase">Revenue</p>
                      <p className="text-xs font-bold text-gray-200">{formatMoney(biz.revenue)}/yr</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase">Profit</p>
                      <p className="text-xs font-bold text-green-400">{formatMoney(biz.profit)}/yr</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase">Your Share</p>
                      <p className="text-xs font-bold text-blue-400">{biz.investorStake}%</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase">Employees Size</p>
                      <p className="text-xs font-bold text-purple-400">{biz.employees} workers</p>
                    </div>
                  </div>

                  {/* Operational Management controls */}
                  <div className="flex flex-col gap-3">
                    <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Operations Board</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* HR Staff Management */}
                      <div className="bg-luxury-panel border border-luxury-border p-3.5 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-300">Staff Size</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fireEmployees(biz.id, 1)}
                            className="p-1 rounded bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <button
                            onClick={() => hireEmployees(biz.id, 1)}
                            className="p-1 rounded bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition text-green-400"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Expand Operations */}
                      <button
                        onClick={() => expandBusinessOps(biz.id)}
                        className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3.5 rounded-xl text-xs text-gray-300 font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        📈 Expand Operations (₹25 Lakhs)
                      </button>

                      {/* Raise VC rounds */}
                      {biz.fundingStage !== 'IPO' ? (
                        <button
                          onClick={() => raiseFunding(biz.id)}
                          className="bg-luxury-panel hover:bg-zinc-800 border border-luxury-border p-3.5 rounded-xl text-xs text-yellow-400 font-semibold transition flex items-center justify-center gap-1.5"
                        >
                          🦄 Raise venture round
                        </button>
                      ) : (
                        <div className="p-3.5 rounded-xl border border-dashed border-luxury-border flex items-center justify-center text-xs text-gray-500 select-none">
                          <Award size={14} className="text-yellow-600 mr-1.5" /> Listed on National Market
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5">
                      {/* IPO option */}
                      {biz.fundingStage !== 'IPO' && biz.valuation >= 1000000000 && (
                        <button
                          onClick={() => ipoBusiness(biz.id)}
                          className="btn-gold py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                        >
                          📈 Go Public (Launch IPO)
                        </button>
                      )}
                      
                      {/* Sell entire stake */}
                      <button
                        onClick={() => sellBusiness(biz.id)}
                        className="w-full bg-red-950 bg-opacity-20 hover:bg-opacity-40 border border-red-900 py-2.5 rounded-xl text-xs text-red-400 font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        🚪 Sell Startup Equity
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
