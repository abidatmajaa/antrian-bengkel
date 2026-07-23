import React from 'react';
import { Check, ArrowRight, ArrowLeft } from '@phosphor-icons/react';

const BookingNavigation = ({ step, handlePrevStep, handleNextStep, canProceed, handleSubmit, isSaving, stepsLength }) => {
  return (
    <div className="flex items-center justify-between mt-8 relative z-20">
      <button
        type="button"
        onClick={handlePrevStep}
        disabled={step === 0}
        className={`inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-xl transition-all ${step === 0
          ? 'text-white/10 cursor-not-allowed'
          : 'text-white/60 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10'
          }`}
      >
        <ArrowLeft size={16} weight="bold" />
        Kembali
      </button>

      {step < stepsLength - 1 ? (
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!canProceed}
          className={`inline-flex items-center gap-2 text-[14px] font-bold px-7 py-3.5 rounded-xl transition-all duration-300 ${canProceed
            ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_20px_rgba(251,191,36,0.25)]'
            : 'bg-white/[0.05] text-white/20 cursor-not-allowed border border-white/[0.05]'
            }`}
        >
          Lanjut
          <ArrowRight size={16} weight="bold" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Check size={18} weight="bold" />
          {isSaving ? 'Menyimpan...' : 'Konfirmasi Booking'}
        </button>
      )}
    </div>
  );
};

export default BookingNavigation;
