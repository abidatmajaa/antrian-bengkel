import React from 'react';
import { UserCircle, EnvelopeSimple, SignOut } from '@phosphor-icons/react';

const ProfileUserCard = ({ user, handleLogout, antrians }) => {
  return (
    <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-[28px] p-6 md:p-8 backdrop-blur-xl shadow-2xl mb-8">
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center shrink-0">
          <UserCircle size={40} className="text-amber-400" weight="fill" />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bebas text-[28px] tracking-wide leading-none mb-1 truncate">
            {user?.name || '—'}
          </h2>
          <div className="flex items-center gap-2 text-white/50 text-[13px]">
            <EnvelopeSimple size={14} />
            <span className="truncate">{user?.email || '—'}</span>
          </div>
        </div>
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-[13px] font-medium transition-all shrink-0"
        >
          <SignOut size={15} weight="bold" />
          Keluar
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.06]">
        {[
          { label: 'Total Booking', value: antrians.length },
          { label: 'Menunggu', value: antrians.filter(a => a.status === 'waiting').length },
          { label: 'Selesai', value: antrians.filter(a => a.status === 'done').length },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-white font-bebas text-[32px] leading-none text-amber-400">{value}</p>
            <p className="text-white/40 text-[11px] mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileUserCard;
