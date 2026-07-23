import React from 'react';
import { Wrench } from '@phosphor-icons/react';
import ServiceSelector from './ServiceSelector';

const BookingStepService = ({ selectedServices, toggleService, form, handleFormChange, minPrice, maxPrice }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <Wrench size={24} className="text-amber-400" />
        <h2 className="font-bebas text-[28px] text-white tracking-wide">Pilih Layanan</h2>
      </div>
      <p className="text-white/40 text-[13px] mb-8">Anda dapat memilih lebih dari satu layanan.</p>

      <ServiceSelector selected={selectedServices} onSelect={toggleService} />

      <div className="mt-8 animate-fade-in-up">
        <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Detail Keluhan / Catatan (Opsional)</label>
        <textarea
          className="w-full bg-black/50 border border-white/[0.08] text-white text-[13px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20 resize-none"
          name="notes"
          rows={4}
          value={form.notes}
          onChange={handleFormChange}
          placeholder="Misal: 'Motor brebet saat digas pol' atau 'Tolong cek juga lampunya kadang mati'"
        />
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-8 bg-amber-400/[0.05] border border-amber-400/20 rounded-[16px] p-5 flex items-center justify-between animate-fade-in-up">
          <div>
            <p className="text-white/50 text-[12px] mb-1">{selectedServices.length} layanan dipilih</p>
            <p className="text-amber-400 font-bold text-[16px] md:text-[18px]">Rp {minPrice.toLocaleString('id-ID')} - {maxPrice.toLocaleString('id-ID')}</p>
          </div>
          <span className="bg-amber-400/10 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Estimasi
          </span>
        </div>
      )}
    </div>
  );
};

export default BookingStepService;
