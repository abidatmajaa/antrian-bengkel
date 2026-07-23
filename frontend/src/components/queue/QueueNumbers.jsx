import React from 'react';

const QueueNumbers = ({ myQueueInfo, isLoading }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white/[0.03] border border-white/[0.05] rounded-[24px] p-5 text-center flex flex-col justify-center">
        <p className="text-white/30 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Dilayani Sekarang</p>
        {myQueueInfo?.currentNumbers && myQueueInfo.currentNumbers.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3">
            {myQueueInfo.currentNumbers.map((num, idx) => (
              <span key={idx} className={`font-bebas text-[40px] leading-none transition-all duration-500 ${isLoading ? 'text-white/20' : 'text-emerald-400'}`} style={{ textShadow: '0 0 15px rgba(52,211,153,0.3)' }}>
                {num}
              </span>
            ))}
          </div>
        ) : (
          <p className={`font-bebas text-[56px] leading-none transition-all duration-500 ${isLoading ? 'text-white/20' : 'text-white/50'}`}>
            -
          </p>
        )}
      </div>
      <div className="bg-gradient-to-br from-amber-400/[0.08] to-transparent border border-amber-400/30 rounded-[24px] p-5 text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-amber-400/20 blur-[40px] pointer-events-none mix-blend-overlay" />
        <p className="text-amber-400/70 text-[11px] font-bold uppercase tracking-[0.15em] mb-2 relative">Nomor Anda</p>
        <p className="font-bebas text-[56px] text-amber-400 leading-none relative" style={{ textShadow: '0 0 30px rgba(251,191,36,0.5)' }}>
          {myQueueInfo?.yourNumber || '-'}
        </p>
      </div>
    </div>
  );
};

export default QueueNumbers;
