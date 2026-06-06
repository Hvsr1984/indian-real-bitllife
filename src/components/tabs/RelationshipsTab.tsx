import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Relationship } from '../../types/game';
import { Heart, MessageCircle, Gift, AlertOctagon, UserPlus, Milestone, Baby } from 'lucide-react';

export const RelationshipsTab: React.FC = () => {
  const player = useGameStore((state) => state.player);
  const interactRelationship = useGameStore((state) => state.interactRelationship);
  const proposeMarriage = useGameStore((state) => state.proposeMarriage);
  const haveBaby = useGameStore((state) => state.haveBaby);
  const askParentsForMoney = useGameStore((state) => state.askParentsForMoney);

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  if (!player) return null;

  const { relationships } = player;

  const handleMemberAction = (id: string, action: 'spend_time' | 'conversation' | 'gift' | 'insult') => {
    interactRelationship(id, action);
  };

  const hasSpouse = relationships.some(r => r.relation === 'Spouse' && !r.isDead);
  const hasPartner = relationships.some(r => r.relation === 'Partner' && !r.isDead);
  const datingPartner = relationships.find(r => r.relation === 'Partner' && !r.isDead);

  return (
    <div className="flex flex-col gap-5">
      {/* Arranged Marriage & Baby action buttons header */}
      <div className="flex flex-wrap gap-3">
        {hasSpouse && (
          <button
            onClick={haveBaby}
            className="btn-gold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
          >
            <Baby size={14} /> Plan a Baby / Child
          </button>
        )}
        {hasPartner && datingPartner && (
          <button
            onClick={() => proposeMarriage(datingPartner.id)}
            className="bg-yellow-950 border border-yellow-600 text-yellow-300 hover:bg-yellow-900 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            💍 Propose to {datingPartner.name} (₹2.5 Lakhs Ring)
          </button>
        )}
      </div>

      {/* Relationships list */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Family & Friends Circle</h4>
        
        {relationships.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs italic border border-luxury-border rounded-xl">
            👥 Your relationships list is empty.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {relationships.map((member) => {
              const isSelected = selectedMemberId === member.id;
              
              return (
                <div
                  key={member.id}
                  className={`glass-card border border-luxury-border transition duration-200 ${
                    member.isDead ? 'opacity-55' : 'hover:border-luxury-goldBorder'
                  }`}
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => {
                      if (!member.isDead) {
                        setSelectedMemberId(isSelected ? null : member.id);
                      }
                    }}
                    className="p-4 flex justify-between items-center cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {member.isDead ? '💀' : member.relation === 'Child' ? '🍼' : member.relation === 'Spouse' || member.relation === 'Partner' ? '💑' : '👥'}
                      </span>
                      <div>
                        <h5 className="text-xs md:text-sm font-bold text-gray-200">
                          {member.name} {member.isDead ? '(Deceased)' : `(Age ${member.age})`}
                        </h5>
                        <p className="text-[10px] text-gold-500 font-bold uppercase mt-0.5">{member.relation}</p>
                      </div>
                    </div>

                    {!member.isDead && (
                      <div className="flex flex-col gap-1 items-end text-right select-none">
                        <span className="text-[10px] text-gray-400">Relationship: {member.level}%</span>
                        <div className="w-24 bg-black bg-opacity-40 h-2 rounded-full border border-luxury-border">
                          <div
                            className={`h-full rounded-full ${
                              member.level > 70 ? 'bg-green-500' : member.level > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${member.level}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Drawer (when clicked) */}
                  {isSelected && !member.isDead && (
                    <div className="px-4 pb-4 border-t border-luxury-border pt-3.5 bg-black bg-opacity-20 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleMemberAction(member.id, 'spend_time')}
                        className="flex-grow min-w-[120px] bg-luxury-panel hover:bg-zinc-800 border border-luxury-border px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 transition"
                      >
                        <Heart size={12} className="text-green-400" /> Spend Time
                      </button>

                      <button
                        onClick={() => handleMemberAction(member.id, 'conversation')}
                        className="flex-grow min-w-[120px] bg-luxury-panel hover:bg-zinc-800 border border-luxury-border px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 transition"
                      >
                        <MessageCircle size={12} className="text-blue-400" /> Converse
                      </button>

                      <button
                        onClick={() => handleMemberAction(member.id, 'gift')}
                        className="flex-grow min-w-[120px] bg-luxury-panel hover:bg-zinc-800 border border-luxury-border px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 transition"
                      >
                        <Gift size={12} className="text-yellow-400" /> Gift Sweets
                      </button>

                      {(member.relation === 'Father' || member.relation === 'Mother') && player.age < 18 && (
                        <button
                          onClick={() => askParentsForMoney(member.id)}
                          className="flex-grow min-w-[120px] bg-yellow-950 hover:bg-yellow-900 border border-yellow-800 px-3 py-2 rounded-xl text-xs font-semibold text-yellow-300 flex items-center justify-center gap-1.5 transition"
                        >
                          💰 Ask for Money
                        </button>
                      )}

                      <button
                        onClick={() => handleMemberAction(member.id, 'insult')}
                        className="flex-grow min-w-[120px] bg-red-950 bg-opacity-10 hover:bg-opacity-20 border border-red-900 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 flex items-center justify-center gap-1.5 transition"
                      >
                        <AlertOctagon size={12} /> Insult
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
