import React from 'react';
import { Info } from '@phosphor-icons/react';

const QueueAlert = ({ myQueueInfo }) => {
  return (
    <div className="bg-white/[0.02] border border-white/[0.04] rounded-[20px] p-5 space-y-5">
      {myQueueInfo?.position === 0 && myQueueInfo?.status === 'waiting' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[16px] p-4 flex gap-3.5">
          <Info size={22} weight="fill" className="text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="text-emerald-400 text-[13px] font-semibold mb-1">Bersiaplah, Giliran Anda Selanjutnya!</p>
            <p className="text-emerald-400/80 text-[12px] leading-relaxed">
              Kendaraan Anda akan segera ditangani. Silakan menuju area servis atau melapor ke kasir.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-[16px] p-4 flex gap-3.5">
          <Info size={22} weight="fill" className="text-sky-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sky-400 text-[13px] font-semibold mb-1">Pengingat Kedatangan</p>
            <p className="text-sky-400/80 text-[12px] leading-relaxed">
              Mohon tiba di bengkel <strong className="text-sky-400">15 menit sebelum estimasi</strong> agar antrian tidak terlewat.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueAlert;
