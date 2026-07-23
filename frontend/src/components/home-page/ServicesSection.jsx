import React from 'react';
import { Link } from 'react-router-dom';
import { Gear, Drop, Wrench, Lightning, Tire, Cpu, ArrowRight, CalendarBlank } from '@phosphor-icons/react';

const services = [
  {
    Icon: Gear,
    title: 'Tune Up',
    desc: 'Optimalisasi performa mesin, injeksi & karburator.',
    price: 'Mulai Rp 75.000',
    duration: '45–90 mnt',
    tagColor: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    accent: 'from-amber-400/10',
  },
  {
    Icon: Drop,
    title: 'Ganti Oli',
    desc: 'Penggantian oli mesin & filter berkualitas tinggi.',
    price: 'Mulai Rp 55.000',
    duration: '15–30 mnt',
    tagColor: '',
    accent: 'from-sky-400/10',
  },
  {
    Icon: Wrench,
    title: 'Servis Besar',
    desc: 'Perawatan mesin, CVT, suspensi & kelistrikan menyeluruh.',
    price: 'Mulai Rp 200.000',
    duration: '2–4 jam',
    tagColor: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    accent: 'from-purple-400/10',
  },
  {
    Icon: Lightning,
    title: 'Ganti Aki',
    desc: 'Aki motor bergaransi resmi berbagai merek.',
    price: 'Mulai Rp 150.000',
    duration: '15–20 mnt',
    tagColor: '',
    accent: 'from-emerald-400/10',
  },
  {
    Icon: Tire,
    title: 'Ganti Ban',
    desc: 'Ban tubeless & ban dalam, balancing & vulkanisir.',
    price: 'Mulai Rp 85.000',
    duration: '20–40 mnt',
    tagColor: '',
    accent: 'from-red-400/10',
  },
  {
    Icon: Cpu,
    title: 'Scan ECU',
    desc: 'Diagnosa sistem elektronik & ECU motor injeksi modern.',
    price: 'Mulai Rp 50.000',
    duration: '20–30 mnt',
    tagColor: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
    accent: 'from-cyan-400/10',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14">
          <div data-aos="fade-right">
            <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">Layanan Kami</p>
            <h2 className="font-bebas text-[48px] md:text-[56px] text-white leading-[0.95] tracking-tight">
              SEMUA SERVIS,<br />
              <span className="text-white/30">SATU TEMPAT</span>
            </h2>
          </div>
          <p data-aos="fade-left" data-aos-delay="100" className="text-white/40 text-sm leading-relaxed max-w-xs md:text-right">
            Pilih layanan dan booking slot waktu. Teknisi terbaik kami siap menangani kendaraan Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map(({ Icon, title, desc, price, duration, tag, tagColor, accent }, idx) => (
            <Link
              key={title}
              to="/booking"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className={`group relative bg-[#111] hover:bg-[#141414] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-5 transition-all duration-300 overflow-hidden flex flex-col gap-4`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b ${accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-2xl`} />

              <div className="w-10 h-10 bg-white/[0.05] border border-white/[0.08] rounded-xl flex items-center justify-center group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.08] transition-all duration-300">
                <Icon size={20} className="text-white/50 group-hover:text-amber-400 transition-colors duration-300" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white text-[15px] mb-1.5">{title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div>
                  <p className="text-amber-400 text-[13px] font-semibold">{price}</p>
                  <p className="text-white/25 text-[11px] mt-0.5">⏱ {duration}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-white/30 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                  <ArrowRight size={14} weight="bold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="mt-10 text-center">
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-[0_0_24px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
          >
            <CalendarBlank size={16} weight="bold" />
            Booking Layanan Sekarang
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
