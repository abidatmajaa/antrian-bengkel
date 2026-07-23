import React from 'react';
import { User, Lock } from '@phosphor-icons/react';

const VehicleDataForm = ({ form, handleFormChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <User size={24} className="text-amber-400" />
        <h2 className="font-bebas text-[28px] text-white tracking-wide">Data Pemilik & Kendaraan</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">
            Nama Lengkap
          </label>
          <div className="relative">
            <input
              readOnly
              className="w-full bg-white/[0.04] border border-white/[0.06] text-white/70 text-[13px] rounded-xl px-4 py-3.5 pr-10 cursor-not-allowed select-none outline-none"
              name="name"
              value={form.name}
              tabIndex={-1}
            />

          </div>

        </div>
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">No. WhatsApp *</label>
          <input className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20" name="phone" type="tel" value={form.phone} onChange={handleFormChange} placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Merek Motor *</label>
          <select className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none" name="motorBrand" value={form.motorBrand} onChange={handleFormChange}>
            <option value="" className="text-black bg-white">Pilih Merek</option>
            {['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Vespa', 'Lainnya'].map((b) => (
              <option key={b} value={b} className="text-black bg-white">{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Tipe Motor *</label>
          <input className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20" name="motorType" value={form.motorType} onChange={handleFormChange} placeholder="cth: Vario 150, NMAX" />
        </div>
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Tahun</label>
          <input className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20" name="year" type="number" value={form.year} onChange={handleFormChange} placeholder="cth: 2022" min="2000" max="2026" />
        </div>
        <div>
          <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Nomor Plat *</label>
          <input className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20 uppercase" name="plate" value={form.plate} onChange={handleFormChange} placeholder="B 1234 ABC" />
        </div>
      </div>

    </div>
  );
};


export default VehicleDataForm;
