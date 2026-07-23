import React from 'react';
import { ShieldCheck } from '@phosphor-icons/react';

const BookingConfirmation = ({ form, selectedServiceData, minPrice, maxPrice, selectedDate }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck size={24} className="text-amber-400" />
        <h2 className="font-bebas text-[28px] text-white tracking-wide">Konfirmasi Booking</h2>
      </div>

      <div className="space-y-4">
        {/* Data section */}
        <div className="bg-black/40 border border-white/[0.05] rounded-[20px] p-6">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Data Kendaraan</p>
          <div className="space-y-3">
            {[
              ['Nama', form.name],
              ['WhatsApp', form.phone],
              ['Motor', `${form.motorBrand} ${form.motorType}${form.year ? ` (${form.year})` : ''}`],
              ['Plat', form.plate.toUpperCase()],
              ...(form.notes ? [['Catatan', form.notes]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-start gap-4 text-[13px]">
                <span className="text-white/40 font-medium shrink-0">{k}</span>
                <span className="text-white font-medium text-right break-words">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-black/40 border border-white/[0.05] rounded-[20px] p-6">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Layanan Dipilih</p>
          <div className="space-y-3 mb-4">
            {selectedServiceData.map((s) => (
              <div key={s.id} className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-white/70">
                  <s.Icon size={16} className="text-white/30" />
                  {s.label}
                </div>
                <span className="text-white font-medium whitespace-nowrap ml-4">Rp {s.min.toLocaleString('id-ID')} - {s.max.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex justify-between items-center">
            <span className="text-white/60 text-[12px] font-bold uppercase tracking-wider">Total Estimasi</span>
            <span className="text-amber-400 font-bold text-[16px] whitespace-nowrap ml-4">Rp {minPrice?.toLocaleString('id-ID')} - {maxPrice?.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-black/40 border border-white/[0.05] rounded-[20px] p-6">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Jadwal Servis</p>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-white/40 font-medium">Tanggal</span>
            <span className="text-white font-bold">{new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

      </div>

      <p className="text-white/30 text-[11px] text-center mt-6 flex justify-center gap-1.5">
        <span className="text-amber-400/50">*</span>
        Estimasi biaya dapat berubah setelah pemeriksaan awal oleh teknisi.
      </p>
    </div>
  );
};

export default BookingConfirmation;
