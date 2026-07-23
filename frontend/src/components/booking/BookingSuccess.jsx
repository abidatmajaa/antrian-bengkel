import React from 'react';
import { Navbar, Footer } from '../home-page';
import { Check, ArrowRight } from '@phosphor-icons/react';

const BookingSuccess = ({ form, minPrice, maxPrice, queueNumber, bookingId }) => {
  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-5 py-12 relative z-10">
        <div className="text-center w-full max-w-[440px] animate-fade-in-up">
          <div className="w-24 h-24 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <Check size={48} weight="bold" className="text-emerald-400 relative z-10" />
          </div>
          
          <h2 className="font-bebas text-[48px] text-white tracking-wide mb-2 leading-none">BOOKING BERHASIL!</h2>
          <p className="text-white/50 text-[14px] mb-8">
            Nomor antrian Anda: <span className="font-bebas text-[36px] text-amber-400 block mt-2" style={{ textShadow: '0 0 20px rgba(251,191,36,0.3)' }}>{queueNumber || '-'}</span>
          </p>
          
          <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-[24px] p-6 mb-8 text-left backdrop-blur-sm shadow-2xl">
            <div className="space-y-3.5">
              {[
                { label: 'Nama', value: form.name || 'Budi Santoso' },
                { label: 'Kendaraan', value: `${form.motorBrand} ${form.motorType}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-[13px]">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center text-[13px] pt-4 border-t border-white/[0.06] mt-2">
                <span className="text-white/40">Estimasi Total</span>
                <span className="text-amber-400 font-bold text-[16px]">Rp {minPrice?.toLocaleString('id-ID')} - {maxPrice?.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <a href="/queue" className="inline-flex justify-center items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-[14px] px-8 py-4 rounded-2xl w-full transition-all duration-200 shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]">
              Lihat Status Antrian Real-time
              <ArrowRight size={16} weight="bold" />
            </a>
            <a href={`/servis/${bookingId || ''}`} className="inline-flex justify-center items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-[14px] px-8 py-4 rounded-2xl w-full transition-all duration-200">
              Lihat Detail Servis
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
