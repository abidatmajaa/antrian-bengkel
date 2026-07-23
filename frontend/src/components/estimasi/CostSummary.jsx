import React from 'react';
import { MagnifyingGlass, Calculator, ArrowRight } from '@phosphor-icons/react';

const CostSummary = ({ selectedItems, totalMin, totalMax }) => {
  return (
    <div className="lg:col-span-2">
      <div className="sticky top-[100px]">
        <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/[0.08] rounded-[24px] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-[50px]" />

          <div className="flex items-center gap-3 mb-6 relative">
            <Calculator size={24} weight="duotone" className="text-amber-400" />
            <h3 className="font-bebas text-[24px] text-white tracking-wider">Ringkasan Estimasi</h3>
          </div>

          {selectedItems.length === 0 ? (
            <div className="text-center py-12 px-4 relative">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-4 border border-white/[0.05]">
                <MagnifyingGlass size={28} className="text-white/20" />
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed">Pilih layanan di sebelah kiri untuk melihat estimasi biaya servis Anda.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 text-[13px] py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-white/70 leading-relaxed flex-1">{item.label}</span>
                    <span className="text-white/40 whitespace-nowrap font-medium mt-0.5">
                      Rp {item.min.toLocaleString('id-ID')}+
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Block */}
              <div className="bg-gradient-to-r from-amber-400/[0.1] to-transparent border border-amber-400/20 rounded-[16px] p-5 mb-6">
                <p className="text-amber-400/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-1">Estimasi Total</p>
                <p className="font-bebas text-[36px] text-amber-400 leading-none tracking-wide mb-1" style={{ textShadow: '0 0 20px rgba(251,191,36,0.2)' }}>
                  Rp {totalMin.toLocaleString('id-ID')}
                </p>
                <p className="text-amber-400/50 text-[13px] font-medium">
                  s/d Rp {totalMax.toLocaleString('id-ID')}
                </p>
              </div>

              <p className="text-white/25 text-[11px] mb-6 leading-relaxed flex gap-2">
                <span className="text-amber-400/50">*</span>
                Estimasi berdasarkan harga standar. Biaya final ditentukan setelah inspeksi langsung oleh teknisi.
              </p>

              <a href="/booking" className="w-full inline-flex justify-center items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(251,191,36,0.2)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)]">
                Lanjut Booking
                <ArrowRight size={15} weight="bold" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
