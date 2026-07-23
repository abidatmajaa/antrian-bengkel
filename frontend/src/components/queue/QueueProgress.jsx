import React from 'react';

const QueueProgress = ({ myQueueInfo }) => {
  return (
    <div className="mb-8 bg-white/[0.02] border border-white/[0.04] p-5 rounded-[20px]">
      <div className="flex justify-between items-end mb-3">
        <span className="text-white/40 text-[13px] font-medium">Posisi antrian</span>
        <span className={`text-[16px] font-bold transition-colors ${(myQueueInfo?.position || 0) <= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
          {myQueueInfo?.position || 0} antrian lagi
        </span>
      </div>
      <div className="w-full bg-black rounded-full h-2 overflow-hidden border border-white/5">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full transition-all duration-1000"
          style={{
            width: `${Math.min(((10 - (myQueueInfo?.position || 0)) / 10) * 100, 100)}%`,
            boxShadow: '0 0 10px rgba(251,191,36,0.5)',
          }}
        />
      </div>
    </div>
  );
};

export default QueueProgress;
