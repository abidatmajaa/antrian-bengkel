import React from 'react';
import { Link } from 'react-router-dom';
import { NotePencil, CalendarCheck, MapPin, Receipt, ArrowRight } from '@phosphor-icons/react';

const steps = [
  {
    number: '01',
    Icon: NotePencil,
    title: 'Daftar Online',
    desc: 'Isi form booking dengan data kendaraan dan pilih jenis layanan yang Anda butuhkan.',
    highlight: 'Kapan saja, di mana saja',
  },
  {
    number: '02',
    Icon: CalendarCheck,
    title: 'Pilih Jadwal',
    desc: 'Pilih tanggal yang tersedia sesuai kenyamanan Anda.',
    highlight: 'Real-time ketersediaan',
  },
  {
    number: '03',
    Icon: MapPin,
    title: 'Datang Tepat Waktu',
    desc: 'Datang ke bengkel sesuai jadwal. Teknisi sudah siap menangani kendaraan Anda.',
    highlight: 'Tanpa antri panjang',
  },
  {
    number: '04',
    Icon: Receipt,
    title: 'Terima Laporan',
    desc: 'Dapatkan laporan servis lengkap beserta estimasi biaya sebelum pengerjaan dimulai.',
    highlight: 'Transparan & akurat',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 bg-[#060606] bg-grid-pattern relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div data-aos="fade-up" className="text-center mb-20">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-[2px] bg-amber-400"></span>
            Prosedur
            <span className="w-4 h-[2px] bg-amber-400"></span>
          </p>
          <h2 className="font-bebas text-[48px] md:text-[56px] leading-[0.95] tracking-tight mb-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">CARA</span> <span className="text-amber-400">KERJA</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto rounded-full mb-5" />
          <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto">
            Proses booking antrian servis motor online semudah 4 langkah berikut ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-400/[0.15] to-transparent pointer-events-none" />

          {steps.map(({ number, Icon, title, desc, highlight }, idx) => (
            <div
              key={number}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="w-[72px] h-[72px] rounded-2xl bg-[#0a0a0a] border border-white/[0.08] group-hover:border-amber-400/30 flex items-center justify-center mb-4 mx-auto relative z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(251,191,36,0.15)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon size={32} weight="duotone" className="text-white/60 group-hover:text-amber-400 transition-colors duration-300 relative z-10" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-black text-[11px] font-bold rounded-xl flex items-center justify-center z-20 shadow-lg border border-[#060606]">
                  {number}
                </span>
              </div>

              <h3 className="font-semibold text-white text-[16px] mb-2">{title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed mb-4">{desc}</p>
              <span className="inline-block bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div data-aos="fade-up" data-aos-delay="150" className="mt-20 text-center">
          <div className="bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.06] inline-flex flex-col sm:flex-row items-center gap-5 px-8 py-5 rounded-[20px] backdrop-blur-sm">
            <p className="text-white/70 text-sm font-medium">Siap mencoba? Booking antrian hanya butuh 2 menit.</p>
            <Link to="/booking" className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
              Mulai Sekarang
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
