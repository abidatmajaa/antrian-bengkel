import React from 'react';
import { Check } from '@phosphor-icons/react';

const STEPS = ['Data Kendaraan', 'Pilih Layanan', 'Pilih Jadwal', 'Konfirmasi'];

const BookingStepper = ({ step }) => {
  return (
    <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 custom-scrollbar">
      {STEPS.map((label, idx) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center flex-shrink-0 min-w-[80px]">
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-[14px] font-bold transition-all duration-300 ${
              idx < step ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]' : 
              idx === step ? 'bg-amber-400 text-black shadow-[0_0_16px_rgba(251,191,36,0.3)] scale-110' : 
              'bg-white/[0.03] text-white/20 border border-white/[0.05]'
            }`}>
              {idx < step ? <Check size={18} weight="bold" /> : idx + 1}
            </div>
            <p className={`text-[11px] mt-3 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
              idx === step ? 'text-amber-400' : 
              idx < step ? 'text-emerald-400' : 
              'text-white/30'
            }`}>
              {label}
            </p>
          </div>
          {idx < STEPS.length - 1 && (
            <div className="flex-1 h-[2px] min-w-[40px] mx-1 relative top-[-10px] overflow-hidden rounded-full bg-white/[0.05]">
              <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500 ${idx < step ? 'w-full' : 'w-0'}`} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookingStepper;
