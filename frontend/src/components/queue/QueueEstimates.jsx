import React from 'react';

const QueueEstimates = ({ myQueueInfo }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 flex flex-col justify-center items-center">
        <p className="text-white/30 text-[11px] font-medium uppercase tracking-wider mb-1.5">Estimasi Tunggu</p>
        <p className="text-white font-bold text-[20px]">{myQueueInfo?.estimatedWait || '-'}</p>
      </div>
      <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 flex flex-col justify-center items-center">
        <p className="text-white/30 text-[11px] font-medium uppercase tracking-wider mb-1.5">Perkiraan Selesai</p>
        <p className="text-white font-bold text-[20px]">{myQueueInfo?.estimatedTime || '-'}</p>
      </div>
    </div>
  );
};

export default QueueEstimates;
