import React from 'react';
import { Sparkle, FloppyDisk, ArrowCounterClockwise } from '@phosphor-icons/react';

const GlobalCapacityCard = ({ setting, currentVal, isChanged, saving, onChange, onSave, onReset }) => {
  const num = parseInt(currentVal) || 0;
  const maxAllow = 100;
  const percentage = Math.min(Math.max((num / maxAllow) * 100, 0), 100);

  return (
    <div className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden shadow-sm relative">

      <div className="p-4 md:p-5 flex flex-col gap-5">

        {/* Top Side: Info */}
        <div className="flex-1 space-y-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-yellow-400">
              <Sparkle size={20} weight="duotone" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-white tracking-tight">
                {setting.label || 'Kapasitas Global'}
              </h3>
              <p className="text-[12px] text-gray-400 font-medium leading-relaxed max-w-sm">
                {setting.description || 'Tentukan jumlah maksimal antrian yang bisa diterima setiap harinya secara default.'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Kapasitas Per Hari
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number" min={1} max={200}
                value={currentVal}
                onChange={e => onChange(setting.key, e.target.value)}
                className="w-24 px-3 py-2 border border-gray-700 bg-[#0a0a0a] rounded-lg text-center text-2xl font-black text-white tracking-tight focus:outline-none focus:border-yellow-400 transition-all"
              />
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
                Antrian
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Pilihan Cepat</p>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20, 30, 50].map(p => (
                <button key={p}
                  onClick={() => onChange(setting.key, String(p))}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all duration-200 ${num === p
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                >{p}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between z-10 w-full bg-[#0a0a0a] rounded-xl p-4 md:p-5 border border-gray-800">

          <div className="relative w-28 h-28 flex items-center justify-center mb-5">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#facc15" strokeWidth="8"
                strokeDasharray={`${percentage * 2.83} 283`} strokeLinecap="round"
                className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white tracking-tighter">{num}</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Maks</span>
            </div>
          </div>

          <input
            type="range" min={1} max={100}
            value={Math.min(num, 100)}
            onChange={e => onChange(setting.key, e.target.value)}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer mb-5 accent-yellow-400"
          />

          <div className="w-full flex flex-col gap-2.5 relative">
            {isChanged && (
              <div className="absolute -top-6 right-0 text-[9px] font-bold uppercase tracking-widest bg-yellow-400/10 text-yellow-500 px-2 py-0.5 rounded-full animate-pulse border border-yellow-400/20">
                Belum Disimpan
              </div>
            )}
            <button onClick={() => onSave(setting.key)} disabled={!isChanged || saving}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black text-[12px] font-bold rounded-lg transition-all disabled:opacity-50">
              <FloppyDisk size={16} weight="bold" />{saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <button onClick={() => onReset(setting.key)} disabled={!isChanged}
              className="w-full flex items-center justify-center gap-2 px-5 py-2 bg-transparent border border-gray-700 text-gray-400 text-[12px] font-bold rounded-lg hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-40">
              <ArrowCounterClockwise size={14} weight="bold" />Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalCapacityCard;
