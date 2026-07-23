import React from 'react';
import { ClockCounterClockwise, CalendarBlank, Hourglass, Spinner, CheckCircle, XCircle } from '@phosphor-icons/react';

const STATUS_CONFIG = {
  waiting:     { label: 'Menunggu',      color: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-amber-400/20',  Icon: Hourglass },
  in_progress: { label: 'Diproses',      color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20',   Icon: Spinner },
  done:        { label: 'Selesai',       color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', Icon: CheckCircle },
  cancelled:   { label: 'Dibatalkan',   color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20',    Icon: XCircle },
};

const ProfileHistory = ({ isLoading, error, antrians, navigate }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <ClockCounterClockwise size={20} className="text-amber-400" weight="bold" />
        <h3 className="text-white font-bebas text-[22px] tracking-wide">Riwayat Booking</h3>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Memuat riwayat...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400 text-center text-sm">
          {error}
        </div>
      ) : antrians.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12 text-center">
          <CalendarBlank size={40} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Belum ada riwayat booking.</p>
          <button
            onClick={() => navigate('/booking')}
            className="mt-4 text-amber-400 text-[13px] font-semibold hover:underline"
          >
            Booking Sekarang →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {antrians.map((item) => {
            const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.waiting;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/servis/${item.id}`)}
                className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-white/[0.08] cursor-pointer transition-all duration-200 text-left w-full"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-400 font-bold text-[13px] font-mono">{item.booking_id}</span>
                      <span className="text-white/30 text-[11px]">·</span>
                      <span className="text-white/50 font-mono text-[13px]">{item.queue_number}</span>
                    </div>
                    <p className="text-white font-semibold text-[15px]">
                      {item.motor_brand} {item.motor_type}
                    </p>
                    <p className="text-white/40 text-[12px]">Plat: {item.plate}</p>
                  </div>
                  {/* Status badge */}
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border shrink-0 ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                    <cfg.Icon size={12} weight="bold" />
                    {cfg.label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[12px] text-white/40 pt-3 border-t border-white/[0.06]">
                  <span>📅 {new Date(item.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="ml-auto text-amber-400 font-semibold">
                    Rp {(item.final_price > 0 ? item.final_price : (item.estimated_price || 0)).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileHistory;
